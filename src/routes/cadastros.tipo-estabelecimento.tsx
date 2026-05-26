import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/tipo-estabelecimento")({ component: Page });

const data = [
  { id: 1, descricao: "Mercado", criadoEm: "21/05/2026" },
  { id: 2, descricao: "Padaria", criadoEm: "21/05/2026" },
  { id: 3, descricao: "Restaurante", criadoEm: "21/05/2026" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Tipos de Estabelecimento" subtitle="Categorize os locais comerciais dos clientes." icon={Store} />
      <DataTable
        data={data}
        newLabel="Novo Tipo"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
          { key: "criadoEm", header: "Criado em", className: "font-mono text-muted-foreground" },
        ]}
      />
    </div>
  );
}
