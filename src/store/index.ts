import { create } from "zustand";
import {
  BacklinkCalculatorSlice,
  createBacklinkCalculatorSlice,
} from "./slice/backlinkCalulatorSlice";
import { DAppSlice, createDAppSlice } from "./slice/dapp";
import { createThemeSlice, ThemeSlice } from "./slice/themeSlice";
import { createUserSlice, UserSlice } from "./slice/userSlice";

type StoreState = DAppSlice & UserSlice & ThemeSlice & BacklinkCalculatorSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createDAppSlice(...a),
  ...createUserSlice(...a),
  ...createThemeSlice(...a),
  ...createBacklinkCalculatorSlice(...a),
}));
