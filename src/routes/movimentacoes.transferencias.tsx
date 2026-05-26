import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/movimentacoes/transferencias")({ component: Page });

const data = [
  { id: 1, data: "26/05/2026", origem: "Banco Rodrigo", destino: "Banco Eder", valor: "R$ 5.000,00" },
  { id: 2, data: "20/05/2026", origem: "Caixa", destino: "Banco Rodrigo", valor: "R$ 2.500,00" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Transferências" subtitle="Movimentações entre contas bancárias." icon={Repeat} />
      <DataTable
        data={data}
        newLabel="Nova Transferência"
        onNew={() => {}}
        columns={[
          { key: "data", header: "Data", className: "font-mono text-muted-foreground w-28" },
          {
            key: "origem",
            header: "Origem → Destino",
            render: (r) => (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{r.origem}</span>
                <ArrowRight className="h-3.5 w-3.5 text-primary-glow" />
                <span className="font-medium">{r.destino}</span>
              </div>
            ),
          },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold text-primary-glow">{r.valor}</span> },
        ]}
      />
    </div>
  );
}
