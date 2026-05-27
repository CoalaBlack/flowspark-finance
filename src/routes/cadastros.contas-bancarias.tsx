import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/contas-bancarias")({ component: Page });

type Conta = { id: number; banco: string; agencia: string; conta: string; saldo: string; tipo: string };

const initial: Conta[] = [
  { id: 1, banco: "Banco Rodrigo", agencia: "0001", conta: "12345-6", saldo: "R$ 28.899,00", tipo: "Corrente" },
  { id: 2, banco: "Banco Eder", agencia: "0002", conta: "23456-7", saldo: "R$ 30.000,00", tipo: "Corrente" },
  { id: 3, banco: "Caixa", agencia: "1234", conta: "00012-3", saldo: "R$ 5.420,00", tipo: "Poupança" },
];

function Page() {
  const crud = useCrud<Conta>({
    initial,
    entityLabel: "Conta Bancária",
    newLabel: "Nova Conta",
    fields: [
      { name: "banco", label: "Banco", required: true, placeholder: "Ex: Itaú" },
      { name: "tipo", label: "Tipo", type: "select", options: ["Corrente", "Poupança", "Pagamento"], required: true },
      { name: "agencia", label: "Agência", required: true, placeholder: "0000" },
      { name: "conta", label: "Conta", required: true, placeholder: "00000-0" },
      { name: "saldo", label: "Saldo inicial", placeholder: "R$ 0,00" },
    ],
    defaults: () => ({ tipo: "Corrente", saldo: "R$ 0,00" }),
  });

  return (
    <div>
      <PageHeader title="Contas Bancárias" subtitle="Contas usadas para movimentações financeiras." icon={Wallet} />
      <DataTable
        data={crud.rows}
        newLabel="Nova Conta"
        exportName="contas-bancarias"
        onNew={crud.openCreate}
        onView={crud.openView}
        onEdit={crud.openEdit}
        onDelete={crud.remove}
        columns={[
          { key: "id", header: "ID", className: "w-16 font-mono text-muted-foreground" },
          { key: "banco", header: "Banco", render: (r) => <span className="font-medium">{r.banco}</span> },
          { key: "agencia", header: "Agência", className: "font-mono" },
          { key: "conta", header: "Conta", className: "font-mono" },
          { key: "tipo", header: "Tipo", className: "text-muted-foreground" },
          { key: "saldo", header: "Saldo", render: (r) => <span className="font-mono font-semibold text-success">{r.saldo}</span> },
        ]}
      />
      {crud.dialog}
    </div>
  );
}
