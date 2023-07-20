import GradientBorderBox from "@/components/global/GradientBorderBox";
import PlatformPayment from "@/components/global/Icon/PlatformPayment";
import RecognitionAlgorithm from "@/components/global/Icon/RecognitionAlgorithm";
import StakingReward from "@/components/global/Icon/StakingReward";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface IInfoAccordion {
  id: number;
  icon: React.ReactElement;
  title: string;
  description: string;
}
const InfoAccordion = () => {
  const { theme } = useAppStore();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const t = useTranslations("Landing");
  const data: IInfoAccordion[] = [
    {
      id: 1,
      icon: <StakingReward />,
      description:
        "10% percent of each new subscription will be shared with YPRED holders through a staking pool The platform generates subscriptions on its marketplace, which includes AI signals offered through various models listed on the platform",
      title: "Unique Staking Rewards",
    },
    {
      id: 2,
      icon: <PlatformPayment />,
      description:
        "$YPRED works as a default & discounted payment option for marketplace subscription payments and all premium offerings on yPredict app",
      title: "Platform Payment in YPRED",
    },
    {
      id: 3,
      icon: <RecognitionAlgorithm />,
      description:
        "yPredict automatically identifies hundreds of bullish and bearish chart and candlestick patterns It generates real-time alerts when these patterns are formed, along with a reliability score based on the overall past accuracy of the expected price behavior after the pattern is formed",
      title: "Patent-Pending Pattern Recognition algorithm",
    },
  ];
  return (
    <div className="flex flex-col gap-6 w-full">
      {data.map((item, index) => (
        <GradientBorderBox key={item.id} roundedClass="rounded-xl">
          <div
            className={clsx(
              "p-3 md:p-4 lg:p-5",
              theme === "dark"
                ? "bg-darkBg"
                : activeIndex === index
                ? "bg-gradient"
                : "bg-white"
            )}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
            >
              <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
                <GradientBorderBox roundedClass="rounded-lg">
                  <div className="bg-white dark:bg-darkBg text-darkText dark:text-white h-14 w-14 flex items-center justify-center">
                    {item.icon}
                  </div>
                </GradientBorderBox>
                <h3
                  className={clsx(
                    "font-medium text-lg md:text-xl",
                    theme === "dark"
                      ? "text-white"
                      : activeIndex === index
                      ? "text-white"
                      : "text-darkText"
                  )}
                >
                  {t(item.title)}
                </h3>
              </div>
              <button
                className={clsx(
                  "border-none outline-none text-xl",
                  theme === "dark"
                    ? "text-white"
                    : activeIndex === index
                    ? "text-white"
                    : "text-darkText"
                )}
              >
                <Icon
                  icon={
                    activeIndex === index
                      ? "akar-icons:chevron-up"
                      : "akar-icons:chevron-down"
                  }
                />
              </button>
            </div>
            <p
              className={clsx(
                "text-base text-white opacity-80 duration-300 overflow-hidden ease-linear",
                activeIndex === index && "mt-3 md:mt-4 lg:mt-5"
              )}
              style={{
                lineHeight: "160%",
                height: index === activeIndex ? "fit-content" : "0",
              }}
            >
              {t(item.description)}
            </p>
          </div>
        </GradientBorderBox>
      ))}
    </div>
  );
};

export default InfoAccordion;
