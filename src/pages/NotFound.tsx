import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageBackground } from "@/components/layout/PageBackground";
import { PageHeader } from "@/components/layout/PageHeader";

const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground intensity="subtle" />
      <PageHeader showBack backLabel="Home" />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="glass-card max-w-md p-10 text-center">
          <p className="font-display text-7xl font-bold text-gradient">404</p>
          <h1 className="mt-4 font-display text-xl font-semibold">Page not found</h1>
          <p className="mt-2 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="mt-8 inline-block">
            <Button variant="hero">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
