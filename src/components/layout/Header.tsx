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

// 🌟 SISTEM PARTIKEL DEBU PERI (TINKERBELL GLOW DUST)
const PixieDust = ({ count, activeColor }: { count: number, activeColor: string }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 0 - 100% Horizontal
      yOffset: Math.random() * 50 + 20, // Seberapa jauh partikel naik (vw/vh)
      size: Math.random() * 3 + 1, // 1px - 4px
      duration: Math.random() * 5 + 4, // 4s - 9s 
      delay: Math.random() * 6, // Waktu tunggu muncul
      blur: Math.random() > 0.5 ? Math.random() * 3 : 0, // Ada yang terang, ada yang buram blur
      opacity: Math.random() * 0.6 + 0.3
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", x: `${p.x}%`, opacity: 0, scale: 0.5 }}
          animate={{
            y: `-${p.yOffset}%`,
            x: `${p.x + (Math.random() * 4 - 2)}%`, // Gerak zig-zag ringan
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: activeColor,
            boxShadow: `0 0 ${p.size * 2}px ${activeColor}, 0 0 ${p.size * 3}px #fff`,
            filter: `blur(${p.blur}px)`,
          }}
        />
      ))}
    </div>
  );
};

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
  const glowColor = theme === 'moon' ? '#60a5fa' : theme === 'sakura' ? '#fb7185' : '#fcd34d'; // Emas peri

  return (
    <div 
      style={{ 
        background: getThemeBg(),
        padding: '28px 20px 22px', 
        position: 'relative', 
        overflow: 'hidden', 
        zIndex: 10, 
        borderBottom: `2px solid ${getBorderTheme()}`, 
        boxShadow: '0 4px 25px rgba(10, 30, 5, 0.4)' 
      }}
    >
      {/* --- LAYER 0: NAFAS HUTAN (Ambient Breathing Glow) --- */}
      <motion.div 
        animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '10%', left: '5%', width: '90%', height: '80%',
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`,
          pointerEvents: 'none', mixBlendMode: 'screen', filter: 'blur(30px)'
        }}
      />
      
      <div className="header-leaves">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
      </div>

      {/* 🌟 MENGGANTIKAN SPARKLE LAMA DENGAN PIXIE DUST ANIMATED 🌟 */}
      <PixieDust count={60} activeColor={glowColor} />
      
      {/* --- Baris 1: Study Journey & Poin Bouncing --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textShadow: '0 0 8px rgba(255,255,255,0.3)' }}>
          {t('hdr_eyebrow')}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: '12px', padding: '4px 10px', color: '#ffe478', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.1), 0 0 10px rgba(245,200,66,0.1)' }}
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: '14px', filter: 'drop-shadow(0 0 8px rgba(245,200,66,0.8))' }}
          >✨</motion.span> 
          <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{coins}</span>
        </motion.div>
      </div>

      {/* --- Baris 2: Nama Elegan & Rank --- */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 1, marginTop: '10px' }}>
        <motion.h1 
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            fontFamily: "'Cormorant Garamond', 'Alice', serif", fontSize: '38px', fontWeight: 700, fontStyle: 'italic', 
            lineHeight: 1, margin: 0, backgroundImage: 'linear-gradient(to bottom, #ffffff 40%, #fef08a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.2))'
          }}
        >
          {name || "Peri Kecil"},
        </motion.h1>
        
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#f5c842', filter: 'blur(8px)', opacity: 0.3, borderRadius: '12px' }}></div>
          <span style={{ position: 'relative', background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.4)', padding: '4px 10px', borderRadius: '12px', color: '#ffe478', fontWeight: 700, fontSize: '10px', fontFamily: '"Quicksand", system-ui, sans-serif', letterSpacing: '0.05em' }}>
            {rankStr}
          </span>
        </div>
      </div>
      
      {/* --- Baris 3: Sapaan & Quote (Mantra Fade) --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '26px', color: '#ffe478', textShadow: '0 0 15px rgba(245,200,66,0.5)', marginTop: '2px', marginBottom: '2px', lineHeight: 1.15, fontWeight: 600 }}>
            <span>{greeting}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: 600, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
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
            style={{ fontFamily: '"Cormorant Garamond", "Alice", serif', fontSize: '15px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.7)', lineHeight: '1.3', fontWeight: 600, maxWidth: '45%', textAlign: 'right', marginTop: '6px' }}
          >
            ❝ {quote} ❞
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Baris 4: Floating Progress Bar & Info --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '24px', position: 'relative', zIndex: 1 }}>
        
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'relative', width: '85px', height: '85px', flexShrink: 0, filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.4))' }}
        >
          <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', background: '#f5c842', filter: 'blur(15px)', opacity: 0.15 }}></div>

          <svg width="85" height="85" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="goldGradInline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#b8900a" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGradInline)" strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={strokeOffset} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: '20px', fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: '"Quicksand", system-ui, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >{progressPct}</motion.div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#f5c842', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>%</div>
          </div>
          
          {progressPct > 0 && (
            <motion.div 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'absolute', top: '-3px', left: '50%', transform: 'translate(-50%, -50%)', width: '7px', height: '7px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 12px 4px rgba(245,200,66,0.9), 0 0 4px 1px #fff' }}
              ></motion.div>
            </motion.div>
          )}
        </motion.div>
        
        <div style={{ flex: 1, fontFamily: '"Quicksand", system-ui, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
              {t('prog_total_lbl')}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '4px 10px', fontSize: '10px', fontWeight: 700, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)' }}>
              <span style={{ fontSize: '12px', color: '#f5c842' }}>✦</span> {blockLabel}
            </div>
          </div>

          <div style={{ position: 'relative', height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', marginBottom: '8px', width: '100%', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '6px', borderRadius: '4px', background: 'linear-gradient(90deg, #b8900a, #F5C842, #fff)', boxShadow: '0 0 12px rgba(245,200,66,0.9)', width: `${progressPct}%`, transition: 'width 1.5s cubic-bezier(.4,0,.2,1)' }}></div>
            {progressPct > 0 && (
              <motion.div 
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'skewX(-20deg)', pointerEvents: 'none' }}
              />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <strong style={{ color: '#ffe478', fontSize: '15px', textShadow: '0 0 8px rgba(245,200,66,0.5)' }}>{doneCount}</strong> {t('prog_done_lbl')}
            </span>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              {t('prog_target_lbl')} <strong style={{ color: '#fff', fontSize: '14px', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>{target}</strong>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
