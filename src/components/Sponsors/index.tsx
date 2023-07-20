import Image from "next/image";
import { useTranslations } from "next-intl";
import GradientBorderBox from "../global/GradientBorderBox";
import { useAppStore } from "@/store";
const Sponsors = () => {
  const t = useTranslations("Landing");
  const { theme } = useAppStore();
  return (
    <section className="section">
      <div className="relative main-container z-10">
        {/* <Count /> */}
        {/* Sponsor */}
        <GradientBorderBox>
          <div className={"bg-white dark:bg-darkBg py-12 px-4 lg:px-0"}>
            <h2 className="text-center text-[#151515] dark:text-white font-semibold text-xl lg:text-2xl 2xl:text-3xl">
              {t("WE'RE FEATURED IN POPULAR MEDIA OUTLETS AROUND THE GLOBE")}
            </h2>
            <div className="grid mt-10 lg:mt-14 xl:mt-16 2xl:mt-[5.8rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
              <div>
                <Image
                  src={`/img/sponsors/${
                    theme === "dark" ? "cryptonews" : "cryptonews-light"
                  }.svg`}
                  width={150}
                  height={50}
                  alt="cryptonews"
                  className="opacity-20 hover:opacity-100 duration-100"
                />
              </div>
              <div>
                <Image
                  src={`/img/sponsors/${
                    theme === "dark" ? "benzinga" : "benzinga-light"
                  }.svg`}
                  width={150}
                  height={50}
                  alt="benzinga"
                  className="opacity-20 hover:opacity-100 duration-100"
                />
              </div>
              <div>
                <Image
                  src={`/img/sponsors/${
                    theme === "dark" ? "outlook" : "outlook-light"
                  }.svg`}
                  width={150}
                  height={50}
                  alt="outlook"
                  className="opacity-20 hover:opacity-100 duration-100"
                />
              </div>
              <div>
                <Image
                  src={`/img/sponsors/${
                    theme === "dark" ? "newsbtc" : "newsbtc-light"
                  }.svg`}
                  width={150}
                  height={50}
                  alt="newsbtc"
                  className="opacity-20 hover:opacity-100 duration-100"
                />
              </div>
              <div>
                <Image
                  src={`/img/sponsors/${
                    theme === "dark" ? "yahoo-finance" : "yahoo-finance-light"
                  }.svg`}
                  width={150}
                  height={50}
                  alt="yahoo-finance"
                  className="opacity-20 hover:opacity-100 duration-100"
                />
              </div>
            </div>
          </div>
        </GradientBorderBox>
        {/* <div className="flex pt-5 gap-4 md:gap-8 flex-col md:flex-row justify-center items-center">
          <div className="flex items-center">
            <Image
              src="/img/sponsors/6.png"
              width={130}
              height={50}
              alt="sponsors"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/img/sponsors/7.png"
              width={130}
              height={50}
              alt="sponsors"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/img/sponsors/8.png"
              width={130}
              height={50}
              alt="sponsors"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/img/sponsors/9.png"
              width={130}
              height={50}
              alt="sponsors"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Sponsors;
