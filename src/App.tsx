import { useEffect } from 'react';
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
    <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-700">
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />

      {/* Konten Utama (Body) */}
      {/* PENTING: -mt-6 menarik konten ke atas agar menimpa lengkungan Header */}
      <main className="relative z-20 px-4 -mt-6 pb-32">
        
        {/* Sync Bar yang lebih rapi (melayang di atas konten) */}
        <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-md py-1.5 px-4 rounded-full mx-auto w-fit mb-4 border border-[var(--border-card)] shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-leaf)] animate-pulse"></div>
          <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">
            Tersinkron
          </span>
        </div>

        <div className="pages-wrapper">
          <div className="page active transition-all duration-300">
            {renderActivePage()}
          </div>
        </div>

        <div className="text-center mt-10">
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-soft)] uppercase opacity-60">
            ✦ Revalina's Pixie Dust ✦
          </span>
        </div>
      </main>

      <TabBar />
    </div>
  );
}

export default App;
