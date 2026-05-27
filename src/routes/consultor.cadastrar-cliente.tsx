import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/consultor/cadastrar-cliente")({ component: Page });

function Page() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [end, setEnd] = useState("");
  return (
    <MobileShell title="Cadastrar Cliente" back="/consultor">
      <div className="space-y-3">
        <Field label="Nome completo">
          <Input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="Telefone">
          <Input value={tel} onChange={(e) => setTel(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="Endereço">
          <Input value={end} onChange={(e) => setEnd(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Button
          className="w-full bg-gradient-primary text-primary-foreground shadow-glow h-12"
          onClick={() => {
            if (!nome) { toast.error("Informe o nome do cliente."); return; }
            toast.success(`Cliente "${nome}" cadastrado!`);
            navigate({ to: "/consultor" });
          }}
        >
          Salvar cliente
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
