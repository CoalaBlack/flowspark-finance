import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  actions,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-card p-6 mb-6 animate-fade-in",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-60 pointer-events-none" />
      <div className="relative flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </div>
  );
}
