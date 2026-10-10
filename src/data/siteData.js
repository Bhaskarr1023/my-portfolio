// Global site data lists for easy editing and separation of content from presentation

export const technologies = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "GSAP",
  "Three.js",
  "React Three Fiber",
  "UI/UX Design",
  "Vite"
];

export const skillCategories = [
  {
    number: "01",
    category: "Frontend Engineering",
    skills: [
      { name: "React", tag: "SPA Architecture", detail: "Hooks, Context, State & Component Systems" },
      { name: "JavaScript", tag: "ES6+ / Modern", detail: "Asynchronous APIs, Event Loop & Modular Architecture" },
      { name: "Tailwind CSS", tag: "Styling & Tokens", detail: "Modern Design Systems & Fluid Layouts" },
      { name: "HTML5 & CSS3", tag: "Semantic & Core", detail: "Accessible Markup, Flexbox, CSS Grid & Custom Properties" },
      { name: "Vite", tag: "Tooling & Bundling", detail: "Optimized Production Builds & Fast Development" }
    ]
  },
  {
    number: "02",
    category: "Motion & Animation",
    skills: [
      { name: "GSAP", tag: "Timeline Engine", detail: "Hardware-Accelerated Sequences & Custom Easings" },
      { name: "ScrollTrigger", tag: "Scroll Choreography", detail: "Pinning, Parallax, Entrance Reveals & Page Morphing" },
      { name: "Micro-Interactions", tag: "UI Feedback", detail: "Magnetic Cursors, Button Physics & Tactile States" }
    ]
  },
  {
    number: "03",
    category: "3D & Creative Web",
    skills: [
      { name: "Three.js", tag: "WebGL Engine", detail: "Scene Graphs, Meshes, PBR Materials & Custom Lighting" },
      { name: "React Three Fiber", tag: "Declarative 3D", detail: "Canvas Integrations, Orbit Controls & Drei Helpers" },
      { name: "WebGL Basics", tag: "Shaders & Graphics", detail: "Atmospheric Fog, Particle Clouds & Render Optimization" }
    ]
  },
  {
    number: "04",
    category: "Workflow & Craft",
    skills: [
      { name: "Git & GitHub", tag: "Version Control", detail: "Clean Commits, Branching & Deployment Workflows" },
      { name: "UI/UX Precision", tag: "Design Systems", detail: "Visual Hierarchy, Typography, Spacing & Contrast" },
      { name: "Responsive Design", tag: "Mobile-First", detail: "Multi-device Layout Adaptations (320px to 4K)" }
    ]
  }
];

export const capabilities = [
  "Frontend Web Development",
  "UI / UX Interface Design",
  "Interactive Web Experiences",
  "3D WebGL Experiences",
  "Motion & GSAP Animation",
  "Mobile-First Responsive Architecture"
];

export const services = [
  {
    number: "01",
    title: "FRONTEND DEVELOPMENT",
    symbol: "</>",
    description: "Engineering scalable single-page applications with clean React component architecture, modular state management, and optimized rendering.",
    tags: ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Vite"]
  },
  {
    number: "02",
    title: "UI / UX IMPLEMENTATION",
    symbol: "✦",
    description: "Translating design systems and Figma concepts into responsive, pixel-perfect, accessible interfaces with meticulous visual hierarchy.",
    tags: ["Design Systems", "Responsive Layouts", "Visual Hierarchy", "Accessibility (a11y)"]
  },
  {
    number: "03",
    title: "MOTION & INTERACTION",
    symbol: "↗",
    description: "Crafting fluid scroll-triggered transitions, entrance reveals, and magnetic micro-interactions that make websites feel dynamic and alive.",
    tags: ["GSAP", "ScrollTrigger", "Page Transitions", "Micro-Interactions"]
  },
  {
    number: "04",
    title: "3D & CREATIVE WEB",
    symbol: "◉",
    description: "Integrating Three.js and WebGL scenes to introduce spatial depth, dynamic lighting, and interactive 3D elements into modern web interfaces.",
    tags: ["Three.js", "React Three Fiber", "WebGL Basics", "Interactive 3D"]
  }
];

export const howIThink = [
  {
    number: "01",
    statement: "Design with purpose.",
    description: "Visual aesthetics should always support utility and clear communication."
  },
  {
    number: "02",
    statement: "Build with clean code.",
    description: "Component modularity, optimized rendering, and clean architecture are paramount."
  },
  {
    number: "03",
    statement: "Motion should communicate.",
    description: "Transitions and motion should guide focus rather than distract."
  },
  {
    number: "04",
    statement: "Every interaction matters.",
    description: "Micro-interactions provide immediate, tactile feedback for a premium feel."
  }
];

export default {
  technologies,
  skillCategories,
  capabilities,
  services,
  howIThink
};
