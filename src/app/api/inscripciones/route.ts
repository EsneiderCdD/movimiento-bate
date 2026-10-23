import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { guardarInscripcion, type Inscripcion } from "@/lib/inscripciones";
import {
  normalizarCelular,
  normalizarParrafo,
  normalizarPerfil,
  normalizarTexto,
  validarBarrio,
  validarCelular,
  validarCorreo,
  validarNombre,
  validarOtra,
} from "@/components/specific/voluntariado/validation";

export const runtime = "nodejs";

const texto = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const lista = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido." },
      { status: 400 },
    );
  }

  const raw = body as Record<string, unknown>;

  const nombre = normalizarTexto(texto(raw.nombre));
  const rangoEdad = texto(raw.rangoEdad);
  const celular = normalizarCelular(texto(raw.celular));
  const correo = texto(raw.correo).toLowerCase();
  const municipio = normalizarTexto(texto(raw.municipio));
  const barrioVive = normalizarTexto(texto(raw.barrioVive));
  const barrioActua = normalizarTexto(texto(raw.barrioActua));
  const habilidades = lista(raw.habilidades);
  const habilidadOtra = normalizarTexto(texto(raw.habilidadOtra));
  const participacion = texto(raw.participacion);
  const experiencia = normalizarParrafo(texto(raw.experiencia));
  const redes = lista(raw.redes);
  const celularContenido = texto(raw.celularContenido);
  const formacion = lista(raw.formacion);
  const formacionOtra = normalizarTexto(texto(raw.formacionOtra));
  const aporte = normalizarParrafo(texto(raw.aporte));
  const impedimentos = lista(raw.impedimentos);
  const impedimentoOtro = normalizarTexto(texto(raw.impedimentoOtro));
  const motivaciones = lista(raw.motivaciones);
  const tiempo = texto(raw.tiempo);
  const idea = normalizarParrafo(texto(raw.idea));
  const perfilSocial = normalizarPerfil(texto(raw.perfilSocial));
  const enteraste = texto(raw.enteraste);
  const autorizacion = raw.autorizacion === true;

  const invalido =
    !validarNombre(nombre) ||
    !rangoEdad ||
    !validarCelular(celular) ||
    !validarCorreo(correo) ||
    !municipio ||
    municipio.length > 60 ||
    !validarBarrio(barrioVive) ||
    !validarBarrio(barrioActua) ||
    habilidades.length === 0 ||
    (habilidades.includes("Otra") && !validarOtra(habilidadOtra)) ||
    !participacion ||
    experiencia.length > 500 ||
    redes.length === 0 ||
    !celularContenido ||
    formacion.length === 0 ||
    (formacion.includes("Otra") && !validarOtra(formacionOtra)) ||
    aporte.length > 500 ||
    impedimentos.length === 0 ||
    (impedimentos.includes("Otro") && !validarOtra(impedimentoOtro)) ||
    motivaciones.length === 0 ||
    !tiempo ||
    idea.length > 500 ||
    perfilSocial.length > 100 ||
    !enteraste ||
    !autorizacion;

  if (invalido) {
    return NextResponse.json(
      { ok: false, error: "Revisa los datos del formulario." },
      { status: 400 },
    );
  }

  const registro: Inscripcion = {
    id: randomUUID(),
    enviadoEn: new Date().toISOString(),
    origen: "voluntariado",
    nombre,
    rangoEdad,
    celular,
    correo,
    municipio,
    barrioVive,
    barrioActua,
    habilidades,
    habilidadOtra,
    participacion,
    experiencia,
    redes,
    celularContenido,
    formacion,
    formacionOtra,
    aporte,
    impedimentos,
    impedimentoOtro,
    motivaciones,
    tiempo,
    idea,
    perfilSocial,
    enteraste,
    autorizacion,
  };

  try {
    await guardarInscripcion(registro);
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar la inscripción." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: registro.id }, { status: 201 });
}
