import React, { useState } from "react";
import Button from "./Button";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
    honeypot: "" // Visually hidden anti-spam field
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const servicesList = [
    "Frontend Development",
    "UI / UX Implementation",
    "Motion & GSAP Interaction",
    "3D / WebGL Experience",
    "Full-Stack Web Development",
    "Other / General Inquiry"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline field error as soon as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      tempErrors.name = "Please enter your name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      tempErrors.message = "Please describe your project or inquiry (minimum 10 characters).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Client-side validation check
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    // 1. Anti-spam honeypot verification
    // If the hidden honeypot input is filled, silently stop execution without sending request
    if (formData.honeypot.trim() !== "") {
      console.warn("Spam bot detected via honeypot field. Transmission cancelled.");
      setStatus("idle");
      return;
    }

    // 2. Read Web3Forms Access Key from environment
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey.trim() === "" || accessKey.includes("your_")) {
      console.error(
        "Web3Forms Access Key missing: Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file or Vercel Environment Variables."
      );
      setStatus("error");
      setErrorMessage(
        "Contact form configuration missing (VITE_WEB3FORMS_ACCESS_KEY). Please add your Web3Forms access key in .env or email directly."
      );
      return;
    }

    // 3. Web3Forms Submission Payload
    const payload = {
      access_key: accessKey.trim(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: `New Portfolio Inquiry — Bhaskar (${formData.name.trim()})`,
      message: formData.message.trim(),
      project_type: formData.service || "General / Not Specified"
    };

    // 4. Dispatch Fetch Request to Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        // Clear form fields on verified success
        setFormData({
          name: "",
          email: "",
          service: "",
          message: "",
          honeypot: ""
        });
      } else {
        console.error("Web3Forms API rejected transmission:", result);
        setStatus("error");
        setErrorMessage(
          result.message || "Something went wrong while submitting. Please try again or email me directly."
        );
      }
    } catch (err) {
      console.error("Web3Forms Network Connection Failure:", err);
      setStatus("error");
      setErrorMessage("Network error. Unable to reach submission service. Please email me directly.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 select-none text-left space-y-4"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-pulse" />
          <p className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
            [ TRANSMISSION SUCCESSFUL ]
          </p>
        </div>
        <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase">
          Message sent successfully.
        </h3>
        <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
          Thank you for reaching out. Your project inquiry has been dispatched to Bhaskar (bhaskarc693@gmail.com). I'll review and get back to you shortly.
        </p>
        <div className="pt-2">
          <Button onClick={() => setStatus("idle")} variant="secondary" showArrow={false}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl border border-white/8 space-y-6 text-left"
    >
      {/* Anti-spam honeypot field (hidden from screen, captured by bots) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="contact-honeypot">Leave this blank</label>
        <input
          id="contact-honeypot"
          name="honeypot"
          type="text"
          value={formData.honeypot}
          onChange={handleInputChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Bhaskar"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full bg-[#08080c]/60 border ${
              errors.name ? "border-red-500/60 focus:border-red-500" : "border-white/8 focus:border-white/25"
            } rounded-xl py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-[#0c0c10] transition-colors font-light`}
            disabled={status === "submitting"}
          />
          {errors.name && (
            <p id="name-error" className="text-red-400 text-[10px] font-mono mt-1.5" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
            Your Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full bg-[#08080c]/60 border ${
              errors.email ? "border-red-500/60 focus:border-red-500" : "border-white/8 focus:border-white/25"
            } rounded-xl py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-[#0c0c10] transition-colors font-light`}
            disabled={status === "submitting"}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 text-[10px] font-mono mt-1.5" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Service / Project Type Selection (Optional) */}
      <div>
        <label htmlFor="service" className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
          Project Type / Scope <span className="text-neutral-600">(Optional)</span>
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full bg-[#08080c]/60 border border-white/8 focus:border-white/25 rounded-xl py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-[#0c0c10] transition-colors font-light appearance-none"
            disabled={status === "submitting"}
          >
            <option value="" className="bg-[#08080a] text-neutral-400">Select project scope</option>
            {servicesList.map((svc) => (
              <option key={svc} value={svc} className="bg-[#08080a] text-white">
                {svc}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 3: Message */}
      <div>
        <label htmlFor="message" className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
          Project Details & Inquiry *
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell me about your project, goals, or timeline..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full bg-[#08080c]/60 border ${
            errors.message ? "border-red-500/60 focus:border-red-500" : "border-white/8 focus:border-white/25"
          } rounded-xl py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-[#0c0c10] transition-colors font-light resize-none`}
          disabled={status === "submitting"}
        />
        {errors.message && (
          <p id="message-error" className="text-red-400 text-[10px] font-mono mt-1.5" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Action & Status Alerts */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          variant="primary"
          showArrow={status !== "submitting"}
        >
          {status === "submitting" ? "Dispatching..." : "Send Message"}
        </Button>

        {status === "error" && (
          <div role="alert" aria-live="assertive" className="text-left max-w-sm">
            <p className="text-red-400 font-mono text-[10px] uppercase tracking-widest">
              [ TRANSMISSION FAILED ]
            </p>
            <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
              {errorMessage || "Something went wrong. Please try again or email me directly at:"}{" "}
              <a href="mailto:bhaskarc693@gmail.com" className="text-white underline">
                bhaskarc693@gmail.com
              </a>
            </p>
          </div>
        )}
      </div>

    </form>
  );
};

export default ContactForm;
