import Image from "next/image";
import React from "react";
import Link from "next/link";
import whitePaper from "../../../public/img/whitepaper.png";
import { useTranslations } from "next-intl";
const Whitepaper = () => {
  const t = useTranslations("Landing");
  return (
    <div className="main-container justify-center gap-x-10 flex flex-col md:flex-row items-center mb-10">
      <h2 className="text-5xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-r from-skin-pink via-skin-pink to-[#572bf7]">
        <span className="ml-12">{t("Read Our")}</span>{" "}
        <Link href="https://docs.ypredict.ai/">
          <span className="mt-2 block cursor-pointer">{t("Whitepaper")}</span>
        </Link>
      </h2>
      <Image className="max-w-[220px]" src={whitePaper} alt="whitepapper" />
    </div>
  );
};

export default Whitepaper;
