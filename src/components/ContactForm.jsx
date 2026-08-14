import React, { useState } from "react";
import Button from "./Button";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    honeypot: "" // Visually hidden spam shield
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const servicesList = [
    "Frontend Development",
    "UI / UX Development",
    "Interactive Web Experience",
    "3D Web Experience",
    "Motion & GSAP",
    "Responsive Website",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error once user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      tempErrors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      tempErrors.service = "Please select a service.";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      tempErrors.message = "Please tell me a little about your project (min 10 chars).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Validate inputs
    if (!validateForm()) return;

    setStatus("submitting");

    // 1. Honeypot check: if filled, simulate successful submission to confuse bots
    if (formData.honeypot.trim() !== "") {
      setTimeout(() => {
        setStatus("success");
      }, 1000);
      return;
    }

    // 2. Check for Web3Forms Access Key (Easiest 1-key setup)
    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (web3Key && !web3Key.includes("your_") && web3Key.trim() !== "") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key,
            from_name: formData.name,
            subject: `New Project Inquiry from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            company: formData.company || "Not specified",
            service: formData.service,
            message: formData.message
          })
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setFormData({ name: "", email: "", company: "", service: "", message: "", honeypot: "" });
          return;
        } else {
          console.error("Web3Forms error response:", result);
          setStatus("error");
          return;
        }
      } catch (err) {
        console.error("Web3Forms network error:", err);
        setStatus("error");
        return;
      }
    }

    // 3. Check for EmailJS coordinates
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const isEmailJSConfigured = 
      serviceId && templateId && publicKey &&
      !serviceId.includes("your_") && !templateId.includes("your_") && !publicKey.includes("your_");

    if (isEmailJSConfigured) {
      try {
        const payload = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            visitor_name: formData.name,
            visitor_email: formData.email,
            company: formData.company || "None Specified",
            service: formData.service,
            message: formData.message,
            submitted_at: new Date().toLocaleString()
          }
        };

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", company: "", service: "", message: "", honeypot: "" });
          return;
        } else {
          const errorText = await response.text();
          console.error("EmailJS sending error response:", errorText);
          setStatus("error");
          return;
        }
      } catch (err) {
        console.error("EmailJS connection error:", err);
        setStatus("error");
        return;
      }
    }

    // 4. Sandbox fallback if no environment keys are added yet
    console.warn(
      "No email keys configured in .env (VITE_WEB3FORMS_ACCESS_KEY or EmailJS). Simulating successful transmission for UI testing."
    );
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", company: "", service: "", message: "", honeypot: "" });
    }, 1200);
  };

  if (status === "success") {
    return (
      <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 select-none text-left">
        <p className="text-green-500 font-mono text-xs tracking-widest uppercase mb-4">
          [ TRANSMISSION SUCCESSFUL ]
        </p>
        <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white uppercase mb-4">
          Message Sent.
        </h3>
        <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
          Thanks for reaching out! Your project message has been dispatched to Bhaskar. I'll get back to you shortly.
        </p>
        <Button onClick={() => setStatus("idle")} variant="secondary" showArrow={false}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 space-y-6 text-left"
    >
      {/* Honeypot field (Visually hidden for security, bots will fill it) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="honeypot">Leave this blank</label>
        <input
          id="honeypot"
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
          <label htmlFor="name" className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className={`w-full bg-black/40 border ${
              errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-white/20"
            } rounded-lg py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-black/60 transition-colors font-light`}
            required
            disabled={status === "submitting"}
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-mono mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className={`w-full bg-black/40 border ${
              errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-white/20"
            } rounded-lg py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-black/60 transition-colors font-light`}
            required
            disabled={status === "submitting"}
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-mono mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Company and Service select */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
            Company <span className="text-neutral-700">(Optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company or organization"
            className="w-full bg-black/40 border border-white/5 focus:border-white/20 rounded-lg py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-black/60 transition-colors font-light"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
            Service Required *
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`w-full bg-black/40 border ${
                errors.service ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-white/20"
              } rounded-lg py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-black/60 transition-colors font-light appearance-none`}
              required
              disabled={status === "submitting"}
            >
              <option value="" disabled>Select a service</option>
              {servicesList.map((svc) => (
                <option key={svc} value={svc} className="bg-neutral-950 text-white">
                  {svc}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.service && (
            <p className="text-red-500 text-[10px] font-mono mt-1">{errors.service}</p>
          )}
        </div>
      </div>

      {/* Row 3: Message */}
      <div>
        <label htmlFor="message" className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell me about your project..."
          className={`w-full bg-black/40 border ${
            errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-white/20"
          } rounded-lg py-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none focus:bg-black/60 transition-colors font-light resize-none`}
          required
          disabled={status === "submitting"}
        />
        {errors.message && (
          <p className="text-red-500 text-[10px] font-mono mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit and Error state handles */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
        <Button
          type="submit"
          disabled={status === "submitting"}
          variant="primary"
          showArrow={status !== "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>

        {status === "error" && (
          <div className="text-left max-w-xs sm:max-w-md">
            <p className="text-red-500 font-mono text-[9px] uppercase tracking-widest">
              [ TRANSMISSION FAILURE ]
            </p>
            <p className="text-neutral-500 text-[10px] leading-relaxed mt-0.5">
              Something went wrong. Please try again or email directly at: <a href="mailto:bhaskarc693@gmail.com" className="text-white hover:underline">bhaskarc693@gmail.com</a>
            </p>
          </div>
        )}
      </div>

    </form>
  );
};

export default ContactForm;
