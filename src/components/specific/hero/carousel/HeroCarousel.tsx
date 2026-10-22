"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  "/mov-b(1).jpg",
  "/mov-b(2).jpg",
  "/mov-b(3).jpg",
  "/mov-b(4).jpg",
];

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Navigation]}
      loop
      navigation
      className={styles.swiper}
    >
      {SLIDES.map((src) => (
        <SwiperSlide key={src} className={styles.slide}>
          <div className={styles.frame}>
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className={styles.image}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
