import { CONTRACT_NAME_ENUM } from "@/enum/contract";
import {
  advisor,
  development,
  influencers,
  liquidity,
  marketing,
  presale,
  privatesale,
  publicsale,
  staking,
  team,
  treasury,
} from "@/config/contract-config";
import { StateCreator } from "zustand";
import { getProvider } from "@/utils/helper";
import { JsonRpcProvider } from "@ethersproject/providers";

type AccountType = string | null;

interface IContract {
  name: string;
  address: string;
  value: number;
}

export interface DAppSlice {
  account: AccountType;
  currentContract: IContract;
  setCurrentContract: (currentContract: IContract) => void;
  setAccount: (account: AccountType) => void;
  contractList: IContract[];
  isBuyingWithCard: boolean;
  setIsBuyingWithCard: (isBuyingWithCard: boolean) => void;
  provider: JsonRpcProvider;
}
export const contractList: IContract[] = [
  { name: CONTRACT_NAME_ENUM.ADVISOR, address: advisor, value: 0 },
  { name: CONTRACT_NAME_ENUM.DEVELOPMENT, address: development, value: 1 },
  { name: CONTRACT_NAME_ENUM.INFLUENCERS, address: influencers, value: 2 },
  { name: CONTRACT_NAME_ENUM.LIQUIDITY, address: liquidity, value: 3 },
  { name: CONTRACT_NAME_ENUM.MARKETING, address: marketing, value: 4 },
  { name: CONTRACT_NAME_ENUM.STAKING, address: staking, value: 5 },
  { name: CONTRACT_NAME_ENUM.TEAM, address: team, value: 6 },
  { name: CONTRACT_NAME_ENUM.PRESALE, address: presale, value: 7 },
  { name: CONTRACT_NAME_ENUM.PRIVATE_SALE, address: privatesale, value: 8 },
  { name: CONTRACT_NAME_ENUM.TREASURY, address: treasury, value: 9 },
  { name: CONTRACT_NAME_ENUM.PUBLIC_SALE, address: publicsale, value: 10 },
];
export const createDAppSlice: StateCreator<DAppSlice> = (set) => ({
  account: null,
  currentContract: { name: "All", address: "", value: 11 },
  setCurrentContract: (currentContract) => set({ currentContract }),
  setAccount: (account: AccountType) => set({ account }),
  contractList: contractList.filter(
    (contract) => [7, 8, 9, 10].indexOf(contract.value) !== -1
  ),
  provider: getProvider(),
  isBuyingWithCard: false,
  setIsBuyingWithCard: (isBuyingWithCard: boolean) => set({ isBuyingWithCard }),
});
