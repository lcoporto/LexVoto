import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  FileText, 
  Scale, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function CandidateGuide() {
  const [activeCategory, setActiveCategory] = useState('pré-campanha');

  const categories = [
    { id: 'pré-campanha', label: 'Pré-Campanha' },
    { id: 'registro', label: 'Registro' },
    { id: 'campanha', label: 'Em Campanha' },
    { id: 'pós-eleição', label: 'Pós-Eleição' },
  ];

  const tasks = [
    { id: '1', title: 'Desincompatibilização de cargo público', category: 'pré-campanha', dueDate: '02 abr 2026', done: true, priority: 'High' },
    { id: '2', title: 'Abertura de conta bancária específica', category: 'pré-campanha', dueDate: '15 mai 2026', done: true, priority: 'High' },
    { id: '3', title: 'Contratação de assessoria jurídica', category: 'pré-campanha', dueDate: '20 mai 2026', done: true, priority: 'High' },
    { id: '4', title: 'Convenção partidária', category: 'registro', dueDate: '20 jul - 05 ago', done: false, priority: 'Critical' },
    { id: '5', title: 'Registro de candidatura no TRE', category: 'registro', dueDate: '15 ago 2026', done: false, priority: 'Critical' },
    { id: '6', title: 'Início da propaganda eleitoral', category: 'campanha', dueDate: '16 ago 2026', done: false, priority: 'High' },
  ];

  const filteredTasks = tasks.filter(t => t.category === activeCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Category Sidebar */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 border ${
              activeCategory === cat.id
                ? 'bg-white border-blue-200 text-blue-600 shadow-sm'
                : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100'
            }`}
          >
            <span className="text-sm font-bold">{cat.label}</span>
          </button>
        ))}

        <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white">
          <Calendar size={24} className="mb-4 opacity-80" />
          <h4 className="font-bold text-lg mb-2 leading-tight">Calendário Oficial TSE 2026</h4>
          <p className="text-blue-100 text-xs leading-relaxed mb-4">Acompanhe todos os prazos fatais da justiça eleitoral atualizados em tempo real.</p>
          <button className="flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-all">
            Ver Calendário <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Scale size={24} className="text-blue-600" />
              Checklist de Obrigações Legais
            </h2>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {tasks.filter(t => t.done).length} / {tasks.length} Concluídos
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors ${task.done ? 'text-emerald-500' : 'text-slate-300 group-hover:text-blue-400'}`}>
                      {task.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Calendar size={12} /> {task.dueDate}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          task.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-400 transition-all" />
                </div>
              ))
            ) : (
              <div className="p-20 text-center text-slate-400 font-medium">
                Nenhuma tarefa pendente para esta fase.
              </div>
            )}
          </div>
        </div>

        {/* Resources / Docs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <FileText size={20} />
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">PDF</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Manual de Arrecadação 2026</h4>
              <p className="text-xs text-slate-500 mt-1">Guia prático para tesoureiros de campanha.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Scale size={20} />
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">WEB</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Consulta de Processos TRE/TSE</h4>
              <p className="text-xs text-slate-500 mt-1">Links diretos para o sistema PJe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
