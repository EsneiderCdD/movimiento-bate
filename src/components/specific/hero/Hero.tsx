"use client";

import { useRef } from "react";
import Image from "next/image";
import Cards from "./cards/Cards";
import styles from "./Hero.module.css";
import { ParallaxProvider } from "@/lib/parallax/ParallaxProvider";
import { ParallaxLayer } from "@/lib/parallax/ParallaxLayer";

interface HeroProps {
  onSelect: (title: string) => void;
  selected: string | null;
}

export default function Hero({ onSelect, selected }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      <ParallaxProvider target={heroRef}>
        <section ref={heroRef} className={styles.hero}>
          <ParallaxLayer id="background" className={styles.background}>
            <Image
              src="/fondo2.jpg"
              alt=""
              fill
              priority
              className={styles.backgroundImage}
            />
          </ParallaxLayer>

          <div className={styles.intro}>
            <ParallaxLayer id="logo" className={styles.logoLayer}>
              <Image
                src="/logo.png"
                alt="Movimiento Bate"
                width={1280}
                height={1280}
                priority
                className={styles.logoBg}
              />
            </ParallaxLayer>

            <ParallaxLayer id="text" className={styles.content}>
              <div className={styles.label}>
                <span className={styles.line} />
                <span className={styles.labelText}>Movimiento del Bate</span>
              </div>
              <h1 className={styles.title}>
                MOVIMIENTO
                <span className={styles.accent}>DEL BATE</span>
              </h1>
              <p className={styles.role}>Defensa Legítima</p>
              <p className={styles.subtitle}>
                El Movimiento del Bate nace del deseo de miles de ciudadanos de
                recuperar el orden, la autoridad y el respeto por Medellín y
                Antioquia.

              </p>
            </ParallaxLayer>
          </div>
        </section>
      </ParallaxProvider>

      <Cards onSelect={onSelect} selected={selected} />
    </>
  );
}
