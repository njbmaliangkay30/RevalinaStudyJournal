import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';

export const TabBar: React.FC = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useAppStore();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeBtn = barRef.current?.querySelector('.tab.active') as HTMLElement;
    const ind = indicatorRef.current;
    const bar = barRef.current;
    
    if (activeBtn && ind && bar) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      ind.style.left = `${btnRect.left - barRect.left + bar.scrollLeft}px`;
      ind.style.width = `${btnRect.width}px`;
    }
  }, [activeTab]);

  return (
    <div className="tab-bar" ref={barRef}>
      <button className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
        {t('tab_dash')}
      </button>
      <button className={`tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
        {t('tab_track')}
      </button>
      <button className={`tab ${activeTab === 'reward' ? 'active' : ''}`} onClick={() => setActiveTab('reward')}>
        {t('tab_rew')}
      </button>
      <button className={`tab ${activeTab === 'setting' ? 'active' : ''}`} onClick={() => setActiveTab('setting')}>
        {t('tab_set')}
      </button>
      <div className="tab-indicator" ref={indicatorRef}></div>
    </div>
  );
};
