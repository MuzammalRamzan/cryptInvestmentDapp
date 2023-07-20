import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useTranslations } from "next-intl";
import { RiMenu2Line } from "react-icons/ri";
import LanguageSwitcher from "../LanguageSwitcher";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import useLocalStorage from "@/hooks/theme/useLocalStorage";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const t = useTranslations("Navbar");
  const t1 = useTranslations("Landing");
  const [theme, setTheme] = useLocalStorage("yPredict-theme", "dark");
  return (
    <>
      <header className="main-container lg:hidden py-6">
        <div className="flex justify-between">
          <div className="logo">
            <Image
              src={
                theme === "dark" ? "/ypred-coin.png" : "/ypred-coin-light.png"
              }
              width={100}
              height={80}
              alt="logo"
            />
          </div>

          <RiMenu2Line
            onClick={toggleDrawer}
            size={25}
            className="block text-darkText dark:text-white"
          />
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bla bla bla"
        >
          <nav>
            <ul className="flex mt-10 ml-6  flex-col items-start gap-y-8 nav-item">
              <li className="text-black nav-link-mobile">
                <Link href={"/"}>{t("Home")}</Link>
              </li>
              <li className="text-black nav-link-mobile">
                <Link href={"/how-to-buy"}>{t("How to Buy")}</Link>
              </li>
              <li
                className={clsx(
                  "hover:text-primary duration-200 relative group"
                )}
              >
                <p
                  className={clsx(
                    "flex items-center text-black text-base font-normal whitespace-nowrap cursor-pointer",
                    "nav-link-mobile"
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
                  <div className="bg-white min-h-[150px] rounded-md shadow-md z-50">
                    <ul className="font-normal text-black text-base w-60">
                      <li
                        className={clsx(
                          "duration-100 px-2 py-1.5 border-b border-b-gray-100"
                        )}
                      >
                        <Link href={`/backlink-calculator`} passHref>
                          <div className="hover:text-skin-pink flex items-center justify-between p-2">
                            {t("Backlink Calculator")}
                            <span className="text-paragraph text-lg">
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
                            "duration-100 px-2 py-1.5 border-b border-b-gray-100 text-black"
                          )}
                        >
                          <div className="flex items-center justify-between p-2">
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
              <li className="text-black nav-link-mobile">
                <Link href={"https://docs.ypredict.ai/"} target="_blank">
                  {t1("Whitepaper")}
                </Link>
              </li>
              <li className="text-black nav-link-mobile">
                <Link
                  href={"https://s.surveyplanet.com/h7p13rld"}
                  target="_blank"
                >
                  {t("Beta Access")}
                </Link>
              </li>
              {/* <li className="text-black ">
                <Link href={"/app"}>{t("Holders App")}</Link>
              </li> */}
              {/* <li className="text-black ">
                <Link href={"https://t.me/ypredict"} target="_blank">
                  {t("Community")}
                </Link>
              </li> */}
              <li>
                <ul className="flex items-center gap-x-4">
                  <li>
                    <Link
                      href={"https://t.me/ypredict"}
                      className="text-dashboard-light-purple hover:text-skin-pink w-6"
                    >
                      <Icon icon="ic:sharp-telegram" fontSize={22} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"https://twitter.com/ypredict_ai"}
                      className="text-dashboard-light-purple hover:text-skin-pink w-6"
                    >
                      <Icon icon="bi:twitter" fontSize={22} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        "https://m.youtube.com/channel/UCt2WjHoVuXHi_mhTYzlrsvw"
                      }
                      className="text-dashboard-light-purple hover:text-skin-pink w-6"
                    >
                      <Icon icon="bi:youtube" fontSize={22} />
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="beta_btn">
                <Link
                  href="https://s.surveyplanet.com/h7p13rld"
                  target="_blank"
                  passHref
                >
                  <button className="text-skin-pink rounded-xl text-[1em] font-light border-2  border-skin-pink px-4 py-2">
                    {t("Beta Access")}
                  </button>
                </Link>
              </li> */}
              <li>
                <LanguageSwitcher variant="light" />
              </li>
              <li>
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                  className="text-darkText h-fit w-fit border border-none outline-none"
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
              </li>
            </ul>
          </nav>
        </Drawer>
      </header>
    </>
  );
};

export default MobileMenu;
