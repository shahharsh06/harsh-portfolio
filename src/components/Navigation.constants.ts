// Navigation constants and helpers
import { GithubIcon, LinkedinIcon, DashboardIcon } from "./icons";
import { SOCIAL_LINKS } from "@/lib/constants";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Career & Education", href: "#career-education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "Dashboard", href: "/harsh-portfolio/dashboard.html", icon: DashboardIcon },
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
]; 