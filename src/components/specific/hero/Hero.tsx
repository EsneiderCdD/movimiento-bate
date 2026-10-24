"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Cards, { type CardItem } from "./cards/Cards";
import styles from "./Hero.module.css";
import { ParallaxProvider } from "@/lib/parallax/ParallaxProvider";
import { ParallaxLayer } from "@/lib/parallax/ParallaxLayer";

interface HeroProps {
  onSelect: (title: string) => void;
  selected: string | null;
  title?: string;
  accent?: string;
  subtitle?: string;
  backgroundSrc?: string;
  backgroundOpacity?: number;
  backgroundPosition?: string;
  showLogo?: boolean;
  items?: CardItem[];
  label?: string;
  afterHero?: ReactNode;
  backgroundContent?: ReactNode;
}

export default function Hero({
  onSelect,
  selected,
  title = "MOVIMIENTO",
  accent = "DEL BATE",
  subtitle = "Somos un movimiento ciudadano comprometido con la defensa del orden, la libertad y el bienestar de nuestra gente.",
  backgroundSrc = "/fondo-hero.jpg",
  backgroundOpacity,
  backgroundPosition,
  showLogo = true,
  items,
  label = "Selecciona una opción",
  afterHero,
  backgroundContent,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div
      className={`${styles.page} ${
        backgroundContent ? styles.pageCarousel : ""
      }`}
    >
      <ParallaxProvider target={heroRef}>
        <section ref={heroRef} className={styles.hero}>
          <div
            className={`${styles.backgroundClip} ${
              backgroundContent ? styles.backgroundClipCarousel : ""
            }`}
          >
            {backgroundContent ? (
              <div className={styles.backgroundCarousel}>
                {backgroundContent}
              </div>
            ) : (
              <ParallaxLayer id="background" className={styles.background}>
                <Image
                  src={backgroundSrc}
                  alt=""
                  fill
                  priority
                  className={styles.backgroundImage}
                  style={{
                    ...(backgroundOpacity !== undefined
                      ? { opacity: backgroundOpacity }
                      : {}),
                    ...(backgroundPosition
                      ? { objectPosition: backgroundPosition }
                      : {}),
                  }}
                />
              </ParallaxLayer>
            )}
          </div>

          <div className={styles.intro}>
            {showLogo && (
              <Image
                src="/logo-emblema.png"
                alt="Movimiento Bate"
                width={1280}
                height={1280}
                priority
                className={styles.logoBg}
              />
            )}

            <div className={styles.content}>
              {title ? (
                <h1 className={styles.title}>
                  {title}
                  <span className={styles.accent}>{accent}</span>
                </h1>
              ) : null}
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
          </div>
        </section>
      </ParallaxProvider>

      {afterHero}

      <div className={styles.label}>
        <span className={styles.line} />
        <span className={styles.labelText}>{label}</span>
      </div>

      <Cards onSelect={onSelect} selected={selected} items={items} />

      <div className={styles.strip} />
    </div>
  );
}
