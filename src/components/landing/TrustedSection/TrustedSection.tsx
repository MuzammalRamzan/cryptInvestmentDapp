import { useAppStore } from "@/store";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const TrustedSection = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="main-container">
        <h2
          className="font-bold text-left text-3xl md:text-4xl lg:text-5xl text-darkText dark:text-white"
          style={{ lineHeight: "120%" }}
        >
          {t("Trusted & Backed by VCs and Pro traders for a reason")}
        </h2>
        <div
          className={
            "mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 xl:gap-14 text-red-400"
          }
        >
          <FrameCard
            title="Exclusive Insights"
            description="Alternate data only available to institutional traders"
            count={1}
            icon={
              theme === "dark"
                ? "/img/icon/exclusive-insight.png"
                : "/img/icon/exclusive-insight.svg"
            }
          />
          <FrameCard
            title="Massive Data Training"
            description="Model Trained on billions of data points"
            count={2}
            icon={
              theme === "dark"
                ? "/img/icon/data-training.png"
                : "/img/icon/data-training.svg"
            }
          />
          <FrameCard
            title="Coin Predictions"
            description="AI predictions by top 1% experts for your favourite coins"
            count={3}
            icon={
              theme === "dark"
                ? "/img/icon/coin-predictions.png"
                : "/img/icon/coin-predictions.svg"
            }
          />
          <FrameCard
            title="Asset Analytics"
            description="Transactional data analytics for thousands of digital assets"
            count={4}
            icon={
              theme === "dark"
                ? "/img/icon/combo-chart.png"
                : "/img/icon/combo-chart.svg"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;

interface FrameCardProps {
  count: number;
  icon: string;
  title: string;
  description: string;
}
const FrameCard: React.FC<FrameCardProps> = ({
  icon,
  title,
  description,
  count,
}) => {
  const { theme } = useAppStore();
  const t = useTranslations("Landing");
  return (
    <div className="relative">
      <Image
        src={theme === "dark" ? "/img/frame.webp" : "/img/frame-light.webp"}
        height={100}
        width={100}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          objectFit: "fill",
          zIndex: "-1",
        }}
        alt="Image Frame"
      />
      <Image
        src={icon}
        height={50}
        width={50}
        alt="Rocket"
        className="absolute top-16 right-12"
      />
      <div className={clsx("px-6 md:px-8 lg:px-10 py-12 lg:py-14 xl:py-16")}>
        <div
          className="h-20 w-20 md:h-24 md:w-24 bg-no-repeat bg-contain flex items-center justify-center text-center text-white text-4xl font-bold"
          style={{ backgroundImage: "url(/img/icon/curve-bg.png)" }}
        >
          {count}
        </div>
        <h3 className="mt-4 md:mt-5 xl:mt-6 text-darkText dark:text-white font-medium text-2xl lg:text-3xl leading-130">
          {t(title)}
        </h3>
        <p className="text-darkText dark:text-white mt-4 md:mt-5 lg:mt-6 text-base md:text-lg lg:text-xl opacity-80 leading-160">
          {t(description)}
        </p>
      </div>
    </div>
  );
};
