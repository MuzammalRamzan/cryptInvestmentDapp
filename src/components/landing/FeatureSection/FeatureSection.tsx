import { useAppStore } from "@/store";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import styles from "./FeatureSection.module.css";
const FeatureSection = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="main-container">
        <h2
          className="font-bold text-center text-3xl md:text-4xl lg:text-5xl text-darkText dark:text-white max-w-[923px] mx-auto"
          style={{ lineHeight: "120%" }}
        >
          {t("Why buying YPRED tokens is")}{" "}
          {t('absolutely a "no-brainer" deal?')}
        </h2>
        <div className={clsx("mt-14", styles.grid)}>
          <div
            className={clsx(
              "bg-gradient",
              styles.grid__item,
              styles.grid__item__1
            )}
          >
            <Image
              src={
                theme === "dark"
                  ? "/img/icon/rocket.png"
                  : "/img/icon/rocket-dark.png"
              }
              height={50}
              width={50}
              alt="Rocket"
              className="absolute top-12 right-12"
            />
            <div
              className={clsx(
                styles.wrapper,
                "px-6 md:px-8 lg:px-10 py-12 lg:py-14 xl:py-16 bg-white dark:bg-darkBg h-full"
              )}
            >
              <div
                className="h-20 w-20 md:h-24 md:w-24 bg-no-repeat bg-contain flex items-center justify-center text-center text-white text-4xl font-bold"
                style={{ backgroundImage: "url(/img/icon/curve-bg.png)" }}
              >
                1
              </div>
              <h3 className="mt-5 md:mt-6 xl:mt-8 max-w-[292px] text-darkText dark:text-white font-medium text-2xl lg:text-3xl xl:text-4xl leading-130">
                {t("10-100x Potential")}
              </h3>
              <p className="text-darkText dark:text-white mt-5 md:mt-6 xl:mt-8 text-base md:text-lg lg:text-xl opacity-80 leading-160">
                {t(
                  "Similar projects with far inferior offerings share a token mc of 50-100m at bare minimum, where YPREDS are designed with only 6_5m MC at listing"
                )}
              </p>
            </div>
          </div>
          <div
            className={clsx(
              "bg-gradient",
              styles.grid__item,
              styles.grid__item__2
            )}
          >
            <div className={styles.wrapper}>
              <Image
                src={
                  theme === "dark"
                    ? "/img/icon/star.png"
                    : "/img/icon/star-dark.svg"
                }
                height={50}
                width={50}
                alt="Rocket"
                className="absolute top-12 right-12"
              />
              <div
                className={clsx(
                  "px-6 md:px-8 lg:px-10 py-12 lg:py-14 xl:py-16 bg-white dark:bg-darkBg h-full"
                )}
              >
                <div
                  className="h-20 w-20 md:h-24 md:w-24 bg-no-repeat bg-contain flex items-center justify-center text-center text-white text-4xl font-bold"
                  style={{ backgroundImage: "url(/img/icon/curve-bg.png)" }}
                >
                  2
                </div>
                <h3 className="mt-5 md:mt-6 xl:mt-8 text-darkText dark:text-white font-medium text-2xl lg:text-3xl xl:text-4xl leading-130">
                  {t("Lucrative Staking Rewards")}
                </h3>
                <p className="text-darkText dark:text-white mt-5 md:mt-6 xl:mt-8 text-base md:text-lg lg:text-xl opacity-80 leading-160">
                  {t(
                    "Token holders may receive up to 45% quarterly staking rewards from the 10% of tokens paid for each new subscription on the platform The industry average for staking returns is 5-10% APY, but we have decided to share a portion of subscription with our token holders through this pool, which has the potential to offer returns of up to 45% every quarter"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "bg-gradient",
              styles.grid__item,
              styles.grid__item__3
            )}
          >
            <div className={clsx(styles.wrapper)}>
              <div className="flex items-center justify-center py-3 h-full bg-white dark:bg-transparent">
                <Image
                  src={
                    theme === "dark"
                      ? "/ypred-coin.png"
                      : "/ypred-coin-light.png"
                  }
                  alt="Ypred token"
                  height={40}
                  width={150}
                  className="w-[230px] h-[65px]"
                />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "bg-gradient",
              styles.grid__item,
              styles.grid__item__4
            )}
          >
            <div className={styles.wrapper}>
              <Image
                src={
                  theme === "dark"
                    ? "/img/icon/offer.png"
                    : "/img/icon/offer-dark.png"
                }
                height={50}
                width={50}
                alt="Rocket"
                className="absolute top-12 right-12"
              />
              <div
                className={clsx(
                  "px-6 md:px-8 lg:px-10 py-12 lg:py-14 xl:py-16 bg-white dark:bg-darkBg h-full"
                )}
              >
                <div
                  className="h-20 w-20 md:h-24 md:w-24 bg-no-repeat bg-contain flex items-center justify-center text-center text-white text-4xl font-bold"
                  style={{ backgroundImage: "url(/img/icon/curve-bg.png)" }}
                >
                  3
                </div>
                <h3 className="mt-5 md:mt-6 xl:mt-8 max-w-[262px] text-darkText dark:text-white font-medium text-2xl lg:text-3xl xl:text-4xl leading-130">
                  {t("Huge Discounts")}
                </h3>
                <p className="text-darkText dark:text-white mt-5 md:mt-6 xl:mt-8 text-base md:text-lg  lg:text-xl opacity-80 leading-160">
                  {t(
                    "Access to platforms in yPredict ecosystem - Ranging from data repositories, predictions platforms, analytical tools, marketplace state of art trading terminals at a discounted price"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "bg-gradient",
              styles.grid__item,
              styles.grid__item__5
            )}
          >
            <div className={styles.wrapper}>
              <Image
                src={
                  theme === "dark"
                    ? "/img/icon/bar-chart.png"
                    : "/img/icon/bar-chart-dark.png"
                }
                height={50}
                width={50}
                alt="Rocket"
                className="absolute top-12 right-12"
              />
              <div
                className={clsx(
                  "px-6 md:px-8 lg:px-10 py-12 lg:py-14 xl:py-16 bg-white dark:bg-darkBg h-full"
                )}
              >
                <div
                  className="h-20 w-20 md:h-24 md:w-24 bg-no-repeat bg-contain flex items-center justify-center text-center text-white text-4xl font-bold"
                  style={{ backgroundImage: "url(/img/icon/curve-bg.png)" }}
                >
                  4
                </div>
                <h3 className="mt-5 md:mt-6 xl:mt-8 text-darkText dark:text-white font-medium text-2xl lg:text-3xl xl:text-4xl leading-130">
                  {t("Lifetime Free Predictions")}
                </h3>
                <p className="text-darkText dark:text-white mt-5 md:mt-6 xl:mt-8 text-lg lg:text-xl opacity-80 leading-160">
                  {t(
                    "Access to yPredict Analytics base models, which were built by top 1% AI developers These predictive models are able to forecast the prices of popular coins such as Bitcoin, Ethereum, and Shiba Inu with extreme precision, unlike any other publicly available predictive models (Minimum buy of $500)"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
