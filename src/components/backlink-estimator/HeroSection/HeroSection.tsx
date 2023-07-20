import WalletConnectKit from "@/components/WalletConnectKit";
import useContract from "@/hooks/useContract";
import useGetOrders from "@/hooks/useGetOrders";
import useUserRegister from "@/hooks/user/useUserRegister";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import { profile } from "console";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import BacklinkPredict from "../BacklinkPredict";
import LoginForm from "../LoginForm";
import QueryBillingTables from "../QueryBillingTables";
import RegisterForm from "../RegisterForm";
import ResultCard from "../ResultCard";

const HeroSection = () => {
  const {
    account,
    activeSection,
    isAuthenticated,
    result,
    setBalance,
    balance,
    profile,
    setIsAuthenticated,
    setProfile,
  } = useAppStore();
  const { register } = useUserRegister();
  const { orders, fetchOrders, isLoading: isLoadingOrders } = useGetOrders();
  const {
    getAllAllocatedTokens,
    setClaimedTokens,
    setAllocatedTokens,
    isCalculatingAll,
    allocatedTokens,
  } = useContract();
  const fetchAllTokens = () => {
    if (account) {
      getAllAllocatedTokens(account);
    } else {
      setAllocatedTokens(null);
      setClaimedTokens("0.00");
    }
  };
  const t = useTranslations("BacklinkEstimator");

  const registerUserWithWallet = async () => {
    try {
      const response = await register({
        wallet_address: account?.toLowerCase(),
      });
      const data = await response.json();
      if (data.response) {
        setIsAuthenticated(true);
        setProfile(data.response);
        localStorage.setItem("user", JSON.stringify(data.response));
        return;
      }
    } catch (e) {}
  };

  useEffect(() => {
    const paidYpreds =
      orders
        ?.filter(
          (order: OrderInterface) =>
            order.status === "PA" && !order.address?.startsWith("0x")
        )
        ?.reduce((acc: number, current: OrderInterface, index: number) => {
          return acc + +current.ypred;
        }, 0) || 0;
    setBalance(paidYpreds + Number(allocatedTokens));
  }, [orders, allocatedTokens]);

  useEffect(() => {
    if (account) {
      fetchAllTokens();
      fetchOrders({ from: account });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (account && !profile) {
      registerUserWithWallet();
    }
  }, [profile, account]);

  return (
    <>
      <section className="relative z-[2] before:absolute before:bg-[#040b28] before:top-0 before:left-0 before:right-0 before:h-[70%] before:z-[-1]">
        <div className="main-container py-16 md:py-24 ">
          <h1
            className="text-center text-white font-bold leading-[116%] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ lineHeight: "140%" }}
          >
            {t("An AI Powered Backlink Calculator")} <br />
            {t("to help you rank #1 on SERP")}
          </h1>
          <p className="max-w-[650px] text-base md:text-lg text-center mx-auto leading-[155%] text-[#B3C7BB] font-medium mt-5">
            {t(
              "yPredict Backlink Model is trained on over 100m links to predict exact backlink profile your URL needs to rank for desired keyword No more guess work, have a precise backlink strategy to rank in no time"
            )}
          </p>
          <p className="flex justify-center mt-2">
            <Link
              href="https://ypredict.ai/prediction/marketing/backlink-estimator/"
              target="_blank"
              className="text-skin-pink w-fit flex items-center gap-2"
            >
              {t("Read more")} <Icon icon="bi:box-arrow-up-right" />
            </Link>
          </p>
          <div className="max-w-[1009px] mx-auto mt-14 md:mt-16 lg:mt-20 bg-white rounded-[14px] px-6 py-6 md:py-8 md:px-8 lg:px-10 xl:px-12 shadow-md">
            <div className="flex justify-between gap-10 items-start md:items-end flex-col-reverse md:flex-row">
              <div className="max-w-full md:max-w-[350px]">
                <h2 className="text-[#161C28] text-2xl md:text-3xl font-semibold">
                  {t("Backlink Calculator")}
                </h2>
                <p className="text-[#93A1B1] font-normal leading-[140%] mt-4">
                  {t("Enter your URL and keyword and hit")} <br />
                  {t("Predict")}
                </p>
                <h3 className="text-sm text-[#333641] font-bold mt-7">
                  {t("Backlink Calculator")}
                </h3>
              </div>
              <div
                className="w-full md:w-[288px] rounded-md bg px-4 py-4 md:py-5 md:px-[18px] duration-150 border border-gray-50 shadow-sm"
                // style={{
                //   background:
                //     "linear-gradient(122deg, #D03A9D 19.83%, #8540D5 100%)",
                // }}
              >
                {account && (
                  <>
                    {!isCalculatingAll && !isLoadingOrders ? (
                      <h3 className="text-black font-semibold text-2xl md:text-3xl lg:text-4xl text-center">
                        {balance}{" "}
                        <span className="text-sm font-medium">YPRED</span>
                      </h3>
                    ) : (
                      <div className="flex justify-center pt-3 pb-2">
                        <span className="w-5">
                          <Icon
                            icon="svg-spinners:6-dots-rotate"
                            fontSize={20}
                            color="black"
                          />
                        </span>
                      </div>
                    )}
                  </>
                )}

                {account && (
                  <p className="text-xs text-black tracking-widest opacity-80 text-center font-normal mt-2">
                    {t("Your Available balance")}
                  </p>
                )}
                <div className="flex justify-center mt-4 flex-col">
                  {account && (
                    <Link
                      className="text-sm font-medium text-skin-pink underline text-center"
                      href="/"
                    >
                      {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D03A9D] to-[#8540D5]"> */}
                      {t("Buy YPREDs")}
                      {/* </span> */}
                    </Link>
                  )}
                  <WalletConnectKit
                    callbackOpen={() => {}}
                    callbackClose={() => {}}
                    showIcon={false}
                    className="bg-white text-[#D03A9D]"
                  />
                </div>
                <p className="text-[11px] text-black tracking-widest opacity-80 text-center font-normal mt-4">
                  {t(
                    "Get unlimited queries for free, just for holding minimum 5555 yPRED tokens"
                  )}
                </p>
              </div>
            </div>
            <BacklinkPredict />
            {!isAuthenticated && activeSection === "login" && <LoginForm />}
            {!isAuthenticated && activeSection === "register" && (
              <RegisterForm />
            )}
            {isAuthenticated && <QueryBillingTables />}
            <h3 className="mt-10 font-semibold text-[22px] leading-[1.4] text-[#161C28]">
              {t(
                "See number of links, domains and their required metrics to rank"
              )}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 lg:gap-20 mt-8">
              <ResultCard
                label={t("Backlink Count")}
                count={result["backlinkCountForLink-1"]!}
                isLoading={false}
                info={t("Number of backlinks you need to target to build")}
              />
              <ResultCard
                label={t("Avg Link Page Authority")}
                count={result["averagePageAuthorityForLink-1"]!}
                isLoading={false}
                info={t(
                  "Moz page authority that you should be targeting for each backlink"
                )}
              />
              <ResultCard
                label={t("Avg Domain Authority")}
                count={result["averageDomainAuthorityForLink-1"]!}
                isLoading={false}
                info={t(
                  "Moz domain authority of the domains you're getting links from"
                )}
              />
              <ResultCard
                label={t("Unique Domains Count")}
                count={result["uniqueDomainAuthorityForLink-1"]!}
                isLoading={false}
                info={t("Number of unique domains referring to your link")}
              />
            </div>
            <div className="mt-8 mb-4">
              <p className="font-normal text-[#93A1B1] text-base ">
                {t(
                  "yPredict Backlink model is currently free to use in the preview version"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
