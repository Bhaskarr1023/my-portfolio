import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import PageTransition from "./components/PageTransition";
import { initScrollProgress } from "./animations/scrollAnimations";
import gsap from "gsap";

// Lazy loading pages for performance optimization
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  // Initialize global scroll progress bar indicator on mount
  useEffect(() => {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;
    
    const ctx = gsap.context(() => {
      initScrollProgress(bar);
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        {/* Helper utilities */}
        <ScrollToTop />
        <CustomCursor />

        {/* Global Layout */}
        <div className="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black">
          {/* Scroll progress indicator bar */}
          <div className="fixed top-0 left-0 w-full h-[2px] bg-white z-[99] origin-left scale-x-0" id="scroll-progress-bar" />
          
          <Navbar />
          
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
