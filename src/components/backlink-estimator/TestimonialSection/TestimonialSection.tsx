import Image from "next/image";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import IconQuote from "../icons/IconQuote";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

const TestimonialSection = () => {
  const t = useTranslations("BacklinkEstimator");
  return (
    <section>
      <div className="main-container relative">
        <Image
          src="/img/backlink-estimator/testimonial-circle.png"
          alt="Testimonial Circle"
          height={243}
          width={243}
          className="absolute right-[10%] top-0 z-0 h-[180px] w-[180px] md:h-[200px] md:w-[200px] lg:w-[243px] lg:h-[243px] animate-spin"
        />
        <div className="py-10 md:py-12 xl:py-16 max-w-[1170px] mx-auto z-10">
          <h3
            className="font-bold text-center text-2xl md:text-3xl lg:text-[44px] leading-[140%] text-[#161C28]"
            style={{ lineHeight: "130%" }}
          >
            {t("What Our Clients Says")}
          </h3>
          <div className="mt-10 md:mt-12 lg:mt-14 relative pb-20 md:pb-0">
            <Swiper
              className="testimonial-slider"
              slidesPerView={1}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
              }}
              navigation={{ nextEl: "#nextEl", prevEl: "#prevEl" }}
            >
              {[1].map((item) => (
                <SwiperSlide key={item}>
                  <div className="flex items-center gap-10 md:gap-20 lg:gap-24 flex-col md:flex-row">
                    <div className="h-[386px] w-[298px] relative">
                      <Image
                        alt="Testimonial"
                        src="/img/backlink-estimator/client.png"
                        height={386}
                        width={298}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "149px",
                        }}
                      />
                      <div className="h-fit w-fit absolute -right-2 top-6">
                        <IconQuote />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="max-w-[604px] textx-lg lg:text-xl xl:text-[22px] leading-6 lg:leading-7 xl:leading-9 font-normal text-[#575757]">
                        It’s poised to become an indispensable tool in my SEO
                        arsenal. With its accurate predictions for backlinks,
                        unique referring domains, and average Page Authority and
                        Domain Authority, it simplifies the optimisation process
                        and saves valuable time.
                      </p>
                      <div className="flex items-center gap-2 mt-6">
                        <span className="h-[1px] bg-black w-[22px]" />
                        <span className="text-[#575757] text-base font-medium">
                          Sayed Rahman
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-end absolute bottom-0 right-0 z-20">
              <div className="flex items-center gap-6">
                <RounededButton id="prevEl">
                  <Icon icon="ph:arrow-left" fontSize={24} />
                </RounededButton>
                <RounededButton id="nextEl">
                  <Icon icon="ph:arrow-right" fontSize={24} />
                </RounededButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

const RounededButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...rest }) => {
  return (
    <button
      className="h-12 md:h-14 w-12 md:w-14 flex items-center justify-center border-[1.5px] border-[#3B4456] bg-white hover:bg-gray-50 text-[#3B4456] rounded-full disabled:border-[#B0AFB7] disabled:text-[#B0AFB7]"
      {...rest}
    >
      {children}
    </button>
  );
};
