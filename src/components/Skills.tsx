import { CardTitle } from "@/components/ui/card";
import { 
  Code2, 
  Database, 
  Server, 
  Cloud, 
  Shield,
  Brain,
  BarChart3,
  GitBranch,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import SectionIcon from "./SectionIcon";
import InteractiveCard from "./ui/InteractiveCard";
import SkillTag from "./ui/SkillTag";

const Skills = () => {
  const skillCategories = [
    {
      title: "Machine Learning",
      icon: Brain,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Keras", "Hugging Face"]
    },
    {
      title: "Data Science",
      icon: BarChart3,
      skills: ["Python", "R", "Jupyter", "Matplotlib", "Seaborn", "Plotly", "SQL"]
    },
    {
      title: "Database",
      icon: Database,
      skills: ["PostgreSQL", "MySQL", "Oracle SQL", "PL/SQL"]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS", "GCP", "Docker", "CI/CD", "Git"]
    },    
    {
      title: "Frontend Development",
      icon: Code2,
      skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"]
    },
    {
      title: "Backend Development", 
      icon: Server,
      skills: ["Python", "C++", "C", "FastAPI", "RESTful APIs"]
    }
  ];

  return (
    <section id="skills" data-testid="skills-section" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <SectionIcon icon={<Zap />} size={28} padding="p-3" interactive={true} />
            <span>Skills & <span className="text-gradient">Expertise</span></span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels 
            across different technologies and tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InteractiveCard className="h-full group" contentClassName="p-6">
                {/* Icon + Title Grouped Row */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <SectionIcon icon={<category.icon />} size={24} padding="p-3" />
                  <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillTag key={skillIndex}>{skill}</SkillTag>
                  ))}
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;