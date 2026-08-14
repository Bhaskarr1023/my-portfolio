import React, { useEffect, useRef, Suspense, lazy } from "react";
import siteConfig from "../data/siteConfig";
import HeroVideo from "../components/HeroVideo";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import Container from "../components/Container";
import { initHeroScrollFade, initThreeScrollFade } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

// Lazy load the 3D Canvas Scene to prevent Three.js from blocking initial render
const Scene = lazy(() => import("../components/three/Scene"));

export const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const badgeRef = useRef(null);
  const headingLinesRef = useRef([]);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Refined Staggered Entrance Animation
      if (!isReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Step 1: Reveal developer identity & status badge
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 }
        );

        // Step 2: Cinematic line-by-line heading clip reveal
        tl.fromTo(
          headingLinesRef.current,
          { yPercent: 105 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          "-=0.5"
        );

        // Step 3: Reveal supporting description
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

        // Step 4: Staggered CTA buttons
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

        // Step 5: Reveal metadata info panel
        if (metaRef.current) {
          tl.fromTo(
            metaRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
        }

        // Step 6: Smoothly fade in 3D Canvas visual layer
        if (canvasWrapperRef.current) {
          tl.fromTo(
            canvasWrapperRef.current,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
            "-=1.0"
          );
        }

        // Step 7: Scroll to explore indicator
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 0.6, duration: 0.8 },
          "-=0.4"
        );
      } else {
        // Reduced motion: apply instant final state
        gsap.set(badgeRef.current, { opacity: 1, y: 0 });
        gsap.set(headingLinesRef.current, { yPercent: 0 });
        gsap.set(descRef.current, { opacity: 1, y: 0 });
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        if (metaRef.current) gsap.set(metaRef.current, { opacity: 1, y: 0 });
        if (canvasWrapperRef.current) gsap.set(canvasWrapperRef.current, { opacity: 1, scale: 1 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0.6 });
      }

      // 2. ScrollTrigger Exit Animations
      initHeroScrollFade(contentRef.current, heroRef.current);
      initThreeScrollFade(canvasWrapperRef.current, heroRef.current);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] bg-[#030303] flex items-end overflow-hidden z-10 pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24"
    >
      {/* 1. Video Background Layer (z-0) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroVideo src={siteConfig.heroVideo} />
        {/* High contrast dark vignette & atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-[#030303] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Three.js 3D WebGL Canvas Layer (z-10) with Suspense */}
      <div
        ref={canvasWrapperRef}
        className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10 pointer-events-none opacity-0"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* 3. Hero Content Container (z-20) */}
      <Container className="relative z-20 w-full">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
        >
          {/* Primary Left Column */}
          <div className="lg:col-span-8 flex flex-col items-start select-none">
            
            {/* Identity Badge & Status */}
            <div
              ref={badgeRef}
              className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[11px] tracking-wider"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300">
                <span className="text-white font-medium">{siteConfig.developer.name}</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400">{siteConfig.developer.role}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse" />
                <span>Available for projects</span>
              </div>
            </div>

            {/* Dominant Display Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] font-light leading-[0.95] tracking-tight uppercase mb-6">
              <span className="clip-container block">
                <span
                  ref={(el) => (headingLinesRef.current[0] = el)}
                  className="inline-block text-white"
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
                  className="inline-block text-white"
                >
                  Experiences.
                </span>
              </span>
            </h1>

            {/* Concise Supporting Description */}
            <p
              ref={descRef}
              className="text-sm sm:text-base font-light text-neutral-300 max-w-lg mb-8 leading-relaxed"
            >
              Engineering modern, interactive web applications with a focus on React, fluid GSAP motion, and immersive 3D WebGL experiences.
            </p>

            {/* Action CTA Buttons */}
            <div
              ref={ctaRef}
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

          {/* Right Column / Editorial Metadata */}
          <div
            ref={metaRef}
            className="lg:col-span-4 lg:text-right hidden md:flex lg:flex-col justify-end items-start lg:items-end gap-6 font-mono text-[10px] tracking-widest text-neutral-400 uppercase select-none"
          >
            <div>
              <p className="text-neutral-500 mb-1 text-[9px]">Location</p>
              <p className="text-neutral-200">{siteConfig.developer.location} (GMT+5:30)</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1 text-[9px]">Specialty</p>
              <p className="text-neutral-200">React · GSAP · 3D WebGL</p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1 text-[9px]">Approach</p>
              <p className="text-neutral-200">Modern UI / Fluid Motion</p>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Scroll To Explore Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-20 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
