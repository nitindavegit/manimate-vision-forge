import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Play, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your animation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Replace with your actual FastAPI backend URL
      const response = await fetch("http://localhost:8000/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideoUrl(data.video_url);
        toast({
          title: "Video generated!",
          description: "Your animation is ready to view.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Generation failed");
      }
    } catch (error) {
      console.error("Generation error:", error);
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
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Manimate Studio
          </h1>
          <div className="w-20" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-120px)]">
          {/* Left side - Input */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Describe Your Animation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe your animation idea... For example: 'A 3D visualization of the Pythagorean theorem with animated triangles and mathematical equations'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <Button
                  onClick={handleGenerate}
                  variant="glow"
                  size="xl"
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Animation...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Generate Animation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example prompts */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-muted-foreground">
                  Example Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => setPrompt(example)}
                  >
                    "{example}"
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right side - Video output */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  Generated Animation
                  {videoUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="rounded-lg bg-muted/50 border border-border/30 min-h-[50vh] md:h-[400px] flex items-center justify-center relative overflow-hidden">
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
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23111827'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23ffffff' font-family='Inter' font-size='18'%3EGenerated Animation%3C/text%3E%3C/svg%3E"
                        style={{ maxHeight: '80vh', width: 'auto', margin: '0 auto', display: 'block' }}
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