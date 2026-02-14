import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Microscope, Lightbulb, ArrowRight, ExternalLink, Github, BookOpen, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface ResearchItem {
  id: string;
  title: string;
  type: 'paper' | 'experiment' | 'innovation';
  venue?: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  learnings: string;
  links: {
    arxiv?: string;
    pdf?: string;
    github?: string;
    notebook?: string;
    demo?: string;
  };
  reproducibility: {
    datasetUrl?: string;
    codeUrl: string;
    requirements: string[];
    estimatedTime: string;
  };
  citations: number;
}

const researchItems: ResearchItem[] = [
  {
    id: 'transformer-optimization',
    title: 'Optimizing Transformer Latency on Edge Devices',
    type: 'paper',
    venue: 'IEEE Conference on Edge Computing',
    year: '2023',
    description: 'Novel quantization and pruning techniques for deploying large language models on resource-constrained devices.',
    challenge: 'Transformer models are too large and slow for edge deployment, requiring 100GB+ memory.',
    solution: 'Developed a hybrid quantization approach combining INT8 weights with FP16 activations, achieving 4x compression with <2% accuracy loss.',
    learnings: 'Model architecture matters more than raw parameter count for edge performance.',
    links: {
      arxiv: 'https://arxiv.org/abs/2304.12345',
      pdf: '/papers/transformer-edge-optimization.pdf',
      github: 'https://github.com/researcher/edge-transformers',
      notebook: 'https://colab.research.google.com/drive/example',
    },
    reproducibility: {
      datasetUrl: 'https://huggingface.co/datasets/glue',
      codeUrl: 'https://github.com/researcher/edge-transformers',
      requirements: ['Python 3.9+', 'PyTorch 2.0+', 'ONNX Runtime', 'NVIDIA Jetson (optional)'],
      estimatedTime: '~4 hours on V100 GPU',
    },
    citations: 47,
  },
  {
    id: 'gan-medical',
    title: 'Generative Adversarial Networks for Synthetic Medical Data',
    type: 'paper',
    venue: 'Nature Machine Intelligence (Under Review)',
    year: '2024',
    description: 'Using GANs to generate privacy-preserving synthetic medical datasets for research.',
    challenge: 'Medical data is heavily regulated and scarce, limiting AI research in healthcare.',
    solution: 'Built a conditional GAN with differential privacy guarantees that generates statistically equivalent synthetic data.',
    learnings: 'Synthetic data can maintain diagnostic utility while ensuring patient privacy.',
    links: {
      arxiv: 'https://arxiv.org/abs/2401.56789',
      github: 'https://github.com/researcher/medical-gan',
      demo: 'https://huggingface.co/spaces/example/medical-synthetic',
    },
    reproducibility: {
      codeUrl: 'https://github.com/researcher/medical-gan',
      requirements: ['Python 3.10+', 'PyTorch 2.1+', 'Opacus (DP library)', '16GB+ GPU VRAM'],
      estimatedTime: '~12 hours on A100 GPU',
    },
    citations: 12,
  },
  {
    id: 'rl-robotics',
    title: 'Reinforcement Learning for Robotic Grasping',
    type: 'experiment',
    year: '2023',
    description: 'Training robotic arms to grasp novel objects using deep RL with sim-to-real transfer.',
    challenge: 'Simulated policies fail in real-world due to the reality gap in physics and visuals.',
    solution: 'Implemented domain randomization and adaptation techniques, achieving 87% success rate on unseen objects.',
    learnings: 'Careful simulation design and randomization are crucial for sim-to-real success.',
    links: {
      github: 'https://github.com/researcher/rl-grasping',
      notebook: 'https://github.com/researcher/rl-grasping/blob/main/tutorials/training.ipynb',
    },
    reproducibility: {
      datasetUrl: 'https://github.com/researcher/rl-grasping#dataset',
      codeUrl: 'https://github.com/researcher/rl-grasping',
      requirements: ['Python 3.9+', 'PyBullet or Isaac Gym', 'PyTorch', 'ROS (for real robot)'],
      estimatedTime: '~24 hours training in simulation',
    },
    citations: 8,
  },
  {
    id: 'mlops-pipeline',
    title: 'Automated MLOps Pipeline for Model Retraining',
    type: 'innovation',
    year: '2024',
    description: 'Built an end-to-end automated pipeline for continuous model monitoring and retraining.',
    challenge: 'Models degrade over time (concept drift) but manual retraining is slow and error-prone.',
    solution: 'Created a event-driven pipeline using Apache Airflow that triggers retraining on drift detection.',
    learnings: 'Automation reduces deployment time from weeks to hours and improves model reliability.',
    links: {
      github: 'https://github.com/researcher/mlops-pipeline',
      demo: 'https://www.youtube.com/watch?v=example',
    },
    reproducibility: {
      codeUrl: 'https://github.com/researcher/mlops-pipeline',
      requirements: ['Docker & Docker Compose', 'Kubernetes (optional)', 'Apache Airflow 2.7+', 'MLflow'],
      estimatedTime: '~2 hours setup',
    },
    citations: 0,
  },
];

const getIcon = (type: ResearchItem['type']) => {
  switch (type) {
    case 'paper':
      return FileText;
    case 'experiment':
      return Microscope;
    case 'innovation':
      return Lightbulb;
    default:
      return FileText;
  }
};

const Research = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research-header',
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
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.research-timeline',
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.research-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.research-timeline',
            start: 'top 70%',
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
      id="research"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="research-header mb-16 text-center">
          <p className="mono text-teal-500 text-sm tracking-widest mb-2">RESEARCH</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            RESEARCH & INNOVATION
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 mt-4 mx-auto" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Exploring the frontiers of AI and machine learning. All papers include reproducible code 
            and datasets for verification.
          </p>
        </div>

        <div className="research-timeline relative">
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-cyan-400 to-teal-500 origin-top"
          />

          <div className="space-y-12">
            {researchItems.map((item, index) => {
              const Icon = getIcon(item.type);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`research-item relative flex items-start gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 bg-background border-2 border-teal-500 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal-500" />
                    </div>
                  </div>

                  <div
                    className={`ml-16 md:ml-0 md:w-[45%] ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-card border border-border p-6 hover:border-teal-500/50 transition-colors group">
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="px-2 py-1 bg-teal-500/10 text-teal-600 text-xs font-mono rounded">
                          {item.type.toUpperCase()}
                        </span>
                        <span className="text-muted-foreground text-sm">{item.year}</span>
                        {item.citations > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {item.citations} citations
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-teal-600 transition-colors">
                        {item.title}
                      </h3>

                      {item.venue && (
                        <p className="text-sm text-muted-foreground mb-3">{item.venue}</p>
                      )}

                      <p className="text-foreground/80 mb-4">{item.description}</p>

                      {/* Quick Links */}
                      <div className={`flex flex-wrap gap-2 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                        {item.links.arxiv && (
                          <a
                            href={item.links.arxiv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/10 text-teal-600 text-xs rounded hover:bg-teal-500/20 transition-colors"
                          >
                            <BookOpen className="w-3 h-3" />
                            arXiv
                          </a>
                        )}
                        {item.links.github && (
                          <a
                            href={item.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        )}
                        {item.links.notebook && (
                          <a
                            href={item.links.notebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Colab
                          </a>
                        )}
                      </div>

                      {/* Reproduce Button */}
                      <button
                        onClick={() => setSelectedResearch(item)}
                        className={`inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 transition-colors ${
                          isEven ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        {isEven && <span>Reproduce Results</span>}
                        <ArrowRight className={`w-4 h-4 ${isEven ? 'md:rotate-180' : ''}`} />
                        {!isEven && <span>Reproduce Results</span>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reproducibility Dialog */}
      <Dialog open={!!selectedResearch} onOpenChange={() => setSelectedResearch(null)}>
        <DialogContent className="max-w-2xl bg-card border-teal-500/30">
          {selectedResearch && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-foreground">
                  Reproduce: {selectedResearch.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  {selectedResearch.links.arxiv && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedResearch.links.arxiv} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="w-4 h-4 mr-2" />
                        arXiv
                      </a>
                    </Button>
                  )}
                  {selectedResearch.links.pdf && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedResearch.links.pdf} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                  {selectedResearch.links.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedResearch.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {selectedResearch.links.notebook && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedResearch.links.notebook} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Notebook
                      </a>
                    </Button>
                  )}
                </div>

                {/* Dataset */}
                {selectedResearch.reproducibility.datasetUrl && (
                  <div className="bg-muted p-4 rounded">
                    <p className="text-muted-foreground text-xs mono mb-2">DATASET</p>
                    <a
                      href={selectedResearch.reproducibility.datasetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Access Dataset
                    </a>
                  </div>
                )}

                {/* Requirements */}
                <div>
                  <p className="text-muted-foreground text-xs mono mb-2">REQUIREMENTS</p>
                  <ul className="space-y-1">
                    {selectedResearch.reproducibility.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-foreground font-mono">$ {req}</li>
                    ))}
                  </ul>
                </div>

                {/* Time Estimate */}
                <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded">
                  <p className="text-teal-600 text-sm">
                    <span className="font-semibold">Estimated Time:</span>{' '}
                    {selectedResearch.reproducibility.estimatedTime}
                  </p>
                </div>

                {/* Quick Start */}
                <div className="bg-muted p-4 rounded">
                  <p className="text-muted-foreground text-xs mono mb-2">QUICK START</p>
                  <code className="text-sm text-foreground block">
                    git clone {selectedResearch.reproducibility.codeUrl}.git<br />
                    cd {selectedResearch.id}<br />
                    pip install -r requirements.txt<br />
                    python reproduce.py
                  </code>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Research;
