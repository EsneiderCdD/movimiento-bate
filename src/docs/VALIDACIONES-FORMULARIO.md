# Validaciones y comportamiento del formulario de inscripción

Componente: `src/components/specific/voluntariado/InscripcionForm.tsx`
Reglas puras: `src/components/specific/voluntariado/validation.ts`
Estilos: `src/components/specific/voluntariado/InscripcionForm.module.css`

El formulario es un wizard de 4 pasos (Perfil, Talento, Formación, Participación). Todavía **no envía datos** a ningún servidor: el estado vive en `useState` y se pierde al recargar.

## Cómo se validan los pasos

- El `<form>` usa `noValidate` para evitar las burbujas nativas del navegador.
- Al pulsar "Continuar" se valida el paso actual con validación propia (`validarPaso1`…`validarPaso4`) y mensajes inline. Ya no se usa `reportValidity`.
- Al pulsar "Enviar" se ejecuta `validarPaso4()` y, si todo está bien, se envía a `POST /api/inscripciones` (ver "Envío y almacenamiento").
- Los errores se guardan en un objeto `errors` (`Record<string, string>`) y se muestran bajo el campo en rojo (`.error`), con borde rojo (`.inputError`), `aria-invalid` y `aria-describedby`.
- Si hay errores, se hace foco y `scrollIntoView` al primero (en el orden de las reglas).
- Al cambiar un campo se limpia su error; al salir del campo (`onBlur`) se normaliza el valor y se valida ese campo (sin marcar error si está vacío).

## Normalización (limpieza de datos)

Todas las funciones viven en `validation.ts` y son reutilizables.

| Función | Qué hace |
|---|---|
| `normalizarTexto(value)` | `trim` y colapsa espacios múltiples en uno. |
| `normalizarCelular(value)` | Deja solo dígitos y, si recibe 12 dígitos que empiezan en `57`, elimina el prefijo → 10 dígitos nacionales. |
| `formatearCelular(value)` | Devuelve el número visible formateado; si no hay 10 dígitos, devuelve el texto recortado tal cual. |
| `normalizarParrafo(value)` | Recorta, colapsa espacios/tabs y limita saltos de línea a un máximo de dos, **conservando** los saltos. |
| `validarNombre` | Verdadero si el nombre cumple las reglas. |
| `validarCelular` | Verdadero si el número nacional es válido. |
| `validarCorreo` | Verdadero si el correo cumple el patrón. |
| `validarBarrio` | Verdadero si tiene entre 3 y 60 caracteres. |
| `validarOtra` | Verdadero si el texto de una opción "Otra" tiene entre 3 y 60 caracteres. |
| `normalizarPerfil` | Recorta y elimina los `@` iniciales del perfil social. |

## Sección 1 — Perfil

### Nombre y apellidos

- **Regla:** mínimo 2 palabras (nombre + al menos un apellido), cada palabra de 2+ letras, solo letras/espacios/guion/apóstrofo, entre 5 y 60 caracteres.
- **Por qué:** evita registros con un solo nombre ("Sebastian", "Sergio").
- **Limpieza:** `normalizarTexto` al salir del campo (recorta y colapsa espacios).
- **Mensaje:** "Escribe tu nombre y al menos un apellido."
- **Atributos:** `autoComplete="name"`, `maxLength={60}`.

### Rango de edad

- **Regla:** obligatorio, solo opciones predefinidas (`18-24`, `25-34`, `35-44`, `45-54`, `55+`).
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona un rango de edad."
- **Nota:** al no haber error se muestra el texto de ayuda "Solo mayores de 18 años.".

### Número de celular / WhatsApp

- **Regla:** 10 dígitos nacionales; móvil empieza en `3`, fijo en `6`; se rechazan números con todos los dígitos iguales (`3333333333`).
- **Formatos aceptados en la entrada:** `+57 333 333 3333`, `573333333333`, `3333333333`, `+604 333 3333`, `6043333333`. Las letras y símbolos se descartan para la validación.
- **Limpieza:** al salir del campo se **formatea el texto visible** (se conserva el formato en pantalla) y en validación/envío se obtienen los dígitos con `normalizarCelular` → `573333333333` → `3333333333` nacional.
- **Formato visible:**
  - `3333333333` → `333 333 3333`
  - `+573333333333` → `+57 333 333 3333`
  - `6043333333` → `604 333 3333`
- **Mensaje:** "Escribe un celular o fijo de 10 dígitos."
- **Atributos:** `type="tel"`, `inputMode="tel"`, `autoComplete="tel"`, `maxLength={20}`.

### Correo electrónico

- **Regla:** patrón `usuario@dominio.tld` (mínimo 2 letras en el TLD), sin espacios, máximo 120 caracteres.
- **Limpieza:** al salir del campo se aplica `trim` y se pasa a minúsculas.
- **Mensaje:** "Escribe un correo válido."
- **Atributos:** `type="email"`, `inputMode="email"`, `autoComplete="email"`, `maxLength={120}`.

### Municipio

- **Regla:** obligatorio y **debe coincidir con uno de los 125 municipios** (sin importar tildes ni mayúsculas), máximo 60 caracteres.
- **Búsqueda:** combobox con los **125 municipios de Antioquia** agrupados por subregión. Filtra por coincidencia sin importar tildes ni mayúsculas; navegable con ↑/↓, Enter selecciona y Esc cierra. Al elegir, se guarda el nombre del municipio.
- **Limpieza:** `normalizarTexto` al salir del campo.
- **Mensajes:** "Escribe tu municipio." si está vacío; "Selecciona un municipio de la lista." si no coincide.

### Barrio/vereda donde vive y donde actúa

- **Regla:** obligatorio, entre 3 y 60 caracteres. Sin otras restricciones (son campos muy diversos).
- **Limpieza:** `normalizarTexto` al salir del campo.
- **Mensaje:** "Escribe tu barrio o vereda."
- **Atributos:** `maxLength={60}`.

## Sección 2 — Talento

### Habilidades / experiencia (checkboxes)

- **Regla:** al menos una opción marcada.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona al menos una opción."

### "Otra" (habilidad)

- **Regla:** si "Otra" está marcada, el texto debe tener entre 3 y 60 caracteres.
- **Limpieza:** `normalizarTexto` al salir del campo.
- **Mensaje:** "Escribe cuál."
- **Atributos:** `maxLength={60}`.

### Participación en organización o proyecto

- **Regla:** obligatorio, solo opciones predefinidas.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona una opción."

### Experiencia (opcional)

- **Regla:** máximo 500 caracteres; sin mínimo. Si se deja vacío no se valida.
- **Contador:** visible debajo del campo (`n/500`).
- **Limpieza:** `normalizarParrafo` al salir del campo (conserva saltos de línea, colapsa espacios y limita a un doble salto).
- **Mensaje:** "Máximo 500 caracteres."
- **Atributos:** `maxLength={500}`.

### Redes sociales (checkboxes)

- **Regla:** al menos una opción marcada. "Ninguna de las anteriores" es excluyente con las demás (al marcarla se desmarcan las otras, y viceversa).
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona al menos una opción."

### Celular para crear contenido

- **Regla:** obligatorio, solo opciones predefinidas.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona una opción."

## Sección 3 — Formación

### Formación (checkboxes)

- **Regla:** al menos una opción marcada.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona al menos una opción."

### "Otra" (formación)

- **Regla:** si "Otra" está marcada, el texto debe tener entre 3 y 60 caracteres.
- **Limpieza:** `normalizarTexto` al salir del campo.
- **Mensaje:** "Escribe cuál."
- **Atributos:** `maxLength={60}`.

### Aporte (opcional)

- **Regla:** máximo 500 caracteres; sin mínimo. Vacío no genera error.
- **Contador:** visible debajo del campo (`n/500`).
- **Limpieza:** `normalizarParrafo` al salir del campo (conserva saltos de línea).
- **Mensaje:** "Máximo 500 caracteres."
- **Atributos:** `maxLength={500}`.

### Impedimentos (checkboxes)

- **Regla:** al menos una opción marcada. Quien no se identifique con ninguna debe marcar "Otro" y escribirlo.
- **Ayuda:** "Si no encuentras tu caso, marca «Otro» y escríbelo."
- **Mensaje:** "Selecciona al menos una opción."

### "Otro" (impedimentos)

- **Regla:** si "Otro" está marcado, el texto debe tener entre 3 y 60 caracteres.
- **Limpieza:** `normalizarTexto` al salir del campo.
- **Mensaje:** "Escribe cuál."
- **Atributos:** `maxLength={60}`.

## Sección 4 — Participación

### Motivaciones (checkboxes)

- **Regla:** al menos una opción marcada.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona al menos una opción."

### Tiempo disponible

- **Regla:** obligatorio, solo opciones predefinidas.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona una opción."

### Idea o proyecto (opcional)

- **Regla:** máximo 500 caracteres; sin mínimo. Vacío no genera error.
- **Contador:** visible debajo del campo (`n/500`).
- **Limpieza:** `normalizarParrafo` al salir del campo (conserva saltos de línea).
- **Mensaje:** "Máximo 500 caracteres."
- **Atributos:** `maxLength={500}`.

### Perfil social (opcional)

- **Regla:** campo genérico para Instagram, TikTok, LinkedIn u otra red; **no valida formato ni exige mínimo**.
- **Limpieza:** `normalizarPerfil` al salir del campo (recorta y quita el `@` inicial), de modo que al enviar quede `minombre` en lugar de `@minombre`.
- **Atributos:** `maxLength={100}`.

### ¿Cómo te enteraste?

- **Regla:** obligatorio, solo opciones predefinidas.
- **Limpieza:** ninguna.
- **Mensaje:** "Selecciona una opción."

### Autorización de datos

- **Regla:** obligatoria (checkbox marcado).
- **Limpieza:** ninguna.
- **Mensaje:** "Debes aceptar la política de tratamiento de datos."

## Serialización / datos guardados

El formulario envía el estado completo a `POST /api/inscripciones`:

| Campo | Se guarda en el cliente | Se envía al servidor |
|---|---|---|
| `nombre` | Texto normalizado (`trim` + espacios simples). | Normalizado otra vez en el servidor. |
| `rangoEdad` | Etiqueta de la opción (`"25-34 años"`). | Tal cual. |
| `celular` | Texto visible formateado (`+57 333 333 3333`). | `normalizarCelular()` → solo dígitos nacionales. |
| `correo` | Minúsculas y sin espacios. | Tal cual. |
| `municipio` | Texto (debe ser uno de los 125). | Tal cual. |
| `barrioVive`, `barrioActua` | Texto normalizado. | Tal cual. |
| `habilidades` | Etiquetas marcadas (incluye `"Otra"`). | Tal cual. |
| `habilidadOtra` | Texto normalizado (solo si "Otra" está marcada). | Tal cual. |
| `participacion` | Etiqueta de la opción. | Tal cual. |
| `experiencia` | Texto con saltos de línea preservados. | Tal cual. |
| `redes` | Etiquetas marcadas (`"Ninguna de las anteriores"` si aplica). | Tal cual. |
| `celularContenido` | Etiqueta de la opción. | Tal cual. |
| `formacion` | Etiquetas marcadas (incluye `"Otra"`). | Tal cual. |
| `formacionOtra` | Texto normalizado (solo si "Otra" está marcada). | Tal cual. |
| `aporte` | Texto con saltos de línea preservados. | Tal cual. |
| `impedimentos` | Etiquetas marcadas (incluye `"Otro"`). | Tal cual. |
| `impedimentoOtro` | Texto normalizado (solo si "Otro" está marcado). | Tal cual. |
| `motivaciones` | Etiquetas marcadas. | Tal cual. |
| `tiempo` | Etiqueta de la opción. | Tal cual. |
| `idea` | Texto con saltos de línea preservados. | Tal cual. |
| `perfilSocial` | Texto sin `@` inicial. | Tal cual. |
| `enteraste` | Etiqueta de la opción. | Tal cual. |
| `autorizacion` | Booleano. | Tal cual. |

## Envío y almacenamiento

- **Endpoint:** `POST /api/inscripciones` (`src/app/api/inscripciones/route.ts`, runtime Node.js).
- **Validación de servidor:** reutiliza `validation.ts` y repite las reglas obligatorias del cliente. Responde:
  - `201 { ok: true, id }` cuando envía el correo (y guarda en local).
  - `400 { ok: false, error }` si los datos no son válidos.
  - `502 { ok: false, error }` si Resend falla (no se guarda, para poder reintentar sin duplicados).
  - `503 { ok: false, error }` si falta `RESEND_API_KEY` o `INSCRIPCIONES_TO`.
- **Correo (Resend):** `src/lib/emailInscripcion.ts` arma asunto, HTML y texto a partir del registro; `src/lib/resend.ts` inicializa el cliente de forma perezosa. Remitente por defecto `onboarding@resend.dev`, destinatario en `INSCRIPCIONES_TO`, `replyTo` con el correo del inscrito.
- **Variables de entorno:** ver `.env.example`. Con `onboarding@resend.dev` solo se puede enviar al correo dueño de la cuenta Resend; para otros destinatarios o un remitente propio hay que verificar un dominio.
- **Orden del flujo:** validar → enviar correo → guardar NDJSON (solo fuera de Vercel) → `201`.
- **Dónde guarda:** `data/inscripciones.ndjson` en la raíz del proyecto (una línea JSON por registro). Se crea automáticamente. Cada registro agrega `id` (UUID), `enviadoEn` (ISO) y `origen: "voluntariado"`, además de los campos del formulario.
- **Privacidad:** el archivo contiene datos personales; la carpeta `/data/` está en `.gitignore`.
- **Limitación:** el NDJSON es un almacenamiento local de emulación y en Vercel (serverless) no persiste; allí el correo es el registro real. Para producción habrá que conectar una base de datos o API real.
- **UX:** mientras se envía, el botón queda deshabilitado con el texto "Enviando…". Si responde bien, aparece el modal de éxito y al cerrarlo el formulario se reinicia. Si falla, aparece el modal de error con "Reintentar" (conserva las respuestas) y "Volver".
- **Modales:** `src/components/specific/voluntariado/EnvioModal.tsx` (+ `.module.css`), con estética navy, borde rojo/amarillo y animación con `motion`.

## Pendientes

- Conectar un backend o base de datos real (hoy correo + archivo local).
- Personalizar la plantilla del correo (hoy es una plantilla HTML simple; se evalúa usar React Email).
- Verificar un dominio en Resend para enviar a cualquier destinatario con remitente propio.
- Persistencia de respuestas (localStorage) para no perderlas al recargar.
- Enlace real a la política de tratamiento de datos (hoy `href="#"`).
