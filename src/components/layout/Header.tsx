import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  const circ = 251.2; // 2 * PI * r (R=40 untuk ring yang lebih besar & presisi)
  const strokeOffset = circ - (circ * progressPct) / 100;

  // Level Keajaiban Peri
  let rankStr = progressPct >= 100 ? "Ratu Pixie" : progressPct >= 75 ? "Peri Penjaga" : progressPct >= 50 ? "Peri Cahaya" : "Peri Pemula";

  let blockLabel = "Menunggu Misi";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} - ${e}`;
  }

  // Mengatur warna nyawa berdasar tema
  const themeColors = {
    moon: { base: '#0b132b', top: '#172554', glow: '#60a5fa' },
    sakura: { base: '#2b0b13', top: '#500724', glow: '#fb7185' },
    dark: { base: '#021a11', top: '#064e3b', glow: '#fcd34d' },
    light: { base: '#14532d', top: '#065f46', glow: '#fcd34d' }
  };
  const activeColor = themeColors[theme] || themeColors.light;

  useEffect(() => {
    // Generate Debu Peri interaktif di Latar
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 40; i++) {
      const sp = document.createElement("div"); 
      const size = Math.random() * 3 + 1;
      sp.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: ${activeColor.glow};
        box-shadow: 0 0 ${size*2}px ${activeColor.glow}, 0 0 ${size*4}px #fff;
        border-radius: 50%;
        left: ${Math.random() * 100}%; bottom: -10%;
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: floatUp ${4 + Math.random() * 8}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      // Tambah css sementara via id agar bisa ditimpa
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          50% { opacity: ${Math.random() * 0.8 + 0.2}; transform: translateY(-${100 + Math.random() * 100}px) scale(1); }
          100% { transform: translateY(-${250 + Math.random() * 100}px) scale(0.2); opacity: 0; }
        }
      `;
      wrap.appendChild(styleTag);
      wrap.appendChild(sp);
    }
  }, [theme]);

  return (
    <div 
      className="relative px-6 pt-10 pb-8 rounded-b-[40px] z-10 overflow-hidden"
      style={{ 
        background: `linear-gradient(170deg, ${activeColor.top} 0%, ${activeColor.base} 100%)`,
        boxShadow: `0 12px 35px -5px ${activeColor.base}80` 
      }}
    >
      
      {/* 🌟 NAFAS MAGIS DI BACKGROUND (BREATHING AURA) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-[10%] left-[20%] w-[150%] h-[150%] rounded-full blur-[90px] mix-blend-screen pointer-events-none"
        style={{ backgroundColor: activeColor.glow }}
      />
      
      {/* Wadah Sparkles */}
      <div id="sparkles" className="absolute inset-0 pointer-events-none mix-blend-screen" />

      {/* Tali Gelombang Abstrak ala Portal Kaca */}
      <svg className="absolute bottom-0 right-0 w-[65%] h-[80%] opacity-[0.07] pointer-events-none drop-shadow-[0_0_15px_#fff]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0,100 C 40,70 60,90 100,40 L 100,100 Z" fill={activeColor.glow} />
        <path d="M 30,100 C 50,60 80,70 100,20 L 100,100 Z" fill={activeColor.glow} />
      </svg>


      {/* =========================================
          BARIS 1: NAMA APLIKASI & SALDO KOIN
          ========================================= */}
      <div className="flex justify-between items-center relative z-10 mb-7">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 px-3 py-1 rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-light)] animate-pulse shadow-[0_0_8px_var(--gold-light)]"></span>
          <span className="text-[10px] tracking-[0.2em] font-bold text-white/70 uppercase">
            Pixie Hollow
          </span>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(255,255,255,0.15)] group"
        >
          <span className="text-[14px] drop-shadow-[0_0_5px_#fcd34d] group-hover:animate-spin">✨</span>
          <span className="text-sm font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{coins}</span>
        </motion.button>
      </div>


      {/* =========================================
          BARIS 2: IDENTITAS PERI & ORBIT
          ========================================= */}
      <div className="flex justify-between items-center relative z-10 mb-8 mt-2">
        <div className="flex flex-col gap-1 w-2/3">
          
          <h1 
             className="text-[38px] leading-tight text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] italic tracking-tight"
             // DI SINI LETAK FONT MAGIS Cormorant Garamond 
             style={{ 
               fontFamily: "'Cormorant Garamond', 'Alice', serif", 
               backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, #fef08a 100%)',
               fontWeight: 600
             }}
          >
            {name || "Peri Kecil"},
          </h1>
          
          <p className="text-[12px] font-sans font-medium text-white/60 tracking-wide mt-1">
             <span className="text-[var(--gold-light)]">✧</span> Sesuatu yang magis menantimu.
          </p>

          <div className="inline-flex mt-2 w-fit px-3 py-1 rounded-full bg-gradient-to-r from-black/40 to-transparent border-l border-white/20">
            <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest">{rankStr}</span>
          </div>

        </div>

        {/* =========================================
            AREA KANAN: RING ORBIT PROGRES (HIDUP!)
            ========================================= */}
        <div className="relative flex justify-end w-1/3 pr-2">
           <motion.div 
             animate={{ y: [-4, 4, -4] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-[85px] h-[85px]"
           >
              {/* Kilau Lingkaran Belakang */}
              <div className="absolute inset-0 rounded-full bg-[var(--gold-light)]/20 blur-[20px] mix-blend-screen"></div>

              {/* Svg Cincin Modern dengan ketebalan yang memukau */}
              <svg width="85" height="85" viewBox="0 0 100 100" className="-rotate-90 filter drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="50%" stopColor="var(--gold-light)" />
                    <stop offset="100%" stopColor="var(--gold-dark)" />
                  </linearGradient>
                </defs>

                {/* Track Base / Lintasan Cincin (Slightly Darker) */}
                <circle cx="50" cy="50" r="40" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                
                {/* Lintasan Glow Tembus Pandang */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(250,210,90,0.15)" strokeWidth="6" />

                {/* The Golden Progress Orbit */}
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="url(#orbitGrad)" strokeWidth="6" strokeLinecap="round" 
                  style={{ strokeDasharray: circ, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                />
              </svg>

              {/* Bintang Satelit Orbiting the Progress Ring */}
              {progressPct > 0 && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-[3px] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[var(--gold-light)] text-[10px] drop-shadow-[0_0_8px_#fff]">✦</div>
                </motion.div>
              )}

              {/* Inner Text Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 drop-shadow-md">
                <span className="text-[20px] font-sans font-bold text-white leading-none">{progressPct}</span>
                <span className="text-[9px] font-bold text-white/50 tracking-widest">%</span>
              </div>
           </motion.div>
        </div>
      </div>


      {/* =========================================
          BARIS 3: TRACKING MINI GLASS CARD
          ========================================= */}
      <div className="flex items-center justify-between bg-black/25 backdrop-blur-md rounded-2xl p-3 border border-white/10 relative z-10 shadow-[inset_0_2px_15px_rgba(255,255,255,0.03)]">
         <div className="flex flex-col">
            <span className="text-[9px] font-semibold text-white/40 tracking-[0.1em] uppercase mb-0.5">Target Misi</span>
            <span className="text-[12px] font-bold text-white drop-shadow-sm flex items-center gap-1.5">
              <span className="text-[var(--gold-light)]">{doneCount}</span>
              <span className="text-white/30 font-light">/</span>
              <span>{target} <span className="text-[10px] text-white/50 uppercase ml-1">Gulungan</span></span>
            </span>
         </div>
         
         <div className="h-[25px] w-px bg-white/10 mx-2"></div>

         <div className="flex flex-col text-right">
            <span className="text-[9px] font-semibold text-white/40 tracking-[0.1em] uppercase mb-0.5">Musim</span>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{blockLabel}</span>
         </div>
      </div>

    </div>
  );
};
