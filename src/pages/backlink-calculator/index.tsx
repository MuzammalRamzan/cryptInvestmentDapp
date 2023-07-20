import BlogSection from "@/components/backlink-estimator/BlogSection";
import HeroSection from "@/components/backlink-estimator/HeroSection";
import TestimonialSection from "@/components/backlink-estimator/TestimonialSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileMenu from "@/components/Header/MobileMenu";
import useConnectWalletUser from "@/hooks/useConnectWalletUser";
import { useAppStore } from "@/store";
import clsx from "clsx";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const BacklinkEstimatorPage = () => {
  const { connectWithWallet } = useConnectWalletUser();
  const t = useTranslations("BacklinkEstimator");
  const {
    setProfile,
    setIsAuthenticated,
    isAuthenticated,
    account,
    profile,
    balance,
  } = useAppStore();
  useEffect(() => {
    if (!isAuthenticated) {
      let user: any = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user) as Record<string, any>;
        setProfile(user);
        setIsAuthenticated(true);
      } else {
        setProfile(null);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (profile && account && balance) {
      connectWithWallet({
        user_id: profile.id,
        wallet_address: account?.toLowerCase(),
        wallet_balance: balance,
      })
        .then((res) => res.json())
        .catch(() => {});
    }
  }, [profile, account, balance]);
  return (
    <>
      <Head>
        <title>Backlink Calculator - Predict link requirements with AI</title>
        <meta
          name="description"
          content="yPredict Backlink Model is trained on over 100m links to predict exact backlink profile your URL needs to rank for desired keyword. No more guess work, have a precise backlink strategy to rank in no time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Header />
      <MobileMenu />
      <main
        className={clsx(
          inter.style,
          "min-h-screen bg-[#faf9ff]  pb-10 md:pb-16 lg:pb-20"
        )}
      >
        <HeroSection />
        <section>
          <div className="main-container py-14 md:py-16 xl:py-24">
            <div className="flex items-start lg:items-center flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 px-0 xl:px-16">
              <div className="flex-1">
                <Image
                  src="/img/backlink-estimator/predicted-backlink.webp"
                  alt="Backlink estimator"
                  height={400}
                  width={400}
                  className="w-full md:w-[70%]"
                  style={{
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="max-w-[445px]">
                <h3
                  className="font-bold text-2xl md:text-3xl lg:text-[44px] leading-[140%] text-[#161C28]"
                  style={{ lineHeight: "130%" }}
                >
                  {t("Predicted Backlink Count")}
                </h3>
                <div className="mt-6 font-medium text-[#6F7071] text-base md:text-lg">
                  <p>
                    {t(
                      "Our predictive model analyzes various factors and estimates the optimal number of backlinks required for a URL to achieve the coveted top-ranking on Google"
                    )}
                  </p>
                  <p className="mt-6">
                    {t(
                      "By considering the competitiveness of the desired keyword and the current ranking landscape, we provide valuable insights to help enhance link-building strategies and improve search engine visibility"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{
            background:
              "url(/img/backlink-estimator/predicted-page-authority-bg.webp)",
          }}
        >
          <div className="main-container py-14 md:py-16 xl:py-24">
            <div className="flex items-start lg:items-center flex-col-reverse lg:flex-row gap-10 lg:gap-16 xl:gap-20 px-0 xl:px-16">
              <div className="max-w-[445px]">
                <h3
                  className="font-bold text-2xl md:text-3xl lg:text-[44px] leading-[140%] text-[#161C28]"
                  style={{ lineHeight: "130%" }}
                >
                  {t("Predicted Avg Page Authority")}
                </h3>
                <div className="mt-6 font-medium text-[#6F7071] text-base md:text-lg">
                  <p>
                    {t(
                      "Our predictive model provides valuable insights into the average Page Authority (PA) required for backlinks to propel a URL to the top position on Google"
                    )}
                  </p>
                  <p className="mt-6">
                    {t(
                      "Leveraging Moz's scoring system, we estimate the optimal PA value that each backlink should possess, empowering website owners to strategically acquire high-quality links"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/img/backlink-estimator/predicted-page-authority.webp"
                  alt="Backlink estimator"
                  height={400}
                  width={400}
                  className="w-full md:w-[70%] ml-0 lg:ml-auto"
                  style={{
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="main-container py-10 md:py-12 xl:py-16">
            <div className="flex items-start lg:items-center flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 px-0 xl:px-16">
              <div className="flex-1">
                <Image
                  src="/img/backlink-estimator/predicted-avg-domain-authority.webp"
                  alt="Backlink estimator"
                  height={400}
                  width={400}
                  className="w-full md:w-[70%]"
                  style={{
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="max-w-[445px]">
                <h3
                  className="font-bold text-2xl md:text-3xl lg:text-[44px] leading-[140%] text-[#161C28]"
                  style={{ lineHeight: "130%" }}
                >
                  {t("Predicted Avg Domain Authority")}
                </h3>
                <div className="mt-6 font-medium text-[#6F7071] text-base md:text-lg">
                  <p>
                    {t(
                      "Harnessing the power of Moz's comprehensive domain evaluation, our predictive model enables users to predict the average Domain Authority (DA) necessary for backlinks to catapult a URL to the pinnacle of Google's search results"
                    )}
                  </p>
                  <p className="mt-6">
                    {t(
                      "By determining the ideal DA value for each backlink, our model assists in formulating effective link-building strategies"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="main-container py-10 md:py-12 xl:py-16">
            <div className="flex items-start lg:items-center flex-col-reverse lg:flex-row gap-10 lg:gap-16 xl:gap-20 px-0 xl:px-16">
              <div className="max-w-[445px]">
                <h3
                  className="font-bold text-2xl md:text-3xl lg:text-[44px] text-[#161C28]"
                  style={{ lineHeight: "130%" }}
                >
                  {t("Predicted Unique Referring Domains")}
                </h3>
                <div className="mt-6 font-medium text-[#6F7071] text-base md:text-lg">
                  <p>
                    {t(
                      "The model also predicts the ideal number of unique referring domains that a URL should aim for to secure the top spot on Google By diversifying the sources of backlinks, a website can establish a strong online presence and increase its authority"
                    )}
                  </p>
                  <p className="mt-6">
                    {t(
                      "Our model assists in determining the optimal domain diversity needed for effective search engine optimisation"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/img/backlink-estimator/predicted-unique-ref-domain.webp"
                  alt="Backlink estimator"
                  height={400}
                  width={400}
                  className="w-full md:w-[70%] ml-0 lg:ml-auto"
                  style={{
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <TestimonialSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
};

export default BacklinkEstimatorPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      messages: (await import(`@/locales/${context.locale}.json`)).default,
    },
  };
};
