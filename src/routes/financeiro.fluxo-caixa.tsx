import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ArrowDownToLine, ArrowUpFromLine, Wallet } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import {
  ComposedChart,
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/financeiro/fluxo-caixa")({ component: Page });

const data = [
  { dia: "01", entradas: 1200, saidas: 600, saldo: 600 },
  { dia: "05", entradas: 1800, saidas: 900, saldo: 1500 },
  { dia: "10", entradas: 2400, saidas: 1200, saldo: 2700 },
  { dia: "15", entradas: 2100, saidas: 1500, saldo: 3300 },
  { dia: "20", entradas: 2800, saidas: 1800, saldo: 4300 },
  { dia: "25", entradas: 3200, saidas: 1400, saldo: 6100 },
  { dia: "30", entradas: 3500, saidas: 2100, saldo: 7500 },
];

function Page() {
  return (
    <div>
      <PageHeader title="Fluxo de Caixa" subtitle="Análise diária de entradas e saídas." icon={TrendingUp} />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Saldo Atual" value="R$ 7.500,00" icon={Wallet} accent="primary" />
        <StatCard label="Entradas Mês" value="R$ 17.000,00" icon={ArrowDownToLine} accent="success" delta={{ value: "+12%", positive: true }} />
        <StatCard label="Saídas Mês" value="R$ 9.500,00" icon={ArrowUpFromLine} accent="destructive" delta={{ value: "+3%", positive: false }} />
        <StatCard label="Resultado" value="R$ 7.500,00" icon={TrendingUp} accent="info" delta={{ value: "+24%", positive: true }} />
      </div>

      <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-1">Evolução Diária — Maio 2026</h3>
        <p className="text-xs text-muted-foreground mb-4">Entradas, saídas e saldo acumulado</p>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={data}>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
            <XAxis dataKey="dia" stroke="oklch(0.70 0.03 270)" fontSize={12} />
            <YAxis stroke="oklch(0.70 0.03 270)" fontSize={12} tickFormatter={(v) => `R$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "oklch(0.21 0.05 270)", border: "1px solid oklch(0.30 0.05 270)", borderRadius: 12 }}
              formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="entradas" fill="oklch(0.70 0.18 155)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="saidas" fill="oklch(0.62 0.24 25)" radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="saldo" stroke="oklch(0.62 0.22 275)" strokeWidth={3} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
