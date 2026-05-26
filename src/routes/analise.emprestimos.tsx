import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Wallet, HandCoins, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const Route = createFileRoute("/analise/emprestimos")({ component: Page });

const comparativo = [
  { nome: "Esperado", valor: 1596 },
  { nome: "Recebido", valor: 198 },
  { nome: "A receber", valor: 1398 },
];

const ativos = [
  { num: "1052", cliente: "Teste Maria", emp: "R$ 396,00", pago: "R$ 198,00", saldo: "R$ 198,00" },
  { num: "1051", cliente: "João Silva", emp: "R$ 1.200,00", pago: "R$ 320,00", saldo: "R$ 880,00" },
];

function Page() {
  return (
    <div>
      <PageHeader
        title="Visão Geral de Empréstimos"
        subtitle="Todos os valores baseados apenas em empréstimos que ainda estão em andamento."
        icon={TrendingUp}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2 border-success/40 text-success"><Printer className="h-4 w-4" />Imprimir</Button>
            <Button variant="outline" size="sm">Relatório por banco</Button>
            <Button variant="outline" size="sm">Por categoria</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Capital de Giro" value="R$ 1.200,00" icon={Wallet} accent="primary" hint="Quantidade: 2" />
        <StatCard label="Total Esperado" value="R$ 1.596,00" icon={TrendingUp} accent="success" />
        <StatCard label="Total Recebido" value="R$ 198,00" icon={HandCoins} accent="info" hint="Banco Rodrigo" />
        <StatCard label="Ainda a Receber" value="R$ 1.398,00" icon={HandCoins} accent="warning" hint="Rota Rodrigo" />
        <StatCard label="Despesas com Empréstimos" value="R$ 1.200,00" icon={AlertCircle} accent="destructive" />
        <StatCard label="Lucro Esperado" value="R$ 396,00" icon={TrendingUp} accent="success" delta={{ value: "+33%", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
          <h3 className="font-display text-lg font-semibold mb-1">Comparativo Empréstimos / Financeiro</h3>
          <p className="text-xs text-muted-foreground mb-4">Esperado vs Recebido vs Saldo</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparativo}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="nome" stroke="oklch(0.70 0.03 270)" fontSize={12} />
              <YAxis stroke="oklch(0.70 0.03 270)" fontSize={12} tickFormatter={(v) => `R$${v}`} />
              <Tooltip
                contentStyle={{ background: "oklch(0.21 0.05 270)", border: "1px solid oklch(0.30 0.05 270)", borderRadius: 12 }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
                {comparativo.map((_, i) => (
                  <Cell key={i} fill={["oklch(0.70 0.18 155)", "oklch(0.70 0.15 230)", "oklch(0.78 0.16 75)"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
          <h3 className="font-display text-lg font-semibold mb-1">Empréstimos ativos a receber</h3>
          <p className="text-xs text-muted-foreground mb-4">Lista detalhada</p>
          <div className="space-y-2">
            {ativos.map((a) => (
              <div key={a.num} className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/30 hover:border-primary/40 transition-all">
                <div className="font-mono text-xs text-muted-foreground w-12">#{a.num}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.cliente}</p>
                  <p className="text-xs text-muted-foreground">Empréstimo: <span className="font-mono">{a.emp}</span> · Pago: <span className="font-mono text-success">{a.pago}</span></p>
                </div>
                <p className="font-mono font-semibold text-primary-glow whitespace-nowrap">{a.saldo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
