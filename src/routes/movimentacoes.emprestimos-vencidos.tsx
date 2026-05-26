import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/movimentacoes/emprestimos-vencidos")({ component: Page });

const data = [
  { id: 1, numero: "1023", cliente: "Pedro Santos", consultor: "Rodrigo", valor: "R$ 1.200,00", pct: "30%", valTotal: "R$ 1.560,00", jaPago: "R$ 200,00", inicio: "01/03/2026", vencto: "20/05/2026", devedor: "R$ 1.360,00", status: "Vencido" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Empréstimos Vencidos" subtitle="Acompanhe inadimplências e tome ações de cobrança." icon={AlertTriangle} />
      <DataTable
        data={data}
        columns={[
          { key: "numero", header: "Nº", className: "font-mono" },
          { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
          { key: "consultor", header: "Consultor" },
          { key: "valor", header: "Valor R$", className: "font-mono" },
          { key: "pct", header: "%", className: "font-mono text-muted-foreground" },
          { key: "valTotal", header: "Val total R$", className: "font-mono" },
          { key: "jaPago", header: "Já pago R$", className: "font-mono text-success" },
          { key: "inicio", header: "Início em", className: "font-mono text-muted-foreground" },
          { key: "vencto", header: "Vencto", className: "font-mono text-destructive" },
          { key: "devedor", header: "S devedor R$", className: "font-mono font-semibold text-destructive" },
          { key: "status", header: "Status", render: () => <Badge variant="outline" className="border-destructive/40 text-destructive">Vencido</Badge> },
        ]}
      />
      <div className="mt-4 text-right text-sm">
        <span className="text-muted-foreground">Total vencido: </span>
        <span className="font-mono font-bold text-destructive text-lg">R$ 1.360,00</span>
      </div>
    </div>
  );
}
