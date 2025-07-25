import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon, DashboardIcon } from "./icons";
import { useMobileMenu } from "./MobileMenuContext.utils";
import { scrollToSection } from "./Navigation.utils";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

// Reusable social icon button component
const SocialIconButton = ({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
}) => (
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

export const SocialIcons = ({ socialLinks }: { socialLinks: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] }) => (
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

const Navigation = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Career & Education", href: "#career-education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "Dashboard", href: "/harsh-portfolio/dashboard.html", icon: DashboardIcon },
    { label: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-smooth overflow-x-hidden ${
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gradient">{PERSONAL_INFO.name.split(' ')[0]}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href, setIsMobileMenuOpen)}
                  className="text-foreground hover:text-primary transition-fast px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-3 ml-6">
                <ThemeToggle />
                <SocialIcons socialLinks={socialLinks} />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Full screen overlay with blur effect */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Mobile menu */}
            <div className="md:hidden fixed top-16 left-0 right-0 z-50 px-4">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg card-shadow">
                {/* Mobile menu header with close button */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                  <span className="text-lg font-semibold text-foreground">Menu</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover-glow rounded-full p-0 w-10 h-10 flex items-center justify-center group"
                  >
                    <div className="rounded-full bg-transparent p-2 group-hover:bg-primary/20 group-focus:bg-primary/20 group-active:bg-primary/20 transition-colors">
                      <X className="h-4 w-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors" />
                    </div>
                  </Button>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href, setIsMobileMenuOpen)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-fast w-full text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center space-x-3 px-3 py-2">
                  <ThemeToggle />
                  <SocialIcons socialLinks={socialLinks} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;