import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/fornecedores")({ component: Page });

type Fornecedor = { id: number; nome: string; fone: string; celular: string; cpfCnpj: string; email: string };

const initial: Fornecedor[] = [
  { id: 1, nome: "Diversos", fone: "(11) 9999-9999", celular: "(11) 99999-9999", cpfCnpj: "12.345.678/0001-91", email: "" },
];

function Page() {
  const crud = useCrud<Fornecedor>({
    initial,
    entityLabel: "Fornecedor",
    newLabel: "Novo Fornecedor",
    fields: [
      { name: "nome", label: "Nome / Razão Social", required: true, colSpan: 2 },
      { name: "cpfCnpj", label: "CPF / CNPJ", placeholder: "00.000.000/0000-00" },
      { name: "email", label: "Email", type: "email", placeholder: "email@empresa.com" },
      { name: "fone", label: "Telefone", type: "tel", placeholder: "(00) 0000-0000" },
      { name: "celular", label: "Celular", type: "tel", placeholder: "(00) 00000-0000" },
    ],
  });

  return (
    <div>
      <PageHeader title="Fornecedores" subtitle="Cadastro de fornecedores para contas a pagar." icon={Truck} />
      <DataTable
        data={crud.rows}
        newLabel="Novo Fornecedor"
        exportName="fornecedores"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "fone", header: "Fone", className: "font-mono text-muted-foreground" },
          { key: "celular", header: "Celular", className: "font-mono text-muted-foreground" },
          { key: "cpfCnpj", header: "CPF / CNPJ", className: "font-mono" },
          { key: "email", header: "Email", render: (r) => <span className="text-muted-foreground">{r.email || "não informado"}</span> },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
