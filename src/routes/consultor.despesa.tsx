import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/consultor/despesa")({ component: Page });

function Page() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [valor, setValor] = useState(0);
  return (
    <MobileShell title="Cadastro Despesa" back="/consultor">
      <div className="space-y-3">
        <Field label="Descrição">
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="bg-background/40" />
        </Field>
        <Field label="Valor R$">
          <Input
            type="number"
            value={valor || ""}
            onChange={(e) => setValor(+e.target.value)}
            className="bg-background/40 h-11 font-mono"
          />
        </Field>
        <Field label="Data">
          <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="bg-background/40 h-11" />
        </Field>
        <Button
          className="w-full bg-gradient-primary text-primary-foreground shadow-glow h-12"
          onClick={() => {
            if (!desc || !valor) { toast.error("Preencha todos os campos."); return; }
            toast.success("Despesa cadastrada!");
            navigate({ to: "/consultor" });
          }}
        >
          Salvar despesa
        </Button>
      </div>
    </MobileShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-3 space-y-1.5">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
