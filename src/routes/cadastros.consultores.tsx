import { createFileRoute } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/consultores")({ component: Page });

const data = [
  { id: 1, nome: "Rodrigo", clientes: 24, emprestimos: 18, ativo: true },
  { id: 2, nome: "Eder", clientes: 19, emprestimos: 14, ativo: true },
  { id: 3, nome: "Maria", clientes: 12, emprestimos: 9, ativo: true },
  { id: 4, nome: "Carlos", clientes: 8, emprestimos: 5, ativo: false },
];

function Page() {
  return (
    <div>
      <PageHeader title="Consultores" subtitle="Gerencie sua equipe de consultores de cobrança." icon={UserCheck} />
      <DataTable
        data={data}
        newLabel="Novo Consultor"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          {
            key: "nome",
            header: "Consultor",
            render: (r) => (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {r.nome[0]}
                </div>
                <span className="font-medium">{r.nome}</span>
              </div>
            ),
          },
          { key: "clientes", header: "Clientes", render: (r) => <span className="font-mono">{r.clientes}</span> },
          { key: "emprestimos", header: "Empréstimos ativos", render: (r) => <span className="font-mono">{r.emprestimos}</span> },
          {
            key: "ativo",
            header: "Status",
            render: (r) => (
              <span className={`inline-flex items-center gap-1.5 text-xs ${r.ativo ? "text-success" : "text-muted-foreground"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.ativo ? "bg-success" : "bg-muted-foreground"}`} />
                {r.ativo ? "Ativo" : "Inativo"}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
