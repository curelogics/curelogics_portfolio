"use client";
import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Heading from "../../components/globalcomponents/Heading";
import Button from "../../components/globalcomponents/Button";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-input-2/lib/style.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    privacyPolicy: false,
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  // Client-side rate limiting
  const checkRateLimit = () => {
    const RATE_LIMIT = 5; // Max 5 submissions per hour
    const TIME_WINDOW = 60 * 60 * 1000; // 1 hour
    const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    const now = Date.now();
    const recentSubmissions = submissions.filter(
      (timestamp) => now - timestamp < TIME_WINDOW
    );
    if (recentSubmissions.length >= RATE_LIMIT) {
      return false;
    }
    recentSubmissions.push(now);
    localStorage.setItem("formSubmissions", JSON.stringify(recentSubmissions));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check client-side rate limit
    if (!checkRateLimit()) {
      setStatus({
        loading: false,
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
      return;
    }

    // Validate form inputs
    if (!formData.privacyPolicy) {
      setStatus({ loading: false, success: false, message: "Please accept the privacy policy" });
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: "Please fill all required fields" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ loading: false, success: false, message: "Please enter a valid email" });
      return;
    }
    if (!recaptchaToken) {
      setStatus({ loading: false, success: false, message: "Please complete the reCAPTCHA" });
      return;
    }

    setStatus({ loading: true, success: null, message: "Sending..." });

    const data = new FormData();
    data.append("type", "contact");
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("company", formData.company);
    data.append("message", formData.message);
    data.append("recaptchaToken", recaptchaToken);
    data.append("honeypot", ""); // Honeypot field

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setStatus({ loading: false, success: result.success, message: result.message });

      if (result.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          privacyPolicy: false,
        });
        setRecaptchaToken(null);
        localStorage.setItem(
          "formSubmissions",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("formSubmissions") || "[]"),
            Date.now(),
          ])
        );
      }
    } catch (error) {
      setStatus({ loading: false, success: false, message: "Failed to send email" });
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 contact-img">
      <div className="md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Section: Illustration */}
        <div className="flex absolute -z-10 md:relative justify-center items-center">
          <DotLottieReact
            height={250}
            src="https://lottie.host/4d5fc344-5b45-4c7d-8d88-a52b7ed891a3/URGRXMxSo9.lottie"
            loop
            autoplay
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full backdrop-blur-[2px]">
          <Heading text={"Contact"} />
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            To Connect with CureLogics Send Your Message Today!
          </h3>
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border-2 border-transparent bg-white rounded-md outline-none"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 0.5",
                }}
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border-2 border-transparent bg-white focus:ring focus:ring-red-300 focus:border-transparent rounded-md outline-none"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 1",
                }}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E mail"
                className="w-full p-3 border-2 border-transparent bg-white focus:ring focus:ring-red-300 focus:border-transparent rounded-md outline-none"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 1",
                }}
                required
              />
            </div>

            {/* Phone + Company Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="w-full bg-white border-2 border-transparent focus-within:ring focus-within:ring-red-300 focus-within:border-transparent rounded-md"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 1",
                }}
              >
                <PhoneInput
                  country="us"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  enableSearch
                  containerClass="!w-full !flex !items-center !h-full"
                  buttonClass="!flex !items-center !justify-center !h-full !ml-2 !mr-2 !bg-transparent !border-none"
                  inputClass="!flex-1 !p-3 !pl-12 !border-none !outline-none !bg-transparent !rounded-md"
                  dropdownClass="!z-[9999]"
                />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 border-2 border-transparent bg-white focus:ring focus:ring-red-300 focus:border-transparent rounded-md outline-none"
                style={{
                  borderImage: "linear-gradient(to right, red, blue) 1",
                }}
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-3 border-2 border-transparent bg-white focus:ring-red-300 rounded-md outline-none"
              style={{ borderImage: "linear-gradient(to right, red, blue) 1" }}
              rows={4}
              required
            ></textarea>

            {/* Honeypot Field */}
            <input type="text" name="honeypot" style={{ display: "none" }} />

            {/* reCAPTCHA v2 Checkbox */}
            <div className="my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy-policy"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                className="h-5 w-5 text-red-500 focus:ring focus:ring-red-300 border rounded"
              />
              <label
                htmlFor="privacy-policy"
                className="ml-2 text-sm text-gray-600"
              >
                By sending this form I confirm that I have read and accept
                CureLogics privacy policy.
              </label>
            </div>

            {/* reCAPTCHA Branding */}
            {/* <div className="text-sm text-gray-600 mt-2">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
              apply.
            </div> */}            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <Button
                text={status.loading ? "Sending..." : "Submit"}
                disabled={status.loading}
              />
            </div>

            {/* Status Message */}
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

export default ContactForm;