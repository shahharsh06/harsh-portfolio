import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const fallbackEmoji = getProjectFallbackEmoji(title);

  return (
    <Card className={`overflow-hidden card-gradient border-border hover-lift group h-full flex flex-col ${className}`}>
      {/* Only show image section for featured projects */}
      {featured && image && (
        <div className="relative flex-shrink-0">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-cyan-400/20 animate-pulse flex items-center justify-center">
              <div className="text-muted-foreground">Loading...</div>
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
            loading="lazy"
            decoding="async"
            className={`w-full h-48 object-cover group-hover:scale-105 transition-smooth ${
              imageLoaded && !imageError ? 'block' : 'hidden'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
        </div>
      )}
      
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          {title}
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
        </CardTitle>
        <CardDescription className={`${featured ? "" : "text-sm"} line-clamp-2`}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className={`flex flex-wrap items-start justify-start gap-1 ${featured ? 'gap-2 min-h-[32px]' : 'min-h-[24px]'}`}>
          {technologies.slice(0, featured ? undefined : 4).map((tech) => (
            <SkillTag key={tech} size={featured ? "md" : "sm"} className="flex-shrink-0">
              {tech}
            </SkillTag>
          ))}
          {!featured && technologies.length > 4 && (
            <SkillTag size="sm" className="flex-shrink-0">
              +{technologies.length - 4} more
            </SkillTag>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard; 