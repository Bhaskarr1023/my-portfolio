import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import ServiceRow from "../components/ServiceRow";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import { services } from "../data/siteData";
import { revealFadeUp, revealTextLines, revealStagger } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const Services = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const textRef = useRef(null);
  const rowsWrapperRef = useRef(null);
  const ctaRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered reveal animations
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      
      revealFadeUp(textRef.current, triggerRef.current, isReducedMotion);

      // Staggered reveal of ServiceRow elements
      if (rowsWrapperRef.current) {
        const rows = rowsWrapperRef.current.children;
        revealStagger(Array.from(rows), triggerRef.current, isReducedMotion);
      }

      revealFadeUp(ctaRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <Section id="services" className="bg-[#030303]">
      <div ref={triggerRef}>
        <Container>
          {/* Header Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 select-none">
            {/* Left side labels and headings */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  02 / Services
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>

              {/* Asymmetric Header */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none uppercase">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block">
                    What I
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    Can Build
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block">
                    For You.
                  </span>
                </span>
              </h2>
            </div>

            {/* Right side supporting copy */}
            <div className="lg:col-span-6 lg:mt-16">
              <p
                ref={textRef}
                className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-md"
              >
                I create responsive, interactive and visually refined web experiences that combine clean frontend development with thoughtful UI/UX and motion.
              </p>
            </div>
          </div>

          {/* List of Services */}
          <div ref={rowsWrapperRef} className="border-t border-white/5 mb-16">
            {services.map((service, index) => (
              <ServiceRow
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Action Section CTA */}
          <div ref={ctaRef} className="flex flex-col items-center text-center mt-12 select-none">
            <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase mb-4">
              Have a project in mind?
            </p>
            <MagneticButton>
              <Button to="/contact" variant="secondary" className="px-8 py-4">
                Let's work together
              </Button>
            </MagneticButton>
          </div>

        </Container>
      </div>
    </Section>
  );
};

export default Services;
