import type { ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileShell({
  children,
  title,
  back,
  showFooter = true,
}: {
  children: ReactNode;
  title?: string;
  back?: string;
  showFooter?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="mx-auto min-h-screen w-full max-w-md flex flex-col bg-background relative">
      {/* topbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/50 bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="font-display text-lg font-bold">
            <span className="text-primary-glow">Get</span>
            <span className="text-foreground/80">Controller</span>
          </div>
        </div>
        {back && (
          <Link
            to={back}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </header>

      {title && (
        <div className="px-4 pt-4">
          <h1 className="text-center font-display text-2xl font-semibold tracking-tight">
            {title}
          </h1>
        </div>
      )}

      <main className="flex-1 px-4 py-4 pb-28">{children}</main>

      {showFooter && (
        <footer className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t border-border/50 bg-gradient-primary/95 backdrop-blur">
          <Button
            variant="ghost"
            onClick={() => router.history.back()}
            className="h-14 w-full rounded-none text-primary-foreground hover:bg-white/10 text-base font-medium"
          >
            Voltar
          </Button>
        </footer>
      )}
    </div>
  );
}

export function HomeShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md flex flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/50 bg-background/95 backdrop-blur px-5 py-4">
        <div>
          <div className="font-display text-xl font-bold">
            <span className="text-primary-glow">Get</span>
            <span className="text-foreground/80">Controller</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Olá, José /50/d!</p>
        </div>
        <Link
          to="/"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs text-muted-foreground hover:bg-muted/40"
        >
          <LogOut className="h-3.5 w-3.5" /> Sair
        </Link>
      </header>
      <main className="flex-1 px-4 py-4">{children}</main>
    </div>
  );
}
