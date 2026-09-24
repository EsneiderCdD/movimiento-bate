import styles from "./VoluntariadoContent.module.css";

export default function VoluntariadoContent() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <span className={styles.tag}>Los Bateadores</span>
        <h2 className={styles.sectionTitle}>Escuela de líderes</h2>
        <p className={styles.text}>
          Los Bateadores es un programa de formación política y liderazgo
          ciudadano creado por el Movimiento del Bate. No es un partido. No es
          una maquinaria. Es una escuela donde ciudadanos comunes aprenden a
          convertirse en líderes reales, capaces de transformar sus municipios
          desde la alcaldía o el concejo.
        </p>
      </section>

      <section className={styles.section}>
        <span className={styles.tag}>En qué consiste</span>
        <h2 className={styles.sectionTitle}>Te formamos para ganar</h2>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Estructura de campaña</h3>
          <p className={styles.text}>
            Te enseñamos paso a paso cómo se construye una campaña política
            desde cero. Desde el diagnóstico de tu municipio hasta el discurso
            que conecta con la gente. Cómo se arma un equipo, cómo se organiza
            el territorio, cómo se llega al votante real.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Comunicación y redes</h3>
          <p className={styles.text}>
            El mensaje lo es todo. Aprende a comunicar tu propuesta con
            claridad, a manejar redes sociales como herramienta política, a
            crear contenido que genere confianza y a enfrentar la opinión
            pública sin perder el rumbo.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Liderazgo comunitario</h3>
          <p className={styles.text}>
            No se trata solo de ganar elecciones, sino de servir. Te formamos
            en gestión pública, trabajo comunitario, resolución de conflictos y
            construcción de redes ciudadanas. Un líder que no sirve no es
            líder.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.tag}>Para quién es</span>
        <h2 className={styles.sectionTitle}>Si esto eres tú, inscríbete</h2>
        <p className={styles.text}>
          Si eres líder en tu barrio o municipio. Si tienes vocación de
          servicio público. Si quieres aspirar a un cargo de elección popular —
          concejal, alcalde, o cualquier espacio donde puedas servir a tu
          comunidad. Si crees que la política se puede hacer diferente y estás
          dispuesto a demostrarlo con hechos.
        </p>
        <p className={styles.text}>
          No importa tu edad, tu experiencia política ni tu profesión. Lo que
          importa es que tengas ganas de servir y la disposición de aprender.
          Nosotros ponemos la escuela, tú pones el compromiso.
        </p>
      </section>

      <section className={styles.section}>
        <span className={styles.tag}>Inscripciones</span>
        <h2 className={styles.sectionTitle}>Haz parte del cambio</h2>
        <p className={styles.text}>
          Déjanos tus datos y cuéntanos sobre ti. Cuál es tu municipio, qué
          aspiración tienes y por qué quieres ser parte de Los Bateadores. Nos
          pondremos en contacto contigo.
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="nombre">
              Nombre completo
            </label>
            <input
              className={styles.input}
              type="text"
              id="nombre"
              placeholder="Tu nombre"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="municipio">
              Municipio
            </label>
            <input
              className={styles.input}
              type="text"
              id="municipio"
              placeholder="Tu municipio"
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
            <label className={styles.label} htmlFor="aspiracion">
              ¿Qué cargo te interesa?
            </label>
            <input
              className={styles.input}
              type="text"
              id="aspiracion"
              placeholder="Concejal, Alcalde, otro"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="mensaje">
              Cuéntanos sobre ti
            </label>
            <textarea
              className={styles.textarea}
              id="mensaje"
              placeholder="¿Por qué quieres ser parte de Los Bateadores?"
            />
          </div>
          <button className={styles.button} type="button">
            Inscribirme
          </button>
        </form>
      </section>
    </div>
  );
}
