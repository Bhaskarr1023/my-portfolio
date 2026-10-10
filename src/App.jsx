import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import PageTransition from "./components/PageTransition";
import LoadingFallback from "./components/LoadingFallback";
import { initScrollProgress } from "./animations/scrollAnimations";
import gsap from "gsap";

// Lazy loading route-level components for performance & bundle splitting
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
        <div className="relative min-h-screen bg-white ambient-glow-bg text-[#171717] flex flex-col justify-between overflow-x-hidden selection:bg-[#171717] selection:text-white">
          {/* Scroll progress indicator bar */}
          <div className="fixed top-0 left-0 w-full h-[2px] bg-[#171717] z-[99] origin-left scale-x-0" id="scroll-progress-bar" />
          
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
