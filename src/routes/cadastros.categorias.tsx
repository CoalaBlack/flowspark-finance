import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cadastros/categorias")({ component: Page });

const data = [
  { id: 1, nome: "Empréstimo", tipo: "Receita", status: "Ativo" },
  { id: 2, nome: "Juros", tipo: "Receita", status: "Ativo" },
  { id: 3, nome: "Multas", tipo: "Receita", status: "Ativo" },
  { id: 4, nome: "Combustível", tipo: "Despesa", status: "Ativo" },
  { id: 5, nome: "Salários", tipo: "Despesa", status: "Ativo" },
  { id: 6, nome: "Aluguel", tipo: "Despesa", status: "Inativo" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Categorias" subtitle="Gerencie categorias de receitas e despesas." icon={Tag} />
      <DataTable
        data={data}
        newLabel="Nova Categoria"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-20 font-mono text-muted-foreground" },
          { key: "nome", header: "Nome", render: (r) => <span className="font-medium">{r.nome}</span> },
          {
            key: "tipo",
            header: "Tipo",
            render: (r) => (
              <Badge variant="outline" className={r.tipo === "Receita" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
                {r.tipo}
              </Badge>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <span className={`inline-flex items-center gap-1.5 text-xs ${r.status === "Ativo" ? "text-success" : "text-muted-foreground"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.status === "Ativo" ? "bg-success animate-pulse-glow" : "bg-muted-foreground"}`} />
                {r.status}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
