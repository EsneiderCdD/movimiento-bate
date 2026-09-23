import Image from "next/image";
import styles from "./TiendaContent.module.css";

const products = [
  { name: "Camiseta MB", price: "$45.000", image: "/logo.png" },
  { name: "Gorra MB", price: "$25.000", image: "/logo.png" },
  { name: "Sticker Pack", price: "$10.000", image: "/logo.png" },
];

export default function TiendaContent() {
  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <div key={product.name} className={styles.card}>
          <Image
            src={product.image}
            alt={product.name}
            width={1280}
            height={1280}
            className={styles.image}
          />
          <span className={styles.name}>{product.name}</span>
          <span className={styles.price}>{product.price}</span>
        </div>
      ))}
    </div>
  );
}
