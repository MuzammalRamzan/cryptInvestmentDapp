import React from "react";
import { comparison } from "@/constant";
import Image from "next/image";
import { useTranslations } from "next-intl";
import GradientBorderBox from "../global/GradientBorderBox";
import Checkmark from "../global/Icon/Checkmark";
const Comparison = () => {
  const t = useTranslations("Landing");
  return (
    <section className="section">
      <div className="main-container mb-20">
        <GradientBorderBox>
          <div className="bg-white dark:bg-darkBg comparison">
            <table>
              <thead className="bg-gradient">
                <tr>
                  <th></th>
                  <th className="product">
                    {/* <img
                      className="w-[156px]"
                      src="/ypred-coin.png"
                      alt="logo header"
                    /> */}
                    yPredict
                  </th>
                  <th className="product">{t("defytrends")}</th>
                  <th className="product">{t("dash2trade")}</th>
                  <th className="product">{t("lunarcrush")}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((data, index) => (
                  <tr key={index}>
                    <td className="flex flex-row items-center space-x-10 font-medium title-row">
                      <Image
                        src={data.icon}
                        className="w-10 h-8 pr-2 "
                        alt="tool"
                      />
                      {t(data.name)}
                    </td>
                    <td className="compare-row">
                      <span className="comp-tick-icon flex justify-center">
                        <Checkmark />
                      </span>
                    </td>
                    <td>
                      <span className="comp-tick-icon flex justify-center">
                        {data.defytrends ? <Checkmark /> : "-"}
                      </span>
                    </td>
                    <td>
                      <span className="comp-tick-icon flex justify-center">
                        {data.dash2trade ? <Checkmark /> : "-"}
                      </span>
                    </td>
                    <td>
                      <span className="comp-tick-icon flex justify-center">
                        {data.lunarcrush ? <Checkmark /> : "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GradientBorderBox>
      </div>
    </section>
  );
};

export default Comparison;
