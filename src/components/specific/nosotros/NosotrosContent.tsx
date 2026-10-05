import Image from "next/image";
import styles from "./NosotrosContent.module.css";

const DOTS = Array.from({ length: 9 });

const CHAPTERS = [
  { code: "PRÓLOGO", title: "" },
  { code: "I.", title: "El diagnóstico" },
  { code: "II.", title: "El símbolo" },
  { code: "III.", title: "Nuestros principios" },
  { code: "IV.", title: "Nuestra genealogía histórica" },
  { code: "V.", title: "A los que nos critica" },
  { code: "VI.", title: "Nuestra convocatoria" },
  { code: "EPÍLOGO", title: "Lo que viene" },
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
          <div className={styles.label}>
            <span className={styles.line} />
            <span className={styles.labelText}>Selecciona una opción</span>
          </div>
          <ul className={styles.index}>
            {CHAPTERS.map(({ code, title }) => (
              <li key={code} className={styles.indexItem}>
                <span className={styles.itemLabel}>{code}</span>
                {title && <span className={styles.itemDesc}>{title}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
