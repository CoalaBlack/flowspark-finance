import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Pencil } from "lucide-react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { emprestimosStore, useEmprestimos } from "@/lib/emprestimos-store";

export const Route = createFileRoute("/consultor/desfazer")({ component: Page });

function Page() {
  const lista = useEmprestimos();
  const [q, setQ] = useState("");
  const [alvo, setAlvo] = useState<{ numero: number; cliente: string } | null>(null);
  const [success, setSuccess] = useState(false);

  const filtrada = lista.filter(
    (e) =>
      !q ||
      e.cliente.toLowerCase().includes(q.toLowerCase()) ||
      String(e.numero).includes(q),
  );

  return (
    <MobileShell title="Desfazer Empréstimos" back="/consultor">
      <div className="rounded-xl border border-border/50 bg-card/30 p-2 mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground ml-1" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar..."
          className="border-0 bg-transparent h-9 focus-visible:ring-0"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-3">
        Selecione o empréstimo que deseja desfazer:
      </p>

      {filtrada.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
          Nenhum empréstimo cadastrado ainda.
        </div>
      ) : (
        <ul className="space-y-2">
          {filtrada.map((e) => (
            <li
              key={e.numero}
              className="rounded-xl border border-border/50 bg-gradient-card p-3 shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  onClick={() => setAlvo({ numero: e.numero, cliente: e.cliente })}
                  className="text-left flex-1"
                >
                  <div className="text-xs text-muted-foreground">
                    Empréstimo Nº{e.numero}
                  </div>
                  <div className="font-semibold">{e.cliente}</div>
                  <div className="text-sm font-mono text-muted-foreground">
                    Valor R${e.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </button>
                <Link
                  to="/consultor/editar/$numero"
                  params={{ numero: String(e.numero) }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 hover:border-primary/40"
                  aria-label="Editar"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!alvo} onOpenChange={(o) => !o && setAlvo(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-xl">Atenção!</DialogTitle>
            <DialogDescription className="text-center">
              Você realmente deseja desfazer o empréstimo Nº{alvo?.numero} do cliente: {alvo?.cliente}?
              <br />
              <span className="text-xs">O valor será estornado para o caixa.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setAlvo(null)}>Cancelar</Button>
            <Button
              className="bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => {
                if (alvo) {
                  emprestimosStore.remove(alvo.numero);
                  setAlvo(null);
                  setSuccess(true);
                }
              }}
            >
              Sim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-xl">Parabéns!</DialogTitle>
            <DialogDescription className="text-center">
              Empréstimo excluído. Valor estornado para o caixa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => setSuccess(false)}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
}
