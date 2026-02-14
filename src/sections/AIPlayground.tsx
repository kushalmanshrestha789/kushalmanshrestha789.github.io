import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Send, RotateCcw, Image as ImageIcon, MessageSquare, Code, Cpu, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


gsap.registerPlugin(ScrollTrigger);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DemoFeature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'live' | 'coming-soon';
}

const demoFeatures: DemoFeature[] = [
  {
    id: 'chat',
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Talk to a fine-tuned assistant about ML, coding, and system design',
    status: 'live',
  },
  {
    id: 'code',
    icon: Code,
    title: 'Code Generator',
    description: 'Generate Python/TypeScript with architecture explanations',
    status: 'coming-soon',
  },
  {
    id: 'vision',
    icon: ImageIcon,
    title: 'Vision Demo',
    description: 'Upload an image and get object detection results',
    status: 'coming-soon',
  },
];

// Simulated AI responses for the demo
const simulatedResponses: Record<string, string[]> = {
  default: [
    "That's an interesting question! In my experience, the key to scalable ML systems is separating concerns between data ingestion, feature engineering, model training, and inference serving. Each layer should be independently scalable.",
    "Great question! For transformer optimization on edge devices, I'd recommend starting with quantization-aware training rather than post-training quantization. You'll typically see 2-3% better accuracy retention.",
    "When building real-time ML pipelines, the biggest bottleneck is usually feature retrieval. Consider using a feature store like Feast or Tecton to serve pre-computed features with low latency.",
  ],
  architecture: [
    "For a high-throughput recommendation system, I'd suggest a two-tier architecture: lightweight models at the edge for initial candidate generation, followed by a heavier re-ranking model in the cloud. This gives you the best of both worlds—speed and accuracy.",
    "Microservices vs monolith for ML? It depends on your team size and iteration speed. For early-stage startups, a modular monolith with clear boundaries often moves faster. Scale to microservices when you have dedicated teams per component.",
  ],
  ml: [
    "Model drift detection is crucial! I recommend monitoring both data drift (input distribution changes) and concept drift (relationship between inputs and outputs changes). Use statistical tests like KS-test for continuous features and Chi-square for categorical.",
    "For LLM fine-tuning on limited compute, LoRA (Low-Rank Adaptation) is a game-changer. You can fine-tune a 7B parameter model with just 8GB VRAM by only training low-rank adapter matrices instead of full weights.",
  ],
};

const getSimulatedResponse = (input: string): string => {
  const lower = input.toLowerCase();
  let responses = simulatedResponses.default;
  
  if (lower.includes('architecture') || lower.includes('system') || lower.includes('scale')) {
    responses = simulatedResponses.architecture;
  } else if (lower.includes('model') || lower.includes('ml') || lower.includes('training') || lower.includes('fine-tune')) {
    responses = simulatedResponses.ml;
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const AIPlayground = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm an AI assistant trained on software engineering and machine learning. Ask me about system architecture, ML optimization, or coding best practices!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.playground-header',
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
        '.playground-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.playground-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const response = getSimulatedResponse(input);
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm an AI assistant trained on software engineering and machine learning. Ask me about system architecture, ML optimization, or coding best practices!",
      timestamp: new Date(),
    }]);
  };

  const suggestedPrompts = [
    "How do I optimize transformers for edge devices?",
    "What's the best architecture for real-time ML?",
    "Explain LoRA fine-tuning",
    "How to detect model drift?",
  ];

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="relative py-24 lg:py-32 bg-void overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="playground-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Interactive Demo</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            AI PLAYGROUND
          </h2>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            Experience AI in action. Try the live chat demo powered by a fine-tuned language model 
            trained on software engineering and ML concepts.
          </p>
        </div>

        {/* Main Content */}
        <div className="playground-content grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Features */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-display text-lg font-bold text-white mb-4">Available Demos</h3>
            
            {demoFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`p-4 border transition-all ${
                  feature.status === 'live'
                    ? 'border-cyan-400/50 bg-cyan-400/5'
                    : 'border-white/10 bg-panel/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 flex items-center justify-center ${
                    feature.status === 'live' ? 'bg-cyan-400/20' : 'bg-white/10'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      feature.status === 'live' ? 'text-cyan-400' : 'text-white/40'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{feature.title}</h4>
                    <span className={`text-xs ${
                      feature.status === 'live' ? 'text-green-400' : 'text-white/40'
                    }`}>
                      {feature.status === 'live' ? '● Live' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
                <p className="text-off-white/60 text-sm">{feature.description}</p>
              </div>
            ))}

            {/* Stats */}
            <div className="p-4 border border-white/10 bg-panel/50 mt-6">
              <h4 className="text-white font-medium mb-3">Model Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/60">Parameters</span>
                  <span className="text-cyan-400 font-mono">7B</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/60">Context</span>
                  <span className="text-cyan-400 font-mono">4K tokens</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/60">Latency</span>
                  <span className="text-cyan-400 font-mono">~800ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-panel border border-cyan-400/30 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">DevAI Assistant</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 text-off-white/60 hover:text-cyan-400 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 ${
                        message.role === 'user'
                          ? 'bg-cyan-400/20 border border-cyan-400/30'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <p className="text-off-white/90 text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <span className="text-off-white/40 text-xs mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Prompts */}
              {messages.length < 3 && (
                <div className="px-4 pb-2">
                  <p className="text-off-white/40 text-xs mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setInput(prompt);
                        }}
                        className="px-3 py-1 bg-white/5 text-off-white/60 text-xs rounded hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about ML, architecture, or coding..."
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-off-white/40 focus:border-cyan-400"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-cyan-400 text-void hover:bg-cyan-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-off-white/40 text-xs mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  This is a simulated demo. Responses are pre-generated based on common questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;
