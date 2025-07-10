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
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Manimate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
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
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Type an idea.
              </span>
              <br />
              <span className="text-foreground">Generate a video.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Describe what you want to visualize below.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-primary" />
              <span>HD Quality Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Generation</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-md mx-auto space-y-4">
            {!showPrompt ? (
              <Button
                onClick={handleTryNow}
                variant="hero"
                size="xl"
                className="w-full"
              >
                <Play className="h-5 w-5 mr-2" />
                Try it now
              </Button>
            ) : (
              <div className="space-y-4">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A 3D visualization of the Pythagorean theorem..."
                  className="h-12 text-base bg-card/80 backdrop-blur-sm border-border/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleTryNow()}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleTryNow}
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={!prompt.trim()}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Generate Video
                  </Button>
                  <Link to="/generate" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Full Studio
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Demo examples */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Popular examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Neural network learning",
                "Fibonacci sequence",
                "Calculus derivatives",
                "Solar system tour",
              ].map((example) => (
                <Button
                  key={example}
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:text-primary"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Index;
