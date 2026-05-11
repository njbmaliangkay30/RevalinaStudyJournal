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
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-10 backdrop-blur-md bg-white/30 rounded-3xl border border-white/20 shadow-sm">Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-10 backdrop-blur-md bg-white/30 rounded-3xl border border-white/20 shadow-sm">Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-10 backdrop-blur-md bg-white/30 rounded-3xl border border-white/20 shadow-sm">Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: 
        return <Dashboard />;
    }
  };

  return (
    // Body Background Keseluruhan Warna Putih-Gading Terang Asli ("var(--bg-main)")
    <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-700 font-sans relative">
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      {/* Bagian 1: Header Hutan (Memanjang sampai belakang Dashboard) */}
      <Header />

      {/* Bagian 2: Jembatan Magis (Tirai Asimilasi Seamless Blending) 
          Area Header Warna Gelap akan membaur mulus (gradient-to-bottom) jadi Transparan, memakan lahan Latar Body! 
      */}
      <div 
        className="absolute left-0 w-full h-[150px] pointer-events-none z-10"
        style={{
           // Dari Forest Green Header yang terakhir, turun memudar perlahan menjadi warna bg body
           background: `linear-gradient(to bottom, #19460E 0%, var(--bg-main) 100%)`, 
           top: '250px' // Angka estimasi perpotongan layar hijau terakhir
        }}
      ></div>

      {/* Bagian 3: Konten Utama Kartu Kaca Yang DITARIK NAIK (Menindih Transisi Blur) */}
      <main className="relative z-20 px-4 pb-32 pt-2 -mt-16">
        
        {/* Pil Sinkron */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 bg-white/50 backdrop-blur-lg py-1.5 px-5 rounded-full mx-auto w-fit mb-5 border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_var(--green-leaf)]"></div>
          <span className="text-[10px] font-bold text-[var(--green-deep)] uppercase tracking-[0.1em] opacity-80">
            Tersinkron
          </span>
        </motion.div>

        {/* Dashboard Pages */}
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

        {/* Footer Kecil Pucat */}
        <div className="text-center mt-12 mb-4">
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-soft)] uppercase opacity-40 drop-shadow-sm">
            ✦ Revalina's Pixie Dust ✦
          </span>
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
