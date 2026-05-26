import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  CreditCard,
  FileText,
  ChevronDown,
  LogOut,
  TrendingUp,
  Route as RouteIcon,
  UserCheck,
  Tag,
  Building2,
  Wallet,
  Receipt,
  HandCoins,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  PiggyBank,
  Banknote,
  FileSearch,
  Send,
  Sparkles,
  UserSquare2,
  CalendarDays,
  Truck,
  Store,
  UserCog,
  AlertTriangle,
  Smartphone,
  ScrollText,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SubItem = { title: string; url: string };
type MenuItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  url?: string;
  items?: SubItem[];
};

const menu: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  {
    title: "Cadastros",
    icon: Users,
    items: [
      { title: "Categorias", url: "/cadastros/categorias" },
      { title: "Centros de Custo", url: "/cadastros/centros-custo" },
      { title: "Clientes", url: "/cadastros/clientes" },
      { title: "Consultores", url: "/cadastros/consultores" },
      { title: "Contas Bancárias", url: "/cadastros/contas-bancarias" },
      { title: "Credor Promissória", url: "/cadastros/credor-promissoria" },
      { title: "Feriados", url: "/cadastros/feriados" },
      { title: "Formas de Recebimento", url: "/cadastros/formas-recebimento" },
      { title: "Fornecedores", url: "/cadastros/fornecedores" },
      { title: "Rotas", url: "/cadastros/rotas" },
      { title: "Tipo Estabelecimento", url: "/cadastros/tipo-estabelecimento" },
      { title: "Usuários", url: "/cadastros/usuarios" },
    ],
  },
  {
    title: "Movimentações",
    icon: ArrowLeftRight,
    items: [
      { title: "Empréstimos", url: "/cobranca/emprestimos" },
      { title: "Empréstimos Vencidos", url: "/movimentacoes/emprestimos-vencidos" },
      { title: "Histórico Apps", url: "/movimentacoes/historico-apps" },
      { title: "Log de Atividades", url: "/movimentacoes/log-atividades" },
      { title: "Aportes / Retiradas", url: "/movimentacoes/aportes-retiradas" },
      { title: "Transferência de Rotas", url: "/movimentacoes/transferencia-rotas" },
      { title: "Receitas", url: "/movimentacoes/receitas" },
      { title: "Despesas", url: "/movimentacoes/despesas" },
      { title: "Transferências", url: "/movimentacoes/transferencias" },
      { title: "Troca de Cheques", url: "/movimentacoes/troca-cheques" },
    ],
  },
  {
    title: "Financeiro",
    icon: CreditCard,
    items: [
      { title: "Contas a Pagar", url: "/financeiro/contas-pagar" },
      { title: "Contas a Receber", url: "/financeiro/contas-receber" },
      { title: "Fluxo de Caixa", url: "/financeiro/fluxo-caixa" },
      { title: "Conciliação Bancária", url: "/financeiro/conciliacao" },
    ],
  },
  {
    title: "Gestão e Cobrança",
    icon: FileText,
    items: [
      { title: "Empréstimos", url: "/cobranca/emprestimos" },
      { title: "Novo Empréstimo", url: "/cobranca/novo-emprestimo" },
      { title: "Cobranças do Dia", url: "/cobranca/cobrancas-dia" },
      { title: "Transferir Empréstimos", url: "/cobranca/transferir" },
      { title: "Renegociações", url: "/cobranca/renegociacoes" },
    ],
  },
  { title: "Análise de Consultores", icon: UserCheck, url: "/analise/consultores" },
  { title: "Análise de Empréstimos", icon: TrendingUp, url: "/analise/emprestimos" },
  { title: "Análise de Rotas", icon: RouteIcon, url: "/analise/rotas" },
];

const subIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Categorias: Tag,
  "Centros de Custo": Building2,
  Clientes: Users,
  Consultores: UserCheck,
  "Contas Bancárias": Wallet,
  "Credor Promissória": UserSquare2,
  Feriados: CalendarDays,
  "Formas de Recebimento": HandCoins,
  Fornecedores: Truck,
  Rotas: RouteIcon,
  "Tipo Estabelecimento": Store,
  Usuários: UserCog,
  Receitas: ArrowDownToLine,
  Despesas: ArrowUpFromLine,
  Transferências: Repeat,
  "Troca de Cheques": Receipt,
  "Empréstimos Vencidos": AlertTriangle,
  "Histórico Apps": Smartphone,
  "Log de Atividades": ScrollText,
  "Aportes / Retiradas": Wallet,
  "Transferência de Rotas": Send,
  "Contas a Pagar": Banknote,
  "Contas a Receber": PiggyBank,
  "Fluxo de Caixa": TrendingUp,
  "Conciliação Bancária": FileSearch,
  Empréstimos: HandCoins,
  "Novo Empréstimo": Sparkles,
  "Cobranças do Dia": Receipt,
  "Transferir Empréstimos": Send,
  Renegociações: Repeat,
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));
  const groupHasActive = (items?: SubItem[]) => items?.some((i) => isActive(i.url)) ?? false;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(menu.filter((m) => m.items).map((m) => [m.title, groupHasActive(m.items)])),
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border h-16 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <div className="relative h-9 w-9 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="font-display text-base font-bold text-primary-foreground">GC</span>
            <div className="absolute inset-0 rounded-xl animate-pulse-glow" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-sidebar-foreground">
                GetController
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Cobranças Pro
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/70 px-2">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menu.map((item) => {
                const Icon = item.icon;
                if (item.items) {
                  const open = openGroups[item.title];
                  const hasActive = groupHasActive(item.items);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() =>
                          setOpenGroups((s) => ({ ...s, [item.title]: !s[item.title] }))
                        }
                        isActive={hasActive}
                        className={cn(
                          "group/btn h-10 rounded-lg transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          hasActive &&
                            "bg-sidebar-accent/70 text-sidebar-accent-foreground shadow-sm",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left font-medium">{item.title}</span>
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 transition-transform duration-300",
                                open && "rotate-180",
                              )}
                            />
                          </>
                        )}
                      </SidebarMenuButton>
                      {!collapsed && open && (
                        <SidebarMenuSub className="border-l-sidebar-border ml-4 mt-1 animate-fade-in">
                          {item.items.map((sub) => {
                            const SubIcon = subIcons[sub.title];
                            const active = isActive(sub.url);
                            return (
                              <SidebarMenuSubItem key={sub.url}>
                                <SidebarMenuSubButton asChild isActive={active}>
                                  <Link
                                    to={sub.url}
                                    className={cn(
                                      "group flex items-center gap-2 rounded-md py-1.5 text-sm transition-all",
                                      "hover:bg-sidebar-accent/70 hover:translate-x-0.5",
                                      active &&
                                        "bg-gradient-primary text-primary-foreground font-medium shadow-glow",
                                    )}
                                  >
                                    {SubIcon && <SubIcon className="h-3.5 w-3.5 shrink-0 opacity-80" />}
                                    <span>{sub.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }
                const active = isActive(item.url!);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "h-10 rounded-lg transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        active &&
                          "bg-gradient-primary text-primary-foreground shadow-glow hover:bg-gradient-primary hover:text-primary-foreground",
                      )}
                    >
                      <Link to={item.url!}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="font-medium">Sair</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
