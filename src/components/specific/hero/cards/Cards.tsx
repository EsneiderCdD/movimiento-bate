import Image from "next/image";
import styles from "./Cards.module.css";

export interface CardItem {
  title: string;
  image: string;
}

const items: CardItem[] = [
  { title: "Mov Bate", image: "/logo.jpg" },
  { title: "Formulario", image: "/logo.jpg" },
  { title: "Tienda", image: "/logo.jpg" },
];

interface CardsProps {
  onSelect: (title: string) => void;
  selected: string | null;
}

export default function Cards({ onSelect, selected }: CardsProps) {
  return (
    <div className={styles.cards}>
      {items.map((item) => (
        <div
          key={item.title}
          className={`${styles.card} ${selected === item.title ? styles.active : ""}`}
          onClick={() => onSelect(item.title)}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={1280}
            height={1280}
            className={styles.cardImage}
          />
          <span className={styles.cardTitle}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
