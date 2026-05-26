import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpFromLine, TrendingDown, Wallet, Calendar } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";

export const Route = createFileRoute("/movimentacoes/despesas")({ component: Page });

const data = [
  { id: 1, data: "26/05/2026", descricao: "Combustível", categoria: "Operacional", valor: "R$ 320,00", conta: "Banco Rodrigo" },
  { id: 2, data: "25/05/2026", descricao: "Salário Consultor", categoria: "Salários", valor: "R$ 2.500,00", conta: "Banco Eder" },
  { id: 3, data: "20/05/2026", descricao: "Aluguel escritório", categoria: "Aluguel", valor: "R$ 1.800,00", conta: "Caixa" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Despesas" subtitle="Todas as saídas financeiras do período." icon={ArrowUpFromLine} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total no Mês" value="R$ 27.100,00" delta={{ value: "+4,8%", positive: false }} icon={TrendingDown} accent="destructive" />
        <StatCard label="Pago Hoje" value="R$ 320,00" icon={Wallet} accent="warning" hint="1 movimentação" />
        <StatCard label="A Pagar" value="R$ 8.150,00" icon={Calendar} accent="info" hint="Próximos 7 dias" />
      </div>
      <DataTable
        data={data}
        newLabel="Nova Despesa"
        onNew={() => {}}
        columns={[
          { key: "data", header: "Data", className: "font-mono text-muted-foreground w-28" },
          { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
          { key: "categoria", header: "Categoria", render: (r) => <Badge variant="outline" className="border-destructive/30 text-destructive">{r.categoria}</Badge> },
          { key: "conta", header: "Conta", className: "text-muted-foreground" },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold text-destructive">{r.valor}</span> },
        ]}
      />
    </div>
  );
}
