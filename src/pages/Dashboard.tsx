import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../lib/i18n';
import { Hourglass, BookOpen, Target, Flame, Trophy, Clock, Medal, Crown, Sparkles } from 'lucide-react';

// --- ANIMASI BANTUAN UNTUK MEMUNCULKAN KARTU SATU PER SATU ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // Jeda waktu kemunculan tiap kartu
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

// --- KOMPONEN KARTU KACA MEWAH ---
interface CardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  gradientClass: string; 
  isHalf?: boolean;
  isActiveAction?: boolean; // Pemicu interaksi hidup
}

const FairyGlassCard: React.FC<CardProps> = ({ title, value, subtitle, icon: Icon, gradientClass, isHalf, isActiveAction }) => (
  <motion.div 
    variants={cardVariants}
    whileHover={{ y: -4, scale: 1.02 }} // Melayang ke atas saat disentuh cursor
    whileTap={{ scale: 0.98 }}          // Memantul ke bawah saat ditekan (HP/Touch)
    className={`group relative overflow-hidden rounded-[24px] p-5 backdrop-blur-xl transition-shadow duration-500 hover:shadow-2xl cursor-pointer ${
      isHalf ? 'col-span-1' : 'col-span-2'
    }`}
    style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)'
    }}
  >
    <div className={`absolute -inset-4 opacity-0 group-hover:opacity-25 transition-opacity duration-1000 blur-2xl rounded-full bg-gradient-to-br ${gradientClass} pointer-events-none`} />

    <div className="flex items-center gap-3 mb-4 relative z-10">
      <div 
        className={`flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-br ${gradientClass} shadow-[inset_0_-2px_10px_rgba(0,0,0,0.2)]`}
      >
        <Icon size={20} strokeWidth={isActiveAction ? 3 : 2.5} className={`text-white drop-shadow-sm ${isActiveAction ? 'animate-[bounce_2s_infinite]' : ''}`} />
      </div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-soft)]">
        {title}
      </h3>
    </div>

    <div className="flex flex-col relative z-10">
      <div className={`${isHalf ? 'text-[28px]' : 'text-[34px]'} font-extrabold font-sans leading-none tracking-tight flex items-baseline gap-1 bg-clip-text text-transparent bg-gradient-to-br from-[var(--text-dark)] to-[var(--text-mid)] drop-shadow-sm`}>
        {value}
      </div>
      <div className="text-[11px] font-semibold mt-2 tracking-wide text-[var(--text-soft)]">
        {subtitle}
      </div>
    </div>
  </motion.div>
);

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { slides, target, blockEnd, pptDots } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;

  const examInfo = useMemo(() => {
    // Logika Exam di sini sama persis seperti sebelumnya
    if (!blockEnd) return { val: "-", lbl: t('lbl_not_set'), gradientClass: "from-gray-400 to-gray-500", pacingVal: "-", pacingLbl: "PPT / hari", isActive: false };
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const examDate = new Date(blockEnd); examDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const sisaSlide = Math.max(0, target - doneCount);

    if (diffDays > 0) {
      return {
        val: `${diffDays} ${t('lbl_day')}`, lbl: t('lbl_until_exam'),
        gradientClass: diffDays > 7 ? "from-[#8ab4f8] to-[#3a5fc0]" : diffDays > 3 ? "from-[#f5c842] to-[#e8a020]" : "from-[#ff8a8a] to-[#e85050]",
        pacingVal: sisaSlide > 0 ? Math.ceil(sisaSlide / diffDays).toString() : "Selesai",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_day') : "Kerja luar biasa!",
        isActive: diffDays <= 3 // Aktif bergerak jika kurang dari 3 hari (memicu panik sehat)
      };
    } else return { val: t('lbl_over'), lbl: t('lbl_exam_passed'), gradientClass: "from-[#8ab4f8] to-[#3a5fc0]", pacingVal: "Selesai", pacingLbl: "Misi selesai.", isActive: false };
  }, [blockEnd, target, doneCount, t]);

  const streakInfo = useMemo(() => {
    // Logika Streak sama persis
    let streak = 0; const d = new Date(); const fmtISO = (date: Date) => date.toISOString().split("T")[0];
    let todayStr = fmtISO(d); let yesterdayD = new Date(d); yesterdayD.setDate(yesterdayD.getDate() - 1); let yesterdayStr = fmtISO(yesterdayD);
    let currStr = (slides[todayStr] > 0) ? todayStr : (slides[yesterdayStr] > 0 ? yesterdayStr : null);
    if (currStr) {
      let tempD = new Date(currStr + "T00:00:00");
      while (true) { if (slides[fmtISO(tempD)] > 0) { streak++; tempD.setDate(tempD.getDate() - 1); } else break; }
    }
    let gradientClass = ""; let subTxt = "";
    if (streak >= 5) { gradientClass = "from-[#ff7e5f] to-[#e85050]"; subTxt = t('lbl_streak_fire'); }
    else if (streak >= 3) { gradientClass = "from-[#f5c842] to-[#e8a020]"; subTxt = t('lbl_streak_amber'); }
    else if (streak > 0) { gradientClass = "from-[#8ab4f8] to-[#3a5fc0]"; subTxt = t('lbl_streak_blue'); }
    else { gradientClass = "from-gray-400 to-gray-500"; subTxt = t('lbl_streak_none'); }

    return { streak, gradientClass, subTxt, isActive: streak >= 3 }; // Jika streak menyala panjang, apinya bergerak!
  }, [slides, t]);

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <FairyGlassCard 
          title={t('db_exam_lbl')} value={examInfo.val} subtitle={examInfo.lbl} 
          icon={Hourglass} gradientClass={examInfo.gradientClass} isHalf={false}
          isActiveAction={examInfo.isActive} // Membal perlahan saat deadline dekat
        />

        <FairyGlassCard 
          title={t('db_read_lbl')} value={doneCount} subtitle={`${t('db_read_tgt')} ${target}`}
          icon={BookOpen} gradientClass="from-[#f5c842] to-[#b8900a]" isHalf={true}
        />

        <FairyGlassCard 
          title={t('db_daily_lbl')} value={examInfo.pacingVal} subtitle={examInfo.pacingLbl}
          icon={Target} gradientClass="from-[#8dc95a] to-[#2e6b1a]" isHalf={true}
        />

        <FairyGlassCard 
          title={t('db_streak_lbl')} 
          value={<>{streakInfo.streak} <span className="text-xl ml-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--amber)] to-[var(--gold-dark)]">{t('db_streak_day')}</span></>} 
          subtitle={streakInfo.subTxt} icon={Flame} gradientClass={streakInfo.gradientClass} isHalf={false}
          isActiveAction={streakInfo.isActive} // Api menyala saat on streak
        />
      </div>

      {/* Leaderboard - Diberi efek muncul terlambat */}
      <motion.div variants={cardVariants} className="mt-4">
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="p-1.5 rounded-[10px] bg-[var(--gold-pale)] border border-[var(--gold-light)]/50 shadow-inner">
            <Trophy size={14} className="text-[var(--gold-dark)]" strokeWidth={3} />
          </div>
          <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--text-soft)]">
            {t('lb_title')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold-light)] to-transparent opacity-60 ml-2"></div>
        </div>
        
        <div className="flex gap-2 p-1.5 rounded-[18px] mb-4 backdrop-blur-md bg-[var(--bg-tab)] border border-[var(--border-card)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
          <button className="flex items-center justify-center gap-1.5 flex-1 py-2.5 text-[11px] font-bold rounded-[14px] bg-white text-[var(--text-dark)] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:scale-105 transition-all duration-300">
            <Clock size={14} className="text-[var(--text-mid)]" /> {t('lb_tab_recent')}
          </button>
          <button className="flex items-center justify-center gap-1.5 flex-1 py-2.5 text-[11px] font-bold rounded-[14px] text-[var(--text-soft)] hover:bg-white/40 transition-all duration-300">
            <Medal size={14} /> {t('lb_tab_best')}
          </button>
          <button className="flex items-center justify-center gap-1.5 flex-1 py-2.5 text-[11px] font-bold rounded-[14px] text-[var(--text-soft)] hover:bg-white/40 transition-all duration-300">
            <Crown size={14} /> {t('lb_tab_podium')}
          </button>
        </div>

        <div className="min-h-[85px] flex flex-col items-center justify-center gap-2 rounded-[24px] border-2 border-dashed border-[var(--border-card)] bg-[var(--bg-input)] backdrop-blur-sm cursor-pointer hover:bg-[var(--bg-card)] transition-colors duration-300 group">
          <div className="p-2 bg-[var(--gold-pale)] rounded-full text-[var(--gold-dark)] group-hover:scale-110 transition-transform duration-300">
            <Sparkles size={16} />
          </div>
          <span className="text-[11px] font-semibold tracking-wide text-[var(--text-soft)]">
            {t('lb_no_notion')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
