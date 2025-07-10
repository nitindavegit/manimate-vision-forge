import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Play, Sparkles, Video, Zap } from "lucide-react";

const Index = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleTryNow = () => {
    if (showPrompt && prompt.trim()) {
      // Navigate to generate page with prompt
      window.location.href = `/generate?prompt=${encodeURIComponent(prompt)}`;
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-background" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh animate-gradient-shift opacity-60" style={{
        backgroundSize: '400% 400%'
      }} />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid animate-grid-move opacity-20" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Mathematical symbols floating */}
        <div className="absolute top-1/4 left-1/4 text-6xl text-primary/10 animate-float font-mono select-none" style={{ animationDelay: '1s' }}>∑</div>
        <div className="absolute top-1/3 right-1/4 text-4xl text-purple-500/10 animate-float font-mono select-none" style={{ animationDelay: '3s' }}>∞</div>
        <div className="absolute bottom-1/3 left-1/3 text-5xl text-primary/10 animate-float font-mono select-none" style={{ animationDelay: '5s' }}>π</div>
        <div className="absolute top-2/3 right-1/3 text-3xl text-purple-500/10 animate-float font-mono select-none" style={{ animationDelay: '2s' }}>∫</div>
      </div>
      
      {/* Glass morphism overlay for content readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Manimate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 transition-all duration-300">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="glow" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading with enhanced animations */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift inline-block" style={{ backgroundSize: '200% 200%' }}>
                Type an idea.
              </span>
              <br />
              <span className="text-foreground inline-block animate-float" style={{ animationDelay: '0.5s' }}>
                Generate a video.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-float" style={{ animationDelay: '1s' }}>
              Describe what you want to visualize below.
            </p>
          </div>

          {/* Feature highlights with staggered animations */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Video, text: "HD Quality Videos", delay: '0s' },
              { icon: Sparkles, text: "AI-Powered", delay: '0.2s' },
              { icon: Zap, text: "Instant Generation", delay: '0.4s' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-float hover:bg-white/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: feature.delay }}
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Section with enhanced styling */}
          <div className="max-w-md mx-auto space-y-4 animate-float" style={{ animationDelay: '1.5s' }}>
            {!showPrompt ? (
              <Button
                onClick={handleTryNow}
                variant="hero"
                size="xl"
                className="w-full group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Try it now
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300" />
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A 3D visualization of the Pythagorean theorem..."
                    className="h-12 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 focus:border-primary/50 focus:ring-primary/25"
                    onKeyDown={(e) => e.key === 'Enter' && handleTryNow()}
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 blur-xl group-focus-within:opacity-20 transition-opacity duration-500 pointer-events-none" />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleTryNow}
                    variant="hero"
                    size="lg"
                    className="flex-1 group"
                    disabled={!prompt.trim()}
                  >
                    <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Generate Video
                  </Button>
                  <Link to="/generate" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20">
                      Full Studio
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Demo examples with hover effects */}
          <div className="text-center space-y-4 animate-float" style={{ animationDelay: '2s' }}>
            <p className="text-sm text-muted-foreground">Popular examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Neural network learning",
                "Fibonacci sequence", 
                "Calculus derivatives",
                "Solar system tour",
              ].map((example, index) => (
                <Button
                  key={example}
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:text-primary hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm"
                  onClick={() => {
                    setPrompt(example);
                    setShowPrompt(true);
                  }}
                  style={{ animationDelay: `${2.2 + index * 0.1}s` }}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-5" />
    </div>
  );
};

export default Index;
