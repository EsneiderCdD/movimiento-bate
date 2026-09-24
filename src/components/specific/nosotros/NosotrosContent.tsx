import styles from "./NosotrosContent.module.css";

export default function NosotrosContent() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <span className={styles.tag}>Qué es</span>
        <h2 className={styles.sectionTitle}>El movimiento</h2>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Historia</h3>
          <p className={styles.text}>
            El Movimiento del Bate nació en 2024 en las calles de Medellín como
            respuesta espontánea de ciudadanos comunes ante el aumento del
            vandalismo y la sensación de inseguridad en los barrios. Lo que
            comenzó como un grupo de vecinos organizados para proteger su cuadra
            se convirtió en una red de miles de personas comprometidas con la
            defensa del orden y la convivencia pacífica. El bate, herramienta
            cotidiana del trabajo antioqueño, se transformó en símbolo de
            resistencia ciudadana.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Integrantes</h3>
          <p className={styles.text}>
            Detrás del bate no hay un líder único ni una figura mediática. Somos
            familias, comerciantes, transportadores, estudiantes y trabajadores
            que decidieron dejar de ser espectadores. Desde el padre de familia
            que cuida su barrio hasta el joven emprendedor que defiende su
            negocio, el movimiento está conformado por personas reales con una
            causa en común: vivir sin miedo.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Características principales</h3>
          <p className={styles.text}>
            Tres pilares sostienen el movimiento. Primero, la defensa legítima:
            el derecho natural de proteger la vida, la familia y la propiedad.
            Segundo, la unidad ciudadana: la fuerza no está en la violencia sino
            en la organización colectiva. Tercero, la transparencia: no hay
            intereses ocultos, no hay financiación oscura, no hay afán de poder.
            El bate es el recordatorio de que el pueblo está despierto.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.tag}>Diferencial</span>
        <h2 className={styles.sectionTitle}>Qué nos hace únicos</h2>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Qué NO es</h3>
          <p className={styles.text}>
            El Movimiento del Bate no es una milicia, no es un grupo
            paramilitar, no es un partido político y no es una pandilla. No
            promueve la violencia como fin ni como método. No responde a
            intereses económicos de ningún tipo. No busca tomar el poder ni
            imponer una ideología. El bate no es un arma: es un símbolo de que
            el ciudadano decidió dejar de mirar hacia otro lado.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Respuesta a la crítica</h3>
          <p className={styles.text}>
            Nos dicen que somos violentos por portar un bate. La violencia real
            es la que sufren nuestras familias cuando nadie las defiende. Nos
            dicen que somos ilegales. La legítima defensa es un derecho
            constitucional. Nos dicen que somos un peligro para la democracia.
            El verdadero peligro es que los ciudadanos vivan amedrentados
            mientras las instituciones miran desde lejos. No buscamos conflicto,
            buscamos que no nos impongan el caos.
          </p>
        </div>
      </section>
    </div>
  );
}
