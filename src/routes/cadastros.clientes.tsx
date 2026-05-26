import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cadastros/clientes")({ component: Page });

const data = [
  { id: 1, nome: "Teste Maria", cpf: "123.456.789-00", telefone: "(11) 98765-4321", rota: "Rodrigo", status: "Ativo" },
  { id: 2, nome: "João Silva", cpf: "234.567.890-11", telefone: "(11) 97654-3210", rota: "Eder", status: "Ativo" },
  { id: 3, nome: "Ana Costa", cpf: "345.678.901-22", telefone: "(11) 96543-2109", rota: "Maria", status: "Ativo" },
  { id: 4, nome: "Pedro Santos", cpf: "456.789.012-33", telefone: "(11) 95432-1098", rota: "Rodrigo", status: "Inadimplente" },
  { id: 5, nome: "Carla Oliveira", cpf: "567.890.123-44", telefone: "(11) 94321-0987", rota: "Carlos", status: "Ativo" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Clientes" subtitle="Cadastro completo de clientes da sua carteira." icon={Users} />
      <DataTable
        data={data}
        newLabel="Novo Cliente"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          {
            key: "nome",
            header: "Nome",
            render: (r) => (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                  {r.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-medium">{r.nome}</p>
                  <p className="text-xs text-muted-foreground font-mono">{r.cpf}</p>
                </div>
              </div>
            ),
          },
          { key: "telefone", header: "Telefone", className: "font-mono text-muted-foreground" },
          { key: "rota", header: "Rota" },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <Badge variant="outline" className={r.status === "Ativo" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
                {r.status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}
