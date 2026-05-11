import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, BookOpen, Sparkles, Settings } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../lib/i18n';
import { TabName } from '../../types';

export const TabBar: React.FC = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useAppStore();
  
  // State untuk mengontrol apakah menu harus disembunyikan
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  // Logika mendeteksi arah scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Jika scroll ke bawah lebih dari 50px, sembunyikan menu
    if (latest > previous && latest > 50) {
      setIsHidden(true);
    } 
    // Jika scroll ke atas, munculkan kembali menu
    else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const tabs: { id: TabName; icon: any; label: string }[] = [
    { id: 'dashboard', icon: Home, label: t('tab_dash') },
    { id: 'tracker', icon: BookOpen, label: t('tab_track') },
    { id: 'reward', icon: Sparkles, label: t('tab_rew') },
    { id: 'setting', icon: Settings, label: t('tab_set') },
  ];

  return (
    // Membungkus nav dengan motion.nav agar bisa dianimasikan naik-turun
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2"
      // Animasi geser ke bawah sejauh 100% jika isHidden true, kembali ke 0 jika false
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "100%", opacity: 0 }
      }}
      initial="visible"
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-md mx-auto">
        <div 
          className="flex items-center justify-around px-2 py-3 shadow-2xl rounded-2xl border backdrop-blur-md"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-card)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center justify-center min-w-[60px] cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -top-3 w-10 h-1 rounded-full"
                    style={{ 
                      backgroundColor: 'var(--gold)', 
                      boxShadow: '0 0 10px var(--gold-light)' 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                
                <div 
                  className={`p-1.5 transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}
                  style={{ color: isActive ? 'var(--gold-dark)' : 'var(--text-soft)' }}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span 
                  className="text-[9px] font-bold uppercase tracking-widest mt-0.5"
                  style={{ color: isActive ? 'var(--gold-dark)' : 'var(--text-soft)', opacity: isActive ? 1 : 0.6 }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
