import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  UserPlus,
  Info,
  FileSearch,
  FileText,
  Calculator,
  RotateCcw,
  Map,
  LogOut,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEmprestimos } from "@/lib/emprestimos-store";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/consultor/")({ component: Page });

const tiles = [
  { to: "/consultor/despesa", label: "Cadastro Despesa", icon: CreditCard, color: "violet" },
  { to: "/consultor/cadastrar-cliente", label: "Cadastrar Cliente", icon: UserPlus, color: "blue" },
  { to: "/consultor/informacoes", label: "Informações", icon: Info, color: "cyan" },
  { to: "/consultor/consultar", label: "Consultar", icon: FileSearch, color: "amber" },
  { to: "/consultor/novo-emprestimo", label: "Novo empréstimo", icon: FileText, color: "orange" },
  { to: "/consultor/fechamento", label: "Fechamento", icon: Calculator, color: "emerald" },
  { to: "/consultor/desfazer", label: "Desfazer Empréstimos", icon: RotateCcw, color: "rose" },
] as const;

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-300",  ring: "group-hover:ring-violet-400/40" },
  blue:    { bg: "bg-blue-500/10",    text: "text-blue-300",    ring: "group-hover:ring-blue-400/40" },
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-300",    ring: "group-hover:ring-cyan-400/40" },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-300",   ring: "group-hover:ring-amber-400/40" },
  orange:  { bg: "bg-orange-500/10",  text: "text-orange-300",  ring: "group-hover:ring-orange-400/40" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-300", ring: "group-hover:ring-emerald-400/40" },
  rose:    { bg: "bg-rose-500/10",    text: "text-rose-300",    ring: "group-hover:ring-rose-400/40" },
};

function Page() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-[#050614] text-slate-100 px-5 pt-6 pb-24 relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-violet-600/15 blur-[90px]" />

      {/* header */}
      <header className="relative flex items-start justify-between mb-7">
        <div>
          <h1 className="font-display text-xl font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
            GetController
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-sm text-slate-400">
              Olá, <span className="text-white font-medium">José</span>
            </p>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-mono">
              /50/d!
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 hover:bg-white/10 active:scale-95 transition"
        >
          <LogOut className="h-3.5 w-3.5 text-slate-400" />
          Sair
        </Link>
      </header>

      {/* Featured: Rota Cobrança */}
      <Link to="/consultor/rota" className="relative block mb-4 group active:scale-[0.98] transition">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-violet-600/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition" />
        <div className="relative flex items-center gap-4 p-5 rounded-3xl bg-indigo-950/50 border border-indigo-500/30 backdrop-blur-md">
          <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-300">
            <Map className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-white">Rota Cobrança</h3>
            <p className="text-xs text-slate-400">Ver roteiro do dia</p>
          </div>
          <ArrowRight className="h-5 w-5 text-indigo-300/70 group-hover:translate-x-0.5 transition" />
        </div>
      </Link>

      {/* Action tiles */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {tiles.map((t, i) => {
          const c = colorMap[t.color];
          const isLastOdd = i === tiles.length - 1 && tiles.length % 2 === 1;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`group p-4 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-center min-h-[120px] ring-1 ring-transparent transition hover:bg-white/[0.07] active:scale-95 ${c.ring} ${isLastOdd ? "col-span-2" : ""}`}
            >
              <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
                <t.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium leading-tight text-slate-200">{t.label}</span>
            </Link>
          );
        })}
      </div>

      {/* News */}
      <div className="relative">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-slate-300">Nossas novidades</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121431] to-[#0A0B1E] border border-white/10 relative overflow-hidden shadow-elegant">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-600/20 blur-[40px]" />
          <div className="absolute -left-8 -bottom-10 w-32 h-32 bg-violet-600/10 blur-[40px]" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-3">
              <Sparkles className="h-3 w-3" /> IAConnect
            </div>
            <h3 className="text-lg font-bold mb-1 text-white">
              <span className="bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">Get</span>Controller
            </h3>
            <h4 className="text-emerald-400 text-sm font-semibold mb-3">Olá, bem vindo ao futuro.</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Descubra como é fácil controlar suas cobranças e clientes através do GetController.
            </p>
            <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition">
              Saiba mais
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-12 h-1 rounded-full bg-white/10" />
      </div>
    </div>
  );
}
