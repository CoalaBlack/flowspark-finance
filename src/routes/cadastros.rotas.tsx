import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/rotas")({ component: Page });

const data = [
  { id: 1, nome: "Rota Centro", consultor: "Rodrigo", clientes: 24, valor: "R$ 1.398,00" },
  { id: 2, nome: "Rota Norte", consultor: "Eder", clientes: 19, valor: "R$ 980,00" },
  { id: 3, nome: "Rota Sul", consultor: "Maria", clientes: 12, valor: "R$ 720,00" },
  { id: 4, nome: "Rota Leste", consultor: "Carlos", clientes: 8, valor: "R$ 450,00" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Rotas" subtitle="Rotas de cobrança organizadas por consultor." icon={RouteIcon} />
      <DataTable
        data={data}
        newLabel="Nova Rota"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "nome", header: "Rota", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "consultor", header: "Consultor" },
          { key: "clientes", header: "Clientes", className: "font-mono" },
          { key: "valor", header: "Total a receber", render: (r) => <span className="font-mono font-semibold text-primary-glow">{r.valor}</span> },
        ]}
      />
    </div>
  );
}
