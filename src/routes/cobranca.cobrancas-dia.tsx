import { createFileRoute } from "@tanstack/react-router";
import { Receipt, CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { TrendingUp, Wallet, Users } from "lucide-react";

export const Route = createFileRoute("/cobranca/cobrancas-dia")({ component: Page });

const items = [
  { id: 1, cliente: "Teste Maria", rota: "Centro", valor: 33, pago: true },
  { id: 2, cliente: "João Silva", rota: "Norte", valor: 100, pago: true },
  { id: 3, cliente: "Pedro Santos", rota: "Centro", valor: 50, pago: false },
  { id: 4, cliente: "Ana Costa", rota: "Sul", valor: 75, pago: false },
  { id: 5, cliente: "Carla Oliveira", rota: "Leste", valor: 45, pago: false },
  { id: 6, cliente: "Bruno Lima", rota: "Norte", valor: 60, pago: true },
];

function Page() {
  const total = items.reduce((s, i) => s + i.valor, 0);
  const recebido = items.filter((i) => i.pago).reduce((s, i) => s + i.valor, 0);
  return (
    <div>
      <PageHeader title="Cobranças do Dia" subtitle="Lista de cobranças programadas para hoje." icon={Receipt} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total a Cobrar" value={`R$ ${total.toFixed(2)}`} icon={Wallet} accent="primary" hint={`${items.length} clientes`} />
        <StatCard label="Já Recebido" value={`R$ ${recebido.toFixed(2)}`} icon={TrendingUp} accent="success" hint={`${items.filter((i) => i.pago).length} pagos`} />
        <StatCard label="A Receber" value={`R$ ${(total - recebido).toFixed(2)}`} icon={Users} accent="warning" hint={`${items.filter((i) => !i.pago).length} pendentes`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((c) => (
          <div
            key={c.id}
            className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${
              c.pago ? "border-success/30 bg-success/5" : "border-border/50 bg-gradient-card hover:border-primary/40"
            }`}
          >
            <button className="shrink-0">
              {c.pago ? (
                <CheckCircle2 className="h-7 w-7 text-success" />
              ) : (
                <Circle className="h-7 w-7 text-muted-foreground group-hover:text-primary-glow transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{c.cliente}</p>
              <p className="text-xs text-muted-foreground">Rota {c.rota}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg font-bold font-mono">R$ {c.valor.toFixed(2)}</p>
              {!c.pago && <Button size="sm" variant="outline" className="mt-1 h-7 text-xs">Receber</Button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
