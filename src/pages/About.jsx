import React, { useEffect } from "react";
import AboutPreview from "../sections/AboutPreview";

export const About = () => {
  useEffect(() => {
    document.title = "About Bhaskar — Full-Stack Developer";
    return () => {
      document.title = "Bhaskar — Full-Stack Developer | Creative Web Experiences";
    };
  }, []);

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-20 sm:pt-24">
      {/* Primary About & Skills Experience */}
      <AboutPreview />
    </div>
  );
};

export default About;
About.key = "about";
