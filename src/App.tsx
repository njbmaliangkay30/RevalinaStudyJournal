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
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center' }}>Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': 
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center' }}>Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': 
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center' }}>Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: 
        return <Dashboard />;
    }
  };

  return (
    // Memastikan background mengambil dari CSS theme variables
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-dark)', minHeight: '100vh', paddingBottom: '100px' }}>
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      {/* HEADER: Kaku, Berbatas Tegas, Rapi */}
      <Header />

      {/* SYNC BAR ASLI */}
      <div className="sync-bar ok" id="sync-bar">
        <div className="sync-dot"></div>
        <span id="sync-txt">✦ Tersinkron Penuh</span>
      </div>

      {/* MAIN KONTEN ASLI */}
      <main className="main">
        <div className="pages-wrapper relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER ASLI */}
      <div className="fairy-footer">
        ✦ <span id="footer-name">Revalina</span> — Pixie Dust Journey ✦
      </div>

      {/* TabBar Navigasi Bawah */}
      <TabBar />
    </div>
  );
}

export default App;
