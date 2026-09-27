import Image from "next/image";
import Link from "next/link";
import styles from "./NosotrosContent.module.css";

const DOTS = Array.from({ length: 9 });

const CHAPTERS = [
  "PRÓLOGO:",
  "I. EL DIAGNÓSTICO:",
  "II. EL SÍMBOLO:",
  "III. NUESTROS PRINCIPIOS",
  "IV. NUESTRA GENEALOGÍA HISTÓRICA",
  "V. A LOS QUE NOS CRITICA",
  "VI. NUESTRA CONVOCATORIA",
  "EPÍLOGO: LO QUE VIENE",
];

export default function NosotrosContent() {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <div className={styles.sidebarText}>
            <span>MOVIMIENTO</span>
            <span>DEL BATE</span>
          </div>
          <div className={styles.dots} aria-hidden="true">
            {DOTS.map((_, i) => (
              <span key={i} className={styles.dot} />
            ))}
          </div>
        </div>
      </aside>

      <div className={styles.right}>
        <div className={styles.main}>
          <div className={styles.spacer} aria-hidden="true" />
          <div className={styles.bgImage} aria-hidden="true" />
          <div className={styles.content}>
            <span className={styles.manifesto}>MANIFIESTO</span>
            <h1 className={styles.title}>
              MOVIMIENTO
              <br />
              DEL BATE
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
          <ul className={styles.index}>
            {CHAPTERS.map((chapter) => (
              <li key={chapter} className={styles.indexItem}>
                {chapter}
              </li>
            ))}
          </ul>

          <Link href="/nosotros" className={styles.cta}>
            Conocer
          </Link>
        </div>
      </div>
    </section>
  );
}
