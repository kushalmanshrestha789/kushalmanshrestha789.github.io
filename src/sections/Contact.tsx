import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Twitter, Send, MapPin, Rocket, Brain, Globe, Users, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

interface InquiryType {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const inquiryTypes: InquiryType[] = [
  {
    id: 'startup',
    icon: Rocket,
    title: 'Startup',
    description: 'Build an AI-powered MVP or scale your product',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'research',
    icon: Brain,
    title: 'AI Research',
    description: 'Collaborate on cutting-edge ML research',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'platform',
    icon: Globe,
    title: 'Web Platform',
    description: 'Design scalable architecture for your platform',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'consulting',
    icon: Users,
    title: 'Consulting',
    description: 'Get expert advice on AI/ML strategy',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'hiring',
    icon: Briefcase,
    title: 'Hiring',
    description: 'Full-time AI/ML engineering role',
    color: 'from-pink-400 to-rose-500',
  },
];

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:hello@developer.ai',
    label: 'hello@developer.ai',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'linkedin.com/in/developer',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com',
    label: 'github.com/developer',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
    label: '@developer_ai',
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
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

      gsap.fromTo(
        '.inquiry-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.inquiry-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-panel',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', details: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectedInquiryType = inquiryTypes.find(t => t.id === selectedInquiry);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header mb-16 text-center">
          <p className="mono text-teal-500 text-sm tracking-widest mb-2">GET IN TOUCH</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            WHAT DO YOU WANT TO BUILD?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 mt-4 mx-auto" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Select what you&apos;re looking for, and let&apos;s start a conversation about how I can help.
          </p>
        </div>

        {/* Inquiry Type Selection */}
        <div className="inquiry-grid grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {inquiryTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedInquiry(type.id)}
              className={`inquiry-card relative p-6 text-left border transition-all duration-300 ${
                selectedInquiry === type.id
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-border hover:border-teal-500/50 bg-card'
              }`}
            >
              <div className={`w-10 h-10 mb-4 flex items-center justify-center bg-gradient-to-br ${type.color} rounded`}>
                <type.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{type.title}</h3>
              <p className="text-muted-foreground text-sm">{type.description}</p>
              
              {selectedInquiry === type.id && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5 text-teal-500" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div className="space-y-8">
            {/* Selected Type Info */}
            {selectedInquiryType && (
              <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-6 rounded">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 flex items-center justify-center bg-gradient-to-br ${selectedInquiryType.color} rounded`}>
                    <selectedInquiryType.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {selectedInquiryType.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{selectedInquiryType.description}</p>
              </div>
            )}

            {/* What to Expect */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">What to Expect</h4>
              <ul className="space-y-3">
                {[
                  'Initial response within 24 hours',
                  'Free 30-minute discovery call',
                  'Detailed proposal within 3 days',
                  'Transparent pricing & timeline',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-4 h-4 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-teal-500" />
              <span>San Francisco, CA (Open to Remote)</span>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Or Connect Directly</h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-card border border-border hover:border-teal-500/50 transition-colors group"
                  >
                    <link.icon className="w-5 h-5 text-teal-500" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-form-panel">
            <div className="bg-card border border-border p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                {selectedInquiry 
                  ? `Tell me about your ${selectedInquiryType?.title.toLowerCase()} project`
                  : 'Send a Message'
                }
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-teal-500" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-background border-border focus:border-teal-500 focus:ring-teal-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-background border-border focus:border-teal-500 focus:ring-teal-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company / Organization
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc. (optional)"
                      className="bg-background border-border focus:border-teal-500 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="details"
                      name="details"
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder={selectedInquiryType 
                        ? `Tell me about your ${selectedInquiryType.title.toLowerCase()} project, timeline, and budget...`
                        : 'Tell me about your project...'
                      }
                      rows={5}
                      className="bg-background border-border focus:border-teal-500 focus:ring-teal-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-muted-foreground text-xs text-center">
                    No spam. Your information is never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
