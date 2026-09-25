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
          <div className={styles.backgroundClip}>
            <ParallaxLayer id="background" className={styles.background}>
              <Image
                src="/fondo2.jpg"
                alt=""
                fill
                priority
                className={styles.backgroundImage}
              />
            </ParallaxLayer>
          </div>

          <div className={styles.intro}>
            <Image
              src="/logo.png"
              alt="Movimiento Bate"
              width={1280}
              height={1280}
              priority
              className={styles.logoBg}
            />

            <div className={styles.content}>
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
            </div>
          </div>
        </section>
      </ParallaxProvider>

      <div className={styles.label}>
        <span className={styles.line} />
        <span className={styles.labelText}>Selecciona una opción</span>
      </div>

      <Cards onSelect={onSelect} selected={selected} />
    </>
  );
}
