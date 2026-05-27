import { createFileRoute } from "@tanstack/react-router";
import { UserSquare2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/credor-promissoria")({ component: Page });

type Credor = { id: number; nome: string; cpfCnpj: string; cep: string; endereco: string; pagavelEm: string };

function Page() {
  const crud = useCrud<Credor>({
    initial: [],
    entityLabel: "Credor",
    newLabel: "Novo Credor",
    fields: [
      { name: "nome", label: "Nome / Razão Social", required: true, colSpan: 2 },
      { name: "cpfCnpj", label: "CPF / CNPJ", required: true, placeholder: "000.000.000-00" },
      { name: "cep", label: "CEP", placeholder: "00000-000" },
      { name: "endereco", label: "Endereço completo", colSpan: 2 },
      { name: "pagavelEm", label: "Pagável em (cidade)", placeholder: "Ex: Guarulhos/SP" },
    ],
  });

  return (
    <div>
      <PageHeader title="Credor Promissória" subtitle="Cadastro de credores para emissão de promissórias." icon={UserSquare2} />
      <DataTable
        data={crud.rows}
        newLabel="Novo Credor"
        exportName="credores"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "cpfCnpj", header: "CPF/CNPJ", className: "font-mono" },
          { key: "cep", header: "CEP", className: "font-mono" },
          { key: "endereco", header: "Endereço", className: "text-muted-foreground" },
          { key: "pagavelEm", header: "Pagável em" },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
