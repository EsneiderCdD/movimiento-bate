import styles from "./Separator.module.css";

interface SeparatorProps {
  title: string;
}

export default function Separator({ title }: SeparatorProps) {
  return (
    <div className={styles.separator}>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
