import { useAppStore } from "@/store";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import InfoAccordion from "../InfoAccordion";

const WhitepaperSection = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="main-container">
        <h2
          className="font-medium text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-darkText dark:text-white"
          style={{ lineHeight: "120%" }}
        >
          {t("Read Our")} {t("Whitepaper")}
        </h2>
        <div className="mt-32 xl:mt-36 flex justify-between items-end gap-16 flex-col lg:flex-row">
          <div
            className={clsx(
              "p-[1px] rounded-[20px] w-full lg:w-[538px]",
              theme === "dark" ? "bg-gradient" : "bg-transparent"
            )}
          >
            <div className="bg-white dark:bg-[#040b24] rounded-[20px]">
              <div className="bg-white dark:bg-darkBg rounded-[20px] h-[300px] flex items-end justify-center pb-4 relative">
                <Image
                  src="/img/arrow-head.svg"
                  alt="Whitepaper"
                  height={180}
                  width={50}
                  className="absolute object-contain -top-12 left-28 hidden lg:block"
                />
                <Image
                  src="/img/arrow-tail.svg"
                  alt="Whitepaper"
                  height={180}
                  width={60}
                  className="absolute object-contain top-1/4 right-32 hidden lg:block"
                />
                <Image
                  src="/img/whitepaper.webp"
                  alt="Whitepaper"
                  height={400}
                  width={200}
                  className="h-[400px] w-[250px] absolute object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[580px]">
            <InfoAccordion />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
