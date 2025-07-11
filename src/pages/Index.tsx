import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Circle, Zap, Brain, Video, Sparkles } from "lucide-react";

const Index = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTryNow = () => {
    if (showPrompt && prompt.trim()) {
      // Navigate to generate page with prompt
      window.location.href = `/generate?prompt=${encodeURIComponent(prompt)}`;
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Modern background with subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Logo positioned higher and smaller */}
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/6236e1b9-2a7c-444d-95d5-b8b96e031c3b.png" 
            alt="Manimate Logo" 
            className="w-12 h-12 object-contain" 
          />
        </div>
      </div>

      {/* Navigation positioned higher to avoid overlap */}
      <nav className={`absolute top-4 right-4 z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <Card className="bg-card/80 backdrop-blur-xl border-border/20">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 bg-background/50">
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </nav>

      {/* Main content centered */}
      <div className="flex min-h-screen items-center justify-center px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          
          {/* Hero heading - responsive and animated */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight">
                <span className="text-foreground">Generate Video Using</span>
                <br />
                <span className="text-foreground">Manim. </span>
                <span className="text-primary font-light italic">With AI.</span>
              </h1>
            </Card>
          </div>

          {/* CTA Section */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {!showPrompt ? (
              <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-6 md:p-8">
                <Link to="/auth">
                  <Button
                    variant="default" 
                    size="lg"
                    className="px-8 py-4 text-base md:text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </Card>
            ) : (
              <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-xl border-border/20 p-6">
                <CardContent className="space-y-4 p-0">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your animation idea..."
                    className="h-12 text-base bg-background/50 border-border/50 focus:border-primary"
                    onKeyDown={(e) => e.key === 'Enter' && handleTryNow()}
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleTryNow}
                      variant="default"
                      size="lg"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!prompt.trim()}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Generate Video
                    </Button>
                    <Link to="/generate" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full border-border/50 bg-background/50">
                        Full Studio
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Scroll indicator */}
          <div className={`pt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="inline-block bg-card/40 backdrop-blur-xl border-border/20 p-3">
              <div className="w-6 h-10 border border-border/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Secondary content section - fully responsive cards */}
      <div className="relative z-10 px-4 md:px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* AI POWERED ANIMATION section */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-8 md:p-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
                AI POWERED ANIMATION
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto">
                We turn your ideas into dynamic visual stories—powered by AI and rendered with Manim. 
                From math to machine learning, we animate what matters.
              </h2>
            </Card>
          </div>

          {/* Benefits section */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-8 md:p-12 mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-6 text-center">
                BENEFITS
              </p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">Why Choose Us?</h3>
              <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto">
                Everything you need to turn concepts into captivating visuals — fast, intelligent, and beautifully rendered.
              </p>
            </Card>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "AI-Powered Visualizations",
                  description: "Leverage the power of AI to convert ideas, prompts into animations.",
                  icon: Brain
                },
                {
                  title: "Educational & Technical Impact", 
                  description: "Bring clarity to complex topics — from math equations to AI workflows",
                  icon: Zap
                },
                {
                  title: "End-to-End Automation",
                  description: "No animation or coding expertise required. Just describe it, and we animate it.",
                  icon: Video
                }
              ].map((benefit, index) => (
                <Card key={index} className={`bg-card/80 backdrop-blur-xl border-border/20 p-6 text-center hover:bg-card/90 transition-all duration-300 hover:scale-105 transform`}>
                  <CardContent className="p-0 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold">{benefit.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 backdrop-blur-xl border-border/20 p-8 md:p-16 text-center">
              <div className="space-y-8">
                <div className="flex justify-center">
                  <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Ready to Visualize Smarter? Let's Go</h3>
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="px-8 py-4 text-base md:text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
