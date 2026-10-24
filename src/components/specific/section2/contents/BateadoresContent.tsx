import Image from "next/image";
import Link from "next/link";
import styles from "./BateadoresContent.module.css";

const DOTS = Array.from({ length: 9 });

export default function BateadoresContent() {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.dots} aria-hidden="true">
          {DOTS.map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>
      </aside>

      <div className={styles.right}>
        <div className={styles.main}>
          <div className={styles.bentoGrid} aria-hidden="true">
            <div className={styles.bentoItem}>
              <Image
                src="/escuela_lideres.png"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.outline}>
          <h2 className={styles.outlineTitle}>GENERACIÓN DE-BATE</h2>
          <p className={styles.outlineText}>
            Formamos líderes que transforman sus comunidades desde adentro. No
            es un partido — es una escuela donde el ciudadano común se convierte
            en agente de cambio real.
          </p>

          <Link href="/bateadores" className={`${styles.cta} ctaBtn`}>
            Conocer
          </Link>
        </div>
      </div>
    </section>
  );
}
