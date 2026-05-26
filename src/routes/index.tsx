import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Wallet,
  TrendingUp,
  HandCoins,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { StatCard } from "@/components/stat-card";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const monthly = [
  { month: "Jan", receitas: 32000, despesas: 18000, lucro: 14000 },
  { month: "Fev", receitas: 38000, despesas: 21000, lucro: 17000 },
  { month: "Mar", receitas: 41000, despesas: 19500, lucro: 21500 },
  { month: "Abr", receitas: 47200, despesas: 23000, lucro: 24200 },
  { month: "Mai", receitas: 52800, despesas: 25400, lucro: 27400 },
  { month: "Jun", receitas: 58900, despesas: 27100, lucro: 31800 },
];

const consultorData = [
  { name: "Rodrigo", value: 28899 },
  { name: "Eder", value: 30000 },
  { name: "Maria", value: 18200 },
  { name: "Carlos", value: 12400 },
];

const categoriaData = [
  { name: "Empréstimos", value: 45200 },
  { name: "Juros", value: 18900 },
  { name: "Multas", value: 6400 },
  { name: "Outros", value: 3100 },
];

const COLORS = ["oklch(0.62 0.22 275)", "oklch(0.70 0.18 155)", "oklch(0.78 0.16 75)", "oklch(0.70 0.15 230)", "oklch(0.65 0.22 320)"];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Geral"
        subtitle="Visão consolidada de receitas, despesas e desempenho dos consultores em tempo real."
        icon={Activity}
        actions={
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" />
            Maio · 2026
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Capital de Giro"
          value="R$ 1.200,00"
          delta={{ value: "+12,4%", positive: true }}
          icon={Wallet}
          accent="primary"
          hint="2 empréstimos ativos"
        />
        <StatCard
          label="Total a Receber"
          value="R$ 1.596,00"
          delta={{ value: "+8,2%", positive: true }}
          icon={HandCoins}
          accent="success"
          hint="Esperado este mês"
        />
        <StatCard
          label="Já Recebido"
          value="R$ 198,00"
          delta={{ value: "-3,1%", positive: false }}
          icon={TrendingUp}
          accent="warning"
          hint="12,4% do total"
        />
        <StatCard
          label="Lucro Esperado"
          value="R$ 396,00"
          delta={{ value: "+24,8%", positive: true }}
          icon={Users}
          accent="info"
          hint="Margem 33%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Receitas / Despesas / Lucro" subtitle="Análise detalhada — últimos 6 meses" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.70 0.18 155)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.70 0.18 155)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.24 25)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.62 0.24 25)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.22 275)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.62 0.22 275)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="month" stroke="oklch(0.70 0.03 270)" fontSize={12} />
              <YAxis stroke="oklch(0.70 0.03 270)" fontSize={12} tickFormatter={(v) => `R$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.21 0.05 270)",
                  border: "1px solid oklch(0.30 0.05 270)",
                  borderRadius: 12, color: "oklch(0.97 0.01 270)"
                }}
                labelStyle={{ color: "oklch(0.97 0.01 270)" }}
                itemStyle={{ color: "oklch(0.97 0.01 270)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="receitas" stroke="oklch(0.70 0.18 155)" fill="url(#gr)" strokeWidth={2} />
              <Area type="monotone" dataKey="despesas" stroke="oklch(0.62 0.24 25)" fill="url(#rd)" strokeWidth={2} />
              <Area type="monotone" dataKey="lucro" stroke="oklch(0.62 0.22 275)" fill="url(#lc)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total Investido por Conta" subtitle="Distribuição por consultor">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={consultorData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {consultorData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(0.21 0.05 270)",
                  border: "1px solid oklch(0.30 0.05 270)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "oklch(0.97 0.01 270)" }}
                itemStyle={{ color: "oklch(0.97 0.01 270)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Gastos por Categoria" subtitle="Maio 2026">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoriaData}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="oklch(0.70 0.03 270)" fontSize={11} />
              <YAxis stroke="oklch(0.70 0.03 270)" fontSize={11} tickFormatter={(v) => `R$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.21 0.05 270)",
                  border: "1px solid oklch(0.30 0.05 270)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "oklch(0.97 0.01 270)" }}
                itemStyle={{ color: "oklch(0.97 0.01 270)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {categoriaData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Atividade Recente</h3>
              <p className="text-xs text-muted-foreground">Últimas movimentações do sistema</p>
            </div>
            <button className="text-xs text-primary-glow hover:underline inline-flex items-center gap-1">
              Ver tudo <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <ul className="space-y-3">
            {[
              { t: "Empréstimo aprovado", d: "Teste Maria · R$ 396,00", w: "há 5 min", c: "success" },
              { t: "Cobrança recebida", d: "Rodrigo · Rota Diária", w: "há 12 min", c: "info" },
              { t: "Novo cliente cadastrado", d: "João Silva", w: "há 1h", c: "primary" },
              { t: "Multa aplicada", d: "Empréstimo #1052", w: "há 2h", c: "warning" },
              { t: "Transferência entre rotas", d: "Rodrigo → Eder · 3 empréstimos", w: "há 3h", c: "primary" },
            ].map((a, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border/30 bg-background/30 p-3 transition-all hover:border-primary/40 hover:translate-x-1"
              >
                <span className={`h-2 w-2 rounded-full bg-${a.c} animate-pulse-glow shrink-0`} style={{ background: COLORS[i % COLORS.length] }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.t}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.d}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card ${className}`}>
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
