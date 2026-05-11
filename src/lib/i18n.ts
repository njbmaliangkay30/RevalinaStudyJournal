import { useAppStore } from '../store/useAppStore';
import { Language } from '../types';

const dictionary: Record<Language, Record<string, string>> = {
  id: {
    hdr_eyebrow: "Study Journey", hdr_greeting: "semangat belajarnya!", prog_lbl: "progress", prog_total_lbl: "Total PPT Blok ini",
    prog_done_lbl: "slide selesai", prog_target_lbl: "target", tab_dash: "Dashboard", tab_track: "Tracker",
    tab_rew: "Reward", tab_set: "Pengaturan", db_exam_lbl: "Menuju Ujian", db_read_lbl: "Slide Dibaca",
    db_read_tgt: "Target:", db_daily_lbl: "Target Harian", db_streak_lbl: "Hari Beruntun", db_streak_day: "Hari",
    lbl_day: " Hari", lbl_until_exam: "Menuju Hari Penentuan", lbl_ppt_day: "PPT / hari", lbl_today: "Hari Ini!",
    lbl_show_wings: "Tunjukkan Sayap Terindahmu!", lbl_ppt_more: "PPT lagi!", lbl_over: "Selesai", lbl_exam_passed: "Ujian Berlalu",
    lbl_not_set: "Belum Diatur", lbl_streak_fire: "Api sihirmu terus menyala!", lbl_streak_amber: "Hebat! Pertahankan iramamu!",
    lbl_streak_blue: "Langkah awal yang cantik!", lbl_streak_none: "Mulai nyalakan kembali semangatmu.", lb_title: "Perjalanan Blokku",
    lb_tab_recent: "Terakhir", lb_tab_best: "Terbaik", lb_tab_podium: "Podium", lb_no_notion: "Hubungkan ke Notion untuk riwayat."
  },
  en: {
    hdr_eyebrow: "Study Journey", hdr_greeting: "happy studying!", prog_lbl: "progress", prog_total_lbl: "Total Slides This Block",
    prog_done_lbl: "slides read", prog_target_lbl: "target"
  }
};

export const useTranslation = () => {
  const lang = useAppStore((state) => state.lang);
  const t = (key: string, ...args: (string | number)[]) => {
    let str = dictionary[lang]?.[key] || dictionary['id'][key] || key;
    args.forEach((arg, i) => { str = str.replace(`{${i + 1}}`, String(arg)); });
    return str;
  };
  return { t };
};
