import { useTranslations } from "next-intl";
import React from "react";
import GradientBorderBox from "../global/GradientBorderBox";

interface IAnalysisCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}
const AnalysisCard: React.FC<IAnalysisCardProps> = ({
  icon,
  title,
  description,
}) => {
  const t = useTranslations("Landing");
  return (
    <GradientBorderBox roundedClass="rounded-md">
      <div className="bg-white dark:bg-[#040b28] px-3 py-2 text-darkText dark:text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-[#151515] dark:text-white">
            {t(title)}
          </h3>
          {icon}
        </div>
        <p
          className="text-[#151515] dark:text-white opacity-80 font-thin text-sm mt-2"
          style={{ lineHeight: "140%" }}
        >
          {t(description)}
        </p>
      </div>
    </GradientBorderBox>
  );
};

export default AnalysisCard;
