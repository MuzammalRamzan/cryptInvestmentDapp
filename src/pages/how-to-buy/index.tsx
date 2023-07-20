import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileMenu from "@/components/Header/MobileMenu";
import Presale from "@/components/Hero/Presale";
import BuyInstructionCard from "@/components/how-to-buy/BuyInstructionCard";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import React from "react";

const HowToBuyPage = () => {
  const t = useTranslations("HowToBuy");
  return (
    <>
      <Head>
        <title>yPredict.ai Presale</title>
        <meta
          name="description"
          content="An innovative AI-powered platform that provides accurate predictive analytics for businesses of all sizes. Our powerful algorithms and intuitive interface allow you to make data-driven decisions and stay ahead of the competition."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      <MobileMenu />
      <main className={clsx("min-h-screen pb-10 md:pb-16 lg:pb-20")}>
        <div className="main-container pt-10 md:pt-12">
          <h1 className="text-darkText dark:text-white text-bold text-3xl md:text-4xl lg:text-5xl">
            {t("How to buy YPRED")}
          </h1>
          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            <div className="basis-[65%]">
              <div className="relative">
                <div className="flex gap-5 lg:gap-6">
                  <div className="h-8 w-8 lg:h-10 lg:w-10 min-w-[32px] lg:min-w-[40px] rounded-full bg-gradient text-white text-lg lg:text-xl flex justify-center items-center">
                    1
                  </div>
                  <div className="pt-1">
                    <h2 className="text-skin-pink text-xl lg:text-2xl">
                      {t("Connect your wallet")}
                    </h2>
                    <div className="text-darkText dark:text-white mt-4">
                      <span>
                        <Icon icon="circum:mobile-3" fontSize={24} />
                      </span>
                      <h4 className="text-darkText dark:text-white text-xl mt-1">
                        {t("Mobile")}
                      </h4>
                      <p className="text-base text-gray-500 dark:text-gray-50 mt-1.5">
                        {t("mobileInstruction")}
                      </p>
                    </div>
                    <div className="text-darkText dark:text-white mt-4">
                      <span>
                        <Icon
                          icon="material-symbols:desktop-mac-outline"
                          fontSize={24}
                        />
                      </span>
                      <h4 className="text-darkText dark:text-white text-xl mt-1">
                        {t("Desktop")}
                      </h4>
                      <p className="text-base text-gray-500 dark:text-gray-50 mt-1.5">
                        {t("desktopInstruction")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 lg:gap-6 mt-10">
                  <div className="h-8 w-8 lg:h-10 lg:w-10 min-w-[32px] lg:min-w-[40px] rounded-full bg-gradient text-white text-lg lg:text-xl flex justify-center items-center">
                    2
                  </div>
                  <div className="pt-1">
                    <h2 className="text-skin-pink text-xl lg:text-2xl">
                      {t("Select payment method")}
                    </h2>
                    <div className="text-darkText dark:text-white mt-4">
                      <p className="text-base text-gray-500 dark:text-gray-50 mt-1.5">
                        {t("paymentMethodInstruction")}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-50 mt-1.5">
                        {t("followInstruction")}
                      </p>
                    </div>
                    <div className="text-darkText dark:text-white mt-5 grid xl:grid-cols-2 gap-6">
                      <BuyInstructionCard
                        title="Buy with ETH"
                        list={[
                          "Enter amount of currency / tokens",
                          'Press "Buy Now" button',
                          "Accept transaction in Metamask",
                        ]}
                      />
                      <BuyInstructionCard
                        title="Buy with BNB"
                        list={[
                          "Enter amount of currency / tokens",
                          'Press "Buy Now" button',
                          "Accept transaction in Metamask",
                        ]}
                      />
                      <BuyInstructionCard
                        title="Buy with MATIC"
                        list={[
                          "Enter amount of currency / tokens",
                          'Press "Buy Now" button',
                          "Accept transaction in Metamask",
                        ]}
                      />
                      <BuyInstructionCard
                        title="Buy with USDT"
                        list={[
                          "Enter amount of currency / tokens",
                          'Press "Buy Now" button',
                          'Check "Metamask" and "Use default" in custom spending cap',
                          'Click "Next" and "Approve"',
                          "Wait for confirmation",
                          'Click "Approve" again',
                        ]}
                      />
                      <BuyInstructionCard
                        title="Buy with credit card"
                        list={[
                          "Enter amount of currency / tokens",
                          'Press "Buy Now" button',
                          "Complete the step by step KYC process",
                          "Insert your Card information",
                          "Accept payment",
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 lg:gap-6 mt-10">
                  <div className="h-8 w-8 lg:h-10 lg:w-10 min-w-[32px] lg:min-w-[40px] rounded-full bg-gradient text-white text-lg lg:text-xl flex justify-center items-center">
                    3
                  </div>
                  <div className="pt-1">
                    <h2 className="text-skin-pink text-xl lg:text-2xl">
                      {t("Check your balance in dashboard")}
                    </h2>
                    <p className="text-base text-gray-500 dark:text-gray-50 mt-4">
                      {t(
                        'Once the transaction has been completed and confirmed, you "Connect Wallet" and check your current balance of tokens'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 lg:gap-6 mt-10">
                  <div className="h-8 w-8 lg:h-10 lg:w-10 min-w-[32px] lg:min-w-[40px] rounded-full bg-gradient text-white text-lg lg:text-xl flex justify-center items-center">
                    4
                  </div>
                  <div className="pt-1">
                    <h2 className="text-skin-pink text-xl lg:text-2xl">
                      {t("Claim")}
                    </h2>
                    <p className="text-base text-gray-500 dark:text-gray-50 mt-4">
                      {t(
                        'When the presale ends you will be able to connect your wallet and claim your tokens Click "Claim tokens" button and accept the transaction in Metamask'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-full lg:basis-[35%] self-start w-full max-w-[600px] mx-auto lg:mx-0 sticky top-0">
              <Presale />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HowToBuyPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      messages: (await import(`@/locales/${context.locale}.json`)).default,
    },
  };
};
