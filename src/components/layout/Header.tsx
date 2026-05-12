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

  const glowColor = theme === 'moon' ? '#60a5fa' : theme === 'sakura' ? '#fb7185' : '#fcd34d'; 

  return (
    <div className="header relative z-10 px-5 pt-6 pb-8">
      {/* BACKGROUND DENGAN EFEK FADE-OUT KE BAWAH */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none" 
        style={{ 
          background: getThemeBg(),
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }} 
      />
      
      {/* 🌟 NAFAS HUTAN */}
      <motion.div 
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none mix-blend-screen z-0"
        style={{
          top: '-25%', left: '-15%', width: '150%', height: '150%',
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`,
          filter: 'blur(35px)'
        }}
      />
      
      {/* Glow Kanan Bawah */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute pointer-events-none mix-blend-screen z-0"
        style={{
          bottom: '-25%', right: '-15%', width: '80%', height: '70%',
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
          filter: 'blur(45px)'
        }}
      />

      {/* ✨ PIXIE DUST (Partikel Bergerak Leluasa Ke Atas) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 4 + 2; 
          const color = Math.random() > 0.4 ? '#fff' : glowColor;
          return (
            <div 
              key={i}
              className="absolute rounded-full opacity-0"
              style={{
                bottom: `-${Math.random() * 50}px`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`, height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size}px #fff`,
                animation: `dustRise ${Math.random() * 6 + 5}s infinite linear`,
                animationDelay: `${Math.random() * 6}s`,
                filter: `blur(${Math.random() > 0.7 ? 1.5 : 0}px)`
              }}
            />
          );
        })}
      </div>

      {/* 🍃 DAUN YANG SEMUANYA MENJAUH DENGAN ANGIN */}
      <div className="header-leaves absolute inset-0 pointer-events-none z-[2]">
        {/* Daun 1 - Kanan Atas */}
        <div className="absolute" style={{ borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(245,200,66,0.15), 0 0 8px rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.1)', width: '120px', height: '80px', top: '-10px', right: '-15px', animation: 'flyLeafTopRight 14s infinite ease-in-out', animationDelay: '1s' }}></div>
        {/* Daun 2 - Kanan Bawah Tengah */}
        <div className="absolute" style={{ borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.18)', boxShadow: 'inset 0 0 10px rgba(245,200,66,0.1), 0 0 5px rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.1)', width: '80px', height: '50px', bottom: '15%', right: '25%', animation: 'flyLeafBottomRight 16s infinite ease-in-out', animationDelay: '5s' }}></div>
        {/* Daun 3 - Kiri Tengah */}
        <div className="absolute" style={{ borderRadius: '50% 0 50% 0', background: 'rgba(141, 201, 90, 0.15)', boxShadow: 'inset 0 0 10px rgba(245,200,66,0.15), 0 0 6px rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.12)', width: '70px', height: '45px', top: '35%', left: '5%', animation: 'flyLeafMidLeft 13s infinite ease-in-out', animationDelay: '2.5s' }}></div>
        {/* Daun 4 - Melintas dari Bawah Cepat */}
        <div className="absolute" style={{ borderRadius: '50% 0 50% 0', background: 'rgba(245, 200, 66, 0.15)', boxShadow: 'inset 0 0 15px rgba(255,255,255,0.2), 0 0 10px rgba(245,200,66,0.3)', border: '1px solid rgba(245,200,66,0.25)', width: '45px', height: '30px', top: '15%', left: '20%', animation: 'flyLeafTopLeft 11s infinite ease-in-out', animationDelay: '8s' }}></div>
      </div>

      {/* --- KONTEN TEKS --- */}
      <div className="flex justify-between items-start relative z-10">
        <div className="text-[10px] tracking-[0.18em] uppercase text-white/60 font-bold" style={{ textShadow: '0 0 8px rgba(255,255,255,0.3)' }}>
          {t('hdr_eyebrow')}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/30 border border-[#f5c842]/30 text-[#ffe478] font-extrabold text-xs cursor-pointer"
          style={{ boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.1), 0 0 10px rgba(245,200,66,0.1)' }}
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm" style={{ filter: 'drop-shadow(0 0 8px rgba(245,200,66,0.8))' }}
          >✨</motion.span> 
          <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{coins}</span>
        </motion.div>
      </div>

      <div className="flex items-center flex-wrap gap-2 mb-1 relative z-10 mt-2.5">
        <motion.h1 
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[38px] font-bold italic m-0 leading-none"
          style={{ 
            fontFamily: "'Cormorant Garamond', 'Alice', serif",
            backgroundImage: 'linear-gradient(to bottom, #ffffff 40%, #fef08a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.2))'
          }}
        >
          {name || "Peri Kecil"},
        </motion.h1>
        
        <div className="relative">
          <div className="absolute inset-0 bg-[#f5c842]/30 blur-[8px] rounded-xl"></div>
          <span className="relative inline-block px-2.5 py-1 rounded-xl bg-[#f5c842]/15 border border-[#f5c842]/40 text-[#ffe478] font-bold text-[10px] tracking-wider" style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}>
            {rankStr}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-[26px] text-[#ffe478] font-semibold my-0.5 leading-tight" style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', textShadow: '0 0 15px rgba(245,200,66,0.5)' }}>
            <span>{greeting}</span>
          </div>
          <div className="text-[11px] text-white/50 mt-1 font-semibold" style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={quote}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.95, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.8 }}
            className="text-[15px] text-white italic font-semibold max-w-[45%] text-right mt-1.5 leading-snug"
            style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', textShadow: '0 0 12px rgba(255,255,255,0.7)' }}
          >
            ❝ {quote} ❞
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5 mt-3 relative z-10">
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[85px] h-[85px] shrink-0" style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.4))' }}
        >
          <div className="absolute inset-1 rounded-full bg-[#f5c842]/15 blur-[15px]"></div>

          <svg width="85" height="85" viewBox="0 0 80 80" className="-rotate-90">
            <defs>
              <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#b8900a" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradInline)" strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={strokeOffset} className="transition-all duration-1500 ease-out" />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-[20px] font-extrabold text-white leading-none" style={{ fontFamily: '"Quicksand", system-ui, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >{progressPct}</motion.div>
            <div className="text-[9px] font-bold text-[#f5c842] mt-[3px] uppercase tracking-widest">%</div>
          </div>
          
          {progressPct > 0 && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-[-3px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-white" style={{ boxShadow: '0 0 12px 4px rgba(245,200,66,0.9), 0 0 4px 1px #fff' }}
              ></motion.div>
            </motion.div>
          )}
        </motion.div>
        
        <div className="flex-1" style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] font-bold text-white/50 tracking-wider m-0 uppercase">
              {t('prog_total_lbl')}
            </div>
            <div className="inline-flex items-center gap-1 bg-black/30 border border-white/10 rounded-xl px-2.5 py-1 text-[10px] font-bold text-white shadow-inner">
              <span className="text-[12px] text-[#f5c842]">✦</span> {blockLabel}
            </div>
          </div>

          <div className="relative h-1.5 bg-black/30 rounded shadow-inner w-full overflow-hidden mb-2">
            <div className="absolute top-0 left-0 h-1.5 rounded bg-gradient-to-r from-[#b8900a] via-[#F5C842] to-white transition-all duration-1500 ease-out" style={{ width: `${progressPct}%`, boxShadow: '0 0 12px rgba(245,200,66,0.9)' }}></div>
            
            {progressPct > 0 && (
              <motion.div 
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                className="absolute inset-y-0 left-0 w-10 -skew-x-12 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
            )}
          </div>

          <div className="flex justify-between text-[11px] text-white/40 font-medium">
            <span className="flex items-baseline gap-1">
              <strong className="text-[#ffe478] text-[15px]" style={{ textShadow: '0 0 8px rgba(245,200,66,0.5)' }}>{doneCount}</strong> 
              {t('prog_done_lbl')}
            </span>
            <span className="flex items-baseline gap-1">
              {t('prog_target_lbl')} 
              <strong className="text-white text-[14px]" style={{ textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>{target}</strong>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
