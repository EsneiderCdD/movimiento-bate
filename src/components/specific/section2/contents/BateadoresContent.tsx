import Image from "next/image";
import styles from "./BateadoresContent.module.css";

export default function BateadoresContent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bento}>
        <div className={styles.leftColumn}>
          <div className={styles.item1}>
            <Image
              src="/fondo2.jpg"
              alt="Los Bateadores"
              fill
              className={styles.bentoImage}
            />
          </div>
          <div className={styles.item3}>
            <Image
              src="/fondo2.jpg"
              alt="Los Bateadores"
              fill
              className={styles.bentoImage}
            />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.item2}>
            <Image
              src="/fondo2.jpg"
              alt="Los Bateadores"
              fill
              className={styles.bentoImage}
            />
          </div>
          <div className={styles.item4}>
            <Image
              src="/fondo2.jpg"
              alt="Los Bateadores"
              fill
              className={styles.bentoImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.heading}>Escuela de líderes</h3>
        <p className={styles.text}>
          Los Bateadores es nuestra escuela de formación política y liderazgo
          ciudadano. Un programa donde formamos a los líderes que sus
          comunidades necesitan: personas capaces de estructurar campañas,
          comunicar ideas y transformar su entorno desde adentro.
        </p>
        <p className={styles.text}>
          Si tienes vocación de servicio, si quieres aspirar a un cargo de
          elección popular en tu municipio, si ya eres líder comunitario y
          quieres dar el siguiente paso — este es tu lugar.
        </p>
      </div>
    </div>
  );
}
