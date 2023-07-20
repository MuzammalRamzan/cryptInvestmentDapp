import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";

import HeroSection from "@/components/Hero/HeroSection";
import Sponsors from "@/components/Sponsors";
import Carousel from "@/components/Carousel/Carousel";
import PlatformFeatures from "@/components/Features/Features";
import Trusted from "@/components/Trusted/Trusted";
import WhyInvesting from "@/components/WhyInvesting/WhyInvesting";
import Tokenomics from "@/components/Tokenomics/Tokenomics";
import Team from "@/components/Team/Team";
import Testimonial from "@/components/Testimonial/Testimonial";
import Whitepaper from "@/components/Whitepaper/Whitepaper";
import Footer from "@/components/Footer/Footer";
import Comparison from "@/components/comparison/Comparison";
import MobileMenu from "@/components/Header/MobileMenu";
import { GetStaticProps, GetStaticPropsContext } from "next";
import VideoSection from "@/components/landing/VideoSection";
import ProductSection from "@/components/landing/ProductSection";
import FeatureSection from "@/components/landing/FeatureSection";
import WhitepaperSection from "@/components/landing/WhitepaperSection";
import TrustedSection from "@/components/landing/TrustedSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>yPredict.ai Presale is Live!</title>
        <meta
          name="description"
          content="yPredict.ai is an innovative AI-powered platform that provides accurate predictive analytics for businesses of all sizes. Our powerful algorithms and intuitive interface allow you to make data-driven decisions and stay ahead of the competition."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://ypredict.ai/" />
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
        <link
          href="https://www.dafontfree.net/embed/YnctZ3JhZHVhbC1kZW1vLXJlZ3VsYXImZGF0YS80NDIvYi8xOTE3MzcvQndHcmFkdWFsREVNTy1SZWd1bGFyLm90Zg"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <>
        <Header />
        <MobileMenu />
        <HeroSection />
        <Sponsors />
        <VideoSection />
        <ProductSection />

        <Comparison />
        <FeatureSection />
        <TrustedSection />
        <Tokenomics />
        <WhitepaperSection />

        <Team />
        <Footer />
      </>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      messages: (await import(`@/locales/${context.locale}.json`)).default,
    },
  };
};
