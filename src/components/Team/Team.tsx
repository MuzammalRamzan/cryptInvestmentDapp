import React from "react";
import { TeamMembers } from "@/constant";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Link from "next/link";
import GradientBorderBox from "../global/GradientBorderBox";
import clsx from "clsx";
import { useAppStore } from "@/store";
const Team = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="main-container">
        <h2
          className="font-medium text-left text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-darkText dark:text-white"
          style={{ lineHeight: "120%" }}
        >
          {t("Join the force with a global team")}
        </h2>
        <div className="mt-10 lg:mt-12">
          <GradientBorderBox>
            <div
              className={clsx(
                "py-14 md:py-16 lg:py-16 2xl:py-20 w-full place-items-center gap-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#161a25] rounded-xl min-h-[190px]",
                theme === "dark" ? "bg-container" : "bg-gradient"
              )}
            >
              {TeamMembers.map((data, index) => (
                <div className="text-center space-y-1" key={index}>
                  <Image
                    className="max-w-[190px]"
                    src={data.image}
                    alt={data.name}
                  />
                  <h2 className="text-xl text-white font-medium flex items-center justify-center gap-1">
                    {data.name}{" "}
                    <Link
                      href={data.social.linkedin}
                      target="_blank"
                      className="text-white hover:text-skin-pink"
                    >
                      <Icon icon="mdi:linkedin" fontSize={20} />
                    </Link>
                  </h2>
                  <h3 className="text-base uppercase font-light text-white">
                    {t(`(${data.role})`)}
                  </h3>
                </div>
              ))}
            </div>
          </GradientBorderBox>
        </div>
      </div>
    </section>
  );
};

export default Team;
