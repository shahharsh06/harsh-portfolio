import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionIcon from "./SectionIcon";
import { ProjectCard } from "./ui/ProjectCard";
import { useRef, useState, useMemo, useCallback } from "react";
import { Project, featuredProjects, otherProjects } from "@/data/projects";
import { useCarousel } from "@/hooks/useCarousel";
import { useResponsive } from "@/hooks/useResponsive";
import { CAROUSEL_INTERVALS } from "@/lib/constants";
import {
  getCardWidthClass,
  getCardPadding,
  getCoverflowStyle,
  getRollingWindow,
} from "@/lib/utils";

// Types for better organization
interface CarouselConfig {
  autoPlay: boolean;
  interval: number;
  pauseOnHover: boolean;
  type: "featured" | "other";
  isMobile: boolean;
}

interface CarouselState {
  currentIndex: number;
  next: () => void;
  prev: () => void;
  pause: () => void;
  resume: () => void;
}

// Custom hook to manage carousel state
const useProjectCarousel = (
  projects: Project[],
  type: "featured" | "other",
  isMobile: boolean,
): CarouselState => {
  const interval = isMobile
    ? CAROUSEL_INTERVALS.FEATURED
    : type === "featured"
      ? CAROUSEL_INTERVALS.FEATURED
      : CAROUSEL_INTERVALS.OTHER;

  return useCarousel(projects.length, 0, {
    autoPlay: true,
    interval,
    pauseOnHover: true,
    type,
    isMobile,
  });
};

// Custom hook to manage hover state and carousel control
const useProjectHover = (
  featuredCarousel: CarouselState,
  otherCarousel: CarouselState,
) => {
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const [isOtherHovered, setIsOtherHovered] = useState(false);

  const handleFeaturedHover = useCallback(
    (isHovered: boolean) => {
      setIsFeaturedHovered(isHovered);
      if (isHovered) {
        featuredCarousel.pause();
      } else {
        featuredCarousel.resume();
      }
    },
    [featuredCarousel],
  );

  const handleOtherHover = useCallback(
    (isHovered: boolean) => {
      setIsOtherHovered(isHovered);
      if (isHovered) {
        otherCarousel.pause();
      } else {
        otherCarousel.resume();
      }
    },
    [otherCarousel],
  );

  return {
    isFeaturedHovered,
    isOtherHovered,
    handleFeaturedHover,
    handleOtherHover,
  };
};

// Generic scroll handler
const createScrollHandler =
  (carousel: CarouselState) => (direction: "prev" | "next") => {
    if (direction === "prev") {
      carousel.prev();
    } else {
      carousel.next();
    }
  };

// Reusable navigation button component
const NavigationButton = ({
  direction,
  onClick,
  className = "",
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  label: string;
}) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const baseClasses =
    "absolute top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-muted-foreground hover:text-primary p-2 rounded-full shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 z-20";

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
  type = "featured",
}: {
  projects: Project[];
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  type?: "featured" | "other";
}) => {
  const displayIndex = currentIndex % projects.length;

  const getProjectStyle = useCallback(
    (index: number) => {
      const n = projects.length;
      let offset = (index - displayIndex + n) % n;
      if (offset > n / 2) offset -= n;

      if (offset === 0) {
        return {
          transform:
            "scale(1) rotateY(0deg) translateX(0px) translate(-50%, -50%)",
          zIndex: 10,
          opacity: 1,
          filter: "none",
        };
      } else if (offset === -1 || offset === 1) {
        return {
          transform: `scale(0.85) rotateY(${offset === -1 ? 30 : -30}deg) translateX(${offset === -1 ? -40 : 40}px) translate(-50%, -50%)`,
          zIndex: 5,
          opacity: 0.7,
          filter: "blur(0.5px)",
        };
      } else {
        return {
          transform: `scale(0.7) translateX(${offset * 60}px) translate(-50%, -50%)`,
          zIndex: 1,
          opacity: 0.3,
          filter: "blur(1px)",
          pointerEvents: "none",
        };
      }
    },
    [displayIndex, projects.length],
  );

  return (
    <div className="flex items-center justify-center h-96">
      <div className="relative w-[90vw] max-w-[480px] h-full flex items-center justify-center">
        <div
          className="flex items-center justify-center w-full h-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {projects.map((project, index) => {
            const style = getProjectStyle(index);

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out"
                style={{
                  ...style,
                  width: "min(90vw, 480px)",
                  maxWidth: "100%",
                  ...(style.pointerEvents
                    ? { pointerEvents: style.pointerEvents }
                    : {}),
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  featured={type === "featured"}
                />
              </div>
            );
          })}
        </div>
        <NavigationButton
          direction="prev"
          onClick={() => onNavigate("prev")}
          className="left-0 -translate-x-1/2"
          label="Previous project"
        />
        <NavigationButton
          direction="next"
          onClick={() => onNavigate("next")}
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
  type = "featured",
}: {
  projects: Project[];
  currentIndex: number;
  visibleCount: number;
  onNavigate: (direction: "prev" | "next") => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  type?: "featured" | "other";
}) => (
  <div className="relative">
    <div
      className="flex overflow-hidden"
      style={{ position: "relative" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ width: "100%" }}
      >
        {getRollingWindow(projects, currentIndex, visibleCount).map(
          (project, i) => (
            <div
              key={i + "-" + project.title}
              className={`flex-shrink-0 ${getCardWidthClass(visibleCount, type)} ${getCardPadding(i, visibleCount)} h-full`}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                featured={type === "featured"}
              />
            </div>
          ),
        )}
      </div>
    </div>
    <NavigationButton
      direction="prev"
      onClick={() => onNavigate("prev")}
      className="left-0 -translate-x-full opacity-60"
      label="Previous project"
    />
    <NavigationButton
      direction="next"
      onClick={() => onNavigate("next")}
      className="right-0 translate-x-full opacity-60"
      label="Next project"
    />
  </div>
);

// Projects section header component
const ProjectsHeader = () => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
      <SectionIcon
        icon={<Code2 />}
        size={28}
        padding="p-3"
        interactive={true}
      />
      <span>
        Featured <span className="text-gradient">Projects</span>
      </span>
    </h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Here are some of my recent projects that showcase my skills and passion
      for development.
    </p>
  </div>
);

// Featured projects section component
const FeaturedProjectsSection = ({
  isSmallScreen,
  visibleFeatured,
  featuredCarousel,
  handleFeaturedHover,
  isFeaturedHovered,
}: {
  isSmallScreen: boolean;
  visibleFeatured: number;
  featuredCarousel: CarouselState;
  handleFeaturedHover: (isHovered: boolean) => void;
  isFeaturedHovered: boolean;
}) => {
  const scrollToFeatured = useMemo(
    () => createScrollHandler(featuredCarousel),
    [featuredCarousel],
  );

  return (
    <div className="mb-16">
      {isSmallScreen ? (
        <CoverflowCarousel
          projects={featuredProjects}
          currentIndex={featuredCarousel.currentIndex}
          onNavigate={scrollToFeatured}
          onMouseEnter={() => handleFeaturedHover(true)}
          onMouseLeave={() => handleFeaturedHover(false)}
          isHovered={isFeaturedHovered}
          type="featured"
        />
      ) : (
        <DesktopCarousel
          projects={featuredProjects}
          currentIndex={featuredCarousel.currentIndex}
          visibleCount={visibleFeatured}
          onNavigate={scrollToFeatured}
          onMouseEnter={() => handleFeaturedHover(true)}
          onMouseLeave={() => handleFeaturedHover(false)}
          type="featured"
        />
      )}
    </div>
  );
};

const Projects = () => {
  const { isSmallScreen, visibleFeatured, visibleOther } = useResponsive();

  // Carousel states
  const featuredCarousel = useProjectCarousel(
    featuredProjects,
    "featured",
    false,
  );
  const otherCarousel = useProjectCarousel(otherProjects, "other", false);
  const featuredMobileCarousel = useProjectCarousel(
    featuredProjects,
    "featured",
    true,
  );
  const otherMobileCarousel = useProjectCarousel(otherProjects, "other", true);

  // Hover management
  const { isFeaturedHovered, handleFeaturedHover } = useProjectHover(
    featuredCarousel,
    otherCarousel,
  );

  return (
    <section id="projects" data-testid="projects-section" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader />

        <FeaturedProjectsSection
          isSmallScreen={isSmallScreen}
          visibleFeatured={visibleFeatured}
          featuredCarousel={featuredCarousel}
          handleFeaturedHover={handleFeaturedHover}
          isFeaturedHovered={isFeaturedHovered}
        />

        {/* Other Projects Section - Commented out as in original */}
        {/**
        <div className="relative">
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          {isSmallScreen ? (
            <CoverflowCarousel
              projects={otherProjects}
              currentIndex={otherMobileCarousel.currentIndex}
              onNavigate={createScrollHandler(otherMobileCarousel)}
              onMouseEnter={() => handleOtherHover(true)}
              onMouseLeave={() => handleOtherHover(false)}
              isHovered={isOtherHovered}
              type="other"
            />
          ) : (
            <DesktopCarousel
              projects={otherProjects}
              currentIndex={otherCarousel.currentIndex}
              visibleCount={visibleOther}
              onNavigate={createScrollHandler(otherCarousel)}
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
