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
    const s = new Date(blockStart).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  const getThemeBg = () => {
    switch (theme) {
      case 'moon': return 'linear-gradient(160deg, #04060f 0%, #080c1c 45%, #0c1228 100%)';
      case 'sakura': return 'linear-gradient(160deg, #1a050e 0%, #360a1c 45%, #48102a 100%)';
      case 'dark': return 'linear-gradient(160deg, #0f2a06 0%, #1a4a0a 45%, #234f10 100%)';
      default: return 'linear-gradient(160deg, #0f2a06 0%, #1a4a0a 45%, #234f10 100%)'; 
    }
  };

  const getBorderTheme = () => theme === 'moon' ? 'rgba(138,180,248,0.2)' : theme === 'sakura' ? 'rgba(240,100,160,0.2)' : 'rgba(245,200,66,0.2)';
  const glowColor = theme === 'moon' ? '#60a5fa' : theme === 'sakura' ? '#fb7185' : '#fcd34d'; 

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes swayLeafGentle { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(6deg) scale(1.02); } }
      @keyframes swayLeafReverse { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(-8deg) scale(0.98); } }
      @keyframes driftAway { 0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.4; } 100% { transform: translate(150px, -200px) rotate(45deg) scale(0.6); opacity: 0; } }
      @keyframes driftAwayReverse { 0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; } 15% { opacity: 0.5; } 85% { opacity: 0.3; } 100% { transform: translate(-200px, -150px) rotate(-60deg) scale(0.5); opacity: 0; } }
      @keyframes dustRise { 0% { transform: translateY(0px) scale(0.5); opacity: 0; } 20% { opacity: 0.9; } 80% { opacity: 0.6; } 100% { transform: translateY(-400px) scale(1.5); opacity: 0; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    // DI SINI PENGEMBALIAN DESAINNYA! 
    // Menggunakan PADDING dan BORDER KAKU asli dari HTML lama.
    <div className="header"
      style={{ 
        background: getThemeBg(),
        padding: '28px 20px 22px', 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        borderBottom: `2px solid ${getBorderTheme()}`, 
        boxShadow: '0 4px 20px rgba(26, 74, 10, 0.4)' 
      }}
    >
      
      {/* 1. CAHAYA SINEMATIK */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-25%', left: '-10%', width: '70%', height: '80%', background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`, pointerEvents: 'none', mixBlendMode: 'screen', filter: 'blur(45px)', zIndex: 0 }}
      />
      <motion.div 
        animate={{ opacity: [0.05, 0.25, 0.05], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '80%', height: '70%', background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`, pointerEvents: 'none', mixBlendMode: 'screen', filter: 'blur(35px)', zIndex: 0 }}
      />

      {/* 2. DAUN TINKERBELL & ANGIN */}
      <div className="header-leaves" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141,201,90,0.15)', boxShadow: 'inset 0 0 10px rgba(245,200,66,0.15), 0 0 5px rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.1)', width: '120px', height: '80px', top: '-20px', right: '-25px', transform: 'rotate(35deg)', transformOrigin: 'top right', animation: 'swayLeafGentle 8s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141,201,90,0.2)', boxShadow: 'inset 0 0 8px rgba(245,200,66,0.2), 0 0 4px rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.12)', width: '80px', height: '50px', bottom: '-10px', right: '25%', transform: 'rotate(-15deg)', transformOrigin: 'bottom right', animation: 'swayLeafReverse 7s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141,201,90,0.18)', boxShadow: 'inset 0 0 10px rgba(245,200,66,0.15), 0 0 5px rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.15)', width: '70px', height: '45px', top: '30px', left: '-15px', transform: 'rotate(60deg)', transformOrigin: 'left center', animation: 'swayLeafGentle 9s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(245,200,66,0.15)', boxShadow: 'inset 0 0 12px rgba(255,255,255,0.2), 0 0 8px rgba(245,200,66,0.3)', border: '1px solid rgba(245,200,66,0.25)', width: '40px', height: '25px', top: '10px', right: '40%', transform: 'rotate(120deg)', transformOrigin: 'top left', animation: 'swayLeafReverse 6s infinite ease-in-out' }}></div>
        
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.15)', width: '30px', height: '18px', bottom: '20px', left: '20%', animation: 'driftAwayReverse 15s infinite ease-in-out', animationDelay: '2s' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141,201,90,0.12)', border: '1px solid rgba(141,201,90,0.1)', width: '45px', height: '30px', top: '40%', right: '10%', animation: 'driftAway 18s infinite ease-in-out', animationDelay: '6s' }}></div>
      </div>
      
      {/* 3. SISTEM PARTIKEL DEBU PERI */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
        {Array.from({ length: 45 }).map((_, i) => {
          const size = Math.random() * 4 + 2; 
          const color = Math.random() > 0.4 ? '#fff' : glowColor;
          return (
            <div 
              key={i}
              style={{
                position: 'absolute', bottom: `-${Math.random() * 50}px`, left: `${Math.random() * 100}%`, width: `${size}px`, height: `${size}px`, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size}px #fff`, animation: `dustRise ${Math.random() * 6 + 5}s infinite linear`, animationDelay: `${Math.random() * 6}s`, opacity: 0, filter: `blur(${Math.random() > 0.7 ? 1.5 : 0}px)`
              }}
            />
          );
        })}
      </div>

      {/* --- KONTEN (100% LAYOUT ORISINAL DENGAN TIPOGRAFI BARU) --- */}
      <div className="header-top-row" style={{ position: 'relative', zIndex: 10 }}>
        <div className="header-eyebrow">
          <span>{t('hdr_eyebrow')}</span>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="coin-badge cursor-pointer"
        >
          <motion.span animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: '14px', filter: 'drop-shadow(0 0 8px rgba(245,200,66,0.8))' }}>✨</motion.span> 
          <span>{coins}</span>
        </motion.div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 10, marginTop: '8px' }}>
        <h1 
          style={{ fontFamily: "'Cormorant Garamond', 'Alice', serif", fontSize: '34px', fontWeight: 600, fontStyle: 'italic', lineHeight: 1, margin: 0, backgroundImage: 'linear-gradient(to bottom, #ffffff 40%, #fef08a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))' }}
        >
          {name || "Peri Kecil"},
        </h1>
        
        <span className="rank-badge" style={{ padding: '3px 10px', fontSize: '11px' }}>
          {rankStr}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-4px', position: 'relative', zIndex: 10 }}>
        <div>
          <div style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '24px', color: '#ffe478', textShadow: '0 0 15px rgba(245,200,66,0.4)', marginTop: '4px', marginBottom: '2px', lineHeight: 1.15 }}>
            <span>{greeting}</span>
          </div>
          <div className="header-sub" style={{ marginTop: '2px', fontSize: '11px', fontWeight: 500 }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div key={quote} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 0.95, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.8 }}
            style={{ fontFamily: '"Alice", Georgia, serif', fontSize: '14px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.8)', lineHeight: '1.4', fontWeight: 500, maxWidth: '48%', textAlign: 'right', marginTop: '8px' }}
          >
            ❝ {quote} ❞
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="prog-wrap" style={{ marginTop: '20px', position: 'relative', zIndex: 10 }}>
        
        {/* RING MELAYANG */}
        <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8900A" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#FFE478" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="rgba(0,0,0,0.15)" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradInline)" strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={strokeOffset} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffe478', lineHeight: 1 }}>{progressPct}%</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginTop: '2px', textTransform: 'uppercase' }}>{t('prog_lbl')}</div>
          </div>
          
          {progressPct > 0 && (
            <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
               <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px 3px rgba(245,200,66,0.8)' }}></div>
            </motion.div>
          )}
        </motion.div>
        
        {/* BARIS INFO HORIZONTAL (100% ORISINAL) */}
        <div className="prog-info" style={{ flex: 1, paddingLeft: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div className="prog-label" style={{ marginBottom: 0 }}>{t('prog_total_lbl')}</div>
            <div className="date-badge">
              ✦ {blockLabel}
            </div>
          </div>

          <div style={{ position: 'relative', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '7px', width: '100%', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg, #b8900a, #F5C842, #fff)', boxShadow: '0 0 12px rgba(245,200,66,0.9)', width: `${progressPct}%`, transition: 'width 1.5s cubic-bezier(.4,0,.2,1)' }}></div>
          </div>

          <div className="prog-nums" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><strong style={{ color: '#ffe478', textShadow: '0 0 5px rgba(245,200,66,0.3)' }}>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong style={{ color: '#ffe478', textShadow: '0 0 5px rgba(245,200,66,0.3)' }}>{target}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
