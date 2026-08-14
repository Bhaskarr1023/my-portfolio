// Centralized projects showcase data

export const projects = [
  {
    id: 1,
    number: "01",
    title: "MOVIE EXPERIENCE",
    category: "WEB EXPERIENCE",
    description: "A responsive movie discovery interface focused on immersive visuals, smooth transitions, and intuitive layout architecture. Built using React, GSAP for rich timeline transitions, and Tailwind CSS for responsive styling.",
    technologies: ["React", "JavaScript", "GSAP", "Tailwind CSS"],
    image: "", // Empty path represents that it will fall back to dynamic CSS/SVG preview placeholder
    video: "",
    slug: "movie-experience",
    liveUrl: "https://example.com/movie-experience", // Simulated URLs as requested
    githubUrl: "https://github.com/bhaskar/movie-experience"
  },
  {
    id: 2,
    number: "02",
    title: "CREATIVE LANDING PAGE",
    category: "INTERACTIVE DESIGN",
    description: "A high-end landing page showcasing complex interactive hover events, micro-animations, and dynamic layout reflow. Fully responsive design featuring editorial columns and subtle glassmorphic sections.",
    technologies: ["React", "JavaScript", "GSAP", "Tailwind CSS"],
    image: "",
    video: "",
    slug: "creative-landing",
    liveUrl: "", // Optional URLs will not render button if left empty
    githubUrl: "https://github.com/bhaskar/creative-landing"
  },
  {
    id: 3,
    number: "03",
    title: "3D INTERACTIVE EXPERIENCE",
    category: "WebGL / THREEJS",
    description: "An experimental 3D interactive web portal using Three.js and React Three Fiber. Includes an organic particle mesh that morphs in response to mouse navigation and viewport scrolling details.",
    technologies: ["React", "Three.js", "React Three Fiber", "GSAP"],
    image: "",
    video: "",
    slug: "three-experience",
    liveUrl: "https://example.com/three-experience",
    githubUrl: ""
  },
  {
    id: 4,
    number: "04",
    title: "MODERN DASHBOARD",
    category: "APPLICATION DESIGN",
    description: "A professional frontend dashboard layout managing complex dataset displays, modular widgets, and premium dark theme visualization. Emphasizes clean UI state, data security, and responsive layouts.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "UI/UX"],
    image: "",
    video: "",
    slug: "modern-dashboard",
    liveUrl: "",
    githubUrl: ""
  }
];

export default projects;
