import { createFileRoute } from "@tanstack/react-router";
import { HandCoins, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { Wallet, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cobranca/emprestimos")({ component: Page });

const data = [
  { id: 1052, cliente: "Teste Maria", valor: "R$ 396,00", pago: "R$ 198,00", saldo: "R$ 198,00", parcelas: "6/12", consultor: "Rodrigo", status: "Em dia" },
  { id: 1051, cliente: "João Silva", valor: "R$ 1.200,00", pago: "R$ 320,00", saldo: "R$ 880,00", parcelas: "3/12", consultor: "Eder", status: "Em dia" },
  { id: 1048, cliente: "Pedro Santos", valor: "R$ 800,00", pago: "R$ 200,00", saldo: "R$ 600,00", parcelas: "2/8", consultor: "Rodrigo", status: "Atrasado" },
  { id: 1045, cliente: "Ana Costa", valor: "R$ 2.500,00", pago: "R$ 1.800,00", saldo: "R$ 700,00", parcelas: "9/12", consultor: "Maria", status: "Em dia" },
];

function Page() {
  return (
    <div>
      <PageHeader
        title="Empréstimos"
        subtitle="Visão geral de todos os empréstimos ativos."
        icon={HandCoins}
        actions={
          <Link to="/cobranca/novo-emprestimo">
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow gap-2">
              <Plus className="h-4 w-4" /> Novo Empréstimo
            </Button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Capital de Giro" value="R$ 1.200,00" icon={Wallet} accent="primary" hint="2 ativos" />
        <StatCard label="Total Esperado" value="R$ 1.596,00" icon={TrendingUp} accent="success" />
        <StatCard label="Já Recebido" value="R$ 198,00" icon={TrendingUp} accent="info" hint="12,4%" />
        <StatCard label="Em Atraso" value="R$ 600,00" icon={AlertCircle} accent="destructive" hint="1 contrato" />
      </div>
      <DataTable
        data={data}
        columns={[
          { key: "id", header: "Nº", className: "font-mono text-muted-foreground w-20" },
          { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
          { key: "valor", header: "Empréstimo", className: "font-mono" },
          { key: "pago", header: "Já pago", className: "font-mono text-success" },
          { key: "saldo", header: "Saldo", className: "font-mono font-semibold" },
          { key: "parcelas", header: "Parcelas", className: "font-mono text-muted-foreground" },
          { key: "consultor", header: "Consultor" },
          { key: "status", header: "Status", render: (r) => <Badge variant="outline" className={r.status === "Em dia" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>{r.status}</Badge> },
        ]}
      />
    </div>
  );
}
