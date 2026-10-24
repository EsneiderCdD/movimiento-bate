import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo-nombre.png"
          alt="Movimiento del Bate"
          width={2039}
          height={771}
          className={styles.logoImage}
        />
        <Image
          src="/116.png"
          alt="Movimiento del Bate"
          width={513}
          height={132}
          className={styles.logoMark}
        />
      </Link>

      <ul className={styles.contacts}>
        <li>
          <a
            href="https://www.instagram.com/davidtoledoosp"
            className={styles.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={512}
              height={512}
              className={styles.instagramIcon}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
