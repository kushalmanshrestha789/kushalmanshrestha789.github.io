import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Target, Wrench, BarChart3, ChevronRight, Cpu, Clock, Database, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ProblemSolvingCase {
  id: string;
  title: string;
  problem: string;
  constraints: string[];
  solution: string;
  architecture: string[];
  result: {
    metric: string;
    value: string;
    description: string;
  }[];
  learnings: string;
}

const caseStudies: ProblemSolvingCase[] = [
  {
    id: 'realtime-ml',
    title: 'Real-Time ML Inference at Scale',
    problem: 'E-commerce platform needed personalized recommendations for 10M+ daily users with <100ms latency.',
    constraints: [
      'Budget: $50K/month infrastructure cap',
      'Latency: p99 < 100ms for API response',
      'Throughput: 50K requests/second peak',
      'Data: 2TB user behavior data daily',
    ],
    solution: 'Built a two-tier caching architecture with edge-deployed lightweight models and centralized heavy inference.',
    architecture: [
      'Edge: TensorFlow Lite models on CDN nodes',
      'Cache: Redis Cluster with model predictions',
      'Fallback: Central GPU cluster for cold users',
      'Pipeline: Kafka → Flink → Feature Store',
    ],
    result: [
      { metric: 'Latency', value: '47ms', description: 'p99 response time (target: 100ms)' },
      { metric: 'Cost', value: '-42%', description: 'Infrastructure cost reduction' },
      { metric: 'CTR', value: '+28%', description: 'Click-through rate improvement' },
    ],
    learnings: 'Model architecture matters more than raw accuracy. A 5% accuracy drop for 10x speedup often wins in production.',
  },
  {
    id: 'edge-deployment',
    title: 'Deploying LLMs on Edge Devices',
    problem: 'Field service technicians needed offline AI assistance in areas with poor connectivity.',
    constraints: [
      'Hardware: Android tablets (4GB RAM)',
      'Model: Must run 7B parameter LLM',
      'Battery: <10% hourly drain increase',
      'Accuracy: >85% task completion rate',
    ],
    solution: 'Implemented model quantization, pruning, and a novel speculative decoding approach.',
    architecture: [
      'Quantization: INT4 weights with FP16 activations',
      'Pruning: 40% sparsity with minimal accuracy loss',
      'KV Cache: Optimized memory layout',
      'Speculative: Draft model for 3x speedup',
    ],
    result: [
      { metric: 'Model Size', value: '3.2GB', description: 'Down from 26GB (88% reduction)' },
      { metric: 'Inference', value: '12 tok/s', description: 'On 4GB Android tablet' },
      { metric: 'Accuracy', value: '91%', description: 'Task completion rate' },
    ],
    learnings: 'Quantization-aware training beats post-training quantization by 15-20% accuracy.',
  },
  {
    id: 'data-pipeline',
    title: 'Scaling Data Pipeline 100x',
    problem: 'ML training pipeline couldn\'t keep up with data growth, causing model staleness.',
    constraints: [
      'Volume: 100TB → 10PB data growth',
      'Freshness: Features must be <1 hour old',
      'Cost: 2x budget max',
      'Team: Only 2 ML engineers',
    ],
    solution: 'Migrated to streaming architecture with auto-scaling and incremental processing.',
    architecture: [
      'Ingestion: Kafka with partition auto-scaling',
      'Processing: Apache Spark Structured Streaming',
      'Storage: Delta Lake with Z-ordering',
      'Serving: Online feature store with caching',
    ],
    result: [
      { metric: 'Throughput', value: '100x', description: 'Data processing increase' },
      { metric: 'Latency', value: '23min', description: 'Feature freshness (was 6 hours)' },
      { metric: 'Cost', value: '1.7x', description: 'Under 2x budget target' },
    ],
    learnings: 'Invest in observability early. 80% of scaling issues are data quality issues in disguise.',
  },
];

const constraintIcons: Record<string, React.ElementType> = {
  'Budget': Cpu,
  'Latency': Clock,
  'Hardware': Cpu,
  'Data': Database,
  'Team': Users,
};

const HowIThink = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<ProblemSolvingCase | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.howithink-header',
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
        '.case-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cases-grid',
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
      id="how-i-think"
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, cyan 1px, transparent 1px), linear-gradient(cyan 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="howithink-header mb-16">
          <p className="mono text-cyan-400 text-sm tracking-widest mb-2">METHODOLOGY</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            HOW I SOLVE PROBLEMS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mt-4" />
          <p className="text-off-white/70 mt-6 max-w-2xl">
            Engineering is not just about writing code—it&apos;s about understanding constraints, 
            making trade-offs, and delivering measurable impact. Here&apos;s how I approach complex challenges.
          </p>
        </div>

        {/* Process Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Target, label: 'Understand', desc: 'Problem & Constraints' },
            { icon: Lightbulb, label: 'Design', desc: 'Architecture & Trade-offs' },
            { icon: Wrench, label: 'Build', desc: 'Iterate & Optimize' },
            { icon: BarChart3, label: 'Measure', desc: 'Impact & Learnings' },
          ].map((step, idx) => (
            <div key={step.label} className="relative">
              <div className="p-6 bg-panel/50 border border-white/5 text-center group hover:border-cyan-400/30 transition-colors">
                <step.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <p className="text-white font-semibold">{step.label}</p>
                <p className="text-off-white/60 text-sm">{step.desc}</p>
              </div>
              {idx < 3 && (
                <ChevronRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/30 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="cases-grid grid md:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <button
              key={caseStudy.id}
              onClick={() => setSelectedCase(caseStudy)}
              className="case-card text-left p-6 bg-panel/50 border border-white/5 hover:border-cyan-400/50 transition-all group"
            >
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {caseStudy.title}
              </h3>
              
              <p className="text-off-white/70 text-sm mb-4 line-clamp-2">
                {caseStudy.problem}
              </p>

              {/* Key Results Preview */}
              <div className="flex gap-4 mb-4">
                {caseStudy.result.slice(0, 2).map((r) => (
                  <div key={r.metric} className="text-center">
                    <p className="text-cyan-400 font-display text-2xl font-bold">{r.value}</p>
                    <p className="text-off-white/50 text-xs">{r.metric}</p>
                  </div>
                ))}
              </div>

              {/* Constraints Tags */}
              <div className="flex flex-wrap gap-2">
                {caseStudy.constraints.slice(0, 3).map((constraint) => {
                  const key = constraint.split(':')[0];
                  const Icon = constraintIcons[key] || Cpu;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-400/10 text-cyan-400/80 text-xs rounded"
                    >
                      <Icon className="w-3 h-3" />
                      {key}
                    </span>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Full Case Study</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-panel border-cyan-400/30">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-white">
                  {selectedCase.title}
                </DialogTitle>
                <DialogDescription className="text-off-white/70">
                  {selectedCase.problem}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Constraints */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Constraints
                  </h4>
                  <ul className="space-y-2">
                    {selectedCase.constraints.map((c, i) => (
                      <li key={i} className="text-off-white/80 text-sm flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Solution
                  </h4>
                  <p className="text-off-white/80 text-sm mb-3">{selectedCase.solution}</p>
                  <div className="bg-cyan-400/5 border border-cyan-400/20 p-4 rounded">
                    <p className="text-cyan-400/80 text-xs mono mb-2">ARCHITECTURE</p>
                    <ul className="space-y-1">
                      {selectedCase.architecture.map((a, i) => (
                        <li key={i} className="text-off-white/70 text-sm">→ {a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Results
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCase.result.map((r) => (
                      <div key={r.metric} className="text-center p-4 bg-cyan-400/10 border border-cyan-400/20 rounded">
                        <p className="text-cyan-400 font-display text-2xl font-bold">{r.value}</p>
                        <p className="text-white text-sm font-medium">{r.metric}</p>
                        <p className="text-off-white/50 text-xs mt-1">{r.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learnings */}
                <div className="bg-panel border border-white/10 p-4 rounded">
                  <p className="text-cyan-400/80 text-xs mono mb-2">KEY LEARNING</p>
                  <p className="text-off-white/80 italic">&ldquo;{selectedCase.learnings}&rdquo;</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HowIThink;
