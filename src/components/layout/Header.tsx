import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  const circ = 251.2; // 2 * PI * r
  const strokeOffset = circ - (circ * progressPct) / 100;

  // Level Keajaiban Peri
  let rankStr = progressPct >= 100 ? "Ratu Pixie" : progressPct >= 75 ? "Peri Penjaga" : progressPct >= 50 ? "Peri Cahaya" : "Peri Pemula";

  let blockLabel = "Misi Baru Segera Dimulai...";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} ─ ${e}`;
  }

  // Mengatur warna tema organik
  const themeColors = {
    moon: { base: '#0b132b', top: '#172554', glow: '#60a5fa' },
    sakura: { base: '#2b0b13', top: '#500724', glow: '#fb7185' },
    dark: { base: '#021a11', top: '#064e3b', glow: '#fcd34d' },
    light: { base: '#14532d', top: '#065f46', glow: '#fcd34d' }
  };
  const activeColor = themeColors[theme] || themeColors.light;

  useEffect(() => {
    // Generate Debu Peri
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 40; i++) {
      const sp = document.createElement("div"); 
      const size = Math.random() * 3 + 1;
      sp.style.cssText = `
        position: absolute; width: ${size}px; height: ${size}px; background: ${activeColor.glow};
        box-shadow: 0 0 ${size*2}px ${activeColor.glow}, 0 0 ${size*4}px #fff; border-radius: 50%;
        left: ${Math.random() * 100}%; bottom: -10%; opacity: ${Math.random() * 0.7 + 0.3};
        animation: floatUp ${4 + Math.random() * 8}s linear infinite; animation-delay: ${Math.random() * 5}s;
      `;
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
      {/* 🌟 NAFAS MAGIS DI BACKGROUND */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-[10%] left-[20%] w-[150%] h-[150%] rounded-full blur-[90px] mix-blend-screen pointer-events-none"
        style={{ backgroundColor: activeColor.glow }}
      />
      <div id="sparkles" className="absolute inset-0 pointer-events-none mix-blend-screen" />

      {/* Gelombang Halus Ala Kabut (Menggantikan Kotak/Border) */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[var(--bg-main)]/10 to-transparent pointer-events-none"></div>

      {/* =========================================
          BARIS 1: APLIKASI & KOIN
          ========================================= */}
      <div className="flex justify-between items-center relative z-20 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-1"
        >
          <span className="w-1 h-1 rounded-full bg-[var(--gold-light)] animate-ping shadow-[0_0_8px_var(--gold-light)]"></span>
          <span className="text-[10px] tracking-[0.25em] font-semibold text-white/60 uppercase">
            Pixie Hollow
          </span>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,0.05)] group cursor-pointer"
        >
          <span className="text-[14px] drop-shadow-[0_0_5px_#fcd34d] group-hover:animate-[spin_1s_ease-in-out]">✨</span>
          <span className="text-sm font-extrabold text-white">{coins}</span>
        </motion.button>
      </div>


      {/* =========================================
          BARIS 2 & 3: ELEVASI TEXT & CINCIN ORBIT (Disusun Tanpa Kotak-Kotak Kaku)
          ========================================= */}
      <div className="relative z-20 w-full">
        <div className="flex justify-between">
          
          {/* ----- KOLOM KIRI (Tipografi Utama) ----- */}
          <div className="flex flex-col gap-1 mt-1 flex-1 pr-4">
            
            {/* RANK TANPA KOTAK BADGE -> Hologram Text Element */}
            <div className="flex items-center gap-2 mb-1.5 opacity-90 pl-1">
               {/* Hiasan Simbol Ornamen Kecil Di Kiri */}
               <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold-light)">
                 <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
               </svg>
               <span 
                 className="text-[9px] font-bold uppercase tracking-[0.3em] bg-clip-text text-transparent"
                 style={{ backgroundImage: 'linear-gradient(to right, #fef08a, #fff)' }}
               >
                 {rankStr}
               </span>
            </div>
            
            {/* NAMA PERI */}
            <h1 
               className="text-[44px] leading-none text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] italic tracking-[-0.02em] pb-1"
               style={{ 
                 fontFamily: "'Cormorant Garamond', 'Alice', serif", 
                 backgroundImage: 'linear-gradient(to bottom, #ffffff 40%, rgba(255, 235, 150, 0.85) 100%)',
                 fontWeight: 600
               }}
            >
              {name || "Peri Kecil"},
            </h1>
            
            <p className="text-[12px] font-sans font-medium text-white/50 tracking-wide mt-2">
               Apa yang akan kita pelajari?
            </p>

            {/* SISA MISI & MUSIM -> Sekarang dirangkai dalam garis horizontal estetis bukan kotak */}
            <div className="mt-8 mb-2 flex items-center gap-4">
               {/* Block Sisa PPT */}
               <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white/40 mb-1 font-bold">Progress</span>
                  <div className="flex items-baseline gap-1.5">
                     <span className="font-serif text-[18px] text-[var(--gold-light)] drop-shadow-[0_0_8px_rgba(245,200,66,0.3)]">{doneCount}</span>
                     <span className="text-[11px] text-white/40 font-medium italic">dari</span>
                     <span className="font-serif text-[16px] text-white/80">{target}</span>
                  </div>
               </div>
               
               {/* Garis Pemisah Vertikal Halus */}
               <div className="w-[1px] h-[24px] bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>

               {/* Block Musim */}
               <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white/40 mb-1 font-bold">Timeline</span>
                  <span className="text-[12px] text-white/90 font-medium tracking-wide">
                     {blockLabel}
                  </span>
               </div>
            </div>

          </div>


          {/* ----- KOLOM KANAN (Progress Ring Melayang) ----- */}
          <div className="relative flex justify-end w-[110px] shrink-0 self-center -mt-8 mr-1">
             <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-[95px] h-[95px]"
             >
                <div className="absolute inset-0 rounded-full bg-[var(--gold-light)]/15 blur-[25px] mix-blend-screen animate-pulse duration-[3000ms]"></div>

                <svg width="95" height="95" viewBox="0 0 100 100" className="-rotate-90 filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)]">
                  <defs>
                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="50%" stopColor="var(--gold-light)" />
                      <stop offset="100%" stopColor="var(--gold-dark)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Track Base Kaca Dalam */}
                  <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  
                  <circle 
                    cx="50" cy="50" r="40" fill="none" 
                    stroke="url(#orbitGrad)" strokeWidth="7" strokeLinecap="round" 
                    style={{ strokeDasharray: circ, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                  />
                </svg>

                {progressPct > 0 && (
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Mengganti bintang text biasa dengan efek silau murni (Flare) */}
                    <div className="absolute top-[3px] left-[50%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_4px_var(--gold-light)]"></div>
                  </motion.div>
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
                  <span 
                     className="text-[24px] text-white leading-none drop-shadow-md"
                     style={{ fontFamily: "'Cormorant Garamond', 'Alice', serif", fontWeight: 700 }}
                  >
                    {progressPct}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--gold-light)] tracking-widest mt-0.5">%</span>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
      
      {/* Garis Ajaib pemanis di tepi bawah yang samar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

    </div>
  );
};
