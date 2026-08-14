import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import ContactForm from "../components/ContactForm";
import siteConfig from "../data/siteConfig";
import { revealFadeUp, revealTextLines } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const ContactSection = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const textRef = useRef(null);
  const detailsRef = useRef(null);
  const formRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal left column elements
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(textRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(detailsRef.current, triggerRef.current, isReducedMotion);
      
      // Reveal right column form
      revealFadeUp(formRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <Section id="contact" className="bg-[#030303] py-12 md:py-20 lg:py-24">
      <div ref={triggerRef}>
        <Container>
          
          {/* Balanced 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center">
            
            {/* Left Column: Heading + Story + Direct Info */}
            <div className="lg:col-span-5 flex flex-col justify-center select-none">
              
              {/* Eyebrow Label */}
              <div ref={labelRef} className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  04 / Contact
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-light tracking-tight leading-tight uppercase mb-6">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-white">
                    Let's Build
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    Something
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block text-white">
                    Great.
                  </span>
                </span>
              </h2>

              {/* Description */}
              <p
                ref={textRef}
                className="text-neutral-300 text-sm font-light leading-relaxed mb-8 max-w-md"
              >
                Have a project, idea, or digital experience in mind? Send me a message and I'll get back to you to map out details and discuss collaboration.
              </p>

              {/* Direct Info Rows */}
              <div
                ref={detailsRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[10px] tracking-widest text-neutral-500 uppercase pt-6 border-t border-white/5"
              >
                <div>
                  <p className="text-neutral-600 mb-1 text-[9px]">Email directly</p>
                  <a
                    href={`mailto:${siteConfig.developer.email}`}
                    className="text-xs text-white hover:underline lowercase tracking-normal font-sans font-light block"
                  >
                    {siteConfig.developer.email}
                  </a>
                </div>

                <div>
                  <p className="text-neutral-600 mb-1 text-[9px]">Call / Message</p>
                  <a
                    href={`tel:${siteConfig.developer.phone}`}
                    className="text-xs text-white hover:underline font-sans font-light block"
                  >
                    +{siteConfig.developer.phone}
                  </a>
                </div>

                <div>
                  <p className="text-neutral-600 mb-1 text-[9px]">Location</p>
                  <p className="text-xs text-white font-sans font-light tracking-normal">
                    {siteConfig.developer.location} (GMT+5:30)
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600 mb-1 text-[9px]">GitHub Profile</p>
                  <a
                    href="https://github.com/bhaskarc693"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white hover:underline lowercase tracking-normal font-sans font-light block"
                  >
                    github.com/bhaskarc693
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div ref={formRef} className="lg:col-span-7 w-full">
              <ContactForm />
            </div>

          </div>

        </Container>
      </div>
    </Section>
  );
};

export default ContactSection;
