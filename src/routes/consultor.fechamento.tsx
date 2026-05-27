import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { useEmprestimos } from "@/lib/emprestimos-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/consultor/fechamento")({ component: Page });

function Page() {
  const lista = useEmprestimos();
  const totalEmprestado = lista.reduce((s, e) => s + e.valor, 0);
  const totalReceber = lista.reduce((s, e) => s + e.total, 0);
  const lucro = totalReceber - totalEmprestado;
  return (
    <MobileShell title="Fechamento" back="/consultor">
      <div className="grid grid-cols-1 gap-3">
        <Card label="Total Emprestado" value={`R$${totalEmprestado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
        <Card label="Total a Receber" value={`R$${totalReceber.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent />
        <Card label="Lucro Previsto" value={`R$${lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
        <Card label="Contratos Ativos" value={String(lista.length)} />
      </div>
      <Button
        className="mt-6 w-full bg-gradient-primary text-primary-foreground shadow-glow h-12"
        onClick={() => toast.success("Fechamento do dia enviado para o caixa.")}
      >
        Enviar fechamento do dia
      </Button>
    </MobileShell>
  );
}

function Card({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 shadow-card ${accent ? "border-primary/40 bg-gradient-card" : "border-border/50 bg-card/30"}`}>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl font-bold ${accent ? "text-gradient" : ""}`}>{value}</div>
    </div>
  );
}
