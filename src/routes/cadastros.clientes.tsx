import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserCircle2, Plus, Search, Printer, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/cadastros/clientes")({ component: Page });

type Cliente = {
  id: number;
  nome: string;
  status: "Ativo" | "Inativo";
  avaliacao: string;
  estabelecimento: string;
  endereco: string;
  bairro: string;
  cidade: string;
  celular: string;
  celular2: string;
  email: string;
  limite: number;
  criadoEm: string;
};

const data: Cliente[] = [
  { id: 1, nome: "Teste João", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua Coronel Pacheco, 01 01", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", celular: "(11)85236-9800", celular2: "", email: "", limite: 500, criadoEm: "21/05/2026" },
  { id: 2, nome: "Teste José", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua Chanes, 10 10", bairro: "Jardim Santa Inês", cidade: "Guarulhos", celular: "(11)97978-9800", celular2: "", email: "", limite: 500, criadoEm: "22/05/2026" },
  { id: 3, nome: "Teste Maria", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua São Vicente das Minas, 10 10", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", celular: "(11)94978-9800", celular2: "", email: "", limite: 200, criadoEm: "22/05/2026" },
];

function Page() {
  const [query, setQuery] = useState("");
  const filtered = data.filter((r) =>
    !query || Object.values(r).some((v) => String(v).toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Orange hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 px-6 py-7 shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur ring-2 ring-white/40 shadow-lg">
            <UserCircle2 className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow">Cadastro de Clientes</h1>
            <p className="text-sm text-white/85 mt-1">Gestão completa da sua carteira de clientes</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-2 backdrop-blur ring-1 ring-white/20">
              <p className="text-[10px] uppercase tracking-wider text-white/80">Total</p>
              <p className="text-xl font-bold text-white">{data.length}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-2 backdrop-blur ring-1 ring-white/20">
              <p className="text-[10px] uppercase tracking-wider text-white/80">Limite Total</p>
              <p className="text-xl font-bold text-white">
                R$ {data.reduce((a, b) => a + b.limite, 0).toLocaleString("pt-BR")}
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
            placeholder="Buscar cliente, endereço, bairro..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-background/40 border-border/60"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" />Imprimir</Button>
        <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Exportar</Button>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-glow hover:opacity-90">
          <Plus className="h-4 w-4" />Novo Cliente
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-gradient-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px]">
            <thead>
              <tr className="border-b border-border/50 bg-background/40">
                {["Cliente","Status","Avaliação","Estabelecimento","Endereço","Bairro","Cidade","Celular","Celular 2","Email","Limite R$","Status","Criado em","Ações"].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-orange-500/5 transition-colors" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow">
                        {r.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium whitespace-nowrap">{r.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="border-success/40 text-success bg-success/5">{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground italic">{r.avaliacao}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground italic">{r.estabelecimento}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{r.endereco}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{r.bairro}</td>
                  <td className="px-4 py-3 text-sm">{r.cidade}</td>
                  <td className="px-4 py-3 text-sm font-mono whitespace-nowrap">{r.celular}</td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{r.celular2 || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{r.email || "—"}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-right tabular-nums">
                    {r.limite.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="border-success/40 text-success bg-success/5">{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground whitespace-nowrap">{r.criadoEm}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-md bg-slate-500/90 hover:bg-slate-600 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 shadow-sm transition">
                        <Eye className="h-3 w-3" />Exibir
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-slate-400/90 hover:bg-slate-500 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 shadow-sm transition">
                        <Pencil className="h-3 w-3" />Editar
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-90 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 shadow-sm transition">
                        <Trash2 className="h-3 w-3" />Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border/50 flex items-center justify-between">
          <span>{filtered.length} cliente{filtered.length !== 1 && "s"}</span>
          <span>Atualizado agora</span>
        </div>
      </div>
    </div>
  );
}
