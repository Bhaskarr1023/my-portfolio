import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import siteConfig from "../data/siteConfig";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const Navbar = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const location = useLocation();
  const isReducedMotion = useReducedMotion();

  // Scroll listener to update compact / hidden state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Compact state past 50px
      if (currentScrollY > 50) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }

      // Hide/Show based on scroll direction past 300px
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY.current) {
          setIsHidden(true); // scrolling down
        } else {
          setIsHidden(false); // scrolling up
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // GSAP animation for mobile menu
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = menuLinksRef.current;

    if (!menu) return;

    if (mobileMenuOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";

      gsap.killTweensOf([menu, links]);
      
      // Animate menu in
      gsap.to(menu, {
        x: 0,
        duration: isReducedMotion ? 0.2 : 0.5,
        ease: "power3.out"
      });

      // Stagger link entries
      if (!isReducedMotion) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
          }
        );
      } else {
        gsap.set(links, { opacity: 1, y: 0 });
      }
    } else {
      document.body.style.overflow = "";

      gsap.killTweensOf([menu, links]);

      // Animate menu out
      gsap.to(menu, {
        x: "100%",
        duration: isReducedMotion ? 0.2 : 0.4,
        ease: "power3.in"
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, isReducedMotion]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navbar entrance animation on page load
  useEffect(() => {
    if (isReducedMotion) return;
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, [isReducedMotion]);

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isCompact
            ? "py-4 bg-[#030303]/80 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="text-sm font-semibold tracking-widest text-white uppercase"
            aria-label="Bhaskar Homepage"
          >
            {siteConfig.developer.name}
          </Link>

          {/* Desktop Navigation Link items */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/work"
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-colors duration-200"
            >
              Work
            </Link>
            <Link
              to="/contact"
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Availability Indicator status dot */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 status-dot-pulse" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Available for selected projects
            </span>
          </div>

          {/* Mobile Hamburguer Toggle Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-6 h-6 z-50 group cursor-pointer focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2 w-6" : "w-6"
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 w-0" : "w-4 group-hover:w-6"
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2 w-6" : "w-5 group-hover:w-6"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Modal */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 top-0 right-0 w-full h-screen bg-[#070707] z-40 flex flex-col justify-center px-12 md:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Availability indicator for mobile inside menu */}
        <div className="absolute top-24 left-12 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 status-dot-pulse" />
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            Available for selected projects
          </span>
        </div>

        {/* Dynamic Route Items */}
        <div className="flex flex-col gap-8 text-left">
          <Link
            ref={(el) => (menuLinksRef.current[0] = el)}
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-light tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
          >
            About
          </Link>
          <Link
            ref={(el) => (menuLinksRef.current[1] = el)}
            to="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-light tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
          >
            Work
          </Link>
          <Link
            ref={(el) => (menuLinksRef.current[2] = el)}
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-light tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Bottom small copyright metadata info in mobile menu */}
        <div className="absolute bottom-12 left-12 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
          © {new Date().getFullYear()} {siteConfig.developer.name.toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default Navbar;
