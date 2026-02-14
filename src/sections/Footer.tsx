import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp, Zap, Accessibility, Search, Gauge } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Lighthouse scores - in production, these would come from actual tests
  const lighthouseScores = [
    { label: 'Performance', score: 98, icon: Gauge, color: 'text-green-400' },
    { label: 'Accessibility', score: 100, icon: Accessibility, color: 'text-green-400' },
    { label: 'Best Practices', score: 100, icon: Zap, color: 'text-green-400' },
    { label: 'SEO', score: 100, icon: Search, color: 'text-green-400' },
  ];

  return (
    <footer className="relative bg-void border-t border-white/5">
      {/* Performance Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          <div className="flex items-center gap-2 text-off-white/40 text-sm">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Engineered for performance</span>
          </div>
          {lighthouseScores.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-off-white/60 text-sm">{item.label}:</span>
              <span className={`font-mono font-bold ${item.color}`}>{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* Brand */}
            <div className="text-center md:text-left">
              <a href="#hero" className="inline-flex items-center gap-2 group">
                <span className="font-mono font-bold text-xl text-white">
                  DEV<span className="text-cyan-400">.AI</span>
                </span>
              </a>
              <p className="text-off-white/60 text-sm mt-2">
                Building intelligent systems that matter.
              </p>
              <p className="text-off-white/40 text-xs mt-1">
                React + TypeScript + Tailwind + Vite
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-off-white/60 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-off-white/60 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-off-white/60 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@developer.ai"
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-off-white/60 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Back to Top */}
            <div className="text-center md:text-right">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-off-white/60 hover:text-cyan-400 transition-colors group"
              >
                <span className="text-sm">Back to top</span>
                <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 mt-10 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-off-white/40 text-sm text-center md:text-left">
                &copy; {currentYear} Developer.AI. All rights reserved.
              </p>
              <p className="text-off-white/40 text-sm flex items-center gap-1">
                Crafted with <Heart className="w-4 h-4 text-red-400" /> and lots of coffee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl" />
    </footer>
  );
};

export default Footer;
