"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./NosotrosContent.module.css";

const DOTS = Array.from({ length: 9 });

const CHAPTERS = [
  { code: "PRÓLOGO", title: "", anchor: "prologo" },
  { code: "I.", title: "El diagnóstico", anchor: "cap-i" },
  { code: "II.", title: "El símbolo", anchor: "cap-ii" },
  { code: "III.", title: "Nuestros principios", anchor: "cap-iii" },
  { code: "IV.", title: "Nuestra genealogía histórica", anchor: "cap-iv" },
  { code: "V.", title: "A los que nos critica", anchor: "cap-v" },
  { code: "VI.", title: "Nuestra convocatoria", anchor: "cap-vi" },
  { code: "EPÍLOGO", title: "Lo que viene", anchor: "epilogo" },
];

const SELECT_DELAY = 1200;

export default function NosotrosContent() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSelect(event: MouseEvent<HTMLAnchorElement>, anchor: string) {
    if (!window.matchMedia("(max-width: 600px)").matches) return;

    event.preventDefault();
    setSelected(anchor);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      router.push(`/nosotros#${anchor}`);
    }, SELECT_DELAY);
  }

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
                src="/logo-emblema.png"
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
            {CHAPTERS.map(({ code, title, anchor }) => (
              <li key={code} className={styles.indexItem}>
                <Link
                  href={`/nosotros#${anchor}`}
                  className={styles.indexLink}
                  onClick={(event) => handleSelect(event, anchor)}
                >
                  <span className={styles.itemLabel}>{code}</span>
                  {title && <span className={styles.itemDesc}>{title}</span>}
                </Link>
                {selected === anchor && (
                  <Image
                    src="/bate.png"
                    alt=""
                    width={866}
                    height={288}
                    className={styles.indexBate}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
