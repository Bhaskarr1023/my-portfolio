import React from "react";
import { Particles } from "./Particles";
import { FloatingObject } from "./FloatingObject";

export const Experience = () => {
  // Check screen width to determine performance load
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 150 : 500;

  return (
    <>
      {/* Distant Fog - keeps background depth without darkening the main orb */}
      <fog attach="fog" args={["#030303", 10, 30]} />

      {/* Lighting System with crisp directional and subtle blue/violet rim highlights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} intensity={1.8} color="#93c5fd" />
      <pointLight position={[4, -4, -2]} intensity={1.2} color="#c084fc" />

      {/* Main visual units */}
      <FloatingObject />
      <Particles count={particleCount} />
    </>
  );
};

export default Experience;
