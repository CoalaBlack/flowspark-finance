import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/movimentacoes/transferencia-rotas")({ component: Page });

function Page() {
  return (
    <div>
      <PageHeader title="Transferências de Rota" subtitle="Transfira empréstimos entre consultores em poucos passos." icon={Send} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-2xl border border-border/50 bg-gradient-card p-6 space-y-4">
          <div className="space-y-2">
            <Label>Consultor atual</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rodrigo">Rodrigo</SelectItem>
                <SelectItem value="eder">Eder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="fin" />
            <Label htmlFor="fin" className="text-sm font-normal">Somente empréstimos finalizados</Label>
          </div>
          <Button className="w-full bg-gradient-primary shadow-glow">Consultar</Button>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-gradient-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Como funciona</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            {[
              "Informe o nome do atual consultor e clique em Consultar.",
              "Selecione quais são os empréstimos que serão transferidos.",
              "Selecione qual é o consultor que irá tomar conta dos empréstimos.",
              "Por fim clique no botão Transferir.",
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground italic">
            Observação: Caso precise transferir empréstimos já finalizados (nos últimos 2 meses), marque a opção acima.
          </p>
        </div>
      </div>
    </div>
  );
}
