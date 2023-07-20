import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileMenu from "@/components/Header/MobileMenu";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - yPredict.ai</title>
        <meta
          name="description"
          content="yPredict.ai is an innovative AI-powered platform that provides accurate predictive analytics for businesses of all sizes. Our powerful algorithms and intuitive interface allow you to make data-driven decisions and stay ahead of the competition."
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
      <>
        <Header />
        <MobileMenu />
        <section className="main-container min-h-[500px]">
          <div className="max-w-4xl mx-auto py-8 md:py-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-darkText dark:text-white font-bold">
              Contact Us
            </h1>
            <p className="text-darkText dark:text-white text-lg mt-6 md:mt-8">
              <span className="font-semibold text-lg md:text-xl">
                Support Email
              </span>{" "}
              -{" "}
              <a className="text-skin-pink" href="mailto:help@ypredict.ai">
                help@ypredict.ai
              </a>{" "}
              Sending an email to this email address automatically creates a
              support ticket.
            </p>
            <p className="text-darkText dark:text-white text-lg mt-6 md:mt-8">
              Not satisfied with support team? Reach out to the core team,{" "}
              <a className="text-skin-pink" href="mailto:team@ypredict.ai">
                team@ypredict.ai
              </a>
              .
            </p>
          </div>
        </section>
        <Footer />
      </>
    </>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      messages: (await import(`@/locales/${context.locale}.json`)).default,
    },
  };
};
