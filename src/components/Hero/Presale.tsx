import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { BigNumber, ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import {
  YPredictPreSale_ABI,
  YPredictPreSale_address,
} from "../../config/Mainnet/YPredictPreSale";
import useDisclosure from "@/hooks/useDisclosure";
import ModalAllocationStatus from "../ModalAllocationStatus";
import BuyButtons from "../BuyButtons";
import { Icon } from "@iconify/react";
import WalletConnectKit from "../WalletConnectKit";
import useContract from "@/hooks/useContract";
import { useAppStore } from "@/store";
import { CURRENCY_TYPE } from "@/@types/enum";
import {
  currencyDarkImageMapper,
  currencyImageMapper,
} from "../BuyButtons/BuyButtons";
import WertCardPayment from "../WertCardPayment";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  approveUSDT,
  buyWithBSC,
  buyWithEthereum,
  buyWithMatic,
  buyWithUSDT,
} from "@/utils/buyWithCrypto";
import useCreateOrder from "@/hooks/useCreateOrder";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getCountry } from "@/utils/getCountry";
import useCheckTransactionStatus from "@/hooks/useCheckTransactionStatus";
import {
  chainIdToChainMapper,
  currencyToChainMapper,
} from "@/utils/currencyChainMapper";
import useGetOrders from "@/hooks/useGetOrders";
import useGetRound from "@/hooks/useGetRound";
import useCreateOrderFinixio from "@/hooks/useCreateOrderFInixio";
import useGetFinixioAffiliate from "@/hooks/useGetFinixioAffiliate";
import { getPreviousTotal } from "@/utils/getRaisedTarget";
import ModalThankyou from "../ModalThankyou";
import Checkbox from "../Checkbox";
import CountdownTimer from "../CountdownTimer";
import ModalClaimInfo from "../ModalClaimInfo";
import { tokenAddress } from "@/config/contract-config";
import { addTokenInMetamask } from "@/utils/addTokenInMetamask";
import ModalTokenAllocationInfo from "../ModalTokenAllocationInfo";
const Presale = () => {
  const router = useRouter();

  const { theme } = useAppStore();
  const copyAffiliateLink = (text: string) => {
    // if (!text) return;
    navigator.clipboard.writeText(`${text}`);
    toast.dismiss();
    toast.success("Your referrel link has been successfully copied.");
  };
  const t = useTranslations("Landing");
  const { isOpen: isShowingBonusMessage, onOpen: showBonusMessage } =
    useDisclosure();
  const {
    isOpen: isOpenClaimInfo,
    onClose: onCloseClaimInfo,
    onOpen: onOpenClaimInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenModalTokenAllocationInfoOpen,
    onClose: onCloseModalTokenAllocationInfoOpen,
    onOpen: onOpenModalTokenAllocationInfoOpen,
  } = useDisclosure();
  const { round, isLoadingRound } = useGetRound();
  const { createOrder } = useCreateOrder();
  const { createOrderFinixio } = useCreateOrderFinixio();
  const { getFinixioAffiliate, affiliate } = useGetFinixioAffiliate();
  const { orders, fetchOrders, isLoading } = useGetOrders();
  const { checkTransaction } = useCheckTransactionStatus();
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);
  const [isConversion, setIsConversion] = useState<boolean>(false);
  const closeThankyouModal = () => setIsConversion(false);
  const {
    isOpen: isCheckAllocatioOpen,
    onClose: onCheckAllocationClose,
    onOpen: onCheckAllocationOpen,
  } = useDisclosure();
  const [switchedCurrency, setSwitchedCurrency] =
    useState<keyof typeof CURRENCY_TYPE>("eth");
  const [paidYpred, setPaidYpred] = useState<number>(0);
  const [currency, setCurrency] = useState<keyof typeof CURRENCY_TYPE>("eth");
  const [inputState, setInputState] = useState<number>(0);
  const [pricesPerUnit, setPricesPerUnit] = useState<IPrices>({
    eth: 0,
    bsc: 0,
    polygon: 0,
  });
  // const { createConversion } = useImprovelyConversion();
  const [vestingContractTarget] = React.useState(2072000);
  const [tokenAmountByUSDT, setTokenAmount_By_USDT] = useState(0);
  const [ypredAmount, setYpredAmount] = useState<number>(0);
  const [isCheckedYpredAnalytics, setisCheckedYpredAnalytics] =
    useState<boolean>(false);
  const [
    vestingContract_All_SoldedToken,
    setVestingContract_All_SoldedToken_USDT,
    //@ts-ignore
  ] = React.useState<number>(null);
  const [vestingContractAlreadyInvested, setVestingContractAlreadyInvested] =
    React.useState<number>(1092062);
  const [QRPaymentType, setQRPaymentType] = React.useState("");

  const [error, setError] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "error",
  });
  const onClickAnyBuyButton = () => {
    //@ts-ignore
    window.coinzilla_performance = window.coinzilla_performance || [];
    //@ts-ignore
    coinzilla_performance.push({ event: "register" });
  };
  const pushPlausible = () => {
    (window as any).plausible("sale-final", {
      revenue: { currency: "USD", amount: Number(ypredAmount) * round.price },
    });
  };
  const copyTokenAddress = () => {
    navigator.clipboard.writeText(`${tokenAddress}`);
    toast.dismiss();
    toast.success("Token address copied.");
  };
  const getEquivalentYPred = (inputValue: number) => {
    if (switchedCurrency === "usdt" || switchedCurrency === "card") {
      setYpredAmount(Math.floor(Number(inputValue) / round.price));
    } else if (switchedCurrency === "eth") {
      setYpredAmount(
        Math.floor((Number(pricesPerUnit.eth) / round.price) * inputValue)
      );
    } else if (switchedCurrency === "matic") {
      setYpredAmount(
        Math.floor((Number(pricesPerUnit.polygon) / round.price) * inputValue)
      );
    } else if (switchedCurrency === "bnb") {
      setYpredAmount(
        Math.floor((Number(pricesPerUnit.bsc) / round.price) * inputValue)
      );
    }
  };

  const handleChangeYpredAnalytics = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setisCheckedYpredAnalytics(e.target.checked);

    if (switchedCurrency === "usdt" || switchedCurrency === "card") {
      return setInputState((inputState) =>
        e.target.checked ? +inputState + 500 : +inputState - 500
      );
    } else if (switchedCurrency === "bnb") {
      const bnbEquivalentTo_500USDT =
        Math.floor((500 / pricesPerUnit.bsc) * 100) / 100;
      return setInputState(
        (inputState) =>
          Math.ceil(
            (e.target.checked
              ? +inputState + +bnbEquivalentTo_500USDT
              : +inputState - +bnbEquivalentTo_500USDT) * 100
          ) / 100
      );
    } else if (switchedCurrency === "eth") {
      const ethEquivalentTo_500USDT =
        Math.floor((500 / pricesPerUnit.eth) * 100) / 100;
      return setInputState(
        (inputState) =>
          Math.ceil(
            (e.target.checked
              ? +inputState + +ethEquivalentTo_500USDT
              : +inputState - +ethEquivalentTo_500USDT) * 100
          ) / 100
      );
    } else if (switchedCurrency === "matic") {
      const maticEquivalentTo_500USDT =
        Math.floor((500 / pricesPerUnit.polygon) * 100) / 100;
      return setInputState(
        (inputState) =>
          Math.ceil(
            (e.target.checked
              ? +inputState + +maticEquivalentTo_500USDT
              : +inputState - +maticEquivalentTo_500USDT) * 100
          ) / 100
      );
    }
  };
  useEffect(() => {
    getEquivalentYPred(inputState);
  }, [inputState, switchedCurrency]);

  const getAllSoldedToken = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com"
    );
    const contract = new ethers.Contract(
      YPredictPreSale_address,
      YPredictPreSale_ABI,
      provider
    );

    const tokenSold_BigNumber = await contract.s_tokenSold();
    const tokenSold = BigNumber.from(tokenSold_BigNumber.toString())
      .div(BigNumber.from("1000000000000000000"))
      .toNumber();
    const pricePerToken_BigNumber = await contract.s_usdtPrice();

    const pricePerToken = (
      parseFloat("1") /
      (parseFloat("1000000") / parseFloat(pricePerToken_BigNumber.toString()))
    ).toFixed(3);

    const allSoldedToken_USD_without_decimals = (
      parseFloat(tokenSold.toString()) * parseFloat(pricePerToken.toString())
    ).toFixed(0);

    setVestingContract_All_SoldedToken_USDT(
      Number(allSoldedToken_USD_without_decimals)
    );
  };

  useEffect(() => {
    getAllSoldedToken();
  }, []);
  //@ts-ignore
  const handleInputState = (e) => {
    let value = Number(e.target.value || 0);
    let valueEquivalentTo_500USD = 0;
    if (switchedCurrency === "usdt" || switchedCurrency === "card") {
      valueEquivalentTo_500USD = 500;
    } else if (switchedCurrency === "bnb") {
      valueEquivalentTo_500USD =
        Math.ceil((500 / pricesPerUnit.bsc) * 100) / 100;
    } else if (switchedCurrency === "eth") {
      valueEquivalentTo_500USD =
        Math.ceil((500 / pricesPerUnit.eth) * 100) / 100;
    } else if (switchedCurrency === "matic") {
      valueEquivalentTo_500USD =
        Math.ceil((500 / pricesPerUnit.polygon) * 100) / 100;
    }
    if (value >= valueEquivalentTo_500USD) {
      setisCheckedYpredAnalytics(true);
    } else {
      setisCheckedYpredAnalytics(false);
    }

    if (e.target.value && (e.target.value > 50000 || e.target.value < 0))
      return;

    if (e.target.value && !/^[0-9]\d*(\.\d+)?$/g.test(e.target.value)) return;
    setInputState(e.target.value);
  };
  const bonusTokenLabel = useMemo(() => {
    const amount = Number(inputState);
    if (amount >= 250 && amount <= 500) {
      const bonusToken = Number(tokenAmountByUSDT) * 0.02;
      return `2% bonus YPREDs (${Number(bonusToken.toFixed(2))} YPRED)`;
    } else if (amount > 500 && amount <= 2500) {
      const bonusToken = Number(tokenAmountByUSDT) * 0.03;
      return `3% bonus YPREDs (${Number(bonusToken.toFixed(2))} YPRED)`;
    } else if (amount > 2500 && amount <= 5000) {
      const bonusToken = Number(tokenAmountByUSDT) * 0.04;
      return `4% bonus YPREDs (${Number(bonusToken.toFixed(2))} YPRED)`;
    } else if (amount > 5000 && amount <= 15000) {
      const bonusToken = Number(tokenAmountByUSDT) * 0.05;
      return `5% bonus YPREDs (${Number(bonusToken.toFixed(2))} YPRED)`;
    } else {
      return "Sorry, No bonus";
    }
  }, [inputState, tokenAmountByUSDT]);

  const fetchUnitPrices = () => {
    let blockchains = ["eth", "polygon", "bsc"];
    Promise.all(
      blockchains.map((blockchain) =>
        fetch(
          `https://rpc.ankr.com/multichain/ca9a40e30bc6647008af1d7f01d6b51afb0619254c90e9d7c29736d19c48afe7`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "ankr_getTokenPrice",
              params: {
                blockchain,
              },
              id: 1,
            }),
          }
        )
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data: Array<any>) => {
        data.forEach((item: any, index: number) => {
          if (item.result && item.result?.usdPrice) {
            const price = Number(item.result?.usdPrice);
            setPricesPerUnit((prevState) => ({
              ...prevState,
              [blockchains[index]]: price,
            }));
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const { account, isBuyingWithCard, setIsBuyingWithCard } = useAppStore();

  const pushTransactionSuccess = (transactionHash: string) => {
    console.log("%cSuccess", "color:green");
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "swap",
      workflowStepNumber: 3,
      workflowStepName: "swapSuccessful",
      workflowCompleteFlag: 1,
      workflowErrorCode: "",
      walletAddress: account?.toLowerCase(),
      transactionId: transactionHash,
      swapFromCurrency: currency,
      swapFromValue: inputState,
      swapToCurrency: "$YPRED",
      swapToValue: ypredAmount,
    });
  };
  const checkTransactionStatus = (data: Record<string, any>) => {
    const interval = setInterval(() => {
      checkTransaction(data)
        .then(async (res) => {
          if (res.success) {
            pushTransactionSuccess(data.txnHash);
            clearInterval(interval);
            fetchOrders({ from: account?.toLowerCase() });
            setIsLoadingBalance(false);
            setIsConversion(true);
            pushPlausible();
            // await createConversion({
            //   key: process.env.NEXT_PUBLIC_IMPROVELY_CONVERSION_API_KEY,
            //   project: process.env.NEXT_PUBLIC_IMPROVELY_CONVERSION_PROJECT_ID,
            //   revenue: ypredAmount * round.price,
            //   goal: "sale",
            //   reference: "1160",
            // });

            await createOrderFinixio({
              walletAddress: account?.toLowerCase(),
              purchaseTokens: Math.floor(
                (Number(pricesPerUnit.polygon) / round.price) * inputState
              ),
              purchaseType: currency,
              purchaseTypeAmount: inputState,
              purchaseUsdAmount:
                Math.floor(
                  (Number(pricesPerUnit.polygon) / round.price) * inputState
                ) * round.price,
              clickId: router.query?.clickId || null,
              iid: process.env.NEXT_PUBLIC_FINIXIO_ID,
              event: "conversion",
              source: router.query?.utm_source || null,
            });
          }
        })
        .catch((e) => console.log(e));
    }, 5000);
  };
  const pushClickSwapButton = () => {
    console.log("%cSwap", "color:orange");
    (window as any)?.dataLayer.push({
      event: "workflowStep",
      workflowName: "swap",
      workflowStepNumber: 1,
      workflowStepName: "swapAmount",
      workflowCompleteFlag: 0,
      workflowErrorCode: "",
      walletAddress: account,
    });
  };
  const pushClickConfirmButton = () => {
    console.log("%cConfirm", "color:orange");
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
  const getEquivalentInputState = (ypredAmount: number | string) => {
    const ypredValue = Number(ypredAmount);
    let valueEquivalent = 0;
    if (currency === "usdt" || currency === "card") {
      valueEquivalent = (round.price * ypredValue * 100) / 100;
    } else if (currency === "bnb") {
      valueEquivalent =
        (ypredValue * (round.price / pricesPerUnit.bsc) * 100) / 100;
    } else if (currency === "matic") {
      valueEquivalent =
        (ypredValue * (round.price / pricesPerUnit.polygon) * 100) / 100;
    } else if (currency === "eth") {
      valueEquivalent =
        (ypredValue * (round.price / pricesPerUnit.eth) * 100) / 100;
    }
    return valueEquivalent;
  };
  const getSourceCampaignCountry = () => {
    const campaign = (router.query?.utm_campaign || "") as string;
    const source = (router.query?.utm_source || "") as string;
    const country = getCountry();
    return { campaign, source, country };
  };

  const handleError = (e: any) => {
    if (e && (e.code === "ACTION_REJECTED" || e.code === 4001)) {
      return setError({
        ...error,
        show: true,
        message: "You have rejected the transaction.",
        type: "error",
      });
    }
    if (
      e &&
      (e.code === "INSUFFICIENT_FUNDS" ||
        (e.error && e.error.code === -32000) ||
        (e.data && e.data.code === -32000))
    ) {
      return setError({
        ...error,
        show: true,
        message: "Insufficient funds in your wallet",
        type: "error",
      });
    }
  };
  const handleBuyWithMatic = async () => {
    const others = getSourceCampaignCountry();
    try {
      const equivalentInputAmount =
        currency === switchedCurrency
          ? inputState
          : (1 / pricesPerUnit.polygon) * inputState;
      const purchaseUSDAmount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.polygon) * Number(inputState)
          : Number(inputState);
      const clickId = uuidv4();
      sessionStorage.setItem("clickId", clickId);
      const response = await createOrder({
        value: equivalentInputAmount,
        clickId,
        fromAddress: account?.toLowerCase(),
        ypred: Number(ypredAmount),
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        fx_clickId: router.query?.clickId || null,
        purchaseUSDAmount,
        ...others,
      });
      const tx: ITransaction = await buyWithMatic(equivalentInputAmount);
      setIsLoadingBalance(true);
      pushClickConfirmButton();
      const {
        data: { fromAddress, value },
      } = response;
      checkTransactionStatus({
        value: +value,
        clickId,
        fromAddress,
        txnHash: tx.hash,
      });
    } catch (e: any) {
      handleError(e);
    } finally {
      toast.dismiss();
      setIsBuying(false);
    }
  };

  const handleBuyWithEthereum = async () => {
    const others = getSourceCampaignCountry();

    try {
      const equivalentInputAmount =
        currency === switchedCurrency
          ? inputState
          : (1 / pricesPerUnit.eth) * inputState;
      const purchaseUSDAmount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.eth) * Number(inputState)
          : Number(inputState);
      const clickId = uuidv4();
      sessionStorage.setItem("clickId", clickId);
      const response = await createOrder({
        value: equivalentInputAmount,
        clickId,
        fromAddress: account?.toLowerCase(),
        ypred: Number(ypredAmount),
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        purchaseUSDAmount,
        fx_clickId: router.query?.clickId || null,
        ...others,
      });
      const tx: ITransaction = await buyWithEthereum(equivalentInputAmount);
      pushClickConfirmButton();
      toast.dismiss();
      toast.success("Your transaction has been successfully confirmed.");
      setIsLoadingBalance(true);
      const {
        data: { fromAddress, value },
      } = response;
      checkTransactionStatus({
        value: +value,
        clickId,
        fromAddress,
        txnHash: tx.hash,
      });
    } catch (e: any) {
      handleError(e);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  };
  const handleBuyWithBSC = async () => {
    setIsBuying(true);
    const others = getSourceCampaignCountry();
    try {
      const equivalentInputAmount =
        currency === switchedCurrency
          ? inputState
          : (1 / pricesPerUnit.bsc) * inputState;
      const purchaseUSDAmount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.bsc) * Number(inputState)
          : Number(inputState);
      const clickId = uuidv4();
      sessionStorage.setItem("clickId", clickId);
      const response = await createOrder({
        value: equivalentInputAmount,
        clickId,
        fromAddress: account?.toLowerCase(),
        ypred: Number(ypredAmount),
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        purchaseUSDAmount,
        fx_clickId: router.query?.clickId || null,
        ...others,
      });
      const tx: ITransaction = await buyWithBSC(equivalentInputAmount);
      pushClickConfirmButton();
      toast.dismiss();
      toast.success("Your transaction has been successfully confirmed.");
      setIsLoadingBalance(true);
      const {
        data: { fromAddress, value },
      } = response;
      checkTransactionStatus({
        value: +value,
        clickId,
        fromAddress,
        txnHash: tx.hash,
      });
    } catch (e: any) {
      handleError(e);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  };
  const handleBuyWithUSDT = async () => {
    const others = getSourceCampaignCountry();
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const network = await provider.getNetwork();
    try {
      const clickId = uuidv4();
      sessionStorage.setItem("clickId", clickId);
      const response = await createOrder({
        value: Number(inputState),
        clickId,
        fromAddress: account?.toLowerCase(),
        ypred: Number(ypredAmount),
        currency: currency.toUpperCase(),
        chain: chainIdToChainMapper[network.chainId],
        purchaseUSDAmount: Number(inputState),
        fx_clickId: router.query?.clickId || null,
        ...others,
      });
      const approveTx: any = await approveUSDT(inputState);
      toast.dismiss();
      toast.loading("Wait for your transaction to be approved", {
        duration: Infinity,
      });
      await approveTx.wait();
      const tx: ITransaction = await buyWithUSDT(inputState);
      pushClickConfirmButton();
      toast.dismiss();
      toast.success("Your transaction has been successfully confirmed.");
      setIsConversion(true);
      setIsLoadingBalance(true);
      const {
        data: { fromAddress, value },
      } = response;
      checkTransactionStatus({
        value: +value,
        clickId,
        fromAddress,
        txnHash: tx.hash,
      });
    } catch (e) {
      handleError(e);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  };
  const handleBuyWithCard = async () => {
    const others = getSourceCampaignCountry();
    const clickId = uuidv4();
    sessionStorage.setItem("clickId", clickId);
    const response = await createOrder({
      value: Number(inputState),
      clickId,
      fromAddress: account?.toLowerCase(),
      ypred: Number(ypredAmount),
      currency: "USD",
      chain: "card",
      fx_clickId: router.query?.clickId || null,
      purchaseUSDAmount: Number(inputState),
      ...others,
    });
  };

  const handleBuy = async () => {
    const minYPred = 10 / round.price;
    if (ypredAmount < minYPred) {
      return setError({
        ...error,
        show: true,
        message: `The amount of tokens must be at least ${Number(
          minYPred
        ).toFixed(2)}`,
      });
    } else {
      setError({
        ...error,
        show: false,
        message: "",
      });
    }
    if (!(window as any).ethereum) {
      window.location.assign(`dapp://ypredict.ai`);
      return;
    }
    if (isBuying) return;
    setError({ ...error, show: false });
    if (currency !== "card") {
      setIsBuying(true);
    }
    if (currency === "card") {
      handleBuyWithCard();
      return setIsBuyingWithCard(true);
    } else if (currency === "matic") {
      return handleBuyWithMatic();
    } else if (currency === "usdt") {
      return handleBuyWithUSDT();
    } else if (currency === "eth") {
      return handleBuyWithEthereum();
    } else if (currency === "bnb") {
      return handleBuyWithBSC();
    }
  };
  const {
    getAllAllocatedTokens,
    setClaimedTokens,
    setAllocatedTokens,
    isCalculatingAll,
    allocatedTokens,
  } = useContract();

  const handleCardSuccess = async () => {
    try {
      const res = await createOrderFinixio({
        walletAddress: account?.toLowerCase(),
        purchaseTokens: ypredAmount,
        purchaseType: "matic",
        purchaseTypeAmount: inputState,
        purchaseUsdAmount: ypredAmount * round.price,
        clickId: router.query?.clickId || null,
        iid: process.env.NEXT_PUBLIC_FINIXIO_ID,
        event: "conversion",
        source: router.query?.source || null,
      });
    } catch (e) {}
  };
  useEffect(() => {
    fetchUnitPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QRPaymentType]);

  const fetchAllTokens = () => {
    if (account) {
      getAllAllocatedTokens(account);
    } else {
      setAllocatedTokens(null);
      setClaimedTokens("0.00");
    }
  };

  useEffect(() => {
    fetchAllTokens();
    if (account) {
      getFinixioAffiliate({
        walletAddress: account.toLowerCase(),
        iid: process.env.NEXT_PUBLIC_FINIXIO_ID,
      });
      fetchOrders({ from: account });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
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

  const bonusMessage = useMemo(() => {
    const value = Number(inputState);
    let valueEquivalentTo_500USD = 0;
    if (switchedCurrency === "usdt" || switchedCurrency === "card") {
      valueEquivalentTo_500USD = 500;
    } else if (switchedCurrency === "bnb") {
      valueEquivalentTo_500USD = ((500 / pricesPerUnit.bsc) * 100) / 100;
    } else if (switchedCurrency === "matic") {
      valueEquivalentTo_500USD = ((500 / pricesPerUnit.polygon) * 100) / 100;
    } else if (switchedCurrency === "eth") {
      valueEquivalentTo_500USD = ((500 / pricesPerUnit.eth) * 100) / 100;
    }
    if (value >= valueEquivalentTo_500USD) {
      setisCheckedYpredAnalytics(true);
      return t("Bonus included");
    } else {
      setisCheckedYpredAnalytics(false);
      return t("Add more to include bonus", {
        amount: `${Math.ceil((valueEquivalentTo_500USD - value) * 100) / 100} ${
          ["card", "usdt"].includes(switchedCurrency)
            ? "USD"
            : switchedCurrency.toUpperCase()
        }`,
      });
    }
  }, [inputState, pricesPerUnit, router.locale, switchedCurrency]);

  return (
    <>
      <ModalTokenAllocationInfo
        isOpen={isOpenModalTokenAllocationInfoOpen}
        onClose={onCloseModalTokenAllocationInfoOpen}
      />
      <ModalClaimInfo isOpen={isOpenClaimInfo} onClose={onCloseClaimInfo} />
      <ModalThankyou
        isOpen={isConversion}
        onClose={closeThankyouModal}
        revenue={ypredAmount * round.price}
      />
      <div
        className={clsx(
          "rounded-2xl overflow-hidden relative flex flex-col align-center mt-5 lg:mt-0 pb-8 gap-5 backdrop-blur-[32px]",
          isBuyingWithCard ? "bg-[#3d414e45]" : "bg-transparent"
        )}
      >
        {isBuyingWithCard ? (
          <WertCardPayment
            value={Number(
              Math.ceil((inputState / pricesPerUnit.polygon) * 1000) / 1000
            )}
            USDT={Number(ypredAmount) * round.price}
            inputUSD={inputState}
            ypredAmount={ypredAmount}
            onSuccess={handleCardSuccess}
          />
        ) : (
          <>
            <ModalAllocationStatus
              isOpen={isCheckAllocatioOpen}
              onClose={onCheckAllocationClose}
            />
            <div
              className={clsx(
                "rounded-2xl",
                theme === "dark"
                  ? "bg-transparent p-0"
                  : "p-[1px] overflow-hidden bg-gradient"
              )}
            >
              <div className="bg-white dark:bg-[#2f32417f] px-4 py-6 md:p-6 rounded-2xl">
                <div className="mb-3">
                  <CountdownTimer
                    deadline={
                      new Date(new Date().getFullYear(), 5, 19, 0, 0, 0)
                    }
                  />
                </div>
                <div className="top flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Image
                      width={6}
                      height={6}
                      src={"/img/icon/vaticalsape.png"}
                      alt="vaticalsape.png"
                    />
                    <div>
                      <h2 className="text-base md:text-lg lg:text-xl text-darkText dark:text-white">
                        <span className="font-medium">
                          {t("Presale Stage", { round: round.round })}
                        </span>
                        <span className="text-darkText dark:text-white font-extralight"></span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/img/icon/active.png"}
                      alt="active-icon"
                      width={10}
                      height={10}
                    />
                    <span className="text-darkText dark:text-white text-base md:text-lg">
                      {t("Open")}
                    </span>
                  </div>
                </div>
                <div className="prograssbar py-4">
                  <p className="text-darkText dark:text-white pb-2 text-center text-sm lg:text-lg font-light">
                    {t("Until next price", {
                      value: `$${round.next_price} (+${round.percent_increase}%)`,
                    })}
                  </p>
                  <div className="flex flex-col gap-y-2 items-center">
                    <div className="w-full bg-[#0d0d0d10] dark:bg-[#2e3141] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF] h-2 rounded-full"
                        style={{
                          width:
                            (
                              ((round.raised + getPreviousTotal(round.round)) *
                                100) /
                              (round.target + getPreviousTotal(round.round))
                            ).toString() + "%",
                          // (
                          //   (vestingContractAlreadyInvested * 100) /
                          //   vestingContractTarget
                          // ).toString() + "%",
                        }}
                      ></div>
                    </div>
                    <div className="text-darkText dark:text-white text-xs lg:text-base flex flex-column">
                      <span className="private-on text-success flex items-center gap-2 tracking-widest">
                        $
                        {!isLoadingRound ? (
                          Number(
                            round.raised + getPreviousTotal(round.round)
                          ).toLocaleString("en-US")
                        ) : (
                          <div className="flex space-x-1 animate-pulse ml-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        )}
                      </span>
                      <span>/</span>
                      <span className="private-total text-success fw-semibold tracking-widest">
                        {/* /${vestingContractTarget.toLocaleString("en-US")} */}
                        $
                        {Number(
                          round.target + getPreviousTotal(round.round)
                        ).toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  <div className="flex mt-12 flex-col gap-y-8 pb-6 border-b-2 border-dotted border-[#2e3141]">
                    <div className="flex gap-5  mx-4 sm:mx-10  justify-between">
                      <div>
                        <p className="text-darkText dark:text-white leading-[100%] text-sm text-left  font-extralight">
                          {t("Presale Price")}
                        </p>
                        <h2 className="mt-2 text-xl md:text-2xl font-bold text-darkText dark:text-white leading-[30px]">
                          ${round.price}
                        </h2>
                      </div>
                      <div>
                        <p className="text-darkText dark:text-white text-right leading-[100%] text-sm  font-extralight">
                          {t("Listing Price")}
                        </p>
                        <h2 className="mt-2 text-xl text-right md:text-2xl font-bold text-darkText dark:text-white leading-[30px]">
                          $0.12
                        </h2>
                      </div>
                    </div>
                  </div>
                  {error.show && (
                    <div className="flex mt-4 items-center gap-1 justify-center text-red-500">
                      <Icon
                        icon="material-symbols:cancel-outline-rounded"
                        fontSize={18}
                      />
                      <span>{error.message}</span>
                    </div>
                  )}
                  {account && (
                    <div className="flex justify-center mt-4">
                      <div className="w-full p-[1px] overflow-hidden bg-gradient-to-br from-[#6042ef] to-skin-pink rounded-md">
                        <div className="bg-white dark:bg-[#000000] p-4 rounded-md">
                          <div className="flex items-center gap-1 justify-center">
                            <h5 className="text-darkText dark:text-white text-sm font-medium flex w-fit items-center gap-1">
                              <button
                                className="w-5 h-fit"
                                disabled={isCalculatingAll}
                                onClick={() =>
                                  isCalculatingAll ? {} : fetchAllTokens()
                                }
                              >
                                <Icon
                                  icon={"material-symbols:rotate-right"}
                                  fontSize={18}
                                />
                              </button>
                              {t("My Wallet Balance")}
                            </h5>
                          </div>
                          <div className="font-bold text-2xl text-darkText dark:text-white flex items-center justify-center mt-2 gap-3">
                            {(isCalculatingAll ||
                              isLoading ||
                              isLoadingBalance) && (
                              <span className="w-5">
                                <Icon
                                  icon="svg-spinners:6-dots-rotate"
                                  fontSize={20}
                                  color="#f327f2"
                                />
                              </span>
                            )}
                            {!isCalculatingAll &&
                              !isLoading &&
                              !isLoadingBalance && (
                                <h5 className="font-bold text-2xl text-darkText dark:text-white">
                                  {Number(allocatedTokens) + paidYpred}{" "}
                                  <span className="text-sm font-medium">
                                    YPRED
                                  </span>
                                </h5>
                              )}
                            {!isCalculatingAll &&
                              !isLoading &&
                              !isLoadingBalance && (
                                <button className="z-20 relative inline-flex items-center justify-center p-[1px] overflow-hidden text-xs font-medium  rounded-md group bg-gradient-to-br from-[#6042ef] to-skin-pink">
                                  <div
                                    className={clsx(
                                      "relative w-full rounded-md px-2 md:px-3 lg:px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-[#161a24] text-darkText dark:text-white group-hover:bg-opacity-0"
                                    )}
                                    onClick={() => onOpenClaimInfo()}
                                  >
                                    <span className="text-darkText dark:text-white text-xs flex items-center gap-1 group-hover:text-white">
                                      Claim
                                    </span>
                                  </div>
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <h4 className="flex flex-row items-center gap-2 text-center text-[1rem] font-semibold leading-[30px] text-darkText dark:text-white before:h-[0.5px] before:w-auto before:flex-1 before:bg-gradient-to-r before:from-skin-pink  before:via-skin-pink  before:to-[#572bf7] before:inline-block before:align-middle after:h-[0.5px] after:w-auto after:bg-gradient-to-r after:from-[#572bf7]  after:via-skin-pink  after:to-skin-pink after:inline-block after:align-middle after:flex-1">
                      1 YPRED = ${round.price}
                    </h4>
                  </div>
                  <div className="mt-4">
                    <BuyButtons
                      currentCurrency={currency}
                      setCurrency={(val) => {
                        setisCheckedYpredAnalytics(val === currency);
                        setCurrency(val);
                        setSwitchedCurrency(val);
                        pushClickSwapButton();
                      }}
                    />
                  </div>
                  {/* Adding Amout  */}
                  <div className="flex my-6 items-center justify-center max-w-full sm:max-w-[80%] mx-auto ">
                    <div className="flex items-center gap-x-3 w-full">
                      <div className="flex flex-1 w-full bg-white dark:bg-[#2f32417f] rounded-full justify-between items-center p-0.5 pr-1.5 border border-skin-pink dark:border-[#ffffff26]">
                        <div className="flex w-fit items-center rounded-full gap-2">
                          {switchedCurrency !== "card" && (
                            <div
                              className={clsx(
                                "text-darkText dark:text-white w-[35px] min-w-[35px] h-[35px] p-1 cursor-pointer rounded-full flex items-center justify-center",
                                switchedCurrency === "usdt" &&
                                  "bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF] text-white"
                              )}
                              onClick={() => {
                                setSwitchedCurrency("usdt");
                                // switchedCurrency !== "usdt" &&
                                //   setisCheckedYpredAnalytics(false);
                              }}
                            >
                              $
                            </div>
                          )}
                          {currency !== "usdt" && (
                            <div
                              className={clsx(
                                "w-[35px] min-w-[35px] h-[35px] p-1 cursor-pointer rounded-full flex items-center justify-center",
                                switchedCurrency !== "usdt" &&
                                  "bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]"
                              )}
                              onClick={() => {
                                setSwitchedCurrency(currency);
                              }}
                            >
                              <Image
                                src={
                                  theme === "dark" ||
                                  switchedCurrency !== "usdt"
                                    ? currencyImageMapper[currency]
                                    : currencyDarkImageMapper[currency]
                                }
                                alt="dollar"
                                width={17}
                                height={17}
                              />
                            </div>
                          )}
                        </div>

                        <input
                          min={0}
                          max={50000}
                          maxLength={5}
                          type="number"
                          onClick={() =>
                            !isShowingBonusMessage && showBonusMessage()
                          }
                          value={inputState}
                          onWheel={(e: any) => {
                            e.target.blur();
                          }}
                          onChange={handleInputState}
                          className="bg-transparent flex-1 w-auto text-center z-20 block border-0 focus:outline-none text-darkText dark:text-white appearance-none"
                          placeholder="0"
                        />
                        <Image
                          src={"/img/icon/tarif.svg"}
                          alt="dollar"
                          width={28}
                          height={28}
                        />
                      </div>
                      <h2 className="text-[1.3em] font-bold text-transparent leading-[30px] bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                        {ypredAmount}
                      </h2>
                    </div>
                  </div>
                  {isShowingBonusMessage && (
                    <div className="mt-3 mb-4">
                      <p className="mb-3 text-sm text-darkText dark:text-white flex items-center gap-2 justify-center">
                        <span className="text-skin-pink text-xl">
                          <Icon icon="mdi:gift" />
                        </span>{" "}
                        {bonusMessage}
                      </p>
                      <Checkbox
                        checked={isCheckedYpredAnalytics}
                        onChange={handleChangeYpredAnalytics}
                        label="Life time access to yPredict Analytics"
                      />
                    </div>
                  )}
                  <div className="max-w-full sm:max-w-[295px] flex flex-col mx-auto gap-3">
                    {account && (
                      <button
                        onClick={handleBuy}
                        disabled={isBuying}
                        className="z-20 relative w-full h-11 inline-flex items-center overflow-hidden text-xs font-medium group gap-2 justify-center bg-gradient rounded-full text-white hover:scale-[99.5%]"
                      >
                        {isBuying ? (
                          <Icon
                            icon="svg-spinners:6-dots-rotate"
                            fontSize={20}
                          />
                        ) : (
                          <span className="text-sm">{t("Buy now")}</span>
                        )}
                      </button>
                    )}
                    <WalletConnectKit
                      callbackOpen={() => onOpenModalTokenAllocationInfoOpen()}
                      callbackClose={() =>
                        onCloseModalTokenAllocationInfoOpen()
                      }
                    />
                    {!!affiliate && (
                      <div className="flex justify-center mt-4">
                        <button
                          className="h-fit text-skin-pink text-sm font-medium flex w-fit items-center gap-1 cursor-pointer hover-text-darkText dark:hover:text-white"
                          onClick={() => copyAffiliateLink(affiliate)}
                        >
                          <Icon
                            icon={"material-symbols:rotate-right"}
                            fontSize={18}
                          />
                          5% Referrrel link
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-4 md:gap-6">
                    <span
                      className="text-sm text-darkText dark:text-white"
                      title={tokenAddress}
                    >
                      {`[${tokenAddress.slice(0, 10)}...${tokenAddress.slice(
                        -4
                      )}]`}
                      {/* {tokenAddress} */}
                    </span>
                    <button
                      onClick={() => addTokenInMetamask()}
                      className="z-20 relative inline-flex items-center justify-center p-[1px] overflow-hidden text-xs font-medium  rounded-md group bg-gradient-to-br from-[#6042ef] to-skin-pink"
                    >
                      <div
                        className={clsx(
                          "relative w-full rounded-md px-2 md:px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-[#161a24] text-white group-hover:bg-opacity-0"
                        )}
                      >
                        <span className="text-darkText dark:text-white text-xs flex items-center gap-1">
                          <Icon fontSize={16} icon="logos:metamask-icon" />
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => copyTokenAddress()}
                      className="z-20 relative inline-flex items-center justify-center p-[1px] overflow-hidden text-xs font-medium  rounded-md group bg-gradient-to-br from-[#6042ef] to-skin-pink"
                    >
                      <div
                        className={clsx(
                          "relative w-full rounded-md px-2 md:px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-[#161a24] text-darkText dark:text-white group-hover:bg-opacity-0"
                        )}
                      >
                        <Icon fontSize={16} icon="ion:copy-outline" />
                      </div>
                    </button>
                  </div>
                  <div className="mt-6 flex items-center justify-center text-yellow-600 dark:text-yellow-200 gap-2">
                    <Icon icon="octicon:alert-24" fontSize={14} />
                    <span className="text-xs">
                      {t("Do not pay directly to this address")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isBuyingWithCard ? (
          <div className="flex justify-center">
            <button
              className="underline text-white z-20 hover:text-skin-pink text-base font-normal"
              onClick={() => setIsBuyingWithCard(false)}
            >
              {t("Cancel Transaction")}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Presale;
