import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

export const Route = createFileRoute("/cadastros/contas-bancarias")({ component: Page });

const data = [
  { id: 1, banco: "Banco Rodrigo", agencia: "0001", conta: "12345-6", saldo: "R$ 28.899,00", tipo: "Corrente" },
  { id: 2, banco: "Banco Eder", agencia: "0002", conta: "23456-7", saldo: "R$ 30.000,00", tipo: "Corrente" },
  { id: 3, banco: "Caixa", agencia: "1234", conta: "00012-3", saldo: "R$ 5.420,00", tipo: "Poupança" },
];

function Page() {
  return (
    <div>
      <PageHeader title="Contas Bancárias" subtitle="Contas usadas para movimentações financeiras." icon={Wallet} />
      <DataTable
        data={data}
        newLabel="Nova Conta"
        onNew={() => {}}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "banco", header: "Banco", render: (r) => <span className="font-medium">{r.banco}</span> },
          { key: "agencia", header: "Agência", className: "font-mono" },
          { key: "conta", header: "Conta", className: "font-mono" },
          { key: "tipo", header: "Tipo", className: "text-muted-foreground" },
          { key: "saldo", header: "Saldo", render: (r) => <span className="font-mono font-semibold text-success">{r.saldo}</span> },
        ]}
      />
    </div>
  );
}
