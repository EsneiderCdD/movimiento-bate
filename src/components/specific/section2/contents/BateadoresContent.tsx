import Image from "next/image";
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

      <div className={styles.main}>
        <div className={styles.bentoGrid} aria-hidden="true">
          <div className={styles.leftColumn}>
            <div className={styles.item1}>
              <Image
                src="/fondo2.jpg"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
            <div className={styles.item3}>
              <Image
                src="/fondo2.jpg"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.item2}>
              <Image
                src="/fondo2.jpg"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
            <div className={styles.item4}>
              <Image
                src="/fondo2.jpg"
                alt=""
                fill
                className={styles.bentoImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.tag}>LOS BATEADORES</span>
          <h1 className={styles.title}>
            ESCUELA
            <br />
            DE LÍDERES
          </h1>
          <p className={styles.paragraph}>
            Formamos líderes que transforman sus comunidades desde adentro. No
            es un partido — es una escuela donde el ciudadano común se
            convierte en agente de cambio real.
          </p>
        </div>
      </div>
    </section>
  );
}