import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/centros-custo")({ component: Page });

type Centro = { id: number; nome: string; descricao: string; responsavel: string };

const initial: Centro[] = [
  { id: 1, nome: "Operacional", descricao: "Despesas do dia a dia", responsavel: "Rodrigo" },
  { id: 2, nome: "Administrativo", descricao: "Custos administrativos", responsavel: "Eder" },
  { id: 3, nome: "Marketing", descricao: "Captação de clientes", responsavel: "Maria" },
  { id: 4, nome: "Cobrança", descricao: "Equipe de campo", responsavel: "Carlos" },
];

function Page() {
  const crud = useCrud<Centro>({
    initial,
    entityLabel: "Centro de Custo",
    newLabel: "Novo Centro",
    fields: [
      { name: "nome", label: "Nome", required: true, placeholder: "Ex: Operacional" },
      { name: "responsavel", label: "Responsável", required: true, placeholder: "Nome do responsável" },
      { name: "descricao", label: "Descrição", type: "textarea", placeholder: "Descreva o centro de custo" },
    ],
  });

  return (
    <div>
      <PageHeader title="Centros de Custo" subtitle="Organize os custos por departamento ou área." icon={Building2} />
      <DataTable
        data={crud.rows}
        newLabel="Novo Centro"
        exportName="centros-custo"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "id", header: "ID", className: "w-20 font-mono text-muted-foreground" },
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "descricao", header: "Descrição", className: "text-muted-foreground" },
          { key: "responsavel", header: "Responsável" },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
