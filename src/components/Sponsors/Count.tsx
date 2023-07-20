import React from "react";
import { useTranslations } from "next-intl";
const Count = () => {
  const t = useTranslations("Landing");
  return (
    <div className="flex justify-between main-container mx-6 md:mx-10 lg:mx-20 px-0 md:px-10 lg:px-18 xl:px-40 gap-8 sm:gap-10 md:gap-20">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7940dd] to-[#c33ba6]">
          {t("100M")}
        </h1>
        <span className="text-base pt-3 text-darkText dark:text-white font-normal">
          {t("Supply")}
        </span>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7940dd] to-[#c33ba6]">
          20,000+
        </h1>
        <span className="text-base pt-3 text-darkText dark:text-white fontnormalt">
          {t("Users on waiting list")}
        </span>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7940dd] to-[#c33ba6]">
          ~6.5m
        </h1>
        <span className="text-base pt-3 text-darkText dark:text-white font-normal">
          {t("Marketcap at listing (circulating)")}
        </span>
      </div>
    </div>
  );
};

export default Count;
