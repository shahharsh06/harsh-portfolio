import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Rocket, Users, Lightbulb, Database } from "lucide-react";
import InteractiveCard from "./ui/InteractiveCard";
import SectionIcon from "./SectionIcon";
import SkillTag from "./ui/SkillTag";

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI/ML Expertise",
      description: "Specialized in machine learning algorithms, deep learning models, and data-driven solutions for real-world applications."
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Experienced in data analysis, statistical modeling, and building intelligent systems that extract meaningful insights."
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in both frontend and backend technologies, creating scalable web applications and APIs."
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Demonstrated track record of improving system efficiency through code optimization and best practices."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <SectionIcon icon={<Users />} size={28} padding="p-3" interactive={true} />
            <span>About <span className="text-gradient">Me</span></span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From academic research to industry applications, I bridge the gap between cutting-edge AI research 
            and practical software solutions that solve real-world problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-justify">
                My journey began with a strong foundation in Computer Science and Engineering from SRM Institute 
                of Science and Technology, where I graduated with First Class with Distinction. 
                During my undergraduate studies, I published research on Breast Cancer Detection using Deep Learning 
                in IEEE Xplore, marking my entry into the world of AI and Machine Learning Applications.
              </p>
              <p className="text-justify">
                At Haricomp Systems, I developed financial software applications in C++ and Python, focusing on 
                optimizing system performance and enhancing data-driven decision-making processes. This experience 
                taught me the importance of combining theoretical knowledge with practical implementation in 
                real-world business environments.
              </p>
              <p className="text-justify">
                I completed my Master of Computer Science at Texas A&M University, 
                where I deepened my expertise in Machine Learning Frameworks like TensorFlow and PyTorch, 
                while serving as a Graduate Teaching Assistant and Vice President of Professional Development 
                for CSEGSA. My approach combines cutting-edge AI research with practical software engineering 
                principles to create innovative solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {["Python", "Machine Learning", "Data Science", "TensorFlow", "C++"].map((tech) => (
                <SkillTag key={tech}>{tech}</SkillTag>
              ))}
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <InteractiveCard key={index} contentClassName="p-6">
                {/* Icon + Title Grouped Row */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <SectionIcon icon={<item.icon />} size={24} padding="p-3" />
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {item.description}
                </p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;