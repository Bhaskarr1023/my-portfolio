import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/Container";
import Section from "../components/Section";
import ProjectVisual from "../components/ProjectVisual";
import Button from "../components/Button";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";
import { revealFadeUp, revealTextLines } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const triggerRef = useRef(null);
  const backBtnRef = useRef(null);
  const headingLinesRef = useRef([]);
  const metaRef = useRef(null);
  const mediaRef = useRef(null);
  const detailsRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Find target project matching slug
  const project = projects.find((p) => p.slug === slug);

  // Update HTML document title dynamically
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Bhaskar Selected Work`;
    } else {
      document.title = "Project Not Found — Bhaskar";
    }

    return () => {
      document.title = "Bhaskar — Frontend Web Developer";
    };
  }, [project]);

  // Entrance animations for details page
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      revealFadeUp(backBtnRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(metaRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(mediaRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(detailsRef.current, triggerRef.current, isReducedMotion);
    });

    return () => ctx.revert();
  }, [project, isReducedMotion]);

  // Graceful fallback for invalid/missing project slugs
  if (!project) {
    return (
      <div className="w-full bg-[#030303] min-h-screen pt-24 flex items-center justify-center relative">
        <Container className="text-center select-none">
          <p className="text-red-500 font-mono tracking-widest text-[10px] sm:text-xs uppercase mb-4">
            [ ERROR: 404 ]
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tighter uppercase mb-6">
            Project Not Found.
          </h1>
          <p className="text-neutral-500 max-w-sm mx-auto text-xs md:text-sm font-light leading-relaxed mb-8">
            The project workspace you are trying to view does not exist or has been removed from archives.
          </p>
          <MagneticButton>
            <Button to="/work" variant="primary" showArrow={false}>
              ← Back to Work
            </Button>
          </MagneticButton>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#030303] min-h-screen pt-24">
      <Section ref={triggerRef} className="py-12 md:py-20">
        <Container>
          
          {/* Back Navigation Button */}
          <div ref={backBtnRef} className="mb-12">
            <Link
              to="/work"
              className="inline-flex items-center text-xs font-mono tracking-widest text-neutral-500 hover:text-white uppercase transition-colors"
            >
              ← Back to Work
            </Link>
          </div>

          {/* Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 select-none">
            {/* Project title */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Project {project.number}
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none uppercase">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block">
                    {project.title.split(" ")[0]}
                  </span>
                </span>
                <span className="clip-container block text-neutral-400">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    {project.title.split(" ").slice(1).join(" ")}
                  </span>
                </span>
              </h1>
            </div>

            {/* Sidebar metadata */}
            <div
              ref={metaRef}
              className="lg:col-span-4 lg:text-right flex lg:flex-col justify-end items-start lg:items-end gap-6 font-mono text-[9px] tracking-widest text-neutral-500 uppercase"
            >
              <div>
                <p className="text-neutral-600 mb-1">Category</p>
                <p className="text-neutral-400">{project.category}</p>
              </div>
              <div>
                <p className="text-neutral-600 mb-1">Stack</p>
                <p className="text-neutral-400">{project.technologies.join(" / ")}</p>
              </div>
            </div>
          </div>

          {/* Large Project Visual Card */}
          <div ref={mediaRef} className="mb-16">
            <ProjectVisual image={project.image} video={project.video} title={project.title} />
          </div>

          {/* Detailed Info Columns & Action CTA Links */}
          <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-white/5 pt-12">
            
            {/* Project description (Left) */}
            <div className="lg:col-span-8 select-none">
              <h3 className="text-xs font-mono tracking-wider text-neutral-500 uppercase mb-6">
                Overview
              </h3>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mb-8">
                {project.description}
              </p>
              <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-xl">
                This project encapsulates a highly optimized React layout stack featuring smooth GSAP timelines. It is engineered code-wise for performance, accessibility, and strict visual aesthetics.
              </p>
            </div>

            {/* Project CTAs (Right) */}
            <div className="lg:col-span-4 flex flex-col gap-4 items-start select-none">
              <h3 className="text-xs font-mono tracking-wider text-neutral-500 uppercase mb-2">
                Launch
              </h3>
              
              {/* Only render buttons if corresponding URLs exist */}
              {project.liveUrl && (
                <MagneticButton>
                  <Button href={project.liveUrl} variant="primary" className="w-48">
                    View Live Project
                  </Button>
                </MagneticButton>
              )}

              {project.githubUrl && (
                <MagneticButton>
                  <Button href={project.githubUrl} variant="secondary" className="w-48">
                    View Source
                  </Button>
                </MagneticButton>
              )}
            </div>

          </div>

        </Container>
      </Section>
    </div>
  );
};

export default ProjectDetail;
ProjectDetail.key = "project-detail";
