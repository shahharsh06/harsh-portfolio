import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import heroImage from "@/assets/profile/harsh_profile_image.jpg";
import resumeFile from "@/assets/resume/Harsh_SE_Resume.pdf";
import { GradientButton } from "./ui/GradientButton";
import { PERSONAL_INFO } from "@/lib/constants";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleDisplayText, setTitleDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fullName = PERSONAL_INFO.name;
  
  // Titles array wrapped in useMemo to prevent unnecessary re-renders
  const titles = useMemo(() => [
    'AI Enthusiast',
    'Machine Learning Engineer',
    'Data Scientist', 
    'Python Developer'
  ], []);

  // Name typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fullName.length) {
        setDisplayText(fullName.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset animation after a pause
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
        }, 2000);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [currentIndex, fullName]);

  // Title typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && titleDisplayText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setTitleDisplayText(currentTitle.slice(0, titleDisplayText.length + 1));
      }, 100);
    } else if (isDeleting && titleDisplayText.length > 0) {
      timeout = setTimeout(() => {
        setTitleDisplayText(currentTitle.slice(0, titleDisplayText.length - 1));
      }, 50);
    } else if (!isDeleting && titleDisplayText.length === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && titleDisplayText.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [titleDisplayText, isDeleting, titleIndex, titles]);

  const scrollToContact = () => {
    try {
      const element = document.querySelector("#contact");
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      // Silently handle scroll errors to prevent crashes
      console.warn('Scroll to contact failed:', error);
    }
  };

  const scrollToAbout = () => {
    try {
      const element = document.querySelector("#about");
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      // Silently handle scroll errors to prevent crashes
      console.warn('Scroll to about failed:', error);
    }
  };

  return (
    <section id="home" data-testid="hero-section" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Image */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-48 h-60 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-transparent bg-gradient-to-r from-primary to-cyan-400 p-[0.5px] shadow-2xl hover:shadow-glow transition-all duration-300">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Harsh Shah — Machine Learning & Software Engineer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="640"
                  height="768"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 to-transparent"></div>
            </motion.div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight relative inline-block">
                Hi, I'm{" "}
                <span className="relative inline-block align-middle" style={{ minWidth: '1ch' }}>
                  {/* Reserve space for full name */}
                  <span className="opacity-0 select-none">
                    Harsh Shah|
                  </span>
                  {/* Animated name absolutely positioned on top */}
                  <span className="absolute left-0 top-0 w-full h-full text-gradient">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground">
                {titleDisplayText}
                <span className="animate-pulse">|</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg text-justify">
                Passionate about building intelligent systems and scalable applications. 
                Master's in Computer Science graduate from Texas A&M University, 
                with expertise in machine learning, data science, and software development.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton
                onClick={scrollToContact}
                className="px-8 py-3"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </GradientButton>
              <GradientButton
                className="px-8 py-3"
                asChild
              >
                <a href={resumeFile} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </GradientButton>
            </div>

            {/* Stats Section - Responsive */}
            <div className="grid grid-cols-3 gap-4 text-center sm:flex sm:items-center sm:space-x-8 sm:text-left">
              <div className="flex flex-col items-center sm:items-center">
                <span className="text-2xl font-bold text-gradient">1+</span>
                <p className="text-sm">Years<br className="sm:hidden" />Experience</p>
              </div>
              <div className="flex flex-col items-center sm:items-center">
                <span className="text-2xl font-bold text-gradient">10+</span>
                <p className="text-sm">Projects<br className="sm:hidden" />Completed</p>
              </div>
              <div className="flex flex-col items-center sm:items-center">
                <span className="text-2xl font-bold text-gradient">25+</span>
                <p className="text-sm">Technologies</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
              <button
                onClick={scrollToAbout}
                className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-smooth"
              >
                <span className="text-sm">Scroll to explore</span>
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;