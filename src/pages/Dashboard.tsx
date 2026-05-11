import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../lib/i18n';
// Menambahkan Sparkles di sini
import { Hourglass, BookOpen, Target, Flame, Trophy, Clock, Medal, Crown, Sparkles } from 'lucide-react';

interface CardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  gradientClass: string; 
  isHalf?: boolean;
}

const FairyGlassCard: React.FC<CardProps> = ({ title, value, subtitle, icon: Icon, gradientClass, isHalf }) => (
  <div 
    className={`group relative overflow-hidden rounded-[24px] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
      isHalf ? 'col-span-1' : 'col-span-2'
    }`}
    style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.03), inset 0 2px 0 rgba(255,255,255,0.4)'
    }}
  >
    <div className={`absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-full bg-gradient-to-br ${gradientClass} pointer-events-none`} />

    <div className="flex items-center gap-3 mb-4 relative z-10">
      <div 
        className={`flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-inner`}
      >
        <Icon size={20} strokeWidth={2.5} className="text-white drop-shadow-sm" />
      </div>
      <h3 
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: 'var(--text-soft)' }}
      >
        {title}
      </h3>
    </div>

    <div className="flex flex-col relative z-10">
      <div 
        className={`${isHalf ? 'text-[28px]' : 'text-[34px]'} font-extrabold font-sans leading-none tracking-tight flex items-baseline gap-1 bg-clip-text text-transparent bg-gradient-to-br from-[var(--text-dark)] to-[var(--text-mid)]`}
      >
        {value}
      </div>
      <div 
        className="text-[11px] font-medium mt-2 tracking-wide"
        style={{ color: 'var(--text-soft)' }}
      >
        {subtitle}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { slides, target, blockEnd, pptDots } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;

  const examInfo = useMemo(() => {
    if (!blockEnd) return { val: "-", lbl: t('lbl_not_set'), gradientClass: "from-gray-400 to-gray-500", pacingVal: "-", pacingLbl: "PPT / hari" };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(blockEnd);
    examDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const sisaSlide = Math.max(0, target - doneCount);

    if (diffDays > 0) {
      return {
        val: `${diffDays} ${t('lbl_day')}`,
        lbl: t('lbl_until_exam'),
        gradientClass: diffDays > 7 ? "from-[#8ab4f8] to-[#3a5fc0]" : diffDays > 3 ? "from-[#f5c842] to-[#e8a020]" : "from-[#ff8a8a] to-[#e85050]",
        pacingVal: sisaSlide > 0 ? Math.ceil(sisaSlide / diffDays).toString() : "Selesai",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_day') : "Kerja luar biasa!"
      };
    } else if (diffDays === 0) {
      return {
        val: t('lbl_today'),
        lbl: t('lbl_show_wings'),
        gradientClass: "from-[#ff8a8a] to-[#e85050]",
        pacingVal: sisaSlide > 0 ? sisaSlide.toString() : "Selesai",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_more') : "Siap ujian!"
      };
    } else {
      return {
        val: t('lbl_over'),
        lbl: t('lbl_exam_passed'),
        gradientClass: "from-[#8ab4f8] to-[#3a5fc0]",
        pacingVal: "Selesai",
        pacingLbl: "Misi selesai."
      };
    }
  }, [blockEnd, target, doneCount, t]);

  const streakInfo = useMemo(() => {
    let streak = 0;
    const d = new Date();
    const fmtISO = (date: Date) => date.toISOString().split("T")[0];
    
    let todayStr = fmtISO(d);
    let yesterdayD = new Date(d);
    yesterdayD.setDate(yesterdayD.getDate() - 1);
    let yesterdayStr = fmtISO(yesterdayD);

    let currStr = (slides[todayStr] > 0) ? todayStr : (slides[yesterdayStr] > 0 ? yesterdayStr : null);
    
    if (currStr) {
      let tempD = new Date(currStr + "T00:00:00");
      while (true) {
        if (slides[fmtISO(tempD)] > 0) {
          streak++;
          tempD.setDate(tempD.getDate() - 1);
        } else break;
      }
    }

    let gradientClass = "";
    let subTxt = "";
    if (streak >= 5) { gradientClass = "from-[#ff7e5f] to-[#feb47b]"; subTxt = t('lbl_streak_fire'); }
    else if (streak >= 3) { gradientClass = "from-[#f5c842] to-[#e8a020]"; subTxt = t('lbl_streak_amber'); }
    else if (streak > 0) { gradientClass = "from-[#8ab4f8] to-[#3a5fc0]"; subTxt = t('lbl_streak_blue'); }
    else { gradientClass = "from-gray-400 to-gray-500"; subTxt = t('lbl_streak_none'); }

    return { streak, gradientClass, subTxt };
  }, [slides, t]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        
        <FairyGlassCard 
          title={t('db_exam_lbl')}
          value={examInfo.val}
          subtitle={examInfo.lbl}
          icon={Hourglass}
          gradientClass={examInfo.gradientClass} // Diperbaiki dari iconClass menjadi gradientClass
          isHalf={false}
        />

        <FairyGlassCard 
          title={t('db_read_lbl')}
          value={doneCount}
          subtitle={`${t('db_read_tgt')} ${target}`}
          icon={BookOpen}
          gradientClass="from-[#f5c842] to-[#b8900a]"
          isHalf={true}
        />

        <FairyGlassCard 
          title={t('db_daily_lbl')}
          value={examInfo.pacingVal}
          subtitle={examInfo.pacingLbl}
          icon={Target}
          gradientClass="from-[#8dc95a] to-[#2e6b1a]"
          isHalf={true}
        />

        <FairyGlassCard 
          title={t('db_streak_lbl')}
          value={
            <>
              {streakInfo.streak} 
              <span className="text-xl ml-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--amber)] to-[var(--gold-dark)]">
                {t('db_streak_day')}
              </span>
            </>
          }
          subtitle={streakInfo.subTxt}
          icon={Flame}
          gradientClass={streakInfo.gradientClass}
          isHalf={false}
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-[var(--gold-pale)] border border-[var(--gold-light)] shadow-sm">
            <Trophy size={16} className="text-[var(--gold-dark)]" />
          </div>
          <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--text-soft)]">
            {t('lb_title')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold-light)] to-transparent opacity-50 ml-2"></div>
        </div>
        
        <div className="flex gap-2 p-1.5 rounded-[16px] mb-4 backdrop-blur-md bg-[var(--bg-tab)] border border-[var(--border-card)]">
          <button className="flex items-center justify-center gap-2 flex-1 py-2 text-[11px] font-bold rounded-[12px] bg-[var(--bg-card-solid)] text-[var(--text-dark)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all">
            <Clock size={14} className="text-[var(--text-mid)]" /> {t('lb_tab_recent')}
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 py-2 text-[11px] font-bold rounded-[12px] text-[var(--text-soft)] hover:bg-white/40 transition-all">
            <Medal size={14} /> {t('lb_tab_best')}
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 py-2 text-[11px] font-bold rounded-[12px] text-[var(--text-soft)] hover:bg-white/40 transition-all">
            <Crown size={14} /> {t('lb_tab_podium')}
          </button>
        </div>

        <div className="min-h-[80px] flex items-center justify-center rounded-[20px] border border-dashed border-[var(--border-card)] bg-[var(--bg-input)] backdrop-blur-sm">
          <span className="text-[11px] font-semibold tracking-wide text-[var(--text-soft)] flex items-center gap-2">
            <Sparkles size={14} /> {t('lb_no_notion')}
          </span>
        </div>
      </div>
    </div>
  );
};
