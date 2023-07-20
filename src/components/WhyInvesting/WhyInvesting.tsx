import React from "react";
import { whyInvesting } from "@/constant";
import Image from "next/image";
import { useTranslations } from "next-intl";
const WhyInvesting = () => {
  const t = useTranslations("Landing");
  return (
    <div
      id="why_investing"
      className="main-container relative mt-40 sm:py-20 mb-20"
    >
      <div className="mt-10">
        <div className="hidden lg:block absolute -z-10 left-0 top-[30%] right-0 mt-10">
          <Image
            src={"/img/icon/light2.png"}
            width={350}
            height={300}
            className="block -z-10  mx-auto"
            alt="taif"
          />
        </div>

        <div className="content z-[9999]">
          <h2 className="text-center text-xl md:text-4xl text-white font-bold">
            {t("Why buying YPRED tokens is")} <br className="hidden lg:block" />{" "}
            {t('absolutely a "no-brainer" deal?')}
          </h2>
          <div className="grid mt-9  z-[9999] place-items-center grid-cols-1 md:grid-cols-2">
            {whyInvesting.map((data, index) => (
              <div key={index} className="space-y-2 max-w-[405px] mt-3">
                <h2 className="text-[1.2em] z-[9999] font-medium  bg-clip-text text-transparent bg-gradient-to-r from-[#FF387A]  via-[#A63EBA]  to-[#4845FF]">
                  {t(data.title)}
                </h2>
                <p className="text-sm font-light z-[9999] leading-[1.5] text-[#fefefe]">
                  {t(data.descripetion)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyInvesting;
