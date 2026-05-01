import { Search, Bell, HelpCircle, ChevronRight } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-editorial-paper border-b-2 border-editorial-ink flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-editorial-ink/40 text-[10px] font-black uppercase tracking-widest">
          <span>LEXVOTO</span>
          <ChevronRight size={14} className="text-editorial-gold" />
          <span className="text-editorial-ink underline underline-offset-4 decoration-2 decoration-editorial-gold">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-editorial-ink group-focus-within:text-editorial-gold transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="BUSCAR LEGISLAÇÃO..."
            className="pl-6 pr-4 py-1 bg-transparent border-b border-editorial-ink/20 focus:border-editorial-gold rounded-none text-[10px] font-bold tracking-widest w-48 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-6 border-l border-editorial-ink/20 pl-6 h-6">
          <button className="p-1 text-editorial-ink hover:text-editorial-gold transition-all relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-editorial-gold rounded-full"></span>
          </button>
          <span className="text-[10px] font-black tracking-tighter uppercase hidden sm:block">30 ABR 2026</span>
        </div>
      </div>
    </header>
  );
}
