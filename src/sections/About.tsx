import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, Code2, Cpu, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  proofLink: string;
  proofText: string;
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats: Stat[] = [
    { 
      icon: Briefcase, 
      value: '5+', 
      label: 'Years Experience',
      proofLink: '#resume',
      proofText: 'View Career Timeline'
    },
    { 
      icon: Code2, 
      value: '50+', 
      label: 'Projects Completed',
      proofLink: '#projects',
      proofText: 'Browse Projects'
    },
    { 
      icon: Cpu, 
      value: '15+', 
      label: 'AI Models Deployed',
      proofLink: '#projects',
      proofText: 'See Model Cards'
    },
    { 
      icon: Award, 
      value: '3', 
      label: 'Research Papers',
      proofLink: '#research',
      proofText: 'Read Papers'
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-panel/30"
        style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="mono text-cyan-400 text-sm tracking-widest mb-2">WHO I AM</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            THE ARCHITECT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-off-white/90 leading-relaxed">
              With over <span className="text-cyan-400 font-semibold">5 years of experience</span> in software engineering, 
              I specialize in bridging the gap between complex backend logic and intuitive frontend experiences. 
              My journey into AI research is driven by a passion for creating systems that learn, adapt, and evolve.
            </p>

            <p className="text-lg text-off-white/80 leading-relaxed">
              I&apos;ve worked with startups and enterprise companies alike, helping them build scalable solutions 
              that process millions of requests daily. My expertise spans from designing distributed systems 
              to training and deploying machine learning models in production environments.
            </p>

            <p className="text-lg text-off-white/80 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring the latest research papers in deep learning, 
              contributing to open-source projects, or mentoring aspiring developers in the community.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {['Problem Solver', 'System Architect', 'ML Engineer', 'Team Leader'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-mono rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto">
              <div className="absolute inset-0 border-2 border-cyan-400/30 translate-x-4 translate-y-4" />
              <div className="relative overflow-hidden bg-panel">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-panel border border-cyan-400/30 p-4 shadow-glow">
              <p className="mono text-cyan-400 text-xs">STATUS</p>
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for Work
              </p>
            </div>
          </div>
        </div>

        {/* Clickable Stats with Proof */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => scrollToSection(stat.proofLink)}
              className="text-left p-6 bg-panel/50 border border-white/5 hover:border-cyan-400/50 transition-all group cursor-pointer"
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-off-white/60 text-sm mb-3">{stat.label}</p>
              <div className="flex items-center gap-1 text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{stat.proofText}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
