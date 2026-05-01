import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardOverview() {
  const stats = [
    { label: 'Saúde Jurídica', value: '98%', icon: ShieldCheck, color: 'text-emerald-600' },
    { label: 'Alertas Ativos', value: '02', icon: AlertTriangle, color: 'text-editorial-gold' },
    { label: 'Consultas IA', value: '124', icon: Activity, color: 'text-editorial-ink' },
    { label: 'Prazos Fatais', value: '03', icon: Clock, color: 'text-red-600' },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col border-b-2 border-editorial-ink pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-editorial-ink text-white px-3 py-1 font-sans font-bold text-[9px] uppercase tracking-widest">Dossiê 04</span>
          <span className="text-editorial-gold font-sans font-bold text-[9px] uppercase tracking-widest">Atualizado: 30 ABR 2026</span>
        </div>
        <h1 className="text-7xl font-serif font-black tracking-tighter leading-[0.8] mb-4">
          Status da <span className="italic serif font-light text-editorial-gold">Campanha</span>
        </h1>
        <div className="flex justify-between items-end">
          <p className="max-w-xl text-sm font-sans font-medium leading-relaxed uppercase tracking-tight text-editorial-ink opacity-70">
            Monitoramento global de ativos políticos e conformidade normativa. O índice de blindagem atual sugere estabilidade institucional acima da média setorial.
          </p>
          <div className="flex items-center gap-2 font-sans font-black text-[10px] uppercase tracking-widest border border-editorial-ink px-4 py-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Sistemas Online
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-editorial-ink bg-editorial-ink overflow-hidden">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-editorial-paper p-8 flex flex-col justify-between h-48 border-r border-editorial-ink last:border-r-0 group hover:bg-editorial-muted transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <h3 className="text-6xl font-serif font-black tracking-tighter italic">{stat.value}</h3>
              <div className="mt-2 h-1 w-12 bg-editorial-gold" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Alerts Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between border-b border-editorial-ink pb-4 mb-8">
              <h2 className="text-2xl font-serif font-black italic">Alertas de Alta Relevância</h2>
              <button className="text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 group">
                Ver Arquivo Completo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-8 group cursor-pointer">
                <div className="w-1/3 aspect-[4/3] bg-editorial-muted border border-editorial-ink flex items-center justify-center p-4">
                  <div className="w-full h-full border border-dashed border-red-200 bg-red-50 flex items-center justify-center">
                    <AlertCircle className="text-red-500" size={32} />
                  </div>
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-2">I. Erro Crítico</span>
                  <h4 className="text-xl font-serif font-bold leading-tight mb-2 group-hover:underline">Identificação de Vice em Mídia de TV</h4>
                  <p className="text-xs font-sans font-medium text-editorial-ink/60 leading-relaxed mb-4">
                    A peça publicitária setorial detectou desvio nas proporções exigidas pelo TSE. O risco de impugnação é avaliado em 84.2%.
                  </p>
                  <button className="self-start text-[10px] font-black border-b-2 border-editorial-ink p-1 uppercase tracking-widest">Corrigir Agora</button>
                </div>
              </div>

              <div className="flex gap-8 group cursor-pointer border-t border-editorial-ink/10 pt-8">
                <div className="w-1/3 aspect-[4/3] bg-editorial-muted border border-editorial-ink flex items-center justify-center p-4">
                  <div className="w-full h-full border border-dashed border-editorial-gold/20 bg-editorial-gold/5 flex items-center justify-center">
                    <Clock className="text-editorial-gold" size={32} />
                  </div>
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-2">II. Prazos Ativos</span>
                  <h4 className="text-xl font-serif font-bold leading-tight mb-2 group-hover:underline">Janela Fiscal: Lote de Doações 28/04</h4>
                  <p className="text-xs font-sans font-medium text-editorial-ink/60 leading-relaxed mb-4">
                    Encerramento do prazo regulatório iminente. O sistema recomenda validação instantânea do SPCE para evitar inconsistências.
                  </p>
                  <button className="self-start text-[10px] font-black border-b-2 border-editorial-ink p-1 uppercase tracking-widest">Validar Lote</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-12">
          {/* Direct Line */}
          <section className="bg-editorial-ink text-editorial-paper p-8">
            <span className="text-[9px] font-black uppercase tracking-widest text-editorial-gold mb-4 block">Escalonamento Estratégico</span>
            <h3 className="text-3xl font-serif italic mb-6 leading-tight">\"A precisão jurídica é o alicerce do sucesso nas urnas.\"</h3>
            <p className="text-xs opacity-60 font-medium leading-relaxed mb-8">Nossa IA detectou complexidade institucional elevada. Conecte-se diretamente com o corpo jurídico especializado.</p>
            <button className="w-full py-4 border border-editorial-paper text-[10px] font-black uppercase tracking-[0.2em] hover:bg-editorial-paper hover:text-editorial-ink transition-all">
              Dossiê Especializado
            </button>
          </section>

          {/* Quota Chart */}
          <section className="bg-editorial-muted p-8 border-2 border-editorial-ink">
            <span className="text-[9px] font-black uppercase tracking-widest mb-6 block border-b border-editorial-ink pb-2">III. Quociente Eleitoral</span>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-serif font-black italic">75%</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-editorial-ink/40 mt-1">META ATINGIDA</span>
              </div>
              <div className="h-12 w-full bg-editorial-paper border border-editorial-ink flex items-end p-1 gap-1">
                {[45, 60, 30, 80, 55, 75].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="bg-editorial-gold w-full" />
                ))}
              </div>
              <p className="text-[9px] font-sans font-bold leading-tight uppercase opacity-50 italic text-center">
                Análise preditiva baseada em amostragem setorial e histórico regional.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
