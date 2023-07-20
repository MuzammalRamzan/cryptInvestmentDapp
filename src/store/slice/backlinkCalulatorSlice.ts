import { IBacklinkEstimationResult } from "@/hooks/usePredictBacklinkEstimation";
import { StateCreator } from "zustand";

export interface BacklinkCalculatorSlice {
  result: IBacklinkEstimationResult;
  setResult: (result: IBacklinkEstimationResult) => void;
  refetchQuery: boolean;
  setRefetchQuery: (refetchQuery: boolean) => void;
  isStripeModalOpen: boolean;
  setIsStripeModalOpen: (isStripeModalOpen: boolean) => void;
}

export const initialResult: IBacklinkEstimationResult = {
  "averageDomainAuthorityForLink-1": -1,
  "averagePageAuthorityForLink-1": -1,
  "backlinkCountForLink-1": -1,
  "uniqueDomainAuthorityForLink-1": -1,
};
export const createBacklinkCalculatorSlice: StateCreator<
  BacklinkCalculatorSlice
> = (set) => ({
  result: initialResult,
  setResult: (result) => set({ result }),
  refetchQuery: false,
  setRefetchQuery: (refetchQuery: boolean) => set({ refetchQuery }),
  isStripeModalOpen: false,
  setIsStripeModalOpen: (isStripeModalOpen: boolean) =>
    set({ isStripeModalOpen }),
});
