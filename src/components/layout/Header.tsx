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

  // --- Kunci Tema Custom ---
  const getThemeBg = () => {
    switch (theme) {
      case 'moon': return 'linear-gradient(160deg, #04060f 0%, #080c1c 45%, #0c1228 100%)';
      case 'sakura': return 'linear-gradient(160deg, #1a050e 0%, #360a1c 45%, #48102a 100%)';
      case 'dark': return 'linear-gradient(160deg, #0f2a06 0%, #1a4a0a 45%, #234f10 100%)';
      default: return 'linear-gradient(160deg, #0f2a06 0%, #1a4a0a 45%, #234f10 100%)'; // The original Forest Green
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
      
      {/* --- Ornamen Daun --- */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)', width: '120px', height: '80px', top: '-20px', right: '-25px', transform: 'rotate(35deg)' }}></div>
        <div style={{ position: 'absolute', borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)', width: '80px', height: '50px', bottom: '-10px', right: '25%', transform: 'rotate(-15deg)' }}></div>
      </div>
      
      {/* --- Baris 1: Study Journey & Koin --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
          {t('hdr_eyebrow')}
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '4px 10px', color: '#ffe478', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '14px', filter: 'drop-shadow(0 0 5px rgba(245,200,66,0.6))' }}>✨</span> 
          <span>{coins}</span>
        </motion.div>
      </div>

      {/* --- Baris 2: Nama Peri --- */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '2px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: '"Alice", Georgia, serif', fontSize: '30px', color: '#ffe478', textShadow: '0 0 15px rgba(245,200,66,0.4)', lineHeight: 1.15 }}>
          {name || "Peri Kecil"},
        </span>
        <span style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', padding: '3px 10px', borderRadius: '12px', color: '#ffe478', fontWeight: 700, fontSize: '11px', fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          {rankStr}
        </span>
      </div>
      
      {/* --- Baris 3: Greeting & Quotes --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-4px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: '"Alice", Georgia, serif', fontSize: '24px', color: '#ffe478', textShadow: '0 0 15px rgba(245,200,66,0.4)', marginTop: '4px', marginBottom: '2px', lineHeight: 1.15 }}>
            <span>{greeting}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px', fontWeight: 500, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        
        {/* Quote Kanan */}
        <div style={{ fontFamily: '"Alice", Georgia, serif', fontSize: '14px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.8)', lineHeight: '1.4', fontWeight: 500, opacity: 0.95, maxWidth: '48%', textAlign: 'right', marginTop: '8px' }}>
          ❝ {quote} ❞
        </div>
      </div>

      {/* --- Baris 4: Progress Bar & Ring --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '20px', position: 'relative', zIndex: 1 }}>
        
        {/* Orbit Ring 80x80 - Murni Bebas Black Bug */}
        <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, filter: 'drop-shadow(0 0 12px rgba(245,200,66,0.6))' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8900A" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#FFE478" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            {/* The main shiny progress line */}
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradInline)" strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={strokeOffset} style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffe478', lineHeight: 1, fontFamily: '"Quicksand", system-ui, sans-serif' }}>{progressPct}%</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: '1px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('prog_lbl')}</div>
          </div>
        </div>
        
        {/* Info Target */}
        <div style={{ flex: 1, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', margin: 0 }}>
              {t('prog_total_lbl')}
            </div>
            <div style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: '12px', padding: '4px 8px', fontSize: '9px', fontWeight: 700, color: '#ffe478', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 0 10px rgba(245,200,66,0.15)' }}>
              <span style={{ fontSize: '12px', marginRight: '2px' }}>✦</span> {blockLabel}
            </div>
          </div>

          <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '7px', width: '100%' }}>
            <div style={{ height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg,#b8900a,#ffe478)', boxShadow: '0 0 8px rgba(245,200,66,0.8),0 0 16px rgba(245,200,66,0.4)', width: `${progressPct}%`, transition: 'width 1.2s cubic-bezier(.4,0,.2,1)' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            <span><strong style={{ color: '#ffe478', fontWeight: 700, textShadow: '0 0 5px rgba(245,200,66,0.3)' }}>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong style={{ color: '#ffe478', fontWeight: 700, textShadow: '0 0 5px rgba(245,200,66,0.3)' }}>{target}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
