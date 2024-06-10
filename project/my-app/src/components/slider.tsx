import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { AuthPageSliderData } from "../../shared/utils/MockObjects";

const Slider = () => {
  return (
    <>
      <div className="auth-page-banner">
        <Swiper navigation={true} modules={[Navigation]} loop>
          {AuthPageSliderData.map((banner, index) => (
            <SwiperSlide key={index} style={{ height: "100vh" }}>
              <div style={{ position: "relative", height: "100%" }}>
                <Image
                  layout="fill"
                  src={`/images/${banner.image}`}
                  className="d-block imgCarousel"
                  alt={banner.title}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <h3>{banner.title}</h3>
                  <p>{banner.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;