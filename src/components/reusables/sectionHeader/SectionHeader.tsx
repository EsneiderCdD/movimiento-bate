import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  accent?: string;
  subtitle?: string;
  onlyRedBottom?: boolean;
}

export default function SectionHeader({
  title,
  accent,
  subtitle,
  onlyRedBottom,
}: SectionHeaderProps) {
  const parts = accent ? title.split(accent) : [title];

  return (
    <section
      className={`${styles.section} ${onlyRedBottom ? styles.onlyRedBottom : ""}`}
    >
      <div className={styles.overlay} />
      <div className={styles.container}>
        <h2 className={styles.title}>
          {accent ? (
            <>
              {parts[0]}
              <span className={styles.accent}>{accent}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
