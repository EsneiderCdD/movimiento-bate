import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/logo.jpg"
        alt="Movimiento Bate"
        width={1280}
        height={1280}
        priority
        className={styles.logo}
      />
      <h1 className={styles.title}>Movimiento Bate</h1>
      <p className={styles.text}>
        El Movimiento del Bate nace del deseo de miles de ciudadanos de
        recuperar el orden, la autoridad y el respeto por Medellín y Antioquia.
        Surge como un símbolo de resistencia ciudadana, no de violencia, sino de
        defensa frente al vandalismo, la corrupción y el miedo que han intentado
        imponerse en las calles.
      </p>
      <Image
        src="/movimientobate-hero.png"
        alt="Movimiento Bate hero"
        width={1704}
        height={923}
        className={styles.image}
      />
    </section>
  );
}
