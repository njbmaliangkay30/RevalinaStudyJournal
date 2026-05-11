import { useAppStore } from '../store/useAppStore';
import { Language } from '../types';

const dictionary: Record<Language, Record<string, string>> = {
  id: {
    hdr_eyebrow: "Study Journey",
    hdr_greeting: "semangat belajarnya!",
    prog_lbl: "progress",
    prog_total_lbl: "Total PPT Blok ini",
    prog_done_lbl: "slide selesai",
    prog_target_lbl: "target",
    tab_dash: "Dashboard",
    tab_track: "Tracker",
    tab_rew: "Reward",
    tab_set: "Pengaturan",
    sync_conn: "Menghubungkan ke Notion...",
    
    // EMOJI DIHAPUS DI SINI 👇
    db_exam_lbl: "Menuju Ujian",
    db_read_lbl: "Slide Dibaca",
    db_read_tgt: "Target:",
    db_daily_lbl: "Target Harian",
    db_streak_lbl: "Hari Beruntun",
    db_streak_day: "Hari",
    
    trk_title_grid: "Gulungan Slide per hari",
    trk_title_input: "Catatan Perjalananmu Hari Ini",
    trk_lbl_input: "Berapa banyak gulungan slide yang berhasil kamu pelajari hari ini?",
    btn_save: "Simpan",
    msg_saved: "Tersimpan ke Notion!",
    rew_title_card: "Reward Blok Ini",
    rew_note_card: "Mulai tambah bacaanmu untuk menghitung reward",
    shop_title: "Toko Sihir (Booster)",
    shop_streak_title: "Pelindung Api",
    shop_streak_desc: "Menjaga streak tetap aman walau bolos 1 hari.",
    shop_focus_title: "Ramuan Energi",
    shop_focus_desc: "Fitur misteri untuk petualangan berikutnya!",
    shop_coming_soon: "Segera",
    inv_streak_lbl: "Dimiliki: {1}",
    msg_not_enough_coins: "Koin sihirmu belum cukup!",
    gacha_section_title: "Lemari Sihir (Gacha)",
    gacha_entry_sub: "Gunakan koin untuk membuka hadiah misterius dari lemari sihir!",
    gacha_entry_btn: "Buka Lemari Sihir",
    rew_title_rules: "Ketentuan Pencairan Reward",
    rew_rule_1: "Target Belajar Terpenuhi",
    rew_rule_2: "≥ 30% Target Belajar",
    rew_rule_3: "< 30% Target Belajar",
    rew_rule_none: "No Reward",
    rew_rule_4: "Meleset Checkpoint (25, 50, 75%)",
    rew_rule_5: "Nilai Ujian < 60",
    rew_title_gallery: "Galeri Keajaiban (Lencana)",
    bdg_1_title: "Awal Sihir",
    bdg_1_desc: "Membaca slide pertamamu di blok ini.",
    bdg_2_title: "Api Semangat",
    bdg_2_desc: "Belajar 3 hari secara berturut-turut.",
    bdg_3_title: "Sayap Bersinar",
    bdg_3_desc: "Mencapai separuh (50%) dari target blok.",
    bdg_4_title: "Peri Lulus",
    bdg_4_desc: "Berhasil menyentuh target 100% belajar.",
    set_interface_lbl: "Antarmuka & Keajaiban",
    set_theme_lbl: "Suasana Hati (Tema)",
    btn_to_light: "Terang Siang", // Emoji dihapus
    btn_to_dark: "Malam Ajaib",   // Emoji dihapus
    set_lang_lbl: "Bahasa Sihir (Language)",
    set_block_lbl: "Pengaturan blok",
    set_start_lbl: "Tanggal mulai blok",
    set_end_lbl: "Tanggal ujian",
    set_target_lbl: "Target Bacaan Blok ini",
    set_name_lbl: "Nama kamu",
    btn_save_set: "Simpan Pengaturan",
    set_sys_lbl: "Sistem",
    set_reset_desc: "Gunakan tombol ini setiap awal blok baru untuk mengosongkan riwayat, lencana, dan nilai.",
    btn_reset: "Reset Blok Baru",
    menu_match: "Kepingan Ingatan",
    menu_fc: "Ruang Mantra",
    menu_focus: "Mulai Fokus",
    
    // Hapus Emoji di Leaderboard
    lb_title: "Perjalanan Blokku",
    lb_tab_recent: "Terakhir",
    lb_tab_best: "Terbaik",
    lb_tab_podium: "Podium",
    lb_loading: "Memuat riwayat...",
    lb_no_notion: "Hubungkan ke Notion untuk melihat riwayat.",
    lb_empty: "Belum ada riwayat blok tersimpan.",
    lb_error: "Gagal memuat riwayat.",
    lb_no_blocks: "Belum ada riwayat blok.",
    lb_no_name: "(Tanpa Nama)",
    lb_active: "aktif",
    lb_more: "Selengkapnya",
    
    lbl_day: " Hari",
    lbl_until_exam: "Menuju Hari Penentuan",
    lbl_ppt_day: "PPT / hari",
    lbl_today: "Hari Ini!",
    lbl_show_wings: "Tunjukkan Sayap Terindahmu!",
    lbl_ppt_more: "PPT lagi!",
    lbl_over: "Selesai",
    lbl_exam_passed: "Ujian Berlalu",
    lbl_not_set: "Belum Diatur",
    lbl_streak_fire: "Api sihirmu terus menyala!", // Emoji dihapus
    lbl_streak_amber: "Hebat! Pertahankan iramamu!", // Emoji dihapus
    lbl_streak_blue: "Langkah awal yang cantik!",
    lbl_streak_none: "Mulai nyalakan kembali semangatmu."
  },
  en: {
    hdr_eyebrow: "Study Journey",
    hdr_greeting: "happy studying!",
    prog_lbl: "progress",
    prog_total_lbl: "Total Slides This Block",
    prog_done_lbl: "slides read",
    prog_target_lbl: "target",
  }
};

export const useTranslation = () => {
  const lang = useAppStore((state) => state.lang);

  const t = (key: string, ...args: (string | number)[]) => {
    let str = dictionary[lang]?.[key] || dictionary['id'][key] || key;
    args.forEach((arg, i) => { 
      str = str.replace(`{${i + 1}}`, String(arg)); 
    });
    return str;
  };

  return { t };
};
