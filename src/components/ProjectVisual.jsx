import React, { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const ProjectVisual = ({ image, video, title, number = "01", category = "Project" }) => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Hover scale animation without layout shifts
  const onMouseEnter = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(mediaRef.current, {
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
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
      className="relative w-full aspect-[16/10] bg-[#070709] border border-white/8 rounded-2xl overflow-hidden group select-none transition-colors duration-300 hover:border-white/25"
    >
      {/* Dark overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />

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
          /* Editorial Geometric Technical Placeholder */
          <div className="w-full h-full bg-[#08080a] flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden">
            {/* Tech grid mesh */}
            <div className="absolute inset-0 w-full h-full border border-white/[0.03] grid grid-cols-4 sm:grid-cols-6 grid-rows-4 sm:grid-rows-6 pointer-events-none">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div key={idx} className="border-r border-b border-white/[0.02]" />
              ))}
            </div>

            {/* Glowing ambient element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

            {/* Top metadata tags */}
            <div className="flex justify-between items-start relative z-10 font-mono text-[9px] sm:text-[10px] text-neutral-500 tracking-widest uppercase">
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                {category}
              </span>
              <span>DEV ARCHIVE // {number}</span>
            </div>

            {/* Centered Large Display Letter */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[7rem] sm:text-[10rem] font-light text-white/[0.03] uppercase tracking-tighter font-display">
                {title.charAt(0)}
              </span>
            </div>

            {/* Bottom identifier */}
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                  {title}
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                [ Interactive Case Study ]
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectVisual;
