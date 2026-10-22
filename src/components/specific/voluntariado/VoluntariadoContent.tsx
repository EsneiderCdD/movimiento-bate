"use client";

import { useState } from "react";
import Hero from "@/components/specific/hero/Hero";
import HeroCarousel from "@/components/specific/hero/carousel/HeroCarousel";
import SectionHeader from "@/components/reusables/sectionHeader/SectionHeader";
import type { CardItem } from "@/components/specific/hero/cards/Cards";
import styles from "./VoluntariadoContent.module.css";

const DOTS = Array.from({ length: 9 });

const OPTIONS: CardItem[] = [
  {
    id: "En qué consiste",
    label: "En qué consiste",
    desc: "Primero necesitas liderazgo",
  },
  {
    id: "Para quién es",
    label: "Para quién es",
    desc: "Esta red es para ti si…",
  },
  {
    id: "La ruta",
    label: "La ruta",
    desc: "2027–2031 empieza antes",
  },
  {
    id: "Inscripciones",
    label: "Inscripciones",
    desc: "Únete a RED BATE",
  },
];

const MODULES = [
  {
    n: "01",
    title: "Liderazgo desde cero",
    body: "Cómo construir liderazgo sin empezar con una estructura millonaria. No necesitas una estructura: necesitas un oficio, un barrio y la disciplina de cumplir lo que prometes. Aprendes a liderar con lo que ya tienes.",
  },
  {
    n: "02",
    title: "Comunicación desde el celular",
    body: "Cómo hacer comunicación política desde un celular. Sin pauta y sin consultores: aprendes a producir tu contenido, a defender tu idea y a que la gente te reconozca como alguien de su propio territorio.",
  },
  {
    n: "03",
    title: "Comunidad en redes",
    body: "Cómo crear comunidad en redes. Un movimiento no se hace con seguidores, se hace con vecinos. Aprendes a construir comunidad, a sostener una conversación y a que te llamen cuando haya que resolver algo.",
  },
  {
    n: "04",
    title: "Equipo territorial",
    body: "Cómo organizar un equipo territorial. Repartir roles, coordinar tareas, identificar líderes en cada barrio y sostener la estructura en el tiempo. Un líder sin equipo es un discurso; un equipo con líder es un proyecto.",
  },
  {
    n: "05",
    title: "Hablarle a tu municipio",
    body: "Cómo conocer sus problemas y convertirlos en propuestas. Aprendes a salir a la calle, a escuchar a la gente, a mapear los problemas reales y a construir un discurso que reconozca como propio quien te escucha.",
  },
  {
    n: "06",
    title: "Ruta a la candidatura",
    body: "Cómo prepararte para ser edil, concejal o alcalde. No es llegar a una candidatura: es llegar preparado. Formación, equipo, territorio y una propuesta que la gente ya conoce.",
  },
];

const AUDIENCE = [
  {
    title: "Tu territorio",
    items: [
      "Quieres defender tu municipio.",
      "Quieres participar en política sin depender de las estructuras tradicionales.",
      "Crees que Antioquia necesita nuevos liderazgos.",
      "Alguna vez has pensado: “Yo podría hacer algo por mi municipio”.",
    ],
  },
  {
    title: "Tus convicciones",
    items: [
      "Crees en la libertad y la responsabilidad individual.",
      "Crees en la seguridad como condición para vivir y progresar.",
      "Defiendes la propiedad privada y el emprendimiento.",
      "Crees que las universidades deben ser espacios para estudiar, investigar y debatir.",
    ],
  },
  {
    title: "Tu actitud",
    items: [
      "Tienes una causa, pero todavía no tienes un equipo.",
      "Quieres aprender a comunicar tus ideas.",
    ],
  },
];

const STEPS = [
  {
    n: "01",
    title: "Una causa",
    body: "El punto de partida no es una candidatura, es una causa: algo que te duele, te enciende o que simplemente le pertenece a tu municipio.",
  },
  {
    n: "02",
    title: "Formación",
    body: "Aquí aprendes a liderar, comunicar, organizar y conocer tu territorio.",
  },
  {
    n: "03",
    title: "Equipo",
    body: "Dejas de trabajar solo. Armas el equipo de tu barrio con gente que también tenga una causa.",
  },
  {
    n: "04",
    title: "Territorio",
    body: "Trabajas en campo: hablas con la gente, escuchas sus problemas y los conviertes en propuestas.",
  },
  {
    n: "05",
    title: "Candidatura",
    body: "Si ese día llega, llegas preparado: con equipo, con propuesta y con una comunidad que ya te conoce.",
  },
];

function Franja() {
  return (
    <aside className={styles.franja} aria-hidden="true">
      <div className={styles.dots}>
        {DOTS.map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>
    </aside>
  );
}

export default function VoluntariadoContent() {
  const [selected, setSelected] = useState<string | null>("En qué consiste");

  return (
    <>
      <Hero
        onSelect={setSelected}
        selected={selected}
        title=""
        subtitle=""
        showLogo={false}
        items={OPTIONS}
        label="Selecciona una opción"
        backgroundContent={<HeroCarousel />}
        afterHero={
          <div className={styles.heroIntro}>
            <h1 className={styles.heroTitle}>
              Escuela
              <span className={styles.heroTitleAccent}>de líderes</span>
            </h1>
            <p className={styles.description}>
              Hay personas que llevan años diciendo: “Yo quiero hacer algo por
              mi municipio”. El problema es que muchas no saben por dónde
              empezar.
            </p>
            <p className={styles.description}>
              RED Bateadores nace para conectar a esas personas: personas con
              ideas. Es una escuela donde aprendes a liderar, comunicar,
              organizar equipos, conocer tu municipio y construir comunidad.
            </p>
          </div>
        }
      />

      <div className={styles.page}>
        {selected === "En qué consiste" && (
          <>
            <div className={styles.chapterHeader}>
              <SectionHeader title="En qué consiste" />
            </div>
            <div className={`${styles.sectionWrap} ${styles.onLeft}`}>
              <Franja />
              <section className={styles.section}>
                <p className={styles.sectionSubtitle}>Te formamos para ganar</p>
                <p className={styles.lead}>
                  ¿Crees que para hacer política necesitas tener millones?
                  Nosotros creemos que primero necesitas tener liderazgo. La
                  escuela puede enseñarte:
                </p>
                <div className={styles.modules}>
                  {MODULES.map((module) => (
                    <article key={module.n} className={styles.module}>
                      <span className={styles.moduleNumber}>
                        {module.n}
                      </span>
                      <h3 className={styles.blockTitle}>{module.title}</h3>
                      <p className={styles.text}>{module.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {selected === "Para quién es" && (
          <>
            <div className={styles.chapterHeader}>
              <SectionHeader title="Para quién es" />
            </div>
            <div className={`${styles.sectionWrap} ${styles.onLeft}`}>
              <Franja />
              <section className={styles.section}>
                <p className={styles.sectionSubtitle}>
                  Si esto eres tú, inscríbete
                </p>
                <p className={styles.lead}>Esta red es para ti si…</p>
                <div className={styles.audienceGrid}>
                  {AUDIENCE.map((group) => (
                    <div key={group.title} className={styles.audienceCol}>
                      <h3 className={styles.blockTitle}>{group.title}</h3>
                      <ul className={styles.checkList}>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={styles.accentBlock}>
                  <p className={styles.closingText}>
                    <strong>
                      No necesitas una gran maquinaria para comenzar.
                    </strong>{" "}
                    Necesitas una causa, disciplina, comunidad y ganas de
                    aprender.
                  </p>
                  <p className={styles.closingText}>
                    No importa tu edad, tu experiencia política ni tu
                    profesión. Lo que importa es que tengas ganas de servir y
                    la disposición a aprender. Nosotros ponemos la escuela, tú
                    pones el compromiso.
                  </p>
                </div>
              </section>
            </div>
          </>
        )}

        {selected === "La ruta" && (
          <>
            <div className={styles.chapterHeader}>
              <SectionHeader title="¿Y si el próximo líder de tu municipio eres tú?" />
            </div>
            <div className={`${styles.sectionWrap} ${styles.onLeft}`}>
              <Franja />
              <section className={styles.section}>
                <p className={styles.sectionSubtitle}>
                  La ruta para llegar hasta ahí
                </p>
                <p className={styles.lead}>
                  Hay personas que tienen ideas. Hay personas que tienen
                  liderazgo. Hay personas que aman su territorio. Lo que falta
                  es el cauce: por dónde empezar.
                </p>
                <ol className={styles.steps}>
                  {STEPS.map((step) => (
                    <li key={step.n} className={styles.step}>
                      <span className={styles.stepNumber}>{step.n}</span>
                      <div className={styles.stepBody}>
                        <h3 className={styles.blockTitle}>{step.title}</h3>
                        <p className={styles.text}>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className={styles.accentBlock}>
                  <p className={styles.closingText}>
                    <strong>
                      2027–2031 comienza mucho antes de una elección.
                    </strong>{" "}
                    Comienza formando a los líderes.
                  </p>
                </div>
              </section>
            </div>
          </>
        )}

        {selected === "Inscripciones" && (
          <>
            <div className={styles.chapterHeader}>
              <SectionHeader title="Inscripciones" />
            </div>
            <div className={`${styles.sectionWrap} ${styles.onLeft}`}>
              <Franja />
              <section className={`${styles.section} ${styles.formSection}`}>
                <p className={styles.sectionSubtitle}>Haz parte del cambio</p>
                <p className={styles.text}>
                  Déjanos tus datos y cuéntanos sobre ti. Cuál es tu municipio,
                  qué aspiración tienes y por qué quieres ser parte de Los
                  Bateadores. Un asesor de la RED te contacta para explicarte
                  la ruta y acompañarte en el proceso.{" "}
                  <strong>No necesitas una gran maquinaria para comenzar.</strong>
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
                    <label className={styles.label} htmlFor="telefono">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      className={styles.input}
                      type="tel"
                      id="telefono"
                      placeholder="300 000 0000"
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
                  <label className={styles.checkboxField}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>
                      Acepto que la RED me contacte y trate mis datos para el
                      proceso de inscripción.
                    </span>
                  </label>
                  <button className={styles.button} type="button">
                    Únete a RED BATE
                  </button>
                </form>

                <div className={styles.contactBlock}>
                  <p className={styles.contactTitle}>
                    ¿Prefieres hablar directo?
                  </p>
                  <p className={styles.text}>
                    Escríbenos a{" "}
                    <a href="mailto:redbate@movimientodelbate.com">
                      redbate@movimientodelbate.com
                    </a>{" "}
                    o por WhatsApp al{" "}
                    <a href="https://wa.me/573000000000">300 000 0000</a>.
                    Contamos contigo.
                  </p>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}
