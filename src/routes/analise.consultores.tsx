import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analise/consultores")({ component: Page });

const consultores = [
  {
    nome: "Rodrigo",
    geral: { qnt: 2, total: "R$ 1.200,00", esperado: "R$ 1.596,00", recebido: "R$ 99,00", aReceber: "R$ 1.497,00" },
    andamento: { qnt: 2, total: "R$ 1.200,00", esperado: "R$ 1.596,00", recebido: "R$ 99,00", aReceber: "R$ 1.497,00" },
  },
  {
    nome: "Eder",
    geral: { qnt: 4, total: "R$ 4.800,00", esperado: "R$ 6.240,00", recebido: "R$ 1.560,00", aReceber: "R$ 4.680,00" },
    andamento: { qnt: 3, total: "R$ 3.600,00", esperado: "R$ 4.680,00", recebido: "R$ 1.560,00", aReceber: "R$ 3.120,00" },
  },
];

function Page() {
  return (
    <div>
      <PageHeader title="Análise de Consultores" subtitle="Performance individual e comparativos." icon={UserCheck} />

      <div className="flex flex-wrap gap-2 mb-6">
        {["Comparativo Recebimentos", "Empréstimos Finalizados", "Análise de Multas", "Auditoria de Fechamentos"].map((t) => (
          <Button key={t} variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">{t}</Button>
        ))}
      </div>

      <div className="space-y-6">
        {consultores.map((c) => (
          <div key={c.nome} className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card animate-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground shadow-glow">
                {c.nome[0]}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{c.nome}</h3>
                <p className="text-xs text-muted-foreground">Análise consolidada</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnalysisBlock title="Empréstimos em geral" data={c.geral} />
              <AnalysisBlock title="Empréstimos em andamento" data={c.andamento} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisBlock({
  title,
  data,
}: {
  title: string;
  data: { qnt: number; total: string; esperado: string; recebido: string; aReceber: string };
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-primary-glow" />
        <h4 className="font-display font-semibold">{title}</h4>
      </div>
      <dl className="space-y-2 text-sm">
        <Row label="Quantidade gerada" value={String(data.qnt)} />
        <Row label="Total emprestado" value={data.total} />
        <Row label="Total esperado" value={data.esperado} accent="text-success" />
        <Row label="Total recebido" value={data.recebido} accent="text-info" />
        <Row label="Total a receber" value={data.aReceber} accent="text-primary-glow" strong />
      </dl>
    </div>
  );
}

function Row({ label, value, accent, strong }: { label: string; value: string; accent?: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/20 pb-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono ${strong ? "font-bold text-base" : ""} ${accent ?? ""}`}>{value}</span>
    </div>
  );
}
