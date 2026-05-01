import { PieChart, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, MoreHorizontal, History } from 'lucide-react';

export default function Accountability() {
  const transactions = [
    { id: '1', date: '28/04/2026', type: 'Receita', category: 'Doação Pessoa Física', amount: 5000.00, status: 'validated' },
    { id: '2', date: '27/04/2026', type: 'Despesa', category: 'Marketing Digital', amount: -2400.00, status: 'warning', note: 'NF sem CNPJ da coligação' },
    { id: '3', date: '25/04/2026', type: 'Receita', category: 'Fundo Partidário', amount: 50000.00, status: 'validated' },
    { id: '4', date: '24/04/2026', type: 'Despesa', category: 'Aluguel Comitê', amount: -1500.00, status: 'validated' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={120} className="rotate-12" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo Atual</p>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">R$ 51.100,00</h3>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">
              <ArrowUpRight size={14} /> +R$ 55k
            </div>
            <div className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">
              <ArrowDownRight size={14} /> -R$ 3.9k
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teto de Gastos</p>
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-xl font-bold text-slate-900">R$ 159.000,00</h3>
              <span className="text-xs font-bold text-blue-600">32% Utilizado</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000" 
                style={{ width: '32%' }}
              ></div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 italic">*Limite definido para o cargo de Vereador - Mun. São Paulo</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-between shadow-lg shadow-slate-900/20">
          <div>
            <h4 className="font-bold text-sm mb-2 opacity-80">Próximo Relatório Fiscal</h4>
            <p className="text-2xl font-black">7 Dias</p>
          </div>
          <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl mt-6 hover:bg-slate-100 transition-colors text-sm">
            Gerar Parcial SPCE
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
              <History size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Fluxo de Caixa & Validação</h2>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 hover:bg-white transition-all">
              Filtros
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
              <DollarSign size={14} /> Novo Lançamento
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Data</th>
                <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Descrição</th>
                <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Valor</th>
                <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status IA</th>
                <th className="p-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-5 text-sm font-medium text-slate-500">{tx.date}</td>
                  <td className="p-5">
                    <p className="text-sm font-bold text-slate-900">{tx.category}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tight">{tx.type}</p>
                  </td>
                  <td className={`p-5 text-sm font-black text-right ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      tx.status === 'validated' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {tx.status === 'validated' ? (
                        <>Validado</>
                      ) : (
                        <div className="flex items-center gap-1 group/note relative cursor-help">
                          Risco Detectado
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 invisible group-hover/note:opacity-100 group-hover/note:visible transition-all">
                            {tx.note}
                          </div>
                        </div>
                      )}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
