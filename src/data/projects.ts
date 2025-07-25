import portfolioScreenshot from "../assets/profile/portfolio-screenshot.png";

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
    description: "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates, team collaboration features, and intuitive kanban boards.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center",
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by machine learning, featuring natural language processing and context-aware responses.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
    technologies: ["Python", "TensorFlow", "OpenAI API", "FastAPI", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Data Analytics Dashboard",
    description: "A comprehensive analytics platform with real-time data visualization, interactive charts, and business intelligence insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    title: "Weather Dashboard",
    description: "A responsive weather application with location-based forecasts, interactive maps, and beautiful data visualizations.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop&crop=center",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    title: "Portfolio Website",
    description: "A modern, high-performance portfolio built with React, TypeScript, and Tailwind CSS. Features dark/light mode, animated UI, a live dashboard with CI/CD-driven test coverage, and a fully tested, accessible codebase. Showcases best practices in frontend engineering, testing, and deployment.",
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
      "Accessibility (a11y)"
    ],
    liveUrl: "https://shahharsh06.github.io/harsh-portfolio/",
    githubUrl: "https://github.com/shahharsh06/harsh-portfolio",
    featured: true
  },
  {
    title: "Recipe Finder App",
    description: "A recipe discovery app with ingredient-based search, nutritional information, and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop&crop=center",
    technologies: ["React Native", "Node.js", "MongoDB", "Spoonacular API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    title: "Fitness Tracker",
    description: "A comprehensive fitness tracking application with workout planning, progress monitoring, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "JWT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    title: "Blog Platform",
    description: "A full-featured blogging platform with markdown support, user authentication, and content management system.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop&crop=center",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  }
];

export const featuredProjects = projects.filter(p => p.featured);
export const otherProjects = projects.filter(p => !p.featured); 