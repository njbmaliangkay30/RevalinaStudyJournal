import { useEffect } from 'react';
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
      
      {/* 
        Kita memindahkan TabBar ke bagian bawah kode agar secara struktur 
        masuk akal, meskipun posisi visualnya diatur oleh CSS 'fixed' 
      */}

      <div className="sync-bar ok">
        <div className="sync-dot"></div>
        <span>✦ Tersinkron Penuh</span>
      </div>

      {/* 
        PENTING: Tambahkan pb-28 (padding-bottom) di className main ini 
        agar konten tidak tertutup oleh TabBar yang melayang di bawah 
      */}
      <div className="main pb-28">
        <div className="pages-wrapper">
          <div className="page active" style={{ position: 'relative', opacity: 1, transform: 'translateX(0)' }}>
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-mid)', fontWeight: 600 }}>
              Membangun Ruang Sihir... ✨<br/>
              (Konten Dashboard akan segera hadir di sini)
            </div>
          </div>
        </div>
      </div>

      <div className="fairy-footer pb-6">
        ✦ <span>Revalina</span> — Pixie Dust Journey ✦
      </div>

      {/* TabBar diletakkan di paling bawah */}
      <TabBar />
    </>
  );
}

export default App;
