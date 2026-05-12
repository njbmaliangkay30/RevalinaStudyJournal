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
      case 'tracker':
        return (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="text-4xl">🌿</span>
            <p className="text-[13px] font-semibold text-[var(--text-mid)]">Tracker sedang disiapkan</p>
            <p className="text-[11px] text-[var(--text-soft)]">Fitur ini akan hadir segera</p>
          </div>
        );
      case 'reward':
        return (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="text-4xl">🎁</span>
            <p className="text-[13px] font-semibold text-[var(--text-mid)]">Reward sedang disiapkan</p>
            <p className="text-[11px] text-[var(--text-soft)]">Kumpulkan poin dulu ya!</p>
          </div>
        );
      case 'setting':
        return (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
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
      <div id="ambient-layer" />
      <div id="dim-overlay" />

      <Header />

      {/* Body — relative untuk gradient bleed */}
      <main className="relative z-20 px-4 pt-2 pb-28">

        {/* Gradient bleed dari hijau header ke krem body — efek kesatuan */}
        <div className="body-gradient-bleed" />

        {/* Badge tersinkron — sangat subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-1.5 mb-3 relative z-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_5px_var(--green-leaf)]" />
          <span className="text-[9px] font-bold text-[var(--text-soft)] uppercase tracking-wider opacity-50">
            Tersinkron
          </span>
        </motion.div>

        {/* Konten halaman dengan transisi */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, scale: 0.988 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.988 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
