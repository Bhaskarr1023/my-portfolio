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

  // Show top 3 selected projects on the homepage preview
  const selectedProjects = projects.slice(0, 3);

  return (
    <Section id="work-preview" className="bg-white border-b border-[#e7e5e0]">
      <div ref={triggerRef}>
        <Container>
          
          {/* Header Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20 select-none">
            
            {/* Left Column: Eyebrow + Asymmetric Display Heading */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                  03 / Selected Work
                </span>
                <div className="w-12 h-[1px] bg-[#e7e5e0]" />
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] uppercase font-display">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-[#171717]">
                    Things I've
                  </span>
                </span>
                <span className="clip-container block text-[#777777]">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    Engineered &
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block text-[#171717]">
                    Built<span className="text-[#ff5a36]">.</span>
                  </span>
                </span>
              </h2>
            </div>

            {/* Right Column: Supporting Description */}
            <div className="lg:col-span-5 lg:mt-16">
              <p
                ref={textRef}
                className="text-[#777777] text-sm sm:text-base font-light leading-relaxed max-w-md"
              >
                A curated selection of web applications, 3D interactive portals, and modern frontend interfaces engineered for speed, clean architecture, and visual craft.
              </p>
            </div>

          </div>

          {/* Project List containing alternating showcase cards */}
          <div ref={listRef} className="border-t border-[#e7e5e0] divide-y divide-[#e7e5e0]">
            {selectedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                number={project.number}
                title={project.title}
                category={project.category}
                isFeatured={project.isFeatured}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                video={project.video}
                slug={project.slug}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                isAlternate={idx % 2 !== 0}
              />
            ))}
          </div>

          {/* Bottom Action CTA Trigger */}
          <div ref={ctaRef} className="flex flex-col items-center text-center mt-16 select-none">
            <p className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mb-4">
              Explore the full archive
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
