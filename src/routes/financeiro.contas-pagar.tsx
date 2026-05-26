import { createFileRoute } from "@tanstack/react-router";
import { Banknote } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/financeiro/contas-pagar")({ component: Page });

const data = [
  { id: 1, descricao: "Aluguel escritório", fornecedor: "Imobiliária Centro", vencimento: "30/05/2026", valor: "R$ 1.800,00", status: "Pendente" },
  { id: 2, descricao: "Energia elétrica", fornecedor: "Enel", vencimento: "28/05/2026", valor: "R$ 420,00", status: "Pendente" },
  { id: 3, descricao: "Internet", fornecedor: "Vivo", vencimento: "25/05/2026", valor: "R$ 180,00", status: "Atrasada" },
  { id: 4, descricao: "Salário maio", fornecedor: "Folha de pagamento", vencimento: "05/06/2026", valor: "R$ 7.500,00", status: "Programada" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Contas a Pagar" subtitle="Compromissos financeiros pendentes." icon={Banknote} />
      <DataTable
        data={data}
        newLabel="Nova Conta"
        onNew={() => {}}
        columns={[
          { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
          { key: "fornecedor", header: "Fornecedor", className: "text-muted-foreground" },
          { key: "vencimento", header: "Vencimento", className: "font-mono" },
          { key: "valor", header: "Valor", render: (r) => <span className="font-mono font-semibold text-destructive">{r.valor}</span> },
          {
            key: "status",
            header: "Status",
            render: (r) => {
              const colors: Record<string, string> = {
                Pendente: "border-warning/40 text-warning",
                Atrasada: "border-destructive/40 text-destructive",
                Programada: "border-info/40 text-info",
              };
              return <Badge variant="outline" className={colors[r.status]}>{r.status}</Badge>;
            },
          },
        ]}
      />
    </div>
  );
}
