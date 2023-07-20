import { StateCreator } from "zustand";
type ActiveSection = "login" | "register";
export interface UserSlice {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  profile: IUser | null;
  setProfile: (profile: IUser | null) => void;
  activeSection: ActiveSection;
  setActiveSection: (activeSection: ActiveSection) => void;
  balance: number;
  setBalance: (balance: number) => void;
}
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  profile: null,
  setProfile: (profile: any) => set({ profile }),
  activeSection: "login",
  setActiveSection: (activeSection: ActiveSection) => set({ activeSection }),
  balance: 0,
  setBalance: (balance: number) => set({ balance }),
});
