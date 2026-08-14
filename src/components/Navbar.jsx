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
  const mobileBackdropRef = useRef(null);
  const menuLinksRef = useRef([]);
  const location = useLocation();
  const isReducedMotion = useReducedMotion();

  const navLinks = [
    { name: "Home", path: "/", num: "01" },
    { name: "About", path: "/about", num: "02" },
    { name: "Work", path: "/work", num: "03" },
    { name: "Contact", path: "/contact", num: "04" }
  ];

  // Helper to check active state
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Scroll listener for compact and hide/show transitions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Compact state past 40px
      if (currentScrollY > 40) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }

      // Hide / reveal on scroll direction past 250px
      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current + 5) {
          setIsHidden(true); // scrolling down
        } else if (currentScrollY < lastScrollY.current - 5) {
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

  // GSAP animation for mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const backdrop = mobileBackdropRef.current;
    const links = menuLinksRef.current.filter(Boolean);

    if (!menu || !backdrop) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf([menu, backdrop, links]);

      // Animate backdrop fade in
      gsap.to(backdrop, {
        opacity: 1,
        pointerEvents: "auto",
        duration: isReducedMotion ? 0.15 : 0.35,
        ease: "power2.out"
      });

      // Slide and reveal mobile drawer
      gsap.to(menu, {
        x: 0,
        opacity: 1,
        duration: isReducedMotion ? 0.2 : 0.45,
        ease: "power4.out"
      });

      // Stagger link entrance
      if (!isReducedMotion) {
        gsap.fromTo(
          links,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15
          }
        );
      } else {
        gsap.set(links, { opacity: 1, x: 0 });
      }
    } else {
      document.body.style.overflow = "";
      gsap.killTweensOf([menu, backdrop, links]);

      gsap.to(backdrop, {
        opacity: 0,
        pointerEvents: "none",
        duration: isReducedMotion ? 0.15 : 0.3,
        ease: "power2.in"
      });

      gsap.to(menu, {
        x: "100%",
        opacity: 0,
        duration: isReducedMotion ? 0.2 : 0.35,
        ease: "power3.in"
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, isReducedMotion]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Initial load entrance animation
  useEffect(() => {
    if (isReducedMotion) return;
    gsap.fromTo(
      navbarRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.2 }
    );
  }, [isReducedMotion]);

  return (
    <>
      {/* Primary Floating Nav Wrapper */}
      <header
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-out select-none ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isCompact ? "py-3 sm:py-4" : "py-5 sm:py-7"}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full flex items-center justify-between">
          
          {/* Brand Identity / Home Link */}
          <Link
            to="/"
            className="group flex items-center gap-3 py-1.5 focus-visible:ring-1 focus-visible:ring-white rounded-md"
            aria-label="Bhaskar Homepage"
          >
            <span className="font-display font-medium tracking-widest text-sm sm:text-base text-white uppercase group-hover:text-neutral-300 transition-colors">
              {siteConfig.developer.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              / Dev
            </span>
          </Link>

          {/* Desktop Navigation Links Pill Container */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isCompact
                ? "bg-[#08080c]/85 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50"
                : "bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-white/10"
            }`}
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    active
                      ? "text-white bg-white/[0.1] border border-white/15 shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="uppercase">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Status Badge */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-pulse" />
              <span className="text-[10px] font-mono text-neutral-300 tracking-wider uppercase">
                Available for work
              </span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white z-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors hover:bg-white/[0.08]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                mobileMenuOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-5 -translate-y-1"
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[1px]" : "w-5 translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        ref={mobileBackdropRef}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden opacity-0 pointer-events-none transition-opacity"
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside
        id="mobile-nav-drawer"
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-full max-w-sm h-screen bg-[#070709] border-l border-white/10 z-40 flex flex-col justify-between p-8 sm:p-10 md:hidden opacity-0 shadow-2xl"
        style={{ transform: "translateX(100%)" }}
        aria-label="Mobile Navigation"
      >
        {/* Top Header info */}
        <div className="pt-16 select-none">
          <div className="flex items-center gap-2 mb-8 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse" />
            <span className="text-emerald-400">Available for projects</span>
          </div>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 mb-6">
            Menu Navigation
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 text-left">
            {navLinks.map((link, idx) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  ref={(el) => (menuLinksRef.current[idx] = el)}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between py-2 text-2xl sm:text-3xl font-light tracking-wide uppercase transition-colors ${
                    active ? "text-white font-normal" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      {link.num}
                    </span>
                    <span>{link.name}</span>
                  </span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-8 border-t border-white/5 space-y-4 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
          <div>
            <p className="text-neutral-600 mb-1">Direct Contact</p>
            <a
              href={`mailto:${siteConfig.developer.email}`}
              className="text-xs text-white lowercase tracking-normal font-sans font-light hover:underline"
            >
              {siteConfig.developer.email}
            </a>
          </div>
          <p className="text-neutral-600 text-[9px] pt-2">
            © {new Date().getFullYear()} {siteConfig.developer.name.toUpperCase()} · FULL-STACK DEV
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
