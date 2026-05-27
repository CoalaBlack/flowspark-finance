import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { useEmprestimos } from "@/lib/emprestimos-store";

export const Route = createFileRoute("/consultor/consultar")({ component: Page });

function Page() {
  const lista = useEmprestimos();
  return (
    <MobileShell title="Consultar" back="/consultor">
      {lista.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
          Nenhum empréstimo cadastrado.
        </div>
      ) : (
        <ul className="space-y-2">
          {lista.map((e) => (
            <li key={e.numero} className="rounded-xl border border-border/50 bg-gradient-card p-3 shadow-card">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Nº{e.numero}</div>
                  <div className="font-semibold">{e.cliente}</div>
                  <div className="text-xs text-muted-foreground">{e.parcelas} parcelas • {e.opcaoCobranca}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">R${e.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                  <div className="text-xs text-success font-mono">Total R${e.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </MobileShell>
  );
}
