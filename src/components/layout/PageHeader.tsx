import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface PageHeaderProps {
  showAuth?: boolean;
  showBack?: boolean;
  backLabel?: string;
  backTo?: string;
  centerContent?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  showAuth = false,
  showBack = false,
  backLabel = "Back to Home",
  backTo = "/",
  centerContent,
  className,
}: PageHeaderProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "relative z-20 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5",
        className
      )}
    >
      <div className="flex min-w-[120px] items-center gap-3">
        {showBack ? (
          <Link to={backTo}>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              ← {backLabel}
            </Button>
          </Link>
        ) : (
          <Link to="/" className="group flex items-center gap-3">
            <img
              src="/lovable-uploads/6236e1b9-2a7c-444d-95d5-b8b96e031c3b.png"
              alt="Manimate"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
            />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Manimate
            </span>
          </Link>
        )}
      </div>

      {centerContent && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {centerContent}
        </div>
      )}

      <div className="flex min-w-[120px] justify-end">
        {!loading && (
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {showAuth && (
                  <Link to="/generate">
                    <Button variant="hero" size="sm">
                      Go to Studio
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign out
                </Button>
              </>
            ) : (
              showAuth && (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="hero" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}
