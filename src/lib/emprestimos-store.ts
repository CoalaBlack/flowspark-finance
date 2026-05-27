import { useSyncExternalStore } from "react";

export type Emprestimo = {
  numero: number;
  cliente: string;
  consultor: string;
  dataLancamento: string; // ISO yyyy-mm-dd
  valor: number;
  juros: number;
  parcelas: number;
  intervalo: number;
  opcaoCobranca: string;
  vencimentos: string[]; // ISO yyyy-mm-dd
  total: number;
  valorParcela: number;
  criadoEm: string;
};

const KEY = "gc.emprestimos.v1";

function read(): Emprestimo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Emprestimo[]) : [];
  } catch {
    return [];
  }
}

let cache: Emprestimo[] = read();
const listeners = new Set<() => void>();

function write(next: Emprestimo[]) {
  cache = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = read();
      listeners.forEach((l) => l());
    }
  });
}

export const emprestimosStore = {
  getAll: () => cache,
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  nextNumero: () => {
    const max = cache.reduce((m, e) => Math.max(m, e.numero), 16089);
    return max + 1;
  },
  add: (e: Omit<Emprestimo, "numero" | "criadoEm"> & { numero?: number }) => {
    const numero = e.numero ?? emprestimosStore.nextNumero();
    const novo: Emprestimo = { ...e, numero, criadoEm: new Date().toISOString() };
    write([novo, ...cache]);
    return novo;
  },
  update: (numero: number, patch: Partial<Emprestimo>) => {
    write(cache.map((x) => (x.numero === numero ? { ...x, ...patch } : x)));
  },
  remove: (numero: number) => {
    write(cache.filter((x) => x.numero !== numero));
  },
  get: (numero: number) => cache.find((x) => x.numero === numero),
};

export function useEmprestimos() {
  return useSyncExternalStore(
    emprestimosStore.subscribe,
    emprestimosStore.getAll,
    () => [] as Emprestimo[],
  );
}
