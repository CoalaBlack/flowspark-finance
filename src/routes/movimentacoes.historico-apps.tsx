import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/movimentacoes/historico-apps")({ component: Page });

const data = [
  { id: 1, numero: "1023", consultor: "Rodrigo", cliente: "Pedro Santos", valor: "R$ 99,00", forma: "PIX", criadoEm: "25/05/2026 14:32" },
  { id: 2, numero: "1015", consultor: "Eder", cliente: "Carla Oliveira", valor: "R$ 150,00", forma: "Dinheiro", criadoEm: "25/05/2026 11:08" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Histórico Apps" subtitle="Recebimentos registrados pelos consultores no app de cobrança." icon={Smartphone} />
      <DataTable
        data={data}
        columns={[
          { key: "numero", header: "Nº do empréstimo", className: "font-mono" },
          { key: "consultor", header: "Consultor" },
          { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
          { key: "valor", header: "Valor R$", className: "font-mono font-semibold text-success" },
          { key: "forma", header: "Forma recebimento App" },
          { key: "criadoEm", header: "Criado em", className: "font-mono text-muted-foreground" },
        ]}
      />
      <div className="mt-4 text-right text-sm">
        <span className="text-muted-foreground">Total geral: </span>
        <span className="font-mono font-bold text-success text-lg">R$ 249,00</span>
      </div>
    </div>
  );
}
