import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { useEmprestimos } from "@/lib/emprestimos-store";
import { useMemo } from "react";

export const Route = createFileRoute("/consultor/informacoes")({ component: Page });

function Page() {
  const lista = useEmprestimos();
  const hoje = new Date().toISOString().slice(0, 10);

  const { diarios, totalDiario, totalCobrado, meta } = useMemo(() => {
    const diarios = lista.filter((e) => e.vencimentos.includes(hoje));
    const totalDiario = diarios.reduce((s, e) => s + e.valorParcela, 0);
    const totalCobrado = 6873.33;
    const meta = 8166.19;
    return { diarios, totalDiario, totalCobrado, meta };
  }, [lista, hoje]);

  const pct = Math.min(100, (totalCobrado / meta) * 100);

  return (
    <MobileShell title="Informações gerais" back="/consultor">
      <h2 className="font-display text-lg mb-2">Análise do dia</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Obs: esta é apenas uma estimativa de total a receber com base nas parcelas que vencem hoje, o consultor poderá receber também parcelas adiantadas.
      </p>

      <div className="rounded-xl border border-border/50 bg-gradient-card p-4 shadow-card space-y-3">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Resultado</div>
        <div className="text-sm space-y-1">
          <Line label="Consultor" value="José /50/D" />
          <Line label="Clientes a cobrar (Diário)" value={String(diarios.length)} />
          <Line label="Total geral a cobrar (Diário)" value={`R$${totalDiario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
          <Line label="Clientes a cobrar (Semanal/Mensal)" value="0" />
          <Line label="Total geral (Semanal/Mensal)" value="R$0,00" />
          <Line label="Qnt cobrados" value="11" />
          <Line label="Total geral cobrado" value={`R$${totalCobrado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
          <Line label="Meta" value={`R$${meta.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
        </div>
        <div className="relative h-3 w-full rounded-full bg-muted/40 overflow-hidden">
          <div
            className="h-full bg-gradient-primary shadow-glow"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right text-sm font-mono font-semibold">{pct.toFixed(2)}%</div>
      </div>

      {diarios.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-base mb-2">Rota do dia</h3>
          <ul className="space-y-2">
            {diarios.map((e) => (
              <li key={e.numero} className="rounded-xl border border-border/50 bg-card/30 p-3">
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
        </div>
      )}
    </MobileShell>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
