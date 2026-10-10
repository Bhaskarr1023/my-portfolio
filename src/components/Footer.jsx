import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import siteConfig from "../data/siteConfig";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f7f6f2] border-t border-[#e7e5e0] py-12 md:py-20 relative z-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-16 select-none">
          {/* Logo Brand column */}
          <div className="md:col-span-6">
            <Link
              to="/"
              className="text-lg font-medium tracking-widest text-[#171717] uppercase hover:text-[#ff5a36] transition-colors font-display"
            >
              {siteConfig.developer.name}
            </Link>
            <p className="text-[#777777] font-mono text-xs tracking-wider uppercase mt-2">
              {siteConfig.developer.role}
            </p>
          </div>

          {/* Navigation links column */}
          <div className="md:col-span-3">
            <h4 className="text-[#171717] font-mono text-xs tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-light text-[#777777]">
              <li>
                <Link to="/about" className="hover:text-[#171717] transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-[#171717] transition-colors duration-200">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#171717] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct contact info column */}
          <div className="md:col-span-3">
            <h4 className="text-[#171717] font-mono text-xs tracking-wider uppercase mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm font-light text-[#777777]">
              <li>
                <a
                  href={`mailto:${siteConfig.developer.email}`}
                  className="hover:text-[#ff5a36] transition-colors duration-200"
                >
                  {siteConfig.developer.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.developer.phone}`}
                  className="hover:text-[#ff5a36] transition-colors duration-200"
                >
                  +{siteConfig.developer.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bhaskarc693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff5a36] transition-colors duration-200"
                >
                  github.com/bhaskarc693
                </a>
              </li>
              <li>
                <span className="text-[#9a9a9a] font-mono text-[10px] tracking-wider uppercase block mt-1">
                  Based in {siteConfig.developer.location} (GMT+5:30)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and copyright */}
        <div className="pt-8 border-t border-[#e7e5e0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#9a9a9a] select-none">
          <p>© {currentYear} {siteConfig.developer.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <p className="tracking-widest">DESIGN & DEV BY {siteConfig.developer.name.toUpperCase()}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
