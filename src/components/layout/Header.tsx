import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  const circ = 213.6;
  const strokeOffset = circ - (circ * progressPct) / 100;

  // Menentukan Teks Rank beserta Icon mahkotanya
  let rankStr = progressPct >= 100 ? "Ratu Pixie" : progressPct >= 75 ? "Peri Penjaga" : progressPct >= 50 ? "Peri Cahaya" : "Peri Pemula";
  let rankEmoji = progressPct >= 100 ? "👑" : progressPct >= 75 ? "🌿" : progressPct >= 50 ? "✨" : "🌱";

  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  // Generasi Partikel Debu Peri
  useEffect(() => {
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    // Menambah jumlah partikel untuk kesan lebih magis
    for(let i=0; i<60; i++){
      const sp = document.createElement("div"); 
      sp.className="sp";
      // Memvariasikan ukuran partikel (ada yang sangat kecil dan berkilau)
      const size = Math.random() * 4 + 1;
      sp.style.width=`${size}px`; 
      sp.style.height=`${size}px`;
      sp.style.left=`${Math.random() * 100}%`; 
      sp.style.bottom=`${Math.random() * -30}px`;
      sp.style.borderRadius = "50%";
      sp.style.position = "absolute";
      
      const themeColors = {
        moon: ["#8ab4f8","#c3d6fe","#a78bfa","#ffffff"],
        sakura: ["#f090a0","#ffc0d0","#ffffff","#ffe0e8"],
        light: ["#f5c842","#8dc95a","#ffffff","#ffe478"],
        dark: ["#f5c842","#8dc95a","#ffffff","#ffe478"]
      };
      
      const colors = themeColors[theme] || themeColors.light;
      const c = colors[Math.floor(Math.random() * colors.length)];
      
      sp.style.background = c;
      sp.style.boxShadow = `0 0 ${size * 2}px ${c}, 0 0 ${size * 4}px ${c}88`;
      sp.style.animationDuration = `${3 + Math.random() * 5}s`;
      sp.style.animationDelay = `${Math.random() * 5}s`;
      sp.style.setProperty('--float-dist', `-${180 + Math.random() * 150}px`);
      
      wrap.appendChild(sp);
    }
  }, [theme]);

  // CSS Khusus Inline untuk Background Header agar bereaksi pada tema
  const bgStyles = {
    moon: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    sakura: 'linear-gradient(135deg, #4c1d95 0%, #831843 50%, #be123c 100%)',
    light: 'linear-gradient(135deg, #064e3b 0%, #14532d 50%, #065f46 100%)',
    dark: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)'
  };

  const currentBg = bgStyles[theme] || bgStyles.light;

  return (
    // HEADER WRAPPER UTAMA
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative pt-10 pb-12 px-6 rounded-b-[48px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-10 overflow-hidden group"
      style={{ background: currentBg }}
    >
      
      {/* 1. MISTY AURA (Cahaya di dalam Header) */}
      <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-white/5 blur-[100px] pointer-events-none rounded-full animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-[var(--gold-dark)]/10 blur-[80px] pointer-events-none rounded-full"></div>

      {/* Baris Atas: Kategori & Saldo Koin */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/80 animate-ping"></div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-bold">
            {t('hdr_eyebrow')}
          </span>
        </div>
        
        {/* Lencana Koin Mewah */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="bg-black/30 border border-white/20 rounded-full px-3 py-1.5 text-[var(--gold-light)] font-bold text-[13px] flex items-center gap-1.5 backdrop-blur-md cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[15px] animate-pulse drop-shadow-[0_0_8px_rgba(245,200,66,0.8)]">✨</span> 
          <span className="tracking-wide">{coins}</span>
        </motion.div>
      </div>

      {/* Baris Tengah: Sapaan Nama & Rank */}
      <div className="mt-7 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-serif text-[36px] text-white leading-tight drop-shadow-md">
            <span className="text-[var(--gold-light)] bg-clip-text text-transparent bg-gradient-to-b from-white to-[var(--gold-light)]">
              {name || "Peri Kecil"},
            </span>
          </h1>
          
          {/* Lencana Rank Glassmorphism (Premium Look) */}
          <div className="relative overflow-hidden bg-white/10 border border-white/20 px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-sm group-hover:border-white/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            <span className="relative z-10 text-[11px] font-bold text-[var(--gold-light)] tracking-wider flex items-center gap-1">
              <span>{rankEmoji}</span> {rankStr}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-start mt-2">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-serif text-[20px] text-white/90 leading-snug drop-shadow-sm">
              {t('hdr_greeting')}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40 font-semibold uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full bg-white/5">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long' })}
              </span>
              <span className="text-[11px] text-white/60 font-medium">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Kotak Quote Interaktif & Transparan */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden sm:flex max-w-[45%] flex-col items-end text-right px-4 py-2 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm"
          >
            <p style={{ fontFamily: 'var(--serif)' }} className="text-[13px] text-white/90 italic font-medium leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              ❝ Sihir terkuat adalah ketekunanmu sendiri. ❞
            </p>
            <span className="text-[8px] text-[var(--gold-light)] uppercase tracking-[0.3em] font-bold mt-2 opacity-60">
              Mantra Hari Ini
            </span>
          </motion.div>
        </div>
      </div>

      {/* Baris Bawah: Panel Progress Membaca */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-center gap-5 mt-8 relative z-10 bg-black/20 rounded-[28px] p-5 border border-white/10 backdrop-blur-xl shadow-[inset_0_2px_20px_rgba(255,255,255,0.05)]"
      >
        {/* Lingkaran Persentase dengan Glow Ekstra */}
        <div className="relative w-[76px] h-[76px] flex-shrink-0 drop-shadow-[0_0_20px_rgba(245,200,66,0.3)]">
          <svg width="76" height="76" viewBox="0 0 80 80" className="-rotate-90">
            <defs>
              <linearGradient id="goldGradProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-light)" />
                <stop offset="50%" stopColor="var(--gold)" />
                <stop offset="100%" stopColor="var(--gold-dark)" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradProgress)" strokeWidth="7" strokeLinecap="round" 
              style={{ strokeDasharray: circ, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
            <span className="text-[17px] font-black text-[var(--gold-light)] leading-none tracking-tight">{progressPct}</span>
            <span className="text-[9px] font-bold text-white/50">%</span>
          </div>
        </div>
        
        {/* Bar & Target Detail */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
              <span className="text-[var(--gold)]">✦</span> {t('prog_total_lbl')}
            </div>
            <div className="text-[9px] font-bold text-white/90 bg-black/40 px-3 py-1 rounded-full border border-white/10 tracking-wider shadow-inner">
              {blockLabel}
            </div>
          </div>
          
          <div className="h-2.5 bg-black/30 rounded-full mb-2.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] p-[1.5px]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-light)] shadow-[0_0_12px_rgba(245,200,66,0.6)] relative" 
                 style={{ width: `${progressPct}%`, transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
               {/* Titik Inti Kilau (Lens Flare di Ujung Bar) */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.9)] animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between text-[11px] font-medium text-white/40 pt-1">
            <span className="flex items-baseline gap-1">
              <strong className="text-white text-[14px]">{doneCount}</strong> 
              <span className="tracking-wide uppercase text-[9px]">{t('prog_done_lbl')}</span>
            </span>
            <span className="flex items-baseline gap-1">
              <span className="tracking-wide uppercase text-[9px]">{t('prog_target_lbl')}</span> 
              <strong className="text-[var(--gold-light)] text-[14px]">{target}</strong>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Partikel Animasi Bintang jatuh (Disetel ke fixed / relative berdasarkan CSS) */}
      <div className="sparkles mix-blend-screen pointer-events-none" id="sparkles"></div>

    </motion.div>
  );
};
