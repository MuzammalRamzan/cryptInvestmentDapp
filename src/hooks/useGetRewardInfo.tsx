import { useAppStore } from "@/store";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";

interface IRewardInfoProps {
  isCalculatingAll: boolean;
  allocatedTokens: string | null;
  isHiddenScratch: boolean;
}

export interface IRewardInfo {
  Bonus_tokens: number;
  NFT_reward: boolean;
  NFTs: number;
  Reward: number;
  cards_claimed: [];
  wallet_address: string;
}

const useGetRewardInfo = ({
  isCalculatingAll,
  allocatedTokens,
}: IRewardInfoProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { account } = useAppStore();
  const [rewardInfo, setRewardInfo] = useState<IRewardInfo | null>(null);
  const fetchRewards = () => {
    if (account && !isCalculatingAll && allocatedTokens) {
      setIsFetching(true);
      fetch(`https://rensketech.com/api/scrach_cards/cards/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: account,
          ypred_balance: Number(allocatedTokens),
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setIsFetching(false);
          setRewardInfo(result);
        })
        .catch((e) => {})
        .finally(() => {
          setIsFetching(false);
        });
    }
  };
  useEffect(() => {
    // fetchRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isCalculatingAll, allocatedTokens]);
  return { rewardInfo, isFetching, fetchRewards };
};

export default useGetRewardInfo;
