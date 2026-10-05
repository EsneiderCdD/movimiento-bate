import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const contacts = [
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo-cd.jpeg"
          alt="Movimiento del Bate"
          width={149}
          height={143}
          className={styles.logoCd}
        />
        <Image
          src="/logo-nombre.png"
          alt="Movimiento del Bate"
          width={2039}
          height={771}
          className={styles.logoImage}
        />
      </Link>

      <p className={styles.creed}>
        <span className={styles.lineAmarillo}>
          Somos el Movimiento del Bate.
        </span>
        <span className={styles.lineAzul}>Somos Antioquia de pie.</span>
        <span className={styles.lineRojo}>
          Somos Colombia que no se rinde.
        </span>
      </p>

      <ul className={styles.contacts}>
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a href={contact.href} className={styles.contactLink}>
              {contact.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
