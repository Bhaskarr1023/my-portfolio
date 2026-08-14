import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import AboutPreview from "../sections/AboutPreview";
import Services from "../sections/Services";
import WorkPreview from "../sections/WorkPreview";
import ContactSection from "../sections/ContactSection";

export const Home = () => {
  useEffect(() => {
    document.title = "Bhaskar — Full-Stack Developer | Creative Web Experiences";
  }, []);

  return (
    <div className="w-full relative bg-[#030303]">
      {/* Cinematic Hero fold (includes video and three.js orb Canvas) */}
      <Hero />

      {/* Editorial Biography preview section */}
      <AboutPreview />

      {/* Services summary section */}
      <Services />

      {/* Project grid/preview section */}
      <WorkPreview />

      {/* Contact capture section */}
      <ContactSection />
    </div>
  );
};

export default Home;
Home.key = "home";
