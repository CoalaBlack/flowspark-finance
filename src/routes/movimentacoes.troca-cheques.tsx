import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/movimentacoes/troca-cheques")({ component: Page });

const data = [
  { id: 1, data: "26/05/2026", numero: "001234", emitente: "Empresa XYZ", valor: "R$ 3.500,00", vencimento: "26/06/2026", status: "Em custódia" },
  { id: 2, data: "20/05/2026", numero: "001235", emitente: "Cliente ABC", valor: "R$ 1.200,00", vencimento: "20/06/2026", status: "Compensado" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Troca de Cheques" subtitle="Gerencie cheques recebidos e antecipações." icon={Receipt} />
      <DataTable
        data={data}
        newLabel="Novo Cheque"
        onNew={() => {}}
        columns={[
          { key: "data", header: "Data", className: "font-mono text-muted-foreground w-28" },
          { key: "numero", header: "Nº Cheque", className: "font-mono" },
          { key: "emitente", header: "Emitente", render: (r) => <span className="font-medium">{r.emitente}</span> },
          { key: "vencimento", header: "Vencimento", className: "font-mono text-muted-foreground" },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold">{r.valor}</span> },
          { key: "status", header: "Status", render: (r) => <Badge variant="outline" className={r.status === "Compensado" ? "border-success/40 text-success" : "border-warning/40 text-warning"}>{r.status}</Badge> },
        ]}
      />
    </div>
  );
}
