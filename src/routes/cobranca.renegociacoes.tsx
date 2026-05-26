import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cobranca/renegociacoes")({ component: Page });

const data = [
  { id: 1, contrato: "#1048", cliente: "Pedro Santos", valorOriginal: "R$ 800,00", novoValor: "R$ 950,00", data: "20/05/2026", status: "Aprovada" },
  { id: 2, contrato: "#1042", cliente: "Carlos Mendes", valorOriginal: "R$ 1.500,00", novoValor: "R$ 1.750,00", data: "15/05/2026", status: "Pendente" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Renegociações" subtitle="Histórico de renegociações e propostas em andamento." icon={Repeat} />
      <DataTable
        data={data}
        newLabel="Nova Renegociação"
        onNew={() => {}}
        columns={[
          { key: "contrato", header: "Contrato", className: "font-mono text-muted-foreground" },
          { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
          { key: "valorOriginal", header: "Valor original", className: "font-mono text-muted-foreground line-through" },
          { key: "novoValor", header: "Novo valor", className: "font-mono font-semibold text-primary-glow" },
          { key: "data", header: "Data", className: "font-mono" },
          { key: "status", header: "Status", render: (r) => <Badge variant="outline" className={r.status === "Aprovada" ? "border-success/40 text-success" : "border-warning/40 text-warning"}>{r.status}</Badge> },
        ]}
      />
    </div>
  );
}
