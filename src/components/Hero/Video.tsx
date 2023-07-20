import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const gifRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Landing");
  return (
    <div className="basis-[45%]">
      <div className="z-20">
        <iframe
          src="https://www.youtube-nocookie.com/embed/Yx0ZlOdXkxw?controls=0&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-[420px]"
        ></iframe>
      </div>

      <div>
        <p className="text-[1em] leading-[2] py-4 font-light text-white">
          {t(
            "State-of-Art predictive models & data insights built by top 1% AI Developers & Quants enabling market participants to get an unbeatable edge in different industries including finance, health & human resource"
          )}
        </p>
      </div>

      <div className="video-features max-w-xl mx-auto bg-skin-softDark px-6 sm:px-10 md:px-16 lg:px-12 xl:px-20 py-4 sm:py-6 md:py-8 rounded-2xl">
        <div className="flex flex-col gap-y-6 ">
          <div className="flex justify-between grid-cols-2">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  width={55}
                  height={55}
                  className="block"
                  src={"/img/icon/POWERED_icon.png"}
                  alt="powerd"
                />
              </div>
              <h4 className="block space-y-1">
                <span className="text-xs block text-white">
                  {t("Powered by")}
                </span>
                <span className="text-md block text-white">
                  {t("Matic Polygon")}
                </span>
              </h4>
            </div>
            <Link
              href="https://docs.ypredict.ai/ypredict-token/audit"
              target="_blank"
              passHref
            >
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    width={55}
                    height={55}
                    className="block"
                    src={"/img/icon/AUDIT_icon.png"}
                    alt="powerd"
                  />
                </div>
                <h4 className="block space-y-1">
                  <span className="text-xs block text-white sr-only"></span>
                  <span className="text-md block text-white">{t("Audit")}</span>
                </h4>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  width={55}
                  height={55}
                  className="block"
                  src={"/img/icon/SUPPLY_icon.png"}
                  alt="powerd"
                />
              </div>
              <h4 className="block space-y-1">
                <span className="text-xs block text-white sr-only">
                  {t("total ok")}
                </span>
                <span className="text-md block text-white">
                  {t("100m Supply")}
                </span>
              </h4>
            </div>
            <Link
              href="https://docs.ypredict.ai/ypredict-token/audit"
              target="_blank"
              passHref
            >
              <div className="flex items-center gap-3 min-w-[129px]">
                <div>
                  <Image
                    width={65}
                    height={65}
                    className="block"
                    src={"/img/icon/KYC_icon.png"}
                    alt="powerd"
                  />
                </div>
                <h4 className="block space-y-1">
                  <span className="text-xs block text-white sr-only"></span>
                  <span className="text-md block text-white">{t("KYC")}</span>
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Video;
