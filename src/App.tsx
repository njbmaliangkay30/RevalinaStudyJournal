import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Tambahan AnimatePresence
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
      case 'tracker': return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-700 font-sans selection:bg-[var(--gold-pale)] selection:text-[var(--gold-dark)]">
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />

      <main className="relative z-20 px-4 -mt-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-xl py-1.5 px-4 rounded-full mx-auto w-fit mb-4 border border-[var(--border-card)] shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_var(--green-leaf)]"></div>
          <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">
            Tersinkron
          </span>
        </motion.div>

        <div className="pages-wrapper relative">
          {/* Efek Transisi Antar Tab yang Mewah */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // Kunci penting agar Framer Motion tahu kapan harus animasi
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Spring curve buatan Apple
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-12 mb-4">
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-soft)] uppercase opacity-40">
            ✦ Revalina's Pixie Dust ✦
          </span>
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
