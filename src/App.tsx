import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
// Import Dashboard yang baru kita buat
import { Dashboard } from './pages/Dashboard';

function App() {
  const { theme, activeTab } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fungsi penentu halaman mana yang muncul
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
    <>
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />
      
      <div className="sync-bar ok">
        <div className="sync-dot"></div>
        <span>✦ Tersinkron Penuh</span>
      </div>

      {/* Area Konten Dinamis */}
      <div className="main pb-28 px-4 pt-2">
        <div className="pages-wrapper relative overflow-hidden">
          {/* Animasi Fade In Sederhana */}
          <div className="page active" style={{ position: 'relative', opacity: 1, transform: 'none', transition: 'all 0.3s ease' }}>
            {renderActivePage()}
          </div>
        </div>
      </div>

      <div className="fairy-footer pb-6 text-center">
        ✦ <span className="font-bold text-[var(--gold-dark)]">Revalina</span> — Pixie Dust Journey ✦
      </div>

      <TabBar />
    </>
  );
}

export default App;
