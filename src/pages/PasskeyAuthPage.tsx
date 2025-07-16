import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Fingerprint, Shield, Loader2 } from "lucide-react";
import { usePasskeys } from "@/hooks/usePasskeys";

const PasskeyAuthPage = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const { register, authenticate, isLoading, isSupported } = usePasskeys();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !displayName.trim()) return;

    const success = await register(username, displayName);
    if (success) {
      navigate("/generate");
    }
  };

  const handleAuthenticate = async () => {
    const success = await authenticate();
    if (success) {
      navigate("/generate");
    }
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        <div className="absolute top-6 left-6 z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <CardTitle className="text-2xl font-bold">Passkeys Not Supported</CardTitle>
              <CardDescription>
                Your browser doesn't support passkeys. Please use a modern browser like Chrome, Safari, or Firefox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/legacy-auth">
                <Button variant="outline" className="w-full">
                  Use Traditional Login Instead
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Auth container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50">
          <CardHeader className="text-center">
            <Fingerprint className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Secure Passkey Authentication
            </CardTitle>
            <CardDescription>
              Use your device's biometric authentication or security key to sign in securely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-6 mt-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                    <Fingerprint className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Welcome Back!</h3>
                    <p className="text-sm text-muted-foreground">
                      Authenticate using your registered passkey
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAuthenticate}
                  variant="glow" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="h-4 w-4 mr-2" />
                      Sign In with Passkey
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/legacy-auth" className="text-sm text-muted-foreground hover:text-primary">
                    Use email and password instead
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="your-username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your Full Name"
                      required
                    />
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Secure & Private</p>
                        <p className="text-muted-foreground">
                          Your passkey is stored securely on your device and never leaves it. 
                          Use your fingerprint, face, or security key to authenticate.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="glow" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading || !username.trim() || !displayName.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Passkey...
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Create Passkey
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasskeyAuthPage;