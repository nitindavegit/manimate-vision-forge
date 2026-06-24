import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Play, ArrowRight, Brain, Zap, Video, Sparkles, ChevronDown } from "lucide-react";
import { PageBackground } from "@/components/layout/PageBackground";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import {
  useGSAPFadeIn,
  useGSAPStagger,
  useGSAPHero,
  useGSAPButton,
  useGSAPTextReveal,
} from "@/hooks/useGSAPAnimations";

const benefits = [
  {
    title: "AI-Powered Visualizations",
    description: "Convert ideas and prompts into polished Manim animations — no manual scripting required.",
    icon: Brain,
  },
  {
    title: "Educational Impact",
    description: "Bring clarity to complex topics — from calculus to neural networks — with cinematic motion.",
    icon: Zap,
  },
  {
    title: "End-to-End Automation",
    description: "Describe your concept in plain language. We handle the code, rendering, and delivery.",
    icon: Video,
  },
];

const Index = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const heroRef = useGSAPHero();
  const sectionRef = useGSAPFadeIn(0.2);
  const benefitsRef = useGSAPStagger(0.15);
  const ctaRef = useGSAPFadeIn(0.4);
  const titleRef = useGSAPTextReveal();
  const buttonRef = useGSAPButton();
  const benefitsStaggerRef = useGSAPStagger(0.2);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTryNow = () => {
    if (showPrompt && prompt.trim()) {
      navigate(`/generate?prompt=${encodeURIComponent(prompt)}`);
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground intensity="vivid" />

      <PageHeader showAuth />

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 pb-16 pt-8 sm:px-6">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center">
          <div
            className={`mb-6 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <span className="section-label">AI × Manim</span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-gradient-hero">Generate Video</span>
            <br />
            <span className="text-foreground/90">Using </span>
            <span className="text-gradient">Manim.</span>
            <br />
            <span className="font-medium italic text-primary/90">With AI.</span>
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Turn mathematical concepts, science ideas, and technical topics into
            beautifully rendered animations — in seconds.
          </p>

          <div
            className={`mt-10 space-y-4 transition-all duration-1000 delay-500 sm:mt-12 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            {!showPrompt ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to={user ? "/generate" : "/auth"}>
                  <Button ref={buttonRef} variant="hero" size="lg" className="min-w-[180px] px-8">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] border-white/10 bg-white/[0.03] px-8 backdrop-blur-sm hover:border-primary/30 hover:bg-white/[0.06]"
                  onClick={() => setShowPrompt(true)}
                >
                  Try a Prompt
                </Button>
              </div>
            ) : (
              <div className="glass-card mx-auto max-w-lg p-6 animate-scale-in">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your animation idea..."
                  className="h-12 border-white/10 bg-background/60 text-base focus:border-primary/50"
                  onKeyDown={(e) => e.key === "Enter" && handleTryNow()}
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    ref={buttonRef}
                    onClick={handleTryNow}
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={!prompt.trim()}
                  >
                    <Play className="h-4 w-4" />
                    Generate Video
                  </Button>
                  <Link to="/generate" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white/10 bg-white/[0.03]"
                    >
                      Full Studio
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? "opacity-60" : "opacity-0"}`}
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-20">
          <div ref={sectionRef} className="text-center">
            <span className="section-label mb-4">How it works</span>
            <h2 className="font-display mt-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Ideas into{" "}
              <span className="text-gradient">dynamic visual stories</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground sm:text-lg">
              Powered by AI and rendered with Manim — from math to machine learning,
              we animate what matters.
            </p>
          </div>

          <div ref={benefitsRef} className="space-y-8">
            <div className="text-center">
              <span className="section-label mb-4">Benefits</span>
              <h3 className="font-display mt-4 text-2xl font-bold sm:text-3xl">
                Why Choose Manimate?
              </h3>
            </div>

            <div
              ref={benefitsStaggerRef}
              className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="glass-card group p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-cyan sm:p-8"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-display text-lg font-semibold sm:text-xl">
                    {benefit.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div ref={ctaRef} className="glass-card p-8 text-center sm:p-12 md:p-16">
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-primary" />
            <h3 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to visualize smarter?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join educators and creators turning concepts into captivating motion graphics.
            </p>
            <Link to={user ? "/generate" : "/auth"} className="mt-8 inline-block">
              <Button variant="hero" size="lg" className="px-10">
                Start Creating
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.04] px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Manimate. AI-powered Manim animations.</p>
      </footer>
    </div>
  );
};

export default Index;
