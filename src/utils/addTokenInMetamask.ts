import { chainId } from "@/config/chainId";
import { tokenAddress } from "@/config/contract-config";
import toast from "react-hot-toast";
import { switchNetwork } from "./switchNetowrk";

export const addTokenInMetamask = async () => {
  try {
    await switchNetwork(chainId.polygon, true);
    (window as any).ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: "YPRED",
            decimals: 18,
            image: "https://ypredict.ai/img/icon/logo_ic.png",
          },
        },
      })
      .then((success: any) => {
        toast.dismiss();
        if (success) {
          toast.success("Token added successfully.");
        } else {
          toast.error("Something went wrong.");
          throw new Error("Something went wrong.");
        }
      })
      .catch(console.error);
  } catch (e) {}
};
