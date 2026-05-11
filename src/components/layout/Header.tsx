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

  let rankStr = "🌱 Peri Pemula";
  if (progressPct >= 100) rankStr = "👑 Ratu Pixie";
  else if (progressPct >= 75) rankStr = "🌿 Peri Penjaga";
  else if (progressPct >= 50) rankStr = "✨ Peri Cahaya";
  else if (progressPct >= 25) rankStr = "🔨 Peri Pekerja";

  let blockLabel = "Belum Diatur";
  if (blockStart && blockEnd) {
    const s = new Date(blockStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    blockLabel = `${s} – ${e}`;
  }

  // Membuat partikel sparkles saat komponen dimuat
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
    <div className="header">
      <div className="header-leaves">
        {theme === 'moon' || theme === 'sakura' ? null : (
          <>
            <div className="leaf leaf1"></div>
            <div className="leaf leaf2"></div>
            <div className="leaf leaf3"></div>
            <div className="leaf leaf4"></div>
          </>
        )}
      </div>
      
      <div className="header-top-row">
        <div className="header-eyebrow">
          <span>{t('hdr_eyebrow')}</span>
        </div>
        <div className="coin-badge" id="coin-badge">
          ✨ <span id="coin-val">{coins}</span>
        </div>
      </div>

      <div className="header-name">
        <span className="name-text" id="header-name">{name || "Peri Kecil"},</span>
        <span className="rank-badge" id="rank-badge">{rankStr}</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-4px' }}>
        <div>
          <div className="header-name" style={{ fontSize: '24px', marginTop: '4px', marginBottom: '2px' }}>
            <span className="name-text" id="greeting-line">{t('hdr_greeting')}</span>
          </div>
          <div className="header-sub" id="date-line" style={{ marginTop: '2px' }}>
            — {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <div id="quote-txt" style={{ fontFamily: 'var(--serif)', fontSize: '14px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.8)', lineHeight: '1.4', fontWeight: 500, opacity: 0.95, maxWidth: '48%', textAlign: 'right', marginTop: '8px' }}>
          ❝ Sihir terkuat adalah ketekunanmu sendiri. ❞
        </div>
      </div>

      <div className="prog-wrap">
        <div className="ring-outer">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={theme === 'moon' ? '#3a5fc0' : theme === 'sakura' ? '#b02860' : '#B8900A'} />
                <stop offset="60%" stopColor={theme === 'moon' ? '#8ab4f8' : theme === 'sakura' ? '#e87080' : '#F5C842'} />
                <stop offset="100%" stopColor={theme === 'moon' ? '#c3d6fe' : theme === 'sakura' ? '#ffc0d0' : '#FFE478'} />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="40" cy="40" r="34" />
            <circle className="ring-track" cx="40" cy="40" r="34" />
            <circle className="ring-glow" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset }} />
            <circle className="ring-fill" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset }} />
          </svg>
          <div className="ring-center">
            <div className="ring-pct">{progressPct}%</div>
            <div className="ring-lbl">{t('prog_lbl')}</div>
          </div>
        </div>
        <div className="prog-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div className="prog-label" style={{ marginBottom: 0 }}>{t('prog_total_lbl')}</div>
            <div className="date-badge">{blockLabel}</div>
          </div>
          <div className="prog-bar-track">
            <div className="prog-bar-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
          <div className="prog-nums">
            <span><strong>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong>{target}</strong></span>
          </div>
        </div>
      </div>
      <div className="sparkles" id="sparkles"></div>
    </div>
  );
};
