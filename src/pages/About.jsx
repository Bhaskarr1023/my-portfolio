import React, { useEffect, useRef } from "react";
import AboutPreview from "../sections/AboutPreview";
import Container from "../components/Container";
import Section from "../components/Section";
import siteConfig from "../data/siteConfig";
import { revealFadeUp } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const About = () => {
  const triggerRef = useRef(null);
  const extraInfoRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "About Bhaskar — Frontend Web Developer";
    
    const ctx = gsap.context(() => {
      revealFadeUp(extraInfoRef.current, triggerRef.current, isReducedMotion);
    });

    return () => {
      document.title = "Bhaskar — Frontend Web Developer";
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-24">
      {/* Primary About preview elements */}
      <AboutPreview />

      {/* Extra detailed developer bio fold */}
      <Section id="about-details" className="bg-[#030303] pt-0">
        <div ref={triggerRef}>
          <Container>
            <div ref={extraInfoRef} className="max-w-4xl mx-auto border-t border-white/5 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start select-none">
              <div className="md:col-span-4">
                <h3 className="text-xs font-mono tracking-wider text-neutral-500 uppercase">
                  Technical Stack
                </h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
                <p>
                  Specializing in React ecosystem architectures, I develop fast, responsive SPA architectures utilizing Vite as a fast build server. I write modern, accessible ES6+ JavaScript, Tailwind CSS utility layers for CSS-first designs, and GSAP/ScrollTrigger for hardware-accelerated layouts.
                </p>
                <p>
                  I'm constantly experimenting with WebGL rendering environments using Three.js and React Three Fiber to build immersive web interactions that preserve standard HTML web accessibility.
                </p>
                <p>
                  Feel free to reach out via <a href={`mailto:${siteConfig.developer.email}`} className="text-white hover:underline lowercase">{siteConfig.developer.email}</a> to review developer repositories or start mapping project briefs together.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
};

export default About;
About.key = "about";
