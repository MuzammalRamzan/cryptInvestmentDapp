import GradientBorderBox from "@/components/global/GradientBorderBox";
import Video from "@/components/Hero/Video";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const t = useTranslations("Landing");
  return (
    <section className="section">
      <div className="main-container">
        <div>
          <GradientBorderBox>
            <div className="z-20 h-[400px] lg:h-[600px] relative">
              <iframe
                src={`https://www.youtube.com/embed/Yx0ZlOdXkxw?controls=0&autoplay=${
                  isPlaying ? 1 : 0
                }`}
                title="yPredict demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full object-cover object-center"
              ></iframe>
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundImage: "url(/img/video-thumbnail.webp)",
                  }}
                >
                  <span
                    onClick={() => setIsPlaying(true)}
                    className="text-white hover:text-skin-pink cursor-pointer"
                  >
                    <svg
                      className="w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32"
                      viewBox="0 0 174 174"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.4"
                        cx="87"
                        cy="87"
                        r="86"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="87" cy="87" r="48" fill="currentColor" />
                      <path
                        d="M87 1C101.58 1 115.921 4.70687 128.675 11.7723C141.429 18.8377 152.177 29.0296 159.909 41.3904C167.642 53.7512 172.105 67.875 172.879 82.4346C173.653 96.9942 170.712 111.512 164.334 124.622C157.956 137.733 148.349 149.008 136.416 157.385C124.483 165.763 110.616 170.969 96.1179 172.515C81.6199 174.061 66.967 171.896 53.5359 166.222C40.1048 160.549 28.3367 151.554 19.3373 140.083"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M97.28 86.2127C98.24 86.7848 98.24 88.2152 97.28 88.7873L82.16 97.7986C81.2 98.3708 80 97.6556 80 96.5113L80 78.4887C80 77.3444 81.2 76.6292 82.16 77.2014L97.28 86.2127Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </GradientBorderBox>
        </div>
        <div className="mt-10 lg:mt-16 xl:mt-24 2xl:mt-28">
          {/* <h2
              className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl text-white"
              style={{ lineHeight: "120%" }}
            >
              {t("The Four Key Pillars")}
            </h2>
            <p
              className="opacity-80 text-white mt-4 2xl:mt-6 font-light text-lg lg:text-xl 2xl:text-2xl"
              style={{ lineHeight: "160%" }}
            >
              {t("Ensuring Trust and Efficiency")}
            </p> */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 max-w-[600px] lg:max-w-[1100px] mx-auto">
            <InfoCard
              icon="/img/icon/POWERED_icon.png"
              title="Powered by"
              description="Matic Polygon"
            />
            <InfoCard
              icon="/img/icon/SUPPLY_icon.png"
              title="100m"
              description="Supply"
            />
            <InfoCard
              icon="/img/icon/AUDIT_icon.png"
              title="Audit"
              link="https://github.com/Coinsult/solidity/blob/main/Coinsult_YPredictToken_0xdF...18Cc_Audit.pdf"
            />
            <InfoCard
              icon="/img/icon/KYC_icon.png"
              title="KYC"
              link="https://coinsult.net/projects/ypredicttoken/"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface InfoCardProps {
  icon: string;
  title: string;
  description?: string;
  link?: string;
}
const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  const t = useTranslations("Landing");
  return (
    <div className="flex gap-2.5 md:gap-5 justify-start lg:justify-center">
      <div
        className="h-14 w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(98.62deg, #FF387A25 -10.89%, #A63EBA25 50.23%, #4845FF25 125.56%)",
        }}
      >
        <Image
          width={55}
          height={55}
          className="block w-10 h-10 lg:w-[55px] lg:h-[55px]"
          src={icon}
          alt={title}
        />
      </div>
      <div className="pt-2">
        <p
          className="text-darkText dark:text-white text-sm md:text-base lg:text-lg 2xl:text-xl opacity-80 font-normal"
          style={{ lineHeight: "180%" }}
        >
          {t(title)}
        </p>
        {description && (
          <p
            className="text-darkText dark:text-white text-sm md:text-base lg:text-lg 2xl:text-xl opacity-80 font-normal"
            style={{ lineHeight: "180%" }}
          >
            {t(description)}
          </p>
        )}
        {link && (
          <Link
            className="text-sm font-normal text-skin-pink flex items-center gap-1"
            style={{ lineHeight: "180%" }}
            href={link}
            target="_blank"
          >
            {t("View")} <Icon icon="ph:arrow-square-out" fontSize={16} />
          </Link>
        )}
      </div>
    </div>
  );
};
