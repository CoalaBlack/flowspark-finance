import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Bell, Search, Settings } from "lucide-react";
import { toast } from "sonner";

import appCss from "../styles.css?url";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { PerfTracker, PerfOverlay } from "@/components/perf-tracker";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-display font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página solicitada não existe.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GetController — Gestão de Cobranças" },
      { name: "description", content: "Sistema profissional de gestão de cobranças e empréstimos" },
      { property: "og:title", content: "GetController — Gestão de Cobranças" },
      { name: "twitter:title", content: "GetController — Gestão de Cobranças" },
      { property: "og:description", content: "Sistema profissional de gestão de cobranças e empréstimos" },
      { name: "twitter:description", content: "Sistema profissional de gestão de cobranças e empréstimos" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69e36701-fd10-40cb-b6ee-a37b76951e52/id-preview-2ceaf56c--7d26ac49-7fb3-494e-ab86-07d2d72964e7.lovable.app-1779830589004.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69e36701-fd10-40cb-b6ee-a37b76951e52/id-preview-2ceaf56c--7d26ac49-7fb3-494e-ab86-07d2d72964e7.lovable.app-1779830589004.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Figtree:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isConsultorApp = pathname.startsWith("/consultor");

  if (isConsultorApp) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Outlet />
        </div>
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-30 h-16 flex items-center gap-3 border-b border-border/50 glass px-4">
              <SidebarTrigger className="text-foreground" />
              <div className="hidden md:flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-1.5 min-w-[280px] border border-border/40">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Buscar cliente, empréstimo, consultor..."
                  className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const v = (e.target as HTMLInputElement).value;
                      toast.info("Buscando...", { description: v || "Digite um termo" });
                    }
                  }}
                />
                <kbd className="text-[10px] text-muted-foreground border border-border/60 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
              <div className="flex-1" />
              <Link
                to="/consultor"
                className="hidden sm:inline-flex h-9 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold text-primary-glow hover:bg-primary/20 transition-colors"
              >
                📱 App Consultor
              </Link>
              <button
                onClick={() => toast.info("Notificações", { description: "Você não tem novas notificações." })}
                className="relative h-9 w-9 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
                aria-label="Notificações"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
              </button>
              <button
                onClick={() => navigate({ to: "/cadastros/usuarios" })}
                className="h-9 w-9 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
                aria-label="Configurações"
              >
                <Settings className="h-4 w-4" />
              </button>
              <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow">
                AD
              </div>
            </header>

            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
