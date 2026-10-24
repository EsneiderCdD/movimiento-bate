import type { Inscripcion } from "@/lib/inscripciones";
import { getResend } from "@/lib/resend";

const escapar = (valor: string) =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const bloque = (valor: string) => escapar(valor).replace(/\n/g, "<br/>");

const formatearNumero = (digitos: string) =>
  digitos.length === 10
    ? `+57 ${digitos.slice(0, 3)} ${digitos.slice(3, 6)} ${digitos.slice(6)}`
    : digitos;

const fecha = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(new Date(iso));

type Fila = { etiqueta: string; valor: string | string[] };

type Seccion = { titulo: string; filas: Fila[] };

const filaHtml = ({ etiqueta, valor }: Fila) => {
  const texto = Array.isArray(valor) ? valor.join(", ") : valor;
  if (!texto.trim()) return "";
  return `<tr>
    <td style="width:38%;padding:7px 12px 7px 0;vertical-align:top;font-size:11px;line-height:1.4;letter-spacing:0.5px;text-transform:uppercase;color:#7a746a;">${escapar(etiqueta)}</td>
    <td style="padding:7px 0;vertical-align:top;font-size:14px;line-height:1.5;color:#15130f;border-bottom:1px solid #ece7db;">${bloque(texto)}</td>
  </tr>`;
};

const seccionHtml = ({ titulo, filas }: Seccion) => {
  const cuerpo = filas.map(filaHtml).join("");
  if (!cuerpo.trim()) return "";
  return `<tr><td style="padding:18px 24px 0;">
    <h2 style="margin:0 0 6px;padding-bottom:6px;border-bottom:2px solid #FFD200;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#E11D2A;">${escapar(titulo)}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cuerpo}</table>
  </td></tr>`;
};

const filaTexto = ({ etiqueta, valor }: Fila) => {
  const texto = Array.isArray(valor) ? valor.join(", ") : valor;
  return texto.trim() ? `${etiqueta}: ${texto}\n` : "";
};

export function armarCorreoInscripcion(registro: Inscripcion) {
  const secciones: Seccion[] = [
    {
      titulo: "Perfil",
      filas: [
        { etiqueta: "Nombre y apellidos", valor: registro.nombre },
        { etiqueta: "Rango de edad", valor: registro.rangoEdad },
        {
          etiqueta: "Celular / WhatsApp",
          valor: formatearNumero(registro.celular),
        },
        { etiqueta: "Correo", valor: registro.correo },
        { etiqueta: "Municipio", valor: registro.municipio },
        { etiqueta: "Barrio o vereda donde vive", valor: registro.barrioVive },
        {
          etiqueta: "Barrio o comuna donde actúa",
          valor: registro.barrioActua,
        },
      ],
    },
    {
      titulo: "Talento",
      filas: [
        { etiqueta: "Habilidades", valor: registro.habilidades },
        { etiqueta: "Participación actual", valor: registro.participacion },
        { etiqueta: "Experiencia", valor: registro.experiencia },
        { etiqueta: "Redes sociales", valor: registro.redes },
        {
          etiqueta: "Celular para crear contenido",
          valor: registro.celularContenido,
        },
      ],
    },
    {
      titulo: "Formación",
      filas: [
        { etiqueta: "Áreas de interés", valor: registro.formacion },
        { etiqueta: "Otra formación", valor: registro.formacionOtra },
        { etiqueta: "Aporte", valor: registro.aporte },
        { etiqueta: "Impedimentos", valor: registro.impedimentos },
        { etiqueta: "Otro impedimento", valor: registro.impedimentoOtro },
      ],
    },
    {
      titulo: "Participación",
      filas: [
        { etiqueta: "Motivaciones", valor: registro.motivaciones },
        { etiqueta: "Tiempo disponible", valor: registro.tiempo },
        { etiqueta: "Idea o proyecto", valor: registro.idea },
        { etiqueta: "Perfil social", valor: registro.perfilSocial },
        { etiqueta: "Se enteró por", valor: registro.enteraste },
        {
          etiqueta: "Autorización de datos",
          valor: registro.autorizacion ? "Sí" : "No",
        },
      ],
    },
  ];

  const asunto = `Nueva inscripción · ${registro.nombre} · ${registro.municipio}`;

  const html = `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f2eee4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eee4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-top:6px solid #E11D2A;border-bottom:6px solid #FFD200;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
        <tr>
          <td style="background:#0C1A33;padding:24px;">
            <p style="margin:0;font-family:'Arial Black',Impact,Arial,sans-serif;font-size:24px;line-height:1;letter-spacing:1px;text-transform:uppercase;color:#ffffff;">Movimiento del Bate</p>
            <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#FFD200;">Nueva inscripción · Generación De-Bate</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 24px 4px;">
            <p style="margin:0;font-size:16px;line-height:1.5;color:#15130f;"><strong>${escapar(registro.nombre)}</strong> se inscribió desde <strong>${escapar(registro.municipio)}</strong>.</p>
          </td>
        </tr>
        ${secciones.map(seccionHtml).join("")}
        <tr>
          <td style="padding:20px 24px 24px;">
            <p style="margin:0;font-size:12px;line-height:1.5;color:#7a746a;">
              Registro ${escapar(registro.id)} · ${escapar(fecha(registro.enviadoEn))}<br/>
              Responde este correo para contactar a ${escapar(registro.nombre)} (${escapar(registro.correo)}).
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "MOVIMIENTO DEL BATE — Nueva inscripción",
    "Generación De-Bate",
    "",
    ...secciones.map((seccion) =>
      [seccion.titulo.toUpperCase(), ...seccion.filas.map(filaTexto)].join("\n"),
    ),
    "",
    `Registro ${registro.id} · ${fecha(registro.enviadoEn)}`,
    `Responde este correo para contactar a ${registro.nombre} (${registro.correo}).`,
  ].join("\n");

  return { asunto, html, text };
}

export async function enviarCorreoInscripcion(registro: Inscripcion) {
  const resend = getResend();
  if (!resend) {
    throw new Error(
      "Falta RESEND_API_KEY. Configúrala en .env.local o en Vercel.",
    );
  }

  const destinatarios = (process.env.INSCRIPCIONES_TO ?? "")
    .split(",")
    .map((correo) => correo.trim())
    .filter(Boolean);

  if (destinatarios.length === 0) {
    throw new Error(
      "Falta INSCRIPCIONES_TO. Define el correo que recibe las inscripciones.",
    );
  }

  const { asunto, html, text } = armarCorreoInscripcion(registro);

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "onboarding@resend.dev",
    to: destinatarios,
    replyTo: registro.correo,
    subject: asunto,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data?.id;
}
