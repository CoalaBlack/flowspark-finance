import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MobileShell } from "@/components/consultor/mobile-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Camera, Upload, X, User, MapPin, Briefcase, FileImage, Phone } from "lucide-react";

export const Route = createFileRoute("/consultor/cadastrar-cliente")({ component: Page });

type FotoSlot = "rgFrente" | "rgVerso" | "cpfDoc" | "compResidencia" | "selfie";

const ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

function Page() {
  const navigate = useNavigate();

  // Pessoais
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [nomePai, setNomePai] = useState("");

  // Contato
  const [celular, setCelular] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [email, setEmail] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [pontoRef, setPontoRef] = useState("");

  // Profissional
  const [profissao, setProfissao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [renda, setRenda] = useState("");
  const [tempoEmprego, setTempoEmprego] = useState("");

  // Referência pessoal
  const [refNome, setRefNome] = useState("");
  const [refTel, setRefTel] = useState("");
  const [refParentesco, setRefParentesco] = useState("");

  // Documentos (preview local)
  const [fotos, setFotos] = useState<Record<FotoSlot, string | null>>({
    rgFrente: null, rgVerso: null, cpfDoc: null, compResidencia: null, selfie: null,
  });

  // Observações
  const [obs, setObs] = useState("");

  async function buscaCep(v: string) {
    const c = v.replace(/\D/g, "");
    if (c.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${c}/json/`);
      const d = await r.json();
      if (d.erro) return;
      setEndereco(d.logradouro || "");
      setBairro(d.bairro || "");
      setCidade(d.localidade || "");
      setUf(d.uf || "");
    } catch { /* offline */ }
  }

  function onFoto(slot: FotoSlot, file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFotos((s) => ({ ...s, [slot]: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function salvar() {
    if (!nome.trim()) { toast.error("Informe o nome do cliente."); return; }
    if (!cpf.trim()) { toast.error("Informe o CPF."); return; }
    if (!celular.trim()) { toast.error("Informe o celular."); return; }
    if (!cep.trim() || !numero.trim()) { toast.error("Informe CEP e número."); return; }
    toast.success(`Cliente "${nome}" cadastrado com sucesso!`);
    navigate({ to: "/consultor" });
  }

  return (
    <MobileShell title="Cadastrar Cliente" back="/consultor">
      <p className="text-xs text-muted-foreground -mt-2 mb-4 text-center">
        Preencha todos os dados necessários para análise de crédito.
      </p>

      <Section icon={User} title="Dados pessoais">
        <Field label="Nome completo *">
          <Input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="Apelido / Como é conhecido">
          <Input value={apelido} onChange={(e) => setApelido(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="CPF *">
            <Input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" className="bg-background/40 h-11 font-mono" />
          </Field>
          <Field label="RG">
            <Input value={rg} onChange={(e) => setRg(e.target.value)} className="bg-background/40 h-11 font-mono" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nascimento">
            <Input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} className="bg-background/40 h-11" />
          </Field>
          <Field label="Sexo">
            <Select value={sexo} onValueChange={setSexo}>
              <SelectTrigger className="bg-background/40 h-11"><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Feminino</SelectItem>
                <SelectItem value="O">Outro</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Estado civil">
          <Select value={estadoCivil} onValueChange={setEstadoCivil}>
            <SelectTrigger className="bg-background/40 h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              {["Solteiro(a)","Casado(a)","Divorciado(a)","Viúvo(a)","União estável"].map((x) => (
                <SelectItem key={x} value={x}>{x}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Nome da mãe">
          <Input value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="Nome do pai">
          <Input value={nomePai} onChange={(e) => setNomePai(e.target.value)} className="bg-background/40 h-11" />
        </Field>
      </Section>

      <Section icon={Phone} title="Contato">
        <Field label="Celular (WhatsApp) *">
          <Input value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="(00) 00000-0000" className="bg-background/40 h-11" />
        </Field>
        <Field label="Telefone fixo">
          <Input value={telefoneFixo} onChange={(e) => setTelefoneFixo(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="E-mail">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/40 h-11" />
        </Field>
      </Section>

      <Section icon={MapPin} title="Endereço">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
          <Field label="CEP *">
            <Input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={(e) => buscaCep(e.target.value)}
              placeholder="00000-000"
              className="bg-background/40 h-11 font-mono"
            />
          </Field>
          <button
            type="button"
            onClick={() => buscaCep(cep)}
            className="h-11 px-3 mb-[2px] rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300 active:scale-95"
          >
            Buscar
          </button>
        </div>
        <Field label="Endereço">
          <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Número *">
            <Input value={numero} onChange={(e) => setNumero(e.target.value)} className="bg-background/40 h-11" />
          </Field>
          <Field label="Complemento">
            <Input value={complemento} onChange={(e) => setComplemento(e.target.value)} className="bg-background/40 h-11" />
          </Field>
        </div>
        <Field label="Bairro">
          <Input value={bairro} onChange={(e) => setBairro(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <Field label="Cidade">
            <Input value={cidade} onChange={(e) => setCidade(e.target.value)} className="bg-background/40 h-11" />
          </Field>
          <Field label="UF">
            <Select value={uf} onValueChange={setUf}>
              <SelectTrigger className="bg-background/40 h-11"><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                {ufs.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Ponto de referência">
          <Input value={pontoRef} onChange={(e) => setPontoRef(e.target.value)} placeholder="Ex: próximo ao mercado X" className="bg-background/40 h-11" />
        </Field>
      </Section>

      <Section icon={Briefcase} title="Profissional / Renda">
        <Field label="Profissão">
          <Input value={profissao} onChange={(e) => setProfissao(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <Field label="Empresa onde trabalha">
          <Input value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Renda mensal (R$)">
            <Input type="number" value={renda} onChange={(e) => setRenda(e.target.value)} className="bg-background/40 h-11 font-mono" />
          </Field>
          <Field label="Tempo de emprego">
            <Input value={tempoEmprego} onChange={(e) => setTempoEmprego(e.target.value)} placeholder="Ex: 2 anos" className="bg-background/40 h-11" />
          </Field>
        </div>
      </Section>

      <Section icon={User} title="Referência pessoal">
        <Field label="Nome">
          <Input value={refNome} onChange={(e) => setRefNome(e.target.value)} className="bg-background/40 h-11" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Telefone">
            <Input value={refTel} onChange={(e) => setRefTel(e.target.value)} className="bg-background/40 h-11" />
          </Field>
          <Field label="Parentesco">
            <Input value={refParentesco} onChange={(e) => setRefParentesco(e.target.value)} className="bg-background/40 h-11" />
          </Field>
        </div>
      </Section>

      <Section icon={FileImage} title="Documentos (fotos)">
        <p className="text-[11px] text-muted-foreground -mt-1 mb-2">
          Tire foto ou envie do celular. As imagens ficam anexadas ao cadastro do cliente.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <FotoBox label="RG (frente)" slot="rgFrente" value={fotos.rgFrente} onPick={onFoto} onClear={(s) => setFotos((p) => ({ ...p, [s]: null }))} />
          <FotoBox label="RG (verso)" slot="rgVerso" value={fotos.rgVerso} onPick={onFoto} onClear={(s) => setFotos((p) => ({ ...p, [s]: null }))} />
          <FotoBox label="CPF" slot="cpfDoc" value={fotos.cpfDoc} onPick={onFoto} onClear={(s) => setFotos((p) => ({ ...p, [s]: null }))} />
          <FotoBox label="Comp. residência" slot="compResidencia" value={fotos.compResidencia} onPick={onFoto} onClear={(s) => setFotos((p) => ({ ...p, [s]: null }))} />
          <div className="col-span-2">
            <FotoBox label="Selfie segurando documento" slot="selfie" value={fotos.selfie} onPick={onFoto} onClear={(s) => setFotos((p) => ({ ...p, [s]: null }))} wide />
          </div>
        </div>
      </Section>

      <Section title="Observações">
        <Textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} className="bg-background/40" placeholder="Informações relevantes sobre o cliente" />
      </Section>

      <Button
        onClick={salvar}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 h-12 mt-2"
      >
        Salvar cliente
      </Button>
    </MobileShell>
  );
}

function Section({ icon: Icon, title, children }: { icon?: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <div className="h-7 w-7 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <h3 className="font-semibold text-sm text-slate-200">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function FotoBox({
  label, slot, value, onPick, onClear, wide,
}: {
  label: string;
  slot: FotoSlot;
  value: string | null;
  onPick: (s: FotoSlot, f: File | undefined) => void;
  onClear: (s: FotoSlot) => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className={`relative rounded-xl border border-dashed border-white/15 bg-background/40 overflow-hidden ${wide ? "h-32" : "h-28"}`}>
        {value ? (
          <>
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onClear(slot)}
              className="absolute top-1 right-1 h-7 w-7 rounded-full bg-black/60 flex items-center justify-center text-white"
              aria-label="Remover"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-indigo-300 hover:bg-indigo-500/5 transition"
          >
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <Upload className="h-4 w-4" />
            </div>
            <span className="text-[10px] uppercase tracking-wider">Adicionar foto</span>
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => onPick(slot, e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
