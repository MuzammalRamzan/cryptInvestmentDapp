import BalanceCard from "@/components/dashboard/BalanceCard";
import DappLayout from "@/components/dashboard/DappLayout";
import RewardScratchCard from "@/components/dashboard/RewardSratchCard";
import useContract from "@/hooks/useContract";
import useGetOrders from "@/hooks/useGetOrders";
import useGetRewardInfo from "@/hooks/useGetRewardInfo";
import { useAppStore } from "@/store";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { account } = useAppStore();
  const [paidYpred, setPaidYpred] = useState<number>(0);
  const { fetchOrders, orders } = useGetOrders();
  const [isHiddenScratch, setIsHiddenScratch] = useState<boolean>(false);
  const { currentContract } = useAppStore();
  const {
    getAllAllocatedTokens,
    getClaimableTokens,
    getAllClaimableTokens,
    setClaimedTokens,
    setAllocatedTokens,
    getAllocatedTokens,
    getLockedToken,
    allocatedTokens,
    claimedTokens,
    claimTokens,
    getLockedTokenPercentage,
    isCalculatingAll,
  } = useContract();
  const { isFetching, rewardInfo } = useGetRewardInfo({
    isCalculatingAll,
    allocatedTokens,
    isHiddenScratch,
  });
  const fetchAllTokens = () => {
    if (account) {
      if (currentContract.value === 11) {
        getAllAllocatedTokens(account);
        getAllClaimableTokens(account);
      } else {
        getAllocatedTokens(account);
        getClaimableTokens(account);
      }
    } else {
      setAllocatedTokens(null);
      setClaimedTokens("0.00");
    }
  };
  useEffect(() => {
    fetchAllTokens();
    if (account) {
      fetchOrders({ from: account });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currentContract.address]);
  useEffect(() => {
    if (orders && orders.length > 0) {
      const paidYpreds = orders
        .filter(
          (order: OrderInterface) =>
            order.status === "PA" && !order.address?.startsWith("0x")
        )
        ?.reduce((acc: number, current: OrderInterface, index: number) => {
          return acc + +current.ypred;
        }, 0);
      setPaidYpred(paidYpreds);
    }
  }, [orders]);
  return (
    <>
      <Head>
        <title>YPredict Dashboard</title>
        <meta name="description" content="yPredict Dashboard" />
      </Head>
      <DappLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <BalanceCard>
            <BalanceCard.Title
              isCalculatingAll={isCalculatingAll}
              tokenValue={Number(allocatedTokens) + paidYpred ?? "0.00"}
              title="Connect Wallet"
            />
            <BalanceCard.Description>Your YPRED</BalanceCard.Description>
          </BalanceCard>

          <BalanceCard>
            <BalanceCard.Title
              isCalculatingAll={isCalculatingAll}
              tokenValue={`${getLockedToken()} /
                                ${getLockedTokenPercentage()} %`}
              title="Connect Wallet"
            />
            <BalanceCard.Description>Locked YPRED</BalanceCard.Description>
          </BalanceCard>

          <BalanceCard>
            <div className="flex w-full flex-col gap-2">
              <BalanceCard.Title
                isCalculatingAll={isCalculatingAll}
                tokenValue={Number(claimedTokens)}
                title="Connect Wallet"
              />
              <BalanceCard.Description>Available YPRED</BalanceCard.Description>
              <button
                onClick={() => {}}
                className="h-11 px-10 w-fit bg-dashboard-dark-purple text-base text-white flex items-center gap-2 rounded-md hover:bg-gray-800"
              >
                Claim
              </button>
            </div>
          </BalanceCard>

          <BalanceCard>
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                YPRED Balance
              </h2>
              <BalanceCard.SubTitle
                isCalculatingAll={isFetching || isCalculatingAll}
                tokenValue={
                  Number(
                    Number(allocatedTokens) +
                      (Number(rewardInfo?.Bonus_tokens?.toFixed(2)) || 0)
                  )
                    ? Number(
                        Number(allocatedTokens) +
                          (Number(rewardInfo?.Bonus_tokens?.toFixed(2)) || 0)
                      )
                    : "0.00"
                }
                title="Connect Wallet"
              />
              {account && !isFetching && !isCalculatingAll && rewardInfo && (
                <p>{`${
                  Number(Number(allocatedTokens) + rewardInfo?.Bonus_tokens)
                    ? Number(allocatedTokens) +
                      Number(rewardInfo?.Bonus_tokens?.toFixed(2))
                    : "0.00"
                } (inc. ${
                  rewardInfo?.Bonus_tokens?.toFixed(2) || 0
                } bonus)`}</p>
              )}
            </div>
          </BalanceCard>

          {rewardInfo &&
          (rewardInfo?.NFT_reward || rewardInfo?.Reward > 0) &&
          !isHiddenScratch ? (
            <BalanceCard.Wider>
              <RewardScratchCard
                isCalculatingAll={isCalculatingAll || isFetching}
                rewardInfo={rewardInfo}
                setIsHiddenScratch={setIsHiddenScratch}
              />
            </BalanceCard.Wider>
          ) : (
            <BalanceCard.Wider>
              {rewardInfo && (
                <div className="w-full flex items-center gap-8">
                  <div className="w-fit basis-1/2 flex flex-col gap-3">
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                      Cards Claimed
                    </h2>
                    <BalanceCard.SubTitle
                      isCalculatingAll={isFetching || isCalculatingAll}
                      tokenValue={rewardInfo?.cards_claimed?.length ?? 0}
                      title="Connect Wallet"
                    />
                    {account &&
                      !isFetching &&
                      !isCalculatingAll &&
                      rewardInfo && (
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                          {rewardInfo?.Bonus_tokens?.toFixed(2) ?? 0} YPREDs
                        </h2>
                      )}
                  </div>
                  <div className="w-fit basis-1/2 flex flex-col gap-3">
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                      NFTs
                    </h2>
                    <BalanceCard.SubTitle
                      isCalculatingAll={isFetching || isCalculatingAll}
                      tokenValue={rewardInfo?.NFTs || 0}
                      title="Connect Wallet"
                    />
                  </div>
                </div>
              )}
              {!rewardInfo && (
                <div>
                  <h2 className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                    Bonus
                  </h2>
                  <p className="text-white text-base mt-2">
                    Scratch cards are off, your existing bonus will be allocated
                  </p>
                </div>
              )}
            </BalanceCard.Wider>
          )}
        </div>
      </DappLayout>
    </>
  );
}
