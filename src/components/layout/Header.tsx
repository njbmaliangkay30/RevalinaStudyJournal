import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;

  // FIX: Jangan hardcode circ — hitung dari radius
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (circ * progressPct) / 100;

  let rankStr = "Peri Pemula";
  if (progressPct >= 100) rankStr = "Ratu Pixie ✦";
  else if (progressPct >= 75) rankStr = "Peri Penjaga";
  else if (progressPct >= 50) rankStr = "Peri Cahaya";
  else if (progressPct >= 25) rankStr = "Peri Pekerja";

  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  // Greeting berdasarkan waktu
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";

  useEffect(() => {
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 40; i++) {
      const sp = document.createElement("div");
      sp.className = "sp";
      const size = (Math.random() * 4 + 2) + "px";
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
        sp.style.background = Math.random() > 0.5 ? "#f5c842" : "#8dc95a";
      }
      sp.style.animationDuration = (3 + Math.random() * 6) + "s";
      sp.style.animationDelay = (Math.random() * 5) + "s";
      sp.style.setProperty('--float-dist', -(150 + Math.random() * 180) + 'px');
      wrap.appendChild(sp);
    }
  }, [theme]);

  return (
    <div
      className="relative pt-6 pb-8 px-5 rounded-b-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-10 overflow-hidden"
      style={{ background: 'linear-gradient(155deg, var(--green-deep) 0%, var(--green-mid) 100%)' }}
    >
      {/* ── Baris atas: eyebrow + koin ── */}
      <div className="flex justify-between items-center relative z-10 mb-4">
        <div className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-bold">
          {t('hdr_eyebrow')}
        </div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="bg-black/20 border border-white/10 rounded-full px-3 py-1 text-[var(--gold-light)] font-bold text-[12px] flex items-center gap-1.5 backdrop-blur-md cursor-pointer select-none"
        >
          <span className="text-[13px] animate-pulse drop-shadow-[0_0_8px_rgba(245,200,66,0.6)]">✨</span>
          <span>{coins}</span>
        </motion.div>
      </div>

      {/* ── Nama + rank badge (satu baris) ── */}
      <div className="flex items-center gap-2 relative z-10 mb-0.5">
        <h1 className="font-serif text-[26px] text-[var(--gold-light)] leading-tight drop-shadow-[0_0_12px_rgba(245,200,66,0.3)]">
          {name || "Peri Kecil"},
        </h1>
        <span className="bg-white/10 border border-white/15 px-2 py-0.5 rounded-full text-[9px] font-bold text-[var(--gold-light)] tracking-wider backdrop-blur-sm shrink-0">
          {rankStr}
        </span>
      </div>

      {/* ── Greeting + tanggal (satu baris) ── */}
      <div className="flex items-center justify-between relative z-10 mb-5">
        <h2 className="font-serif text-[18px] text-white/85 leading-snug">
          {greeting}! ✨
        </h2>
        <div className="text-[10px] text-white/40 font-medium tracking-wide text-right">
          {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
        </div>
      </div>

      {/* ── Progress card: ring kiri, info kanan ── */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 24 }}
        className="flex items-center gap-4 relative z-10 bg-white/6 rounded-2xl px-4 py-3 border border-white/10 backdrop-blur-md shadow-inner"
      >
        {/* Circular ring — lebih kecil dari sebelumnya */}
        <div className="relative w-[58px] h-[58px] flex-shrink-0 drop-shadow-[0_0_12px_rgba(245,200,66,0.35)]">
          <svg width="58" height="58" viewBox="0 0 64 64" className="-rotate-90">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--gold-dark)" />
                <stop offset="60%" stopColor="var(--gold)" />
                <stop offset="100%" stopColor="var(--gold-light)" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(245,200,66,0.12)" strokeWidth="5" />
            <circle
              cx="32" cy="32" r={radius}
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                strokeDasharray: circ,
                strokeDashoffset: strokeOffset,
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-extrabold text-[var(--gold-light)] leading-none">{progressPct}%</span>
          </div>
        </div>

        {/* Info progress */}
        <div className="flex-1 min-w-0">
          {/* Label + block range */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-white/45 tracking-widest uppercase">
              {t('prog_total_lbl')}
            </span>
            <span className="text-[9px] font-bold text-[var(--gold-light)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full border border-[var(--gold)]/20 tracking-wide">
              {blockLabel}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] mb-1.5 relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[#fff8a0] shadow-[0_0_8px_rgba(245,200,66,0.7)] relative"
              style={{ width: `${progressPct}%`, transition: 'width 1.2s ease-out', minWidth: progressPct > 0 ? '8px' : '0' }}
            >
              {progressPct > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.7)] animate-pulse" />
              )}
            </div>
          </div>

          {/* Slide count */}
          <div className="flex justify-between text-[10px] font-medium text-white/40">
            <span>
              <strong className="text-[var(--gold-light)] text-[11px]">{doneCount}</strong>
              {' '}{t('prog_done_lbl')}
            </span>
            <span>
              {t('prog_target_lbl')}{' '}
              <strong className="text-white/70">{target}</strong>
            </span>
          </div>
        </div>
      </motion.div>

      <div className="sparkles" id="sparkles"></div>
    </div>
  );
};
