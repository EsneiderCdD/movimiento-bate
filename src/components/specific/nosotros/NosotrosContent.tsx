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
        <div className={styles.sidebarText}>
          <span>MOVIMIENTO</span>
          <span>DEL BATE</span>
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
          <div className={styles.bgImage} aria-hidden="true" />
          <div className={styles.content}>
            <span className={styles.manifesto}>MANIFIESTO</span>
            <h1 className={styles.title}>
              MOVIMIENTO
              <br />
              <span className={styles.titleLine}>
                DEL BATE
                <Image
                  src="/flecha.png"
                  alt=""
                  width={386}
                  height={646}
                  className={styles.arrow}
                />
              </span>
            </h1>
            <div className={styles.bottomRow}>
              <Image
                src="/logo.png"
                alt="Movimiento del Bate"
                width={1280}
                height={1280}
                className={styles.logo}
              />
              <blockquote className={styles.quote}>
                "El que no cuida lo suyo,
                <br />
                no merece tenerlo."
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
            <li>
              <Link href="/nosotros" className={styles.cta}>
                Conocer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
