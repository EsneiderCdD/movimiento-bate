import Link from "next/link";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  tag: string;
  title: string;
  accent?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SectionHeader({
  tag,
  title,
  accent,
  subtitle,
  ctaText,
  ctaHref,
}: SectionHeaderProps) {
  const parts = accent ? title.split(accent) : [title];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.tag}>{tag}</span>
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
        <p className={styles.subtitle}>{subtitle}</p>
        {ctaText && ctaHref && (
          <Link href={ctaHref} className={styles.ctaBtn}>
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
