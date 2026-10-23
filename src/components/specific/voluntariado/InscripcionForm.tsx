"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./InscripcionForm.module.css";

const RANGOS = [
  "18-24 años",
  "25-34 años",
  "35-44 años",
  "45-54 años",
  "55 años o más",
];

const MUNICIPIOS = [
  {
    region: "Bajo Cauca",
    municipios: [
      "Cáceres",
      "Caucasia",
      "El Bagre",
      "Nechí",
      "Tarazá",
      "Zaragoza",
    ],
  },
  {
    region: "Magdalena Medio",
    municipios: [
      "Caracolí",
      "Maceo",
      "Puerto Berrío",
      "Puerto Nare",
      "Puerto Triunfo",
      "Yondó",
    ],
  },
  {
    region: "Nordeste",
    municipios: [
      "Amalfi",
      "Anorí",
      "Cisneros",
      "Remedios",
      "San Roque",
      "Santo Domingo",
      "Segovia",
      "Vegachí",
      "Yalí",
      "Yolombó",
    ],
  },
  {
    region: "Norte",
    municipios: [
      "Angostura",
      "Belmira",
      "Briceño",
      "Campamento",
      "Carolina del Príncipe",
      "Donmatías",
      "Entrerríos",
      "Gómez Plata",
      "Guadalupe",
      "Ituango",
      "San Andrés de Cuerquia",
      "San José de la Montaña",
      "San Pedro de los Milagros",
      "Santa Rosa de Osos",
      "Toledo",
      "Valdivia",
      "Yarumal",
    ],
  },
  {
    region: "Occidente",
    municipios: [
      "Abriaquí",
      "Anzá",
      "Armenia",
      "Buriticá",
      "Caicedo",
      "Cañasgordas",
      "Dabeiba",
      "Ebéjico",
      "Frontino",
      "Giraldo",
      "Heliconia",
      "Liborina",
      "Olaya",
      "Peque",
      "Sabanalarga",
      "San Jerónimo",
      "Santa Fe de Antioquia",
      "Sopetrán",
      "Uramita",
    ],
  },
  {
    region: "Oriente",
    municipios: [
      "Abejorral",
      "Alejandría",
      "Argelia",
      "Cocorná",
      "Concepción",
      "El Carmen de Viboral",
      "El Peñol",
      "El Retiro",
      "El Santuario",
      "Granada",
      "Guarne",
      "Guatapé",
      "La Ceja del Tambo",
      "La Unión",
      "Marinilla",
      "Nariño",
      "Rionegro",
      "San Carlos",
      "San Francisco",
      "San Luis",
      "San Rafael",
      "San Vicente Ferrer",
      "Sonsón",
    ],
  },
  {
    region: "Suroeste",
    municipios: [
      "Amagá",
      "Andes",
      "Angelópolis",
      "Betania",
      "Betulia",
      "Caramanta",
      "Ciudad Bolívar",
      "Concordia",
      "Fredonia",
      "Hispania",
      "Jardín",
      "Jericó",
      "La Pintada",
      "Montebello",
      "Pueblorrico",
      "Salgar",
      "Santa Bárbara",
      "Támesis",
      "Tarso",
      "Titiribí",
      "Urrao",
      "Valparaíso",
      "Venecia",
    ],
  },
  {
    region: "Urabá",
    municipios: [
      "Apartadó",
      "Arboletes",
      "Carepa",
      "Chigorodó",
      "Murindó",
      "Mutatá",
      "Necoclí",
      "San Juan de Urabá",
      "San Pedro de Urabá",
      "Turbo",
      "Vigía del Fuerte",
    ],
  },
  {
    region: "Valle de Aburrá",
    municipios: [
      "Barbosa",
      "Bello",
      "Caldas",
      "Copacabana",
      "Envigado",
      "Girardota",
      "Itagüí",
      "La Estrella",
      "Medellín",
      "Sabaneta",
    ],
  },
].flatMap((group) =>
  group.municipios.map((nombre) => ({ nombre, region: group.region })),
).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

const HABILIDADES = [
  "Liderazgo comunitario",
  "Comunicación y redes sociales",
  "Creación de videos, fotografía o diseño",
  "Emprendimiento y negocios",
  "Organización de equipos y eventos",
  "Trabajo social o comunitario",
  "Gestión de proyectos",
  "Educación y formación",
  "Conocimiento de las necesidades de mi municipio",
  "Participación ciudadana",
];

const REDES = [
  "Instagram",
  "TikTok",
  "Facebook",
  "YouTube",
  "WhatsApp",
  "Ninguna de las anteriores",
];

const FORMACION = [
  "Liderazgo y desarrollo personal",
  "Hablar en público",
  "Comunicación y redes sociales",
  "Crear contenido desde el celular",
  "Identificar problemas y formular propuestas para mi municipio",
  "Organizar equipos y comunidades",
  "Gestionar proyectos",
  "Conocer los mecanismos de participación ciudadana",
  "Comprender cómo funcionan las JAL, los concejos municipales y las alcaldías",
];

const IMPEDIMENTOS = [
  "No sé por dónde empezar",
  "Me falta formación",
  "No tengo una red de contactos",
  "Me falta experiencia",
  "Tengo recursos económicos limitados",
  "Me cuesta comunicar mis ideas",
  "No he encontrado espacios para participar",
];

const MOTIVACIONES = [
  "Recibir formación",
  "Crear contenido y comunicar ideas",
  "Participar en actividades territoriales",
  "Ayudar a organizar equipos",
  "Compartir mis conocimientos y experiencia",
  "Proponer iniciativas para mi municipio",
  "Conectar con otras personas y proyectos",
  "Explorar oportunidades de participación en la vida pública",
];

const TIEMPOS = [
  "Menos de 2 horas por semana",
  "Entre 2 y 4 horas por semana",
  "Entre 5 y 8 horas por semana",
  "Más de 8 horas por semana",
  "Depende de la actividad",
];

const ENTERASTE = [
  "Redes sociales",
  "WhatsApp",
  "Un amigo o conocido",
  "Una actividad presencial",
  "Otra fuente",
];

const PARTICIPACION = [
  "Sí",
  "No, pero me gustaría",
  "Estoy comenzando una iniciativa",
];

const CELULAR = [
  "Sí",
  "Sí, pero necesito aprender a utilizar mejor sus herramientas",
  "No por ahora",
];

const STEPS = [
  { tag: "Perfil", title: "Conozcamos quién eres" },
  { tag: "Talento", title: "Identifiquemos tu talento" },
  { tag: "Formación", title: "¿Qué te gustaría aprender?" },
  { tag: "Participación", title: "Construyamos la red" },
];

type Data = {
  nombre: string;
  rangoEdad: string;
  celular: string;
  correo: string;
  municipio: string;
  barrioVive: string;
  barrioActua: string;
  habilidades: string[];
  habilidadOtra: string;
  participacion: string;
  experiencia: string;
  redes: string[];
  celularContenido: string;
  formacion: string[];
  formacionOtra: string;
  aporte: string;
  impedimentos: string[];
  impedimentoOtro: string;
  motivaciones: string[];
  tiempo: string;
  idea: string;
  perfilSocial: string;
  enteraste: string;
  autorizacion: boolean;
};

const INITIAL: Data = {
  nombre: "",
  rangoEdad: "",
  celular: "",
  correo: "",
  municipio: "",
  barrioVive: "",
  barrioActua: "",
  habilidades: [],
  habilidadOtra: "",
  participacion: "",
  experiencia: "",
  redes: [],
  celularContenido: "",
  formacion: [],
  formacionOtra: "",
  aporte: "",
  impedimentos: [],
  impedimentoOtro: "",
  motivaciones: [],
  tiempo: "",
  idea: "",
  perfilSocial: "",
  enteraste: "",
  autorizacion: false,
};

function TextField({
  id,
  label,
  optional,
  ...props
}: {
  id: string;
  label: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> (opcional)</span>}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function MunicipioField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const query = normalize(value);
  const results = query
    ? MUNICIPIOS.filter((item) => normalize(item.nombre).includes(query))
    : MUNICIPIOS;

  const choose = (nombre: string) => {
    onChange(nombre);
    setOpen(false);
    setActive(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      if (open && active >= 0 && results[active]) {
        event.preventDefault();
        choose(results[active].nombre);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="municipio">
        ¿En qué municipio vives?
      </label>
      <div className={styles.combo}>
        <input
          id="municipio"
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="municipios-lista"
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          placeholder="Escribe para buscar tu municipio"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setActive(-1);
          }}
          onKeyDown={handleKeyDown}
          required
        />
        {open && (
          <ul
            id="municipios-lista"
            className={styles.comboList}
            role="listbox"
            aria-label="Municipios de Antioquia"
          >
            {results.length === 0 && (
              <li className={styles.comboEmpty}>Sin resultados</li>
            )}
            {results.map((item, index) => (
              <li key={item.nombre}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`${styles.comboOption} ${
                    index === active ? styles.comboOptionActive : ""
                  }`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    choose(item.nombre);
                  }}
                >
                  <span>{item.nombre}</span>
                  <span className={styles.comboRegion}>{item.region}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={styles.hint}>
        Busca entre los 125 municipios de Antioquia.
      </span>
    </div>
  );
}

function CheckGroup({
  legend,
  options,
  values,
  onToggle,
  children,
}: {
  legend: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  children?: ReactNode;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option} className={styles.option}>
            <input
              type="checkbox"
              className={styles.check}
              checked={values.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
        {children}
      </div>
    </fieldset>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option} className={styles.option}>
            <input
              type="radio"
              name={name}
              className={styles.check}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function InscripcionForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Data>(key: K, value: Data[K]) =>
    setData((current) => ({ ...current, [key]: value } as Data));

  const toggleList = (values: string[], value: string) =>
    values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

  const toggle = (
    key: "habilidades" | "formacion" | "impedimentos" | "motivaciones",
    value: string,
  ) =>
    setData((current) => {
      const list = toggleList(current[key], value);
      if (key === "habilidades") return { ...current, habilidades: list };
      if (key === "formacion") return { ...current, formacion: list };
      if (key === "impedimentos") return { ...current, impedimentos: list };
      return { ...current, motivaciones: list };
    });

  const toggleRedes = (value: string) => {
    if (value === "Ninguna de las anteriores") {
      set("redes", data.redes.includes(value) ? [] : [value]);
      return;
    }
    const withoutNone = data.redes.filter(
      (item) => item !== "Ninguna de las anteriores",
    );
    set(
      "redes",
      withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value],
    );
  };

  const next = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const prev = () => setStep((current) => Math.max(current - 1, 0));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <div className={styles.steps} aria-hidden="true">
        {STEPS.map((item, index) => (
          <span
            key={item.tag}
            className={`${styles.stepDot} ${
              index === step ? styles.stepDotActive : ""
            } ${index < step ? styles.stepDotDone : ""}`}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <div className={styles.stepHeader}>
        <span className={styles.stepMeta}>
          Paso {step + 1} de {STEPS.length} · {STEPS[step].tag}
        </span>
        <h3 className={styles.stepTitle}>{STEPS[step].title}</h3>
      </div>

      <div className={styles.stepBody}>
        {step === 0 && (
          <>
            <TextField
              id="nombre"
              label="Nombre y apellidos"
              placeholder="Tu nombre completo"
              value={data.nombre}
              onChange={(event) => set("nombre", event.target.value)}
              required
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="rangoEdad">
                ¿En qué rango de edad estás?
              </label>
              <select
                id="rangoEdad"
                className={styles.select}
                value={data.rangoEdad}
                onChange={(event) => set("rangoEdad", event.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona tu rango de edad
                </option>
                {RANGOS.map((rango) => (
                  <option key={rango} value={rango}>
                    {rango}
                  </option>
                ))}
              </select>
              <span className={styles.hint}>Solo mayores de 18 años.</span>
            </div>
            <TextField
              id="celular"
              label="Número de celular / WhatsApp"
              type="tel"
              placeholder="300 000 0000"
              value={data.celular}
              onChange={(event) => set("celular", event.target.value)}
              required
            />
            <TextField
              id="correo"
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={data.correo}
              onChange={(event) => set("correo", event.target.value)}
              required
            />
            <MunicipioField
              value={data.municipio}
              onChange={(value) => set("municipio", value)}
            />
            <TextField
              id="barrioVive"
              label="¿En qué barrio o vereda vives?"
              placeholder="Barrio o vereda"
              value={data.barrioVive}
              onChange={(event) => set("barrioVive", event.target.value)}
              required
            />
            <TextField
              id="barrioActua"
              label="¿En qué barrio, comuna, corregimiento o vereda desarrollas principalmente tus actividades?"
              placeholder="Barrio, comuna, corregimiento o vereda"
              value={data.barrioActua}
              onChange={(event) => set("barrioActua", event.target.value)}
              required
            />
          </>
        )}

        {step === 1 && (
          <>
            <CheckGroup
              legend="¿Cuál de estas áreas describe mejor tus habilidades o experiencia?"
              options={HABILIDADES}
              values={data.habilidades}
              onToggle={(value) => toggle("habilidades", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.habilidades.includes("Otra")}
                  onChange={() => toggle("habilidades", "Otra")}
                />
                <span>Otra</span>
              </label>
              {data.habilidades.includes("Otra") && (
                <input
                  className={`${styles.input} ${styles.extra}`}
                  placeholder="¿Cuál?"
                  value={data.habilidadOtra}
                  onChange={(event) => set("habilidadOtra", event.target.value)}
                />
              )}
            </CheckGroup>
            <RadioGroup
              legend="¿Actualmente participas en alguna organización, iniciativa o proyecto comunitario?"
              name="participacion"
              options={PARTICIPACION}
              value={data.participacion}
              onChange={(value) => set("participacion", value)}
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="experiencia">
                Si tienes experiencia en liderazgo, trabajo comunitario,
                comunicación o proyectos, cuéntanos brevemente.
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="experiencia"
                className={styles.textarea}
                placeholder="Cuéntanos brevemente"
                value={data.experiencia}
                onChange={(event) => set("experiencia", event.target.value)}
              />
            </div>
            <CheckGroup
              legend="¿Qué redes sociales utilizas actualmente?"
              options={REDES}
              values={data.redes}
              onToggle={toggleRedes}
            />
            <RadioGroup
              legend="¿Tienes un celular con el que puedas tomar fotos, grabar videos y crear contenido?"
              name="celularContenido"
              options={CELULAR}
              value={data.celularContenido}
              onChange={(value) => set("celularContenido", value)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <CheckGroup
              legend="¿En cuáles de estas áreas te gustaría formarte?"
              options={FORMACION}
              values={data.formacion}
              onToggle={(value) => toggle("formacion", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.formacion.includes("Otra")}
                  onChange={() => toggle("formacion", "Otra")}
                />
                <span>Otra</span>
              </label>
              {data.formacion.includes("Otra") && (
                <input
                  className={`${styles.input} ${styles.extra}`}
                  placeholder="¿Cuál?"
                  value={data.formacionOtra}
                  onChange={(event) => set("formacionOtra", event.target.value)}
                />
              )}
            </CheckGroup>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="aporte">
                ¿Qué te gustaría aportar a tu municipio o comunidad?
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="aporte"
                className={styles.textarea}
                placeholder="Cuéntanos tu idea"
                value={data.aporte}
                onChange={(event) => set("aporte", event.target.value)}
              />
            </div>
            <CheckGroup
              legend="¿Qué te ha impedido desarrollar tus ideas o asumir un papel de liderazgo hasta ahora?"
              options={IMPEDIMENTOS}
              values={data.impedimentos}
              onToggle={(value) => toggle("impedimentos", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.impedimentos.includes("Otro")}
                  onChange={() => toggle("impedimentos", "Otro")}
                />
                <span>Otro</span>
              </label>
              {data.impedimentos.includes("Otro") && (
                <input
                  className={`${styles.input} ${styles.extra}`}
                  placeholder="¿Cuál?"
                  value={data.impedimentoOtro}
                  onChange={(event) =>
                    set("impedimentoOtro", event.target.value)
                  }
                />
              )}
            </CheckGroup>
          </>
        )}

        {step === 3 && (
          <>
            <CheckGroup
              legend="¿Cómo te gustaría participar en Generación De-Bate?"
              options={MOTIVACIONES}
              values={data.motivaciones}
              onToggle={(value) => toggle("motivaciones", value)}
            />
            <RadioGroup
              legend="¿Cuánto tiempo podrías dedicar a estas actividades?"
              name="tiempo"
              options={TIEMPOS}
              value={data.tiempo}
              onChange={(value) => set("tiempo", value)}
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="idea">
                ¿Tienes alguna idea, proyecto o iniciativa que quisieras
                desarrollar?
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="idea"
                className={styles.textarea}
                placeholder="Cuéntanos sobre tu idea"
                value={data.idea}
                onChange={(event) => set("idea", event.target.value)}
              />
            </div>
            <TextField
              id="perfilSocial"
              label="Comparte tu perfil de Instagram, TikTok, LinkedIn u otra red, si deseas."
              placeholder="@usuario"
              value={data.perfilSocial}
              onChange={(event) => set("perfilSocial", event.target.value)}
              optional
            />
            <RadioGroup
              legend="¿Cómo te enteraste de Generación De-Bate?"
              name="enteraste"
              options={ENTERASTE}
              value={data.enteraste}
              onChange={(value) => set("enteraste", value)}
            />
            <label className={styles.auth}>
              <input
                type="checkbox"
                className={styles.check}
                checked={data.autorizacion}
                onChange={(event) =>
                  set("autorizacion", event.target.checked)
                }
                required
              />
              <span>
                Autorizo el tratamiento de mis datos personales conforme a la{" "}
                <a href="#">política de tratamiento de datos</a>.
              </span>
            </label>
          </>
        )}
      </div>

      <div className={styles.nav}>
        {step > 0 && (
          <button
            type="button"
            className={styles.ghostButton}
            onClick={prev}
          >
            Atrás
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" className={styles.button} onClick={next}>
            Continuar
          </button>
        ) : (
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        )}
      </div>
    </form>
  );
}
