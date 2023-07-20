import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/img/logo-light.png";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="section relative">
      <div className="main-container pt-8">
        <div className="max-w-[1428px] mx-auto">
          <div className="flex flex-col gap-8 lg:flex-row justify-between mb-12">
            <div className="basis-[35%] space-y-3">
              <div className="logo">
                <Image width={200} src={Logo} alt="ypredict" />
              </div>
              <p className="text-sm md:text-base xl:text-lg font-light text-darkText dark:text-white leading-7 mt-6 md:mt-8 lg:mt-10">
                {t("cuttingEdge")}
              </p>
              <ul className="flex items-center gap-x-4 mt-7 text-darkText dark:text-white text-sm sm:text-base">
                <li>
                  <Link
                    href={
                      "https://m.youtube.com/channel/UCt2WjHoVuXHi_mhTYzlrsvw"
                    }
                    target="_blank"
                  >
                    <Icon icon="bi:youtube" fontSize={20} />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://twitter.com/ypredict_ai"}
                    target="_blank"
                  >
                    <Icon icon="bi:twitter" fontSize={20} />
                  </Link>
                </li>
                <li>
                  <Link href={"https://t.me/ypredict"} target="_blank">
                    <Icon icon="bi:telegram" fontSize={20} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-row gap-x-16 justify-between  basis-[40%]">
              <div>
                <h3 className="font-semibold text-darkText dark:text-white">
                  {t("PLATFORM")}
                </h3>
                <ul className="text-darkText dark:text-white mt-4 space-y-4 font-light text-sm sm:text-base">
                  <li>
                    <Link href="/">{t("Home")}</Link>
                  </li>
                  <li>
                    <Link
                      href="https://s.surveyplanet.com/h7p13rld"
                      target="_blank"
                    >
                      {t("App Beta Access")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/app">{t("Holders App")}</Link>
                  </li>
                  <li>
                    <Link target="_blank" href="https://docs.ypredict.ai">
                      {t("Whitepaper")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://ypredict.ai/prediction/"
                    >
                      {"Prediction"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://docs.ypredict.ai/legal/terms-of-service"
                    >
                      {t("Terms of Service")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-darkText dark:text-white">
                  {t("HELP")}
                </h3>
                <ul className="text-darkText dark:text-white mt-4 space-y-4 font-light text-sm sm:text-base">
                  <li>
                    <Link href="mailto:help@ypredict.ai">{t("Email")}</Link>
                  </li>
                  <li>
                    <Link href="https://docs.ypredict.ai" target="_blank">
                      {t("FAQ")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://ypredict.ai/prediction/"
                      target="_blank"
                    >
                      {t("Education")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us">{t("Contact Us")}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient" />
          <div className="copyright my-10">
            <p className="text-darkText dark:text-white text-center font-normal opacity-80 dark:opacity-100">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <div className="absolute -z-[1] bottom-0">
          <Image
            className="max-w-[850px]"
            src={gradientImg}
            alt="tarifalhasan@gmail.com"
          />
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
