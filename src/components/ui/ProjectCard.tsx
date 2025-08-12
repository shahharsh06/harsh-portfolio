import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons";
import SectionIcon from "../SectionIcon";
import SkillTag from "./SkillTag";
import { getImageUrl, getProjectFallbackEmoji } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  className?: string;
}

// Extracted component for project image
const ProjectImage: React.FC<{
  image: string;
  title: string;
  fallbackEmoji: string;
}> = ({ image, title, fallbackEmoji }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload the image for better performance
  React.useEffect(() => {
    // Reset state when image changes
    setImageLoaded(false);
    setImageError(false);

    const img = new Image();
    img.src = getImageUrl(image);
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [image]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Reduced timeout for faster fallback - 2 seconds instead of 5
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        setImageError(true);
      }
    }, 2000); // 2 second timeout for faster response

    return () => clearTimeout(timeout);
  }, [imageLoaded, imageError, title, image]);

  return (
    <div className="relative flex-shrink-0">
      {!imageLoaded && !imageError && (
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-cyan-400/20 animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}
      {imageError && (
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-cyan-400/20 flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <div className="text-3xl mb-2">{fallbackEmoji}</div>
            <div className="text-sm font-medium">{title}</div>
          </div>
        </div>
      )}
      <img
        src={getImageUrl(image)}
        alt={title}
        loading="eager" // Changed from "lazy" to "eager" for featured projects
        decoding="async"
        crossOrigin="anonymous"
        fetchPriority="high" // Add high priority for featured projects
        className={`w-full h-48 object-cover group-hover:scale-105 transition-smooth ${
          imageLoaded && !imageError ? "block" : "hidden"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
    </div>
  );
};

// Extracted component for project links
const ProjectLinks: React.FC<{
  title: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}> = ({ title, githubUrl, liveUrl, featured }) => (
  <div className="flex space-x-2">
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
      aria-label={`View ${title} on GitHub`}
    >
      <SectionIcon
        icon={<GithubIcon />}
        size={featured ? 24 : 18}
        padding={featured ? "p-3" : "p-2"}
        interactive={true}
      />
    </a>
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
      aria-label={`View ${title} live demo`}
    >
      <SectionIcon
        icon={<ExternalLink />}
        size={featured ? 24 : 18}
        padding={featured ? "p-3" : "p-2"}
        interactive={true}
      />
    </a>
  </div>
);

// Extracted component for technology tags
const TechnologyTags: React.FC<{
  technologies: string[];
  featured: boolean;
}> = ({ technologies, featured }) => (
  <div
    className={`flex flex-wrap items-start justify-start gap-1 ${featured ? "gap-2 min-h-[32px]" : "min-h-[24px]"}`}
  >
    {technologies.slice(0, featured ? undefined : 4).map((tech) => (
      <SkillTag
        key={tech}
        size={featured ? "md" : "sm"}
        className="flex-shrink-0"
      >
        {tech}
      </SkillTag>
    ))}
    {!featured && technologies.length > 4 && (
      <SkillTag size="sm" className="flex-shrink-0">
        +{technologies.length - 4} more
      </SkillTag>
    )}
  </div>
);

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  featured = false,
  className = "",
}) => {
  const fallbackEmoji = getProjectFallbackEmoji(title);

  return (
    <Card
      data-testid="project-card"
      className={`overflow-hidden card-gradient border-border hover-lift group h-full flex flex-col ${className}`}
    >
      {/* Only show image section for featured projects */}
      {featured && image && (
        <ProjectImage
          image={image}
          title={title}
          fallbackEmoji={fallbackEmoji}
        />
      )}

      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          {title}
          <ProjectLinks
            title={title}
            githubUrl={githubUrl}
            liveUrl={liveUrl}
            featured={featured}
          />
        </CardTitle>
        <CardDescription
          className={`${featured ? "" : "text-sm"} line-clamp-2`}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <TechnologyTags technologies={technologies} featured={featured} />
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
