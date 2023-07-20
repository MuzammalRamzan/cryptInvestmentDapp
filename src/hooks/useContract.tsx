import { ABI } from "@/abi/ContractABI";
import { advisor, infuraId } from "@/config/contract-config";
import { useAppStore } from "@/store";
import { getProvider, truncate } from "@/utils/helper";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import toast from "react-hot-toast";
import vestige from "@/abi/Vesting.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
const useContract = () => {
  const { account, provider } = useAppStore();
  const [allocatedTokens, setAllocatedTokens] = useState<string | null>(null);
  const [claimedTokens, setClaimedTokens] = useState<string>("0.00");
  const { currentContract } = useAppStore();
  const [isCalculatingAll, setIsCalculatingAll] = useState<boolean>(false);
  const { contractList } = useAppStore();
  const vestigeInterface = new ethers.utils.Interface(vestige);
  const getLockedToken = () => {
    const floatLockedToken = Number(
      parseFloat(allocatedTokens || "0.00") - parseFloat(claimedTokens)
    ).toFixed(2);
    const floatLockedTokenString = floatLockedToken.toString();
    return floatLockedTokenString;
  };
  const getClaimableTokens = async (userAddress: string) => {
    const contract = new ethers.Contract(
      currentContract.address,
      ABI,
      provider
    );
    const claimableTokens = await contract.getClaimableTokens(userAddress);
    const convertedToString = claimableTokens.toString();

    if (convertedToString.length < 19) {
      let addedZeros = "";
      for (let i = convertedToString.length; i < 19; i++) {
        addedZeros = addedZeros + "0";
      }
      const completeMoreThan19Digits = addedZeros + convertedToString;
      const tokens = truncate(completeMoreThan19Digits, 4);
      setClaimedTokens(tokens);
    } else {
      const tokens = truncate(convertedToString, 4);
      setClaimedTokens(tokens);
    }
  };

  const getLockedTokenPercentage = () => {
    if (!allocatedTokens) {
      return "0";
    }
    const floatLockedToken = (
      parseFloat(allocatedTokens ?? 0) - parseFloat(claimedTokens)
    ).toFixed(2);
    const percentagePer100 = (
      (parseFloat(floatLockedToken ?? 0) * 100) /
      parseFloat(allocatedTokens ?? 0)
    ).toFixed(2);
    return Number(percentagePer100) ? percentagePer100.toString() : 0;
  };

  /**
   *
   * @param userAddress
   */
  const getAllAllocatedTokens = async (userAddress: string) => {
    setIsCalculatingAll(true);
    let allTheAllocatedTokens = "0000000000000000000";
    const arrayOfAllocatedTokens = [];
    for (let i = 0; i < contractList.length; i++) {
      const contract = new ethers.Contract(
        contractList[i].address,
        ABI,
        provider
      );
      let allocatedToken = (
        await contract.getAllocatedTokens(userAddress)
      ).toString();
      if (allocatedToken.length < 19) {
        let addedZeros = "";
        for (let i = allocatedToken.length; i < 19; i++) {
          addedZeros = addedZeros + "0";
        }
        arrayOfAllocatedTokens.push(addedZeros + allocatedToken);
      } else {
        arrayOfAllocatedTokens.push(allocatedToken);
      }
    }

    for (let i = 0; i < arrayOfAllocatedTokens.length; i++) {
      allTheAllocatedTokens = BigNumber.from(allTheAllocatedTokens)
        .add(BigNumber.from(arrayOfAllocatedTokens[i]))
        .toString();
    }
    if (allTheAllocatedTokens.length < 19) {
      let addedZeros = "";
      for (let i = allTheAllocatedTokens.length; i < 19; i++) {
        addedZeros = addedZeros + "0";
      }
      const completeMoreThan19Digits = addedZeros + allTheAllocatedTokens;
      const tokens = truncate(completeMoreThan19Digits, 2);
      setAllocatedTokens(tokens);
      setIsCalculatingAll(false);
    } else {
      const tokens = truncate(allTheAllocatedTokens, 2);
      setAllocatedTokens(tokens);
      setIsCalculatingAll(false);
    }
  };
  const getAllClaimableTokens = async (userAddress: string) => {
    setIsCalculatingAll(true);
    let allTheAllocatedTokens = "0000000000000000000";
    const arrayOfAllocatedTokens = [];

    for (let i = 0; i < contractList.length; i++) {
      // loop over all contracts

      const contract = new ethers.Contract(
        contractList[i].address,
        ABI,
        provider
      );
      let allocatedToken = (
        await contract.getClaimableTokens(userAddress)
      ).toString();

      if (allocatedToken.length < 19) {
        let addedZeros = "";
        for (let i = allocatedToken.length; i < 19; i++) {
          addedZeros = addedZeros + "0";
        }
        arrayOfAllocatedTokens.push(addedZeros + allocatedToken);
      } else {
        arrayOfAllocatedTokens.push(allocatedToken);
      }
    }

    for (let i = 0; i < arrayOfAllocatedTokens.length; i++) {
      allTheAllocatedTokens = BigNumber.from(allTheAllocatedTokens)
        .add(BigNumber.from(arrayOfAllocatedTokens[i]))
        .toString();
    }
    if (allTheAllocatedTokens.length < 19) {
      let addedZeros = "";
      for (let i = allTheAllocatedTokens.length; i < 19; i++) {
        addedZeros = addedZeros + "0";
      }
      const completeMoreThan19Digits = addedZeros + allTheAllocatedTokens;
      const tokens = truncate(completeMoreThan19Digits, 2);
      setClaimedTokens(tokens);
    } else {
      const tokens = truncate(allTheAllocatedTokens, 2);
      setClaimedTokens(tokens);
    }
  };

  const getAllocatedTokens = async (userAddress: string) => {
    setIsCalculatingAll(true);
    const contract = new ethers.Contract(
      currentContract.address,
      ABI,
      provider
    );
    const allocatedTokens = await contract.getAllocatedTokens(userAddress);
    const convertedToString = allocatedTokens.toString();
    if (convertedToString.length < 19) {
      let addedZeros = "";
      for (let i = convertedToString.length; i < 19; i++) {
        addedZeros = addedZeros + "0";
      }
      const completeMoreThan19Digits = addedZeros + convertedToString;
      const tokens = truncate(completeMoreThan19Digits, 4);
      setIsCalculatingAll(false);
      setAllocatedTokens(tokens);
    } else {
      const tokens = truncate(convertedToString, 4);
      setIsCalculatingAll(false);
      setAllocatedTokens(tokens);
    }
  };

  const claimTokens = async () => {
    try {
      if (account) {
        if (window.ethereum !== undefined) {
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const signer = provider.getSigner();
          let contract = new ethers.Contract(advisor, vestigeInterface, signer);
          let claimTokensTx = await contract.claimTokens([account]);
          await claimTokensTx.wait();
          toast.success("Sucessfully Claimed");
        } else {
          const walletConnectProvider = new WalletConnectProvider({
            infuraId: infuraId,
            qrcode: true,
          });
          await walletConnectProvider.enable();
          const provider = new ethers.providers.Web3Provider(
            walletConnectProvider
          );
          const signer = provider.getSigner();
          let contract = new ethers.Contract(advisor, vestigeInterface, signer);
          let claimTokensTx = await contract.claimTokens([account]);
          await claimTokensTx.wait();
          toast.success("Sucessfully Claimed");
        }
      } else {
        toast.dismiss();
        toast.error("Connect Wallet");
      }
    } catch (error: any) {
      console.log(error);
      // toast.error(JSON.stringify(error));
    }
  };
  return {
    getAllocatedTokens,
    allocatedTokens,
    provider,
    isCalculatingAll,
    getLockedToken,
    getLockedTokenPercentage,
    claimTokens,
    getAllClaimableTokens,
    setClaimedTokens,
    getClaimableTokens,
    getAllAllocatedTokens,
    setAllocatedTokens,
    claimedTokens,
  };
};

export default useContract;
