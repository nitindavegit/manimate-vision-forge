import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Circle, Zap, Brain, Video, Sparkles } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Scroll animation hooks
  const heroAnimation = useScrollAnimation({ threshold: 0.3 });
  const sectionAnimation = useScrollAnimation({ threshold: 0.2 });
  const benefitsAnimation = useScrollAnimation({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.2 });
  
  const benefits = [
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
  ];
  
  const { ref: benefitsRef, visibleItems } = useStaggeredAnimation(benefits, 200);

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
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-[pulse_8s_ease-in-out_infinite]" style={{ backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-[fade-in_2s_ease-out]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/2 to-transparent animate-[fade-in_3s_ease-out_1s]" />
      
      {/* Floating orbs for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-[pulse_6s_ease-in-out_infinite] opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-[pulse_8s_ease-in-out_infinite_2s] opacity-40" />
      
      {/* Logo in top left corner - responsive */}
      <div className={`absolute top-4 left-4 z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/b5ec7487-efae-495b-b279-ffc4365662e9.png" 
            alt="Manimate Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" 
          />
        </div>
      </div>

      {/* Navigation - responsive with mobile optimization */}
      <nav className={`absolute top-4 right-4 z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <Card className="bg-card/80 backdrop-blur-xl border-border/20">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm px-2 sm:px-3">
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 bg-background/50 text-xs sm:text-sm px-2 sm:px-3">
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </nav>

      {/* Main content centered - responsive padding */}
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12 md:space-y-16">
          
          {/* Hero heading - responsive and animated */}
          <div 
            ref={heroAnimation.ref}
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-4 sm:p-6 md:p-8 lg:p-12 hover:bg-card/70 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl group">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold leading-tight tracking-tight">
                <span className="text-foreground animate-fade-in bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-primary/60 transition-all duration-500">Generate Video Using</span>
                <br />
                <span className="text-foreground animate-fade-in bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-primary/60 transition-all duration-500" style={{ animationDelay: '0.2s' }}>Manim. </span>
                <span className="text-primary font-light italic animate-fade-in bg-gradient-to-r from-primary to-accent bg-clip-text animate-[fade-in_0.6s_ease-out_0.4s_both,pulse_3s_ease-in-out_infinite_2s]" style={{ animationDelay: '0.4s' }}>With AI.</span>
              </h1>
            </Card>
          </div>

          {/* CTA Section - responsive */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {!showPrompt ? (
              <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-4 sm:p-6 md:p-8 hover:bg-card/70 transition-all duration-500">
                <Link to="/auth">
                  <Button
                    variant="default" 
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium bg-primary text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform hover:translate-x-1" />
                  </Button>
                </Link>
              </Card>
            ) : (
              <Card className="max-w-xs sm:max-w-md mx-auto bg-card/80 backdrop-blur-xl border-border/20 p-4 sm:p-6 animate-scale-in">
                <CardContent className="space-y-4 p-0">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your animation idea..."
                    className="h-10 sm:h-12 text-sm sm:text-base bg-background/50 border-border/50 focus:border-primary transition-all duration-300 focus:scale-[1.02]"
                    onKeyDown={(e) => e.key === 'Enter' && handleTryNow()}
                  />
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      onClick={handleTryNow}
                      variant="default"
                      size="lg"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base transform hover:scale-105 transition-all duration-300"
                      disabled={!prompt.trim()}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Generate Video
                    </Button>
                    <Link to="/generate" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full border-border/50 bg-background/50 text-sm sm:text-base hover:scale-105 transition-all duration-300">
                        Full Studio
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Scroll indicator - responsive */}
          <div className={`pt-8 sm:pt-12 md:pt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="inline-block bg-card/40 backdrop-blur-xl border-border/20 p-2 sm:p-3">
              <div className="w-5 h-8 sm:w-6 sm:h-10 border border-border/30 rounded-full flex justify-center">
                <div className="w-1 h-2 sm:h-3 bg-muted-foreground rounded-full mt-1 sm:mt-2 animate-bounce"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Secondary content section - fully responsive cards */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
          
          {/* AI POWERED ANIMATION section */}
          <div 
            ref={sectionAnimation.ref}
            className={`text-center transition-all duration-1000 ${
              sectionAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-4 sm:p-6 md:p-8 lg:p-12 hover:bg-card/70 transition-all duration-500 hover:scale-[1.02]">
              <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider mb-4 sm:mb-6 animate-fade-in">
                AI POWERED ANIMATION
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
                We turn your ideas into dynamic visual stories—powered by AI and rendered with Manim. 
                From math to machine learning, we animate what matters.
              </h2>
            </Card>
          </div>

          {/* Benefits section */}
          <div 
            ref={benefitsAnimation.ref}
            className={`transition-all duration-1000 delay-200 ${
              benefitsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 md:mb-12 hover:bg-card/70 transition-all duration-500">
              <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider mb-4 sm:mb-6 text-center animate-fade-in">
                BENEFITS
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>Why Choose Us?</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Everything you need to turn concepts into captivating visuals — fast, intelligent, and beautifully rendered.
              </p>
            </Card>
            
            <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                 <Card 
                  key={index} 
                  className={`bg-card/80 backdrop-blur-xl border-border/20 p-4 sm:p-6 text-center hover:bg-card/90 transition-all duration-700 hover:scale-105 transform hover:shadow-xl hover:rotate-1 group relative overflow-hidden ${
                    visibleItems.has(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`,
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent animate-[pulse_4s_ease-in-out_infinite] opacity-60" />
                  <CardContent className="relative p-0 space-y-3 sm:space-y-4 z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 hover:bg-primary/20 transition-all duration-500 hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary transition-all duration-500 hover:scale-110 group-hover:rotate-12" />
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold hover:text-primary transition-colors duration-500 group-hover:scale-105">{benefit.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base group-hover:text-foreground/80 transition-colors duration-500">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div 
            ref={ctaAnimation.ref}
            className={`transition-all duration-1000 delay-400 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 backdrop-blur-xl border-border/20 p-6 sm:p-8 md:p-12 lg:p-16 text-center hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex justify-center">
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary animate-pulse hover:animate-bounce hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold animate-fade-in">Ready to Visualize Smarter? Let's Go</h3>
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium bg-primary text-primary-foreground hover:bg-gradient-to-r hover:from-accent hover:to-primary rounded-lg transform hover:scale-110 transition-all duration-500 hover:shadow-xl hover:shadow-accent/30 hover:rotate-2"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform hover:translate-x-2" />
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
