"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

const JobApplicationForm = () => {
  const [jobrole, setJobRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    linkedin: "",
    portfolio: "",
    dob: "",
    coverLetter: "",
    resume: null,
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    const jobTitle = localStorage.getItem("jobTitle") || "Not Specified";
    const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    console.log("SITE KEY:", sitekey);
    setJobRole(jobTitle);
    window.scrollTo(0, 0); // Reset to the top of the page
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      console.log(`Field updated: ${name}=${newValue}`); // Debug: Log each field change
      console.log("Current formData:", updated); // Debug: Log full state
      return updated;
    });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data for debugging
    console.log("Form data on submit:", { ...formData, jobTitle: jobrole });

    // Validate required fields
    const missingFields = [];
    if (!formData.fullName.trim()) missingFields.push("Full Name");
    if (!formData.email.trim()) missingFields.push("Email");
    if (!formData.coverLetter.trim()) missingFields.push("Cover Letter");
    if (!recaptchaToken) missingFields.push("reCAPTCHA");

    if (missingFields.length > 0) {
      setStatus({
        loading: false,
        success: false,
        message: `Please complete required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus({ loading: false, success: false, message: "Please enter a valid email" });
      return;
    }

    // Client-side resume validation
    if (formData.resume) {
      if (formData.resume.size > 5 * 1024 * 1024) {
        setStatus({ loading: false, success: false, message: "Resume too large (max 5MB)" });
        return;
      }
      if (!formData.resume.name.match(/\.(pdf|doc|docx)$/i)) {
        setStatus({
          loading: false,
          success: false,
          message: "Invalid resume format (PDF, DOC, or DOCX only)",
        });
        return;
      }
    }

    setStatus({ loading: true, success: null, message: "Sending..." });

    const data = new FormData();
    data.append("type", "career");
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("linkedin", formData.linkedin);
    data.append("portfolio", formData.portfolio);
    data.append("dob", formData.dob);
    data.append("coverLetter", formData.coverLetter);
    data.append("jobTitle", jobrole || "Not Specified"); // Ensure jobTitle is always sent
    if (formData.resume) {
      data.append("resume", formData.resume);
    }
    data.append("honeypot", ""); // Honeypot field
    data.append("recaptchaToken", recaptchaToken);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setStatus({ loading: false, success: result.success, message: result.message });

      if (result.success) {
        setFormData({
          fullName: "",
          email: "",
          address: "",
          city: "",
          linkedin: "",
          portfolio: "",
          dob: "",
          coverLetter: "",
          resume: null,
        });
        setRecaptchaToken(null);
        // Reset file input
        document.querySelector('input[name="resume"]').value = "";
      }
    } catch (error) {
      console.error("Submission error:", error); // Debug: Log error
      setStatus({ loading: false, success: false, message: "Failed to send email" });
    }
  };

  return (
    <div className="flex justify-center w-full items-center min-h-screen flex-col lg:flex-row mt-[85px]">
      <div className="h-full w-full lg:w-1/2 grid place-items-center">
        <Image
          src="/images/Vector-Design-of-Check-Job-Application-Graphics.jpg"
          alt="Job Application Illustration"
          width={600}
          height={400}
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center md:w-full">
        <div className="shadow-lg p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Apply as a {jobrole || "Candidate"}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abc@gmail.com"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn link"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="Enter your portfolio link"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <div className="flex items-center">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload your resume</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                    style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cover Letter:</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Write your cover letter here..."
                className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
                rows="4"
                required
              ></textarea>
            </div>
            {/* Honeypot Field */}
            <input type="text" name="honeypot" style={{ display: "none" }} />
            {/* reCAPTCHA v2 Checkbox */}
            <div className="my-4">
              <ReCAPTCHA
                sitekey="6LdTS8YrAAAAAEMMVuQCU9jdI85FqCH6V9W79jSt"
                onChange={handleRecaptchaChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-blue-900 hover:opacity-90 transition disabled:opacity-50"
                disabled={status.loading}
              >
                {status.loading ? "Sending..." : "Apply Now"}
              </button>
            </div>
            {status.message && (
              <div
                className="mt-4 p-3 rounded-md text-center"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 1",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  color: status.success ? "green" : "red",
                }}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;