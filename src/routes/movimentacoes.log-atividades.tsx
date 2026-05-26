import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/movimentacoes/log-atividades")({ component: Page });

const data = [
  { id: 1, usuario: "Rodrigo", tarefa: "Consultor: Rodrigo realizou fechamento (Version App: 102) do dia 25/05/2026", realizado: "26/05/2026 16:09:37" },
  { id: 2, usuario: "Douglas", tarefa: "Efetuou o Login no sistema", realizado: "26/05/2026 15:56:18" },
  { id: 3, usuario: "Douglas", tarefa: "Efetuou o Login no sistema", realizado: "26/05/2026 15:19:32" },
  { id: 4, usuario: "Douglas", tarefa: "Efetuou o Login no sistema", realizado: "26/05/2026 14:46:45" },
  { id: 5, usuario: "Douglas", tarefa: "Efetuou o Login no sistema", realizado: "26/05/2026 14:21:01" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Log de Atividades" subtitle="Trilha de auditoria de ações dos usuários no sistema." icon={ScrollText} />
      <DataTable
        data={data}
        columns={[
          { key: "usuario", header: "Usuário", render: (r) => <span className="font-medium">{r.usuario}</span> },
          { key: "tarefa", header: "Tarefa", className: "text-muted-foreground" },
          { key: "realizado", header: "Realizado em", className: "font-mono text-xs text-muted-foreground" },
        ]}
      />
    </div>
  );
}
