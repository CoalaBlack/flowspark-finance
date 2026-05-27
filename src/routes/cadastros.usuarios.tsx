import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/usuarios")({ component: Page });

type Usuario = { id: number; nome: string; email: string; senha?: string; perfil?: string; criadoEm: string };

const initial: Usuario[] = [
  { id: 1, nome: "Douglas", email: "douglas.pacheco@live.com", perfil: "Administrador", criadoEm: "21/05/2026" },
  { id: 2, nome: "Suporte", email: "suporte@ddti.com.br", perfil: "Suporte", criadoEm: "21/05/2026" },
];

function Page() {
  const today = new Date().toLocaleDateString("pt-BR");
  const crud = useCrud<Usuario>({
    initial,
    entityLabel: "Usuário",
    newLabel: "Novo Usuário",
    fields: [
      { name: "nome", label: "Nome", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "perfil", label: "Perfil", type: "select", options: ["Administrador", "Consultor", "Suporte", "Financeiro"], required: true },
      { name: "senha", label: "Senha", type: "password", placeholder: "••••••••" },
    ],
    defaults: () => ({ criadoEm: today, perfil: "Consultor" }),
  });

  return (
    <div>
      <PageHeader title="Usuários" subtitle="Controle de acesso ao sistema." icon={UserCog} />
      <DataTable
        data={crud.rows}
        newLabel="Novo Usuário"
        exportName="usuarios"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
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
          { key: "perfil", header: "Perfil" },
          { key: "criadoEm", header: "Criado em", className: "font-mono text-muted-foreground" },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
