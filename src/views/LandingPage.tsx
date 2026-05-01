import { Scale, ShieldCheck, Zap, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-editorial-paper text-editorial-ink selection:bg-editorial-gold/30 overflow-x-hidden font-sans">
      {/* Top Header Label */}
      <div className="w-full h-12 border-b-2 border-editorial-ink flex items-center justify-between px-8 text-[9px] font-black tracking-[0.3em] uppercase">
        <div className="flex gap-8">
          <span className="text-editorial-gold">Privado</span>
          <span className="opacity-40">Dossiê de Transmissão</span>
        </div>
        <span>LEXVOTO — Edição 2026</span>
      </div>

      {/* Main Branding */}
      <nav className="max-w-7xl mx-auto px-12 py-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-editorial-ink rounded-none flex items-center justify-center">
            <Scale className="text-editorial-gold" size={28} />
          </div>
          <span className="text-4xl font-serif font-black tracking-tighter italic">LEXVOTO</span>
        </div>
        <button 
          onClick={onStart}
          className="px-8 py-3 border-2 border-editorial-ink text-[10px] font-black uppercase tracking-widest hover:bg-editorial-ink hover:text-white transition-all"
        >
          Acessar Terminal
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-12 py-20 flex border-y-2 border-editorial-ink">
        {/* Left Headline */}
        <div className="w-2/3 pr-12 border-r-2 border-editorial-ink py-12 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[140px] leading-[0.8] font-serif font-black tracking-tighter uppercase mb-12">
              Blindagem<br/>
              <span className="italic font-light text-editorial-gold ml-4">Total</span>
            </h1>
            <div className="flex gap-16">
              <p className="w-1/2 text-sm font-medium leading-relaxed uppercase tracking-tight opacity-70">
                A inteligência jurídica que protege cada voto em tempo real. Uma infraestrutura de conformidade projetada para a resiliência institucional de candidatos e partidos.
              </p>
              <div className="w-1/2 flex flex-col justify-center border-l-2 border-editorial-gold pl-8">
                <span className="text-5xl font-serif font-black italic">360º</span>
                <span className="text-[9px] font-black uppercase tracking-widest mt-2">Monitoramento Ativo</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Feature Panel */}
        <div className="w-1/3 bg-editorial-ink text-editorial-paper p-12 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-8 block underline underline-offset-8">Editorial Strategist</span>
            <h2 className="text-4xl font-serif italic leading-tight mb-8">
              \"A arquitetura é a personificação visual da confiança.\"
            </h2>
            <p className="text-xs opacity-60 leading-relaxed font-medium">
              Analise peças de propaganda, valide prestação de contas e consulte a doutrina eleitoral instantaneamente através de nossa rede neural de alta precisão.
            </p>
          </div>
          <button 
            onClick={onStart}
            className="w-full py-5 bg-editorial-gold text-editorial-ink font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-colors mt-12"
          >
            Iniciar Blindagem
          </button>
        </div>
      </section>

      {/* Information Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border-b-2 border-editorial-ink">
        <div className="p-10 border-r-2 border-editorial-ink group hover:bg-editorial-muted transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-6 block">01. CONSULTORIA</span>
          <h3 className="text-xl font-serif font-bold italic mb-4">Base TSE 2026</h3>
          <p className="text-xs leading-relaxed opacity-60 font-medium">Respostas instantâneas baseadas em toda a legislação eleitoral e jurisprudência atualizada.</p>
        </div>
        <div className="p-10 border-r-2 border-editorial-ink group hover:bg-editorial-muted transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-6 block">02. PROPAGANDA</span>
          <h3 className="text-xl font-serif font-bold italic mb-4">Validação 360º</h3>
          <p className="text-xs leading-relaxed opacity-60 font-medium">Garantia técnica de conformidade para artes, rádio e TV, reduzindo riscos de multa administrativa.</p>
        </div>
        <div className="p-10 border-r-2 border-editorial-ink group hover:bg-editorial-muted transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-6 block">03. ACCOUNTING</span>
          <h3 className="text-xl font-serif font-bold italic mb-4">Monitor Fiscal</h3>
          <p className="text-xs leading-relaxed opacity-60 font-medium">Controle de fluxo de caixa da campanha com alertas automáticos de inconsistências documentais.</p>
        </div>
        <div className="p-10 group hover:bg-editorial-muted transition-colors">
          <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-6 block">04. ESCALONAMENTO</span>
          <h3 className="text-xl font-serif font-bold italic mb-4">Direto ao Jurídico</h3>
          <p className="text-xs leading-relaxed opacity-60 font-medium">Ponte instantânea para o corpo de advogados em situações de sensibilidade estratégica elevada.</p>
        </div>
      </section>

      {/* Footer Status Box */}
      <footer className="max-w-7xl mx-auto px-12 py-12 flex items-center justify-between bg-editorial-paper">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest">SISTEMA OPERACIONAL • NÍVEL A+</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest text-editorial-ink/40">
          LEXVOTO INTELIGÊNCIA JURÍDICA &copy; 2026 — TODOS OS DIREITOS RESERVADOS
        </div>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
          <span className="hover:underline cursor-pointer">Protocolos</span>
          <span className="hover:underline cursor-pointer">Segurança</span>
        </div>
      </footer>
    </div>
  );
}
