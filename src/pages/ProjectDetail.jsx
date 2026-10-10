import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/Container";
import Section from "../components/Section";
import ProjectVisual from "../components/ProjectVisual";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";
import { revealFadeUp, revealTextLines, revealStagger } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const triggerRef = useRef(null);
  const backBtnRef = useRef(null);
  const badgeRef = useRef(null);
  const headingLinesRef = useRef([]);
  const metaRef = useRef(null);
  const mediaRef = useRef(null);
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const implRef = useRef(null);
  const stackRef = useRef(null);
  const bottomNavRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Find target project matching slug
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = currentIndex !== -1 ? projects[currentIndex] : null;

  // Previous and Next project calculation (circular navigation)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Dynamic document title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Case Study | Bhaskar`;
    } else {
      document.title = "Project Not Found — Bhaskar";
    }

    return () => {
      document.title = "Bhaskar — Frontend Web Developer";
    };
  }, [project]);

  // Entrance animations for case study
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      revealFadeUp(backBtnRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(badgeRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(metaRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(mediaRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(overviewRef.current, triggerRef.current, isReducedMotion);

      if (featuresRef.current) {
        revealStagger(Array.from(featuresRef.current.children), triggerRef.current, isReducedMotion);
      }

      if (implRef.current) {
        revealStagger(Array.from(implRef.current.children), triggerRef.current, isReducedMotion);
      }

      revealFadeUp(stackRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(bottomNavRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [project, isReducedMotion]);

  // Graceful 404 fallback for missing slugs
  if (!project) {
    return (
      <div className="w-full bg-[#f7f6f2] min-h-screen pt-28 flex items-center justify-center relative">
        <Container className="text-center select-none py-20">
          <p className="text-red-600 font-mono tracking-widest text-xs uppercase mb-4">
            [ ARCHIVE REF: 404 NOT FOUND ]
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-6 text-[#171717] font-display">
            Project Not Found.
          </h1>
          <p className="text-[#777777] max-w-md mx-auto text-sm font-light leading-relaxed mb-8">
            The project case study you are attempting to view does not exist or has been relocated in the archives.
          </p>
          <MagneticButton>
            <Button to="/work" variant="primary" showArrow={false}>
              ← Return to Work Archive
            </Button>
          </MagneticButton>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pt-20 sm:pt-24">
      <Section id="project-case-study" className="py-12 md:py-20">
        <div ref={triggerRef}>
          <Container>
            
            {/* 1. Back to Work Link */}
            <div ref={backBtnRef} className="mb-10 select-none">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#777777] hover:text-[#171717] uppercase transition-colors"
              >
                <span>←</span>
                <span>Back to Work Archive</span>
              </Link>
            </div>

            {/* 2. Case Study Hero Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 select-none">
              
              {/* Left Column: Eyebrow + Title */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <div ref={badgeRef} className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                    Project {project.number} / {project.category}
                  </span>
                  <div className="w-12 h-[1px] bg-[#e7e5e0]" />
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none uppercase mb-6 font-display">
                  <span className="clip-container block">
                    <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-[#171717]">
                      {project.title.split(" ")[0]}
                    </span>
                  </span>
                  <span className="clip-container block text-[#777777]">
                    <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                      {project.title.split(" ").slice(1).join(" ")}
                    </span>
                  </span>
                </h1>

                <p className="text-[#777777] text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Right Column: Metadata Details & CTAs */}
              <div
                ref={metaRef}
                className="lg:col-span-4 flex flex-col gap-6 lg:text-right font-mono text-[10px] tracking-widest text-[#777777] uppercase pt-2"
              >
                <div className="border-b border-[#e7e5e0] pb-4">
                  <p className="text-[#9a9a9a] mb-1 text-[9px]">Role / Discipline</p>
                  <p className="text-[#171717] font-sans font-medium tracking-normal text-xs">{project.role || "Frontend Development"}</p>
                </div>
                <div className="border-b border-[#e7e5e0] pb-4">
                  <p className="text-[#9a9a9a] mb-1 text-[9px]">Category</p>
                  <p className="text-[#171717]">{project.category}</p>
                </div>
                <div>
                  <p className="text-[#9a9a9a] mb-2 text-[9px]">Live Links</p>
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#171717] text-white text-[10px] font-mono tracking-wider uppercase font-medium hover:bg-neutral-800 transition-colors shadow-xs"
                      >
                        <span>Live Demo</span>
                        <span>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f7f6f2] border border-[#e7e5e0] text-[#171717] hover:border-[#171717] hover:bg-white text-[10px] font-mono tracking-wider uppercase transition-colors"
                      >
                        <span>GitHub</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* 3. Hero Visual Preview */}
            <div ref={mediaRef} className="mb-20 sm:mb-28">
              <ProjectVisual
                image={project.image}
                video={project.video}
                title={project.title}
                number={project.number}
                category={project.category}
              />
            </div>

            {/* 4. Project Overview Section */}
            <div ref={overviewRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-t border-[#e7e5e0] pt-16 mb-20 sm:mb-28">
              <div className="lg:col-span-4 select-none">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
                  01 / Scope & Purpose
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#171717] uppercase font-display">
                  Project Overview
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-4 text-[#777777] font-light text-sm sm:text-base leading-relaxed">
                <p>{project.overview || project.description}</p>
                <p className="text-[#9a9a9a] text-xs sm:text-sm">
                  Engineered with modern frontend patterns to ensure high responsiveness, hardware-accelerated transitions, and accessible UI interactions.
                </p>
              </div>
            </div>

            {/* 5. Key Features Section */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-[#e7e5e0] pt-16 mb-20 sm:mb-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 select-none">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
                      02 / Capabilities
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#171717] uppercase font-display">
                      Key Features & Architecture
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                    {project.features.length} Highlights
                  </p>
                </div>

                <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f7f6f2] p-6 sm:p-8 rounded-2xl border border-[#e7e5e0] space-y-3 hover:border-[#171717] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#777777]">
                        <span>{feat.number}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a36]" />
                      </div>
                      <h4 className="text-base font-medium text-[#171717] tracking-wide">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-[#777777] font-light leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Technical Implementation Breakdown */}
            {project.implementation && project.implementation.length > 0 && (
              <div className="border-t border-[#e7e5e0] pt-16 mb-20 sm:mb-28">
                <div className="mb-12 select-none">
                  <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
                    03 / Engineering Decisions
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#171717] uppercase font-display">
                    Development Approach
                  </h3>
                </div>

                <div ref={implRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.implementation.map((impl, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#f7f6f2] border border-[#e7e5e0] space-y-3 hover:border-[#171717] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all"
                    >
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest block">
                        Approach // 0{idx + 1}
                      </span>
                      <h4 className="text-sm font-medium text-[#171717] uppercase tracking-wider">
                        {impl.title}
                      </h4>
                      <p className="text-xs text-[#777777] font-light leading-relaxed">
                        {impl.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Technology Stack Matrix */}
            <div ref={stackRef} className="border-t border-[#e7e5e0] pt-16 mb-20 sm:mb-28 select-none">
              <div className="mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
                  04 / Technical Stack
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#171717] uppercase font-display">
                  Technologies Used
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f7f6f2] border border-[#e7e5e0] text-[#171717] text-xs font-mono tracking-wider uppercase hover:border-[#171717] hover:bg-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a36]" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Bottom Project Pagination Navigation */}
            <div
              ref={bottomNavRef}
              className="border-t border-[#e7e5e0] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 select-none"
            >
              <Link
                to={`/work/${prevProject.slug}`}
                className="group flex items-center gap-4 text-left p-4 rounded-xl hover:bg-[#f7f6f2] transition-colors"
              >
                <span className="text-[#777777] font-mono text-xs group-hover:-translate-x-1 transition-transform">←</span>
                <div>
                  <span className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest block">Previous Project</span>
                  <span className="text-sm text-[#777777] group-hover:text-[#171717] uppercase font-light">{prevProject.title}</span>
                </div>
              </Link>

              <Link
                to="/work"
                className="px-5 py-2.5 rounded-full border border-[#e7e5e0] text-[#777777] hover:text-[#171717] hover:border-[#171717] hover:bg-[#f7f6f2] text-xs font-mono uppercase tracking-widest transition-colors"
              >
                View All Work
              </Link>

              <Link
                to={`/work/${nextProject.slug}`}
                className="group flex items-center gap-4 text-right p-4 rounded-xl hover:bg-[#f7f6f2] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#9a9a9a] uppercase tracking-widest block">Next Project</span>
                  <span className="text-sm text-[#777777] group-hover:text-[#171717] uppercase font-light">{nextProject.title}</span>
                </div>
                <span className="text-[#777777] font-mono text-xs group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </Container>
        </div>
      </Section>
    </div>
  );
};

export default ProjectDetail;
ProjectDetail.key = "project-detail";
