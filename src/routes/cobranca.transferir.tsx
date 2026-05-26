import { createFileRoute } from "@tanstack/react-router";
import { Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const Route = createFileRoute("/cobranca/transferir")({ component: Page });

const emprestimos = [
  { id: 1052, cliente: "Teste Maria", saldo: "R$ 198,00" },
  { id: 1051, cliente: "João Silva", saldo: "R$ 880,00" },
  { id: 1048, cliente: "Pedro Santos", saldo: "R$ 600,00" },
  { id: 1045, cliente: "Ana Costa", saldo: "R$ 700,00" },
];

function Page() {
  const [origem, setOrigem] = useState<string>();
  const [destino, setDestino] = useState<string>();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const steps = [
    { n: 1, label: "Consultor de origem", done: !!origem },
    { n: 2, label: "Selecionar empréstimos", done: selected.length > 0 },
    { n: 3, label: "Consultor de destino", done: !!destino },
    { n: 4, label: "Transferir", done: false },
  ];

  return (
    <div>
      <PageHeader title="Transferir Empréstimos" subtitle="Mova empréstimos entre consultores em 4 passos." icon={Send} />

      <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 mb-6 shadow-card">
        <ol className="flex items-center gap-2 overflow-x-auto">
          {steps.map((s, i) => (
            <li key={s.n} className="flex items-center gap-2 shrink-0">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  s.done
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted/40 text-muted-foreground border border-border/60"
                }`}
              >
                {s.done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
              </div>
              <span className={`text-sm ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card space-y-4">
          <div className="space-y-1.5">
            <Label>1. Consultor de origem</Label>
            <Select value={origem} onValueChange={setOrigem}>
              <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione o consultor atual" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rodrigo">Rodrigo</SelectItem>
                <SelectItem value="eder">Eder</SelectItem>
                <SelectItem value="maria">Maria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>2. Empréstimos para transferir</Label>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {emprestimos.map((e) => {
                const isSel = selected.includes(e.id);
                return (
                  <label
                    key={e.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                      isSel ? "border-primary/50 bg-primary/10" : "border-border/50 hover:border-primary/30"
                    }`}
                  >
                    <Checkbox checked={isSel} onCheckedChange={() => toggle(e.id)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">#{e.id} · {e.cliente}</p>
                      <p className="text-xs text-muted-foreground">Saldo: <span className="font-mono">{e.saldo}</span></p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-gradient-card p-5 shadow-card space-y-4 h-fit">
          <div className="space-y-1.5">
            <Label>3. Consultor de destino</Label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione o novo responsável" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rodrigo">Rodrigo</SelectItem>
                <SelectItem value="eder">Eder</SelectItem>
                <SelectItem value="maria">Maria</SelectItem>
                <SelectItem value="carlos">Carlos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl bg-background/40 p-4 space-y-2 border border-border/30">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Resumo</p>
            <p className="text-sm">Empréstimos selecionados: <span className="font-bold text-primary-glow">{selected.length}</span></p>
            <p className="text-sm">De: <span className="font-medium">{origem ?? "—"}</span></p>
            <p className="text-sm">Para: <span className="font-medium">{destino ?? "—"}</span></p>
          </div>

          <Button
            className="w-full bg-gradient-primary text-primary-foreground shadow-glow gap-2"
            disabled={!origem || !destino || selected.length === 0}
          >
            <Send className="h-4 w-4" /> Transferir agora
          </Button>
        </div>
      </div>
    </div>
  );
}
