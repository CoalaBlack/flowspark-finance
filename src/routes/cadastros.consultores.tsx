import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, Plus, Search, Printer, Download, Eye, Pencil, Trash2, ArrowDownUp, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/cadastros/consultores")({ component: Page });

type Consultor = {
  id: number;
  nome: string;
  cep: string;
  endereco: string;
  bairro: string;
  complemento: string;
  cidade: string;
  fone: string;
  celular: string;
  usuarioApp: string;
  senhaApp: string;
  cpf: string;
  saldo: number;
};

const data: Consultor[] = [
  { id: 1, nome: "Douglas", cep: "00000-000", endereco: "Não informado", bairro: "Não informado", complemento: "Não informado", cidade: "Não informado", fone: "(00)0000-0000", celular: "(00)00000-0000", usuarioApp: "douglas", senhaApp: "dudux", cpf: "", saldo: 0 },
  { id: 2, nome: "Rodrigo", cep: "07134-380", endereco: "Rua Dores R. Pedras", bairro: "Jardim Santa Emilia", complemento: "", cidade: "Guarulhos", fone: "", celular: "(11)94545-8877", usuarioApp: "rodrigo", senhaApp: "mane", cpf: "333.477.112-33", saldo: 28998 },
];

function Page() {
  const [query, setQuery] = useState("");
  const filtered = data.filter((r) =>
    !query || Object.values(r).some((v) => String(v).toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary px-6 py-7 shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="relative flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur ring-2 ring-primary-foreground/30 shadow-lg">
            <Bike className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground drop-shadow">Cadastro de Consultores</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">Gerencie sua equipe de cobrança em rota</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Consultores</p>
              <p className="text-xl font-bold text-primary-foreground">{data.length}</p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Saldo Total</p>
              <p className="text-xl font-bold text-primary-foreground">
                R$ {data.reduce((a, b) => a + b.saldo, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-border/50 bg-gradient-card p-4 shadow-card flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar consultor, endereço, usuário..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-background/40 border-border/60"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" />Imprimir</Button>
        <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Exportar</Button>
        <Button size="sm" className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="h-4 w-4" />Novo Consultor
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-gradient-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px]">
            <thead>
              <tr className="border-b border-border/50 bg-background/40">
                {["Nome","Cep","Endereço","Bairro","Complemento","Cidade","Fone","Celular","Usuário app","Senha app","CPF","Saldo atual $","Foto","Ações"].map((h, i) => (
                  <th key={i} className="px-3 py-1.5 text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-primary/5 transition-colors" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0 shadow">
                        {r.nome[0]}
                      </div>
                      <span className="font-medium whitespace-nowrap">{r.nome}</span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5 text-sm font-mono whitespace-nowrap">{r.cep}</td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap">{r.endereco}</td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap">{r.bairro}</td>
                  <td className="px-3 py-1.5 text-sm text-muted-foreground italic">{r.complemento || "—"}</td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap">{r.cidade}</td>
                  <td className="px-3 py-1.5 text-sm font-mono text-muted-foreground whitespace-nowrap">{r.fone || "—"}</td>
                  <td className="px-3 py-1.5 text-sm font-mono whitespace-nowrap">{r.celular}</td>
                  <td className="px-3 py-1.5 text-sm font-mono">{r.usuarioApp}</td>
                  <td className="px-3 py-1.5 text-sm font-mono text-muted-foreground">{"•".repeat(r.senhaApp.length)}</td>
                  <td className="px-3 py-1.5 text-sm font-mono whitespace-nowrap">{r.cpf || "—"}</td>
                  <td className="px-3 py-1.5 text-sm font-semibold text-right tabular-nums whitespace-nowrap">
                    {r.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 py-1.5">
                    <div className="h-7 w-7 rounded-md border border-dashed border-border/70 bg-background/40 flex items-center justify-center text-muted-foreground">
                      <ImageOff className="h-4 w-4" />
                    </div>
                  </td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 rounded-md bg-gradient-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm hover:opacity-90 transition">
                        <ArrowDownUp className="h-3 w-3" />Adição / Retirada
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
                        <Eye className="h-3 w-3" />Exibir
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-muted hover:bg-muted/70 text-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
                        <Pencil className="h-3 w-3" />Editar
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-destructive hover:opacity-90 text-destructive-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
                        <Trash2 className="h-3 w-3" />Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 text-xs text-muted-foreground border-t border-border/50 flex items-center justify-between">
          <span>{filtered.length} consultor{filtered.length !== 1 && "es"}</span>
          <span>Atualizado agora</span>
        </div>
      </div>
    </div>
  );
}
