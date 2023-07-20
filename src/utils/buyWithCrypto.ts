import {
  YPredictSale_ABI,
  YPredictSale_BSC_SA,
  YPredictSale_ERC_SA,
  YPredictSale_Polygon_SA,
  YPredictUSDT_ABI,
  YPredictUSDT_SA_BSC,
  YPredictUSDT_SA_ERC,
  YPredictUSDT_SA_Polygon,
} from "@/config/Mainnet/YPredictPreSale";
import { ethers } from "ethers";
import { chainId } from "@/config/chainId";
import { switchNetwork } from "./switchNetowrk";
import toast from "react-hot-toast";

export const buyWithMatic = async (amount: number) => {
  await switchNetwork(chainId.polygon);
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const amountWei = ethers.utils.parseEther(String(amount));
  const contract = new ethers.Contract(
    YPredictSale_Polygon_SA,
    YPredictSale_ABI,
    signer
  );
  toast.dismiss();
  toast.loading('Click "Confirm"', { duration: Infinity });
  return contract.buyTokensNative({ value: amountWei });
};
export const buyWithEthereum = async (amount: number) => {
  await switchNetwork(chainId.eth);
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const amountWei = ethers.utils.parseEther(String(amount));
  toast.dismiss();
  toast.loading('Click "Confirm"', { duration: Infinity });
  const contract = new ethers.Contract(
    YPredictSale_ERC_SA,
    YPredictSale_ABI,
    signer
  );
  return contract.buyTokensNative({ value: amountWei });
};
export const buyWithBSC = async (amount: number) => {
  await switchNetwork(chainId.bsc);
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const amountWei = ethers.utils.parseEther(String(amount));
  const contract = new ethers.Contract(
    YPredictSale_BSC_SA,
    YPredictSale_ABI,
    signer
  );
  toast.dismiss();
  toast.loading('Click "Confirm"', { duration: Infinity });
  return contract.buyTokensNative({ value: amountWei });
};

export const buyWithUSDT = async (amount: number) => {
  try {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const YPRED_SALE_SA =
      network.chainId === chainId.polygon
        ? YPredictSale_Polygon_SA
        : network.chainId === chainId.bsc
        ? YPredictSale_BSC_SA
        : YPredictSale_ERC_SA;
    const amountWei = ethers.utils.parseUnits(
      amount.toString(),
      network.chainId === chainId.bsc ? 18 : 6
    );
    const saleContract = new ethers.Contract(
      YPRED_SALE_SA,
      YPredictSale_ABI,
      signer
    );
    toast.dismiss();
    toast.loading('Click "Confirm"', { duration: Infinity });
    return saleContract.buyTokensUSDT(amountWei, {
      gasLimit: 100000,
    });
  } catch (e) {
    throw e;
  }
};

export const approveUSDT = async (amount: number): Promise<any> => {
  try {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    if (
      ![chainId.eth, chainId.bsc, chainId.polygon].includes(network.chainId)
    ) {
      throw new Error("Please switch network to Polygon or BSC or Ethereum.");
    }
    const USDT_SA =
      network.chainId === chainId.polygon
        ? YPredictUSDT_SA_Polygon
        : network.chainId === chainId.bsc
        ? YPredictUSDT_SA_BSC
        : YPredictUSDT_SA_ERC;
    const YPRED_SALE_SA =
      network.chainId === chainId.polygon
        ? YPredictSale_Polygon_SA
        : network.chainId === chainId.bsc
        ? YPredictSale_BSC_SA
        : YPredictSale_ERC_SA;

    const amountWei = ethers.utils.parseUnits(
      amount.toString(),
      network.chainId === chainId.bsc ? 18 : 6
    );
    toast.dismiss();
    toast.loading(
      'Click on "Use Default" and then Click "Next" and "Approve"',
      {
        duration: 100000,
      }
    );
    const contract = new ethers.Contract(USDT_SA, YPredictUSDT_ABI, signer);
    return contract.approve(YPRED_SALE_SA, amountWei, {
      gasLimit: 100000,
    });
  } catch (e) {
    throw e;
  }
};
