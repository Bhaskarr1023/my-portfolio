import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "./config";

gsap.registerPlugin(ScrollTrigger);

// Reveal elements fading up
export const revealFadeUp = (elements, trigger, isReducedMotion = false) => {
  if (!elements) return;

  if (isReducedMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: motionConfig.easeReveal,
      stagger: 0.15,
      scrollTrigger: {
        trigger: trigger || elements,
        start: "top 85%",
        once: true
      }
    }
  );
};

// Reveal text line-by-line using clipped containers
export const revealTextLines = (lines, trigger, isReducedMotion = false) => {
  if (!lines || lines.length === 0) return;

  if (isReducedMotion) {
    gsap.set(lines, { yPercent: 0 });
    return;
  }

  return gsap.fromTo(
    lines,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 1.2,
      ease: motionConfig.easeCinematic,
      stagger: 0.1,
      scrollTrigger: {
        trigger: trigger || lines[0],
        start: "top 85%",
        once: true
      }
    }
  );
};

// Reveal image using clip-path and subtle scale
export const revealImage = (image, trigger, isReducedMotion = false) => {
  if (!image) return;

  if (isReducedMotion) {
    gsap.set(image, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
    return;
  }

  // Set initial state
  gsap.set(image, {
    clipPath: "inset(0% 100% 0% 0%)",
    scale: 1.08
  });

  return gsap.to(image, {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1.0,
    duration: 1.4,
    ease: motionConfig.easeCinematic,
    scrollTrigger: {
      trigger: trigger || image,
      start: "top 80%",
      once: true
    }
  });
};

// Reveal list elements or capabilities with stagger
export const revealStagger = (elements, trigger, isReducedMotion = false) => {
  if (!elements || elements.length === 0) return;

  if (isReducedMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: motionConfig.easeReveal,
      scrollTrigger: {
        trigger: trigger || elements[0],
        start: "top 85%",
        once: true
      }
    }
  );
};
