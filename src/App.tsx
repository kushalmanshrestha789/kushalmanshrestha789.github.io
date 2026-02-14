import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import HowIThink from './sections/HowIThink';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import AIPlayground from './sections/AIPlayground';
import Research from './sections/Research';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <HowIThink />
        <Skills />
        <Projects />
        <AIPlayground />
        <Research />
        <Resume />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
