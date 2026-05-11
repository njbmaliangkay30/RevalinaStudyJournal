import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';

function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div id="ambient-layer"></div>
      <div id="dim-overlay"></div>

      <Header />
      <TabBar />

      <div className="sync-bar ok">
        <div className="sync-dot"></div>
        <span>✦ Tersinkron Penuh</span>
      </div>

      <div className="main">
        <div className="pages-wrapper">
          <div className="page active" style={{ position: 'relative', opacity: 1, transform: 'translateX(0)' }}>
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-mid)', fontWeight: 600 }}>
              Membangun Ruang Sihir... ✨<br/>
              (Konten Dashboard akan segera hadir di sini)
            </div>
          </div>
        </div>
      </div>

      <div className="fairy-footer">
        ✦ <span>Revalina</span> — Pixie Dust Journey ✦
      </div>
    </>
  );
}

export default App;
