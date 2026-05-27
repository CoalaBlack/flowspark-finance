import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { ScanBarcode } from "lucide-react";

export const Route = createFileRoute("/consultor/qrcode")({ component: Page });

function Page() {
  return (
    <MobileShell title="Escanear QRcode" back="/consultor">
      <div className="rounded-2xl border border-dashed border-primary/40 bg-card/30 p-10 flex flex-col items-center gap-4">
        <ScanBarcode className="h-20 w-20 text-primary-glow" />
        <p className="text-center text-sm text-muted-foreground">
          Aponte a câmera para o QRcode do cliente para registrar a cobrança rapidamente.
        </p>
      </div>
    </MobileShell>
  );
}
