import { useTranslations } from "next-intl";
import React from "react";
import ProductCard from "../ProductCard";

const ProductSection = () => {
  const t = useTranslations("Landing");
  return (
    <section className="section">
      <div className="main-container">
        <h2
          className="font-medium text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-darkText dark:text-white max-w-4xl mx-auto"
          style={{ lineHeight: "120%" }}
        >
          {t("An ever growing ecosystem of cutting edge AI products")}
        </h2>
        <div className="flex flex-col gap-16 lg:gap-24 xl:gap-28 2xl:gap-[140px] mt-10 xl:mt-14">
          <ProductCard
            image="/img/backlink-estimator.webp"
            title="Backlink estimator"
            list={[
              "Accurately predict backlink count, authority metrics, and make data-driven decisions",
              "Stay ahead of the competition with our powerful Backlink Estimator",
            ]}
            buttonText="Live now"
          />
          <ProductCard
            image="/img/ypredict-editor.webp"
            title="yPredict editor"
            list={[
              "Affordable AI-powered content solution streamlines workflow with an intelligent editor, NLP-driven keyword suggestions, and comprehensive scoring",
              "Holistic content quality assessment through aggregate score calculation and AI-powered suggestions for engaging, optimized content",
            ]}
            buttonText="Coming soon"
          />
          <ProductCard
            image="/img/ypredict-analysis.webp"
            title="yPredict Analytics"
            list={[
              "yPredict Analytics provides cutting-edge features like automated chart pattern recognition and transactional data analysis for crypto and stocks Get valuable insights and predictive signals for informed decision-making",
              "With yPredict Analytics, users benefit from the convenience of auto indicators The platform automatically selects the best indicators based on past performance, saving time and ensuring optimal trading strategies",
            ]}
            buttonText="Coming soon"
          />
          <ProductCard
            image="/img/ypredict-predictions.webp"
            title="yPredict Predictions"
            list={[
              "Powerful predictions platform that utilizes AI models to forecast prices of various crypto and stocks assets across different timeframes",
              "Exclusive membership offer with premium predictions, Get access to predictions from best models of the platform with free membership that comes with YPRED purchase during presale round",
            ]}
            buttonText="Coming soon"
          />
          <ProductCard
            image="/img/ypredict-marketplace.webp"
            title="yPredict Marketplace"
            list={[
              "A unique marketplace where ML developers can offer their model predictions as subscription services",
              "Through the yPredict marketplace, users gain access to predictions generated by expert ML developers across different domains",
            ]}
            buttonText="Coming soon"
          />
        </div>
        <div className="mt-10 lg:mt-14 xl:mt-16 flex justify-center">
          <button className="bg-gradient rounded-lg whitespace-nowrap text-white font-normal text-base h-10 2xl:h-12 px-8 hover:scale-x-95 duration-100">
            {t("And a lot more")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
