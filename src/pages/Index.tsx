import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Circle } from "lucide-react";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '40px 40px' }} />
      
      {/* Logo centered at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center border border-border/50">
            <Circle className="h-6 w-6 text-primary fill-primary" />
          </div>
        </div>
      </div>

      {/* Navigation in top right */}
      <nav className="absolute top-8 right-8 z-10">
        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main content centered */}
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Hero heading - matching your Framer design exactly */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Generate Video Using</span>
              <br />
              <span className="text-foreground">Manim. </span>
              <span className="text-primary font-light italic">With AI.</span>
            </h1>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            {!showPrompt ? (
              <div>
                <Link to="/generate">
                  <Button
                    variant="default" 
                    size="lg"
                    className="px-8 py-3 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-4">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your animation idea..."
                  className="h-12 text-base bg-card border-border/50 focus:border-primary"
                  onKeyDown={(e) => e.key === 'Enter' && handleTryNow()}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleTryNow}
                    variant="default"
                    size="lg"
                    className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                    disabled={!prompt.trim()}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Generate Video
                  </Button>
                  <Link to="/generate" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full border-border/50">
                      Full Studio
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="pt-16">
            <div className="flex justify-center">
              <div className="w-6 h-10 border border-border/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary content section - matching your prototype sections */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          
          {/* WE ANALYZE YOUR DATA section */}
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              WE ANALYZE YOUR DATA
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-4xl mx-auto">
              We turn your ideas into dynamic visual stories—powered by AI and rendered with Manim. 
              From math to machine learning, we animate what matters.
            </h2>
          </div>

          {/* Benefits section */}
          <div className="mb-20">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-8 text-center">
              BENEFITS
            </p>
            <h3 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h3>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Everything you need to turn concepts into captivating visuals — fast, intelligent, and beautifully rendered.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "AI-Powered Visualizations",
                  description: "Leverage the power of AI to convert ideas, prompts into animations."
                },
                {
                  title: "Educational & Technical Impact", 
                  description: "Bring clarity to complex topics — from math equations to AI workflows"
                },
                {
                  title: "End-to-End Automation",
                  description: "No animation or coding expertise required. Just describe it, and we animate it."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto border border-border/50">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold">{benefit.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8 py-16">
            <h3 className="text-4xl font-bold">Ready to Visualize Smarter? Let's Go</h3>
            <Link to="/generate">
              <Button 
                variant="default" 
                size="lg"
                className="px-8 py-3 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
