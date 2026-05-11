import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { name, coins, target, pptDots, theme, blockStart, blockEnd } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;
  const progressPct = target > 0 ? Math.min(Math.round((doneCount / target) * 100), 100) : 0;
  const circ = 213.6;
  const strokeOffset = circ - (circ * progressPct) / 100;

  let rankStr = "Peri Pemula";
  if (progressPct >= 100) rankStr = "Ratu Pixie";
  else if (progressPct >= 75) rankStr = "Peri Penjaga";
  else if (progressPct >= 50) rankStr = "Peri Cahaya";
  else if (progressPct >= 25) rankStr = "Peri Pekerja";

  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  useEffect(() => {
    const wrap = document.getElementById("sparkles");
    if (!wrap) return;
    wrap.innerHTML = "";
    for(let i=0; i<50; i++){
      const sp = document.createElement("div"); 
      sp.className="sp";
      sp.style.width=(Math.random()*5+2)+"px"; 
      sp.style.height=sp.style.width;
      sp.style.left=Math.random()*100+"%"; 
      sp.style.bottom=(Math.random()*-20)+"px";
      
      if (theme === 'moon') {
        const moonColors = ["#8ab4f8","#c3d6fe","#a78bfa","#c4b5fd","#e0e8ff"];
        const c = moonColors[Math.floor(Math.random()*moonColors.length)];
        sp.style.background = c;
        sp.style.boxShadow = `0 0 6px ${c}, 0 0 12px ${c}88`;
      } else if (theme === 'sakura') {
        const sakuraColors = ["#f090a0","#e87080","#ffc0d0","#f0b0c0","#ffe0e8"];
        const c = sakuraColors[Math.floor(Math.random()*sakuraColors.length)];
        sp.style.background = c;
        sp.style.boxShadow = `0 0 6px ${c}, 0 0 12px ${c}88`;
      } else {
        sp.style.background = Math.random()>0.5?"#f5c842":"#8dc95a";
      }
      sp.style.animationDuration=(3+Math.random()*6)+"s";
      sp.style.animationDelay=(Math.random()*5)+"s";
      sp.style.setProperty('--float-dist',-(180+Math.random()*200)+'px');
      wrap.appendChild(sp);
    }
  }, [theme]);

  return (
    // DI SINI PERUBAHANNYA: Menghapus class .header lama dari CSS, pakai Tailwind murni
    <div className="relative pt-8 pb-10 px-6 rounded-b-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-10 overflow-hidden"
         style={{ background: 'linear-gradient(160deg, var(--green-deep) 0%, var(--green-mid) 100%)' }}>
      
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
         {/* Tekstur grain atau cahaya bisa ditaruh di sini jika mau */}
      </div>
      
      <div className="flex justify-between items-start relative z-10">
        <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold drop-shadow-sm">
          {t('hdr_eyebrow')}
        </div>
        <div className="bg-black/20 border border-white/10 rounded-full px-3 py-1 text-[var(--gold-light)] font-bold text-[12px] flex items-center gap-1.5 shadow-inner backdrop-blur-md">
          <span className="text-[14px]">✨</span> {coins}
        </div>
      </div>

      <div className="mt-6 flex flex-col relative z-10">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <h1 className="font-serif text-[32px] text-white leading-tight">
            <span className="text-[var(--gold-light)] drop-shadow-[0_0_15px_rgba(245,200,66,0.3)]">
              {name || "Peri Kecil"},
            </span>
          </h1>
          <span className="bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[var(--gold-light)] tracking-wide backdrop-blur-sm">
            {rankStr}
          </span>
        </div>
        
        <div className="flex justify-between items-end mt-1">
          <div>
            <h2 className="font-serif text-[22px] text-white/90 leading-snug">
              {t('hdr_greeting')}
            </h2>
            <div className="text-[11px] text-white/50 font-medium mt-1 tracking-wide">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-8 relative z-10 bg-white/5 rounded-3xl p-4 border border-white/10 backdrop-blur-md shadow-inner">
        <div className="relative w-[70px] h-[70px] flex-shrink-0 drop-shadow-[0_0_15px_rgba(245,200,66,0.4)]">
          <svg width="70" height="70" viewBox="0 0 80 80" className="-rotate-90">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--gold-dark)" />
                <stop offset="60%" stopColor="var(--gold)" />
                <stop offset="100%" stopColor="var(--gold-light)" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" 
              style={{ strokeDasharray: circ, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[15px] font-bold text-[var(--gold-light)] leading-none">{progressPct}%</div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{t('prog_total_lbl')}</div>
            <div className="text-[9px] font-bold text-[var(--gold-light)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full border border-[var(--gold)]/20">
              {blockLabel}
            </div>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-light)] shadow-[0_0_10px_rgba(245,200,66,0.8)]" 
                 style={{ width: `${progressPct}%`, transition: 'width 1.2s ease-out' }}></div>
          </div>
          <div className="flex justify-between text-[11px] font-medium text-white/40">
            <span><strong className="text-[var(--gold-light)] text-[12px]">{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong className="text-white/80">{target}</strong></span>
          </div>
        </div>
      </div>

      <div className="sparkles" id="sparkles"></div>
    </div>
  );
};
