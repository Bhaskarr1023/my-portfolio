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
  technologies,
  image,
  video,
  slug,
  isAlternate = false
}) => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const arrowRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Handle title & link micro-interactions
  const onMouseEnter = () => {
    if (isReducedMotion) return;
    gsap.to(titleRef.current, {
      x: 8,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowRef.current, {
      x: 5,
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isReducedMotion) return;
    gsap.to(titleRef.current, {
      x: 0,
      color: "#e5e5e5",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowRef.current, {
      x: 0,
      color: "rgba(255, 255, 255, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="py-12 md:py-20 border-b border-white/5 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Layout columns alternating */}
        {/* Visual Media Column */}
        <div
          className={`lg:col-span-7 w-full ${
            isAlternate ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Link to={`/work/${slug}`} className="block focus:outline-none rounded-2xl">
            <ProjectVisual image={image} video={video} title={title} />
          </Link>
        </div>

        {/* Content Info Column */}
        <div
          className={`lg:col-span-5 flex flex-col items-start select-none ${
            isAlternate ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Top Identifier */}
          <div className="flex items-center gap-4 mb-4 font-mono text-[10px] tracking-widest text-neutral-600">
            <span>{number}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            <span className="text-neutral-500 uppercase">{category}</span>
          </div>

          {/* Project Title */}
          <Link to={`/work/${slug}`} className="focus:outline-none">
            <h3
              ref={titleRef}
              className="text-2xl sm:text-3xl font-light tracking-tight text-[#e5e5e5] uppercase mb-4 transition-colors"
            >
              {title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6 max-w-md">
            {description}
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono text-neutral-500 border border-white/5 py-1 px-3.5 rounded-full uppercase select-none"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Details Page Trigger */}
          <Link
            to={`/work/${slug}`}
            className="inline-flex items-center text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors duration-200 group"
          >
            <span>View Project</span>
            <span
              ref={arrowRef}
              className="ml-2 inline-block text-white/40 transition-transform duration-300"
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
