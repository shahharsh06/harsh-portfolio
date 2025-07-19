import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import InteractiveCard from './ui/InteractiveCard';
import SectionIcon from './SectionIcon';
import { CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { SectionHeader } from './ui/SectionHeader';
import { timelineData } from '@/data/timeline';



export default function CareerEducation() {
  return (
    <section id="career-education" className="py-20">
      <div className="mx-auto w-full max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Career &"
          gradientWord="Education"
          icon={GraduationCap}
          description="A chronological view of my academic and professional growth."
        />
        {/* Timeline with vertical line */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary to-primary/30 z-0"></div>
          <div className="space-y-16">
            {timelineData.map((item, idx) => {
              return (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  {/* Timeline content */}
                  <div className="w-full max-w-2xl mx-auto mt-6 mb-6">
                    <InteractiveCard className="card-gradient border-border hover:border-primary/30 transition-all duration-300 hover-lift group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <SectionIcon icon={<Briefcase />} size={24} padding="p-3" />
                            <CardTitle className="text-xl mb-0">
                              {item.role || item.degree}
                            </CardTitle>
                          </div>
                          {item.gpa && (
                            <span className="text-lg font-bold text-primary">{item.gpa}</span>
                          )}
                        </div>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <SectionIcon icon={<MapPin />} size={18} padding="p-2" />
                            <span>
                              {item.company ? `${item.company}, ${item.location}` : `${item.institution}, ${item.location}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SectionIcon icon={<Calendar />} size={18} padding="p-2" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(item.highlights || item.achievements)?.map((text, idx2) => (
                            <motion.div
                              key={idx2}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: idx2 * 0.1 }}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </InteractiveCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 