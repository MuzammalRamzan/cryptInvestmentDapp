import { StateCreator } from "zustand";

export interface ThemeSlice {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}
export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
});
