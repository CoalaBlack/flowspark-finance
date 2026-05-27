import { useState, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CrudFieldType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "password"
  | "date"
  | "textarea"
  | "select";

export type CrudField = {
  name: string;
  label: string;
  type?: CrudFieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  colSpan?: 1 | 2;
};

type Mode = "create" | "edit" | "view";

export function useCrud<T extends { id: number | string }>(opts: {
  initial: T[];
  fields: CrudField[];
  entityLabel: string;
  /** Label used as DialogTitle when creating, e.g. "Nova Rota". Defaults to `Novo ${entityLabel}`. */
  newLabel?: string;
  /** Build default values for a new record. */
  defaults?: () => Partial<T>;
}) {
  const { initial, fields, entityLabel, newLabel, defaults } = opts;
  const [rows, setRows] = useState<T[]>(initial);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("create");
  const [current, setCurrent] = useState<Record<string, unknown>>({});

  const nextId = useCallback(() => {
    const ids = rows.map((r) => Number(r.id)).filter((n) => !Number.isNaN(n));
    return (ids.length ? Math.max(...ids) : 0) + 1;
  }, [rows]);

  const openCreate = () => {
    const base: Record<string, unknown> = { ...(defaults?.() ?? {}) };
    fields.forEach((f) => {
      if (!(f.name in base)) base[f.name] = f.type === "number" ? 0 : "";
    });
    setCurrent(base);
    setMode("create");
    setOpen(true);
  };
  const openView = (row: T) => {
    setCurrent({ ...(row as Record<string, unknown>) });
    setMode("view");
    setOpen(true);
  };
  const openEdit = (row: T) => {
    setCurrent({ ...(row as Record<string, unknown>) });
    setMode("edit");
    setOpen(true);
  };
  const remove = (row: T) => {
    if (confirm(`Excluir este registro de ${entityLabel.toLowerCase()}?`)) {
      setRows((p) => p.filter((r) => r.id !== row.id));
      toast.success(`${entityLabel} excluído(a)`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !String(current[f.name] ?? "").trim()) {
        toast.error(`Preencha o campo "${f.label}".`);
        return;
      }
    }
    if (mode === "create") {
      const newRow = { id: nextId(), ...current } as T;
      setRows((p) => [newRow, ...p]);
      toast.success(`${entityLabel} criado(a) com sucesso!`);
    } else if (mode === "edit") {
      setRows((p) =>
        p.map((r) => (r.id === (current.id as T["id"]) ? ({ ...r, ...current } as T) : r)),
      );
      toast.success(`${entityLabel} atualizado(a)!`);
    }
    setOpen(false);
  };

  const title =
    mode === "create"
      ? (newLabel ?? `Novo ${entityLabel}`)
      : mode === "edit"
        ? `Editar ${entityLabel}`
        : `${entityLabel}`;

  const dialog: ReactNode = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>
            {mode === "view"
              ? "Detalhes do registro."
              : "Preencha as informações abaixo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => {
              const span = f.colSpan === 2 || f.type === "textarea" ? "md:col-span-2" : "";
              const val = current[f.name] ?? "";
              const disabled = mode === "view";
              return (
                <div key={f.name} className={`space-y-1.5 ${span}`}>
                  <Label htmlFor={f.name} className="text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label} {f.required && <span className="text-destructive">*</span>}
                  </Label>
                  {f.type === "textarea" ? (
                    <Textarea
                      id={f.name}
                      value={String(val)}
                      placeholder={f.placeholder}
                      disabled={disabled}
                      onChange={(e) => setCurrent((p) => ({ ...p, [f.name]: e.target.value }))}
                    />
                  ) : f.type === "select" ? (
                    <Select
                      value={String(val)}
                      disabled={disabled}
                      onValueChange={(v) => setCurrent((p) => ({ ...p, [f.name]: v }))}
                    >
                      <SelectTrigger><SelectValue placeholder={f.placeholder ?? "Selecione"} /></SelectTrigger>
                      <SelectContent>
                        {(f.options ?? []).map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={f.name}
                      type={f.type ?? "text"}
                      value={String(val)}
                      placeholder={f.placeholder}
                      disabled={disabled}
                      onChange={(e) =>
                        setCurrent((p) => ({
                          ...p,
                          [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {mode === "view" ? "Fechar" : "Cancelar"}
            </Button>
            {mode !== "view" && (
              <Button type="submit" className="bg-gradient-primary text-primary-foreground shadow-glow">
                {mode === "create" ? "Criar" : "Salvar"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return { rows, setRows, openCreate, openView, openEdit, remove, dialog };
}
