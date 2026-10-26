import { prisma } from "@/lib/prisma";

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

export type NuevaInscripcion = Omit<
  Inscripcion,
  "id" | "enviadoEn" | "origen"
>;

const combinarOtra = (
  seleccion: string[],
  detalle: string,
  etiqueta: "Otra" | "Otro",
) => {
  const texto = detalle.trim();
  if (!texto) return seleccion;
  return seleccion.map((valor) =>
    valor === etiqueta ? `${etiqueta}: ${texto}` : valor,
  );
};

export async function guardarInscripcion(inscripcion: NuevaInscripcion) {
  return prisma.formSubmission.create({
    data: {
      fullName: inscripcion.nombre,
      ageRange: inscripcion.rangoEdad,
      phone: inscripcion.celular,
      email: inscripcion.correo,
      municipality: inscripcion.municipio,
      neighborhoodResidence: inscripcion.barrioVive,
      neighborhoodActivity: inscripcion.barrioActua,
      talents: JSON.stringify(
        combinarOtra(
          inscripcion.habilidades,
          inscripcion.habilidadOtra,
          "Otra",
        ),
      ),
      communityInvolvement: inscripcion.participacion,
      experienceDetails: inscripcion.experiencia || null,
      socialNetworks: JSON.stringify(inscripcion.redes),
      smartphoneStatus: inscripcion.celularContenido,
      trainingInterests: JSON.stringify(
        combinarOtra(inscripcion.formacion, inscripcion.formacionOtra, "Otra"),
      ),
      communityContribution: inscripcion.aporte || null,
      barriers: JSON.stringify(
        combinarOtra(
          inscripcion.impedimentos,
          inscripcion.impedimentoOtro,
          "Otro",
        ),
      ),
      participationTypes: JSON.stringify(inscripcion.motivaciones),
      timeCommitment: inscripcion.tiempo,
      projectIdea: inscripcion.idea || null,
      socialProfile: inscripcion.perfilSocial || null,
      discoverySource: inscripcion.enteraste,
      dataAuthorization: inscripcion.autorizacion,
    },
    select: { id: true, createdAt: true },
  });
}
