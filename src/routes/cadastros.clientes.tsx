import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserCircle2, Plus, Search, Printer, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

const initial: Cliente[] = [
  { id: 1, nome: "Teste João", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua Coronel Pacheco, 01 01", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", celular: "(11)85236-9800", celular2: "", email: "", limite: 500, criadoEm: "21/05/2026" },
  { id: 2, nome: "Teste José", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua Chanes, 10 10", bairro: "Jardim Santa Inês", cidade: "Guarulhos", celular: "(11)97978-9800", celular2: "", email: "", limite: 500, criadoEm: "22/05/2026" },
  { id: 3, nome: "Teste Maria", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", endereco: "Rua São Vicente das Minas, 10 10", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", celular: "(11)94978-9800", celular2: "", email: "", limite: 200, criadoEm: "22/05/2026" },
];

function exportCSV(rows: Cliente[]) {
  const headers = ["Cliente","Status","Endereço","Bairro","Cidade","Celular","Email","Limite","Criado em"];
  const lines = [headers.join(";")];
  rows.forEach((r) => lines.push([r.nome,r.status,r.endereco,r.bairro,r.cidade,r.celular,r.email,r.limite,r.criadoEm].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";")));
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "clientes.csv";
  a.click();
}

function Page() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Cliente[]>(initial);
  const filtered = data.filter((r) =>
    !query || Object.values(r).some((v) => String(v).toLowerCase().includes(query.toLowerCase())),
  );

  const handleNew = () => toast.info("Novo cliente", { description: "Formulário de cadastro em desenvolvimento." });
  const handleView = (r: Cliente) => toast.info(r.nome, { description: `${r.endereco} — ${r.celular}` });
  const handleEdit = (r: Cliente) => toast.info("Editar cliente", { description: r.nome });
  const handleDelete = (r: Cliente) => {
    if (confirm(`Excluir cliente "${r.nome}"?`)) {
      setData((p) => p.filter((x) => x.id !== r.id));
      toast.success("Cliente excluído");
    }
  };


  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary px-6 py-7 shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="relative flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur ring-2 ring-primary-foreground/30 shadow-lg">
            <UserCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground drop-shadow">Cadastro de Clientes</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">Gestão completa da sua carteira de clientes</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Total</p>
              <p className="text-xl font-bold text-primary-foreground">{data.length}</p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Limite Total</p>
              <p className="text-xl font-bold text-primary-foreground">
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
        <Button size="sm" className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
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
                        {r.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium whitespace-nowrap">{r.nome}</span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5">
                    <Badge variant="outline" className="border-success/40 text-success bg-success/5">{r.status}</Badge>
                  </td>
                  <td className="px-3 py-1.5 text-sm text-muted-foreground italic">{r.avaliacao}</td>
                  <td className="px-3 py-1.5 text-sm text-muted-foreground italic">{r.estabelecimento}</td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap">{r.endereco}</td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap">{r.bairro}</td>
                  <td className="px-3 py-1.5 text-sm">{r.cidade}</td>
                  <td className="px-3 py-1.5 text-sm font-mono whitespace-nowrap">{r.celular}</td>
                  <td className="px-3 py-1.5 text-sm font-mono text-muted-foreground">{r.celular2 || "—"}</td>
                  <td className="px-3 py-1.5 text-sm text-muted-foreground">{r.email || "—"}</td>
                  <td className="px-3 py-1.5 text-sm font-semibold text-right tabular-nums">
                    {r.limite.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 py-1.5">
                    <Badge variant="outline" className="border-success/40 text-success bg-success/5">{r.status}</Badge>
                  </td>
                  <td className="px-3 py-1.5 text-sm font-mono text-muted-foreground whitespace-nowrap">{r.criadoEm}</td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
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
          <span>{filtered.length} cliente{filtered.length !== 1 && "s"}</span>
          <span>Atualizado agora</span>
        </div>
      </div>
    </div>
  );
}
