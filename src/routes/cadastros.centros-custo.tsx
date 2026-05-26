import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/centros-custo")({ component: Page });

const data = [
  { id: 1, nome: "Operacional", descricao: "Despesas do dia a dia", responsavel: "Rodrigo" },
  { id: 2, nome: "Administrativo", descricao: "Custos administrativos", responsavel: "Eder" },
  { id: 3, nome: "Marketing", descricao: "Captação de clientes", responsavel: "Maria" },
  { id: 4, nome: "Cobrança", descricao: "Equipe de campo", responsavel: "Carlos" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Centros de Custo" subtitle="Organize os custos por departamento ou área." icon={Building2} />
      <DataTable
        data={data}
        newLabel="Novo Centro"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-20 font-mono text-muted-foreground" },
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "descricao", header: "Descrição", className: "text-muted-foreground" },
          { key: "responsavel", header: "Responsável" },
        ]}
      />
    </div>
  );
}
