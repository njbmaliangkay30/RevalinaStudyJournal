import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

const MAGIC_QUOTES = [
  "Semua keajaiban butuh sedikit waktu dan banyak usaha.",
  "Satu halaman lagi, satu kepakan sayap lebih tinggi.",
  "Jangan berhenti saat lelah, berhentilah saat selesai.",
  "Fokus hari ini adalah keajaiban esok hari.",
  "Setiap hal besar dimulai dari satu langkah kecil peri."
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
    const s = new Date(blockStart).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
    const e = new Date(blockEnd).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
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
      sp.style.background = Math.random() > 0.5 ? "#f5c842" : "#8dc95a";
      sp.style.animationDuration=(3+Math.random()*6)+"s";
      sp.style.animationDelay=(Math.random()*5)+"s";
      sp.style.setProperty('--float-dist',-(180+Math.random()*200)+'px');
      wrap.appendChild(sp);
    }
  }, [theme]);

  // JIKA FILE src/index.css BENAR ISINYA, MAKA CLASS .header INI PASTI HIJAU
  return (
    <div className="header">
      
      <div className="header-leaves">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
      </div>
      
      <div className="header-top-row">
        <div className="header-eyebrow">
          <span>{t('hdr_eyebrow')}</span>
        </div>
        <div className="coin-badge">
          <span>✨</span> {coins}
        </div>
      </div>

      <div className="header-name">
        <span className="name-text">
          {name || "Peri Kecil"},
        </span>
        <span className="rank-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
          {rankStr}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-4px', position: 'relative', zIndex: 1 }}>
        <div>
          <div className="header-name" style={{ fontSize: '24px', marginTop: '4px', marginBottom: '2px' }}>
            <span className="name-text">{greeting}</span>
          </div>
          <div className="header-sub" style={{ marginTop: '2px' }}>
            {new Date().toLocaleDateString(lang === 'id' ? "id-ID" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', color: '#fff', fontStyle: 'italic', textShadow: '0 0 12px rgba(255,255,255,0.8)', lineHeight: '1.4', fontWeight: 500, opacity: 0.95, maxWidth: '48%', textAlign: 'right', marginTop: '8px' }}>
          ❝ {quote} ❞
        </div>
      </div>

      <div className="prog-wrap" style={{ marginTop: '20px' }}>
        <div className="ring-outer">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8900A" />
                <stop offset="60%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#FFE478" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="40" cy="40" r="34" />
            <circle className="ring-track" cx="40" cy="40" r="34" />
            <circle className="ring-glow" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset }} />
            <circle className="ring-fill" cx="40" cy="40" r="34" style={{ strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }} />
          </svg>
          <div className="ring-center">
            <div className="ring-pct">{progressPct}%</div>
            <div className="ring-lbl">{t('prog_lbl')}</div>
          </div>
        </div>
        
        <div className="prog-info" style={{ flex: 1, paddingLeft: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <div className="prog-label" style={{ marginBottom: 0 }}>{t('prog_total_lbl')}</div>
            <div className="date-badge">
              ✦ {blockLabel}
            </div>
          </div>
          <div className="prog-bar-track">
            <div className="prog-bar-fill" style={{ width: `${progressPct}%`, transition: 'width 1.2s cubic-bezier(.4,0,.2,1)' }}></div>
          </div>
          <div className="prog-nums" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{doneCount}</strong> {t('prog_done_lbl')}</span>
            <span>{t('prog_target_lbl')} <strong>{target}</strong></span>
          </div>
        </div>
      </div>
      
      <div className="sparkles" id="sparkles"></div>
    </div>
  );
};
