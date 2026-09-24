import styles from "./TiendaPageContent.module.css";

const products = [
  {
    tag: "Ropa",
    name: "Camiseta Movimiento Bate",
    desc: "Algodón premium, estampado serigrafía. Disponible en S, M, L, XL.",
    price: "$45.000",
  },
  {
    tag: "Accesorio",
    name: "Gorra MB Edición Limitada",
    desc: "Gorra snapback bordada con el logo del movimiento. Ajustable.",
    price: "$25.000",
  },
  {
    tag: "Coleccionable",
    name: "Pack Stickers Mov. Bate",
    desc: "10 stickers vinilo resistentes al agua. Diseños exclusivos.",
    price: "$10.000",
  },
];

export default function TiendaPageContent() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>Tienda oficial</span>
        <h1 className={styles.title}>Lleva el bate puesto</h1>
        <p className={styles.subtitle}>Envíos a toda Colombia.</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.name} className={styles.card}>
            <div className={styles.image}>
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
    </div>
  );
}
