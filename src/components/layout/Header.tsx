import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

const MAGIC_QUOTES = [
  "Belajar adalah cara kita menumbuhkan sayap untuk terbang.",
  "Semua keajaiban butuh sedikit waktu dan banyak usaha.",
  "Satu halaman lagi, satu kepakan sayap lebih tinggi.",
  "Jangan berhenti saat lelah, berhentilah saat selesai.",
  "Fokus hari ini adalah keajaiban esok hari."
];

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd, lang } = useAppStore();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(MAGIC_QUOTES[Math.floor(Math.random() * MAGIC_QUOTES.length)]);
  }, []);

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  const circ = 213.6;
  const strokeOffset = circ - (circ * progressPct) / 100;

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (lang === 'id') return h < 11 ? "Semangat mengawali harimu!" : h < 15 ? "Mari terus kepakkan sayapmu!" : h < 18 ? "Sore yang tenang untuk menyerap ilmu!" : "Waktunya merapikan perlengkapan ajaibmu!";
    return h < 11 ? "Have a magical morning!" : h < 15 ? "Keep flapping those wings!" : h < 18 ? "A peaceful evening to learn!" : "Time to rest your magic!";
  }, [lang]);

  let rankStr = progressPct >= 100 ? "👑 Ratu Pixie" : progressPct >= 75 ? "🌿 Peri Penjaga" : progressPct >= 50 ? "✨ Peri Cahaya" : "🌱 Peri Pemula";

  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  // Inject Animasi Hutan
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes flyLeaf1 { 0% { transform: translate(0, 0) rotate(35deg) scale(1); opacity: 0; } 15% { opacity: 0.8; } 60% { opacity: 0.8; } 100% { transform: translate(120px, -60px) rotate(60deg) scale(0.6); opacity: 0; } }
      @keyframes flyLeaf2 { 0% { transform: translate(0, 0) rotate(-15deg) scale(1); opacity: 0; } 20% { opacity: 0.7; } 75% { opacity: 0.7; } 100% { transform: translate(80px, -40px) rotate(-30deg) scale(0.7); opacity: 0; } }
      @keyframes flyLeaf3 { 0% { transform: translate(0, 0) rotate(60deg) scale(1); opacity: 0; } 25% { opacity: 0.6; } 80% { opacity: 0.6; } 100% { transform: translate(-100px, 50px) rotate(30deg) scale(0.5); opacity: 0; } }
      @keyframes flyLeaf4 { 0% { transform: translate(0, 0) rotate(120deg) scale(1); opacity: 0; } 10% { opacity: 0.9; } 60% { opacity: 0.9; } 100% { transform: translate(150px, -150px) rotate(180deg) scale(0.4); opacity: 0; } }
      @keyframes dustRise { 0% { transform: translateY(0px) scale(0.5); opacity: 0; } 20% { opacity: 0.9; } 80% { opacity: 0.6; } 100% { transform: translateY(-400px) scale(1.5); opacity: 0; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const glowColor = theme === 'moon' ? '#60a5fa' : theme === 'sakura' ? '#fb7185' : '#fcd34d';

  return (
    // Memanggil MURNI "className='header'" dari index.css Anda agar background aslinya bekerja 100%
    <div className="header relative overflow-hidden z-10">

      {/* 🌟 AURA MAGIS YANG BERDETAK DI BACKGROUND */}
      <motion.div 
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.1, 0.95] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-25%', left: '-15%', width: '70%', height: '80%', background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`, pointerEvents: 'none', mixBlendMode: 'screen', filter: 'blur(35px)', zIndex: 0 }}
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '-25%', right: '-15%', width: '80%', height: '70%', background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`, pointerEvents: 'none', mixBlendMode: 'screen', filter: 'blur(45px)', zIndex: 0 }}
      />

      {/* ✨ DEBU PERI MENGALIR KE ATAS */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 4 + 2; 
          const color = Math.random() > 0.4 ? '#fff' : glowColor;
          return (
            <div 
              key={i}
              style={{
                position: 'absolute', bottom: `-${Math.random() * 50}px`, left: `${Math.random() * 100}%`,
                width: `${size}px`, height: `${size}px`, backgroundColor: color, borderRadius: '50%',
                boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size}px #fff`,
                animation: `dustRise ${Math.random() * 6 + 5}s infinite linear`, animationDelay: `${Math.random() * 6}s`, opacity: 0,
                filter: `blur(${Math.random() > 0.7 ? 1.5 : 0}px)`
              }}
            />
          );
        })}
      </div>

      {/* 🍃 MENGEMBALIKAN KELAS HTML ORIGINAL UNTUK DAUN (Supaya bentuk & pendar hijaunya tidak rusak) */}
      <div className="header-leaves" style={{ zIndex: 3 }}>
        <div className="leaf leaf1" style={{ animation: 'flyLeaf1 14s infinite ease-in-out', animationDelay: '1s' }}></div>
        <div className="leaf leaf2" style={{ animation: 'flyLeaf2 16s infinite ease-in-out', animationDelay: '5s' }}></div>
        <div className="leaf leaf3" style={{ animation: 'flyLeaf3 13s infinite ease-in-out', animationDelay: '2.5s' }}></div>
        <div className="leaf leaf4" style={{ animation: 'flyLeaf4 11s infinite ease-in-out', animationDelay: '8s' }}></div>
      </div>
      
      {/* --- MURNI HTML KONTEN ANDA --- */}
      <div className="header-top-row" style={{ position: 'relative', zIndex: 10 }}>
        <div className="header-eyebrow">
          <span>{t('hdr_eyebrow')}</span>
        </div>
        
        {/* Kelas 'coin-badge' dipakai persis, saya tambahkan properti gerak saja */}
        <motion.div 
          className="coin-badge cursor-pointer"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          <motion.span animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>✨</motion.span> 
          <span>{coins}</span>
        </motion.div>
      </div>

      <div className="header-name" style={{ position: 'relative', zIndex: 10 }}>
        <span className="name-text" style={{ fontFamily: "'Cormorant Garamond', 'Alice', serif", fontStyle: 'italic', fontWeight: 600 }}>
          {name || "Peri Kecil"},
        </span>
        <span className="rank-badge">
          {rankStr}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-4px', position: 'relative', zIndex: 10 }}>
        <div>
          <div className="header-name" style={{ fontSize: '24px', marginTop: '4px', marginBottom: '2px' }}>
            <span className="name-text" style={{ fontFamily: "'Cormorant Garamond', 'Alice', serif", fontWeight: 600 }}>{greeting}</span>
          </div>
          <div className="header-sub" style={{ marginTop: '2px' }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div key={quote} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 0.95, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.8 }}
            style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '15px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.8)', lineHeight: '1.4', fontWeight: 500, maxWidth: '48%', textAlign: 'right', marginTop: '8px' }}
          >
            ❝ {quote} ❞
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- BOX PROGRESS MURNI SESUAI ASLI --- */}
      <div className="prog-wrap" style={{ position: 'relative', zIndex: 10, marginTop: '20px' }}>
        
        {/* Ring-outer murni HTML dengan tambahan fitur gerak */}
        <motion.div className="ring-outer" animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8900A" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#FFE478" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="40" cy="40" r="34" />
            <circle className="ring-track" cx="40" cy="40" r="34" />
            <circle className="ring-glow" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }} />
            <circle className="ring-fill" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          <div className="ring-center">
            <div className="ring-pct">{progressPct}%</div>
            <div className="ring-lbl">{t('prog_lbl')}</div>
          </div>

          {progressPct > 0 && (
            <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
               <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px 3px rgba(245,200,66,0.8)' }}></div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Info Progress memanggil Class Asli "prog-info" , "prog-label", dll agar putih dan kuningnya KEMBALI */}
        <div className="prog-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div className="prog-label" style={{ marginBottom: 0 }}>{t('prog_total_lbl')}</div>
            <div className="date-badge">
              ✦ {blockLabel}
            </div>
          </div>

          <div className="prog-bar-track">
            <div className="prog-bar-fill" style={{ width: `${progressPct}%`, transition: 'width 1.2s cubic-bezier(.4,0,.2,1)' }}></div>
            {/* Animasi Sinar Tambahan Khusus yang numpang di Track Asli */}
            {progressPct > 0 && (
              <motion.div animate={{ x: ['-100%', '250%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'skewX(-20deg)', pointerEvents: 'none' }} />
            )}
          </div>

          <div className="prog-nums">
            <span><strong>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong>{target}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
