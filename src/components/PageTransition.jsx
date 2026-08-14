import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const PageTransition = ({ children }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(location.pathname);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setDisplayChildren(children);
      return;
    }

    // 1. If path did not change (e.g. initial mount or parent updates)
    if (prevPathname.current === location.pathname) {
      setDisplayChildren(children);
      
      // Run initial load reveal (slide overlay up and out of view)
      if (!isReducedMotion) {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut"
        });
      } else {
        gsap.set(overlay, { yPercent: -100 });
      }
      return;
    }

    // 2. If path DID change (e.g. route navigation)
    prevPathname.current = location.pathname;

    if (isReducedMotion) {
      setDisplayChildren(children);
      return;
    }

    // Slide overlay from bottom (100) to cover screen (0), update display, slide to top (-100)
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset overlay to bottom position silently
        gsap.set(overlay, { yPercent: 100 });
      }
    });

    gsap.set(overlay, { yPercent: 100 });

    tl.to(overlay, {
      yPercent: 0,
      duration: 0.35,
      ease: "power2.inOut"
    })
    .call(() => {
      setDisplayChildren(children);
    })
    .to(overlay, {
      yPercent: -100,
      duration: 0.35,
      ease: "power2.inOut"
    }, "+=0.1"); // Visual buffer while covered

  }, [location.pathname, children, isReducedMotion]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Wipe Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-full bg-[#070707] z-[9999] pointer-events-none"
        style={{ transform: "translateY(0%)" }}
      />
      {displayChildren}
    </div>
  );
};

export default PageTransition;
