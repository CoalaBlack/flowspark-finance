import { createFileRoute } from "@tanstack/react-router";
import { HandCoins } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/formas-recebimento")({ component: Page });

const data = [
  { id: 1, nome: "Dinheiro", taxa: "0%", prazo: "Imediato" },
  { id: 2, nome: "PIX", taxa: "0%", prazo: "Imediato" },
  { id: 3, nome: "Cartão Crédito", taxa: "2,99%", prazo: "30 dias" },
  { id: 4, nome: "Cartão Débito", taxa: "1,49%", prazo: "1 dia" },
  { id: 5, nome: "Boleto", taxa: "R$ 2,50", prazo: "3 dias" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Formas de Recebimento" subtitle="Métodos aceitos para receber pagamentos." icon={HandCoins} />
      <DataTable
        data={data}
        newLabel="Nova Forma"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "nome", header: "Forma", render: (r) => <span className="font-medium">{r.nome}</span> },
          { key: "taxa", header: "Taxa", className: "font-mono" },
          { key: "prazo", header: "Prazo", className: "text-muted-foreground" },
        ]}
      />
    </div>
  );
}
