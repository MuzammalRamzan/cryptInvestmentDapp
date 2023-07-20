import { IRewardInfo } from "@/hooks/useGetRewardInfo";
import { Icon } from "@iconify/react";
import React, { useRef, useState, useEffect } from "react";
import ScratchCard from "../ScratchCard";

interface IRewardScratchCardProps {
  isCalculatingAll: boolean;
  rewardInfo: IRewardInfo | null;
  setIsHiddenScratch: React.Dispatch<React.SetStateAction<boolean>>;
}
const RewardScratchCard: React.FC<IRewardScratchCardProps> = ({
  isCalculatingAll,
  rewardInfo,
  setIsHiddenScratch,
}) => {
  const [countDown, setCountDown] = useState<number>(0);
  const [timerDelay, setTimerDelay] = useState<any>(null);
  const [isScratchFinish, setIsScratchFinish] = useState<boolean>(false);
  const [scratchType, setScratchType] = useState<string>("");
  const [nextScratch, setNextScratch] = useState<boolean>(false);
  const onScratchComplete = () => {
    setIsScratchFinish(true);
    setCountDown(5);
  };
  useEffect(() => {
    if (isScratchFinish && scratchType && !isCalculatingAll) {
      setIsHiddenScratch(false);
      setTimerDelay(
        setInterval(function () {
          setCountDown((prev) => prev - 1);
        }, 1000)
      );
      return () => {
        clearInterval(timerDelay);
        if (scratchType === "token" && rewardInfo?.NFT_reward) {
          setNextScratch(true);
        } else {
          setNextScratch(false);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScratchFinish, scratchType, isCalculatingAll]);
  useEffect(() => {
    if (countDown <= 0) {
      if (scratchType === "token" && rewardInfo?.NFT_reward) {
        setNextScratch(true);
        setScratchType("nft");
      } else {
        setNextScratch(false);
      }
      clearInterval(timerDelay);
    }
    if (countDown <= 0 && isScratchFinish) {
      setTimeout(() => {
        setIsHiddenScratch(true);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, isScratchFinish]);
  useEffect(() => {
    if (!scratchType && !isCalculatingAll) {
      if (rewardInfo && rewardInfo?.Reward > 0) {
        setScratchType("token");
      } else if (rewardInfo?.NFT_reward) {
        setScratchType("nft");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardInfo?.NFT_reward, rewardInfo?.Reward, isCalculatingAll]);
  return (
    <div>
      <div>
        {!isScratchFinish && !isCalculatingAll && (
          <h3 className="font-medium text-xl lg:text-2xl mb-3">
            A new scratch card
          </h3>
        )}
        {isScratchFinish && countDown > 0 && (
          <p className="text-xl font-medium">{countDown}</p>
        )}
        {countDown <= 0 ? (
          <>
            {isScratchFinish ? (
              <div className="d-flex flex-column text-white align-items-center justify-content-center h-100 font-medium">
                {scratchType && <p>Congrats</p>}
                {scratchType === "token" && (
                  <p>{`You won ${rewardInfo?.Reward?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })} YPREDs`}</p>
                )}
                {scratchType === "nft" && <p>{`You won an NFT`}</p>}
                {!scratchType &&
                  rewardInfo &&
                  Object.values(rewardInfo).length <= 0 &&
                  !isCalculatingAll && <p>Please Connect Wallet</p>}
                {isCalculatingAll && (
                  <Icon
                    icon="eos-icons:three-dots-loading"
                    width="58"
                    height="44"
                  />
                )}
              </div>
            ) : (
              <ScratchCard
                height={80}
                width={350}
                imageSrc="/img/dashboard/unlocked_card.jpg"
                onComplete={onScratchComplete}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RewardScratchCard;
