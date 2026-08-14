import React, { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const ServiceRow = ({ number, title, description }) => {
  const rowRef = useRef(null);
  const titleRef = useRef(null);
  const arrowRef = useRef(null);
  const descRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Desktop hover animations
  const onMouseEnter = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    
    // Shift row container padding slightly
    gsap.to(rowRef.current, {
      paddingLeft: "1.5rem",
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      duration: 0.3,
      ease: "power2.out"
    });

    // Translate title and arrow
    gsap.to(titleRef.current, {
      x: 10,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(arrowRef.current, {
      x: 5,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });

    // Make description slightly more vivid
    gsap.to(descRef.current, {
      color: "rgba(255, 255, 255, 0.9)",
      duration: 0.3
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;

    gsap.to(rowRef.current, {
      paddingLeft: "0",
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(titleRef.current, {
      x: 0,
      color: "#e5e5e5",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(arrowRef.current, {
      x: 0,
      color: "rgba(255, 255, 255, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(descRef.current, {
      color: "rgba(255, 255, 255, 0.4)",
      duration: 0.3
    });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="border-b border-white/5 py-8 transition-all duration-300 select-none cursor-default"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
        {/* Number identifier */}
        <div className="lg:col-span-1 text-[10px] font-mono text-neutral-600 mt-1.5">
          {number}
        </div>

        {/* Title */}
        <div className="lg:col-span-5">
          <h4
            ref={titleRef}
            className="text-lg md:text-xl font-light tracking-wide text-[#e5e5e5] uppercase transition-colors"
          >
            {title}
          </h4>
        </div>

        {/* Description */}
        <div className="lg:col-span-5">
          <p
            ref={descRef}
            className="text-xs md:text-sm font-light text-white/40 leading-relaxed max-w-md transition-colors"
          >
            {description}
          </p>
        </div>

        {/* Arrow identifier */}
        <div className="lg:col-span-1 lg:text-right hidden sm:block">
          <span
            ref={arrowRef}
            className="inline-block text-white/30 font-light text-lg transition-transform duration-300"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceRow;
