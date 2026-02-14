import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Senior AI Engineer',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: [
      'Lead a team of 5 engineers developing production ML systems serving 10M+ daily predictions',
      'Architected and deployed real-time recommendation engine improving user engagement by 35%',
      'Implemented MLOps best practices reducing model deployment time from 2 weeks to 2 hours',
      'Mentored junior engineers and established code review standards for ML projects',
    ],
    technologies: ['Python', 'TensorFlow', 'Kubernetes', 'AWS', 'MLflow'],
  },
  {
    id: 'exp2',
    title: 'Machine Learning Engineer',
    company: 'DataDriven Startup',
    location: 'New York, NY',
    period: '2020 - 2022',
    description: [
      'Built computer vision pipeline for quality inspection, reducing defect escape rate by 60%',
      'Developed NLP models for sentiment analysis achieving 92% accuracy on customer feedback',
      'Created automated data pipelines processing 50GB+ daily using Apache Airflow',
      'Collaborated with product team to integrate ML features into core product offering',
    ],
    technologies: ['PyTorch', 'OpenCV', 'Spark', 'GCP', 'Docker'],
  },
  {
    id: 'exp3',
    title: 'Software Engineer',
    company: 'Enterprise Solutions Inc',
    location: 'Austin, TX',
    period: '2018 - 2020',
    description: [
      'Developed microservices architecture handling 1M+ requests per day',
      'Built real-time analytics dashboard using React and WebSocket',
      'Optimized database queries reducing API response time by 70%',
      'Contributed to open-source projects and internal tooling initiatives',
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS'],
  },
];

const education: Education[] = [
  {
    id: 'edu1',
    degree: 'M.S. in Computer Science',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    period: '2016 - 2018',
    details: 'Specialization in Artificial Intelligence and Machine Learning',
  },
  {
    id: 'edu2',
    degree: 'B.S. in Computer Engineering',
    institution: 'MIT',
    location: 'Cambridge, MA',
    period: '2012 - 2016',
    details: 'Minor in Mathematics, Graduated with Honors',
  },
];

const certifications = [
  'AWS Certified Machine Learning - Specialty',
  'Google Cloud Professional Data Engineer',
  'TensorFlow Developer Certificate',
];

const Resume = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.resume-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      // Experience items animation
      gsap.fromTo(
        '.experience-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Education animation
      gsap.fromTo(
        '.education-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.education-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadResume = () => {
    // Create a simple PDF download simulation
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Resume_Software_Engineer_AI.pdf';
    // In a real app, this would be an actual PDF URL
    alert('Resume download would start here. In production, link to actual PDF file.');
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="resume-header mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mono text-teal-500 text-sm tracking-widest mb-2">EXPERIENCE</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              RESUME
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 mt-4" />
          </div>
          
          <Button
            onClick={handleDownloadResume}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline relative mb-20">
          <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-teal-500" />
            Work Experience
          </h3>

          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-8 top-16 bottom-0 w-px bg-gradient-to-b from-teal-500 to-cyan-400 origin-top"
          />

          {/* Experience Items */}
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-item relative pl-12 md:pl-20">
                {/* Timeline Node */}
                <div className="absolute left-2 md:left-6 top-1 w-4 h-4 bg-teal-500 rounded-full border-4 border-background" />

                {/* Content Card */}
                <div className="bg-card border border-border p-6 hover:border-teal-500/30 transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-display text-xl font-bold text-foreground">
                        {exp.title}
                      </h4>
                      <p className="text-teal-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-teal-500 mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-teal-500/10 text-teal-600 text-xs font-mono rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="education-section mb-16">
          <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-teal-500" />
            Education
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="education-item bg-card border border-border p-6 hover:border-teal-500/30 transition-colors"
              >
                <h4 className="font-display text-lg font-bold text-foreground mb-1">
                  {edu.degree}
                </h4>
                <p className="text-teal-600 font-medium">{edu.institution}</p>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </span>
                </div>
                {edu.details && (
                  <p className="text-muted-foreground text-sm mt-3">{edu.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-teal-500" />
            Certifications
          </h3>

          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 bg-card border border-border text-foreground font-medium hover:border-teal-500/30 transition-colors"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
