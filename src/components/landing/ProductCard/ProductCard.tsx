import GradientBorderBox from "@/components/global/GradientBorderBox";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  list: string[];
  buttonText?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  list,
  buttonText,
}) => {
  const t = useTranslations("Landing");
  return (
    <GradientBorderBox>
      <div className="bg-white dark:bg-darkBg py-10 md:py-16 xl:py-20 px-4 md:px-14 xl:px-16 2xl:px-24 flex items-start lg:items-center justify-start lg:justify-between gap-10 md:gap-12 lg:gap-16 xl:gap-20 flex-col lg:flex-row relative">
        <Image
          src={image}
          alt="Backlink Estimator"
          height={350}
          width={450}
          className="w-full h-auto md:w-[450px] max-w-[500px] object-contain self-center flex-1"
        />
        <div className="w-full lg:w-[650px]">
          <h2
            className="font-medium text-3xl md:text-4xl xl:text-5xl text-darkText dark:text-white"
            style={{ lineHeight: "120%" }}
          >
            {t(title)}
          </h2>
          <div className="mt-8 md:mt-10 lg:mt-14 xl:mt-16 flex flex-col gap-4 md:gap-8 xl:gap-10 2xl:gap-12">
            {list.map((item, index) => (
              <div key={index} className="flex items-center gap-6">
                <span className="w-[25px] text-darkText dark:text-[#85ff5b]">
                  {/* <img src="/img/circle-dashed.svg" /> */}
                  <Checkmark />
                </span>
                <p
                  className="text-darkText dark:text-white opacity-80 font-normal text-base 2xl:text-xl flex-1"
                  style={{ lineHeight: "200%" }}
                >
                  {t(item)}
                </p>
              </div>
            ))}
          </div>
        </div>
        {buttonText && (
          <button className="absolute top-0 right-0 md:top-8 md:right-8 bg-gradient rounded-sm md:rounded-lg whitespace-nowrap text-white font-normal text-base h-8 lg:h-10 2xl:h-12 px-4 md:px-8 hover:scale-95 duration-100">
            {t(buttonText)}
          </button>
        )}
      </div>
    </GradientBorderBox>
  );
};

export default ProductCard;

const Checkmark = () => {
  return (
    <svg
      width="25"
      height="16"
      viewBox="0 0 35 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12.25L3.5 8.75L12.25 15.75L31.5 0L35 3.5L12.25 26.25L0 12.25Z"
        fill="currentColor"
      />
    </svg>
  );
};
