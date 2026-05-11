import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { Dashboard } from './pages/Dashboard';

function App() {
  const { theme, activeTab } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tracker':   return (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <span className="text-4xl">🌿</span>
          <p className="text-[13px] font-semibold text-[var(--text-mid)]">Tracker sedang disiapkan</p>
          <p className="text-[11px] text-[var(--text-soft)]">Fitur ini akan hadir segera</p>
        </div>
      );
      case 'reward':    return (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <span className="text-4xl">🎁</span>
          <p className="text-[13px] font-semibold text-[var(--text-mid)]">Reward sedang disiapkan</p>
          <p className="text-[11px] text-[var(--text-soft)]">Kumpulkan poin dulu ya!</p>
        </div>
      );
      case 'setting':   return (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <span className="text-4xl">⚙️</span>
          <p className="text-[13px] font-semibold text-[var(--text-mid)]">Pengaturan sedang disiapkan</p>
          <p className="text-[11px] text-[var(--text-soft)]">Sabar ya, peri sedang kerja keras!</p>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-700 font-sans selection:bg-[var(--gold-pale)] selection:text-[var(--gold-dark)]">
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />

      <main className="relative z-20 px-4 pt-3 pb-28">

        {/* Badge "Tersinkron" — lebih kecil, tidak terlalu mendominasi */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 mb-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_6px_var(--green-leaf)]" />
          <span className="text-[9px] font-bold text-[var(--text-soft)] uppercase tracking-wider opacity-60">
            Tersinkron
          </span>
        </motion.div>

        {/* Wrapper halaman dengan transisi */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
