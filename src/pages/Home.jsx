import React from "react";
import Hero from "../sections/Hero";
import AboutPreview from "../sections/AboutPreview";
import Services from "../sections/Services";
import WorkPreview from "../sections/WorkPreview";
import ContactSection from "../sections/ContactSection";

export const Home = () => {
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
// Key of Home component can be defined in AppRoutes to trigger transition
Home.key = "home";
