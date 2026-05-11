import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../lib/i18n';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  
  // Mengambil data dari State Management
  const { slides, target, blockEnd, pptDots } = useAppStore();

  // Menghitung total slide yang sudah dibaca
  const doneCount = pptDots.filter(d => d.done).length;

  // Menghitung Sisa Hari Ujian
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
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_day') : "Great job!"
      };
    } else if (diffDays === 0) {
      return {
        val: t('lbl_today'),
        lbl: t('lbl_show_wings'),
        iconClass: "aura-red",
        pacingVal: sisaSlide > 0 ? sisaSlide.toString() : "Done!",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_more') : "Great job!"
      };
    } else {
      return {
        val: t('lbl_over'),
        lbl: t('lbl_exam_passed'),
        iconClass: "aura-blue",
        pacingVal: "Done!",
        pacingLbl: "Great job!"
      };
    }
  }, [blockEnd, target, doneCount, t]);

  // Menghitung Hari Beruntun (Streak)
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
    <div className="flex flex-col gap-3.5">
      {/* Kartu Ujian */}
      <div className="fc-card">
        <div className={`fc-bg-icon ${examInfo.iconClass}`}>⏳</div>
        <div className="fc-content">
          <div className="fc-title">{t('db_exam_lbl')}</div>
          <div className="fc-val">{examInfo.val}</div>
          <div className="fc-sub">{examInfo.lbl}</div>
        </div>
      </div>

      <div className="flex gap-2.5">
        {/* Kartu Slide Dibaca */}
        <div className="fc-card fc-half flex-1">
          <div className="fc-bg-icon aura-gold">📖</div>
          <div className="fc-content">
            <div className="fc-title">{t('db_read_lbl')}</div>
            <div className="fc-val">{doneCount}</div>
            <div className="fc-sub">{t('db_read_tgt')} {target}</div>
          </div>
        </div>

        {/* Kartu Target Harian */}
        <div className="fc-card fc-half flex-1">
          <div className="fc-bg-icon aura-green">🎯</div>
          <div className="fc-content">
            <div className="fc-title">{t('db_daily_lbl')}</div>
            <div className="fc-val">{examInfo.pacingVal}</div>
            <div className="fc-sub">{examInfo.pacingLbl}</div>
          </div>
        </div>
      </div>

      {/* Kartu Streak */}
      <div className="fc-card">
        <div className={`fc-bg-icon ${streakInfo.iconClass}`}>🔥</div>
        <div className="fc-content">
          <div className="fc-title">{t('db_streak_lbl')}</div>
          <div className="fc-val">
            {streakInfo.streak} <span className="text-[20px] ml-1 text-[var(--amber)]">{t('db_streak_day')}</span>
          </div>
          <div className="fc-sub">{streakInfo.subTxt}</div>
        </div>
      </div>

      {/* Bagian Riwayat (Leaderboard Dummy untuk sekarang) */}
      <div className="hist-wrap mt-1">
        <div className="sec-lbl">{t('lb_title')}</div>
        <div className="lb-tab-bar">
          <button className="lb-tab-btn active">{t('lb_tab_recent')}</button>
          <button className="lb-tab-btn">{t('lb_tab_best')}</button>
          <button className="lb-tab-btn">{t('lb_tab_podium')}</button>
        </div>
        <div className="hist-cols min-h-[40px]">
          <div className="hist-loading">{t('lb_no_notion')}</div>
        </div>
      </div>
    </div>
  );
};
