"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import EnvioModal from "./EnvioModal";
import styles from "./InscripcionForm.module.css";
import {
  formatearCelular,
  normalizarCelular,
  normalizarParrafo,
  normalizarPerfil,
  normalizarTexto,
  validarBarrio,
  validarCelular,
  validarCorreo,
  validarNombre,
  validarOtra,
} from "./validation";
import {
  CELULAR,
  ENTERASTE,
  FORMACION,
  HABILIDADES,
  IMPEDIMENTOS,
  MOTIVACIONES,
  MUNICIPIOS,
  PARTICIPACION,
  RANGOS,
  REDES,
  TIEMPOS,
  esMunicipioValido,
  normalizarMunicipio,
} from "@/lib/opciones";

const STEPS = [
  { tag: "Perfil" },
  { tag: "Talento" },
  { tag: "Formación" },
  { tag: "Participación" },
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
  error,
  ...props
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> (opcional)</span>}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

function MunicipioField({
  value,
  error,
  onChange,
  onBlur,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const query = normalizarMunicipio(value);
  const results = query
    ? MUNICIPIOS.filter((item) =>
        normalizarMunicipio(item.nombre).includes(query),
      )
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
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="municipios-lista"
          aria-autocomplete="list"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "municipio-error" : "municipio-hint"}
          autoComplete="off"
          spellCheck={false}
          maxLength={60}
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
            onBlur?.();
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
      <span id="municipio-hint" className={styles.hint}>
        Busca entre los 125 municipios de Antioquia.
      </span>
      {error && (
        <span id="municipio-error" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

function CheckGroup({
  name,
  legend,
  hint,
  options,
  values,
  error,
  onToggle,
  children,
}: {
  name: string;
  legend: string;
  hint?: string;
  options: string[];
  values: string[];
  error?: string;
  onToggle: (value: string) => void;
  children?: ReactNode;
}) {
  return (
    <fieldset
      id={name}
      className={styles.group}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    >
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
      {hint && <span className={styles.hint}>{hint}</span>}
      {error && (
        <span id={`${name}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </fieldset>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  error,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset
      id={name}
      className={styles.group}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    >
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
      {error && (
        <span id={`${name}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </fieldset>
  );
}

export default function InscripcionForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estadoEnvio, setEstadoEnvio] = useState<
    "idle" | "enviando" | "exito" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Data>(key: K, value: Data[K]) =>
    setData((current) => ({ ...current, [key]: value } as Data));

  const setFieldError = (key: string, message: string | null) =>
    setErrors((current) => {
      const nextErrors = { ...current };
      if (message) nextErrors[key] = message;
      else delete nextErrors[key];
      return nextErrors;
    });

  const toggleList = (values: string[], value: string) =>
    values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

  const toggle = (
    key: "habilidades" | "formacion" | "impedimentos" | "motivaciones",
    value: string,
  ) => {
    setData((current) => {
      const list = toggleList(current[key], value);
      if (key === "habilidades") return { ...current, habilidades: list };
      if (key === "formacion") return { ...current, formacion: list };
      if (key === "impedimentos") return { ...current, impedimentos: list };
      return { ...current, motivaciones: list };
    });
    setFieldError(key, null);
  };

  const toggleRedes = (value: string) => {
    if (value === "Ninguna de las anteriores") {
      set("redes", data.redes.includes(value) ? [] : [value]);
      setFieldError("redes", null);
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
    setFieldError("redes", null);
  };

  const enfocarError = (key: string) => {
    requestAnimationFrame(() => {
      const field = formRef.current?.querySelector<HTMLElement>(`#${key}`);
      const target =
        field instanceof HTMLFieldSetElement
          ? field.querySelector<HTMLElement>("input")
          : field;
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      target?.focus();
    });
  };

  const validarPaso1 = () => {
    const nextErrors: Record<string, string> = {};
    if (!validarNombre(data.nombre)) {
      nextErrors.nombre = "Escribe tu nombre y al menos un apellido.";
    }
    if (!data.rangoEdad) {
      nextErrors.rangoEdad = "Selecciona un rango de edad.";
    }
    if (!validarCelular(data.celular)) {
      nextErrors.celular = "Escribe un celular o fijo de 10 dígitos.";
    }
    if (!validarCorreo(data.correo)) {
      nextErrors.correo = "Escribe un correo válido.";
    }
    if (!normalizarTexto(data.municipio)) {
      nextErrors.municipio = "Escribe tu municipio.";
    } else if (!esMunicipioValido(data.municipio)) {
      nextErrors.municipio = "Selecciona un municipio de la lista.";
    }
    if (!validarBarrio(data.barrioVive)) {
      nextErrors.barrioVive = "Escribe tu barrio o vereda.";
    }
    if (!validarBarrio(data.barrioActua)) {
      nextErrors.barrioActua = "Escribe tu barrio o vereda.";
    }
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (!first) return true;
    enfocarError(first);
    return false;
  };

  const validarPaso2 = () => {
    const nextErrors: Record<string, string> = {};
    if (data.habilidades.length === 0) {
      nextErrors.habilidades = "Selecciona al menos una opción.";
    }
    if (data.habilidades.includes("Otra") && !validarOtra(data.habilidadOtra)) {
      nextErrors.habilidadOtra = "Escribe cuál.";
    }
    if (!data.participacion) {
      nextErrors.participacion = "Selecciona una opción.";
    }
    if (data.redes.length === 0) {
      nextErrors.redes = "Selecciona al menos una opción.";
    }
    if (!data.celularContenido) {
      nextErrors.celularContenido = "Selecciona una opción.";
    }
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (!first) return true;
    enfocarError(first);
    return false;
  };

  const validarPaso3 = () => {
    const nextErrors: Record<string, string> = {};
    if (data.formacion.length === 0) {
      nextErrors.formacion = "Selecciona al menos una opción.";
    }
    if (data.formacion.includes("Otra") && !validarOtra(data.formacionOtra)) {
      nextErrors.formacionOtra = "Escribe cuál.";
    }
    if (data.impedimentos.length === 0) {
      nextErrors.impedimentos = "Selecciona al menos una opción.";
    }
    if (
      data.impedimentos.includes("Otro") &&
      !validarOtra(data.impedimentoOtro)
    ) {
      nextErrors.impedimentoOtro = "Escribe cuál.";
    }
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (!first) return true;
    enfocarError(first);
    return false;
  };

  const validarPaso4 = () => {
    const nextErrors: Record<string, string> = {};
    if (data.motivaciones.length === 0) {
      nextErrors.motivaciones = "Selecciona al menos una opción.";
    }
    if (!data.tiempo) {
      nextErrors.tiempo = "Selecciona una opción.";
    }
    if (data.idea.length > 500) {
      nextErrors.idea = "Máximo 500 caracteres.";
    }
    if (!data.enteraste) {
      nextErrors.enteraste = "Selecciona una opción.";
    }
    if (!data.autorizacion) {
      nextErrors.autorizacion =
        "Debes aceptar la política de tratamiento de datos.";
    }
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (!first) return true;
    enfocarError(first);
    return false;
  };

  const onBlurNombre = () => {
    const value = normalizarTexto(data.nombre);
    if (value !== data.nombre) set("nombre", value);
    if (!value) return setFieldError("nombre", null);
    setFieldError(
      "nombre",
      validarNombre(value)
        ? null
        : "Escribe tu nombre y al menos un apellido.",
    );
  };

  const onBlurCelular = () => {
    const value = formatearCelular(data.celular);
    if (value !== data.celular) set("celular", value);
    if (!value) return setFieldError("celular", null);
    setFieldError(
      "celular",
      validarCelular(value) ? null : "Escribe un celular o fijo de 10 dígitos.",
    );
  };

  const onBlurCorreo = () => {
    const value = data.correo.trim().toLowerCase();
    if (value !== data.correo) set("correo", value);
    if (!value) return setFieldError("correo", null);
    setFieldError("correo", validarCorreo(value) ? null : "Escribe un correo válido.");
  };

  const onBlurMunicipio = () => {
    const value = normalizarTexto(data.municipio);
    if (value !== data.municipio) set("municipio", value);
    if (!value) return setFieldError("municipio", null);
    setFieldError(
      "municipio",
      esMunicipioValido(value) ? null : "Selecciona un municipio de la lista.",
    );
  };

  const onBlurBarrio = (key: "barrioVive" | "barrioActua") => {
    const value = normalizarTexto(data[key]);
    if (value !== data[key]) set(key, value);
    if (!value) return setFieldError(key, null);
    setFieldError(
      key,
      validarBarrio(value) ? null : "Escribe tu barrio o vereda.",
    );
  };

  const onBlurHabilidadOtra = () => {
    if (!data.habilidades.includes("Otra")) return;
    const value = normalizarTexto(data.habilidadOtra);
    if (value !== data.habilidadOtra) set("habilidadOtra", value);
    setFieldError("habilidadOtra", validarOtra(value) ? null : "Escribe cuál.");
  };

  const onBlurExperiencia = () => {
    const value = normalizarParrafo(data.experiencia);
    if (value !== data.experiencia) set("experiencia", value);
    setFieldError(
      "experiencia",
      value.length > 500 ? "Máximo 500 caracteres." : null,
    );
  };

  const onBlurFormacionOtra = () => {
    if (!data.formacion.includes("Otra")) return;
    const value = normalizarTexto(data.formacionOtra);
    if (value !== data.formacionOtra) set("formacionOtra", value);
    setFieldError("formacionOtra", validarOtra(value) ? null : "Escribe cuál.");
  };

  const onBlurAporte = () => {
    const value = normalizarParrafo(data.aporte);
    if (value !== data.aporte) set("aporte", value);
    setFieldError(
      "aporte",
      value.length > 500 ? "Máximo 500 caracteres." : null,
    );
  };

  const onBlurImpedimentoOtro = () => {
    if (!data.impedimentos.includes("Otro")) return;
    const value = normalizarTexto(data.impedimentoOtro);
    if (value !== data.impedimentoOtro) set("impedimentoOtro", value);
    setFieldError(
      "impedimentoOtro",
      validarOtra(value) ? null : "Escribe cuál.",
    );
  };

  const onBlurIdea = () => {
    const value = normalizarParrafo(data.idea);
    if (value !== data.idea) set("idea", value);
    setFieldError("idea", value.length > 500 ? "Máximo 500 caracteres." : null);
  };

  const onBlurPerfil = () => {
    const value = normalizarPerfil(data.perfilSocial);
    if (value !== data.perfilSocial) set("perfilSocial", value);
  };

  const next = () => {
    if (step === 0) {
      if (!validarPaso1()) return;
    } else if (step === 1) {
      if (!validarPaso2()) return;
    } else if (step === 2) {
      if (!validarPaso3()) return;
    } else if (!validarPaso4()) {
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const prev = () => setStep((current) => Math.max(current - 1, 0));

  const enviar = async () => {
    if (!validarPaso4()) return;
    setEstadoEnvio("enviando");

    try {
      const response = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          nombre: normalizarTexto(data.nombre),
          celular: normalizarCelular(data.celular),
          correo: data.correo.trim().toLowerCase(),
          municipio: normalizarTexto(data.municipio),
          barrioVive: normalizarTexto(data.barrioVive),
          barrioActua: normalizarTexto(data.barrioActua),
          experiencia: normalizarParrafo(data.experiencia),
          aporte: normalizarParrafo(data.aporte),
          idea: normalizarParrafo(data.idea),
          perfilSocial: normalizarPerfil(data.perfilSocial),
          empresa: honeypotRef.current?.value ?? "",
        }),
      });

      if (!response.ok) throw new Error("Envío fallido");
      setEstadoEnvio("exito");
    } catch {
      setEstadoEnvio("error");
    }
  };

  const cerrarExito = () => {
    setEstadoEnvio("idle");
    setData(INITIAL);
    setErrors({});
    setStep(0);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 3) return;
    void enviar();
  };

  return (
    <>
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
    >
      <input
        ref={honeypotRef}
        type="text"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />
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
        <span className={styles.stepNumero}>Paso {step + 1}</span>
        <span className={styles.stepTag}>{STEPS[step].tag}</span>
      </div>

      <div className={styles.stepBody}>
        {step === 0 && (
          <>
            <TextField
              id="nombre"
              label="Nombre y apellidos"
              placeholder="Ej. Juan Pérez"
              autoComplete="name"
              maxLength={60}
              value={data.nombre}
              error={errors.nombre}
              onChange={(event) => {
                set("nombre", event.target.value);
                setFieldError("nombre", null);
              }}
              onBlur={onBlurNombre}
              required
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="rangoEdad">
                ¿En qué rango de edad estás?
              </label>
              <select
                id="rangoEdad"
                className={`${styles.select} ${
                  errors.rangoEdad ? styles.inputError : ""
                }`}
                aria-invalid={errors.rangoEdad ? true : undefined}
                aria-describedby={
                  errors.rangoEdad ? "rangoEdad-error" : undefined
                }
                value={data.rangoEdad}
                onChange={(event) => {
                  set("rangoEdad", event.target.value);
                  setFieldError("rangoEdad", null);
                }}
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
              {errors.rangoEdad ? (
                <span id="rangoEdad-error" className={styles.error}>
                  {errors.rangoEdad}
                </span>
              ) : (
                <span className={styles.hint}>Solo mayores de 18 años.</span>
              )}
            </div>
            <TextField
              id="celular"
              label="Número de celular / WhatsApp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="300 000 0000"
              value={data.celular}
              error={errors.celular}
              onChange={(event) => {
                set("celular", event.target.value);
                setFieldError("celular", null);
              }}
              onBlur={onBlurCelular}
              required
            />
            <TextField
              id="correo"
              label="Correo electrónico"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={120}
              placeholder="tu@email.com"
              value={data.correo}
              error={errors.correo}
              onChange={(event) => {
                set("correo", event.target.value);
                setFieldError("correo", null);
              }}
              onBlur={onBlurCorreo}
              required
            />
            <MunicipioField
              value={data.municipio}
              error={errors.municipio}
              onChange={(value) => {
                set("municipio", value);
                setFieldError("municipio", null);
              }}
              onBlur={onBlurMunicipio}
            />
            <TextField
              id="barrioVive"
              label="¿En qué barrio o vereda vives?"
              placeholder="Barrio o vereda"
              maxLength={60}
              value={data.barrioVive}
              error={errors.barrioVive}
              onChange={(event) => {
                set("barrioVive", event.target.value);
                setFieldError("barrioVive", null);
              }}
              onBlur={() => onBlurBarrio("barrioVive")}
              required
            />
            <TextField
              id="barrioActua"
              label="¿En qué barrio, comuna, corregimiento o vereda desarrollas principalmente tus actividades?"
              placeholder="Barrio, comuna, corregimiento o vereda"
              maxLength={60}
              value={data.barrioActua}
              error={errors.barrioActua}
              onChange={(event) => {
                set("barrioActua", event.target.value);
                setFieldError("barrioActua", null);
              }}
              onBlur={() => onBlurBarrio("barrioActua")}
              required
            />
          </>
        )}

        {step === 1 && (
          <>
            <CheckGroup
              name="habilidades"
              legend="¿Cuál de estas áreas describe mejor tus habilidades o experiencia?"
              options={HABILIDADES}
              values={data.habilidades}
              error={errors.habilidades}
              onToggle={(value) => toggle("habilidades", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.habilidades.includes("Otra")}
                  onChange={() => {
                    toggle("habilidades", "Otra");
                    setFieldError("habilidadOtra", null);
                  }}
                />
                <span>Otra</span>
              </label>
              {data.habilidades.includes("Otra") && (
                <div className={styles.extraField}>
                  <input
                    id="habilidadOtra"
                    className={`${styles.input} ${styles.extra} ${
                      errors.habilidadOtra ? styles.inputError : ""
                    }`}
                    placeholder="¿Cuál?"
                    maxLength={60}
                    value={data.habilidadOtra}
                    aria-invalid={errors.habilidadOtra ? true : undefined}
                    aria-describedby={
                      errors.habilidadOtra ? "habilidadOtra-error" : undefined
                    }
                    onChange={(event) => {
                      set("habilidadOtra", event.target.value);
                      setFieldError("habilidadOtra", null);
                    }}
                    onBlur={onBlurHabilidadOtra}
                  />
                  {errors.habilidadOtra && (
                    <span id="habilidadOtra-error" className={styles.error}>
                      {errors.habilidadOtra}
                    </span>
                  )}
                </div>
              )}
            </CheckGroup>
            <RadioGroup
              legend="¿Actualmente participas en alguna organización, iniciativa o proyecto comunitario?"
              name="participacion"
              options={PARTICIPACION}
              value={data.participacion}
              error={errors.participacion}
              onChange={(value) => {
                set("participacion", value);
                setFieldError("participacion", null);
              }}
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="experiencia">
                Si tienes experiencia en liderazgo, trabajo comunitario,
                comunicación o proyectos, cuéntanos brevemente.
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="experiencia"
                className={`${styles.textarea} ${
                  errors.experiencia ? styles.inputError : ""
                }`}
                placeholder="Cuéntanos brevemente"
                maxLength={500}
                value={data.experiencia}
                aria-invalid={errors.experiencia ? true : undefined}
                aria-describedby={
                  errors.experiencia ? "experiencia-error" : undefined
                }
                onChange={(event) => {
                  set("experiencia", event.target.value);
                  setFieldError("experiencia", null);
                }}
                onBlur={onBlurExperiencia}
              />
              <span className={styles.counter}>
                {data.experiencia.length}/500
              </span>
              {errors.experiencia && (
                <span id="experiencia-error" className={styles.error}>
                  {errors.experiencia}
                </span>
              )}
            </div>
            <CheckGroup
              name="redes"
              legend="¿Qué redes sociales utilizas actualmente?"
              options={REDES}
              values={data.redes}
              error={errors.redes}
              onToggle={toggleRedes}
            />
            <RadioGroup
              legend="¿Tienes un celular con el que puedas tomar fotos, grabar videos y crear contenido?"
              name="celularContenido"
              options={CELULAR}
              value={data.celularContenido}
              error={errors.celularContenido}
              onChange={(value) => {
                set("celularContenido", value);
                setFieldError("celularContenido", null);
              }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <CheckGroup
              name="formacion"
              legend="¿En cuáles de estas áreas te gustaría formarte?"
              options={FORMACION}
              values={data.formacion}
              error={errors.formacion}
              onToggle={(value) => toggle("formacion", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.formacion.includes("Otra")}
                  onChange={() => {
                    toggle("formacion", "Otra");
                    setFieldError("formacionOtra", null);
                  }}
                />
                <span>Otra</span>
              </label>
              {data.formacion.includes("Otra") && (
                <div className={styles.extraField}>
                  <input
                    id="formacionOtra"
                    className={`${styles.input} ${styles.extra} ${
                      errors.formacionOtra ? styles.inputError : ""
                    }`}
                    placeholder="¿Cuál?"
                    maxLength={60}
                    value={data.formacionOtra}
                    aria-invalid={errors.formacionOtra ? true : undefined}
                    aria-describedby={
                      errors.formacionOtra ? "formacionOtra-error" : undefined
                    }
                    onChange={(event) => {
                      set("formacionOtra", event.target.value);
                      setFieldError("formacionOtra", null);
                    }}
                    onBlur={onBlurFormacionOtra}
                  />
                  {errors.formacionOtra && (
                    <span id="formacionOtra-error" className={styles.error}>
                      {errors.formacionOtra}
                    </span>
                  )}
                </div>
              )}
            </CheckGroup>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="aporte">
                ¿Qué te gustaría aportar a tu municipio o comunidad?
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="aporte"
                className={`${styles.textarea} ${
                  errors.aporte ? styles.inputError : ""
                }`}
                placeholder="Cuéntanos tu idea"
                maxLength={500}
                value={data.aporte}
                aria-invalid={errors.aporte ? true : undefined}
                aria-describedby={errors.aporte ? "aporte-error" : undefined}
                onChange={(event) => {
                  set("aporte", event.target.value);
                  setFieldError("aporte", null);
                }}
                onBlur={onBlurAporte}
              />
              <span className={styles.counter}>{data.aporte.length}/500</span>
              {errors.aporte && (
                <span id="aporte-error" className={styles.error}>
                  {errors.aporte}
                </span>
              )}
            </div>
            <CheckGroup
              name="impedimentos"
              legend="¿Qué te ha impedido desarrollar tus ideas o asumir un papel de liderazgo hasta ahora?"
              hint="Si no encuentras tu caso, marca «Otro» y escríbelo."
              options={IMPEDIMENTOS}
              values={data.impedimentos}
              error={errors.impedimentos}
              onToggle={(value) => toggle("impedimentos", value)}
            >
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={data.impedimentos.includes("Otro")}
                  onChange={() => {
                    toggle("impedimentos", "Otro");
                    setFieldError("impedimentoOtro", null);
                  }}
                />
                <span>Otro</span>
              </label>
              {data.impedimentos.includes("Otro") && (
                <div className={styles.extraField}>
                  <input
                    id="impedimentoOtro"
                    className={`${styles.input} ${styles.extra} ${
                      errors.impedimentoOtro ? styles.inputError : ""
                    }`}
                    placeholder="¿Cuál?"
                    maxLength={60}
                    value={data.impedimentoOtro}
                    aria-invalid={errors.impedimentoOtro ? true : undefined}
                    aria-describedby={
                      errors.impedimentoOtro
                        ? "impedimentoOtro-error"
                        : undefined
                    }
                    onChange={(event) => {
                      set("impedimentoOtro", event.target.value);
                      setFieldError("impedimentoOtro", null);
                    }}
                    onBlur={onBlurImpedimentoOtro}
                  />
                  {errors.impedimentoOtro && (
                    <span id="impedimentoOtro-error" className={styles.error}>
                      {errors.impedimentoOtro}
                    </span>
                  )}
                </div>
              )}
            </CheckGroup>
          </>
        )}

        {step === 3 && (
          <>
            <CheckGroup
              name="motivaciones"
              legend="¿Cómo te gustaría participar en Generación De-Bate?"
              options={MOTIVACIONES}
              values={data.motivaciones}
              error={errors.motivaciones}
              onToggle={(value) => toggle("motivaciones", value)}
            />
            <RadioGroup
              legend="¿Cuánto tiempo podrías dedicar a estas actividades?"
              name="tiempo"
              options={TIEMPOS}
              value={data.tiempo}
              error={errors.tiempo}
              onChange={(value) => {
                set("tiempo", value);
                setFieldError("tiempo", null);
              }}
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="idea">
                ¿Tienes alguna idea, proyecto o iniciativa que quisieras
                desarrollar?
                <span className={styles.optional}> (opcional)</span>
              </label>
              <textarea
                id="idea"
                className={`${styles.textarea} ${
                  errors.idea ? styles.inputError : ""
                }`}
                placeholder="Cuéntanos sobre tu idea"
                maxLength={500}
                value={data.idea}
                aria-invalid={errors.idea ? true : undefined}
                aria-describedby={errors.idea ? "idea-error" : undefined}
                onChange={(event) => {
                  set("idea", event.target.value);
                  setFieldError("idea", null);
                }}
                onBlur={onBlurIdea}
              />
              <span className={styles.counter}>{data.idea.length}/500</span>
              {errors.idea && (
                <span id="idea-error" className={styles.error}>
                  {errors.idea}
                </span>
              )}
            </div>
            <TextField
              id="perfilSocial"
              label="Comparte tu perfil de Instagram, TikTok, LinkedIn u otra red, si deseas."
              placeholder="@usuario"
              autoComplete="off"
              maxLength={100}
              value={data.perfilSocial}
              onChange={(event) => set("perfilSocial", event.target.value)}
              onBlur={onBlurPerfil}
              optional
            />
            <RadioGroup
              legend="¿Cómo te enteraste de Generación De-Bate?"
              name="enteraste"
              options={ENTERASTE}
              value={data.enteraste}
              error={errors.enteraste}
              onChange={(value) => {
                set("enteraste", value);
                setFieldError("enteraste", null);
              }}
            />
            <div className={styles.field}>
              <label className={styles.auth} htmlFor="autorizacion">
                <input
                  id="autorizacion"
                  type="checkbox"
                  className={styles.check}
                  checked={data.autorizacion}
                  aria-invalid={errors.autorizacion ? true : undefined}
                  aria-describedby={
                    errors.autorizacion ? "autorizacion-error" : undefined
                  }
                  onChange={(event) => {
                    set("autorizacion", event.target.checked);
                    setFieldError("autorizacion", null);
                  }}
                  required
                />
                <span>
                  Autorizo el tratamiento de mis datos personales conforme a la{" "}
                  <a href="#">política de tratamiento de datos</a>.
                </span>
              </label>
              {errors.autorizacion && (
                <span id="autorizacion-error" className={styles.error}>
                  {errors.autorizacion}
                </span>
              )}
            </div>
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
          <button
            type="button"
            className={`${styles.button} ctaBtn`}
            onClick={next}
          >
            Continuar
          </button>
        ) : (
          <button
            type="submit"
            className={`${styles.button} ctaBtn`}
            disabled={estadoEnvio === "enviando"}
          >
            {estadoEnvio === "enviando" ? "Enviando…" : "Enviar"}
          </button>
        )}
      </div>
    </form>
    <AnimatePresence>
      {estadoEnvio === "exito" && (
        <EnvioModal
          key="exito"
          variant="exito"
          onClose={cerrarExito}
        />
      )}
      {estadoEnvio === "error" && (
        <EnvioModal
          key="error"
          variant="error"
          onClose={() => setEstadoEnvio("idle")}
          onRetry={enviar}
        />
      )}
    </AnimatePresence>
    </>
  );
}
