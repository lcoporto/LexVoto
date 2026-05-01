import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Scale, Info, Eraser, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import type { ChatMessage } from '../../types';

export default function AIConsultancy() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: input }],
          },
        ],
        config: {
          systemInstruction: `
            Você é o LEXVOTO, um assistente jurídico especializado em Direito Eleitoral Brasileiro para as Eleições 2026.
            Sua missão é fornecer blindagem jurídica a candidatos e campanhas.
            Baseie suas respostas na legislação vigente (Código Eleitoral), resoluções do TSE e jurisprudência atualizada.
            Seja profissional, técnico porém acessível, e sempre aponte riscos de impugnação ou multa.
            Se a dúvida for extremamente complexa, sugira o escalonamento para o advogado da campanha.
            Formate suas respostas usando markdown para melhor leitura (bullet points, negrito em termos chaves).
          `.trim(),
        },
      });

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Desculpe, não consegui processar sua consulta agora.',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Gemini Error:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Ocorreu um erro ao consultar a base jurídica. Por favor, verifique sua conexão ou tente novamente mais tarde.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-5xl mx-auto bg-editorial-paper rounded-none border-2 border-editorial-ink shadow-[12px_12px_0px_rgba(26,26,26,0.05)] overflow-hidden">
      {/* Chat Header */}
      <div className="p-8 border-b-2 border-editorial-ink flex items-center justify-between bg-editorial-paper">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-editorial-ink rounded-none flex items-center justify-center">
            <Bot className="text-editorial-gold" size={24} />
          </div>
          <div>
            <h2 className="font-serif font-black text-2xl tracking-tighter italic">LEXVOTO AI</h2>
            <div className="flex items-center gap-2 text-[9px] text-editorial-gold font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              CONFORMITY ENGINE • TSE 04
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={clearChat}
            className="p-2 text-editorial-ink/40 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
            title="Limpar Conversa"
          >
            <Eraser size={20} />
          </button>
          <button className="p-2 text-editorial-ink/40 hover:text-editorial-gold transition-all">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-12 space-y-12 scroll-smooth bg-editorial-paper"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-8 py-20">
            <div className="w-24 h-24 bg-editorial-muted border-2 border-editorial-ink flex items-center justify-center text-editorial-ink rounded-none rotate-3">
              <Scale size={48} />
            </div>
            <div>
              <h3 className="text-4xl font-serif font-black tracking-tighter italic mb-4">Como podemos blindar sua campanha hoje?</h3>
              <p className="text-editorial-ink/60 text-sm font-sans font-medium leading-relaxed uppercase tracking-tight">
                Consulte a base de dados integrada do TSE em tempo real. Especialista em conduta vedada e propaganda digital.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
              {[
                "Pode usar IA na criação de jingles?",
                "Quais os limites para doação de pessoa física?",
                "Posso fazer live no dia da eleição?",
                "Regras para identificação de vice em folders."
              ].map((q) => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-6 py-4 bg-white border-2 border-editorial-ink/5 hover:border-editorial-gold text-editorial-ink text-xs font-black uppercase tracking-widest transition-all text-left flex items-center justify-between group rounded-none"
                >
                  {q}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-editorial-gold" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}
          >
            <div className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${msg.role === 'user' ? 'text-editorial-gold' : 'text-editorial-ink'}`}>
              {msg.role === 'user' ? 'Mandatário' : 'LEXVOTO Intelligence'}
            </div>
            <div className={`max-w-[75%] p-8 border-2 ${
              msg.role === 'user' 
                ? 'bg-editorial-ink text-editorial-paper border-editorial-ink shadow-[8px_8px_0px_rgba(197,160,89,0.2)]' 
                : 'bg-white text-editorial-ink border-editorial-ink shadow-[8px_8px_0px_rgba(26,26,26,0.05)] font-serif italic'
            }`}>
              <div className="prose prose-sm max-w-none prose-slate whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
              <div className={`text-[9px] font-black tracking-widest mt-6 opacity-40 uppercase border-t pt-4 ${
                msg.role === 'user' ? 'border-white/10' : 'border-editorial-ink/10'
              }`}>
                Ref ID: {msg.id.slice(-4)} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-editorial-gold">Processando Análise</span>
            <div className="bg-editorial-muted border-2 border-editorial-ink p-6 rounded-none flex items-center gap-3">
              <span className="w-2 h-2 bg-editorial-ink rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-editorial-gold rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-editorial-ink rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t-2 border-editorial-ink bg-editorial-paper">
        <div className="relative flex items-center gap-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="CONSULTAR DOUTRINA E LEGISLAÇÃO..."
              className="w-full pl-8 pr-16 py-5 bg-white border-2 border-editorial-ink focus:border-editorial-gold rounded-none text-xs font-black tracking-widest transition-all outline-none resize-none max-h-32 shadow-sm uppercase placeholder:text-editorial-ink/30"
              rows={1}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <Sparkles className="text-editorial-gold animate-pulse" size={20} />
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`h-16 w-32 border-2 border-editorial-ink font-black uppercase tracking-widest text-[11px] transition-all ${
              input.trim() && !isTyping 
                ? 'bg-editorial-gold text-editorial-ink hover:bg-white hover:border-editorial-gold active:scale-95' 
                : 'bg-editorial-muted text-editorial-ink/30 cursor-not-allowed'
            }`}
          >
            Pesquisar
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-editorial-ink/40 italic">
          <span>Privacidade Criptografada</span>
          <span>•</span>
          <span>Jurisprudência 2026/04</span>
          <span>•</span>
          <span>Base TSE Integrada</span>
        </div>
      </div>
    </div>
  );
}
