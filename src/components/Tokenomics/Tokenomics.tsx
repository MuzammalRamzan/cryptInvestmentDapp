import React, { useState } from "react";
import Image from "next/image";
import privateImg from "../../../public/img/icon/private-sale-row-image.svg";
import preImg from "../../../public/img/icon/pre-sale-row-image.svg";
import publicImg from "../../../public/img/icon/public-sale-row-image.svg";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import GradientBorderBox from "../global/GradientBorderBox";
import { PadLock } from "../global/Icon/PadLock";
import { useAppStore } from "@/store";
const allocVestingData = [
  // {
  //   allocatedTo: "Private Sale",
  //   percent: "2",
  //   supply: "2000000",
  //   vesting: "50% unlock at TGE,2 weeks lock,6 months vest",
  // },
  {
    allocatedTo: "PreSale",
    percent: "80",
    supply: "80,000,000",
    vesting: "50% unlock at TGE, 6 weeks lock, 6 months vest",
  },
  // {
  //   allocatedTo: "Public Sale",
  //   percent: "18",
  //   supply: "18000000",
  //   vesting: "50% unlock at TGE,6 weeks lock,6 months vest",
  // },
  // {
  //   allocatedTo: "Marketing",
  //   percent: "6",
  //   supply: "6000000",
  //   vesting: "50% unlock in week 2,24 month vest",
  // },
  {
    allocatedTo: "Liquidity",
    percent: "10",
    supply: "10,000,000",
    vesting: "100% unlock at TGE",
  },
  {
    allocatedTo: "Treasury",
    percent: "5",
    supply: "5,000,000",
    vesting: "50% unlock at TGE, 6 weeks lock, 6 months vest",
  },
  {
    allocatedTo: "Development",
    percent: "5",
    supply: "5,000,000",
    vesting: "50% unlock at TGE, 6 weeks lock, 6 months vest",
  },
  // {
  //   allocatedTo: "Team",
  //   percent: "10",
  //   supply: "10000000",
  //   vesting: "4 week lock,24 month vest",
  // },

  // {
  //   allocatedTo: "Staking Rewards",
  //   percent: "10",
  //   supply: "10000000",
  //   vesting: "10% unlock in week one,2 week lock,36 month vest",
  // },
  // {
  //   allocatedTo: "Advisors",
  //   percent: "1",
  //   supply: "1000000",
  //   vesting: "50% unlock at TGE,4 week lock,3 month vest",
  // },

  // {
  //   allocatedTo: "Influencers",
  //   percent: "1",
  //   supply: "1000000",
  //   vesting: "50% unlock at TGE,4 week lock,4 month vest",
  // },
];

const Tokenomics = () => {
  const [tab, setTab] = useState(1);
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="main-container">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
          <h2
            className="font-medium text-3xl md:text-4xl lg:text-5xl text-darkText dark:text-white"
            style={{ lineHeight: "120%" }}
          >
            {t("Tokenomics")}
          </h2>
          <ul className="flex items-center gap-3 w-full overflow-x-auto pb-2 md:pb-0 md:w-fit">
            <li>
              <button
                className={clsx(
                  "relative py-2 md:py-3 whitespace-nowrap px-[19px] text-base font-medium text-darkText dark:text-white rounded-md",
                  tab === 1
                    ? "bg-gradient text-white"
                    : "dark:bg-[#2f32417f] border border-skin-pink dark:border-[#ffffff15]"
                )}
                name="token-sale-css-tabs"
                id="sale-tab-1"
                onClick={() => setTab(1)}
              >
                {t("Sales Details")}
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab(2)}
                className={clsx(
                  "relative py-2 md:py-3 whitespace-nowrap px-[19px] text-base font-medium text-darkText dark:text-white rounded-md",
                  tab === 2
                    ? "bg-gradient text-white"
                    : "dark:bg-[#2f32417f] border border-skin-pink dark:border-[#ffffff15]"
                )}
              >
                {t("Allocation and Vesting")}
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab(3)}
                className={clsx(
                  "relative py-2 md:py-3 whitespace-nowrap px-[19px] text-base font-medium text-darkText dark:text-white rounded-md",
                  tab === 3
                    ? "bg-gradient text-white"
                    : "dark:bg-[#2f32417f] border border-skin-pink dark:border-[#ffffff15]"
                )}
              >
                {t("Road Map")}
              </button>
            </li>
          </ul>
        </header>
        {/* details  */}
        <div className="div w-full mt-10 md:mt-16">
          <GradientBorderBox>
            <div
              className={clsx(
                "rounded-xl min-h-[190px] overflow-x-auto",
                theme === "dark" ? "bg-container" : "bg-white"
              )}
            >
              <div className="meettheteam-image-section">
                {/* Tabs 1 */}

                {tab === 1 ? (
                  <div className="token-sale-section sale-details">
                    <div className="token-sale-table-container">
                      <div className="token-sale-table">
                        <div className="bg-gradient">
                          <div className="token-sale-table-row table-header">
                            <div className="row-image">&nbsp;</div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Offering Type")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Quantity")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Price")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Raise")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Marketcap")}
                            </div>
                            {/* <div className="header-text text-center">
                      {t("Minimum Appreciation %at TGE")}
                    </div> */}
                          </div>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 1"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  2m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.036
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  72k
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 2"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  8m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.0375
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  300k
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>

                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 3"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  1.5m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.038
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  60.5k
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 4"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  10m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.05
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  500k
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 5"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  10m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.07
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  700k
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 6"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  15m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.09
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  1.35m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 7"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  16m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.10
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  1.6m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        <div className="token-sale-table-row table-row">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div className="row-image">
                                <div className="h-12 w-12">
                                  <GradientBorderBox roundedClass="rounded-lg">
                                    <div
                                      className={clsx(
                                        "px-4 py-3 flex items-center justify-center",
                                        theme === "dark"
                                          ? "bg-container text-white"
                                          : "bg-white text-darkText"
                                      )}
                                    >
                                      <PadLock />
                                    </div>
                                  </GradientBorderBox>
                                </div>
                              </div>
                              <div className="header-text text-darkText dark:text-white">
                                {"Round 8"}
                              </div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad row-bg",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  17.5m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.11
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  1.92m
                                </div>
                              </GradientBorderBox>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  -
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                        {/* Tabs 2 */}
                        <div className="token-sale-table-row table-footer">
                          <GradientBorderBox roundedClass="rounded-lg">
                            <div
                              className={clsx(
                                "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20",
                                theme === "dark" ? "" : "light"
                              )}
                            >
                              <div
                                className="row-image"
                                style={{ opacity: "0", width: "0" }}
                              ></div>

                              <div
                                className="header-text footer-launch text-darkText dark:text-white"
                                style={{ width: "195px" }}
                              >
                                {t("Launch")}
                              </div>
                              <div
                                className={clsx(
                                  "header-text withbgpad",
                                  theme === "light" && "bg-white text-darkText"
                                )}
                                style={{ opacity: "0" }}
                              ></div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  0.12
                                </div>
                              </GradientBorderBox>

                              <div
                                className={clsx(
                                  "header-text withbgpad",
                                  theme === "light" && "bg-white text-darkText"
                                )}
                                style={{ opacity: " 0" }}
                              ></div>
                              <GradientBorderBox roundedClass="rounded-lg">
                                <div
                                  className={clsx(
                                    "header-text withbgpad",
                                    theme === "light" && "light text-darkText"
                                  )}
                                >
                                  12m
                                </div>
                              </GradientBorderBox>
                            </div>
                          </GradientBorderBox>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : tab === 2 ? (
                  <div className="token-sale-section allocation-vesting team-member-hidden">
                    <div className="token-sale-table-container">
                      <div className="token-sale-table">
                        <div className="bg-gradient">
                          <div className="token-sale-table-row table-header">
                            <div className="row-image">&nbsp;</div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Allocated to")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              %
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Allocation")}
                            </div>
                            <div className="header-text text-darkText dark:text-white">
                              {t("Vesting")}
                            </div>
                          </div>
                        </div>
                        {allocVestingData.map((data, key) => (
                          <div
                            key={`alloc-data-${key}`}
                            className="token-sale-table-row table-row"
                          >
                            <GradientBorderBox roundedClass="rounded-lg">
                              <div
                                className={clsx(
                                  "flex items-center row-bg gap-2 px-4 md:px-14 lg:px-16 xl:px-20 py-3",
                                  theme === "light" && "light text-darkText"
                                )}
                              >
                                {/* <div className="row-image">
                            <img
                              src="img/private-sale-row-image.svg"
                              className="token-sale-row-image"
                              alt="private-sale-row-image.svg"
                            />
                          </div> */}

                                <div className="header-text py-2 text-darkText dark:text-white">
                                  {t(data.allocatedTo)}
                                </div>

                                <GradientBorderBox roundedClass="rounded-lg">
                                  <div
                                    className={clsx(
                                      "header-text withbgpad",
                                      theme === "light" && "light text-darkText"
                                    )}
                                  >
                                    {data.percent}
                                  </div>
                                </GradientBorderBox>
                                <GradientBorderBox roundedClass="rounded-lg">
                                  <div
                                    className={clsx(
                                      "header-text withbgpad",
                                      theme === "light" && "light text-darkText"
                                    )}
                                  >
                                    {data.supply}
                                  </div>
                                </GradientBorderBox>
                                <GradientBorderBox roundedClass="rounded-lg">
                                  <div
                                    className={clsx(
                                      "header-text withbgpad header-text-last-child",
                                      theme === "light" && "light text-darkText"
                                    )}
                                  >
                                    {t(data.vesting)}
                                  </div>
                                </GradientBorderBox>
                              </div>
                            </GradientBorderBox>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="token-sale-section text-darkText dark:text-white p-7 road-map team-member-hidden">
                    <div className="platform-payment">
                      <div className="">
                        <div className="payment-payment-title">
                          <span className="payment-yread text-[1em] md:text-[1.2em] font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                            {t("Build")}
                          </span>
                        </div>
                        <div className="payment-payment-sub-title mb-10">
                          {t(
                            "Project is currently in development where team is dedicated to have initial beta ready by Q2 2023 Including yPredict Predictions, yPredict Analytics, yPredict Terminal This phase also includes token development & sales, listing, promotions"
                          )}
                        </div>
                      </div>
                      {/* <div className="platform-payment-image">
                <img src="img/growth.svg" className="img-platform-payment" alt="platform payment"/>
              </div> */}
                    </div>

                    <div className="platform-payment">
                      <div className="">
                        <div className="payment-payment-title ">
                          <span className="payment-yread text-[1em] md:text-[1.2em] font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                            {t("Grow")}
                          </span>
                        </div>
                        <div className=" mb-10  payment-payment-sub-title">
                          {t(
                            "Growth phase will focus mainly on stabilizing the core offerings and organically growing the community and reaching a 100m marketcap for YPRED tokens"
                          )}
                        </div>
                      </div>
                      {/* <div className="platform-payment-image">
                <img src="img/engage.svg" className="img-platform-payment" alt="platform payment"/>
              </div> */}
                    </div>

                    <div className="platform-payment">
                      <div className="">
                        <div className="payment-payment-title">
                          <span className="payment-yread text-[1em] md:text-[1.2em] font-bold  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                            {t("Engage & Scale")}
                          </span>
                        </div>
                        <div className="payment-payment-sub-title">
                          {t(
                            "By this phase we expect to have our ecosystem fully developed and stable products and growing community This phase will focus on large scale marketing campaigns to reach over 1m active users on all our platforms combined"
                          )}
                        </div>
                      </div>
                      {/* <div className="platform-payment-image">
                <img src="img/scale.svg" className="img-platform-payment" alt="platform payment"/>
              </div> */}
                    </div>
                  </div>
                )}

                {/* Tabs */}
              </div>
            </div>
          </GradientBorderBox>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
