import React from "react";
import Image from "next/image";
import smileLight from "../../../public/img/smile-light.png";
import gradientImg from "../../../public/img/features/gradient.png";
import Card from "./Card";
import { useTranslations } from "next-intl";
const Trusted = () => {
  const t = useTranslations("Landing");
  return (
    <div className="main-container relative space-y-5">
      <div className="flex flex-col lg:flex-row  items-end space-x-1 mt-20">
        <div className="basis-[60%] w-full px-5">
          <h2 className="text-xl py-5 md:text-3xl text-center text-white font-bold">
            {t("Trusted & Backed by VCs and Pro traders for a reason")}
          </h2>
          {/* <Image src={smileLight} alt="smile" /> */}
        </div>
        <div className="basis-[40%]">
          <div className="grid space-x-5 grid-cols-2">
            <Card
              img="/img/icon/settings.png"
              name={t(
                "AI predictions by top 1% experts for your favorite coins"
              )}
            />
            <Card
              img="/img/icon/graph.png"
              name={t(
                "Transactional Data Analytics for thousands of digital assets"
              )}
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row relative w-[100%] justify-center lg:justify-between">
        <div className="hiddex lg:block basis-1/2">
          <div className="margin-img">
            <Image src={smileLight} alt="smile" />
          </div>
        </div>
        <div className="basis-1/2 ">
          <div className=" bg-[#191d27] flex items-center  rounded-2xl p-2">
            <Image
              src={"/img/icon/lock.png"}
              className="block"
              alt="lock"
              width={60}
              height={30}
            />
            <p className="text-white font-normal text-base">
              {t("Marketplace to select predictive models of your choice")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  lg:flex-row items-end w- space-x-1">
        <div className="basis-[60%] z-10"></div>
        <div className=" -z-10 left-[49%] top-[327px] lg:absolute basis-[40%]">
          <div className="grid  max-w-[500px] space-x-5 grid-cols-2">
            <Card
              img="/img/icon/settings.png"
              name={t(
                "Alternate Data (only Available to Institutional traders)"
              )}
            />
            <Card
              img="/img/icon/graph.png"
              name={t("Models trained on billions of data points")}
            />
          </div>
        </div>
        <div className="absolute top-[12%] left-0 lg:left-[42%]">
          <Image
            alt="gradient"
            className="lg:max-w-[550px]"
            src={gradientImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Trusted;
