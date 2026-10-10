import React from "react";
import { Particles } from "./Particles";
import { FloatingObject } from "./FloatingObject";

export const Experience = () => {
  // Check screen width to determine performance load
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 150 : 500;

  return (
    <>
      {/* Editorial Studio Fog */}
      <fog attach="fog" args={["#ffffff", 8, 25]} />

      {/* Lighting System for clean, high-key editorial rendering */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-5, 4, 3]} intensity={1.5} color="#fed7aa" />
      <pointLight position={[4, -3, 2]} intensity={1.0} color="#cbd5e1" />

      {/* Main visual units */}
      <FloatingObject />
      <Particles count={particleCount} />
    </>
  );
};

export default Experience;
