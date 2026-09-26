import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const routes = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Los Bateadores", href: "/voluntariado" },
  { label: "Tienda", href: "/tienda" },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo-cd.jpeg"
          alt="Movimiento del Bate"
          width={149}
          height={143}
          priority
          className={styles.logoCd}
        />
        <Image
          src="/logo-nombre.png"
          alt="Movimiento del Bate"
          width={2039}
          height={771}
          priority
          className={styles.logoImage}
        />
      </Link>
      <ul className={styles.links}>
        {routes.map((route) => (
          <li key={route.href}>
            <Link href={route.href} className={styles.link}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
