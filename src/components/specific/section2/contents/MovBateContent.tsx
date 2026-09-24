import Image from "next/image";
import styles from "./MovBateContent.module.css";

export default function MovBateContent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bentoGrid}>
        <div className={styles.item1}>
          <Image
            src="/fondo2.jpg"
            alt="Movimiento Bate"
            fill
            className={styles.bentoImage}
          />
        </div>
        <div className={styles.item2}>
          <Image
            src="/fondo2.jpg"
            alt="Movimiento Bate"
            fill
            className={styles.bentoImage}
          />
        </div>
        <div className={styles.item3}>
          <Image
            src="/fondo2.jpg"
            alt="Movimiento Bate"
            fill
            className={styles.bentoImage}
          />
        </div>
        <div className={styles.item4}>
          <Image
            src="/fondo2.jpg"
            alt="Movimiento Bate"
            fill
            className={styles.bentoImage}
          />
        </div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.heading}>¿Quiénes somos?</h2>
        <p className={styles.text}>
          Somos un movimiento ciudadano comprometido con la defensa del orden, la
          libertad y el bienestar de nuestra gente. Nacimos en Medellín con la
          convicción de que cada ciudadano tiene el derecho de vivir sin miedo,
          sin amenazas y sin que nadie imponga el caos en nuestras calles.
        </p>
        <p className={styles.text}>
          No somos un partido político, no respondemos a intereses personales.
          Somos familias, trabajadores, comerciantes y jóvenes que decidieron
          decir basta. El bate no es un arma, es un símbolo de que el pueblo
          está unido y dispuesto a defender lo que le pertenece.
        </p>
      </div>
    </div>
  );
}
