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
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center', marginTop: '10px' }}>Halaman Tracker Belum Dibuat 🌿</div>;
      case 'reward': 
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center', marginTop: '10px' }}>Halaman Reward Belum Dibuat 🎁</div>;
      case 'setting': 
        return <div className="fc-card" style={{ padding: '20px', textAlign: 'center', marginTop: '10px' }}>Halaman Pengaturan Belum Dibuat ⚙️</div>;
      default: 
        return <Dashboard />;
    }
  };

  return (
    <>
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />
      
      {/* Jika ini dihapus TabBar sebelumnya menumpuk. Saya tempatkan ia pada urutannya secara flow statis. 
          TabBar floating CSS akan berjalan sesuai CSS index Anda yang sudah diletakkan fixed. */}
      
      <div className="sync-bar ok" id="sync-bar">
        <div className="sync-dot"></div>
        <span id="sync-txt">✦ Tersinkron Penuh</span>
      </div>

      <div className="main" style={{ paddingBottom: '100px' }}>
        <div className="pages-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="fairy-footer" style={{ paddingBottom: '60px' }}>
        ✦ <span id="footer-name">Revalina</span> — Pixie Dust Journey ✦
      </div>

      <TabBar />
    </>
  );
}

export default App;
