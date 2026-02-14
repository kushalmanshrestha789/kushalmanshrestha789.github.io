import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Code2, Brain, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    const connectionDistance = 150;
    const mouseRadius = 200;

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse repulsion
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          particle.vx -= (dx / distance) * force * 0.5;
          particle.vy -= (dy / distance) * force * 0.5;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102, 252, 241, 0.6)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(102, 252, 241, ${0.2 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, letterSpacing: '0.3em' },
        { opacity: 1, y: 0, letterSpacing: '0.05em', duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50, letterSpacing: '0.3em' },
          { opacity: 1, y: 0, letterSpacing: '0.05em', duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Decorative Icons */}
        <div className="flex justify-center gap-6 mb-8 opacity-60">
          <Terminal className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
          <Code2 className="w-6 h-6 text-cyan-400 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          <Brain className="w-6 h-6 text-cyan-400 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-wide opacity-0"
        >
          SOFTWARE PROGRAMMER
        </h1>

        <h2
          ref={subtitleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-400 mb-8 tracking-wide opacity-0"
        >
          & AI RESEARCHER
        </h2>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg sm:text-xl md:text-2xl text-off-white/80 max-w-2xl mx-auto mb-12 opacity-0"
        >
          Building intelligent systems that bridge logic and creativity.
          <br />
          <span className="text-cyan-400/80 mono text-base">Specializing in scalable architectures and machine learning solutions.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-void font-mono font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-glow-strong"
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-white/30 text-white hover:bg-white/10 font-mono px-8 py-6 text-lg transition-all duration-300"
          >
            Contact Me
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => scrollToSection('resume')}
            className="text-cyan-400/80 hover:text-cyan-400 hover:bg-cyan-400/10 font-mono px-8 py-6 text-lg transition-all duration-300"
          >
            Download Resume
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="text-cyan-400/60 hover:text-cyan-400 transition-colors"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30 z-10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/30 z-10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30 z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30 z-10" />
    </section>
  );
};

export default Hero;
