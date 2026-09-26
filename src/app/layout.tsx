import type { Metadata } from "next";
import { Anton, Oswald, Barlow, Shadows_Into_Light } from "next/font/google";
import Navbar from "@/components/specific/navbar/Navbar";
import Footer from "@/components/specific/footer/Footer";
import "./globals.css";
import styles from "./layout.module.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
});

const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  variable: "--font-shadows",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movimiento del Bate",
  description: "Movimiento del bate",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${oswald.variable} ${barlow.variable} ${shadowsIntoLight.variable}`}
    >
      <body>
        <div className={styles.spine}>
          <Navbar />
          <main className={styles.content}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
