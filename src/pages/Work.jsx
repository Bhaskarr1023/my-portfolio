import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { revealFadeUp, revealTextLines } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const Work = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const textRef = useRef(null);
  const listRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Selected Work — Bhaskar | Frontend & Full-Stack Developer";

    const ctx = gsap.context(() => {
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(textRef.current, triggerRef.current, isReducedMotion);

      if (listRef.current) {
        const cards = listRef.current.children;
        revealFadeUp(Array.from(cards), triggerRef.current, isReducedMotion);
      }
    });

    return () => {
      document.title = "Bhaskar — Frontend Web Developer";
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-20 sm:pt-24">
      <Section id="work-page" className="py-12 md:py-20">
        <div ref={triggerRef}>
          <Container>
            
            {/* Header section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20 select-none">
              <div className="lg:col-span-7 flex flex-col items-start">
                <div ref={labelRef} className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    03 / Archive & Showcase
                  </span>
                  <div className="w-12 h-[1px] bg-white/10" />
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none uppercase">
                  <span className="clip-container block">
                    <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-white">
                      Selected
                    </span>
                  </span>
                  <span className="clip-container block text-neutral-400">
                    <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                      Projects.
                    </span>
                  </span>
                </h1>
              </div>

              <div className="lg:col-span-5 lg:mt-12">
                <p
                  ref={textRef}
                  className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-md"
                >
                  A complete collection of web applications, frontend architecture case studies, and 3D interactive experiences engineered with modern web standards.
                </p>
              </div>
            </div>

            {/* Alternating list mapping all projects */}
            <div ref={listRef} className="border-t border-white/5 divide-y divide-white/5">
              {projects.map((project, idx) => (
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

          </Container>
        </div>
      </Section>
    </div>
  );
};

export default Work;
Work.key = "work";
