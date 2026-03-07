"use client";

import styles from "./Carousel.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@mui/material";

export default function Carousel() {
  const array = [...Array(13)];
  const lg = useMediaQuery("(min-width: 1000px)");
  const lg2 = useMediaQuery("(min-width: 1540px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: lg2 ? 3 : lg ? 2 : 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        <Slider {...settings}>
          {array.map((_, index) => (
            <div key={index} className={styles.card}>
              <img
                src="/images/carouselphoto.png"
                alt="lecturer"
                className={styles.lecturer}
              />
              <div className={styles.cardInfo}>
                <p className="boldFont">Okoro James {index}</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#6B7280",
                      }}
                    >
                      ACCA certified expert (20 yrs)
                    </p>
                    <div style={{ display: "flex" }}>
                      <img
                        src="/images/blackstar.svg"
                        alt="star"
                        style={{ marginRight: "2.23px" }}
                      />
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#6B7280",
                        }}
                      >
                        4.8 (150 courses)
                      </p>
                    </div>
                  </div>
                  <img src="/images/cardmedal.svg" alt="medal" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
