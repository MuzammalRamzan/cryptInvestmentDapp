import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useAppStore } from "@/store";
import useLocalStorage from "@/hooks/theme/useLocalStorage";
import Tooltip from "../dashboard/Tooltip";

const Header: React.FC = () => {
  const t = useTranslations("Navbar");
  const t1 = useTranslations("Landing");
  const [theme, setTheme] = useLocalStorage("yPredict-theme", "dark");
  const { setTheme: setThemeState } = useAppStore();
  // const changeRoute = (theme: "light" | "dark") => {
  //   let data = { ...router.query, utm_campaign: theme };
  //   const params = new URLSearchParams();
  //   for (let [key, value] of Object.entries(data)) {
  //     params.append(key, value as string);
  //   }
  //   router.replace(router.pathname + `?${params}`);
  // };
  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      setThemeState(theme);
    }
  }, [theme]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const utm_campaign = sessionStorage.getItem("utm_campaign");
  //     if (utm_campaign) {
  //       if (utm_campaign === "light" || utm_campaign === "dark") {
  //         setTheme(utm_campaign as string);
  //         if (!router.query?.utm_campaign) {
  //           changeRoute(utm_campaign);
  //         }
  //       }
  //     } else {
  //       const themes: Array<"light" | "dark"> = ["dark", "light"];
  //       const random_theme = themes[Math.round(Math.random())];
  //       sessionStorage.setItem("utm_campaign", random_theme);
  //       if (!router.query?.utm_campaign) {
  //         changeRoute(random_theme);
  //       }
  //     }
  //   }
  // }, [router]);

  const logoUrl =
    theme === "dark"
      ? `/ypred-coin.png?cache=${new Date().getTime()}`
      : `/ypred-coin-light.png?cache=${new Date().getTime()}`;
  return (
    <header className="main-container hidden lg:flex  py-6  justify-between">
      <Link href="/" passHref>
        <div className="logo">
          <Image
            src={logoUrl}
            className=" lg:hidden"
            width={100}
            height={80}
            alt="logo"
          />
          <Image
            src={logoUrl}
            className="hidden lg:block"
            width={150}
            height={80}
            alt="logo"
          />
        </div>
      </Link>
      <nav className="flex items-center gap-2.5">
        <ul className="hidden lg:flex items-center gap-x-8 nav-item">
          <li className="nav-link">
            <Link href={"/"}>{t("Home")}</Link>
          </li>
          <li className="nav-link">
            <Link href={"/how-to-buy"}>{t("How to Buy")}</Link>
          </li>
          <li
            className={clsx("hover:text-primary duration-200 relative group")}
          >
            <p
              className={clsx(
                "flex items-center font-normal whitespace-nowrap cursor-pointer",
                "nav-link"
              )}
            >
              {t("Products")}
              <Icon
                icon="ion:chevron-down-sharp"
                className="ml-1"
                fontSize={18}
              />
            </p>
            <div
              className={clsx(
                "hidden absolute top-full pt-5 left-0 group-hover:block z-20"
              )}
            >
              <div className="bg-white dark:bg-gray-800 min-h-[150px] rounded-md shadow-md dark:shadow-none">
                <ul className="font-normal text-darkText dark:text-white text-base min-w-[280px] w-fit pb-4">
                  <li
                    className={clsx(
                      "duration-100 px-2 py-1.5 border-b border-gray-100 dark:border-b-gray-600"
                    )}
                  >
                    <Link href={`/backlink-calculator`} passHref>
                      <div className="hover:text-skin-pink flex items-center justify-between p-2">
                        {t("Backlink Calculator")}
                        <span className="text-paragraph text-lg truncate">
                          <Icon
                            icon="akar-icons:chevron-right"
                            className="ml-2"
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                  {[
                    "yPredict Analytics",
                    "WriteMingle",
                    "yPredict Repository",
                  ].map((item) => (
                    <li
                      key={item}
                      className={clsx(
                        "duration-100 px-2 py-1.5 border-b border-gray-100 dark:border-b-gray-600"
                      )}
                    >
                      <div className="hover:text-gray-600 dark:hover:text-gray-50 flex items-center justify-between p-2">
                        {t(item)}
                        <span className="text-paragraph text-[9px] text-skin-pink">
                          {t("Coming soon")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          <li className="nav-link ">
            <Link href={"https://docs.ypredict.ai/"} target="_blank">
              {t1("Whitepaper")}
            </Link>
          </li>
          <li className="nav-link ">
            <Link href={"https://s.surveyplanet.com/h7p13rld"} target="_blank">
              {t("Beta Access")}
            </Link>
          </li>
          {/* <li className="nav-link ">
            <Link href={"/app"}>{t("Holders App")}</Link>
          </li> */}

          {/* <li className="nav-link ">
            <Link href={'/token'}>Token</Link>
          </li> */}

          {/* <li className="nav-link">
            <Link href={"https://t.me/ypredict"} target="_blank">
              {t("Community")}
            </Link>
          </li> */}
          <li>
            <ul className="flex items-center gap-x-6 border-l border-l-darkText dark:border-l-white pl-5">
              <li>
                <Link
                  href={"https://t.me/ypredict"}
                  className="text-darkText dark:text-white hover:text-skin-pink w-6"
                >
                  <Icon icon="ic:sharp-telegram" fontSize={20} />
                </Link>
              </li>
              <li>
                <Link
                  href={"https://twitter.com/ypredict_ai"}
                  className="text-darkText dark:text-white hover:text-skin-pink w-6"
                >
                  <Icon icon="bi:twitter" fontSize={20} />
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://m.youtube.com/channel/UCt2WjHoVuXHi_mhTYzlrsvw"
                  }
                  className="text-darkText dark:text-white hover:text-skin-pink w-6"
                >
                  <Icon icon="bi:youtube" fontSize={20} />
                </Link>
              </li>
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </li>
        </ul>
        <Tooltip label="Switch theme">
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="text-darkText dark:text-white h-fit w-fit border border-none outline-none"
          >
            <Icon
              icon={
                theme === "dark"
                  ? "iconamoon:mode-light-fill"
                  : "iconamoon:mode-dark-fill"
              }
              fontSize={20}
            />
          </button>
        </Tooltip>
      </nav>
    </header>
  );
};

export default Header;
