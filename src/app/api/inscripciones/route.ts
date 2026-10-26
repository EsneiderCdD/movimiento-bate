import { randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";
import {
  guardarInscripcion,
  type Inscripcion,
  type NuevaInscripcion,
} from "@/lib/inscripciones";
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
import {
  CELULAR,
  ENTERASTE,
  FORMACION,
  HABILIDADES,
  IMPEDIMENTOS,
  MOTIVACIONES,
  OPCION_OTRA,
  OPCION_OTRO,
  PARTICIPACION,
  RANGOS,
  REDES,
  TIEMPOS,
  esListaValida,
  esMunicipioValido,
} from "@/lib/opciones";

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

  const largo = Number(request.headers.get("content-length") ?? "0");
  if (largo > 32 * 1024) {
    return NextResponse.json(
      { ok: false, error: "Cuerpo demasiado grande." },
      { status: 413 },
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
    !RANGOS.includes(rangoEdad) ||
    !validarCelular(celular) ||
    !validarCorreo(correo) ||
    !esMunicipioValido(municipio) ||
    !validarBarrio(barrioVive) ||
    !validarBarrio(barrioActua) ||
    habilidades.length === 0 ||
    !esListaValida(habilidades, HABILIDADES, [OPCION_OTRA]) ||
    (habilidades.includes(OPCION_OTRA) && !validarOtra(habilidadOtra)) ||
    !PARTICIPACION.includes(participacion) ||
    experiencia.length > 500 ||
    redes.length === 0 ||
    !esListaValida(redes, REDES) ||
    !CELULAR.includes(celularContenido) ||
    formacion.length === 0 ||
    !esListaValida(formacion, FORMACION, [OPCION_OTRA]) ||
    (formacion.includes(OPCION_OTRA) && !validarOtra(formacionOtra)) ||
    aporte.length > 500 ||
    impedimentos.length === 0 ||
    !esListaValida(impedimentos, IMPEDIMENTOS, [OPCION_OTRO]) ||
    (impedimentos.includes(OPCION_OTRO) && !validarOtra(impedimentoOtro)) ||
    motivaciones.length === 0 ||
    !esListaValida(motivaciones, MOTIVACIONES) ||
    !TIEMPOS.includes(tiempo) ||
    idea.length > 500 ||
    perfilSocial.length > 100 ||
    !ENTERASTE.includes(enteraste) ||
    !autorizacion;

  if (invalido) {
    return NextResponse.json(
      { ok: false, error: "Revisa los datos del formulario." },
      { status: 400 },
    );
  }

  const nueva: NuevaInscripcion = {
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

  const guardada = await guardarInscripcion(nueva).catch((error) => {
    console.error("Error al guardar la inscripción:", error);
    return null;
  });

  if (!guardada) {
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar la inscripción." },
      { status: 500 },
    );
  }

  const registro: Inscripcion = {
    ...nueva,
    id: String(guardada.id),
    enviadoEn: (guardada.createdAt ?? new Date()).toISOString(),
    origen: "voluntariado",
  };

  after(async () => {
    try {
      await enviarCorreoInscripcion(registro);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  });

  return NextResponse.json({ ok: true, id: guardada.id }, { status: 201 });
}
