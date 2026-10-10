import React, { useEffect } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";

export const NotFound = () => {
  useEffect(() => {
    document.title = "404: Page Not Found — Bhaskar";
    return () => {
      document.title = "Bhaskar — Full-Stack Developer | Creative Web Experiences";
    };
  }, []);

  return (
    <div className="w-full bg-white min-h-screen flex items-center justify-center relative overflow-hidden select-none">
      {/* Background subtle radial element */}
      <div className="absolute inset-0 bg-radial-gradient from-[#f7f6f2] via-transparent to-transparent pointer-events-none" />

      <Container className="text-center relative z-10 py-20">
        <p className="text-red-600 font-mono tracking-widest text-[10px] sm:text-xs uppercase mb-4">
          [ ERROR: 404 ]
        </p>
        
        {/* Oversized typography */}
        <h1 className="text-[7rem] sm:text-[9rem] md:text-[12rem] font-light leading-none tracking-tighter text-[#e7e5e0] uppercase select-none font-mono">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#171717] uppercase mb-4 font-display">
          Page Not Found.
        </h2>
        
        <p className="text-[#777777] max-w-sm mx-auto text-xs md:text-sm font-light leading-relaxed mb-8">
          The page you are trying to find does not exist or has been relocated.
        </p>

        <MagneticButton>
          <Button to="/" variant="primary" showArrow={false}>
            ← Back Home
          </Button>
        </MagneticButton>
      </Container>
    </div>
  );
};

export default NotFound;
NotFound.key = "not-found";
