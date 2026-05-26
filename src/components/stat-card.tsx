import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "primary",
  hint,
}: {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "success" | "warning" | "destructive" | "info";
  hint?: string;
}) {
  const accentMap: Record<string, string> = {
    primary: "from-primary/30 to-primary-glow/20 text-primary-glow",
    success: "from-success/30 to-success/10 text-success",
    warning: "from-warning/30 to-warning/10 text-warning",
    destructive: "from-destructive/30 to-destructive/10 text-destructive",
    info: "from-info/30 to-info/10 text-info",
  };
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant hover:border-primary/40">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-2 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="font-display text-3xl font-bold tracking-tight truncate">{value}</p>
          {(delta || hint) && (
            <div className="flex items-center gap-2 text-xs">
              {delta && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                    delta.positive
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive",
                  )}
                >
                  {delta.positive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {delta.value}
                </span>
              )}
              {hint && <span className="text-muted-foreground">{hint}</span>}
            </div>
          )}
        </div>
        <div
          className={cn(
            "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
            accentMap[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
