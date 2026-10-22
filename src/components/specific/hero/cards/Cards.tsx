import Image from "next/image";
import styles from "./Cards.module.css";

export interface CardItem {
  id: string;
  label: string;
  desc: string;
}

const defaultItems: CardItem[] = [
  { id: "Mov Bate", label: "Movimiento del Bate", desc: "Defensa legítima" },
  { id: "Los Bateadores", label: "Bateadores", desc: "Sé parte del cambio" },
  { id: "Tienda", label: "Tienda", desc: "Lleva el bate puesto" },
];

interface CardsProps {
  onSelect: (title: string) => void;
  selected: string | null;
  items?: CardItem[];
}

export default function Cards({
  onSelect,
  selected,
  items = defaultItems,
}: CardsProps) {
  return (
    <div className={styles.cards}>
      {items.map((item) => {
        const isSelected = selected === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            data-selected={isSelected}
            onClick={() => onSelect(item.id)}
          >
            {isSelected && (
              <Image
                src="/bate.png"
                alt=""
                width={866}
                height={288}
                className={styles.bate}
              />
            )}
            <span className={styles.texts}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.desc}>{item.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
