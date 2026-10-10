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
      // 1. Scroll-triggered entrance animations
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(textRef.current, triggerRef.current, isReducedMotion);

      // 2. Staggered reveal of ServiceRow elements
      if (rowsWrapperRef.current) {
        const rows = rowsWrapperRef.current.children;
        revealStagger(Array.from(rows), triggerRef.current, isReducedMotion);
      }

      // 3. Reveal bottom collaboration CTA
      revealFadeUp(ctaRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <Section id="services" className="bg-white border-b border-[#e7e5e0]">
      <div ref={triggerRef}>
        <Container>
          
          {/* Section Header Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20 select-none">
            
            {/* Left Column: Eyebrow + Asymmetric Display Heading */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                  02 / Services
                </span>
                <div className="w-12 h-[1px] bg-[#e7e5e0]" />
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] uppercase font-display">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-[#171717]">
                    What I
                  </span>
                </span>
                <span className="clip-container block text-[#777777]">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    Can Build
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block text-[#171717]">
                    For You<span className="text-[#ff5a36]">.</span>
                  </span>
                </span>
              </h2>
            </div>

            {/* Right Column: Supporting Overview */}
            <div className="lg:col-span-5 lg:mt-16">
              <p
                ref={textRef}
                className="text-[#777777] text-sm sm:text-base font-light leading-relaxed max-w-md"
              >
                Digital experiences engineered to look sharp, feel responsive, and work seamlessly everywhere — combining clean frontend code with purposeful motion and visual craft.
              </p>
            </div>

          </div>

          {/* List of 4 Core Services */}
          <div ref={rowsWrapperRef} className="border-t border-[#e7e5e0] mb-16 sm:mb-20">
            {services.map((service, index) => (
              <ServiceRow
                key={service.number}
                number={service.number}
                title={service.title}
                symbol={service.symbol}
                description={service.description}
                tags={service.tags}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Action Collaboration CTA */}
          <div ref={ctaRef} className="flex flex-col items-center text-center select-none pt-4">
            <p className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mb-4">
              Have a project or design in mind?
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
