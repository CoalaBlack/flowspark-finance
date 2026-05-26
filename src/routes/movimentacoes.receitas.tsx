import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { TrendingUp, Wallet, Calendar } from "lucide-react";

export const Route = createFileRoute("/movimentacoes/receitas")({ component: Page });

const data = [
  { id: 1, data: "26/05/2026", descricao: "Pagamento empréstimo #1052", categoria: "Empréstimo", valor: "R$ 198,00", conta: "Banco Rodrigo", status: "Confirmado" },
  { id: 2, data: "25/05/2026", descricao: "Juros mensais", categoria: "Juros", valor: "R$ 450,00", conta: "Banco Eder", status: "Confirmado" },
  { id: 3, data: "24/05/2026", descricao: "Multa por atraso", categoria: "Multas", valor: "R$ 85,00", conta: "Banco Rodrigo", status: "Pendente" },
  { id: 4, data: "23/05/2026", descricao: "Pagamento parcela 3/12", categoria: "Empréstimo", valor: "R$ 320,00", conta: "Caixa", status: "Confirmado" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Receitas" subtitle="Todas as entradas financeiras do período." icon={ArrowDownToLine} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total no Mês" value="R$ 58.900,00" delta={{ value: "+11,5%", positive: true }} icon={TrendingUp} accent="success" />
        <StatCard label="Recebido Hoje" value="R$ 1.053,00" icon={Wallet} accent="primary" hint="4 movimentações" />
        <StatCard label="Previsto" value="R$ 12.420,00" icon={Calendar} accent="info" hint="Próximos 7 dias" />
      </div>
      <DataTable
        data={data}
        newLabel="Nova Receita"
        onNew={() => {}}
        columns={[
          { key: "data", header: "Data", className: "font-mono text-muted-foreground w-28" },
          { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
          { key: "categoria", header: "Categoria", render: (r) => <Badge variant="outline" className="border-primary/30 text-primary-glow">{r.categoria}</Badge> },
          { key: "conta", header: "Conta", className: "text-muted-foreground" },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold text-success">{r.valor}</span> },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <span className={`inline-flex items-center gap-1.5 text-xs ${r.status === "Confirmado" ? "text-success" : "text-warning"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.status === "Confirmado" ? "bg-success" : "bg-warning animate-pulse"}`} />
                {r.status}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
