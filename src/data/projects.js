// Centralized projects showcase data with accurate, honest technology definitions & case study details

export const projects = [
  {
    id: 1,
    number: "01",
    title: "MOVIE EXPERIENCE",
    category: "Frontend Web App",
    role: "Frontend Architecture & UI/UX",
    isFeatured: true,
    description: "A high-performance movie discovery interface built with fluid GSAP timeline transitions, responsive layout architecture, and seamless REST API media integration.",
    overview: "This project focuses on building an immersive media discovery platform with responsive fluidity. The challenge was structuring complex multi-category media datasets into responsive grids while maintaining hardware-accelerated transitions and immediate visual feedback.",
    technologies: ["React", "JavaScript", "GSAP", "Tailwind CSS", "REST API"],
    features: [
      {
        number: "01",
        title: "Dynamic Media Discovery",
        description: "Categorized rows and detailed metadata modals for exploring films, ratings, and descriptions."
      },
      {
        number: "02",
        title: "Smooth GSAP Sequences",
        description: "Page transitions, clip reveals, and stagger animations across media card grids."
      },
      {
        number: "03",
        title: "Responsive Component System",
        description: "Fluid layouts adapting seamlessly from mobile viewports (320px) to ultra-wide displays."
      },
      {
        number: "04",
        title: "REST API Integration",
        description: "Clean asynchronous data fetching with structured state caching and error handling."
      }
    ],
    implementation: [
      {
        title: "Component Modularity",
        detail: "Built with reusable React components for media cards, modal overlays, filter bars, and navigation rails."
      },
      {
        title: "Motion Architecture",
        detail: "Utilized GSAP timelines for hardware-accelerated animations, avoiding browser layout thrashing."
      },
      {
        title: "State Management",
        detail: "Used native React hooks (useState, useEffect, useMemo) for predictable local state and filter management."
      }
    ],
    image: "", // Fallback to technical geometric preview
    video: "",
    slug: "movie-experience",
    liveUrl: "",
    githubUrl: "https://github.com/bhaskarc693"
  },
  {
    id: 2,
    number: "02",
    title: "CREATIVE LANDING PAGE",
    category: "Interactive UI",
    role: "Interactive Frontend & Motion",
    isFeatured: false,
    description: "An editorial landing page experience featuring tactile magnetic hover physics, synchronized micro-animations, and dynamic glassmorphism layout reflow.",
    overview: "An editorial landing page crafted to demonstrate modern interactive web design, combining tactile magnetic cursor physics, micro-interactions, and dark luxury glassmorphism with high visual fidelity.",
    technologies: ["React", "JavaScript", "GSAP", "Tailwind CSS", "UI/UX"],
    features: [
      {
        number: "01",
        title: "Magnetic Cursor Physics",
        description: "Real-time cursor coordinates and magnetic button attraction with lerp smoothing."
      },
      {
        number: "02",
        title: "Editorial Typography",
        description: "Strict typographic hierarchy with high-contrast display headlines and mono metadata."
      },
      {
        number: "03",
        title: "Glassmorphic Panels",
        description: "Restrained dark frosted glass styling with subtle 1px borders and high-performance backdrops."
      },
      {
        number: "04",
        title: "Responsive Grid Reflow",
        description: "Fluid multi-column transitions maintaining visual balance across all screen sizes."
      }
    ],
    implementation: [
      {
        title: "Micro-Interactions",
        detail: "Engineered mouse-tracking listeners with smooth lerp interpolation for tactile button feedback."
      },
      {
        title: "CSS Design System",
        detail: "Built on Tailwind CSS utility layers with custom tokens for colors, spacing, and glass effects."
      },
      {
        title: "Accessibility & Fallbacks",
        detail: "Full fallback support for touch devices and users with prefers-reduced-motion preferences."
      }
    ],
    image: "",
    video: "",
    slug: "creative-landing",
    liveUrl: "",
    githubUrl: "https://github.com/bhaskarc693"
  },
  {
    id: 3,
    number: "03",
    title: "3D INTERACTIVE WEB PORTAL",
    category: "WebGL / Creative 3D",
    role: "Creative Developer (3D & WebGL)",
    isFeatured: false,
    description: "An experimental 3D interactive portal utilizing Three.js and React Three Fiber. Features an organic particle mesh that morphs smoothly with mouse coordinates and viewport scrolling.",
    overview: "An experimental 3D interactive web portal utilizing Three.js and React Three Fiber. The portal explores dynamic lighting, particle clouds, and geometry deformation driven by user cursor interaction without compromising page speed.",
    technologies: ["React", "Three.js", "React Three Fiber", "GSAP", "WebGL"],
    features: [
      {
        number: "01",
        title: "Real-Time 3D Mesh",
        description: "Holographic crystal sphere and rotating gyroscope orbital rings with physical clearcoat."
      },
      {
        number: "02",
        title: "Ambient Particle Cloud",
        description: "500+ floating particles with subtle depth, custom lighting, and camera movement."
      },
      {
        number: "03",
        title: "Mouse Coordinate Tracking",
        description: "Smooth spatial rotation and parallax tied to normalized viewport coordinates."
      },
      {
        number: "04",
        title: "Performance Scaling",
        description: "Caps device pixel ratio (dpr) and dynamically scales particle counts on mobile devices."
      }
    ],
    implementation: [
      {
        title: "React Three Fiber Canvas",
        detail: "Declarative Three.js scene architecture integrated directly into the React component lifecycle."
      },
      {
        title: "Performance Optimization",
        detail: "DPR capping and mobile particle reduction to maintain 60 FPS without GPU overheating."
      },
      {
        title: "Graceful WebGL Fallback",
        detail: "Built-in hardware detection that gracefully degrades if WebGL is unsupported."
      }
    ],
    image: "",
    video: "",
    slug: "three-experience",
    liveUrl: "",
    githubUrl: "https://github.com/bhaskarc693"
  },
  {
    id: 4,
    number: "04",
    title: "MODERN ANALYTICS DASHBOARD",
    category: "Application UI",
    role: "Frontend Engineering & UI Systems",
    isFeatured: false,
    description: "A frontend dashboard interface engineered for modular widget management, dataset visual cards, and high-contrast dark OLED styling.",
    overview: "A frontend dashboard interface engineered for modular widget management, dataset visual cards, and high-contrast dark OLED styling with accessible data presentations and responsive sidebar navigation.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "UI/UX"],
    features: [
      {
        number: "01",
        title: "Modular Widget Architecture",
        description: "Reusable metrics panels, data visual cards, and interactive table components."
      },
      {
        number: "02",
        title: "Dark OLED Aesthetics",
        description: "Deep near-black surfaces with high-contrast typography and subtle 1px border dividers."
      },
      {
        number: "03",
        title: "Responsive Sidebar Navigation",
        description: "Collapsible sidebar and drawer navigation tailored for compact and mobile screens."
      },
      {
        number: "04",
        title: "Clean State Architecture",
        description: "Structured state models for metric filtering, active views, and data presentation."
      }
    ],
    implementation: [
      {
        title: "Widget Composition",
        detail: "Encapsulated metric cards with independent state boundaries for clean re-rendering."
      },
      {
        title: "Accessibility & Semantics",
        detail: "Clean semantic markup, keyboard focus states, and high contrast compliant with WCAG standards."
      },
      {
        title: "Responsive Breakpoints",
        detail: "Adaptive grid reflow supporting multi-pane layouts on desktop and compact lists on mobile."
      }
    ],
    image: "",
    video: "",
    slug: "modern-dashboard",
    liveUrl: "",
    githubUrl: "https://github.com/bhaskarc693"
  }
];

export default projects;
