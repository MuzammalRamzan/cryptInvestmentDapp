import { Feature, whyInvest, teamType, ComparisonType } from "./types";
import featureImg1 from "../public/img/icon/feature1.png";
import featureImg2 from "../public/img/icon/feature2.png";
import featureImg3 from "../public/img/icon/feature3.png";
import featureImg4 from "../public/img/icon/feature4.png";
export const features: Feature[] = [
  {
    titile: "AI Signals",
    subTitle:
      "real-time trading signals from cutting edge predictive models by top 1% AI experts",
    image: featureImg1,
  },
  {
    titile: "Sentiment Analysis",
    subTitle: "Real-time sentiment analysis on all popular crypto coins",
    image: featureImg2,
  },
  {
    titile: "Technical Analysis by AI",
    subTitle: "Let AI find the most effective indicators for your asset",
    image: featureImg3,
  },
  {
    titile: "25+ Chart Pattern Recognition",
    subTitle:
      "Let AI detect most promising chart patterns on your shortlisted coins",
    image: featureImg4,
  },
];

export const whyInvesting: whyInvest[] = [
  {
    title: "10-100x Potential",
    descripetion:
      "Similar projects with far inferior offerings share a token mc of 50-100m at bare minimum, where YPREDS are designed with only 6_5m MC at listing",
  },
  {
    title: "Lucrative Staking Rewards",
    descripetion:
      "Token holders may receive up to 45% quarterly staking rewards from the 10% of tokens paid for each new subscription on the platform The industry average for staking returns is 5-10% APY, but we have decided to share a portion of subscription with our token holders through this pool, which has the potential to offer returns of up to 45% every quarter",
  },
  {
    title: "Lifetime Free Predictions",
    descripetion:
      "Access to yPredict Analytics base models, which were built by top 1% AI developers These predictive models are able to forecast the prices of popular coins such as Bitcoin, Ethereum, and Shiba Inu with extreme precision, unlike any other publicly available predictive models (Minimum buy of $500)",
  },
  {
    title: "Huge Discounts",
    descripetion:
      "Access to platforms in yPredict ecosystem - Ranging from data repositories, predictions platforms, analytical tools, marketplace state of art trading terminals at a discounted price",
  },
];

import tem1 from "../public/img/team/1.png";
import tem2 from "../public/img/team/2.png";
import tem3 from "../public/img/team/3.png";
import tem4 from "../public/img/team/4.png";
export const TeamMembers: teamType[] = [
  {
    name: "Raj Sharma",
    role: "CEO",
    image: tem1,
    social: {
      linkedin: "https://www.linkedin.com/in/rajsharma2020/",
    },
  },
  {
    name: "Chirag Purohit",
    role: "CTO",
    image: tem2,
    social: {
      linkedin: "https://www.linkedin.com/in/chiragpurohit/",
    },
  },
  {
    name: "Sirojiddin Nuriev",
    role: "HEAD OF AI",
    image: tem3,
    social: {
      linkedin: "https://www.linkedin.com/in/sirojiddin-nuriev-5639b9116/",
    },
  },
  {
    name: "Haidar Ali",
    role: "BLOCKCHAIN DEV",
    image: tem4,
    social: {
      linkedin: "https://www.linkedin.com/in/haidaralimasu/",
    },
  },
];
import comicon1 from "../public/img/icon/Comparison/1_sentiment.png";
import Quote from "../public/img/icon/Comparison/2_quote.png";
import Terminal from "../public/img/icon/Comparison/3_terminal.png";
import dataAnlicis from "../public/img/icon/Comparison/4_Transactional.png";
import AiPrediction from "../public/img/icon/Comparison/5_AI.png";
import Indicator from "../public/img/icon/Comparison/6_Indicator.png";
import PredictionMarketplace from "../public/img/icon/Comparison/7_Marketplace.png";
import FreePredictions from "../public/img/icon/Comparison/8_free.png";
import ChartTrading from "../public/img/icon/Comparison/9_chart.png";
export const comparison: ComparisonType[] = [
  {
    name: "Comparison",
    icon: comicon1,
    defytrends: true,
    dash2trade: true,
    lunarcrush: true,
  },
  {
    name: "Quote",
    icon: Quote,
    defytrends: true,
    dash2trade: true,
    lunarcrush: false,
  },
  {
    name: "Trading Terminal",
    icon: Terminal,
    defytrends: true,
    dash2trade: true,
    lunarcrush: false,
  },
  {
    name: "Transactional Data Analysis",
    icon: dataAnlicis,
    defytrends: true,
    dash2trade: false,
    lunarcrush: false,
  },
  {
    name: "AI Prediction",
    icon: AiPrediction,
    defytrends: false,
    dash2trade: true,
    lunarcrush: false,
  },
  // {
  //   name: "Auto Indicator",
  //   icon: Indicator,
  //   defytrends: false,
  //   dash2trade: false,
  //   lunarcrush: false,
  // },
  {
    name: "Auto Indicator",
    icon: Indicator,
    defytrends: false,
    dash2trade: false,
    lunarcrush: false,
  },
  {
    name: "Prediction Marketplace",
    icon: PredictionMarketplace,
    defytrends: false,
    dash2trade: false,
    lunarcrush: false,
  },
  {
    name: "Free Predictions",
    icon: FreePredictions,
    defytrends: false,
    dash2trade: false,
    lunarcrush: false,
  },
  {
    name: "Chart Trading",
    icon: ChartTrading,
    defytrends: false,
    dash2trade: false,
    lunarcrush: false,
  },
];
