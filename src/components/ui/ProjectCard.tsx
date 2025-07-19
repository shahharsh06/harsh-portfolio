import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons";
import SectionIcon from "../SectionIcon";
import SkillTag from "./SkillTag";

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
  return (
    <Card className={`overflow-hidden card-gradient border-border hover-lift group ${className}`}>
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
        </div>
      )}
      <CardHeader>
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
        <CardDescription className={featured ? "" : "text-sm"}>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex flex-wrap gap-${featured ? "2" : "1"}`}>
          {technologies.slice(0, featured ? undefined : 3).map((tech) => (
            <SkillTag key={tech} size={featured ? "md" : "sm"}>
              {tech}
            </SkillTag>
          ))}
          {!featured && technologies.length > 3 && (
            <SkillTag size="sm">
              +{technologies.length - 3} more
            </SkillTag>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard; 