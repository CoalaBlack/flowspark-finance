import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpFromLine, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/movimentacoes/aportes-retiradas")({ component: Page });

function Page() {
  const [op, setOp] = useState<"aporte" | "retirada" | null>(null);

  return (
    <div>
      <PageHeader title="Aportes / Retiradas" subtitle="Adicione capital de giro ou retire valores das contas bancárias." icon={Wallet} />

      <div className="rounded-2xl border border-border/50 bg-gradient-card p-6 mb-6 animate-fade-in">
        <h3 className="font-display text-lg font-semibold mb-2">Como funciona</h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>1º Selecione a opção desejada abaixo e preencha todos os campos.</li>
          <li>- Todos os aportes e retiradas aparecerão no fluxo bancário da respectiva conta.</li>
          <li>- Após a conclusão do processo o saldo da respectiva conta bancária será atualizado.</li>
        </ul>
      </div>

      {!op && (
        <div className="rounded-2xl border border-border/50 bg-gradient-card p-8 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">Selecione a opção desejada:</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setOp("aporte")}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-success/30 to-success/10 border border-success/40 px-8 py-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-elegant"
            >
              <ArrowDownToLine className="h-8 w-8 text-success mb-2" />
              <div className="font-display text-lg font-bold">APORTE</div>
              <div className="text-xs text-muted-foreground mt-1">Adicionar capital</div>
            </button>
            <button
              onClick={() => setOp("retirada")}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-destructive/30 to-destructive/10 border border-destructive/40 px-8 py-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-elegant"
            >
              <ArrowUpFromLine className="h-8 w-8 text-destructive mb-2" />
              <div className="font-display text-lg font-bold">RETIRADA</div>
              <div className="text-xs text-muted-foreground mt-1">Retirar valor</div>
            </button>
          </div>
        </div>
      )}

      {op && (
        <div className="rounded-2xl border border-border/50 bg-gradient-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              {op === "aporte" ? <ArrowDownToLine className="h-5 w-5 text-success" /> : <ArrowUpFromLine className="h-5 w-5 text-destructive" />}
              {op === "aporte" ? "Novo Aporte" : "Nova Retirada"}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setOp(null)}>Voltar</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Conta Bancária</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione a conta" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Banco Rodrigo - 0001 / 12345-6</SelectItem>
                  <SelectItem value="2">Banco Eder - 0002 / 23456-7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Valor R$</Label>
              <Input placeholder="0,00" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Data</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Centro de Custo</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Diversos</SelectItem>
                  <SelectItem value="2">Rodrigo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Descrição</Label>
              <Input placeholder="Descreva a movimentação" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOp(null)}>Cancelar</Button>
            <Button className="bg-gradient-primary shadow-glow" onClick={() => { toast.success(`${op === "aporte" ? "Aporte" : "Retirada"} registrado com sucesso!`); setOp(null); }}>Confirmar {op === "aporte" ? "Aporte" : "Retirada"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
