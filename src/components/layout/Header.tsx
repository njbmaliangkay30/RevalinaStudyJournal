import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  
  // Logic Rank
  let rankStr = progressPct >= 100 ? "Ratu Pixie" : progressPct >= 75 ? "Peri Penjaga" : progressPct >= 50 ? "Peri Cahaya" : "Peri Pemula";

  // Kalender Halus
  let blockLabel = "Menunggu Misi...";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    blockLabel = `${s} ~ ${e}`;
  }

  // Efek Warna Tema Latar (Soft Ethereal Colors ala Tinkerbell)
  const getBackgroundColors = () => {
    switch(theme) {
      case 'moon':   return { from: '#0f172a', to: '#1e1b4b', accent: '#8ab4f8' };
      case 'sakura': return { from: '#4a1128', to: '#831843', accent: '#f090a0' };
      case 'dark':   return { from: '#062f22', to: '#064e3b', accent: '#f5c842' };
      default:       return { from: '#1a4124', to: '#2c5d33', accent: '#f8d962' }; // Morning Forest Green
    }
  };
  const themeColors = getBackgroundColors();

  return (
    <div 
      className="relative px-6 pt-10 pb-8 rounded-b-[40px] z-10 overflow-hidden flex flex-col justify-between"
      style={{ 
        minHeight: '270px',
        background: `linear-gradient(145deg, ${themeColors.from} 0%, ${themeColors.to} 100%)`,
        boxShadow: `0 15px 45px -10px ${themeColors.from}66` // Bayangan berwarna lembut
      }}
    >
      {/* =========================================
          BACKGROUND ART (Ethereal Tinkerbell Vibes)
          ========================================= */}
      
      {/* Glow lembut di pojok atas */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[70px] mix-blend-screen opacity-50"
        style={{ backgroundColor: themeColors.accent }}
      ></div>

      {/* Dekorasi Vektor Sulur Ajaib Melengkung */}
      <svg className="absolute bottom-0 right-0 w-[60%] h-[120%] opacity-20 pointer-events-none text-white drop-shadow-[0_0_10px_white]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 50,120 Q 80,80 120,40" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 30,120 Q 70,60 120,10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" strokeLinecap="round" />
        <path d="M 85,55 Q 100,50 110,65 Q 95,70 85,55 Z" fill="currentColor" opacity="0.8" />
        <path d="M 95,25 Q 115,20 120,35 Q 105,40 95,25 Z" fill="currentColor" opacity="0.6" />
        {/* Titik serbuk peri (Pollen) */}
        <circle cx="85" cy="45" r="1.5" fill="currentColor" />
        <circle cx="100" cy="15" r="1" fill="currentColor" />
        <circle cx="70" cy="65" r="2" fill="currentColor" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/10 to-transparent pointer-events-none" />

      {/* =========================================
          BARIS ATAS: Logo & Koin (Simfoni Minimalis)
          ========================================= */}
      <div className="flex justify-between items-center relative z-10 w-full mb-6">
        <div className="flex items-center gap-2">
          <SparkleIcon color={themeColors.accent} />
          <span className="text-[10px] tracking-[0.2em] font-medium text-white/70 uppercase">
            Pixie Journal
          </span>
        </div>
        
        {/* Lencana koin sekarang lebih bulat dan memudar seperti gelembung embun */}
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-inner"
        >
          <span className="text-sm">✨</span>
          <span className="text-xs font-bold text-white drop-shadow-sm">{coins}</span>
        </motion.button>
      </div>

      {/* =========================================
          AREA TENGAH: Nama Elegan & Kutipan Minimalis
          ========================================= */}
      <div className="flex items-end justify-between relative z-10 flex-grow mb-6">
        
        {/* Sisi Kiri: Sapaan */}
        <div className="flex flex-col gap-1.5 w-[65%]">
          <div className="inline-flex items-center w-fit border border-white/15 px-2.5 py-0.5 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{rankStr}</span>
          </div>
          
          <h1 className="font-serif text-[34px] leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] mt-1">
            {name || "Peri Kecil"},
          </h1>
          <span className="text-white/60 font-sans text-[11px] font-medium tracking-wide mt-1">
            Siap merangkai mantra baru hari ini?
          </span>
        </div>

        {/* Sisi Kanan: Ruang untuk ilustrasi peri atau quote minimalis (Transparan) */}
        <div className="w-[35%] flex justify-end">
           <div className="text-right">
             <div className="text-[28px] leading-none drop-shadow-md">
               🧚🏼‍♀️
             </div>
           </div>
        </div>

      </div>

      {/* =========================================
          AREA BAWAH: Progress Bar (Dew/Vine Style)
          ========================================= */}
      <div className="relative z-10 w-full mt-auto">
        <div className="flex justify-between items-end mb-2 px-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">{t('prog_total_lbl')}</span>
            <span className="text-[10px] text-white/90 font-medium tracking-wider">{blockLabel}</span>
          </div>
          
          {/* Angka progres minimalis, melayang */}
          <div className="flex items-baseline gap-0.5">
             <span className="text-2xl font-sans font-bold text-white leading-none tracking-tight">
                {progressPct}
             </span>
             <span className="text-[10px] font-medium text-white/60 mb-0.5">%</span>
          </div>
        </div>

        {/* Progress Bar (Sulur Kaca Tipis & Mengalir) */}
        <div className="h-[6px] w-full rounded-full bg-white/10 overflow-hidden shadow-inner backdrop-blur-md relative border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 bottom-0 rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${themeColors.accent}33 0%, ${themeColors.accent}ff 100%)`,
              boxShadow: `0 0 10px ${themeColors.accent}aa`
            }}
          >
            {/* Kilau kecil (embun berjalan) di pucuk progress */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_white] blur-[1px]"></div>
          </motion.div>
        </div>

        {/* Informasi slide (sangat minimalis modern, P C N spacing) */}
        <div className="flex justify-between mt-2 px-1 text-[10px] font-medium text-white/40 uppercase tracking-widest">
           <span>{doneCount} S L I D E S</span>
           <span>/ {target} M I S S I O N</span>
        </div>
      </div>

    </div>
  );
};

// Komponen Ikon Ajaib Kecil
const SparkleIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill={color} opacity="0.9" />
    <path d="M5 4L5.5 6.5L8 7L5.5 7.5L5 10L4.5 7.5L2 7L4.5 6.5L5 4Z" fill="white" opacity="0.6" />
  </svg>
);
