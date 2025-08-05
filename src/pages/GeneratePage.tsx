import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Save prompt to database
  const savePromptToDatabase = async (promptText: string, status: string = 'processing', videoUrl?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_prompts')
        .insert({
          user_id: user.id,
          prompt_text: promptText,
          generation_status: status,
          video_url: videoUrl || null
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error saving prompt:', error);
      return null;
    }
  };

  // Update prompt status in database
  const updatePromptInDatabase = async (promptId: string, status: string, videoUrl?: string) => {
    if (!promptId) return;

    try {
      await supabase
        .from('user_prompts')
        .update({
          generation_status: status,
          video_url: videoUrl || null
        })
        .eq('id', promptId);
    } catch (error) {
      console.error('Error updating prompt:', error);
    }
  };

  // Check daily generation limit
  const checkDailyLimit = async () => {
    if (!user) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const { count, error } = await supabase
        .from('user_prompts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString());

      if (error) throw error;
      return (count || 0) >= 2;
    } catch (error) {
      console.error('Error checking daily limit:', error);
      return false;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your animation.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to generate animations.",
        variant: "destructive",
      });
      return;
    }

    // Check daily limit
    const limitReached = await checkDailyLimit();
    if (limitReached) {
      toast({
        title: "Daily limit reached",
        description: "You can generate up to 2 videos per day. Try again tomorrow!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Save prompt to database when generation starts
    const promptId = await savePromptToDatabase(prompt, 'processing');
    setCurrentPromptId(promptId);
    
    try {
        const response = await fetch("https://manimate-backend.onrender.com/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Backend response:", data);
        
        // Use the full backend URL for the video
        const fullVideoUrl = `https://manimate-backend.onrender.com${data.video_url}`;
        console.log("Constructed video URL:", fullVideoUrl);
        
        // Reset video error state
        setVideoError(null);
        setVideoLoading(true);
        setVideoUrl(fullVideoUrl);
        
        // Update database with successful generation
        if (promptId) {
          await updatePromptInDatabase(promptId, 'completed', fullVideoUrl);
        }
        
        toast({
          title: "Video generated!",
          description: "Your animation is ready to view.",
        });
      } else {
        const errorData = await response.json();
        
        // Update database with failed status
        if (promptId) {
          await updatePromptInDatabase(promptId, 'failed');
        }
        
        throw new Error(errorData.detail || "Generation failed");
      }
    } catch (error) {
      console.error("Generation error:", error);
      
      // Update database with failed status
      if (currentPromptId) {
        await updatePromptInDatabase(currentPromptId, 'failed');
      }
      
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Header - responsive */}
      <header className="relative z-10 p-4 sm:p-6 border-b border-border/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Manimate Studio
          </h1>
          <div className="w-16 sm:w-20" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main content - responsive */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 min-h-[calc(100vh-120px)]">
          {/* Left side - Input */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Describe Your Animation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe your animation idea... For example: 'A 3D visualization of the Pythagorean theorem with animated triangles and mathematical equations'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] sm:min-h-[200px] resize-none text-sm sm:text-base"
                />
                <Button
                  onClick={handleGenerate}
                  variant="glow"
                  size="xl"
                  className="w-full text-sm sm:text-base"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                      <span className="hidden sm:inline">Generating Animation...</span>
                      <span className="sm:hidden">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="hidden sm:inline">Generate Animation</span>
                      <span className="sm:hidden">Generate</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example prompts - responsive */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg font-medium text-muted-foreground">
                  Example Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {[
                  "A visualization of how neural networks learn",
                  "The mathematical beauty of the Fibonacci sequence",
                  "Explaining calculus derivatives with moving graphs",
                  "A 3D tour through the solar system",
                ].map((example, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm"
                    onClick={() => setPrompt(example)}
                  >
                    "{example}"
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right side - Video output - responsive */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 h-full">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Generated Animation
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="rounded-lg bg-muted/50 border border-border/30 min-h-[300px] sm:min-h-[400px] md:h-[400px] lg:h-[500px] flex items-center justify-center relative overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center space-y-4">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-medium">Generating your animation...</p>
                        <p className="text-sm text-muted-foreground">This usually takes 30-60 seconds</p>
                      </div>
                    </div>
                   ) : videoUrl ? (
                    <div className="w-full h-full relative">
                      {videoLoading && !videoError && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                          <div className="text-center space-y-2">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground">Loading video...</p>
                          </div>
                        </div>
                      )}
                      
                      {videoError ? (
                        <div className="text-center space-y-4 p-6">
                          <div className="w-16 h-16 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-destructive" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-medium text-destructive">Video loading failed</p>
                            <p className="text-sm text-muted-foreground">{videoError}</p>
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setVideoError(null);
                                  setVideoLoading(true);
                                  // Force reload the video
                                  const video = document.querySelector('video');
                                  if (video) {
                                    video.load();
                                  }
                                }}
                              >
                                Retry Loading
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  window.open(videoUrl, '_blank');
                                }}
                              >
                                Open in New Tab
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <video
                            src={videoUrl}
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23111827'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23ffffff' font-family='Inter' font-size='18'%3EGenerated Animation%3C/text%3E%3C/svg%3E"
                            style={{ maxHeight: '80vh', width: 'auto', margin: '0 auto', display: 'block' }}
                            onLoadStart={() => {
                              console.log("Video load started for:", videoUrl);
                              setVideoLoading(true);
                              setVideoError(null);
                            }}
                            onCanPlay={() => {
                              console.log("Video can play:", videoUrl);
                              setVideoLoading(false);
                            }}
                            onError={(e) => {
                              console.error("Video error:", e);
                              console.error("Failed video URL:", videoUrl);
                              setVideoLoading(false);
                              setVideoError("Failed to load video. The file might not exist or the server might be unavailable.");
                            }}
                            onLoad={() => {
                              console.log("Video loaded successfully:", videoUrl);
                              setVideoLoading(false);
                            }}
                          />
                          <Button 
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                            size="sm"
                            onClick={() => {
                              const video = document.querySelector('video');
                              if (video) {
                                if (video.requestFullscreen) {
                                  video.requestFullscreen();
                                }
                              }
                            }}
                          >
                            Full Screen
                          </Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted-foreground/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-muted-foreground">No animation yet</p>
                        <p className="text-sm text-muted-foreground">
                          Enter a prompt and click "Generate Animation" to create your video
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;