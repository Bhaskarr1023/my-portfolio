import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import { technologies, capabilities, howIThink } from "../data/siteData";
import { revealFadeUp, revealTextLines, revealStagger } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const AboutPreview = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const contentItemsRef = useRef([]);
  const marqueeRef = useRef(null);
  const capabilityRowsRef = useRef([]);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered reveal animations
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      
      revealFadeUp(contentItemsRef.current, triggerRef.current, isReducedMotion);
      
      revealStagger(capabilityRowsRef.current, triggerRef.current, isReducedMotion);

      // 2. Horizontal loop for marquee ticker
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: isReducedMotion ? 40 : 20, // slow down if reduced motion is requested
          ease: "none"
        });
      }
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Handle capability row cursor shifts
  const onRowEnter = (index) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(capabilityRowsRef.current[index], {
      paddingLeft: "1.5rem",
      color: "#ffffff",
      borderColor: "rgba(255, 255, 255, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
    // Rotate/shift the arrow
    const arrow = capabilityRowsRef.current[index].querySelector(".row-arrow");
    if (arrow) {
      gsap.to(arrow, { x: 5, color: "#ffffff", duration: 0.3 });
    }
  };

  const onRowLeave = (index) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(capabilityRowsRef.current[index], {
      paddingLeft: "0",
      color: "rgba(255, 255, 255, 0.6)",
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.3,
      ease: "power2.out"
    });
    const arrow = capabilityRowsRef.current[index].querySelector(".row-arrow");
    if (arrow) {
      gsap.to(arrow, { x: 0, color: "rgba(255, 255, 255, 0.4)", duration: 0.3 });
    }
  };

  // Double the technologies for seamless loop
  const marqueeList = [...technologies, ...technologies];

  return (
    <Section id="about-preview" className="bg-[#030303] overflow-hidden">
      <div ref={triggerRef}>
        <Container className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Label + Main Heading */}
            <div className="lg:col-span-6 flex flex-col items-start select-none">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  01 / About
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>

              {/* Asymmetric Header */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.1] uppercase max-w-lg">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block">
                    I build digital
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    experiences that
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block">
                    feel as good as
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[3] = el)} className="inline-block">
                    they function.
                  </span>
                </span>
              </h2>
            </div>

            {/* Right Column: Bio Paragraph + Thinking statements */}
            <div className="lg:col-span-6 flex flex-col gap-12 mt-4">
              <p
                ref={(el) => (contentItemsRef.current[0] = el)}
                className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-xl"
              >
                I'm Bhaskar, a frontend web developer focused on creating modern, responsive, and interactive digital experiences. I combine clean frontend architecture with thoughtful UI/UX, motion, and 3D to turn ideas into engaging web experiences.
              </p>

              {/* HOW I THINK editorial columns */}
              <div
                ref={(el) => (contentItemsRef.current[1] = el)}
                className="border-t border-white/5 pt-8"
              >
                <h3 className="text-xs font-mono tracking-wider text-neutral-500 uppercase mb-8">
                  How I Think
                </h3>
                <div className="space-y-6">
                  {howIThink.map((think, index) => (
                    <div key={index} className="flex gap-6 items-start">
                      <span className="text-[10px] font-mono text-neutral-600 mt-1">
                        {think.number}
                      </span>
                      <div>
                        <h4 className="text-sm text-white uppercase tracking-wider mb-1">
                          {think.statement}
                        </h4>
                        <p className="text-xs text-neutral-500 font-light leading-relaxed">
                          {think.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>

        {/* Full Width Infinite Ticker Marquee */}
        <div className="w-full border-y border-white/5 py-8 md:py-12 bg-neutral-950/20 select-none overflow-hidden mb-24">
          <div ref={marqueeRef} className="marquee-track flex gap-12 md:gap-24 w-[200%]">
            {marqueeList.map((tech, idx) => (
              <span
                key={idx}
                className="marquee-item text-4xl sm:text-6xl md:text-7xl font-light tracking-tighter text-white/10 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full-Width Core Capabilities rows */}
        <Container>
          <div className="max-w-4xl mx-auto border-t border-white/5">
            <h3 className="text-xs font-mono tracking-wider text-neutral-500 uppercase mt-12 mb-8">
              Core Capabilities
            </h3>
            <div className="divide-y divide-white/5">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  ref={(el) => (capabilityRowsRef.current[index] = el)}
                  onMouseEnter={() => onRowEnter(index)}
                  onMouseLeave={() => onRowLeave(index)}
                  className="flex items-center justify-between py-6 cursor-default transition-all duration-300 text-neutral-400 border-white/5 select-none"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-mono text-neutral-600">
                      0{index + 1}
                    </span>
                    <span className="text-base sm:text-lg tracking-wider uppercase font-light">
                      {cap}
                    </span>
                  </div>
                  <span className="row-arrow text-neutral-600 font-light text-base transition-all duration-300">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default AboutPreview;
