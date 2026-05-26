import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/usuarios")({ component: Page });

const data = [
  { id: 1, nome: "Douglas", email: "douglas.pacheco@live.com", criadoEm: "21/05/2026" },
  { id: 2, nome: "Suporte", email: "suporte@ddti.com.br", criadoEm: "21/05/2026" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Usuários" subtitle="Controle de acesso ao sistema." icon={UserCog} />
      <DataTable
        data={data}
        newLabel="Novo Usuário"
        onNew={() => {}}
        columns={[
          {
            key: "nome",
            header: "Nome",
            render: (r) => (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {r.nome[0]}
                </div>
                <span className="font-medium">{r.nome}</span>
              </div>
            ),
          },
          { key: "email", header: "Email", className: "font-mono text-muted-foreground" },
          { key: "criadoEm", header: "Criado em", className: "font-mono text-muted-foreground" },
        ]}
      />
    </div>
  );
}
