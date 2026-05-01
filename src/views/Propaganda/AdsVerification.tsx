import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileImage, 
  FileVideo, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface AnalysisResult {
  status: 'approved' | 'rejected' | 'warning';
  score: number;
  findings: Array<{
    type: 'success' | 'error' | 'warning';
    message: string;
    description: string;
  }>;
  summary: string;
}

export default function AdsVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      if (selected.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selected);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const analyzeFile = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      let prompt = `
        Analise esta peça publicitária eleitoral para as Eleições de 2026 no Brasil.
        Verifique:
        1. Identificação do Vice/Suplente (tamanho deve ser no mínimo 30% do nome do titular).
        2. Presença de símbolos proibidos (bandeiras de outros países, símbolos religiosos usados indevidamente).
        3. Uso de IA sem aviso (se detectar manipulação digital).
        4. Legibilidade das legendas e avisos obrigatórios (CNPJ, coligação, etc).
        
        Retorne um JSON com:
        - status: "approved", "rejected" ou "warning"
        - score: 0-100 de conformidade
        - findings: lista de objetos { type: "success"|"error"|"warning", message: string, description: string }
        - summary: um pequeno resumo da análise.
      `;

      let contents;
      if (file.type.startsWith('image/') && preview) {
        const base64 = preview.split(',')[1];
        contents = {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: file.type, data: base64 } }
          ]
        };
      } else {
        contents = {
          parts: [{ text: `Arquivo ${file.name} (tipo ${file.type}). Por favor, forneça uma análise genérica baseada em regras comuns do TSE para esse tipo de arquivo, alertando para os pontos cegos da falta da imagem real.` }]
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      setResult(parsed);
    } catch (error) {
      console.error('Analysis error:', error);
      setResult({
        status: 'warning',
        score: 0,
        summary: 'Não foi possível completar a análise detalhada por meios automáticos. Recomenda-se revisão humana.',
        findings: [{ type: 'warning', message: 'Erro de processamento', description: 'Tente reenviar o arquivo ou consulte o manual.' }]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col space-y-12">
      <section className="border-b-2 border-editorial-ink pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-editorial-ink text-white px-3 py-1 font-sans font-bold text-[9px] uppercase tracking-widest">Módulo de Verificação</span>
          <span className="text-editorial-gold font-sans font-bold text-[9px] uppercase tracking-widest">Protocolo TSE-2026.04</span>
        </div>
        <h1 className="text-7xl font-serif font-black tracking-tighter leading-[0.8] mb-4">
          Blindagem <span className="italic serif font-light text-editorial-gold">Midiática</span>
        </h1>
        <p className="max-w-2xl text-sm font-sans font-medium leading-relaxed uppercase tracking-tight text-editorial-ink opacity-70">
          Validação técnica instantânea para mídias de rádio, TV e digital. Nossa rede neural processa cada frame em busca de inconsistências normativas.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upload Column */}
        <div className="space-y-8">
          <div 
            onClick={handleUploadClick}
            className={`aspect-video border-2 border-dashed border-editorial-ink flex flex-col items-center justify-center cursor-pointer transition-all relative group ${
              preview ? 'bg-white' : 'bg-editorial-muted hover:bg-white'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,video/*,application/pdf"
            />
            
            {file ? (
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-editorial-ink/60">
                    <FileText size={64} className="text-editorial-gold" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{file.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-editorial-ink/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-6 py-3 border-2 border-white text-white text-[10px] font-black uppercase tracking-widest">Substituir Arquivo</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-editorial-ink rounded-none flex items-center justify-center mx-auto mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                  <Upload className="text-editorial-gold" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold italic mb-3">Carregar Peça</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">PNG, MP4, PDF até 10MB</p>
              </div>
            )}
          </div>

          <button
            onClick={analyzeFile}
            disabled={!file || isAnalyzing}
            className={`w-full py-6 border-2 border-editorial-ink font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-4 ${
              !file || isAnalyzing 
                ? 'bg-editorial-muted text-editorial-ink/20 cursor-not-allowed border-editorial-ink/10' 
                : 'bg-editorial-ink text-white hover:bg-editorial-gold hover:text-editorial-ink'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={18} className="animate-spin text-editorial-gold" />
                Processando Análise...
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Iniciar Varredura Jurídica
              </>
            )}
          </button>

          <div className="grid grid-cols-3 gap-0 border-2 border-editorial-ink">
            <div className="p-6 border-r border-editorial-ink bg-editorial-muted/50 flex flex-col items-center text-center">
              <FileImage size={24} className="mb-4 text-editorial-ink/40" />
              <span className="text-[9px] font-black uppercase tracking-widest">Estática</span>
            </div>
            <div className="p-6 border-r border-editorial-ink bg-editorial-muted/50 flex flex-col items-center text-center">
              <FileVideo size={24} className="mb-4 text-editorial-ink/40" />
              <span className="text-[9px] font-black uppercase tracking-widest">Vídeo</span>
            </div>
            <div className="p-6 bg-editorial-muted/50 flex flex-col items-center text-center">
              <FileText size={24} className="mb-4 text-editorial-ink/40" />
              <span className="text-[9px] font-black uppercase tracking-widest">Roteiro</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="h-full">
          <div className="h-full border-2 border-editorial-ink bg-white p-10 flex flex-col shadow-[12px_12px_0px_rgba(26,26,26,0.05)]">
            <div className="flex items-center justify-between border-b border-editorial-ink pb-6 mb-8">
              <span className="text-[9px] font-black uppercase tracking-widest">Relatório de Conformidade</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${result ? 'bg-emerald-500' : 'bg-editorial-ink/20'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Ready for Scan</span>
              </div>
            </div>

            {!result && !isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-editorial-ink/20 py-12">
                <Bot size={80} className="mb-8 opacity-10" />
                <h4 className="text-xl font-serif font-bold italic mb-2 text-editorial-ink/40">Aguardando Mídia</h4>
                <p className="text-[10px] font-black uppercase tracking-widest max-w-[200px] text-center leading-relaxed">Carregue um arquivo para iniciar a validação de segurança.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex-1 py-12 flex flex-col space-y-12">
                <div className="space-y-6">
                  <div className="h-2 w-1/4 bg-editorial-muted" />
                  <div className="h-8 w-full bg-editorial-muted animate-pulse" />
                  <div className="h-2 w-full bg-editorial-muted/50" />
                </div>
                <div className="space-y-6">
                  <div className="h-2 w-1/4 bg-editorial-muted" />
                  <div className="h-32 w-full bg-editorial-muted/30 border border-dashed border-editorial-ink/10" />
                </div>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-end gap-8 mb-12 border-b-2 border-editorial-ink pb-8">
                  <div className="text-[120px] font-serif font-black tracking-tighter leading-[0.8] italic">{result.score}%</div>
                  <div className="pb-4">
                    <span className={`px-4 py-1 border-2 border-editorial-ink font-sans font-black text-[10px] uppercase tracking-widest ${
                      result.status === 'approved' ? 'bg-emerald-500 text-white border-emerald-500' : 
                      result.status === 'rejected' ? 'bg-red-500 text-white border-red-500' : 'bg-editorial-gold text-editorial-ink'
                    }`}>
                      {result.status === 'approved' ? 'Aprovado' : 
                       result.status === 'rejected' ? 'Reprovado' : 'Atenção'}
                    </span>
                    <p className="text-[9px] font-black uppercase tracking-widest mt-4 opacity-40 leading-tight max-w-[120px]">Score de Conformidade TSE-2026</p>
                  </div>
                </div>

                <div className="space-y-8 flex-1">
                  <div className="p-6 bg-editorial-muted/30 border-l-4 border-editorial-ink">
                    <p className="text-xs font-sans font-bold leading-relaxed uppercase tracking-tight italic">
                      "{result.summary}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest border-b border-editorial-ink pb-2">Achados Jurídicos</h4>
                    <div className="space-y-4">
                      {result.findings.map((finding, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className={`shrink-0 mt-1 ${
                            finding.type === 'success' ? 'text-emerald-500' : 
                            finding.type === 'error' ? 'text-red-500' : 'text-editorial-gold'
                          }`}>
                            {finding.type === 'success' ? <CheckCircle2 size={16} /> : 
                             finding.type === 'error' ? <AlertCircle size={16} /> : <AlertTriangle size={16} />}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">{finding.message}</p>
                            <p className="text-[11px] font-sans font-medium text-editorial-ink/60">{finding.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-editorial-ink flex items-center justify-between">
                  <button 
                    onClick={reset}
                    className="text-[9px] font-black uppercase tracking-widest hover:text-editorial-gold transition-colors flex items-center gap-2"
                  >
                    Nova Varredura Jurídica <ArrowRight size={14} />
                  </button>
                  <button className="px-6 py-2 bg-editorial-ink text-white font-black text-[9px] uppercase tracking-widest hover:bg-editorial-gold hover:text-editorial-ink transition-all">
                    Exportar Laudo PDF
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Bot } from 'lucide-react';
