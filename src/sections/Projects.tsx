import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Layers, Cpu, Gauge, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  // Case study details
  architecture: {
    component: string;
    description: string;
  }[];
  modelChoice: {
    selected: string;
    alternatives: string[];
    reasoning: string;
  };
  benchmarks: {
    metric: string;
    value: string;
    comparison?: string;
  }[];
  tradeoffs: {
    decision: string;
    pros: string[];
    cons: string[];
  }[];
  reproducibility: {
    notebookUrl?: string;
    datasetInfo: string;
    requirements: string[];
  };
}

const projects: ProjectCaseStudy[] = [
  {
    id: 'neurovision',
    title: 'NeuroVision',
    tagline: 'Real-time object detection for autonomous drones',
    description: 'Edge-optimized computer vision system for drone surveillance with sub-50ms inference.',
    problem: 'Drones needed to identify and track objects in real-time with limited onboard computing power.',
    solution: 'Developed a lightweight YOLO-based model optimized for edge devices, achieving 30 FPS on embedded hardware.',
    impact: 'Reduced processing latency by 65% and improved detection accuracy to 94.5%.',
    image: '/images/project-neurovision.jpg',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'CUDA', 'ROS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com',
    architecture: [
      { component: 'Edge Inference', description: 'TensorFlow Lite runtime on Jetson Nano' },
      { component: 'Model Optimization', description: 'INT8 quantization + pruning (4x size reduction)' },
      { component: 'Pipeline', description: 'GStreamer → Preprocessing → Inference → Post-processing' },
      { component: 'Communication', description: 'MQTT for telemetry, WebRTC for video stream' },
    ],
    modelChoice: {
      selected: 'YOLOv8-nano (quantized)',
      alternatives: ['YOLOv5s', 'MobileNet-SSD', 'EfficientDet-Lite'],
      reasoning: 'YOLOv8-nano offered best speed/accuracy tradeoff. Quantization reduced model size from 22MB to 5.5MB with only 1.2% mAP drop.',
    },
    benchmarks: [
      { metric: 'Inference Time', value: '28ms', comparison: 'vs 82ms baseline' },
      { metric: 'mAP@0.5', value: '94.5%', comparison: 'vs 96.1% full model' },
      { metric: 'FPS', value: '35', comparison: 'target: 30 FPS' },
      { metric: 'Model Size', value: '5.5MB', comparison: 'vs 22MB original' },
    ],
    tradeoffs: [
      {
        decision: 'Quantization to INT8',
        pros: ['4x smaller model', '2x faster inference', 'Lower power consumption'],
        cons: ['1.2% accuracy drop', 'Requires calibration data', 'Harder to debug'],
      },
      {
        decision: 'Edge vs Cloud Inference',
        pros: ['Sub-50ms latency', 'Works offline', 'Privacy-preserving'],
        cons: ['Limited compute', 'Harder to update models', 'Higher device cost'],
      },
    ],
    reproducibility: {
      notebookUrl: 'https://github.com/example/neurovision/blob/main/notebooks/training.ipynb',
      datasetInfo: 'Custom dataset: 50K images, 15 classes. Available on request.',
      requirements: ['Python 3.9+', 'TensorFlow 2.13+', 'CUDA 11.8', 'JetPack 5.1 (for edge)'],
    },
  },
  {
    id: 'quantflow',
    title: 'QuantFlow',
    tagline: 'High-frequency trading dashboard with real-time analysis',
    description: 'Low-latency trading platform processing 10K+ ticks/second with sub-50ms UI updates.',
    problem: 'Traders needed millisecond-level data visualization for algorithmic decision making.',
    solution: 'Built a WebSocket-based real-time data pipeline with custom charting engine.',
    impact: 'Processed 10,000+ ticks per second with sub-50ms UI update latency.',
    image: '/images/project-quantflow.jpg',
    technologies: ['React', 'Go', 'WebSocket', 'Redis', 'D3.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com',
    architecture: [
      { component: 'Data Ingestion', description: 'Go microservices consuming market data feeds' },
      { component: 'Stream Processing', description: 'Redis Streams for pub/sub with consumer groups' },
      { component: 'Frontend', description: 'React + Web Workers for chart rendering' },
      { component: 'State Management', description: 'Zustand with optimistic updates' },
    ],
    modelChoice: {
      selected: 'Custom WebSocket Protocol',
      alternatives: ['Socket.io', 'GraphQL Subscriptions', 'SSE'],
      reasoning: 'Custom binary protocol reduced message size by 70% vs JSON. Critical for high-frequency updates.',
    },
    benchmarks: [
      { metric: 'UI Update Latency', value: '47ms', comparison: 'p99 (target: 50ms)' },
      { metric: 'Throughput', value: '12K', comparison: 'ticks/second processed' },
      { metric: 'Memory Usage', value: '145MB', comparison: 'frontend heap size' },
      { metric: 'CPU Usage', value: '<15%', comparison: 'during peak load' },
    ],
    tradeoffs: [
      {
        decision: 'Custom Protocol over Socket.io',
        pros: ['70% smaller messages', 'Full control over reconnection', 'Better performance'],
        cons: ['More code to maintain', 'No built-in fallbacks', 'Harder to debug'],
      },
      {
        decision: 'Client-side Rendering',
        pros: ['Sub-50ms updates', 'Smooth 60fps charts', 'Reduced server load'],
        cons: ['Higher battery usage', 'Complex state sync', 'Memory constraints'],
      },
    ],
    reproducibility: {
      datasetInfo: 'Uses public market data from Polygon.io API',
      requirements: ['Go 1.20+', 'Node 18+', 'Redis 7+', 'Docker & Docker Compose'],
    },
  },
  {
    id: 'synapse',
    title: 'SynapseChat',
    tagline: 'Context-aware customer support AI',
    description: 'RAG-based chatbot with multi-turn conversation memory and 40% ticket reduction.',
    problem: 'Traditional chatbots lacked context retention, leading to repetitive customer frustration.',
    solution: 'Implemented RAG architecture with vector database for long-term conversation memory.',
    impact: 'Reduced support ticket volume by 40% and improved CSAT scores by 25%.',
    image: '/images/project-synapse.jpg',
    technologies: ['Node.js', 'OpenAI', 'Pinecone', 'PostgreSQL', 'LangChain'],
    githubUrl: 'https://github.com',
    architecture: [
      { component: 'Embedding Service', description: 'OpenAI text-embedding-3-large for vectors' },
      { component: 'Vector Store', description: 'Pinecone with metadata filtering' },
      { component: 'LLM Orchestration', description: 'LangChain for chain-of-thought prompting' },
      { component: 'Memory Layer', description: 'PostgreSQL for conversation history' },
    ],
    modelChoice: {
      selected: 'GPT-4 + RAG',
      alternatives: ['Fine-tuned LLaMA-2', 'Claude 2', 'GPT-3.5 only'],
      reasoning: 'RAG with GPT-4 provided best accuracy without fine-tuning costs. Retrieved context reduced hallucinations by 80%.',
    },
    benchmarks: [
      { metric: 'Ticket Reduction', value: '40%', comparison: 'vs previous bot' },
      { metric: 'CSAT Score', value: '4.6/5', comparison: '+25% improvement' },
      { metric: 'Response Time', value: '2.3s', comparison: 'average' },
      { metric: 'Accuracy', value: '91%', comparison: 'correct answers' },
    ],
    tradeoffs: [
      {
        decision: 'RAG vs Fine-tuning',
        pros: ['No training costs', 'Easy to update knowledge', 'Better transparency'],
        cons: ['Higher inference cost', 'Dependency on vector DB', 'Context window limits'],
      },
      {
        decision: 'GPT-4 over GPT-3.5',
        pros: ['Higher accuracy', 'Better reasoning', 'Fewer hallucinations'],
        cons: ['10x cost', 'Slower responses', 'Rate limits'],
      },
    ],
    reproducibility: {
      notebookUrl: 'https://github.com/example/synapse/blob/main/evaluation/eval.ipynb',
      datasetInfo: 'Evaluation on 1,000 real support conversations (anonymized)',
      requirements: ['Node 18+', 'OpenAI API key', 'Pinecone account', 'Docker'],
    },
  },
  {
    id: 'cloudops',
    title: 'CloudOps AI',
    tagline: 'Intelligent cloud infrastructure monitoring',
    description: 'Predictive auto-scaling using time-series forecasting and anomaly detection.',
    problem: 'Manual scaling led to either over-provisioning costs or service outages during spikes.',
    solution: 'Built predictive auto-scaling using time-series forecasting and anomaly detection.',
    impact: 'Reduced infrastructure costs by 35% while maintaining 99.99% uptime.',
    image: '/images/project-cloudops.jpg',
    technologies: ['Python', 'Kubernetes', 'Prometheus', 'TensorFlow', 'AWS'],
    githubUrl: 'https://github.com',
    architecture: [
      { component: 'Metrics Collection', description: 'Prometheus + custom exporters' },
      { component: 'Forecasting', description: 'LSTM model for traffic prediction' },
      { component: 'Anomaly Detection', description: 'Isolation Forest for outliers' },
      { component: 'Auto-scaling', description: 'Kubernetes HPA with custom metrics' },
    ],
    modelChoice: {
      selected: 'LSTM + Isolation Forest',
      alternatives: ['ARIMA', 'Prophet', 'Simple threshold-based'],
      reasoning: 'LSTM captured complex seasonal patterns. Isolation Forest detected anomalies ARIMA missed.',
    },
    benchmarks: [
      { metric: 'Cost Reduction', value: '35%', comparison: 'monthly savings' },
      { metric: 'Uptime', value: '99.99%', comparison: 'SLA compliance' },
      { metric: 'Prediction Accuracy', value: '94%', comparison: 'MAPE on traffic' },
      { metric: 'Scale-up Time', value: '45s', comparison: 'vs 3min manual' },
    ],
    tradeoffs: [
      {
        decision: 'ML-based vs Rule-based',
        pros: ['35% cost savings', 'Handles complex patterns', 'Self-improving'],
        cons: ['Harder to debug', 'Requires training data', 'Model maintenance'],
      },
      {
        decision: 'Predictive vs Reactive Scaling',
        pros: ['Prevents outages', 'Smoother scaling', 'Better UX'],
        cons: ['Over-provisioning risk', 'Model drift', 'Higher complexity'],
      },
    ],
    reproducibility: {
      notebookUrl: 'https://github.com/example/cloudops-ai/blob/main/models/training.ipynb',
      datasetInfo: 'Public AWS EC2 pricing + synthetic load patterns',
      requirements: ['Python 3.10+', 'Kubernetes cluster', 'Prometheus', 'AWS/GCP account'],
    },
  },
  {
    id: 'medscan',
    title: 'MedScan AI',
    tagline: 'Medical imaging for early tumor detection',
    description: 'U-Net based segmentation achieving 96% sensitivity in MRI tumor detection.',
    problem: 'Radiologists needed assistance identifying subtle anomalies in high-volume imaging.',
    solution: 'Developed a U-Net based segmentation model with attention mechanisms.',
    impact: 'Achieved 96% sensitivity in tumor detection, assisting 500+ diagnoses monthly.',
    image: '/images/project-medscan.jpg',
    technologies: ['PyTorch', 'MONAI', 'FastAPI', 'Docker', 'HIPAA'],
    githubUrl: 'https://github.com',
    architecture: [
      { component: 'Preprocessing', description: 'N4 bias correction + normalization' },
      { component: 'Segmentation', description: '3D U-Net with attention gates' },
      { component: 'Inference API', description: 'FastAPI with async processing' },
      { component: 'Compliance', description: 'HIPAA-compliant data handling' },
    ],
    modelChoice: {
      selected: '3D U-Net + Attention',
      alternatives: ['2D U-Net', 'nnU-Net', 'V-Net'],
      reasoning: '3D context crucial for tumor detection. Attention gates improved boundary segmentation by 12%.',
    },
    benchmarks: [
      { metric: 'Sensitivity', value: '96%', comparison: 'tumor detection' },
      { metric: 'Specificity', value: '92%', comparison: 'false positive rate' },
      { metric: 'Dice Score', value: '0.89', comparison: 'segmentation overlap' },
      { metric: 'Inference', value: '3.2s', comparison: 'per MRI volume' },
    ],
    tradeoffs: [
      {
        decision: '3D vs 2D Processing',
        pros: ['Better spatial context', 'Higher accuracy', 'Clinical relevance'],
        cons: ['10x compute cost', 'Larger memory', 'Slower inference'],
      },
      {
        decision: 'Attention Mechanisms',
        pros: ['+12% boundary accuracy', 'Better interpretability', 'Focused regions'],
        cons: ['2x training time', 'More parameters', 'Overfitting risk'],
      },
    ],
    reproducibility: {
      notebookUrl: 'https://github.com/example/medscan/blob/main/training/train.ipynb',
      datasetInfo: 'BraTS 2021 dataset (public) + institutional validation set',
      requirements: ['Python 3.9+', 'PyTorch 2.0+', 'CUDA 11.8', '16GB+ GPU VRAM'],
    },
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
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
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    setHoveredProject(projectId);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredProject(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="projects-header mb-16">
          <p className="mono text-cyan-400 text-sm tracking-widest mb-2">PORTFOLIO</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            THE LAB
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mt-4" />
          <p className="text-off-white/70 mt-6 max-w-2xl">
            Real-world projects that solve complex problems. Each one includes architecture decisions, 
            performance benchmarks, and lessons learned.
          </p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`relative h-full bg-panel/50 border transition-all duration-500 overflow-hidden ${
                  hoveredProject === project.id
                    ? 'border-cyan-400/50 shadow-glow'
                    : 'border-white/5'
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/50 to-transparent" />
                  <div
                    className={`absolute inset-0 bg-cyan-400/10 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <ArrowUpRight className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-cyan-400/80 text-sm mb-3">{project.tagline}</p>
                  <p className="text-off-white/80 mb-4">{project.description}</p>

                  <div className="bg-cyan-400/10 border border-cyan-400/20 p-3 mb-4">
                    <p className="text-cyan-400 text-xs mono mb-1">IMPACT</p>
                    <p className="text-white text-sm font-medium">{project.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/5 text-off-white/60 text-xs font-mono rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex-1 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                      onClick={() => setSelectedCaseStudy(project)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Case Study
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="px-3 border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400/30" />
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-400/30" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-400/30" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-400/30" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedCaseStudy} onOpenChange={() => setSelectedCaseStudy(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-panel border-cyan-400/30 p-0">
          {selectedCaseStudy && (
            <>
              {/* Header Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-panel/80 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 -mt-12 relative">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl text-white">
                    {selectedCaseStudy.title}
                  </DialogTitle>
                  <DialogDescription className="text-cyan-400/80 text-lg">
                    {selectedCaseStudy.tagline}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList className="grid grid-cols-5 bg-panel border border-white/10">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">Overview</TabsTrigger>
                    <TabsTrigger value="architecture" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
                      <Layers className="w-4 h-4 mr-1 hidden sm:inline" />
                      Arch
                    </TabsTrigger>
                    <TabsTrigger value="model" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
                      <Cpu className="w-4 h-4 mr-1 hidden sm:inline" />
                      Model
                    </TabsTrigger>
                    <TabsTrigger value="benchmarks" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">
                      <Gauge className="w-4 h-4 mr-1 hidden sm:inline" />
                      Perf
                    </TabsTrigger>
                    <TabsTrigger value="reproduce" className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400">Reproduce</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-cyan-400/5 border border-cyan-400/20 p-4 rounded">
                        <p className="text-cyan-400 text-xs mono mb-2">PROBLEM</p>
                        <p className="text-off-white/80 text-sm">{selectedCaseStudy.problem}</p>
                      </div>
                      <div className="bg-cyan-400/5 border border-cyan-400/20 p-4 rounded">
                        <p className="text-cyan-400 text-xs mono mb-2">SOLUTION</p>
                        <p className="text-off-white/80 text-sm">{selectedCaseStudy.solution}</p>
                      </div>
                    </div>

                    {/* Trade-offs */}
                    <div className="space-y-4">
                      <p className="text-cyan-400 font-semibold">Key Trade-offs</p>
                      {selectedCaseStudy.tradeoffs.map((t, i) => (
                        <div key={i} className="bg-panel border border-white/10 p-4 rounded">
                          <p className="text-white font-medium mb-2">{t.decision}</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-green-400 text-xs mb-1">PROS</p>
                              <ul className="space-y-1">
                                {t.pros.map((p, j) => (
                                  <li key={j} className="text-off-white/70 text-sm">✓ {p}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-red-400 text-xs mb-1">CONS</p>
                              <ul className="space-y-1">
                                {t.cons.map((c, j) => (
                                  <li key={j} className="text-off-white/70 text-sm">✗ {c}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="architecture" className="mt-4">
                    <div className="space-y-3">
                      {selectedCaseStudy.architecture.map((comp, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-panel border border-white/10 rounded">
                          <div className="w-8 h-8 bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-cyan-400 font-mono text-sm">{i + 1}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{comp.component}</p>
                            <p className="text-off-white/60 text-sm">{comp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="model" className="mt-4">
                    <div className="bg-cyan-400/5 border border-cyan-400/20 p-4 rounded mb-4">
                      <p className="text-cyan-400 text-xs mono mb-2">SELECTED MODEL</p>
                      <p className="text-white font-display text-xl">{selectedCaseStudy.modelChoice.selected}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-off-white/60 text-sm mb-2">Alternatives Considered:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.modelChoice.alternatives.map((alt) => (
                          <span key={alt} className="px-3 py-1 bg-white/5 text-off-white/60 text-sm rounded">
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-panel border border-white/10 p-4 rounded">
                      <p className="text-cyan-400 text-xs mono mb-2">REASONING</p>
                      <p className="text-off-white/80 text-sm">{selectedCaseStudy.modelChoice.reasoning}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="benchmarks" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {selectedCaseStudy.benchmarks.map((b) => (
                        <div key={b.metric} className="text-center p-4 bg-cyan-400/10 border border-cyan-400/20 rounded">
                          <p className="text-cyan-400 font-display text-3xl font-bold">{b.value}</p>
                          <p className="text-white font-medium">{b.metric}</p>
                          {b.comparison && (
                            <p className="text-off-white/50 text-xs mt-1">{b.comparison}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reproduce" className="mt-4">
                    <div className="space-y-4">
                      {selectedCaseStudy.reproducibility.notebookUrl && (
                        <a
                          href={selectedCaseStudy.reproducibility.notebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded hover:bg-cyan-400/20 transition-colors"
                        >
                          <BookOpen className="w-5 h-5 text-cyan-400" />
                          <div>
                            <p className="text-white font-medium">Training Notebook</p>
                            <p className="text-off-white/60 text-sm">Jupyter notebook with full training pipeline</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-cyan-400 ml-auto" />
                        </a>
                      )}
                      <div className="bg-panel border border-white/10 p-4 rounded">
                        <p className="text-cyan-400 text-xs mono mb-2">DATASET</p>
                        <p className="text-off-white/80 text-sm">{selectedCaseStudy.reproducibility.datasetInfo}</p>
                      </div>
                      <div>
                        <p className="text-off-white/60 text-sm mb-2">Requirements:</p>
                        <ul className="space-y-1">
                          {selectedCaseStudy.reproducibility.requirements.map((req, i) => (
                            <li key={i} className="text-off-white/70 text-sm font-mono">$ {req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                  <Button
                    className="flex-1 bg-cyan-400 text-void hover:bg-cyan-300"
                    onClick={() => window.open(selectedCaseStudy.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                  {selectedCaseStudy.liveUrl && (
                    <Button
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => window.open(selectedCaseStudy.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
