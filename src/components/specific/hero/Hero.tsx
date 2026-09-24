import Image from "next/image";
import Cards from "./cards/Cards";
import styles from "./Hero.module.css";

interface HeroProps {
  onSelect: (title: string) => void;
  selected: string | null;
}

export default function Hero({ onSelect, selected }: HeroProps) {
  return (
    <section className={styles.hero}>
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
            Antioquia. Surge como un símbolo de resistencia ciudadana, no de
            violencia, sino de defensa frente al vandalismo, la corrupción y el
            miedo que han intentado imponerse en las calles.
          </p>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/FONDO2.jpg"
          alt="Movimiento Bate hero"
          width={1704}
          height={923}
          className={styles.image}
        />
        <Cards onSelect={onSelect} selected={selected} />
      </div>
    </section>
  );
}
