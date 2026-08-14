import React, { useEffect } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";

export const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found — Bhaskar";
    return () => {
      document.title = "Bhaskar — Frontend Web Developer";
    };
  }, []);

  return (
    <div className="w-full bg-[#030303] min-h-screen flex items-center justify-center relative overflow-hidden select-none">
      {/* Background abstract element */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 via-transparent to-transparent pointer-events-none" />

      <Container className="text-center relative z-10">
        <p className="text-neutral-600 font-mono tracking-widest text-[10px] sm:text-xs uppercase mb-4">
          [ ERROR: 4404 ]
        </p>
        
        {/* Oversized typography */}
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-light leading-none tracking-tighter text-white/5 uppercase select-none font-mono">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase mb-4">
          Page Not Found.
        </h2>
        
        <p className="text-neutral-500 max-w-sm mx-auto text-xs md:text-sm font-light leading-relaxed mb-8">
          The page you are trying to find does not exist or has been shifted.
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
