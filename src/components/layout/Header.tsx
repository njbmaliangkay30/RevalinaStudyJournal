import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

// ── Kumpulan quote harian ──
const QUOTES = [
  "Belajar adalah cara kita menumbuhkan sayap untuk terbang.",
  "Setiap slide yang kau baca adalah satu langkah menuju versi terbaikmu.",
  "Peri yang rajin tidak lahir — ia ditempa oleh konsistensi.",
  "Ilmu adalah mahkota yang tak bisa dicuri siapapun.",
  "Hari ini kelelahan, besok kekuatan.",
  "Kamu tidak harus cepat. Kamu hanya harus tidak berhenti.",
  "Satu slide hari ini lebih baik dari nol slide sempurna esok hari.",
];

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;

  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (circ * progressPct) / 100;

  // ── Rank ──
  let rankStr = "Peri Pemula";
  if (progressPct >= 100) rankStr = "Ratu Pixie ✦";
  else if (progressPct >= 75) rankStr = "Peri Penjaga";
  else if (progressPct >= 50) rankStr = "Peri Cahaya";
  else if (progressPct >= 25) rankStr = "Peri Pekerja";

  // ── Block label ──
  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  // ── Greeting dinamis berdasarkan jam ──
  const hour = new Date().getHours();
  const greetingLine =
    hour < 5  ? "Masih melek tengah malam?" :
    hour < 11 ? "Selamat pagi yang indah!" :
    hour < 14 ? "Semangat siang ini!" :
    hour < 17 ? "Selamat sore, peri kecil." :
    hour < 20 ? "Petang yang produktif!" :
               "Belajar di malam hari, hebat!";

  // ── Quote berputar berdasarkan tanggal ──
  const dailyQuote = useMemo(() => {
    const start = new Date(new Date().getFullYear(), 0, 0).getTime();
    const dayOfYear = Math.floor((Date.now() - start) / 86400000);
    return QUOTES[dayOfYear % QUOTES.length];
  }, []);

  // ── Warna wave matching --bg-main per tema ──
  const waveColor =
    theme === 'dark'   ? '#0c120a' :
    theme === 'moon'   ? '#080c1c' :
    theme === 'sakura' ? '#fdf5f8' :
    '#fdfaf0';

  // ── Sparkles ──
  useEffect(() => {
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 45; i++) {
      const sp = document.createElement("div");
      sp.className = "sp";
      const size = (Math.random() * 5 + 2) + "px";
      sp.style.width = size;
      sp.style.height = size;
      sp.style.left = Math.random() * 100 + "%";
      sp.style.bottom = (Math.random() * -15) + "px";

      if (theme === 'moon') {
        const c = ["#8ab4f8","#c3d6fe","#a78bfa","#c4b5fd"][Math.floor(Math.random() * 4)];
        sp.style.background = c;
        sp.style.boxShadow = `0 0 6px ${c}, 0 0 12px ${c}88`;
      } else if (theme === 'sakura') {
        const c = ["#f090a0","#ffc0d0","#e87080","#ffe0e8"][Math.floor(Math.random() * 4)];
        sp.style.background = c;
        sp.style.boxShadow = `0 0 6px ${c}, 0 0 12px ${c}88`;
      } else {
        const c = Math.random() > 0.5 ? "#f5c842" : "#8dc95a";
        sp.style.background = c;
      }
      sp.style.animationDuration = (3 + Math.random() * 6) + "s";
      sp.style.animationDelay = (Math.random() * 5) + "s";
      sp.style.setProperty('--float-dist', -(140 + Math.random() * 180) + 'px');
      wrap.appendChild(sp);
    }
  }, [theme]);

  return (
    <div className="relative z-10">
      <div
        className="relative pt-7 px-5 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, var(--green-deep) 0%, var(--green-mid) 100%)' }}
      >
        {/* Sparkles */}
        <div className="sparkles" id="sparkles" />

        {/* Leaf decorations — background hutan */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none select-none" aria-hidden>
          <svg viewBox="0 0 160 160" fill="none">
            <path d="M140 10 Q80 20 60 80 Q100 40 155 50 Z" fill="#8dc95a"/>
            <path d="M160 40 Q110 50 95 110 Q130 65 165 80 Z" fill="#4a9b28" opacity="0.7"/>
            <path d="M120 0 Q90 30 100 70 Q115 35 140 30 Z" fill="#ffe478" opacity="0.4"/>
          </svg>
        </div>
        <div className="absolute bottom-16 left-0 w-28 h-28 opacity-8 pointer-events-none select-none" aria-hidden>
          <svg viewBox="0 0 120 120" fill="none">
            <path d="M10 110 Q50 60 110 80 Q60 50 20 20 Z" fill="#4a9b28" opacity="0.5"/>
          </svg>
        </div>

        {/* ── Baris 1: eyebrow + koin ── */}
        <div className="flex justify-between items-center relative z-10 mb-5">
          <div className="text-[9px] tracking-[0.28em] uppercase text-white/35 font-bold">
            {t('hdr_eyebrow')}
          </div>
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black/20 border border-white/10 rounded-full px-3 py-1 text-[var(--gold-light)] font-bold text-[12px] flex items-center gap-1.5 backdrop-blur-md cursor-pointer select-none"
          >
            <span className="text-[13px] animate-pulse drop-shadow-[0_0_8px_rgba(245,200,66,0.6)]">✨</span>
            <span>{coins}</span>
          </motion.div>
        </div>

        {/* ── Baris 2: Nama italic besar + rank badge ── */}
        <div className="relative z-10 mb-0.5">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 900,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--gold-light)',
                textShadow: '0 0 40px rgba(245,200,66,0.4), 0 2px 10px rgba(0,0,0,0.35)',
              }}
            >
              {name || "Peri Kecil"},
            </h1>
            <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded-full text-[9px] font-bold text-[var(--gold-light)] tracking-wider backdrop-blur-sm mb-1">
              {rankStr}
            </span>
          </div>
        </div>

        {/* ── Baris 3: Greeting italic medium ── */}
        <div className="relative z-10 mb-1">
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(16px, 4vw, 21px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.88)',
              textShadow: '0 1px 6px rgba(0,0,0,0.2)',
              lineHeight: 1.35,
            }}
          >
            {greetingLine}
          </h2>
          <div className="text-[9.5px] text-white/32 font-medium mt-1 tracking-wide">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* ── Baris 4: Quote harian ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="relative z-10 mt-3 mb-5"
        >
          <p className="header-quote">{dailyQuote}</p>
        </motion.div>

        {/* ── Progress card ── */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 22 }}
          className="flex items-center gap-4 relative z-10 rounded-2xl px-4 py-3 border backdrop-blur-md"
          style={{
            background: 'rgba(0,0,0,0.18)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Circular ring */}
          <div className="relative w-[58px] h-[58px] flex-shrink-0 drop-shadow-[0_0_14px_rgba(245,200,66,0.3)]">
            <svg width="58" height="58" viewBox="0 0 64 64" className="-rotate-90">
              <defs>
                <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gold-dark)" />
                  <stop offset="60%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--gold-light)" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(245,200,66,0.1)" strokeWidth="5" />
              <circle
                cx="32" cy="32" r={radius}
                fill="none"
                stroke="url(#goldGrad2)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circ,
                  strokeDashoffset: strokeOffset,
                  transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[13px] font-extrabold text-[var(--gold-light)] leading-none">
                {progressPct}%
              </span>
            </div>
          </div>

          {/* Progress info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-white/38 tracking-widest uppercase">
                {t('prog_total_lbl')}
              </span>
              <span className="text-[9px] font-bold text-[var(--gold-light)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full border border-[var(--gold)]/20 tracking-wide">
                {blockLabel}
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5 relative">
              <div
                className="h-full rounded-full relative"
                style={{
                  width: `${progressPct}%`,
                  background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), #fff8a0)',
                  boxShadow: '0 0 8px rgba(245,200,66,0.65)',
                  transition: 'width 1.3s ease-out',
                  minWidth: progressPct > 0 ? '8px' : '0',
                }}
              >
                {progressPct > 0 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.7)] animate-pulse" />
                )}
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-white/38">
              <span>
                <strong className="text-[var(--gold-light)] text-[11px]">{doneCount}</strong>
                {' '}{t('prog_done_lbl')}
              </span>
              <span>{t('prog_target_lbl')} <strong className="text-white/65">{target}</strong></span>
            </div>
          </div>
        </motion.div>

        {/* ── Wave SVG — transisi organik ke body ── */}
        {/* Padding bawah untuk kasih ruang wave */}
        <div className="h-10" />
        <div className="header-wave">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave belakang — lebih transparan, sedikit offset */}
            <path
              d="M0,30 C280,52 560,6 840,26 C1120,46 1300,14 1440,30 L1440,52 L0,52 Z"
              fill={waveColor}
              opacity="0.35"
            />
            {/* Wave depan — solid */}
            <path
              d="M0,40 C200,18 420,50 660,34 C900,18 1140,48 1440,36 L1440,52 L0,52 Z"
              fill={waveColor}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
