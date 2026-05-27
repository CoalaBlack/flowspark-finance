import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { emprestimosStore } from "@/lib/emprestimos-store";
import { toast } from "sonner";

export const Route = createFileRoute("/consultor/editar/$numero")({ component: Page });

const opcoesCobranca = [
  "Seg - Sábado",
  "Seg - Domingo",
  "Seg - Sexta",
  "Semanal",
  "Quinzenal",
  "Mensal",
];

function Page() {
  const navigate = useNavigate();
  const { numero } = Route.useParams();
  const num = Number(numero);
  const original = emprestimosStore.get(num);

  const [valor, setValor] = useState(original?.valor ?? 0);
  const [juros, setJuros] = useState(original?.juros ?? 0);
  const [opcao, setOpcao] = useState(original?.opcaoCobranca ?? "");
  const [intervalo, setIntervalo] = useState(original?.intervalo ?? 1);
  const [datas, setDatas] = useState<Date[]>(
    () => (original?.vencimentos ?? []).map((d) => new Date(d + "T00:00:00")),
  );

  useEffect(() => {
    if (!original) {
      toast.error("Empréstimo não encontrado");
      navigate({ to: "/consultor/desfazer" });
    }
  }, [original, navigate]);

  const datasOrdenadas = useMemo(
    () => [...datas].sort((a, b) => a.getTime() - b.getTime()),
    [datas],
  );

  if (!original) return null;

  const parcelas = datas.length;
  const total = valor * (1 + juros / 100);
  const valorParcela = parcelas > 0 ? total / parcelas : 0;

  function salvar() {
    if (parcelas === 0) {
      toast.error("Selecione ao menos uma data de vencimento.");
      return;
    }
    emprestimosStore.update(num, {
      valor,
      juros,
      opcaoCobranca: opcao,
      intervalo,
      parcelas,
      vencimentos: datasOrdenadas.map((d) => d.toISOString().slice(0, 10)),
      total,
      valorParcela,
    });
    toast.success(`Empréstimo Nº${num} atualizado.`);
    navigate({ to: "/consultor/desfazer" });
  }

  return (
    <MobileShell title={`Editar Nº${num}`} back="/consultor/desfazer">
      <p className="text-center text-xs text-muted-foreground -mt-1 mb-4">
        Cliente: <span className="font-semibold text-foreground">{original.cliente}</span>
      </p>

      <div className="space-y-3">
        <Box label="Valor R$">
          <Input
            type="number"
            value={valor || ""}
            onChange={(e) => setValor(+e.target.value)}
            className="bg-background/40 h-11 font-mono"
          />
        </Box>
        <Box label="Percentual juros %">
          <Input
            type="number"
            value={juros || ""}
            onChange={(e) => setJuros(+e.target.value)}
            className="bg-background/40 h-11 font-mono"
          />
        </Box>
        <Box label="Intervalo parcelas (dias)">
          <Input
            type="number"
            value={intervalo}
            onChange={(e) => setIntervalo(+e.target.value)}
            className="bg-background/40 h-11 font-mono"
          />
        </Box>
        <Box label="Opção de cobrança">
          <Select value={opcao} onValueChange={setOpcao}>
            <SelectTrigger className="bg-background/40 h-11">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {opcoesCobranca.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Box>
        <Box label={`Datas de vencimento (${parcelas})`}>
          <p className="text-xs text-muted-foreground mb-2">
            Altere as datas de vencimento — elas aparecem na rota do dia do motoboy.
          </p>
          <div className="rounded-xl border border-border/50 bg-background/40 p-2">
            <Calendar
              mode="multiple"
              selected={datas}
              onSelect={(d) => setDatas(d ?? [])}
              className={cn("w-full pointer-events-auto")}
            />
          </div>
          {datasOrdenadas.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {datasOrdenadas.map((d, i) => (
                <span
                  key={d.toISOString()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-mono"
                >
                  <span className="text-muted-foreground">#{i + 1}</span>
                  {d.toLocaleDateString("pt-BR")}
                  <button
                    onClick={() => setDatas(datas.filter((x) => x.getTime() !== d.getTime()))}
                    className="opacity-60 hover:opacity-100 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Box>

        <div className="rounded-xl border border-primary/30 bg-card/30 p-3 text-sm font-mono space-y-1">
          <div className="flex justify-between"><span className="text-muted-foreground">Total:</span><span className="font-bold">R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Parcela:</span><span className="font-bold text-primary-glow">R${valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" onClick={() => navigate({ to: "/consultor/desfazer" })}>
            Cancelar
          </Button>
          <Button
            onClick={salvar}
            className="bg-gradient-primary text-primary-foreground shadow-glow"
          >
            Salvar
          </Button>
        </div>
      </div>
    </MobileShell>
  );
}

function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-3 space-y-1.5">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
