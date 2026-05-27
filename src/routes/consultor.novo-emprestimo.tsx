import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { emprestimosStore } from "@/lib/emprestimos-store";

export const Route = createFileRoute("/consultor/novo-emprestimo")({ component: Page });

const clientes = ["Koal", "Teste Maria", "João Silva", "Pedro Santos", "Ana Costa"];
const opcoesCobranca = [
  "Seg - Sábado",
  "Seg - Domingo",
  "Seg - Sexta",
  "Semanal",
  "Quinzenal",
  "Mensal",
];

function fmtBR(d: Date) {
  return d.toLocaleDateString("pt-BR");
}

function Page() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState("");
  const [dataLanc, setDataLanc] = useState(() => new Date().toISOString().slice(0, 10));
  const [valor, setValor] = useState(0);
  const [juros, setJuros] = useState(0);
  const [intervalo, setIntervalo] = useState(1);
  const [opcao, setOpcao] = useState("");
  const [datas, setDatas] = useState<Date[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [numero, setNumero] = useState<number | null>(null);

  const datasOrdenadas = useMemo(
    () => [...datas].sort((a, b) => a.getTime() - b.getTime()),
    [datas],
  );

  const parcelas = datas.length;
  const total = valor * (1 + juros / 100);
  const valorParcela = parcelas > 0 ? total / parcelas : 0;

  function validate() {
    if (!cliente) return "Selecione o cliente.";
    if (!valor || valor <= 0) return "Informe o valor do empréstimo.";
    if (!parcelas) return "Selecione ao menos uma data de vencimento.";
    if (!opcao) return "Selecione a opção de cobrança.";
    return null;
  }

  function handleEnviar() {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    setConfirmOpen(true);
  }

  function confirmar() {
    const novo = emprestimosStore.add({
      cliente,
      consultor: "José /50/d",
      dataLancamento: dataLanc,
      valor,
      juros,
      parcelas,
      intervalo,
      opcaoCobranca: opcao,
      vencimentos: datasOrdenadas.map((d) => d.toISOString().slice(0, 10)),
      total,
      valorParcela,
    });
    setNumero(novo.numero);
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  return (
    <MobileShell title="Gerar Empréstimo" back="/consultor">
      <p className="text-center text-xs text-muted-foreground -mt-1 mb-4">
        Tipo cálculo: Juros Simples
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Para validação dos dados selecione o cliente e preencha todos os campos
        em <span className="text-primary-glow font-medium">destaque</span> que são obrigatórios.
      </p>

      <div className="space-y-3">
        <Field label="Cliente selecionado:" required highlight={!cliente}>
          <Select value={cliente} onValueChange={setCliente}>
            <SelectTrigger className="bg-background/40 h-11">
              <SelectValue placeholder="Localize o cliente..." />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {cliente && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Crédito disponível R$0,00
            </div>
          )}
        </Field>

        <Field label="Data lançamento:">
          <Input
            type="date"
            value={dataLanc}
            onChange={(e) => setDataLanc(e.target.value)}
            className="bg-background/40 h-11"
          />
        </Field>

        <Field label="Valor R$:" required highlight={!valor}>
          <Input
            type="number"
            value={valor || ""}
            onChange={(e) => setValor(+e.target.value)}
            placeholder="0,00"
            className="bg-background/40 h-11 font-mono"
          />
        </Field>

        <Field label="Percentual juros %:" required highlight={!juros}>
          <Input
            type="number"
            value={juros || ""}
            onChange={(e) => setJuros(+e.target.value)}
            placeholder="0,00"
            className="bg-background/40 h-11 font-mono"
          />
        </Field>

        <Field
          label={`Quantidade de parcelas: ${parcelas}`}
          required
          highlight={parcelas === 0}
        >
          <p className="text-xs text-muted-foreground mb-2">
            Toque nos dias do calendário para marcar e desmarcar as datas de
            vencimento das parcelas.
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
                  {fmtBR(d)}
                  <button
                    onClick={() => setDatas(datas.filter((x) => x.getTime() !== d.getTime()))}
                    className="opacity-60 hover:opacity-100 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setDatas([])}
                className="text-[11px] underline text-muted-foreground ml-1"
              >
                limpar
              </button>
            </div>
          )}
        </Field>

        <Field label="Intervalo parcelas (dias):">
          <Input
            type="number"
            value={intervalo}
            onChange={(e) => setIntervalo(+e.target.value)}
            className="bg-background/40 h-11 font-mono"
          />
        </Field>

        <Field label="Opção de cobrança:" required highlight={!opcao}>
          <Select value={opcao} onValueChange={setOpcao}>
            <SelectTrigger className="bg-background/40 h-11">
              <SelectValue placeholder="Selecione:" />
            </SelectTrigger>
            <SelectContent>
              {opcoesCobranca.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="pt-2 flex justify-end">
          <Button
            onClick={handleEnviar}
            className="bg-gradient-primary text-primary-foreground shadow-glow h-12 px-8 text-base font-semibold"
          >
            Enviar
          </Button>
        </div>
      </div>

      {/* Confirm dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-xl">Tudo pronto!</DialogTitle>
            <DialogDescription className="text-center">
              Podemos gerar esta operação?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1 text-sm font-mono px-2">
            <Row label="Cliente" value={cliente} />
            <Row label="Valor R$" value={valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} />
            <Row label="Juros" value={`${juros.toFixed(2)}%`} />
            <Row label="Parcelas" value={String(parcelas)} />
            <Row label="Intervalo" value={`${intervalo} dia(s)`} />
            <Row label="Opção cobrança" value={opcao} />
            <Row label="Valor parcela R$" value={valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} />
            <Row label="Total geral R$" value={total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
            <Button
              onClick={confirmar}
              className="bg-gradient-primary text-primary-foreground shadow-glow"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
      <Dialog
        open={successOpen}
        onOpenChange={(o) => {
          setSuccessOpen(o);
          if (!o) navigate({ to: "/consultor" });
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-xl">Parabéns!</DialogTitle>
            <DialogDescription className="text-center">
              Empréstimo Nº {numero} cadastrado com sucesso!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => {
                setSuccessOpen(false);
                navigate({ to: "/consultor" });
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
}

function Field({
  label,
  children,
  required,
  highlight,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card/30 p-3 space-y-1.5 transition-colors",
        highlight && required ? "border-primary/60" : "border-border/50",
      )}
    >
      <Label className={cn("text-xs uppercase tracking-wide", highlight && required ? "text-primary-glow" : "text-muted-foreground")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
