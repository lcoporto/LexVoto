import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import type { ViewType } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Views
import DashboardOverview from './views/Dashboard/DashboardOverview';
import AIConsultancy from './views/Consultancy/AIConsultancy';
import AdsVerification from './views/Propaganda/AdsVerification';
import Accountability from './views/Accountability/Accountability';
import CandidateGuide from './views/Guide/CandidateGuide';
import LandingPage from './views/LandingPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  if (!isLoggedIn) {
    return <LandingPage onStart={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'consultancy':
        return <AIConsultancy />;
      case 'ads':
        return <AdsVerification />;
      case 'accountability':
        return <Accountability />;
      case 'guide':
        return <CandidateGuide />;
      default:
        return <div className="p-12 text-center text-slate-400">View em desenvolvimento...</div>;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Visão Geral';
      case 'consultancy': return 'Consultoria Jurídica IA';
      case 'ads': return 'Verificação de Propaganda';
      case 'accountability': return 'Prestação de Contas';
      case 'guide': return 'Guia do Candidato';
      default: return 'LEXVOTO';
    }
  };

  return (
    <div className="flex h-screen bg-editorial-paper font-sans text-editorial-ink overflow-hidden selection:bg-editorial-gold/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={getTitle()} />
        
        <div className="flex-1 overflow-y-auto p-12 bg-editorial-paper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-7xl mx-auto h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
