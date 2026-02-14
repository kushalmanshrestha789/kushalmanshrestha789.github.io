import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Brain, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Go', 'Rust', 'SQL', 'Java'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['React', 'Node.js', 'Next.js', 'FastAPI', 'Django', 'Express', 'PyTorch', 'TensorFlow'],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    icon: Brain,
    skills: ['NLP', 'Computer Vision', 'Deep Learning', 'MLOps', 'LLMs', 'Reinforcement Learning', 'Data Engineering'],
  },
  {
    id: 'devops',
    title: 'Cloud & DevOps',
    icon: Server,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Terraform', 'Linux'],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.skills-header',
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

      // Cards animation
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="skills-header mb-16 text-center">
          <p className="mono text-cyan-400 text-sm tracking-widest mb-2">EXPERTISE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            TECHNICAL ARSENAL
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mt-4 mx-auto" />
          <p className="text-off-white/70 mt-6 max-w-2xl mx-auto">
            A curated collection of technologies I use to build robust, scalable, and intelligent systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="skill-card group relative"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div
                className={`relative h-full p-6 bg-panel/50 border transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'border-cyan-400/50 bg-cyan-400/5'
                    : 'border-white/5 hover:border-cyan-400/30'
                }`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'border-cyan-400 bg-cyan-400/20'
                        : 'border-cyan-400/30 bg-cyan-400/5'
                    }`}
                  >
                    <category.icon
                      className={`w-7 h-7 transition-colors ${
                        activeCategory === category.id ? 'text-cyan-400' : 'text-cyan-400/70'
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm font-mono rounded transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                          : 'bg-white/5 text-off-white/70 border border-white/10 hover:border-cyan-400/30'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] transition-colors duration-300 ${
                    activeCategory === category.id
                      ? 'border-t-cyan-400/30 border-r-transparent'
                      : 'border-t-cyan-400/10 border-r-transparent'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <p className="mono text-cyan-400/60 text-sm">
            &ldquo;The right tool for the right problem.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
