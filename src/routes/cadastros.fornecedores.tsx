import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/fornecedores")({ component: Page });

const data = [
  { id: 1, nome: "Diversos", fone: "(11) 9999-9999", celular: "(11) 99999-9999", cpfCnpj: "12.345.678/0001-91", email: "não informado" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Fornecedores" subtitle="Cadastro de fornecedores para contas a pagar." icon={Truck} />
      <DataTable
        data={data}
        newLabel="Novo Fornecedor"
        onNew={() => {}}
        columns={[
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "fone", header: "Fone", className: "font-mono text-muted-foreground" },
          { key: "celular", header: "Celular", className: "font-mono text-muted-foreground" },
          { key: "cpfCnpj", header: "CPF / CNPJ", className: "font-mono" },
          { key: "email", header: "Email", className: "text-muted-foreground" },
        ]}
      />
    </div>
  );
}
