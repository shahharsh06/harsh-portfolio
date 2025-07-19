export interface TimelineItem {
  type: 'education' | 'career';
  degree?: string;
  role?: string;
  institution?: string;
  company?: string;
  location: string;
  duration: string;
  gpa?: string;
  highlights?: string[];
  achievements?: string[];
}

export const timelineData: TimelineItem[] = [
  // Education (Master) - should be first
  {
    type: 'education',
    degree: 'Master of Computer Science',
    institution: 'Texas A&M University',
    location: 'College Station, Texas, USA',
    duration: 'Aug 2023 - May 2025',
    gpa: '3.83/4.00',
    highlights: [
      'Graduate Teaching Assistant for Biology Course (BIOL 403)',
      'Vice President of Professional Development, CSEGSA',
      'Competition Judge for Texas Junior Academy of Science and TJSHS'
    ]
  },
  // Experience (from Experience.tsx)
  {
    type: 'career',
    role: 'Software Engineer',
    company: 'Haricomp Systems',
    location: 'Vadodara, Gujarat, India',
    duration: 'Jul 2022 - Jul 2023',
    achievements: [
      'Developed and optimized financial software applications in C++ and Python, improving processing speed by 20%.',
      'Implemented new features and enhancements for core products, ensuring high quality through code reviews and unit testing.',
      'Collaborated with cross-functional teams in an Agile environment to deliver solutions on time and improve product stability.'
    ]
  },
  {
    type: 'career',
    role: 'Software Engineer Intern',
    company: 'Haricomp Systems',
    location: 'Vadodara, Gujarat, India',
    duration: 'Jan 2022 - Jul 2022',
    achievements: [
      'Engineered data processing modules in C++ and Python, increasing operational efficiency by 20%.',
      'Executed rigorous debugging and testing procedures, reducing software errors by 15%.',
      'Analyzed client requirements and data to generate reports, enhancing data-driven decision-making by 30%.'
    ]
  },
  // Education (Bachelor)
  {
    type: 'education',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu, India',
    duration: 'June 2018 - May 2022',
    gpa: '9.51/10.00',
    highlights: [
      'First Class with Distinction',
      'Published research paper on Breast Cancer Detection using Deep Learning in IEEE Xplore',
      'Sponsorship Coordinator, CSE Association',
      'Sponsorship Committee Member, Directorate of Student Affairs'
    ]
  }
]; 