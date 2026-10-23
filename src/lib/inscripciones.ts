import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export type Inscripcion = {
  id: string;
  enviadoEn: string;
  origen: "voluntariado";
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

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "inscripciones.ndjson");

export async function guardarInscripcion(inscripcion: Inscripcion) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, `${JSON.stringify(inscripcion)}\n`, "utf8");
}
