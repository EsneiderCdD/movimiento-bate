import styles from "./FormularioContent.module.css";

export default function FormularioContent() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nombre">
            Nombre
          </label>
          <input
            className={styles.input}
            type="text"
            id="nombre"
            placeholder="Tu nombre"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="tu@email.com"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            className={styles.textarea}
            id="mensaje"
            placeholder="Escribe tu mensaje"
          />
        </div>
        <button className={styles.button} type="button">
          Enviar
        </button>
      </form>
    </div>
  );
}
