import { 
  LayoutDashboard, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  Settings,
  Scale
} from 'lucide-react';
import { motion } from 'motion/react';
import type { ViewType } from '../../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'consultancy', label: 'Consultoria IA', icon: MessageSquare },
    { id: 'ads', label: 'Propaganda', icon: ShieldCheck },
    { id: 'accountability', label: 'Contas', icon: FileText },
    { id: 'guide', label: 'Guia do Candidato', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-editorial-ink text-white flex flex-col h-screen border-r-2 border-editorial-ink overflow-hidden shrink-0">
      <div className="p-8 flex flex-col gap-1 border-b border-white/10 bg-editorial-ink">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-editorial-gold rounded-sm flex items-center justify-center">
            <Scale className="text-editorial-ink" size={20} />
          </div>
          <h1 className="font-serif font-black text-2xl tracking-tighter italic">LEXVOTO</h1>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-editorial-gold font-bold mt-2">Intel. Jurídica Eleitoral</p>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto font-sans">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 group relative ${
              currentView === item.id
                ? 'text-white'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {currentView === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-white/5 border-l-4 border-editorial-gold"
              />
            )}
            <item.icon size={18} className={`relative z-10 ${currentView === item.id ? 'text-editorial-gold' : 'group-hover:text-editorial-gold'}`} />
            <span className="font-bold text-xs uppercase tracking-widest relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => onViewChange('settings')}
          className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
            currentView === 'settings'
              ? 'text-editorial-gold'
              : 'text-white/40 hover:text-white'
          }`}
        >
          <Settings size={18} />
          <span className="font-bold text-xs uppercase tracking-widest">Config</span>
        </button>
      </div>

      <div className="p-8 bg-black/20 border-t-2 border-editorial-ink">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-editorial-paper flex items-center justify-center text-[10px] font-black text-editorial-ink uppercase ring-1 ring-white/10">
            LP
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-wider text-white">Lucas Porto</p>
            <p className="text-[9px] text-editorial-gold font-bold uppercase tracking-widest">MAJORITÁRIO</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
