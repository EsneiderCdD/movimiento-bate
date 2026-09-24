import Link from "next/link";
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
        Movimiento Bate
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
