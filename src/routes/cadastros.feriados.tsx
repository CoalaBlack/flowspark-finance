import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/feriados")({ component: Page });

type Feriado = { id: number; data: string; descricao: string };

const initial: Feriado[] = [
  { id: 1, data: "01/01/2026", descricao: "Confraternização Universal" },
  { id: 2, data: "21/04/2026", descricao: "Tiradentes" },
  { id: 3, data: "01/05/2026", descricao: "Dia do Trabalho" },
  { id: 4, data: "07/09/2026", descricao: "Independência" },
];

function Page() {
  const crud = useCrud<Feriado>({
    initial,
    entityLabel: "Feriado",
    newLabel: "Novo Feriado",
    fields: [
      { name: "data", label: "Data do feriado", type: "date", required: true },
      { name: "descricao", label: "Descrição", required: true, placeholder: "Ex: Natal" },
    ],
  });

  return (
    <div>
      <PageHeader
        title="Feriados"
        subtitle="Datas em que não haverá expediente. O sistema não gerará parcelas nessas datas."
        icon={CalendarDays}
      />
      <DataTable
        data={crud.rows}
        newLabel="Novo Feriado"
        exportName="feriados"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "data", header: "Data feriado", render: (r) => <span className="font-mono font-medium">{r.data}</span> },
          { key: "descricao", header: "Descrição", className: "text-muted-foreground" },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
