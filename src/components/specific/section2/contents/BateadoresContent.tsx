import Image from "next/image";
import Link from "next/link";
import styles from "./BateadoresContent.module.css";

const DOTS = Array.from({ length: 9 });

export default function BateadoresContent() {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarText}>
          <span>LOS</span>
          <span>BATEADORES</span>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {DOTS.map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>
      </aside>

      <div className={styles.right}>
        <div className={styles.main}>
          <div className={styles.spacer} aria-hidden="true" />
          <div className={styles.bentoGrid} aria-hidden="true">
            <div className={styles.bentoItem}>
              <Image
                src="/escueladelideres(2).webp"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
            <div className={styles.bentoItem}>
              <Image
                src="/escueladelideres(2).webp"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
          </div>

          <div className={styles.content}>
            <span className={styles.tag}>LOS BATEADORES</span>
            <h1 className={styles.title}>
              ESCUELA
              <br />
              DE LÍDERES
            </h1>
            <div className={styles.bottomRow}>
              <Image
                src="/logo.png"
                alt="Movimiento del Bate"
                width={1280}
                height={1280}
                className={styles.logo}
              />
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
              <blockquote className={styles.quote}>
                El que no cuida lo suyo, no merece tenerlo.
                <span className={styles.author}>(Sabiduría arriera)</span>
              </blockquote>
            </div>
          </div>
        </div>

        <div className={styles.outline}>
          <p className={styles.outlineText}>
            Formamos líderes que transforman sus comunidades desde adentro. No
            es un partido — es una escuela donde el ciudadano común se convierte
            en agente de cambio real.
          </p>

          <Link href="/voluntariado" className={styles.cta}>
            Conocer
          </Link>
        </div>
      </div>
    </section>
  );
}
