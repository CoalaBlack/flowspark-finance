import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Calculator, CalendarDays, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/cobranca/novo-emprestimo")({ component: Page });

function Page() {
  const navigate = useNavigate();
  const [valor, setValor] = useState(1000);
  const [juros, setJuros] = useState(20);
  const [datas, setDatas] = useState<Date[]>([]);

  const datasOrdenadas = useMemo(
    () => [...datas].sort((a, b) => a.getTime() - b.getTime()),
    [datas],
  );

  const parcelas = datas.length || 1;
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
              <Label>Valor emprestado (R$)</Label>
              <Input type="number" value={valor} onChange={(e) => setValor(+e.target.value)} className="bg-background/40 font-mono" />
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

          <div className="pt-4 border-t border-border/40 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary-glow" />
                <div>
                  <h4 className="font-display text-base font-semibold">Datas de vencimento</h4>
                  <p className="text-xs text-muted-foreground">Clique nos dias do calendário para escolher quantas e quais parcelas terá.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/15 text-primary-glow text-xs font-mono px-3 py-1 border border-primary/30">
                  {datas.length} {datas.length === 1 ? "parcela" : "parcelas"}
                </span>
                {datas.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setDatas([])} className="h-7 text-xs">
                    Limpar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
              <div className="rounded-xl border border-border/50 bg-background/40 p-2 w-fit">
                <Calendar
                  mode="multiple"
                  selected={datas}
                  onSelect={(d) => setDatas(d ?? [])}
                  className={cn("p-2 pointer-events-auto")}
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-background/40 p-4 space-y-2 min-h-[200px]">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Datas selecionadas</div>
                {datasOrdenadas.length === 0 ? (
                  <div className="text-sm text-muted-foreground italic">Nenhuma data escolhida ainda.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {datasOrdenadas.map((d, i) => (
                      <div
                        key={d.toISOString()}
                        className="group inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-mono"
                      >
                        <span className="text-muted-foreground">#{i + 1}</span>
                        <span className="font-semibold">{d.toLocaleDateString("pt-BR")}</span>
                        <button
                          onClick={() => setDatas(datas.filter((x) => x.getTime() !== d.getTime()))}
                          className="opacity-60 hover:opacity-100 hover:text-destructive transition"
                          aria-label="Remover"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              <dt className="text-xs text-muted-foreground uppercase tracking-widest">Parcelas</dt>
              <dd className="font-display text-xl font-bold">{datas.length || 0}</dd>
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
