import { useState } from "react";
import { Plus, Search, Printer, Download, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchKeys,
  onNew,
  newLabel = "Novo",
  emptyMessage = "Nenhum registro encontrado",
}: {
  columns: Column<T>[];
  data: T[];
  searchKeys?: (keyof T)[];
  onNew?: () => void;
  newLabel?: string;
  emptyMessage?: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = data.filter((row) => {
    if (!query) return true;
    const keys = searchKeys ?? (Object.keys(row) as (keyof T)[]);
    return keys.some((k) =>
      String(row[k] ?? "").toLowerCase().includes(query.toLowerCase()),
    );
  });

  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-card overflow-hidden shadow-card animate-fade-in">
      <div className="flex items-center gap-2 p-4 border-b border-border/50 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-background/40 border-border/60"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Printer className="h-4 w-4" /> Imprimir
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Exportar
        </Button>
        {onNew && (
          <Button
            size="sm"
            onClick={onNew}
            className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> {newLabel}
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-background/30">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={`px-4 py-3 text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium ${c.className ?? ""}`}
                >
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {filtered.map((row, i) => (
              <tr
                key={row.id}
                className="border-b border-border/30 transition-colors hover:bg-primary/5"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-4 py-3 text-sm ${c.className ?? ""}`}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />Consultar</DropdownMenuItem>
                      <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" />Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-3.5 w-3.5 mr-2" />Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border/50 flex items-center justify-between">
        <span>{filtered.length} registro{filtered.length !== 1 && "s"}</span>
        <span>Atualizado agora</span>
      </div>
    </div>
  );
}
