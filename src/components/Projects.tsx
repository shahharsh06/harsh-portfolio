import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionIcon from "./SectionIcon";
import { ProjectCard } from "./ui/ProjectCard";
import { useRef, useState } from "react";
import { Project, featuredProjects, otherProjects } from "@/data/projects";
import { useCarousel } from "@/hooks/useCarousel";
import { useResponsive } from "@/hooks/useResponsive";
import { CAROUSEL_INTERVALS } from "@/lib/constants";
import { getCardWidthClass, getCardPadding, getCoverflowStyle, getRollingWindow } from "@/lib/utils";

// Reusable navigation button component
const NavigationButton = ({ 
  direction, 
  onClick, 
  className = "", 
  label 
}: { 
  direction: 'prev' | 'next'; 
  onClick: () => void; 
  className?: string; 
  label: string; 
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const baseClasses = "absolute top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 z-20";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
};

// Reusable coverflow component for mobile
const CoverflowCarousel = ({ 
  projects, 
  currentIndex, 
  onNavigate, 
  onMouseEnter, 
  onMouseLeave,
  isHovered,
  type = 'featured'
}: { 
  projects: Project[]; 
  currentIndex: number; 
  onNavigate: (direction: 'prev' | 'next') => void; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void; 
  isHovered: boolean; 
  type?: 'featured' | 'other';
}) => {
  // For mobile coverflow, we use single-step navigation for consistent UX
  // The auto-scroll will still work with the multi-step pattern, but display will be smooth
  const displayIndex = currentIndex % projects.length;

  return (
    <div className="flex items-center justify-center h-96">
      <div className="relative w-[90vw] max-w-[480px] h-full flex items-center justify-center">
        <div 
          className="flex items-center justify-center w-full h-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {projects.map((project, index) => {
            const n = projects.length;
            let offset = (index - displayIndex + n) % n;
            if (offset > n / 2) offset -= n;
            
            let style;
            if (offset === 0) {
              style = {
                transform: 'scale(1) rotateY(0deg) translateX(0px) translate(-50%, -50%)',
                zIndex: 10,
                opacity: 1,
                filter: 'none',
              };
            } else if (offset === -1 || offset === 1) {
              style = {
                transform: `scale(0.85) rotateY(${offset === -1 ? 30 : -30}deg) translateX(${offset === -1 ? -40 : 40}px) translate(-50%, -50%)`,
                zIndex: 5,
                opacity: 0.7,
                filter: 'blur(0.5px)',
              };
            } else {
              style = {
                transform: `scale(0.7) translateX(${offset * 60}px) translate(-50%, -50%)`,
                zIndex: 1,
                opacity: 0.3,
                filter: 'blur(1px)',
                pointerEvents: 'none',
              };
            }
            
            return (
              <div 
                key={index} 
                className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out"
                style={{
                  ...style,
                  width: 'min(90vw, 480px)',
                  maxWidth: '100%',
                  ...(style.pointerEvents ? { pointerEvents: style.pointerEvents } : {}),
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  featured={type === 'featured'}
                />
              </div>
            );
          })}
        </div>
        <NavigationButton
          direction="prev"
          onClick={() => onNavigate('prev')}
          className="left-0 -translate-x-1/2"
          label="Previous project"
        />
        <NavigationButton
          direction="next"
          onClick={() => onNavigate('next')}
          className="right-0 translate-x-1/2"
          label="Next project"
        />
      </div>
    </div>
  );
};

// Reusable desktop carousel component
const DesktopCarousel = ({ 
  projects, 
  currentIndex, 
  visibleCount, 
  onNavigate, 
  onMouseEnter, 
  onMouseLeave,
  type = 'featured'
}: { 
  projects: Project[]; 
  currentIndex: number; 
  visibleCount: number; 
  onNavigate: (direction: 'prev' | 'next') => void; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void; 
  type?: 'featured' | 'other'; 
}) => (
  <div className="relative">
    <div
      className="flex overflow-hidden"
      style={{ position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ width: '100%' }}
      >
        {getRollingWindow(projects, currentIndex, visibleCount).map((project, i) => (
          <div
            key={i + '-' + project.title}
            className={`flex-shrink-0 ${getCardWidthClass(visibleCount, type)} ${getCardPadding(i, visibleCount)} h-full`}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              featured={type === 'featured'}
            />
          </div>
        ))}
      </div>
    </div>
    <NavigationButton
      direction="prev"
      onClick={() => onNavigate('prev')}
      className="left-0 -translate-x-full opacity-60"
      label="Previous project"
    />
    <NavigationButton
      direction="next"
      onClick={() => onNavigate('next')}
      className="right-0 translate-x-full opacity-60"
      label="Next project"
    />
  </div>
);

const Projects = () => {
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const [isOtherHovered, setIsOtherHovered] = useState(false);
  
  const { isSmallScreen, visibleFeatured, visibleOther } = useResponsive();
  
  // Enhanced carousel hooks with auto-scrolling for desktop (multi-step)
  const {
    currentIndex: currentFeaturedIndex,
    next: nextFeatured,
    prev: prevFeatured,
    pause: pauseFeatured,
    resume: resumeFeatured,
  } = useCarousel(featuredProjects.length, 0, {
    autoPlay: true,
    interval: CAROUSEL_INTERVALS.FEATURED,
    pauseOnHover: true,
    type: 'featured',
    isMobile: false
  });

  const {
    currentIndex: currentOtherIndex,
    next: nextOther,
    prev: prevOther,
    pause: pauseOther,
    resume: resumeOther,
  } = useCarousel(otherProjects.length, 0, {
    autoPlay: true,
    interval: CAROUSEL_INTERVALS.OTHER,
    pauseOnHover: true,
    type: 'other',
    isMobile: false
  });

  // Mobile carousel hooks with single-step navigation for consistent UX
  const {
    currentIndex: currentFeaturedMobileIndex,
    next: nextFeaturedMobile,
    prev: prevFeaturedMobile,
    pause: pauseFeaturedMobile,
    resume: resumeFeaturedMobile,
  } = useCarousel(featuredProjects.length, 0, {
    autoPlay: true,
    interval: CAROUSEL_INTERVALS.FEATURED,
    pauseOnHover: true,
    type: 'featured',
    isMobile: true
  });

  const {
    currentIndex: currentOtherMobileIndex,
    next: nextOtherMobile,
    prev: prevOtherMobile,
    pause: pauseOtherMobile,
    resume: resumeOtherMobile,
  } = useCarousel(otherProjects.length, 0, {
    autoPlay: true,
    interval: CAROUSEL_INTERVALS.OTHER,
    pauseOnHover: true,
    type: 'other',
    isMobile: true
  });

  const scrollToFeatured = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevFeatured();
    } else {
      nextFeatured();
    }
  };

  const scrollToOther = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevOther();
    } else {
      nextOther();
    }
  };

  const scrollToFeaturedMobile = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevFeaturedMobile();
    } else {
      nextFeaturedMobile();
    }
  };

  const scrollToOtherMobile = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevOtherMobile();
    } else {
      nextOtherMobile();
    }
  };

  // Handle hover events for auto-scroll pause/resume
  const handleFeaturedHover = (isHovered: boolean) => {
    setIsFeaturedHovered(isHovered);
    if (isHovered) {
      pauseFeatured();
      pauseFeaturedMobile();
    } else {
      resumeFeatured();
      resumeFeaturedMobile();
    }
  };

  const handleOtherHover = (isHovered: boolean) => {
    setIsOtherHovered(isHovered);
    if (isHovered) {
      pauseOther();
      pauseOtherMobile();
    } else {
      resumeOther();
      resumeOtherMobile();
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <SectionIcon icon={<Code2 />} size={28} padding="p-3" interactive={true} />
            <span>Featured <span className="text-gradient">Projects</span></span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-16">
          {isSmallScreen ? (
            <CoverflowCarousel
              projects={featuredProjects}
              currentIndex={currentFeaturedMobileIndex}
              onNavigate={scrollToFeaturedMobile}
              onMouseEnter={() => handleFeaturedHover(true)}
              onMouseLeave={() => handleFeaturedHover(false)}
              isHovered={isFeaturedHovered}
              type="featured"
            />
          ) : (
            <DesktopCarousel
              projects={featuredProjects}
              currentIndex={currentFeaturedIndex}
              visibleCount={visibleFeatured}
              onNavigate={scrollToFeatured}
              onMouseEnter={() => handleFeaturedHover(true)}
              onMouseLeave={() => handleFeaturedHover(false)}
              type="featured"
            />
          )}
        </div>

        {/* Other Projects Section */}
        {/**
        <div className="relative">
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          {isSmallScreen ? (
            <CoverflowCarousel
              projects={otherProjects}
              currentIndex={currentOtherMobileIndex}
              onNavigate={scrollToOtherMobile}
              onMouseEnter={() => handleOtherHover(true)}
              onMouseLeave={() => handleOtherHover(false)}
              isHovered={isOtherHovered}
              type="other"
            />
          ) : (
            <DesktopCarousel
              projects={otherProjects}
              currentIndex={currentOtherIndex}
              visibleCount={visibleOther}
              onNavigate={scrollToOther}
              onMouseEnter={() => handleOtherHover(true)}
              onMouseLeave={() => handleOtherHover(false)}
              type="other"
            />
          )}
        </div>
        **/}
      </div>
    </section>
  );
};

export default Projects;
