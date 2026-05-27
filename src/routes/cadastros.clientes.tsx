import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserCircle2, Plus, Search, Printer, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCrud } from "@/hooks/use-crud";

export const Route = createFileRoute("/cadastros/clientes")({ component: Page });

type Cliente = {
  id: number;
  nome: string;
  apelido: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  sexo: string;
  estadoCivil: string;
  nomeMae: string;
  nomePai: string;
  profissao: string;
  rendaMensal: number;
  empresa: string;
  status: "Ativo" | "Inativo" | string;
  avaliacao: string;
  estabelecimento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  pontoReferencia: string;
  celular: string;
  celular2: string;
  telefoneFixo: string;
  email: string;
  referenciaNome: string;
  referenciaTelefone: string;
  referenciaParentesco: string;
  limite: number;
  observacoes: string;
  criadoEm: string;
};

const initial: Cliente[] = [
  { id: 1, nome: "Teste João", apelido: "João", cpf: "123.456.789-00", rg: "12.345.678-9", dataNascimento: "1985-03-15", sexo: "Masculino", estadoCivil: "Casado(a)", nomeMae: "Maria Silva", nomePai: "José Silva", profissao: "Comerciante", rendaMensal: 3500, empresa: "Mercadinho do João", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", cep: "07140-000", endereco: "Rua Coronel Pacheco", numero: "01", complemento: "Casa 01", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", uf: "SP", pontoReferencia: "Próximo ao mercado", celular: "(11)85236-9800", celular2: "", telefoneFixo: "", email: "", referenciaNome: "Pedro Souza", referenciaTelefone: "(11)98888-1111", referenciaParentesco: "Amigo", limite: 500, observacoes: "", criadoEm: "21/05/2026" },
  { id: 2, nome: "Teste José", apelido: "Zé", cpf: "987.654.321-00", rg: "98.765.432-1", dataNascimento: "1978-08-22", sexo: "Masculino", estadoCivil: "Solteiro(a)", nomeMae: "Ana Santos", nomePai: "Carlos Santos", profissao: "Pedreiro", rendaMensal: 2800, empresa: "Autônomo", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", cep: "07120-100", endereco: "Rua Chanes", numero: "10", complemento: "", bairro: "Jardim Santa Inês", cidade: "Guarulhos", uf: "SP", pontoReferencia: "", celular: "(11)97978-9800", celular2: "", telefoneFixo: "", email: "", referenciaNome: "", referenciaTelefone: "", referenciaParentesco: "", limite: 500, observacoes: "", criadoEm: "22/05/2026" },
  { id: 3, nome: "Teste Maria", apelido: "Mari", cpf: "456.789.123-00", rg: "45.678.912-3", dataNascimento: "1990-11-05", sexo: "Feminino", estadoCivil: "Divorciado(a)", nomeMae: "Joana Costa", nomePai: "Antônio Costa", profissao: "Cabeleireira", rendaMensal: 2200, empresa: "Salão da Mari", status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", cep: "07150-200", endereco: "Rua São Vicente das Minas", numero: "10", complemento: "", bairro: "Jardim Nova Tabôao", cidade: "Guarulhos", uf: "SP", pontoReferencia: "", celular: "(11)94978-9800", celular2: "", telefoneFixo: "", email: "", referenciaNome: "", referenciaTelefone: "", referenciaParentesco: "", limite: 200, observacoes: "", criadoEm: "22/05/2026" },
];

function exportCSV(rows: Cliente[]) {
  const headers = ["Cliente","CPF","RG","Nascimento","Status","CEP","Endereço","Nº","Bairro","Cidade","UF","Celular","Email","Profissão","Renda","Limite","Criado em"];
  const lines = [headers.join(";")];
  rows.forEach((r) => lines.push([r.nome,r.cpf,r.rg,r.dataNascimento,r.status,r.cep,r.endereco,r.numero,r.bairro,r.cidade,r.uf,r.celular,r.email,r.profissao,r.rendaMensal,r.limite,r.criadoEm].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";")));
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "clientes.csv";
  a.click();
}

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

function Page() {
  const [query, setQuery] = useState("");
  const today = new Date().toLocaleDateString("pt-BR");
  const crud = useCrud<Cliente>({
    initial,
    entityLabel: "Cliente",
    newLabel: "Novo Cliente",
    fields: [
      // Dados pessoais
      { name: "nome", label: "Nome completo", required: true, colSpan: 2 },
      { name: "apelido", label: "Apelido" },
      { name: "cpf", label: "CPF", placeholder: "000.000.000-00", required: true },
      { name: "rg", label: "RG", placeholder: "00.000.000-0" },
      { name: "dataNascimento", label: "Data de nascimento", type: "date" },
      { name: "sexo", label: "Sexo", type: "select", options: ["Masculino", "Feminino", "Outro", "Prefiro não informar"] },
      { name: "estadoCivil", label: "Estado civil", type: "select", options: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União estável"] },
      { name: "nomeMae", label: "Nome da mãe", colSpan: 2 },
      { name: "nomePai", label: "Nome do pai", colSpan: 2 },
      // Profissional
      { name: "profissao", label: "Profissão" },
      { name: "empresa", label: "Empresa / Local de trabalho" },
      { name: "rendaMensal", label: "Renda mensal (R$)", type: "number" },
      { name: "estabelecimento", label: "Tipo de estabelecimento", placeholder: "Tipo / Nome" },
      // Endereço
      { name: "cep", label: "CEP", placeholder: "00000-000" },
      { name: "endereco", label: "Endereço (Rua/Av)", colSpan: 2 },
      { name: "numero", label: "Número" },
      { name: "complemento", label: "Complemento" },
      { name: "bairro", label: "Bairro" },
      { name: "cidade", label: "Cidade" },
      { name: "uf", label: "UF", type: "select", options: UFS },
      { name: "pontoReferencia", label: "Ponto de referência", colSpan: 2 },
      // Contato
      { name: "celular", label: "Celular", type: "tel", placeholder: "(00)00000-0000", required: true },
      { name: "celular2", label: "Celular 2", type: "tel", placeholder: "(00)00000-0000" },
      { name: "telefoneFixo", label: "Telefone fixo", type: "tel", placeholder: "(00)0000-0000" },
      { name: "email", label: "Email", type: "email", colSpan: 2 },
      // Referência
      { name: "referenciaNome", label: "Referência - Nome" },
      { name: "referenciaTelefone", label: "Referência - Telefone", type: "tel" },
      { name: "referenciaParentesco", label: "Referência - Parentesco", placeholder: "Amigo, irmão, vizinho..." },
      // Comerciais
      { name: "status", label: "Status", type: "select", options: ["Ativo", "Inativo"], required: true },
      { name: "avaliacao", label: "Avaliação", type: "select", options: ["Não informado", "Excelente", "Bom", "Regular", "Ruim"] },
      { name: "limite", label: "Limite de crédito (R$)", type: "number" },
      { name: "observacoes", label: "Observações", type: "textarea", colSpan: 2 },
    ],
    defaults: () => ({ status: "Ativo", avaliacao: "Não informado", estabelecimento: "Não informado", uf: "SP", limite: 0, rendaMensal: 0, criadoEm: today }),
  });

  const filtered = crud.rows.filter((r) =>
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
            <UserCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground drop-shadow">Cadastro de Clientes</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">Gestão completa da sua carteira de clientes</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Total</p>
              <p className="text-xl font-bold text-primary-foreground">{crud.rows.length}</p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/15 px-4 py-2 backdrop-blur ring-1 ring-primary-foreground/20">
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80">Limite Total</p>
              <p className="text-xl font-bold text-primary-foreground">
                R$ {crud.rows.reduce((a, b) => a + Number(b.limite || 0), 0).toLocaleString("pt-BR")}
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
        <Button variant="outline" size="sm" className="gap-2" onClick={() => { toast.success("Preparando impressão..."); setTimeout(() => window.print(), 200); }}><Printer className="h-4 w-4" />Imprimir</Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => { exportCSV(filtered); toast.success("Exportado!"); }}><Download className="h-4 w-4" />Exportar</Button>
        <Button size="sm" className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90" onClick={crud.openCreate}>
          <Plus className="h-4 w-4" />Novo Cliente
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-gradient-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px]">
            <thead>
              <tr className="border-b border-border/50 bg-background/40">
                {["Cliente","Status","Avaliação","Estabelecimento","Endereço","Bairro","Cidade","Celular","Celular 2","Email","Limite R$","Criado em","Ações"].map((h, i) => (
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
                    <Badge variant="outline" className={r.status === "Ativo" ? "border-success/40 text-success bg-success/5" : "border-muted-foreground/40 text-muted-foreground"}>{r.status}</Badge>
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
                    {Number(r.limite).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 py-1.5 text-sm font-mono text-muted-foreground whitespace-nowrap">{r.criadoEm}</td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
                      <button onClick={() => crud.openView(r)} className="inline-flex items-center gap-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
                        <Eye className="h-3 w-3" />Exibir
                      </button>
                      <button onClick={() => crud.openEdit(r)} className="inline-flex items-center gap-1 rounded-md bg-muted hover:bg-muted/70 text-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
                        <Pencil className="h-3 w-3" />Editar
                      </button>
                      <button onClick={() => crud.remove(r)} className="inline-flex items-center gap-1 rounded-md bg-destructive hover:opacity-90 text-destructive-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-1 shadow-sm transition">
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

      {crud.dialog}
    </div>
  );
}
