import { createFileRoute } from "@tanstack/react-router";
import { FileSearch, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/financeiro/conciliacao")({ component: Page });

const data = [
  { id: 1, data: "26/05/2026", desc: "PIX recebido - Teste Maria", valor: 198, sistema: 198, ok: true },
  { id: 2, data: "25/05/2026", desc: "TED - João Silva", valor: 320, sistema: 320, ok: true },
  { id: 3, data: "24/05/2026", desc: "PIX - Ana Costa", valor: 450, sistema: 480, ok: false },
  { id: 4, data: "23/05/2026", desc: "Boleto - Pedro Santos", valor: 200, sistema: 200, ok: true },
];

function Page() {
  return (
    <div>
      <PageHeader title="Conciliação Bancária" subtitle="Compare extratos bancários com lançamentos do sistema." icon={FileSearch} />
      <div className="rounded-2xl border border-border/50 bg-gradient-card overflow-hidden shadow-card">
        <div className="p-4 border-b border-border/50 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">3 conciliados</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span className="text-sm text-warning">1 divergência</span>
          </div>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => toast.info("Selecione um arquivo OFX/CSV", { description: "Recurso de importação em desenvolvimento." })}>Importar extrato</Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-background/30 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-right">Banco</th>
              <th className="px-4 py-3 text-right">Sistema</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} className={`border-b border-border/30 transition-colors ${r.ok ? "hover:bg-success/5" : "bg-destructive/5"}`}>
                <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{r.data}</td>
                <td className="px-4 py-3 text-sm font-medium">{r.desc}</td>
                <td className="px-4 py-3 text-sm font-mono text-right">R$ {r.valor.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm font-mono text-right">R$ {r.sistema.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  {r.ok ? (
                    <CheckCircle2 className="h-4 w-4 text-success inline" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-destructive inline animate-pulse" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
