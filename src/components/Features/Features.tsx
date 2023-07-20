import React from "react";
import Card from "./Card";
import { features } from "@/constant";
import VerticalImageSlider from "./SliderImges";
import gradientShape from "../../../public/img/icon/gradientShape.png";
import { useTranslations } from "next-intl";
import Patterns from "../Patterns/Patterns";
import Image from "next/image";
const Features = () => {
  const t = useTranslations("Landing");
  return (
    <section>
      <div className="grid gap-14 main-container h-full grid-cols-1 lg:grid-cols-2 mx-2 sm:mx-20">
        <div className="flex flex-col space-y-4">
          <Card items={features} />;
        </div>
        <div className="h-full overflow-hidden relative">
          <VerticalImageSlider />
        </div>
      </div>
      <div className="relative">
        <div className="grid main-container lg:mt-11 space-y-5 space-x-0 lg:space-x-7 my-10 grid-cols-1 lg:grid-cols-2 mt-20">
          <Patterns />
          <div className="bg-[#121621] mx-auto mt-16 p-4 rounded-3xl">
            <h2 className="text-[1.2em]  font-medium  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
              {t("Patent-Pending Pattern Recognition algorithm")}
            </h2>
            <p className="text-sm font-light text-[#fefefe]">
              {t(
                "yPredict automatically identifies hundreds of bullish and bearish chart and candlestick patterns It generates real-time alerts when these patterns are formed, along with a reliability score based on the overall past accuracy of the expected price behavior after the pattern is formed"
              )}
            </p>
          </div>
        </div>
        <div className="py-5 grid main-container space-x-7 my-10 grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col lg:flex-row space-x-5">
            <div>
              <Image
                alt="coin"
                src={"/img/features/coin.png"}
                width={280}
                height={100}
                className="max-w-[130px] mx-auto"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-[1.2em]  font-medium  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                {t("Unique Staking Rewards")}
              </h2>
              <p className="text-sm font-light leading-[1.5] text-[#fefefe]">
                {t(
                  "10% percent of each new subscription will be shared with YPRED holders through a staking pool The platform generates subscriptions on its marketplace, which includes AI signals offered through various models listed on the platform"
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-x-3">
            <div>
              <Image
                alt="scan"
                src={"/img/features/scan.png"}
                width={280}
                className="max-w-[130px] mx-auto"
                height={100}
              />
            </div>
            <div className="space-y-2 mt-3">
              <h2 className="text-[1.2em]  font-medium  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                {t("Platform Payment in YPRED")}
              </h2>
              <p className="text-sm font-light leading-[1.5] text-[#fefefe]">
                {t(
                  "$YPRED works as a default & discounted payment option for marketplace subscription payments and all premium offerings on yPredict app"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-[1%]">
          <Image
            alt="shape"
            className="max-h-[600px] max-w-[400px]"
            src={gradientShape}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
