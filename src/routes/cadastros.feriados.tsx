import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/feriados")({ component: Page });

const data = [
  { id: 1, data: "01/01/2026", descricao: "Confraternização Universal" },
  { id: 2, data: "21/04/2026", descricao: "Tiradentes" },
  { id: 3, data: "01/05/2026", descricao: "Dia do Trabalho" },
  { id: 4, data: "07/09/2026", descricao: "Independência" },
];

function Page() {
  return (
    <div>
      <PageHeader
        title="Feriados"
        subtitle="Datas em que não haverá expedente. O sistema não gerará parcelas nessas datas."
        icon={CalendarDays}
      />
      <DataTable
        data={data}
        newLabel="Novo Feriado"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "data", header: "Data feriado", render: (r) => <span className="font-mono font-medium">{r.data}</span> },
          { key: "descricao", header: "Descrição", className: "text-muted-foreground" },
        ]}
      />
    </div>
  );
}
