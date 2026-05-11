import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, TabName, Theme, Language } from '../types';

interface AppActions {
  setActiveTab: (tab: TabName) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  updateData: (partialState: Partial<AppState>) => void;
}

const initialState: AppState = {
  activeTab: 'dashboard', slides: {}, target: 30, name: "", syncCode: "", blockName: "", blokPageId: null, nilaiUjian: 0,
  blockStart: null, blockEnd: null, milestones: { 25: false, 50: false, 75: false, 100: false },
  badges: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false }, moods: {}, focusTime: 0,
  flashcards: [], matchItems: [], difficultCards: [], matchBestTime: null, fcBestTime: null, theme: 'light', lang: 'id',
  coins: 0, inventory: { streakFreeze: 0 }, pptDots: [], pptMigrated: false, doubleStarExpiry: 0,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setTheme: (theme) => { document.documentElement.setAttribute('data-theme', theme); set({ theme }); },
      setLanguage: (lang) => set({ lang }),
      updateData: (partialState) => set((state) => ({ ...state, ...partialState })),
    }),
    { name: 'rv_storage' }
  )
);
