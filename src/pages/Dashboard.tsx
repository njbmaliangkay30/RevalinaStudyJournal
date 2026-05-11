import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../lib/i18n';
import { Hourglass, BookOpen, Target, Flame, Trophy } from 'lucide-react';

// --- KOMPONEN BANTUAN UNTUK KARTU MODERN ---
// Ini memastikan semua kartu desainnya konsisten, elegan, dan rapi
interface CardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  iconColorClass: string; // untuk efek aura CSS lama Anda
  isHalf?: boolean;
}

const ModernCard: React.FC<CardProps> = ({ title, value, subtitle, icon: Icon, iconColorClass, isHalf }) => (
  <div 
    className={`relative overflow-hidden rounded-[20px] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      isHalf ? 'col-span-1' : 'col-span-2'
    }`}
    style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
    }}
  >
    {/* Header Kartu: Ikon & Judul */}
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-2xl bg-white/40 dark:bg-black/20 ${iconColorClass}`}>
        <Icon size={isHalf ? 18 : 22} strokeWidth={2.5} style={{ color: 'var(--text-mid)' }} />
      </div>
      <h3 
        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em]"
        style={{ color: 'var(--text-soft)' }}
      >
        {title}
      </h3>
    </div>

    {/* Isi Kartu: Angka Besar & Subtitle */}
    <div className="flex flex-col">
      <div 
        className={`${isHalf ? 'text-3xl' : 'text-4xl'} font-extrabold font-sans leading-none flex items-baseline gap-1`}
        style={{ color: 'var(--text-dark)', textShadow: '0 0 15px rgba(245,200,66,0.1)' }}
      >
        {value}
      </div>
      <div 
        className="text-[11px] font-semibold mt-1.5 leading-snug"
        style={{ color: 'var(--text-mid)' }}
      >
        {subtitle}
      </div>
    </div>
  </div>
);

// --- HALAMAN DASHBOARD UTAMA ---
export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { slides, target, blockEnd, pptDots } = useAppStore();

  const doneCount = pptDots.filter(d => d.done).length;

  const examInfo = useMemo(() => {
    if (!blockEnd) return { val: "-", lbl: t('lbl_not_set'), iconClass: "", pacingVal: "-", pacingLbl: "PPT / hari" };
    
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
        iconClass: diffDays > 7 ? "aura-blue" : diffDays > 3 ? "aura-amber" : "aura-red",
        pacingVal: sisaSlide > 0 ? Math.ceil(sisaSlide / diffDays).toString() : "Done!",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_day') : "Kerja luar biasa!"
      };
    } else if (diffDays === 0) {
      return {
        val: t('lbl_today'),
        lbl: t('lbl_show_wings'),
        iconClass: "aura-red",
        pacingVal: sisaSlide > 0 ? sisaSlide.toString() : "Done!",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_more') : "Siap ujian!"
      };
    } else {
      return {
        val: t('lbl_over'),
        lbl: t('lbl_exam_passed'),
        iconClass: "aura-blue",
        pacingVal: "Done!",
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

    let iconClass = "";
    let subTxt = "";
    if (streak >= 5) { iconClass = "aura-fire"; subTxt = t('lbl_streak_fire'); }
    else if (streak >= 3) { iconClass = "aura-amber"; subTxt = t('lbl_streak_amber'); }
    else if (streak > 0) { iconClass = "aura-blue"; subTxt = t('lbl_streak_blue'); }
    else { iconClass = ""; subTxt = t('lbl_streak_none'); }

    return { streak, iconClass, subTxt };
  }, [slides, t]);

  return (
    <div className="flex flex-col gap-4">
      {/* Grid CSS untuk mengatur tata letak kartu modern */}
      <div className="grid grid-cols-2 gap-3.5">
        
        <ModernCard 
          title={t('db_exam_lbl')}
          value={examInfo.val}
          subtitle={examInfo.lbl}
          icon={Hourglass}
          iconColorClass={examInfo.iconClass}
          isHalf={false}
        />

        <ModernCard 
          title={t('db_read_lbl')}
          value={doneCount}
          subtitle={`${t('db_read_tgt')} ${target}`}
          icon={BookOpen}
          iconColorClass="aura-gold"
          isHalf={true}
        />

        <ModernCard 
          title={t('db_daily_lbl')}
          value={examInfo.pacingVal}
          subtitle={examInfo.pacingLbl}
          icon={Target}
          iconColorClass="aura-green"
          isHalf={true}
        />

        <ModernCard 
          title={t('db_streak_lbl')}
          value={
            <>
              {streakInfo.streak} 
              <span className="text-xl ml-1" style={{ color: 'var(--amber)' }}>
                {t('db_streak_day')}
              </span>
            </>
          }
          subtitle={streakInfo.subTxt}
          icon={Flame}
          iconColorClass={streakInfo.iconClass}
          isHalf={false}
        />
      </div>

      {/* Bagian Riwayat (History) - Diberi sentuhan UI modern */}
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={16} style={{ color: 'var(--text-soft)' }} />
          <h2 className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-soft)' }}>
            {t('lb_title')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-card)] to-transparent ml-2"></div>
        </div>
        
        <div className="flex gap-2 bg-[var(--bg-tab)] p-1 rounded-[14px] mb-3 border border-[var(--border-card)]/50">
          <button className="flex-1 py-1.5 text-[11px] font-bold rounded-xl bg-[var(--bg-card-solid)] text-[var(--text-dark)] shadow-sm transition-all">
            🕐 {t('lb_tab_recent')}
          </button>
          <button className="flex-1 py-1.5 text-[11px] font-bold rounded-xl text-[var(--text-soft)] hover:bg-white/10 transition-all">
            🏆 {t('lb_tab_best')}
          </button>
          <button className="flex-1 py-1.5 text-[11px] font-bold rounded-xl text-[var(--text-soft)] hover:bg-white/10 transition-all">
            ✦ {t('lb_tab_podium')}
          </button>
        </div>

        <div className="min-h-[60px] flex items-center justify-center rounded-2xl border border-dashed border-[var(--border-card)] bg-[var(--bg-input)]">
          <span className="text-[11px] font-medium text-[var(--text-soft)]">{t('lb_no_notion')}</span>
        </div>
      </div>
    </div>
  );
};
