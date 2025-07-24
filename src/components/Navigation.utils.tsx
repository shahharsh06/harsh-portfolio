// Utility functions and constants for Navigation
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, DashboardIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import React from "react";

export const scrollToSection = (href: string, setIsMobileMenuOpen: (open: boolean) => void) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth" });
  setIsMobileMenuOpen(false);
};

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

interface SocialIconButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}
export const SocialIconButton: React.FC<SocialIconButtonProps> = ({ href, icon: Icon, label }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="hover-glow rounded-full p-0 w-10 h-10 flex items-center justify-center group"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="rounded-full bg-transparent p-2 group-hover:bg-primary/20 group-focus:bg-primary/20 group-active:bg-primary/20 transition-colors">
          <Icon className="h-4 w-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors" />
        </div>
      </a>
    </Button>
  );
};

interface SocialIconsProps {
  socialLinks: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}
export const SocialIcons: React.FC<SocialIconsProps> = ({ socialLinks }) => {
  return (
    <div className="flex items-center space-x-3">
      {socialLinks.map((link) => (
        <SocialIconButton
          key={link.label}
          href={link.href}
          icon={link.icon}
          label={link.label}
        />
      ))}
    </div>
  );
}; 