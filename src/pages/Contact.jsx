import React, { useEffect } from "react";
import ContactSection from "../sections/ContactSection";

export const Contact = () => {
  useEffect(() => {
    document.title = "Contact Bhaskar — Full-Stack Developer";
    return () => {
      document.title = "Bhaskar — Full-Stack Developer | Creative Web Experiences";
    };
  }, []);

  return (
    <div className="w-full bg-[#030303] min-h-[calc(100vh-80px)] flex flex-col justify-center pt-20 lg:pt-24">
      {/* Reuses full contact section */}
      <ContactSection />
    </div>
  );
};

export default Contact;
Contact.key = "contact";
