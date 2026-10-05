import Image from "next/image";
import SectionHeader from "@/components/reusables/sectionHeader/SectionHeader";
import styles from "./TiendaPageContent.module.css";

const DOTS = Array.from({ length: 9 });

const products = [
  {
    tag: "Ropa",
    name: "Camiseta Movimiento Bate",
    desc: "Algodón premium, estampado serigrafía. Disponible en S, M, L, XL.",
    price: "$45.000",
    image: "/camisa.png",
    fit: "cover",
  },
  {
    tag: "Accesorio",
    name: "Gorra MB Edición Limitada",
    desc: "Gorra snapback bordada con el logo del movimiento. Ajustable.",
    price: "$25.000",
    image: "/gorra.png",
    fit: "cover",
  },
] as const;

function Franja() {
  return (
    <aside className={styles.franja} aria-hidden="true">
      <div className={styles.dots}>
        {DOTS.map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>
    </aside>
  );
}

export default function TiendaPageContent() {
  return (
    <div className={styles.page}>
      <div className={styles.chapterHeader}>
        <SectionHeader title="Lleva el bate puesto" onlyRedBottom />
      </div>
      <div className={`${styles.sectionWrap} ${styles.onRight}`}>
        <Franja />
        <section className={styles.section}>
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.name} className={styles.card}>
                <div className={styles.image}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: product.fit }}
                  />
                  <span className={styles.cardTag}>{product.tag}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.desc}>{product.desc}</p>
                  <div className={styles.footer}>
                    <span className={styles.price}>{product.price}</span>
                    <button className={styles.btn} type="button">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
