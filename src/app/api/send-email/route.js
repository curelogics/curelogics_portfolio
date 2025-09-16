import nodemailer from "nodemailer";
import xss from "xss";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// In-memory rate limit store (use Redis for production)
const RATE_LIMIT = 50; // Max 50 submissions/hour/IP
const TIME_WINDOW = 60 * 60 * 1000;
const rateLimitStore = new Map();

// Sanitize HTML inputs
const sanitizeHtml = (input) =>
  typeof input === "string"
    ? xss(input, { whiteList: { p: [], br: [], strong: [], em: [] } })
    : "";

// Validate email format
const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmedEmail);
};

// Professional email template
const generateEmailTemplate = (title, fields) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(to right, #FF0000, #0000FF); color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 20px; }
      .content p { margin: 10px 0; font-size: 16px; color: #333333; }
      .content strong { color: #FF0000; }
      .footer { background: linear-gradient(to right, #FF0000, #0000FF); padding: 10px; text-align: center; font-size: 12px; color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }
      .footer a { color: #ffffff; text-decoration: none; }
      @media (max-width: 600px) { .content p { font-size: 14px; } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${title}</h1>
      </div>
      <div class="content">
        ${fields.map(([label, value]) => `<p><strong>${label}:</strong> ${value || "Not provided"}</p>`).join("")}
      </div>
      <div class="footer">
        <p>Sent from CureLogics Contact Form | <a href="https://yourwebsite.com">Visit our website</a></p>
      </div>
    </div>
  </body>
  </html>
`;

export async function POST(req) {
  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const userSubmissions = rateLimitStore.get(clientIp) || [];
  const recentSubmissions = userSubmissions.filter(
    (timestamp) => now - timestamp < TIME_WINDOW
  );
  if (recentSubmissions.length >= RATE_LIMIT) {
    return new Response(
      JSON.stringify({ success: false, message: "Rate limit exceeded. Try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.formData();
    const type = body.get("type");
    const recaptchaToken = body.get("recaptchaToken");
    const honeypot = body.get("honeypot");

    // Check honeypot
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid submission" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify reCAPTCHA v2
    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({ success: false, message: "reCAPTCHA token missing" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success) {
      return new Response(
        JSON.stringify({ success: false, message: "reCAPTCHA verification failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.MAIN_RECIPIENT) {
      console.error("Missing SMTP configuration:", {
        SMTP_USER: process.env.SMTP_USER,
        MAIN_RECIPIENT: process.env.MAIN_RECIPIENT,
      });
      throw new Error("Missing SMTP configuration");
    }

    // Validate MAIN_RECIPIENT
    if (!isValidEmail(process.env.MAIN_RECIPIENT)) {
      console.error(`Invalid MAIN_RECIPIENT: ${process.env.MAIN_RECIPIENT}`);
      throw new Error("Invalid main recipient email");
    }

    // Validate CC email addresses
    const ccEmails = [process.env.CC_ONE, process.env.CC_TWO].filter(Boolean);
    const validCcEmails = ccEmails.filter((email) => {
      const isValid = isValidEmail(email);
      if (!isValid) {
        console.warn(`Invalid CC email: ${email}`);
      }
      return isValid;
    });

    let mailOptions = {};

    if (type === "contact") {
      const firstName = sanitizeHtml(body.get("firstName"));
      const lastName = sanitizeHtml(body.get("lastName"));
      const email = sanitizeHtml(body.get("email"));
      const phone = sanitizeHtml(body.get("phone"));
      const company = sanitizeHtml(body.get("company"));
      const message = sanitizeHtml(body.get("message"));

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return new Response(
          JSON.stringify({ success: false, message: "Missing required fields" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (!isValidEmail(email)) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid email format" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const html = generateEmailTemplate("Contact Form Submission", [
        ["Name", `${firstName} ${lastName}`],
        ["Email", email],
        ["Phone", phone],
        ["Company", company],
        ["Message", message],
      ]);

      mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.MAIN_RECIPIENT,
        cc: validCcEmails.length > 0 ? validCcEmails : undefined,
        subject: `Contact from ${firstName} ${lastName}`,
        html,
      };
    } else if (type === "career") {
      const fullName = sanitizeHtml(body.get("fullName"));
      const email = sanitizeHtml(body.get("email"));
      const address = sanitizeHtml(body.get("address"));
      const city = sanitizeHtml(body.get("city"));
      const linkedin = sanitizeHtml(body.get("linkedin"));
      const portfolio = sanitizeHtml(body.get("portfolio"));
      const dob = sanitizeHtml(body.get("dob"));
      const coverLetter = sanitizeHtml(body.get("coverLetter"));
      const resume = body.get("resume");
      const jobTitle = sanitizeHtml(body.get("jobTitle"));

      if (!fullName || !email || !coverLetter) {
        const missingFields = [];
        if (!fullName) missingFields.push("Full Name");
        if (!email) missingFields.push("Email");
        if (!coverLetter) missingFields.push("Cover Letter");
        return new Response(
          JSON.stringify({
            success: false,
            message: `Missing required fields: ${missingFields.join(", ")}`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (!isValidEmail(email)) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid email format" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Validate resume
      let attachments = [];
      if (resume) {
        if (resume.size > 5 * 1024 * 1024) {
          return new Response(
            JSON.stringify({ success: false, message: "Resume too large (max 5MB)" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        if (!resume.name.match(/\.(pdf|doc|docx)$/i)) {
          return new Response(
            JSON.stringify({ success: false, message: "Invalid resume format (PDF/DOC only)" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        const fileBuffer = Buffer.from(await resume.arrayBuffer());
        attachments.push({
          filename: resume.name,
          content: fileBuffer,
          contentType: resume.type,
        });
      }

      const html = generateEmailTemplate("Job Application", [
        ["Applied For", jobTitle],
        ["Name", fullName],
        ["Email", email],
        ["Address", `${address}, ${city}`],
        ["LinkedIn", linkedin],
        ["Portfolio", portfolio],
        ["Date of Birth", dob],
        ["Cover Letter", coverLetter],
      ]);

      mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.MAIN_RECIPIENT,
        cc: validCcEmails.length > 0 ? validCcEmails : undefined,
        subject: `New Job Application - ${fullName} for ${jobTitle || "Not specified"}`,
        html,
        attachments,
      };
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid form type" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      rateLimitStore.set(clientIp, [...recentSubmissions, now]);
      return new Response(
        JSON.stringify({ success: true, message: "Email sent!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (sendError) {
      console.error("SMTP send error:", sendError); 
      throw sendError;
    }
  } catch (error) {
    console.error("Email sending error:", error);
    let message = "Failed to send email";
    if (error.responseCode === 550 || error.message.includes("recipient")) {
      message = "Invalid recipient or CC email address";
    } else if (error.code === "EAUTH") {
      message = "SMTP authentication failed";
    } else if (error.code === "ETIMEDOUT") {
      message = "SMTP connection timed out";
    }
    return new Response(
      JSON.stringify({ success: false, message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}