import { createFileRoute } from "@tanstack/react-router";
import { UserSquare2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/credor-promissoria")({ component: Page });

const data: Array<{ id: number; nome: string; cpfCnpj: string; cep: string; endereco: string; pagavelEm: string }> = [];

function Page() {
  return (
    <div>
      <PageHeader title="Credor Promissória" subtitle="Cadastro de credores para emissão de promissórias." icon={UserSquare2} />
      <DataTable
        data={data}
        newLabel="Novo Credor"
        onNew={() => {}}
        columns={[
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "cpfCnpj", header: "CPF/CNPJ", className: "font-mono" },
          { key: "cep", header: "CEP", className: "font-mono" },
          { key: "endereco", header: "Endereço", className: "text-muted-foreground" },
          { key: "pagavelEm", header: "Pagável em" },
        ]}
      />
    </div>
  );
}
