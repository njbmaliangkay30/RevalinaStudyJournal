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
      case 'dashboard': 
        return <Dashboard />;
      case 'tracker': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold">Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: 
        return <Dashboard />;
    }
  };

  return (
    // Latar Aplikasi Keseluruhan 
    <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-700 font-sans">
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      {/* Bagian Header yang ujung bawahnya "menganga/terbuka lebar" tanpa garis batas */}
      <Header />

      {/* 
        Sihir Peleburan (Misty Overlay):
        Sebuah tirai gradien lembut yang menempelkan Header Hijau 
        ke bagian konten dengan mulus bak kabut.
      */}
      <div 
        className="absolute w-full h-[150px] z-10 pointer-events-none -mt-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-main) 90%)'
        }}
      ></div>

      {/* BODY KONTEN YANG MENUMPANG (Levitating Content) */}
      <main className="relative z-20 px-4 pb-32" style={{ marginTop: '-45px' }}>
        
        {/* Pil Sinkronisasi Transparan Melayang (Aura Premium) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2.5 backdrop-blur-md bg-black/5 dark:bg-white/10 py-1.5 px-5 rounded-full mx-auto w-fit mb-5 shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_6px_var(--green-leaf)]"></div>
          <span className="text-[9px] font-bold text-[var(--text-mid)] uppercase tracking-[0.15em] opacity-80">
            Penyimpanan Aktif
          </span>
        </motion.div>

        <div className="pages-wrapper relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Signature Samarsamar */}
        <div className="text-center mt-12 mb-4">
          <span className="text-[9px] font-extrabold tracking-[0.3em] text-[var(--text-soft)] uppercase opacity-30">
            ✦ Revalina's Pixie Dust ✦
          </span>
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
