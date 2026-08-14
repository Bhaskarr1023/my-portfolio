import React, { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const ServiceRow = ({ number, title, symbol = "↗", description, tags = [] }) => {
  const rowRef = useRef(null);
  const titleRef = useRef(null);
  const arrowRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Desktop hover animations
  const onMouseEnter = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    
    gsap.to(rowRef.current, {
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
      backgroundColor: "rgba(255, 255, 255, 0.025)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(titleRef.current, {
      x: 8,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(arrowRef.current, {
      x: 6,
      y: -2,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;

    gsap.to(rowRef.current, {
      paddingLeft: "0",
      paddingRight: "0",
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.06)",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(titleRef.current, {
      x: 0,
      color: "#f1f5f9",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(arrowRef.current, {
      x: 0,
      y: 0,
      color: "rgba(255, 255, 255, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group border-b border-white/5 py-8 sm:py-10 transition-all duration-300 select-none cursor-default"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* 1. Number & Symbol Anchor */}
        <div className="lg:col-span-2 flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-500 font-medium">
            {number}
          </span>
          <span className="text-neutral-700 font-mono text-xs">/</span>
          <span className="text-[11px] font-mono text-neutral-400 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded">
            {symbol}
          </span>
        </div>

        {/* 2. Dominant Title */}
        <div className="lg:col-span-4">
          <h4
            ref={titleRef}
            className="text-xl sm:text-2xl font-light tracking-tight text-slate-100 uppercase transition-colors"
          >
            {title}
          </h4>
        </div>

        {/* 3. Description & Technology Tags */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Technical Deliverables Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono text-neutral-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full group-hover:border-white/15 group-hover:text-neutral-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 4. Interactive Arrow Indicator */}
        <div className="lg:col-span-1 lg:text-right hidden lg:block">
          <span
            ref={arrowRef}
            className="inline-block text-white/30 font-light text-xl transition-transform duration-300"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

      </div>
    </div>
  );
};

export default ServiceRow;
