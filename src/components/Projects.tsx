import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionIcon from "./SectionIcon";
import ProjectCard from "./ui/ProjectCard";
import { useRef, useState } from "react";
import { featuredProjects, otherProjects } from "@/data/projects";
import { useCarousel } from "@/hooks/useCarousel";
import { useResponsive } from "@/hooks/useResponsive";
import { CAROUSEL_INTERVALS } from "@/lib/constants";
import { getCardWidthClass, getCardPadding, getCoverflowStyle, getRollingWindow } from "@/lib/utils";

const Projects = () => {
  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const otherCarouselRef = useRef<HTMLDivElement>(null);
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const [isOtherHovered, setIsOtherHovered] = useState(false);
  
  const { isSmallScreen, visibleFeatured, visibleOther } = useResponsive();
  
  const {
    currentIndex: currentFeaturedIndex,
    scrollTo: scrollToFeatured,
  } = useCarousel({
    items: featuredProjects,
    autoSlideInterval: CAROUSEL_INTERVALS.FEATURED,
    isHovered: isFeaturedHovered,
  });

  const {
    currentIndex: currentOtherIndex,
    scrollTo: scrollToOther,
  } = useCarousel({
    items: otherProjects,
    autoSlideInterval: CAROUSEL_INTERVALS.OTHER,
    isHovered: isOtherHovered,
  });



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
        <div className="mb-16 relative">
          {isSmallScreen ? (
            // Coverflow/Parallax for small screens (circular/rolling)
            <div className="flex items-center justify-center h-96">
              <div className="relative w-[90vw] max-w-[480px] h-full flex items-center justify-center">
                <div
                  className="flex items-center justify-center w-full h-full"
                  onMouseEnter={() => setIsFeaturedHovered(true)}
                  onMouseLeave={() => setIsFeaturedHovered(false)}
                >
                  {featuredProjects.map((project, index) => {
                    // Circular coverflow: calculate offset with modulo
                    const n = featuredProjects.length;
                    let offset = (index - currentFeaturedIndex + n) % n;
                    // For coverflow, treat -1 and n-1 as neighbors
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
                        className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out`}
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
                          featured
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Featured Projects Navigation Arrows for mobile/coverflow */}
                <button
                  onClick={() => scrollToFeatured('prev')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 z-20"
                  aria-label="Previous featured project"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => scrollToFeatured('next')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 z-20"
                  aria-label="Next featured project"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : (
            // Circular/rolling window for large screens
            <div className="mb-16 relative">
              <div
                className="flex overflow-hidden"
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsFeaturedHovered(true)}
                onMouseLeave={() => setIsFeaturedHovered(false)}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    // No transform needed for rolling window
                    width: '100%',
                  }}
                >
                  {getRollingWindow(featuredProjects, currentFeaturedIndex, visibleFeatured).map((project, i) => (
                    <div
                      key={i + '-' + project.title}
                      className={`flex-shrink-0 ${getCardWidthClass(visibleFeatured, 'featured')} ${getCardPadding(i, visibleFeatured)}`}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        liveUrl={project.liveUrl}
                        featured
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Featured Projects Navigation Arrows for desktop/large screens */}
              <button
                onClick={() => scrollToFeatured('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-60 hover:opacity-100 z-20"
                aria-label="Previous featured project"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => scrollToFeatured('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-60 hover:opacity-100 z-20"
                aria-label="Next featured project"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Other Projects Section */}
        <div className="relative">
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          {isSmallScreen ? (
            // Coverflow/Parallax for small screens (circular/rolling)
            <div className="flex items-center justify-center h-96">
              <div className="relative w-[90vw] max-w-[480px] h-full flex items-center justify-center">
                <div
                  className="flex items-center justify-center w-full h-full"
                  onMouseEnter={() => setIsOtherHovered(true)}
                  onMouseLeave={() => setIsOtherHovered(false)}
                >
                  {otherProjects.map((project, index) => {
                    // Circular coverflow: calculate offset with modulo
                    const n = otherProjects.length;
                    let offset = (index - currentOtherIndex + n) % n;
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
                        className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out`}
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
                          technologies={project.technologies}
                          githubUrl={project.githubUrl}
                          liveUrl={project.liveUrl}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Other Projects Navigation Arrows for mobile/coverflow */}
                <button
                  onClick={() => scrollToOther('prev')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 bg-background/90 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-90 hover:opacity-100"
                  aria-label="Previous other project"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => scrollToOther('next')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 bg-background/90 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-90 hover:opacity-100"
                  aria-label="Next other project"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : (
            // Circular/rolling window for large screens
            <div className="relative w-full">
              <div
                className="flex overflow-hidden"
                onMouseEnter={() => setIsOtherHovered(true)}
                onMouseLeave={() => setIsOtherHovered(false)}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    width: '100%',
                  }}
                >
                  {getRollingWindow(otherProjects, currentOtherIndex, visibleOther).map((project, i) => (
                    <div
                      key={i + '-' + project.title}
                      className={`flex-shrink-0 ${getCardWidthClass(visibleOther, 'other')} ${getCardPadding(i, visibleOther)}`}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        liveUrl={project.liveUrl}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Other Projects Navigation Arrows for desktop/large screens */}
              <button
                onClick={() => scrollToOther('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-60 hover:opacity-100"
                aria-label="Previous other project"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => scrollToOther('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-60 hover:opacity-100"
                aria-label="Next other project"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
