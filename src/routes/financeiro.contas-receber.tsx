import { createFileRoute } from "@tanstack/react-router";
import { PiggyBank } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/financeiro/contas-receber")({ component: Page });

const data = [
  { id: 1, cliente: "Teste Maria", descricao: "Empréstimo #1052", vencimento: "30/05/2026", valor: "R$ 198,00", status: "A vencer" },
  { id: 2, cliente: "João Silva", descricao: "Parcela 3/12", vencimento: "28/05/2026", valor: "R$ 320,00", status: "A vencer" },
  { id: 3, cliente: "Pedro Santos", descricao: "Empréstimo #1048", vencimento: "20/05/2026", valor: "R$ 450,00", status: "Atrasado" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Contas a Receber" subtitle="Valores que entrarão no caixa." icon={PiggyBank} />
      <DataTable
        data={data}
        columns={[
          { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
          { key: "descricao", header: "Descrição", className: "text-muted-foreground" },
          { key: "vencimento", header: "Vencimento", className: "font-mono" },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold text-success">{r.valor}</span> },
          { key: "status", header: "Status", render: (r) => <Badge variant="outline" className={r.status === "Atrasado" ? "border-destructive/40 text-destructive" : "border-info/40 text-info"}>{r.status}</Badge> },
        ]}
      />
    </div>
  );
}
