import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanBarcode,
  CreditCard,
  UserPlus,
  FolderOpen,
  Info,
  FileSearch,
  FileText,
  Calculator,
  RotateCcw,
} from "lucide-react";
import { HomeShell } from "@/components/consultor/mobile-shell";

export const Route = createFileRoute("/consultor/")({ component: Page });

const items = [
  { to: "/consultor/qrcode", label: "Escanear QRcode", icon: ScanBarcode },
  { to: "/consultor/despesa", label: "Cadastro Despesa", icon: CreditCard },
  { to: "/consultor/cadastrar-cliente", label: "Cadastrar Cliente", icon: UserPlus },
  { to: "/consultor/rota", label: "Rota Cobrança", icon: FolderOpen },
  { to: "/consultor/informacoes", label: "Informações", icon: Info },
  { to: "/consultor/consultar", label: "Consultar", icon: FileSearch },
  { to: "/consultor/novo-emprestimo", label: "Novo empréstimo", icon: FileText },
  { to: "/consultor/fechamento", label: "Fechamento", icon: Calculator },
  { to: "/consultor/desfazer", label: "Desfazer Empréstimos", icon: RotateCcw },
] as const;

function Page() {
  return (
    <HomeShell>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border/50 bg-gradient-card p-4 shadow-card transition-all hover:border-primary/40 hover:shadow-glow active:scale-95"
          >
            <it.icon className="h-9 w-9 text-foreground/70 group-hover:text-primary-glow transition-colors" />
            <span className="text-center text-sm font-medium text-foreground/80">
              {it.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-primary/30 bg-gradient-card p-4 shadow-elegant">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-base font-semibold">Nossas novidades</h3>
        </div>
        <div className="rounded-xl border border-border/50 bg-background/40 p-4">
          <div className="font-display text-base font-bold">
            <span className="text-primary-glow">Get</span>Controller
          </div>
          <p className="mt-1 text-sm text-success">Olá, bem vindo ao futuro.</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Ative o IAConnect e descubra como é fácil controlar suas cobranças e
            clientes através do GetController.
          </p>
        </div>
      </div>
    </HomeShell>
  );
}
