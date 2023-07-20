import React from "react";
import Presale from "./Presale";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Analytics from "../global/Icon/Analytics";
import AnalysisCard from "./AnalysisCard";
import SentimentAnalysis from "../global/Icon/SentimentAnalysis";
import TechnicalAnalysis from "../global/Icon/TechnicalAnalysis";
import { useAppStore } from "@/store";
const HeroSection: React.FC = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="relative">
      <div className="main-container pt-10 md:pt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="basis-[65%]">
            <div className="heading">
              <h1
                className="text-center lg:text-left text-3xl md:text-4xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]"
                style={{ lineHeight: "120%" }}
              >
                {t("YPRED, a token empowering world’s first")}
              </h1>
              <h2 className="text-center lg:text-left text-3xl md:text-5xl lg:text-6xl text-bold text-[#151515] dark:text-white mt-5 md:mt-8">
                {t("All-in-One AI Ecosystem")}
              </h2>
              <p className="text-lg text-[#151515] dark:text-white font-normal mt-4 md:mt-8 text-center lg:text-left">
                {t(
                  "Specifically Built for Developers, Traders, Quants and Analysts"
                )}
              </p>
              <div className="my-6 flex gap-6 items-center flex-col-reverse xl:flex-row">
                <div className="basis-[50%] flex flex-col gap-4">
                  <AnalysisCard
                    icon={<Analytics />}
                    title="AI Signals"
                    description="real-time trading signals from cutting edge predictive models by top 1% AI experts"
                  />
                  <AnalysisCard
                    icon={<SentimentAnalysis />}
                    title="Sentiment Analysis"
                    description="Real-time sentiment analysis on all popular crypto coins"
                  />
                  <AnalysisCard
                    icon={<TechnicalAnalysis />}
                    title="Technical Analysis by AI"
                    description="Let AI find the most effective indicators for your asset"
                  />
                  <AnalysisCard
                    icon={<Analytics />}
                    title="25+ Chart Pattern Recognition"
                    description="Let AI detect most promising chart patterns on your shortlisted coins"
                  />
                </div>
                <div className="basis-[50%]">
                  <Image
                    src="/img/ypredict-analysis.webp"
                    alt="yPredict Analytics"
                    height={300}
                    width={350}
                    style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                  />
                </div>
              </div>
              <p className="text-base text-darkText dark:text-white font-normal mt-10 max-w-full xl:max-w-[791px] text-center xl:text-left">
                {t(
                  "State-of-Art predictive models & data insights built by top 1% AI Developers & Quants enabling market participants to get an unbeatable edge in different industries including finance, health & human resource"
                )}
              </p>
            </div>
          </div>
          <div className="basis-full lg:basis-[35%] w-full max-w-[600px] mx-auto lg:mx-0 relative">
            <Presale />
            <div
              className="absolute -rotate-12 w-full h-3/5 top-0 z-[-1] right-[48px]"
              style={{
                background:
                  "linear-gradient(98.62deg, #FF387A -10.89%, #A63EBA 50.23%, #4845FF 125.56%)",
                opacity: theme === "dark" ? "15%" : "90%",
                borderRadius: "20px",
              }}
            ></div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 flex justify-between main-container mx-6 md:mx-10 lg:mx-20 px-0 md:px-10 lg:px-18 xl:px-40 gap-8 sm:gap-10 md:gap-20">
          <div>
            <h2 className="whitespace-nowrap text-2xl text-center sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              {t("100M")}
            </h2>
            <p className="text-sm md:text-base mt-3 text-darkText dark:text-white font-normal text-center">
              {t("Supply")}
            </p>
          </div>
          <div>
            <h2 className="whitespace-nowrap text-2xl text-center sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              ~6.5m
            </h2>
            <p className="text-sm md:text-base mt-3 text-darkText dark:text-white font-normal text-center">
              {t("Marketcap at listing (circulating)")}
            </p>
          </div>
          <div>
            <h2 className="whitespace-nowrap text-2xl text-center sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              20,000+
            </h2>
            <p className="text-sm md:text-base mt-3 text-darkText dark:text-white font-normal text-center">
              {t("Users on waiting list")}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="absolute right-0 top-[30%] md:top-[15%] -z-[1] ">
        <Image
          src={gradient}
          className="max-w-[200px] md:max-w-[400px] "
          alt="gradient"
        />
      </div> */}
    </section>
  );
};

export default HeroSection;
