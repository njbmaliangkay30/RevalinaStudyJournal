import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../lib/i18n';
import { Hourglass, BookOpen, Target, Flame, Trophy, Clock, Medal, Crown, Sparkles } from 'lucide-react';

// ── Animasi stagger kartu ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 }
  }
};

// ── Tipe props kartu ──
interface CardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  gradientClass: string;
  isHalf?: boolean;
  isActiveAction?: boolean;
  /** Teks kecil opsional di pojok kanan atas kartu */
  badge?: string;
}

// ── Kartu kaca ──
const FairyGlassCard: React.FC<CardProps> = ({
  title, value, subtitle, icon: Icon, gradientClass, isHalf, isActiveAction, badge
}) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -3, scale: 1.015 }}
    whileTap={{ scale: 0.975 }}
    className={`group relative overflow-hidden rounded-[22px] p-4 backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl cursor-pointer ${
      isHalf ? 'col-span-1' : 'col-span-2'
    }`}
    style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)'
    }}
  >
    {/* Glow hover */}
    <div className={`absolute -inset-4 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl rounded-full bg-gradient-to-br ${gradientClass} pointer-events-none`} />

    {/* Header kartu */}
    <div className="flex items-center justify-between mb-3 relative z-10">
      <div className="flex items-center gap-2.5">
        <div className={`flex items-center justify-center w-9 h-9 rounded-[12px] bg-gradient-to-br ${gradientClass} shadow-[inset_0_-2px_8px_rgba(0,0,0,0.18)]`}>
          <Icon
            size={18}
            strokeWidth={isActiveAction ? 3 : 2.5}
            className={`text-white drop-shadow-sm ${isActiveAction ? 'animate-[bounce_2s_ease-in-out_infinite]' : ''}`}
          />
        </div>
        <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-soft)]">
          {title}
        </h3>
      </div>
      {badge && (
        <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--gold-pale)] text-[var(--gold-dark)] border border-[var(--gold-light)]/40">
          {badge}
        </span>
      )}
    </div>

    {/* Nilai utama + subtitle */}
    <div className="flex flex-col relative z-10">
      <div className={`${isHalf ? 'text-[26px]' : 'text-[30px]'} font-extrabold leading-none tracking-tight flex items-baseline gap-1 bg-clip-text text-transparent bg-gradient-to-br from-[var(--text-dark)] to-[var(--text-mid)]`}>
        {value}
      </div>
      <div className="text-[10px] font-semibold mt-1.5 tracking-wide text-[var(--text-soft)]">
        {subtitle}
      </div>
    </div>
  </motion.div>
);

// ── Komponen Dashboard ──
export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { slides, target, blockEnd, pptDots } = useAppStore();
  const [activeLeaderTab, setActiveLeaderTab] = useState<'recent' | 'best' | 'podium'>('recent');

  const doneCount = pptDots.filter(d => d.done).length;

  // ── Logika ujian ──
  const examInfo = useMemo(() => {
    if (!blockEnd) return {
      val: "–", lbl: t('lbl_not_set'),
      gradientClass: "from-gray-400 to-gray-500",
      pacingVal: "–", pacingLbl: "PPT / hari", isActive: false,
      badge: undefined
    };

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const examDate = new Date(blockEnd); examDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const sisaSlide = Math.max(0, target - doneCount);

    if (diffDays > 0) {
      const urgentBadge = diffDays <= 3 ? "Mendesak!" : diffDays <= 7 ? "Segera" : undefined;
      return {
        val: `${diffDays}`,
        lbl: t('lbl_until_exam'),
        gradientClass: diffDays > 7
          ? "from-[#8ab4f8] to-[#3a5fc0]"
          : diffDays > 3
          ? "from-[#f5c842] to-[#e8a020]"
          : "from-[#ff8a8a] to-[#e85050]",
        pacingVal: sisaSlide > 0 ? Math.ceil(sisaSlide / diffDays).toString() : "✓",
        pacingLbl: sisaSlide > 0 ? t('lbl_ppt_day') : "Selesai!",
        isActive: diffDays <= 3,
        badge: urgentBadge
      };
    }

    return {
      val: "✓", lbl: t('lbl_exam_passed'),
      gradientClass: "from-[#8ab4f8] to-[#3a5fc0]",
      pacingVal: "✓", pacingLbl: "Misi selesai.",
      isActive: false, badge: "Selesai"
    };
  }, [blockEnd, target, doneCount, t]);

  // ── Logika streak ──
  const streakInfo = useMemo(() => {
    let streak = 0;
    const d = new Date();
    const fmtISO = (date: Date) => date.toISOString().split("T")[0];
    const todayStr = fmtISO(d);
    const yesterdayD = new Date(d);
    yesterdayD.setDate(yesterdayD.getDate() - 1);
    const yesterdayStr = fmtISO(yesterdayD);

    const currStr = slides[todayStr] > 0 ? todayStr : slides[yesterdayStr] > 0 ? yesterdayStr : null;
    if (currStr) {
      const tempD = new Date(currStr + "T00:00:00");
      while (true) {
        if (slides[fmtISO(tempD)] > 0) { streak++; tempD.setDate(tempD.getDate() - 1); }
        else break;
      }
    }

    let gradientClass: string;
    let subTxt: string;
    if (streak >= 5) { gradientClass = "from-[#ff7e5f] to-[#e85050]"; subTxt = t('lbl_streak_fire'); }
    else if (streak >= 3) { gradientClass = "from-[#f5c842] to-[#e8a020]"; subTxt = t('lbl_streak_amber'); }
    else if (streak > 0) { gradientClass = "from-[#8ab4f8] to-[#3a5fc0]"; subTxt = t('lbl_streak_blue'); }
    else { gradientClass = "from-gray-400 to-gray-500"; subTxt = t('lbl_streak_none'); }

    return { streak, gradientClass, subTxt, isActive: streak >= 3 };
  }, [slides, t]);

  // ── Tab leaderboard ──
  const leaderTabs: { id: 'recent' | 'best' | 'podium'; icon: React.ElementType; label: string }[] = [
    { id: 'recent', icon: Clock, label: t('lb_tab_recent') },
    { id: 'best', icon: Medal, label: t('lb_tab_best') },
    { id: 'podium', icon: Crown, label: t('lb_tab_podium') },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
    >
      {/* ── Grid kartu utama ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Menuju Ujian — full width, nilai lebih besar + unit "hari" inline */}
        <FairyGlassCard
          title={t('db_exam_lbl')}
          value={
            <>
              {examInfo.val}
              {examInfo.val !== "–" && examInfo.val !== "✓" && (
                <span className="text-[16px] font-bold text-[var(--text-soft)] ml-1">hari</span>
              )}
            </>
          }
          subtitle={examInfo.lbl}
          icon={Hourglass}
          gradientClass={examInfo.gradientClass}
          isHalf={false}
          isActiveAction={examInfo.isActive}
          badge={examInfo.badge}
        />

        {/* Slide Dibaca */}
        <FairyGlassCard
          title={t('db_read_lbl')}
          value={doneCount}
          subtitle={`dari ${target} slide`}
          icon={BookOpen}
          gradientClass="from-[#f5c842] to-[#b8900a]"
          isHalf={true}
        />

        {/* Target Harian */}
        <FairyGlassCard
          title={t('db_daily_lbl')}
          value={examInfo.pacingVal}
          subtitle={examInfo.pacingLbl}
          icon={Target}
          gradientClass="from-[#8dc95a] to-[#2e6b1a]"
          isHalf={true}
        />

        {/* Hari Beruntun — full width */}
        <FairyGlassCard
          title={t('db_streak_lbl')}
          value={
            <>
              {streakInfo.streak}
              <span className="text-[16px] ml-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--amber)] to-[var(--gold-dark)]">
                {t('db_streak_day')}
              </span>
            </>
          }
          subtitle={streakInfo.subTxt}
          icon={Flame}
          gradientClass={streakInfo.gradientClass}
          isHalf={false}
          isActiveAction={streakInfo.isActive}
        />
      </div>

      {/* ── Leaderboard ── */}
      <motion.div variants={cardVariants} className="mt-1">

        {/* Judul section */}
        <div className="flex items-center gap-2.5 mb-3 px-1">
          <div className="p-1.5 rounded-[10px] bg-[var(--gold-pale)] border border-[var(--gold-light)]/50">
            <Trophy size={13} className="text-[var(--gold-dark)]" strokeWidth={3} />
          </div>
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-soft)]">
            {t('lb_title')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold-light)] to-transparent opacity-50" />
        </div>

        {/* Tab switcher — sekarang BERFUNGSI */}
        <div
          className="flex gap-1.5 p-1.5 rounded-[16px] mb-3 backdrop-blur-md border"
          style={{ backgroundColor: 'var(--bg-tab)', borderColor: 'var(--border-card)' }}
        >
          {leaderTabs.map(({ id, icon: Icon, label }) => {
            const isActive = activeLeaderTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveLeaderTab(id)}
                className={`flex items-center justify-center gap-1 flex-1 py-2 text-[10px] font-bold rounded-[12px] transition-all duration-250 ${
                  isActive
                    ? 'bg-white shadow-[0_3px_10px_rgba(0,0,0,0.07)] text-[var(--text-dark)]'
                    : 'text-[var(--text-soft)] hover:bg-white/30'
                }`}
              >
                <Icon size={12} className={isActive ? 'text-[var(--gold-dark)]' : ''} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Konten tab — placeholder yang lebih informatif */}
        <div
          className="rounded-[20px] border-2 border-dashed overflow-hidden"
          style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}
        >
          {activeLeaderTab === 'recent' && (
            <div className="flex flex-col items-center justify-center gap-2 py-7 px-4">
              <div className="p-2.5 bg-[var(--gold-pale)] rounded-full">
                <Sparkles size={15} className="text-[var(--gold-dark)]" />
              </div>
              <p className="text-[11px] font-semibold text-[var(--text-soft)] text-center leading-relaxed">
                {t('lb_no_notion')}
              </p>
              <p className="text-[9px] text-[var(--text-soft)] opacity-50 text-center">
                Riwayat belajar akan muncul di sini
              </p>
            </div>
          )}
          {activeLeaderTab === 'best' && (
            <div className="flex flex-col items-center justify-center gap-2 py-7 px-4">
              <div className="p-2.5 bg-[var(--gold-pale)] rounded-full">
                <Medal size={15} className="text-[var(--gold-dark)]" />
              </div>
              <p className="text-[11px] font-semibold text-[var(--text-soft)] text-center">
                Rekor terbaikmu akan tercatat di sini
              </p>
              <p className="text-[9px] text-[var(--text-soft)] opacity-50 text-center">
                Mulai belajar untuk mengisi papan ini!
              </p>
            </div>
          )}
          {activeLeaderTab === 'podium' && (
            <div className="flex flex-col items-center justify-center gap-2 py-7 px-4">
              <div className="p-2.5 bg-[var(--gold-pale)] rounded-full">
                <Crown size={15} className="text-[var(--gold-dark)]" />
              </div>
              <p className="text-[11px] font-semibold text-[var(--text-soft)] text-center">
                Podiummu menunggumu! 🏆
              </p>
              <p className="text-[9px] text-[var(--text-soft)] opacity-50 text-center">
                Konsistensi adalah kuncinya
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center py-3 mt-1">
        <span className="text-[9px] font-bold tracking-widest text-[var(--text-soft)] uppercase opacity-30">
          ✦ Revalina's Pixie Dust ✦
        </span>
      </div>
    </motion.div>
  );
};
