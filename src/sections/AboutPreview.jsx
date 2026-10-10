import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import { technologies, skillCategories, howIThink } from "../data/siteData";
import { revealFadeUp, revealTextLines, revealStagger } from "../animations/revealAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

export const AboutPreview = () => {
  const triggerRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const contentItemsRef = useRef([]);
  const marqueeRef = useRef(null);
  const skillsTriggerRef = useRef(null);
  const skillCardsRef = useRef([]);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered reveal animations for About story
      revealFadeUp(labelRef.current, triggerRef.current, isReducedMotion);
      revealTextLines(headingLinesRef.current, triggerRef.current, isReducedMotion);
      revealFadeUp(contentItemsRef.current, triggerRef.current, isReducedMotion);

      // 2. Scroll-triggered reveal for Skills Matrix
      revealStagger(skillCardsRef.current, skillsTriggerRef.current, isReducedMotion);

      // 3. Infinite horizontal marquee loop
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: isReducedMotion ? 40 : 22,
          ease: "none"
        });
      }
    });

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Double the technologies list for seamless infinite loop
  const marqueeList = [...technologies, ...technologies];

  return (
    <Section id="about-preview" className="bg-[#f7f6f2] overflow-hidden border-b border-[#e7e5e0]">
      
      {/* 1. Primary About Editorial Fold */}
      <div ref={triggerRef}>
        <Container className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Eyebrow + Display Heading */}
            <div className="lg:col-span-6 flex flex-col items-start select-none">
              <div ref={labelRef} className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                  01 / About
                </span>
                <div className="w-12 h-[1px] bg-[#e7e5e0]" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-light tracking-tight leading-[1.08] uppercase max-w-lg font-display">
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[0] = el)} className="inline-block text-[#171717]">
                    I build digital
                  </span>
                </span>
                <span className="clip-container block text-[#777777]">
                  <span ref={(el) => (headingLinesRef.current[1] = el)} className="inline-block">
                    experiences that
                  </span>
                </span>
                <span className="clip-container block">
                  <span ref={(el) => (headingLinesRef.current[2] = el)} className="inline-block text-[#171717]">
                    feel as good as
                  </span>
                </span>
                <span className="clip-container block text-[#777777]">
                  <span ref={(el) => (headingLinesRef.current[3] = el)} className="inline-block">
                    they function<span className="text-[#ff5a36]">.</span>
                  </span>
                </span>
              </h2>
            </div>

            {/* Right Column: Bio & Core Philosophy */}
            <div className="lg:col-span-6 flex flex-col gap-10">
              <p
                ref={(el) => (contentItemsRef.current[0] = el)}
                className="text-[#777777] text-base sm:text-lg font-light leading-relaxed max-w-xl"
              >
                I'm Bhaskar, a frontend-focused full-stack developer dedicated to building modern, responsive, and interactive web interfaces. I focus on clean component architectures, fluid GSAP motion, and subtle 3D interactions to turn creative ideas into polished, high-performance digital products.
              </p>

              {/* How I Think — 4 Core Principles */}
              <div
                ref={(el) => (contentItemsRef.current[1] = el)}
                className="border-t border-[#e7e5e0] pt-8 select-none"
              >
                <h3 className="text-xs font-mono tracking-widest text-[#777777] uppercase mb-6">
                  Core Philosophy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {howIThink.map((think, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl border border-[#e7e5e0] space-y-2 hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#777777]">
                        <span>{think.number}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a36]" />
                      </div>
                      <h4 className="text-sm font-medium text-[#171717] tracking-wide">
                        {think.statement}
                      </h4>
                      <p className="text-xs text-[#777777] font-light leading-relaxed">
                        {think.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* 2. Infinite Technology Marquee Strip */}
      <div className="w-full border-y border-[#e7e5e0] py-6 sm:py-8 md:py-10 bg-white select-none overflow-hidden mb-20 sm:mb-28">
        <div ref={marqueeRef} className="marquee-track flex gap-12 sm:gap-20 md:gap-28 w-[200%] items-center">
          {marqueeList.map((tech, idx) => (
            <div key={idx} className="marquee-item flex items-center gap-12 sm:gap-20 md:gap-28">
              <span className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tighter text-[#d4d1c9] uppercase hover:text-[#171717] transition-colors font-display">
                {tech}
              </span>
              <span className="text-[#ff5a36] text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Technical Skills Matrix */}
      <div ref={skillsTriggerRef}>
        <Container>
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 select-none border-b border-[#e7e5e0] pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
                Technical Stack & Skills
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight uppercase text-[#171717] font-display">
                Technologies & Tools
              </h3>
            </div>
            <p className="text-xs font-mono text-[#777777] uppercase tracking-widest">
              Specialized / Frontend / Motion / 3D
            </p>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((group, gIdx) => (
              <div
                key={gIdx}
                ref={(el) => (skillCardsRef.current[gIdx] = el)}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e7e5e0] space-y-6 hover:border-[#171717] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#e7e5e0] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#777777]">
                      {group.number}
                    </span>
                    <h4 className="text-sm font-mono tracking-wider uppercase text-[#171717] font-medium">
                      {group.category}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">
                    {group.skills.length} Items
                  </span>
                </div>

                {/* Skill List Items */}
                <div className="space-y-4">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group p-3.5 rounded-xl bg-[#f7f6f2] border border-transparent hover:border-[#e7e5e0] hover:bg-white transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-[#171717] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#777777] px-2.5 py-0.5 rounded bg-white border border-[#e7e5e0] uppercase tracking-wider">
                          {skill.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#777777] font-light leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </Container>
      </div>

    </Section>
  );
};

export default AboutPreview;
