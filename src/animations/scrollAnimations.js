import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Track scroll depth and update thin progress bar at top of viewport
export const initScrollProgress = (progressBar) => {
  if (!progressBar) return;
  
  // Set initial scale to 0
  gsap.set(progressBar, { transformOrigin: "left center", scaleX: 0 });

  return gsap.to(progressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1
    }
  });
};

// Fade out and shift hero text upward during exit scrolling
export const initHeroScrollFade = (contentContainer, trigger) => {
  if (!contentContainer) return;

  return gsap.to(contentContainer, {
    opacity: 0,
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "bottom 40%",
      scrub: true
    }
  });
};

// Translate, scale down, and fade out Three.js Canvas layer on scroll exit
export const initThreeScrollFade = (canvasContainer, trigger) => {
  if (!canvasContainer) return;

  return gsap.to(canvasContainer, {
    scale: 0.65,
    y: -100,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "bottom 20%",
      scrub: true
    }
  });
};
