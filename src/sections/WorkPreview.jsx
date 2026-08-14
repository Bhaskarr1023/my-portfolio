import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";
import { revealFadeUp, revealTextLines } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const WorkPreview = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const textRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header components
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(textRef.current, triggerRef.current, isReducedMotion);

      // Staggered reveal for ProjectCard containers
      if (listRef.current) {
        const cards = listRef.current.children;
        revealFadeUp(Array.from(cards), triggerRef.current, isReducedMotion);
      }

      revealFadeUp(ctaRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Show approximately 3 selected projects on the landing page
  const selectedProjects = projects.slice(0, 3);

  return (
    <Section id="work-preview" className="bg-[#030303]">
      <div ref={triggerRef}>
        <Container>
          {/* Header Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 select-none">
            
            {/* Left side label + headline */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  03 / Selected Work
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>

              {/* Huge heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none uppercase">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block">
                    Selected
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    Work.
                  </span>
                </span>
              </h2>
            </div>

            {/* Right side description */}
            <div className="lg:col-span-6 lg:mt-16">
              <p
                ref={textRef}
                className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-md"
              >
                A selection of interfaces, interactive experiences and frontend projects built with a focus on design, performance and interaction.
              </p>
            </div>

          </div>

          {/* Project List containing alternating cards */}
          <div ref={listRef} className="border-t border-white/5 divide-y divide-white/5">
            {selectedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                number={project.number}
                title={project.title}
                category={project.category}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                video={project.video}
                slug={project.slug}
                isAlternate={idx % 2 !== 0} // Alternate columns
              />
            ))}
          </div>

          {/* Bottom Action CTA Trigger */}
          <div ref={ctaRef} className="flex flex-col items-center text-center mt-12 select-none">
            <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase mb-4">
              Want to see more?
            </p>
            <MagneticButton>
              <Button to="/work" variant="secondary" className="px-8 py-4">
                View All Work
              </Button>
            </MagneticButton>
          </div>

        </Container>
      </div>
    </Section>
  );
};

export default WorkPreview;
