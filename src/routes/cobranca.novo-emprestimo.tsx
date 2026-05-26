import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Calculator } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/cobranca/novo-emprestimo")({ component: Page });

function Page() {
  const [valor, setValor] = useState(1000);
  const [parcelas, setParcelas] = useState(12);
  const [juros, setJuros] = useState(20);

  const total = valor * (1 + juros / 100);
  const parcela = total / parcelas;

  return (
    <div>
      <PageHeader title="Novo Empréstimo" subtitle="Cadastre um novo contrato com simulação automática." icon={Sparkles} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-gradient-card p-6 shadow-card space-y-5">
          <h3 className="font-display text-lg font-semibold">Dados do contrato</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Cliente</Label>
              <Select>
                <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Teste Maria</SelectItem>
                  <SelectItem value="2">João Silva</SelectItem>
                  <SelectItem value="3">Pedro Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Consultor</Label>
              <Select>
                <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Rodrigo</SelectItem>
                  <SelectItem value="2">Eder</SelectItem>
                  <SelectItem value="3">Maria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Conta bancária</Label>
              <Select>
                <SelectTrigger className="bg-background/40"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Banco Rodrigo</SelectItem>
                  <SelectItem value="2">Banco Eder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Periodicidade</Label>
              <Select defaultValue="diaria">
                <SelectTrigger className="bg-background/40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="diaria">Diária</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="quinzenal">Quinzenal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Valor emprestado (R$)</Label>
              <Input type="number" value={valor} onChange={(e) => setValor(+e.target.value)} className="bg-background/40 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label>Parcelas</Label>
              <Input type="number" value={parcelas} onChange={(e) => setParcelas(+e.target.value)} className="bg-background/40 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label>Juros (%)</Label>
              <Input type="number" value={juros} onChange={(e) => setJuros(+e.target.value)} className="bg-background/40 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label>Data início</Label>
              <Input type="date" className="bg-background/40" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow">Criar empréstimo</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-gradient-card p-6 shadow-elegant h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-primary-glow" />
            <h3 className="font-display text-lg font-semibold">Simulação</h3>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-widest">Valor emprestado</dt>
              <dd className="font-display text-2xl font-bold">R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-widest">Total a receber</dt>
              <dd className="font-display text-2xl font-bold text-success">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-widest">Valor por parcela</dt>
              <dd className="font-display text-3xl font-bold text-gradient">R$ {parcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</dd>
            </div>
            <div className="pt-3 border-t border-border/40">
              <dt className="text-xs text-muted-foreground uppercase tracking-widest">Lucro previsto</dt>
              <dd className="font-display text-xl font-bold text-primary-glow">R$ {(total - valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
