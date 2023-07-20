import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";
import IconInfo from "../icons/IconInfo";

interface IResultCardProps {
  label: string;
  count: number;
  isLoading: boolean;
  info?: string;
}
const ResultCard: React.FC<IResultCardProps> = ({
  label,
  count,
  isLoading,
  info,
}) => {
  const t = useTranslations("BacklinkEstimator");
  return (
    <div className={clsx("pt-4 h-full flex flex-col gap-4 md:gap-8")}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-medium text-[#93A1B1]">{label}</span>
        <span className="w-5">
          {info ? (
            <Tooltip label={info}>
              <IconInfo />
            </Tooltip>
          ) : (
            <IconInfo />
          )}
        </span>
      </div>
      <div
        className={clsx(
          "mt-auto bg-gray-50 shadow-sm border-b-[3px] border-b-skin-pink h-40 flex flex-col items-center justify-center gap-[10px]",
          isLoading && "animate-pulse"
        )}
      >
        {isLoading ? (
          <Icon icon="svg-spinners:3-dots-fade" fontSize={20} />
        ) : (
          <>
            <h4 className="text-center text-2xl font-semibold text-[#414D5B]">
              {count === -1 ? "-" : Number(count).toFixed(0)}
            </h4>
            <p className="text-center uppercase font-medium text-[#636C78] text-[10px]">
              {t("Results")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultCard;

const Tooltip: React.FC<{ children?: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <div className="group relative">
      {children}
      <div
        style={{ lineHeight: "150%" }}
        className="group-hover:opacity-100 shadow-sm whitespace-nowrap transition-opacity  bg-[#E8E8FF] px-2 py-3 text-[#93A1B1] text-xs rounded-sm absolute -bottom-1 right-0 translate-y-full opacity-0 mx-auto z-40"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
};
