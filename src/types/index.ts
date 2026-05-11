export type Theme = 'light' | 'dark' | 'sakura' | 'moon';
export type Language = 'id' | 'en';
export type TabName = 'dashboard' | 'tracker' | 'reward' | 'setting';

export interface PptDot { done: boolean; title: string; date: string; migrated?: boolean; }
export interface Flashcard { id: string; q: string; a: string; updatedAt: number; }
export interface MatchItem { id: string; src: string; word: string; }
export interface Inventory { streakFreeze: number; luckCharm?: number; memCrystal?: number; doubleStar?: number; themeMoon?: number; themeSakura?: number; [key: string]: number | undefined; }

export interface AppState {
  activeTab: TabName;
  slides: Record<string, number>;
  target: number;
  name: string;
  syncCode: string;
  blockName: string;
  blokPageId: string | null;
  nilaiUjian: number;
  blockStart: string | null;
  blockEnd: string | null;
  milestones: { 25: boolean; 50: boolean; 75: boolean; 100: boolean };
  badges: { 1: boolean; 2: boolean; 3: boolean; 4: boolean; 5: boolean; 6: boolean; 7: boolean };
  moods: Record<string, string>;
  focusTime: number;
  flashcards: Flashcard[];
  matchItems: MatchItem[];
  difficultCards: string[];
  matchBestTime: number | null;
  fcBestTime: number | null;
  theme: Theme;
  lang: Language;
  coins: number;
  inventory: Inventory;
  pptDots: PptDot[];
  pptMigrated: boolean;
  doubleStarExpiry: number;
}
