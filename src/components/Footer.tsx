import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, EnvelopeIcon } from "./icons";
import { Heart, ArrowUp } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: GithubIcon, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: LinkedinIcon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: EnvelopeIcon, href: SOCIAL_LINKS.email, label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left hidden md:block">
            <span className="text-xl font-bold text-gradient block mb-2">{PERSONAL_INFO.name.split(' ')[0]}</span>
            <p className="text-muted-foreground text-sm">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                asChild
                className="hover-glow rounded-full p-0 w-10 h-10 flex items-center justify-center group"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <div className="rounded-full bg-transparent p-2 group-hover:bg-primary/20 group-focus:bg-primary/20 group-active:bg-primary/20 transition-colors">
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors" />
                  </div>
                </a>
              </Button>
            ))}
          </div>

          {/* Back to Top for desktop (md and up) */}
          <div className="hidden md:flex text-center md:text-right justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary focus:text-primary active:text-primary transition-smooth"
            >
              <ArrowUp className="h-5 w-5 animate-bounce" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Made with{" "}
            <Heart className="h-4 w-4 text-red-500 fill-current" />{" "}
            by <span className="text-gradient font-semibold">{PERSONAL_INFO.name.split(' ')[0]}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;