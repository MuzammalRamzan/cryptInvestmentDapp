import { useAppStore } from "@/store";
import WertModule from "@wert-io/module-react-component";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { useEffect } from "react";
import Web3 from "web3";
import { Buffer } from "buffer";
import useMarkCardPayment from "@/hooks/useMarkCardPayment";
import toast from "react-hot-toast";

const theme = {
  color_background: "transparent",
  color_buttons: "#ffffff",
  color_buttons_text: "#f327f2",
  // color_main_text: "#ffffff",
  // color_secondary_buttons: "#1d1f29",
  // color_secondary_buttons_text: "#ffffff",
  // color_popups_background: "#2e3141",
  theme: "dark",
};
type WertPaymentStatus =
  | "pending"
  | "cancelled"
  | "failed"
  | "success"
  | "failover";
const WertCardPayment: React.FC<{
  value: number;
  onSuccess: () => void;
  ypredAmount: number;
  inputUSD: number;
  USDT: number;
}> = ({ value, ypredAmount, onSuccess, inputUSD, USDT }) => {
  const { markPayment } = useMarkCardPayment();
  const { account } = useAppStore();
  const clickId = sessionStorage.getItem("clickId");
  const web3 = new Web3((window as any).ethereum);
  const privateKey = process.env.NEXT_PUBLIC_WERT_PRIVATE_KEY as string;
  const pushPlausible = () => {
    (window as any).plausible("sale-final", {
      revenue: { currency: "USD", amount: Number(USDT) },
    });
  };
  const pushTransactionSuccess = (transactionHash: string) => {
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "swap",
      workflowStepNumber: 3,
      workflowStepName: "swapSuccessful",
      workflowCompleteFlag: 1,
      workflowErrorCode: "",
      walletAddress: account?.toLowerCase(),
      transactionId: transactionHash,
      swapFromCurrency: "usd",
      swapFromValue: inputUSD,
      swapToCurrency: "$YPRED",
      swapToValue: ypredAmount,
    });
  };
  const pushClickConfirmButton = () => {
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "swap",
      workflowStepNumber: 2,
      workflowStepName: "confirmTransaction",
      workflowCompleteFlag: 0,
      workflowErrorCode: "",
      walletAddress: account,
    });
  };
  const sc_input_data = web3.eth.abi.encodeFunctionCall(
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "buyTokensWert",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    [account as string]
  );
  const signedData = signSmartContractData(
    {
      address: account as string, // user's address
      commodity: "MATIC",
      network: "polygon",
      sc_address: "0xA728Aa2De568766E2Fa4544Ec7A77f79c0bf9F97",
      sc_input_data,
      commodity_amount: value,
    },
    privateKey
  );

  const options = {
    partner_id: "01GYWK6RTTBHQ5R99A1N30WE48",
    origin: "https://widget.wert.io",
    container_id: "widget-widget",
    click_id: clickId,
    autosize: true,
    ...theme,
    currency: "USD",
    listeners: {
      loaded: () => console.log("loaded"),
      "payment-status": async (data: {
        status: WertPaymentStatus;
        tx_id: string;
      }) => {
        if (data.status === "success") {
          try {
            onSuccess();
            const res = await markPayment({ clickId });
            pushTransactionSuccess(data?.tx_id || "");
            pushPlausible();
          } catch (e) {
            toast.error("Transaction failed.");
          }
        }
        if (data.status === "failed") {
          toast.error("Transaction failed.");
        }
        if (data.status === "pending") {
          pushClickConfirmButton();
        }
      },
    },
    ...signedData,
    // ...nftOptions,
  };

  useEffect(() => {
    (window as any).Buffer = Buffer;
  }, []);
  return <WertModule options={options}></WertModule>;
};

export default WertCardPayment;

// commodity: "BTC",
// network: "testnet",
// address: "0x2ff0ec69341f43cc462251bd49bb63681adafcb0",
// commodities: JSON.stringify([
//   {
//     commodity: "BTC",
//     network: "testnet",
//   },
//   {
//     commodity: "ETH",
//     network: "goerli",
//   },
//   {
//     commodity: "MATIC",
//     network: "mumbai",
//   },
//   {
//     commodity: "TTG",
//     network: "georli",
//   },
//   {
//     commodity: "TT",
//     network: "mumbai",
//   },
//   {
//     commodity: "XTZ",
//     network: "ghostnet",
//   },
//   {
//     commodity: "CCD",
//     network: "testnet",
//   },
// ]),
