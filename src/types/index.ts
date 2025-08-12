import React from "react";

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

// Skill Types
export interface Skill {
  name: string;
  category: string;
  level: number;
}

// Timeline Types
export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  type: "education" | "experience";
  technologies?: string[];
}

// Social Links Types
export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Personal Info Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  about: string;
  skills: Skill[];
}

// Theme Types
export type Theme = "light" | "dark" | "system";

// Toast Types
export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Dashboard Types
export interface DashboardData {
  coverage: {
    percentage: number;
    threshold: number;
  };
  functions: {
    percentage: number;
    threshold: number;
  };
  tests: {
    count: number;
    passing: number;
  };
  security: {
    score: number;
    highSeverityIssues: number;
  };
  workflows: {
    ci: string;
    deploy: string;
  };
  lastUpdated: string;
  componentCoverage: Array<{
    name: string;
    coverage: number;
  }>;
  testCategories: Array<{
    name: string;
    count: number;
  }>;
  quality: {
    typescriptCoverage: string;
    lintingScore: string;
    buildSuccessRate: string;
    deploymentSuccess: string;
    securityVulnerabilities: number;
  };
  recommendations: Array<{
    title: string;
    items: string[];
  }>;
}
