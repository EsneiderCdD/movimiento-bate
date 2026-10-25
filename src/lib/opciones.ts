export const OPCION_OTRA = "Otra";
export const OPCION_OTRO = "Otro";

export const RANGOS = [
  "18-24 años",
  "25-34 años",
  "35-44 años",
  "45-54 años",
  "55 años o más",
];

export const MUNICIPIOS = [
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

export const HABILIDADES = [
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

export const REDES = [
  "Instagram",
  "TikTok",
  "Facebook",
  "YouTube",
  "WhatsApp",
  "Ninguna de las anteriores",
];

export const FORMACION = [
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

export const IMPEDIMENTOS = [
  "No sé por dónde empezar",
  "Me falta formación",
  "No tengo una red de contactos",
  "Me falta experiencia",
  "Tengo recursos económicos limitados",
  "Me cuesta comunicar mis ideas",
  "No he encontrado espacios para participar",
];

export const MOTIVACIONES = [
  "Recibir formación",
  "Crear contenido y comunicar ideas",
  "Participar en actividades territoriales",
  "Ayudar a organizar equipos",
  "Compartir mis conocimientos y experiencia",
  "Proponer iniciativas para mi municipio",
  "Conectar con otras personas y proyectos",
  "Explorar oportunidades de participación en la vida pública",
];

export const TIEMPOS = [
  "Menos de 2 horas por semana",
  "Entre 2 y 4 horas por semana",
  "Entre 5 y 8 horas por semana",
  "Más de 8 horas por semana",
  "Depende de la actividad",
];

export const ENTERASTE = [
  "Redes sociales",
  "WhatsApp",
  "Un amigo o conocido",
  "Una actividad presencial",
  "Otra fuente",
];

export const PARTICIPACION = [
  "Sí",
  "No, pero me gustaría",
  "Estoy comenzando una iniciativa",
];

export const CELULAR = [
  "Sí",
  "Sí, pero necesito aprender a utilizar mejor sus herramientas",
  "No por ahora",
];

export const normalizarMunicipio = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const esMunicipioValido = (value: string) =>
  MUNICIPIOS.some(
    (item) => normalizarMunicipio(item.nombre) === normalizarMunicipio(value),
  );

export function esListaValida(
  valores: string[],
  permitidas: readonly string[],
  extras: string[] = [],
) {
  if (valores.length > permitidas.length + extras.length) return false;
  const permitido = new Set([...permitidas, ...extras]);
  return valores.every((item) => permitido.has(item));
}
