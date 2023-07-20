import ModalInsufficientToken from "@/components/ModalInsufficientToken";
import ModalStripePayment from "@/components/ModalStripePayment";
import useCreateStripeOrder from "@/hooks/useCreateStripeOrder";
import useDisclosure from "@/hooks/useDisclosure";
import useLogSearchQuery from "@/hooks/useLogSearchQuery";
import usePredictBacklinkEstimation from "@/hooks/usePredictBacklinkEstimation";
import useSubscribeEmail from "@/hooks/useSubscribeEmail";
import { useAppStore } from "@/store";
import { initialResult } from "@/store/slice/backlinkCalulatorSlice";
import { Icon } from "@iconify/react";
import { PaymentIntent } from "@stripe/stripe-js";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../Input";

const BacklinkPredict = () => {
  const [view, setView] = useState<"keyword_url" | "email">("keyword_url");
  const {
    account,
    isAuthenticated,
    setResult,
    balance,
    profile,
    setRefetchQuery,
    setIsStripeModalOpen,
    isStripeModalOpen,
  } = useAppStore();
  const {
    isOpen: isLoading,
    onOpen: startLoading,
    onClose: stopLooading,
  } = useDisclosure();
  const {
    isOpen: isOpenInsufficientBalanceInfo,
    onClose: onCloseInsufficientBalanceInfo,
    onOpen: onOpenInsufficientBalanceInfo,
  } = useDisclosure();
  const t = useTranslations("BacklinkEstimator");
  const { subscribe } = useSubscribeEmail();
  const { createStripeOrder } = useCreateStripeOrder();
  const { logSearchQuery } = useLogSearchQuery();
  const [values, setValues] = useState<{
    keyword: string;
    url: string;
    email_address: string;
    progress: number;
  }>({
    keyword: "",
    url: "",
    email_address: "",
    progress: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const { keyword, url, email_address, progress } = values;

  const handleNew = () => {
    setValues({ ...values, progress: 0, keyword: "", url: "" });
    setView("keyword_url");
    setResult(initialResult);
  };
  const handleNext = () => {
    if (!keyword) return toast.error(t("Keyword is missing"));
    if (!url) return toast.error(t("Domain or url is missing"));
  };
  const processedWithWallet = async () => {
    if (!account)
      return toast.error(t("Please connect your wallet to processed"));
    setValues({
      ...values,
      progress: (100 / 3) * 2,
    });
    try {
      startLoading();
      await logSearchQuery({
        user_search_email: email_address,
        user_search_domain: url,
        user_search_keyword: keyword,
        wallet_address: account?.toLowerCase(),
        payment_status: "NA",
        ...(profile && ({ user_id: profile.id } as any)),
      });
      setRefetchQuery(true);
      // const data = await predictBacklink({
      //   url,
      //   q: keyword,
      //   gl: "US",
      //   volume: 80,
      //   difficulty: 80,
      // });
      // setResult({
      //   "averageDomainAuthorityForLink-1":
      //     data["averageDomainAuthorityForLink-1"],
      //   "averagePageAuthorityForLink-1": data["averagePageAuthorityForLink-1"],
      //   "backlinkCountForLink-1": data["backlinkCountForLink-1"],
      //   "uniqueDomainAuthorityForLink-1":
      //     data["uniqueDomainAuthorityForLink-1"],
      // });
      // setValues({ ...values, progress: 100 });
    } catch (e) {
      toast.error(
        t(
          "We're getting more queries than we can handle hence model is under high load, please try again later"
        )
      );
    } finally {
      stopLooading();
    }
  };
  const processedWithStripe = async () => {
    sessionStorage.removeItem("query_id");
    try {
      startLoading();
      await logSearchQuery({
        user_search_email: email_address,
        user_search_domain: url,
        user_search_keyword: keyword,
        ...(account && { wallet_address: account?.toLowerCase() }),
        payment_status: "PENDING",
        ...(profile && ({ user_id: profile.id } as any)),
      });
      sessionStorage.setItem("user_search_domain", url);
      sessionStorage.setItem("user_email", email_address);
      sessionStorage.setItem("user_search_keyword", keyword);
      setIsStripeModalOpen(true);
      setRefetchQuery(true);
    } catch (e) {
    } finally {
      stopLooading();
    }
  };
  const handleStripeSuccess = async (paymentIntent: PaymentIntent | any) => {
    setIsStripeModalOpen(false);
    startLoading();
    const query_id = sessionStorage.getItem("query_id");
    if (!query_id) {
      setValues({
        ...values,
        progress: 100 / 2,
      });
    }
    try {
      const stripePaymentObject = {
        ...paymentIntent,
        payment_id: paymentIntent.id,
        user_email: sessionStorage.getItem("user_email"),
        user_search_domain: sessionStorage.getItem("user_search_domain"),
        user_search_keyword: sessionStorage.getItem("user_search_keyword"),
        amount_capturable: paymentIntent.amount_capturable || 0,
        amount_received: paymentIntent.amount_received || 0,
        ...(profile && { user_id: profile.id }),
        ...(query_id && { query_id }),
      };
      const {
        amount_details,
        object,
        id,
        next_action,
        shipping,
        setup_future_usage,
        source,
        ...requiredObject
      } = stripePaymentObject;
      const res = await createStripeOrder(requiredObject);
      sessionStorage.removeItem("query_id");
      sessionStorage.removeItem("user_search_domain");
      sessionStorage.removeItem("user_email");
      sessionStorage.removeItem("user_search_keyword");

      setRefetchQuery(true);
    } catch (e) {
      toast.error(
        t(
          "We're getting more queries than we can handle hence model is under high load, please try again later"
        )
      );
    } finally {
      stopLooading();
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) return toast.error("Please login first");
    if (isLoading || progress === 100) return;
    toast.dismiss();
    if (!keyword) return toast.error(t("Keyword is missing"));
    if (!url) return toast.error(t("Domain or url is missing"));
    if (!email_address) return toast.error("Email is missing");
    if (!email_address.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
      return toast.error("Invalid email");
    setResult(initialResult);
    subscribe({
      email_address,
      fields: {
        FirstName: url,
        LastName: keyword,
      },
      status: "SUBSCRIBED",
    });
    if (!account || balance < 5555) {
      processedWithStripe();
    } else if (balance >= 5555) {
      processedWithWallet();
    }
  };
  const renderButton = () => {
    if (!isAuthenticated) return <Button disabled>Login to continue</Button>;
    else if (progress === 100)
      return <Button onClick={() => handleNew()}>{t("Predict again")}</Button>;
    else if (view === "keyword_url" && email_address)
      return (
        <Button
          onClick={() => {
            handleSubmit();
          }}
          disabled={isLoading || !isAuthenticated}
        >
          {isLoading ? (
            <Icon icon="svg-spinners:bars-rotate-fade" fontSize={20} />
          ) : (
            t("Predict")
          )}
        </Button>
      );
    else if (!email_address && view === "keyword_url")
      return (
        <Button
          onClick={() => {
            handleNext();
            setView("email");
            setValues({ ...values, progress: 100 / 3 });
          }}
        >
          {t("Next")}
        </Button>
      );
    else if (view === "email")
      return (
        <Button
          onClick={() => {
            handleSubmit();
          }}
          disabled={isLoading || !isAuthenticated}
        >
          {isLoading ? (
            <Icon icon="svg-spinners:bars-rotate-fade" fontSize={20} />
          ) : (
            t("Predict")
          )}
        </Button>
      );
    return null;
  };

  useEffect(() => {
    if (profile) {
      setValues({
        ...values,
        email_address: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          profile?.email as string
        )
          ? profile.email
          : "",
      });
    }
  }, [profile]);

  return (
    <React.Fragment>
      <ModalStripePayment
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        onSuccess={handleStripeSuccess}
      />
      <ModalInsufficientToken
        isOpen={isOpenInsufficientBalanceInfo}
        onClose={onCloseInsufficientBalanceInfo}
      />

      <div>
        <div className="w-full h-[1.5px] bg-[#E8E8FF] relative mt-8">
          <div
            className="bg-skin-pink h-[3px] absolute left-0 top-1/2 -translate-y-1/2 duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="h-14 pt-4">
          {view !== "keyword_url" && (
            <button
              onClick={() => {
                setView("keyword_url");
                setValues({ ...values, progress: 0 });
              }}
              className="border-none outline-none flex items-center gap-1 text-darkText text-sm hover:text-skin-pink"
            >
              <Icon icon="ep:back" fontSize={14} /> <span>Go back</span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-6 md:gap-6 lg:flex-row lg:gap-7 items-start md:items-center justify-start md:justify-between">
          {view === "keyword_url" ? (
            <div className="flex-1 flex flex-col sm:flex-row gap-6 md:gap-6 lg:gap-7 w-full">
              <Input
                placeholder={t("Enter domain or URL")}
                value={url}
                name="url"
                onChange={handleChange}
                autoComplete="off"
                readOnly={progress === 100}
                disabled={progress === 100}
              />
              <Input
                placeholder={t("Keyword search")}
                name="keyword"
                value={keyword}
                onChange={handleChange}
                autoComplete="off"
                disabled={progress === 100}
                readOnly={progress === 100}
              />
            </div>
          ) : view === "email" ? (
            <Input
              placeholder={t("Enter email")}
              name="email_address"
              value={email_address}
              onChange={handleChange}
              autoComplete="off"
            />
          ) : null}
          <>{renderButton()}</>
        </div>
        <div className="flex items-center gap-5 font-normal text-[#93A1B1] text-base mt-3">
          {progress < Number(100 / 3) ? (
            <span>
              {t("For example")} :{"  "} ypredict.ai
            </span>
          ) : progress === Number(100 / 3) ? null : progress < 100 ? (
            <span>
              {t("Please be patient, response may take upto a minute or more")}
            </span>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BacklinkPredict;

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "outline-none border-none flex justify-center items-center rounded-md h-[52px] px-4 text-sm font-medium w-full md:w-[212px] hover:bg-gradient-to-r disabled:cursor-not-allowed",
        rest.disabled
          ? "bg-gray-200 text-gray-700"
          : "bg-gradient-to-r from-[#D03A9D] to-[#8540D5] hover:from-[#D03A9D] hover:to-[#D03A9D] text-white"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
