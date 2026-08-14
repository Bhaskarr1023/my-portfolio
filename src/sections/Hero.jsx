import React, { useEffect, useRef } from "react";
import siteConfig from "../data/siteConfig";
import HeroVideo from "../components/HeroVideo";
import Scene from "../components/three/Scene";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import Container from "../components/Container";
import { initHeroScrollFade, initThreeScrollFade } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const headingLinesRef = useRef([]);
  const textElementsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    // 1. Entrance GSAP Animation
    if (!isReducedMotion) {
      const tl = gsap.timeline();
      
      // Animate heading lines up (clip path reveal)
      tl.fromTo(
        headingLinesRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 }
      );

      // Stagger other text/button elements
      tl.fromTo(
        textElementsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        "-=0.6"
      );

      // Animate scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8 },
        "-=0.4"
      );
    } else {
      // Reduced motion: set values immediately
      gsap.set(headingLinesRef.current, { yPercent: 0 });
      gsap.set(textElementsRef.current, { opacity: 1, y: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0.6 });
    }

    // 2. Scroll scrollTrigger integrations (Exit scroll transitions)
    const ctx = gsap.context(() => {
      initHeroScrollFade(contentRef.current, heroRef.current);
      initThreeScrollFade(canvasWrapperRef.current, heroRef.current);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-black flex items-end overflow-hidden z-10"
    >
      {/* 1. HLS Video Background (z-0) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroVideo src={siteConfig.heroVideo} />
        {/* Dark Vignette & tint overlay for high contrast & cinematic atmosphere */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Three.js Canvas Visual Layer (z-10) */}
      <div
        ref={canvasWrapperRef}
        className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10 pointer-events-none"
      >
        <Scene />
      </div>

      {/* 3. Hero Content Container (z-20) */}
      <Container className="relative z-20 pb-16 md:pb-24 lg:pb-32">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          {/* Main heading and links (Bottom-Left layout) */}
          <div className="lg:col-span-8 flex flex-col items-start select-none">
            {/* Eyebrow label */}
            <p
              ref={(el) => (textElementsRef.current[0] = el)}
              className="text-[10px] md:text-xs font-mono tracking-widest text-neutral-400 mb-4 uppercase"
            >
              {siteConfig.developer.role}
            </p>

            {/* Huge Responsive Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-none tracking-tighter uppercase mb-6">
              <span className="clip-container block">
                <span
                  ref={(el) => (headingLinesRef.current[0] = el)}
                  className="inline-block"
                >
                  I Build
                </span>
              </span>
              <span className="clip-container block text-neutral-400">
                <span
                  ref={(el) => (headingLinesRef.current[1] = el)}
                  className="inline-block"
                >
                  Digital
                </span>
              </span>
              <span className="clip-container block">
                <span
                  ref={(el) => (headingLinesRef.current[2] = el)}
                  className="inline-block"
                >
                  Experiences.
                </span>
              </span>
            </h1>

            {/* Short Bio Description */}
            <p
              ref={(el) => (textElementsRef.current[1] = el)}
              className="text-sm md:text-base font-light text-neutral-400 max-w-md mb-8 leading-relaxed"
            >
              I design and build modern, interactive web experiences with a strong focus on frontend development, UI/UX and motion.
            </p>

            {/* Actions CTAs */}
            <div
              ref={(el) => (textElementsRef.current[2] = el)}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Button to="/work" variant="primary">
                  View My Work
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button to="/contact" variant="secondary">
                  Let's Talk
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Metadata information block */}
          <div
            ref={(el) => (textElementsRef.current[3] = el)}
            className="lg:col-span-4 lg:text-right hidden md:flex lg:flex-col justify-end items-start lg:items-end gap-6 font-mono text-[9px] tracking-widest text-neutral-500 uppercase"
          >
            <div>
              <p className="text-neutral-600 mb-1">Based In</p>
              <p className="text-neutral-400">{siteConfig.developer.location}</p>
            </div>
            <div>
              <p className="text-neutral-600 mb-1">Specialized In</p>
              <p className="text-neutral-400">Frontend / UI / Interaction</p>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Scroll To Explore Indicator (Bottom-Right/Center) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-20 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">
          Scroll to explore
        </span>
        {/* Animated vertical line */}
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
