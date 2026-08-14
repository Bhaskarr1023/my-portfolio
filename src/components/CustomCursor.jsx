import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable custom cursor on mobile / tablet or if user prefers reduced motion
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || isReducedMotion || window.innerWidth < 1024) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Centering alignment using GSAP to prevent CSS class translate conflicts
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Track mouse coordinates
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Move the dot instantly
      gsap.set(dot, { x: mouse.x, y: mouse.y });

      // Move the ring with a slight lag
      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    // Keep hidden initially, show on first movement
    const onMouseOverOnce = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      window.removeEventListener("mouseover", onMouseOverOnce);
    };

    // Dynamic hover scaling
    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.6)",
        duration: 0.2
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.2
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.2
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOverOnce);

    // Attach listeners to interactive elements
    const updateListeners = () => {
      const links = document.querySelectorAll("a, button, input, select, textarea, [role='button'], .hover-target");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    updateListeners();

    // Create an observer to attach listeners to dynamically created links
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOverOnce);
      observer.disconnect();
      const links = document.querySelectorAll("a, button, input, select, textarea, [role='button'], .hover-target");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <>
      {/* Inner Dot - hidden on mobile via responsive Tailwind */}
      <div
        ref={cursorDotRef}
        className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] opacity-0"
      />
      {/* Outer Ring - hidden on mobile via responsive Tailwind */}
      <div
        ref={cursorRingRef}
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 border border-white/30 bg-transparent rounded-full pointer-events-none z-[9998] opacity-0 transition-transform duration-75"
      />
    </>
  );
};

export default CustomCursor;
