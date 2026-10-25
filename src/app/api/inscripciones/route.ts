import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { guardarInscripcion, type Inscripcion } from "@/lib/inscripciones";
import { enviarCorreoInscripcion } from "@/lib/emailInscripcion";
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

const VENTANA_MS = 6 * 60 * 60 * 1000;
const MAX_ENVIOS = 5;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function limiteExcedido(ip: string) {
  const ahora = Date.now();
  const entrada = rateLimit.get(ip);

  if (!entrada || entrada.resetAt <= ahora) {
    rateLimit.set(ip, { count: 1, resetAt: ahora + VENTANA_MS });
    return false;
  }

  entrada.count += 1;
  return entrada.count > MAX_ENVIOS;
}

function ipDelRequest(request: Request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "desconocido";
}

export async function POST(request: Request) {
  const ip = ipDelRequest(request);
  if (limiteExcedido(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes." },
      { status: 429 },
    );
  }

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

  if (texto(raw.empresa)) {
    return NextResponse.json({ ok: true, id: randomUUID() }, { status: 201 });
  }

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
    await enviarCorreoInscripcion(registro);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    const mensaje = error instanceof Error ? error.message : "";
    const status = /RESEND_API_KEY|INSCRIPCIONES_TO/.test(mensaje) ? 503 : 502;
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar la inscripción." },
      { status },
    );
  }

  if (!process.env.VERCEL) {
    try {
      await guardarInscripcion(registro);
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  }

  return NextResponse.json({ ok: true, id: registro.id }, { status: 201 });
}
