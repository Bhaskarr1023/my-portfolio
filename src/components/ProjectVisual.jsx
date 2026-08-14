import React, { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const ProjectVisual = ({ image, video, title }) => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Hover animations to scale the media layer without layout shifts
  const onMouseEnter = () => {
    if (isReducedMotion) return;
    gsap.to(mediaRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion) return;
    gsap.to(mediaRef.current, {
      scale: 1.0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative w-full aspect-[16/10] bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden group select-none transition-colors duration-300 hover:border-white/25"
    >
      {/* Dark overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10 pointer-events-none" />

      {/* Media container */}
      <div ref={mediaRef} className="w-full h-full transform transition-transform duration-500 origin-center">
        {video ? (
          <video
            src={video}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Premium editorial-style geometric placeholder */
          <div className="w-full h-full bg-[#090909] flex flex-col justify-between p-8 relative overflow-hidden">
            {/* Tech grid mesh effect */}
            <div className="absolute inset-0 w-full h-full border-[1px] border-white/[0.02] grid grid-cols-6 grid-rows-6 pointer-events-none">
              <div className="border-r border-b border-white/[0.02]" />
              <div className="border-r border-b border-white/[0.02]" />
              <div className="border-r border-b border-white/[0.02]" />
              <div className="border-r border-b border-white/[0.02]" />
              <div className="border-r border-b border-white/[0.02]" />
              <div className="border-r border-b border-white/[0.02]" />
            </div>

            {/* Glowing circular element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" />

            {/* Metadata tags */}
            <div className="flex justify-between items-start relative z-10 font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
              <span>[ Platform / Dev ]</span>
              <span>Workspace Ref // 00{title.length}</span>
            </div>

            {/* Huge centered letter */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10rem] font-light text-white/[0.02] uppercase tracking-tighter select-none font-mono">
                {title.charAt(0)}
              </span>
            </div>

            {/* Bottom identifier */}
            <div className="flex justify-between items-end relative z-10">
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                {title}
              </span>
              <span className="text-white/30 text-xs font-mono select-none">// interactive</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectVisual;
