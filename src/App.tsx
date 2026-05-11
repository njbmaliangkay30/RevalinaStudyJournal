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
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-4">Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-4">Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': 
        return <div className="text-center p-8 text-[var(--text-mid)] font-semibold mt-4">Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: 
        return <Dashboard />;
    }
  };

  return (
    // Memastikan background Gading tetap bersih
    <div className="min-h-screen transition-colors duration-700 font-sans" style={{ background: 'var(--bg-main)' }}>
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      {/* Header Solid (Tanpa Margin/Padding Siluman) */}
      <Header />

      {/* Bar Sinkronisasi Khas Asli Anda */}
      <div className="sync-bar ok" style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <div className="sync-dot"></div>
        <span>✦ Tersinkron Penuh</span>
      </div>

      {/* Konten Utama Murni (Halaman Dashboard/Tracker/Dll) */}
      <main className="main" style={{ paddingBottom: '120px' }}>
        <div className="pages-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Watermark/Footer Kecil di Ujung Bawah */}
        <div className="fairy-footer" style={{ marginTop: '20px' }}>
          ✦ <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Revalina</span> — Pixie Dust Journey ✦
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
