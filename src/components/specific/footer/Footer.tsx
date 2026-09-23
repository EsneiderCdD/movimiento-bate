import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.logo}>Movimiento Bate</span>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <ul className={styles.social}>
        <li>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            IG
          </a>
        </li>
        <li>
          <a href="#" className={styles.socialLink} aria-label="WhatsApp">
            WPP
          </a>
        </li>
      </ul>
    </footer>
  );
}
