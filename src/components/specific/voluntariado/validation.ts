export const normalizarTexto = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '\-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const validarNombre = (value: string) => {
  const nombre = normalizarTexto(value);
  if (nombre.length < 5 || nombre.length > 60) return false;
  const palabras = nombre.split(" ");
  if (palabras.length < 2) return false;
  if (palabras.some((palabra) => palabra.replace(/[-']/g, "").length < 2)) {
    return false;
  }
  return NOMBRE.test(nombre);
};

export const validarBarrio = (value: string) => {
  const barrio = normalizarTexto(value);
  return barrio.length >= 3 && barrio.length <= 60;
};

export const normalizarParrafo = (value: string) =>
  value
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const validarOtra = (value: string) => {
  const otra = normalizarTexto(value);
  return otra.length >= 3 && otra.length <= 60;
};

export const normalizarPerfil = (value: string) =>
  value.trim().replace(/^@+/, "").trim();

export const validarCorreo = (value: string) => {
  const correo = value.trim();
  return correo.length <= 120 && CORREO.test(correo);
};

export const normalizarCelular = (value: string) => {
  const digitos = value.replace(/\D/g, "");
  return digitos.length === 12 && digitos.startsWith("57")
    ? digitos.slice(2)
    : digitos;
};

export const validarCelular = (value: string) => {
  const nacional = normalizarCelular(value);
  if (nacional.length !== 10) return false;
  if (!/^[36]/.test(nacional)) return false;
  return !/^(\d)\1{9}$/.test(nacional);
};

export const formatearCelular = (value: string) => {
  const digitos = value.replace(/\D/g, "");
  const tienePrefijo =
    /^\s*\+/.test(value) || (digitos.startsWith("57") && digitos.length === 12);
  const nacional = normalizarCelular(value);
  if (nacional.length !== 10) return value.trim();
  const cuerpo = `${nacional.slice(0, 3)} ${nacional.slice(3, 6)} ${nacional.slice(6)}`;
  return tienePrefijo ? `+57 ${cuerpo}` : cuerpo;
};
