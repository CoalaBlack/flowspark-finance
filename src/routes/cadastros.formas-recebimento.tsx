import { createFileRoute } from "@tanstack/react-router";
import { HandCoins } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/formas-recebimento")({ component: Page });

type Forma = { id: number; nome: string; taxa: string; prazo: string };

const initial: Forma[] = [
  { id: 1, nome: "Dinheiro", taxa: "0%", prazo: "Imediato" },
  { id: 2, nome: "PIX", taxa: "0%", prazo: "Imediato" },
  { id: 3, nome: "Cartão Crédito", taxa: "2,99%", prazo: "30 dias" },
  { id: 4, nome: "Cartão Débito", taxa: "1,49%", prazo: "1 dia" },
  { id: 5, nome: "Boleto", taxa: "R$ 2,50", prazo: "3 dias" },
];

function Page() {
  const crud = useCrud<Forma>({
    initial,
    entityLabel: "Forma de Recebimento",
    newLabel: "Nova Forma",
    fields: [
      { name: "nome", label: "Forma", required: true, placeholder: "Ex: PIX" },
      { name: "taxa", label: "Taxa", placeholder: "Ex: 2,99% ou R$ 2,50" },
      { name: "prazo", label: "Prazo de recebimento", placeholder: "Ex: 1 dia, Imediato" },
    ],
  });

  return (
    <div>
      <PageHeader title="Formas de Recebimento" subtitle="Métodos aceitos para receber pagamentos." icon={HandCoins} />
      <DataTable
        data={crud.rows}
        newLabel="Nova Forma"
        exportName="formas-recebimento"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "nome", header: "Forma", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "taxa", header: "Taxa", className: "font-mono" },
          { key: "prazo", header: "Prazo", className: "text-muted-foreground" },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
