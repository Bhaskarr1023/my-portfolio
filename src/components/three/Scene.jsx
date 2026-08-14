import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";

export const Scene = ({ className = "" }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported by the client browser
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(supported);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    console.warn("WebGL is unsupported on this hardware configuration. Graceful fallback active.");
    return null;
  }

  return (
    <div className={`w-full h-full pointer-events-none select-none relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]} // Cap dpr at 1.5 for performance optimization
        style={{ background: "transparent" }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default Scene;
