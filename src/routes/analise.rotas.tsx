import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon, Search, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { Users, Wallet, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/analise/rotas")({ component: Page });

function Page() {
  return (
    <div>
      <PageHeader
        title="Análise de Rota de Cobrança"
        subtitle="Verifique quais clientes estão na rota do consultor selecionado e valores já recebidos hoje."
        icon={RouteIcon}
      />

      <div className="rounded-2xl border border-border/50 bg-gradient-card p-6 mb-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary-glow" />
          <h3 className="font-display text-lg font-semibold">Informe o consultor</h3>
        </div>
        <div className="flex items-end gap-3 flex-wrap">
          <div className="space-y-1.5 min-w-[260px] flex-1">
            <Label>Consultor</Label>
            <Select>
              <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione o consultor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Rodrigo</SelectItem>
                <SelectItem value="2">Eder</SelectItem>
                <SelectItem value="3">Maria</SelectItem>
                <SelectItem value="4">Carlos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground shadow-glow gap-2">
            <Search className="h-4 w-4" /> Consultar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Clientes Hoje (Diária)" value="6" icon={Users} accent="primary" hint="R$ 363,00 a receber" />
        <StatCard label="Semanal / Quinz. / Mensal" value="3" icon={Wallet} accent="info" hint="R$ 850,00 a receber" />
        <StatCard label="Já cobrados hoje" value="2" icon={CheckCircle2} accent="success" hint="R$ 133,00 recebidos" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RouteBlock title="Clientes hoje (Diária)" rows={[
          { id: 1, cliente: "Teste Maria", emp: "R$ 396", saldo: "R$ 198", parcela: "R$ 33", hoje: "R$ 33" },
          { id: 2, cliente: "João Silva", emp: "R$ 1.200", saldo: "R$ 880", parcela: "R$ 100", hoje: "R$ 100" },
          { id: 3, cliente: "Pedro Santos", emp: "R$ 800", saldo: "R$ 600", parcela: "R$ 50", hoje: "R$ 50" },
        ]} />
        <RouteBlock title="Semanal / Quinz. / Mensal" rows={[
          { id: 4, cliente: "Ana Costa", emp: "R$ 2.500", saldo: "R$ 700", parcela: "R$ 250", hoje: "R$ 250" },
          { id: 5, cliente: "Carla Oliveira", emp: "R$ 1.500", saldo: "R$ 900", parcela: "R$ 150", hoje: "R$ 150" },
        ]} />
        <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
          <h4 className="font-display font-semibold mb-3">Clientes já cobrados hoje</h4>
          <div className="space-y-2">
            {[
              { id: 1, cliente: "Teste Maria", valor: "R$ 33,00", forma: "PIX", hora: "08:42" },
              { id: 2, cliente: "Bruno Lima", valor: "R$ 100,00", forma: "Dinheiro", hora: "10:15" },
            ].map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-success/20 bg-success/5">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.cliente}</p>
                  <p className="text-xs text-muted-foreground">{r.forma} · {r.hora}</p>
                </div>
                <p className="font-mono font-semibold text-success">{r.valor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteBlock({ title, rows }: { title: string; rows: { id: number; cliente: string; emp: string; saldo: string; parcela: string; hoje: string }[] }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card">
      <h4 className="font-display font-semibold mb-3">{title}</h4>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="rounded-lg border border-border/40 bg-background/30 p-3 hover:border-primary/40 transition-all">
            <p className="text-sm font-medium">{r.cliente}</p>
            <div className="grid grid-cols-2 gap-1 mt-1.5 text-xs">
              <span className="text-muted-foreground">Empréstimo</span>
              <span className="font-mono text-right">{r.emp}</span>
              <span className="text-muted-foreground">Saldo</span>
              <span className="font-mono text-right">{r.saldo}</span>
              <span className="text-muted-foreground">Parcela</span>
              <span className="font-mono text-right">{r.parcela}</span>
              <span className="text-muted-foreground font-medium">Hoje</span>
              <span className="font-mono text-right font-semibold text-primary-glow">{r.hoje}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
