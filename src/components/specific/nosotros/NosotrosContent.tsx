import Image from "next/image";
import styles from "./NosotrosContent.module.css";

const DOTS = Array.from({ length: 9 });

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

      <div className={styles.main}>
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
    </section>
  );
}
