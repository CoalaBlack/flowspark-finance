import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Phone, RotateCcw } from "lucide-react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { useEmprestimos } from "@/lib/emprestimos-store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/consultor/rota")({ component: Page });

const STORAGE_KEY = "gc.rota.visitados.v1";

function loadVisitados(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveVisitados(v: Record<string, number[]>) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

function Page() {
  const lista = useEmprestimos();
  const hoje = new Date().toISOString().slice(0, 10);
  const doDia = useMemo(() => lista.filter((e) => e.vencimentos.includes(hoje)), [lista, hoje]);

  const [visitados, setVisitados] = useState<number[]>([]);
  useEffect(() => { setVisitados(loadVisitados()[hoje] ?? []); }, [hoje]);

  const persist = (next: number[]) => {
    const all = loadVisitados();
    all[hoje] = next;
    saveVisitados(all);
    setVisitados(next);
  };

  const toggle = (numero: number) => {
    persist(visitados.includes(numero) ? visitados.filter((n) => n !== numero) : [...visitados, numero]);
  };
  const resetar = () => persist([]);

  const total = doDia.reduce((s, e) => s + e.valorParcela, 0);
  const recebido = doDia.filter((e) => visitados.includes(e.numero)).reduce((s, e) => s + e.valorParcela, 0);
  const concluidos = doDia.filter((e) => visitados.includes(e.numero)).length;
  const pct = doDia.length ? Math.round((concluidos / doDia.length) * 100) : 0;

  return (
    <MobileShell title="Rota Cobrança" back="/consultor">
      {/* Card de progresso */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-card p-4 mb-4 shadow-elegant">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Progresso da rota</div>
            <div className="font-display text-3xl font-bold text-gradient mt-1">{pct}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{concluidos}/{doDia.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">visitas</div>
          </div>
        </div>
        <Progress value={pct} className="h-2.5 mt-3" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-xl bg-background/40 border border-border/40 p-2.5">
            <div className="text-[10px] uppercase text-muted-foreground">Recebido</div>
            <div className="font-mono text-sm font-semibold text-emerald-400">
              R${recebido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="rounded-xl bg-background/40 border border-border/40 p-2.5">
            <div className="text-[10px] uppercase text-muted-foreground">A receber</div>
            <div className="font-mono text-sm font-semibold text-primary-glow">
              R${(total - recebido).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        {visitados.length > 0 && (
          <Button variant="ghost" size="sm" className="w-full mt-3 h-8 text-xs" onClick={resetar}>
            <RotateCcw className="h-3 w-3 mr-1.5" /> Reiniciar rota
          </Button>
        )}
      </div>

      {doDia.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
          Nenhuma cobrança para hoje.
        </div>
      ) : (
        <ul className="space-y-2">
          {doDia.map((e, idx) => {
            const feito = visitados.includes(e.numero);
            return (
              <li
                key={e.numero}
                className={`rounded-xl border p-3 shadow-card transition ${
                  feito
                    ? "border-emerald-500/30 bg-emerald-500/5 opacity-70"
                    : "border-border/50 bg-gradient-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(e.numero)}
                    className={`mt-0.5 h-7 w-7 shrink-0 rounded-full border-2 flex items-center justify-center transition active:scale-90 ${
                      feito
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-border bg-background/40 text-muted-foreground"
                    }`}
                    aria-label={feito ? "Desmarcar visita" : "Marcar como visitado"}
                  >
                    {feito ? <Check className="h-4 w-4" /> : <span className="text-xs font-semibold">{idx + 1}</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className={`font-semibold truncate ${feito ? "line-through" : ""}`}>{e.cliente}</div>
                      <div className="font-mono text-primary-glow font-semibold shrink-0">
                        R${e.valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Nº{e.numero} • {e.opcaoCobranca}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/40 border border-border/40 text-[11px] text-muted-foreground hover:text-foreground">
                        <MapPin className="h-3 w-3" /> Mapa
                      </button>
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/40 border border-border/40 text-[11px] text-muted-foreground hover:text-foreground">
                        <Phone className="h-3 w-3" /> Ligar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </MobileShell>
  );
}
