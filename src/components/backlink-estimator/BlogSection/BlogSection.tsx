import { useTranslations } from "next-intl";
import React from "react";
import BlogCard from "../BlogCard";

const BlogSection = () => {
  const t = useTranslations("BacklinkEstimator");
  const blogs: IBlog[] = [
    {
      id: 1,
      title: "Introducing yPredict Backlink Model",
      date: "June 15, 2023",
      readTime: "2 min read",
      image: "/img/backlink-estimator/blog1.webp",
      link: "https://ypredict.ai/prediction/marketing/backlink-estimator/",
    },
    {
      id: 2,
      title: "Histograms: A Visual Representation of Data in Bar Form",
      date: "June 12, 2023",
      readTime: "15 min read",
      image: "/img/backlink-estimator/blog2.webp",
      link: "https://ypredict.ai/prediction/dictionary/histograms/",
    },
  ];
  return (
    <section>
      <div className="main-container">
        <div className="py-10 md:py-12 xl:py-16 max-w-[1170px] mx-auto">
          <h3
            className="font-bold text-center text-2xl md:text-3xl lg:text-[44px] leading-[140%] text-[#161C28]"
            style={{ lineHeight: "130%" }}
          >
            {t("Latest Blogs For You")}
          </h3>
          <p className="mt-5 font-medium text-center text-[#6F7071] text-base md:text-lg">
            {t("Featured from the collection of predictions & experiments")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-12 md:mt-14 lg:mt-16 xl:mt-20">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
