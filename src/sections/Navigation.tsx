import { useEffect, useState } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Method', href: '#how-i-think' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Playground', href: '#playground' },
  { name: 'Research', href: '#research' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className={`w-8 h-8 flex items-center justify-center border transition-colors ${
                isScrolled ? 'border-teal-500 bg-teal-500/10' : 'border-cyan-400 bg-cyan-400/10'
              }`}>
                <Terminal className={`w-4 h-4 ${isScrolled ? 'text-teal-500' : 'text-cyan-400'}`} />
              </div>
              <span className={`font-mono font-bold text-lg ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                DEV<span className={isScrolled ? 'text-teal-500' : 'text-cyan-400'}>.AI</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isScrolled
                      ? activeSection === link.href.slice(1)
                        ? 'text-teal-500'
                        : 'text-foreground/70 hover:text-foreground'
                      : activeSection === link.href.slice(1)
                        ? 'text-cyan-400'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 ${
                      isScrolled ? 'bg-teal-500' : 'bg-cyan-400'
                    }`} />
                  )}
                </a>
              ))}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`ml-2 ${
                  isScrolled
                    ? 'text-foreground hover:text-teal-500'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={isScrolled ? 'text-foreground' : 'text-white'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={isScrolled ? 'text-foreground' : 'text-white'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-4">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`font-display text-2xl font-bold transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'text-teal-500'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
