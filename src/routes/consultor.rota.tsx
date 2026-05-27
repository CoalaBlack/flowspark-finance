import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { useEmprestimos } from "@/lib/emprestimos-store";

export const Route = createFileRoute("/consultor/rota")({ component: Page });

function Page() {
  const lista = useEmprestimos();
  const hoje = new Date().toISOString().slice(0, 10);
  const doDia = lista.filter((e) => e.vencimentos.includes(hoje));
  const total = doDia.reduce((s, e) => s + e.valorParcela, 0);

  return (
    <MobileShell title="Rota Cobrança" back="/consultor">
      <div className="rounded-xl border border-primary/30 bg-gradient-card p-4 mb-4 shadow-elegant">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Total a cobrar hoje</div>
        <div className="font-display text-3xl font-bold text-gradient">
          R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-muted-foreground">{doDia.length} cliente(s) na rota</div>
      </div>

      {doDia.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
          Nenhuma cobrança para hoje.
        </div>
      ) : (
        <ul className="space-y-2">
          {doDia.map((e) => (
            <li key={e.numero} className="rounded-xl border border-border/50 bg-gradient-card p-3 shadow-card">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{e.cliente}</div>
                  <div className="text-xs text-muted-foreground">Nº{e.numero} • {e.opcaoCobranca}</div>
                </div>
                <div className="font-mono text-primary-glow font-semibold">
                  R${e.valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </MobileShell>
  );
}
