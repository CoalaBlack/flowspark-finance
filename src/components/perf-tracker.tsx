import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { Activity, X, Trash2 } from "lucide-react";

export type PerfEntry = {
  path: string;
  startedAt: number;
  duration: number; // ms
  navMs: number; // navigation roundtrip
  domReady: number; // ms from start to first paint after route load
};

const KEY = "gc.perf.log.v1";
const MAX = 50;

function read(): PerfEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

let cache: PerfEntry[] = read();
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}
function persist() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cache));
}

export const perfStore = {
  getAll: () => cache,
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  push: (entry: PerfEntry) => {
    cache = [entry, ...cache].slice(0, MAX);
    persist();
    emit();
    // also log to console for devtools
    console.info(
      `%c[perf] ${entry.path}%c nav=${entry.navMs.toFixed(0)}ms render=${entry.domReady.toFixed(0)}ms total=${entry.duration.toFixed(0)}ms`,
      "color:#a78bfa;font-weight:bold",
      "color:inherit",
    );
  },
  clear: () => {
    cache = [];
    persist();
    emit();
  },
};

export function usePerfLog() {
  return useSyncExternalStore(perfStore.subscribe, perfStore.getAll, () => [] as PerfEntry[]);
}

/** Hook into the router and measure each navigation. */
export function PerfTracker() {
  const router = useRouter();
  const navStart = useRef<{ path: string; t: number } | null>(null);

  useEffect(() => {
    const unsubBefore = router.subscribe("onBeforeNavigate", (evt) => {
      const to = evt.toLocation?.pathname ?? "";
      navStart.current = { path: to, t: performance.now() };
    });
    const unsubResolved = router.subscribe("onResolved", (evt) => {
      const start = navStart.current;
      if (!start) return;
      const path = evt.toLocation?.pathname ?? start.path;
      const navMs = performance.now() - start.t;
      const paintStart = performance.now();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const domReady = performance.now() - paintStart;
          perfStore.push({
            path,
            startedAt: Date.now(),
            navMs,
            domReady,
            duration: navMs + domReady,
          });
        });
      });
      navStart.current = null;
    });
    return () => {
      unsubBefore();
      unsubResolved();
    };
  }, [router]);

  return null;
}

/** Floating overlay button — toggles a perf log panel. */
export function PerfOverlay() {
  const entries = usePerfLog();
  const [open, setOpen] = useState(false);

  const avg =
    entries.length > 0
      ? entries.reduce((s, e) => s + e.duration, 0) / entries.length
      : 0;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 h-11 px-3 rounded-full bg-background/90 backdrop-blur border border-primary/40 shadow-glow flex items-center gap-2 text-xs font-mono hover:bg-primary/20 transition"
        title="Métricas de performance"
      >
        <Activity className="h-4 w-4 text-primary-glow" />
        <span className="text-foreground/80">
          {entries[0] ? `${entries[0].duration.toFixed(0)}ms` : "perf"}
        </span>
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[min(420px,calc(100vw-2rem))] max-h-[70vh] flex flex-col rounded-2xl border border-border/60 bg-background/95 backdrop-blur shadow-elegant overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div>
              <div className="font-display font-semibold text-sm">Performance por rota</div>
              <div className="text-[10px] text-muted-foreground font-mono">
                {entries.length} registros • média {avg.toFixed(0)}ms
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={perfStore.clear}
                className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-muted/50"
                title="Limpar"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-muted/50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto">
            {entries.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                Navegue entre páginas para coletar métricas.
              </div>
            ) : (
              <table className="w-full text-[11px] font-mono">
                <thead className="bg-muted/30 text-muted-foreground uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="text-left px-3 py-2">Rota</th>
                    <th className="text-right px-3 py-2">Nav</th>
                    <th className="text-right px-3 py-2">Render</th>
                    <th className="text-right px-3 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => {
                    const color =
                      e.duration < 100 ? "text-success" : e.duration < 400 ? "text-primary-glow" : "text-destructive";
                    return (
                      <tr key={i} className="border-t border-border/30">
                        <td className="px-3 py-1.5 truncate max-w-[160px]" title={e.path}>{e.path}</td>
                        <td className="px-3 py-1.5 text-right">{e.navMs.toFixed(0)}</td>
                        <td className="px-3 py-1.5 text-right">{e.domReady.toFixed(0)}</td>
                        <td className={`px-3 py-1.5 text-right font-bold ${color}`}>{e.duration.toFixed(0)}ms</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
