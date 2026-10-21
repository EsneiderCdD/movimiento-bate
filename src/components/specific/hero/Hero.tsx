"use client";

import { useRef } from "react";
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
}

export default function Hero({
  onSelect,
  selected,
  title = "MOVIMIENTO",
  accent = "DEL BATE",
  subtitle = "Somos un movimiento ciudadano comprometido con la defensa del orden, la libertad y el bienestar de nuestra gente.",
  backgroundSrc = "/fondo2.jpg",
  backgroundOpacity,
  backgroundPosition,
  showLogo = true,
  items,
  label = "Selecciona una opción",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className={styles.page}>
      <ParallaxProvider target={heroRef}>
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.backgroundClip}>
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
          </div>

          <div className={styles.intro}>
            {showLogo && (
              <Image
                src="/logo.png"
                alt="Movimiento Bate"
                width={1280}
                height={1280}
                priority
                className={styles.logoBg}
              />
            )}

            <div className={styles.content}>
              <h1 className={styles.title}>
                {title}
                <span className={styles.accent}>{accent}</span>
              </h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        </section>
      </ParallaxProvider>

      <div className={styles.label}>
        <span className={styles.line} />
        <span className={styles.labelText}>{label}</span>
      </div>

      <Cards onSelect={onSelect} selected={selected} items={items} />

      <div className={styles.strip} />
    </div>
  );
}
