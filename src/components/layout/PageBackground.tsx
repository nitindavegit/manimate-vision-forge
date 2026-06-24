import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  className?: string;
  intensity?: "subtle" | "default" | "vivid";
}

export function PageBackground({ className, intensity = "default" }: PageBackgroundProps) {
  const orbOpacity = {
    subtle: "opacity-30",
    default: "opacity-50",
    vivid: "opacity-70",
  }[intensity];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-background" />
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.35]"
        style={{ backgroundSize: "var(--grid-size) var(--grid-size)" }}
      />
      <div className="absolute inset-0 noise-overlay" />

      <div
        className={cn(
          "absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[120px]",
          orbOpacity
        )}
      />
      <div
        className={cn(
          "absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]",
          orbOpacity
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/5 blur-[80px]",
          orbOpacity
        )}
      />
    </div>
  );
}
