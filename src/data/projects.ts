import portfolioScreenshot from "../assets/profile/portfolio-screenshot.png";
import dashboardScreenshot from "../assets/profile/Dashboard-screenshot.png";

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool with real-time updates, team collaboration features, and intuitive kanban boards.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "A machine learning system that analyzes transaction patterns to detect fraudulent credit card activities in real-time. Features advanced anomaly detection algorithms and high-accuracy classification models.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    liveUrl: "",
    githubUrl: "https://github.com/shahharsh06/credit-card-fraud-detection",
    featured: true,
  },
  {
    title: "International Student Financial Dashboard",
    description:
      "A comprehensive financial analysis and planning tool designed specifically for international students. Features expense tracking, scenario analysis, ROI calculations, and interactive visualizations with robust architecture.",
    image: dashboardScreenshot,
    technologies: ["Python", "Streamlit", "Pandas", "Plotly", "NumPy", "CSS3", "HTML5"],
    liveUrl: "https://international-student-dashboard.streamlit.app/",
    githubUrl: "https://github.com/shahharsh06/International_Student_Dashboard",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather application with location-based forecasts, interactive maps, and beautiful data visualizations.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, high-performance portfolio built with React, TypeScript, and Tailwind CSS. Features dark/light mode, animated UI, a live dashboard with CI/CD-driven test coverage, and a fully tested, accessible codebase. Showcases best practices in frontend engineering, testing, and deployment.",
    image: portfolioScreenshot,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Jest/Vitest",
      "React Testing Library",
      "Framer Motion",
      "Chart.js",
      "CI/CD",
      "GitHub Actions",
      "Accessibility (a11y)",
    ],
    liveUrl: "https://shahharsh06.github.io/harsh-portfolio/",
    githubUrl: "https://github.com/shahharsh06/harsh-portfolio",
    featured: true,
  },
  {
    title: "Recipe Finder App",
    description:
      "A recipe discovery app with ingredient-based search, nutritional information, and personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React Native", "Node.js", "MongoDB", "Spoonacular API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Fitness Tracker",
    description:
      "A comprehensive fitness tracking application with workout planning, progress monitoring, and social features.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "JWT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    title: "Blog Platform",
    description:
      "A full-featured blogging platform with markdown support, user authentication, and content management system.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=240&fit=crop&crop=center&auto=format&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Markdown", "JWT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
