import styles from "./Cards.module.css";

const items = [
  { id: "Mov Bate", label: "Movimiento del Bate", desc: "Defensa legítima" },
  { id: "Los Bateadores", label: "Bateadores", desc: "Sé parte del cambio" },
  { id: "Tienda", label: "Tienda", desc: "Lleva el bate puesto" },
];

interface CardsProps {
  onSelect: (title: string) => void;
  selected: string | null;
}

export default function Cards({ onSelect, selected }: CardsProps) {
  return (
    <div className={styles.cards}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.card}
          data-selected={selected === item.id}
          onClick={() => onSelect(item.id)}
        >
          <span className={styles.label}>{item.label}</span>
          <span className={styles.desc}>{item.desc}</span>
        </button>
      ))}
    </div>
  );
}