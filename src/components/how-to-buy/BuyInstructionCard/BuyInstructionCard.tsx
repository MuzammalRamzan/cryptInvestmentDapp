import GradientBorderBox from "@/components/global/GradientBorderBox";
import { useAppStore } from "@/store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

const BuyInstructionCard: React.FC<{ title: string; list: string[] }> = ({
  title,
  list,
}) => {
  const { theme } = useAppStore();
  const t = useTranslations("HowToBuy");
  return (
    <GradientBorderBox roundedClass="rounded-lg">
      <div
        className={clsx(
          "p-4 h-full",
          theme === "dark" ? "bg-container" : "bg-white"
        )}
      >
        <h4 className="text-darkText dark:text-white text-lg md:text-xl">
          {t(title)}
        </h4>
        <ul className="mt-3">
          {list.map((item, index) => (
            <li className={clsx("flex gap-2", index > 0 && "mt-2")} key={item}>
              <span className={clsx("w-5 text-[#8540D5] pt-0.5")}>
                <Icon
                  icon="material-symbols:check-circle-outline-rounded"
                  fontSize={20}
                />
              </span>
              <p className="text-gray-500 dark:text-gray-50 text-base">
                {t(item)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </GradientBorderBox>
  );
};

export default BuyInstructionCard;
