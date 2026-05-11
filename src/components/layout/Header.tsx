import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [quote, setQuote] = useState(MAGIC_QUOTES[0]);

  useEffect(() => {
    setQuote(MAGIC_QUOTES[Math.floor(Math.random() * MAGIC_QUOTES.length)]);
  }, []);

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  
  // Karena Cincin kita buat sedikit lebih tebal/elegan ukurannya
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

  return (
    <div 
      style={{ 
        background: getThemeBg(),
        padding: '28px 20px 22px', 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        borderBottom: `2px solid ${getBorderTheme()}`, 
        boxShadow: '0 4px 20px rgba(26, 74, 10, 0.2)' 
      }}
    >
      
      {/* --- Ornamen Daun Khas Tinkerbell --- */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)', width: '120px', height: '80px', top: '-20px', right: '-25px', transform: 'rotate(35deg)' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)', width: '80px', height: '50px', bottom: '-10px', right: '25%', transform: 'rotate(-15deg)' }}></div>
      </div>
      
      {/* --- Baris 1: Study Journey & Poin Bouncing --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
          {t('hdr_eyebrow')}
        </div>
        
        {/* Koin Interaktif Bouncing */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '4px 10px', color: '#ffe478', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '14px', filter: 'drop-shadow(0 0 5px rgba(245,200,66,0.6))' }}>✨</span> 
          <span>{coins}</span>
        </motion.div>
      </div>

      {/* --- Baris 2: Nama Elegan (Cormorant Font) & Rank --- */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 1, marginTop: '8px' }}>
        {/* Teks Peri dengan Font Elegan yang Anda Sukai */}
        <h1 
          style={{ 
            fontFamily: "'Cormorant Garamond', 'Alice', serif", 
            fontSize: '36px', 
            fontWeight: 600, 
            fontStyle: 'italic', 
            lineHeight: 1,
            margin: 0,
            backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, #fef08a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
          }}
        >
          {name || "Peri Kecil"},
        </h1>
        
        <span style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', padding: '3px 10px', borderRadius: '12px', color: '#ffe478', fontWeight: 700, fontSize: '11px', fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          {rankStr}
        </span>
      </div>
      
      {/* --- Baris 3: Sapaan Lembut & Quote --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '26px', color: '#ffe478', textShadow: '0 0 15px rgba(245,200,66,0.4)', marginTop: '2px', marginBottom: '2px', lineHeight: 1.15 }}>
            <span>{greeting}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', fontWeight: 500, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        
        {/* Quote Peri (Agak pudar supaya estetis) */}
        <div style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', textShadow: '0 0 10px rgba(0,0,0,0.5)', lineHeight: '1.3', fontWeight: 600, maxWidth: '45%', textAlign: 'right', marginTop: '6px' }}>
          ❝ {quote} ❞
        </div>
      </div>

      {/* --- Baris 4: Floating Progress Bar & Info (Harmonis) --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '24px', position: 'relative', zIndex: 1 }}>
        
        {/* LINGKARAN PROGRESS YANG FLOATING (Levitating Ring) */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'relative', width: '85px', height: '85px', flexShrink: 0, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))' }}
        >
          <svg width="85" height="85" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#b8900a" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            {/* Lintasan bercahaya yang jalan perlahan */}
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradInline)" strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={strokeOffset} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          
          {/* Angka Persentase di Tengah Cincin Melayang */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1, fontFamily: '"Quicksand", system-ui, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{progressPct}</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#f5c842', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>%</div>
          </div>
          
          {/* Bintang Satelit Kecil yang berputar mengelilingi persentase */}
          {progressPct > 0 && (
            <motion.div 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px 3px rgba(245,200,66,0.8)' }}></div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Info Batang Progress Horizontal Asli Anda */}
        <div style={{ flex: 1, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
              {t('prog_total_lbl')}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', fontWeight: 700, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '12px', color: '#f5c842' }}>✦</span> {blockLabel}
            </div>
          </div>

          <div style={{ height: '5px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px', marginBottom: '7px', width: '100%', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
            <div style={{ height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg, #b8900a, #F5C842, #fff)', boxShadow: '0 0 10px rgba(245,200,66,0.8)', width: `${progressPct}%`, transition: 'width 1.5s cubic-bezier(.4,0,.2,1)' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            <span><strong style={{ color: '#ffe478', fontSize: '14px', textShadow: '0 0 5px rgba(245,200,66,0.3)' }}>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong style={{ color: '#fff', fontSize: '13px' }}>{target}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
