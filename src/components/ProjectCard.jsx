import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ProjectVisual from "./ProjectVisual";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const ProjectCard = ({
  number,
  title,
  category,
  description,
  technologies = [],
  image,
  video,
  slug,
  liveUrl,
  githubUrl,
  isFeatured = false,
  isAlternate = false
}) => {
  const titleRef = useRef(null);
  const arrowRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  const onMouseEnter = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(titleRef.current, {
      x: 6,
      color: "#ff5a36",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowRef.current, {
      x: 4,
      color: "#171717",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    gsap.to(titleRef.current, {
      x: 0,
      color: "#171717",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowRef.current, {
      x: 0,
      color: "#777777",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="py-12 sm:py-16 md:py-20 border-b border-[#e7e5e0] last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* 1. Visual Media Column */}
        <div
          className={`lg:col-span-7 w-full ${
            isAlternate ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Link
            to={`/work/${slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] rounded-2xl group"
            aria-label={`View case study for ${title}`}
          >
            <ProjectVisual
              image={image}
              video={video}
              title={title}
              number={number}
              category={category}
            />
          </Link>
        </div>

        {/* 2. Content Details Column */}
        <div
          className={`lg:col-span-5 flex flex-col items-start select-none ${
            isAlternate ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-[#171717] font-medium">{number}</span>
            <span className="text-[#e7e5e0]">/</span>
            <span className="text-[#777777]">{category}</span>
            {isFeatured && (
              <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium">
                Featured Project
              </span>
            )}
          </div>

          {/* Project Title */}
          <Link
            to={`/work/${slug}`}
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171717] rounded-md mb-4"
          >
            <h3
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#171717] uppercase transition-colors font-display"
            >
              {title}
            </h3>
          </Link>

          {/* Concise Description */}
          <p className="text-[#777777] text-sm font-light leading-relaxed mb-6 max-w-md">
            {description}
          </p>

          {/* Technology Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono text-[#777777] bg-[#f7f6f2] border border-[#e7e5e0] py-1 px-3 rounded-full uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/work/${slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] text-white text-xs font-mono tracking-wider uppercase font-medium hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>Case Study</span>
              <span ref={arrowRef} className="transition-transform duration-300">→</span>
            </Link>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#f7f6f2] border border-[#e7e5e0] text-[#171717] hover:border-[#171717] hover:bg-white text-xs font-mono tracking-wider uppercase transition-colors"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#f7f6f2] border border-[#e7e5e0] text-[#171717] hover:border-[#171717] hover:bg-white text-xs font-mono tracking-wider uppercase transition-colors"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </article>
  );
};

export default ProjectCard;
