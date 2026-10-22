"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  "/mov-b(1).jpg",
  "/mov-b(2).jpg",
  "/mov-b(3).jpg",
  "/mov-b(4).jpg",
];

export default function HeroCarousel() {
  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ el: `.${styles.pagination}`, clickable: true }}
          loop
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
      </div>
      <div className={styles.pagination} />
    </div>
  );
}
