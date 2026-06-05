// Nexo IA · Diagnóstico Cliente
// questions.ts — Bloques VISIBLES para el cliente (1–11)
//
// Estos textos viven en código, no en la base de datos: puedes editar
// preguntas sin tocar Supabase. Las respuestas se guardan en la columna
// `answers` (jsonb) de la tabla `diagnoses`, indexadas por el `id` de cada campo.
//
// IMPORTANTE: algunos `id` están marcados con  // [MOTOR]  → son las señales
// objetivas que lee el motor de recomendación (ver internal-fields.ts).
// NO renombres esos id sin actualizar también internal-fields.ts.

export type FieldType = "text" | "textarea" | "select" | "scale" | "checklist";

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  options?: string[]; // para select y checklist
  min?: number; // para scale
  max?: number; // para scale
}

export interface Block {
  id: number;
  title: string;
  fields: Field[];
}

export const QUESTION_BLOCKS: Block[] = [
  {
    id: 1,
    title: "Entender el negocio",
    fields: [
      { id: "b1_que_haces", label: "¿Qué haces y para quién?", type: "textarea" },
      { id: "b1_que_compran", label: "Cuando alguien te compra, ¿qué está comprando realmente?", type: "textarea" },
      { id: "b1_tiempo_proyecto", label: "¿Cuánto tiempo llevas con este proyecto?", type: "text" },
      { id: "b1_principal_secundaria", label: "¿Es tu actividad principal o secundaria?", type: "select", options: ["Principal", "Secundaria"] },
      { id: "b1_que_funciona", label: "¿Qué funciona actualmente?", type: "textarea" },
      { id: "b1_que_frena", label: "¿Qué sientes que está frenando el crecimiento del proyecto?", type: "textarea" },
      { id: "b1_que_perderian", label: "Si desapareciera tu negocio mañana, ¿qué perderían tus clientes?", type: "textarea" },
    ],
  },
  {
    id: 2,
    title: "Cliente ideal",
    fields: [
      { id: "b2_persona_ideal", label: "Describe a la persona que más te interesa atraer.", type: "textarea" },
      { id: "b2_problema", label: "¿Qué problema tiene?", type: "textarea" },
      { id: "b2_deseo", label: "¿Qué desea conseguir?", type: "textarea" },
      { id: "b2_preocupacion", label: "¿Qué le preocupa antes de contratarte?", type: "textarea" },
      { id: "b2_objeciones", label: "¿Qué objeciones suele tener?", type: "textarea" },
      { id: "b2_cliente_no", label: "¿Qué tipo de cliente NO quieres atraer?", type: "textarea" },
      { id: "b2_preguntas_frecuentes", label: "¿Cuáles son las preguntas que más te hacen antes de contratarte?", type: "textarea" },
    ],
  },
  {
    id: 3,
    title: "Oferta y diferenciación",
    fields: [
      { id: "b3_que_vendes", label: "¿Qué vendes exactamente?", type: "textarea" },
      { id: "b3_que_incluye", label: "¿Qué incluye?", type: "textarea" },
      { id: "b3_resultado", label: "¿Qué resultado obtiene una persona al trabajar contigo?", type: "textarea" },
      { id: "b3_por_que_ti", label: "¿Por qué debería elegirte a ti?", type: "textarea" },
      { id: "b3_confusion", label: "¿Qué parte de tu propuesta genera más confusión?", type: "textarea" },
      { id: "b3_propuesta_frase", label: "Si tuvieras que resumir tu propuesta en una frase, ¿cuál sería?", type: "text" },
    ],
  },
  {
    id: 4,
    title: "Objetivos y visión",
    fields: [
      { id: "b4_seis_meses", label: "Imagina que dentro de seis meses todo ha salido bien. ¿Qué ha cambiado?", type: "textarea" },
      { id: "b4_conseguir", label: "¿Qué te gustaría haber conseguido?", type: "textarea" },
      { id: "b4_resultado_excelente", label: "¿Qué sería para ti un resultado excelente?", type: "textarea" },
      { id: "urgencia", label: "¿Qué urgencia tiene resolver esto?", type: "select", options: ["Baja", "Media", "Alta"] }, // [MOTOR]
      { id: "b4_por_que_ahora", label: "¿Por qué ahora?", type: "textarea" },
    ],
  },
  {
    id: 5,
    title: "Marca y percepción",
    fields: [
      { id: "b5_percepcion_deseada", label: "¿Cómo te gustaría que te percibieran?", type: "textarea" },
      { id: "b5_percepcion_actual", label: "¿Cómo crees que te perciben ahora mismo?", type: "textarea" },
      {
        id: "b5_palabras_marca",
        label: "Selecciona palabras que representen tu marca:",
        type: "checklist",
        options: ["Profesional", "Cercano", "Premium", "Experto", "Humano", "Elegante", "Práctico", "Inspirador", "Técnico", "Directo", "Diferente"],
      },
      { id: "b5_como_no", label: "¿Cómo NO quieres parecer?", type: "textarea" },
      { id: "b5_admira", label: "¿Qué marcas o perfiles admiras y por qué?", type: "textarea" },
      { id: "b5_rechaza_estilos", label: "¿Hay estilos visuales o formas de comunicar que rechazas?", type: "textarea" },
    ],
  },
  {
    id: 6,
    title: "Presencia digital actual",
    fields: [
      {
        id: "b6_canales",
        label: "¿Qué canales utilizas actualmente?",
        type: "checklist",
        options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "WhatsApp", "Web", "Email", "Otro"],
      },
      {
        id: "canal_principal", // [MOTOR]
        label: "¿Cuál es tu canal principal?",
        type: "select",
        options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "WhatsApp", "Web", "Email", "Ninguno claro"],
      },
      { id: "b6_contenido_publicado", label: "¿Qué contenido has publicado hasta ahora?", type: "textarea" },
      { id: "b6_contenido_mejor", label: "¿Qué contenido ha funcionado mejor?", type: "textarea" },
      { id: "b6_contenido_no_representa", label: "¿Qué contenido no te representa?", type: "textarea" },
      { id: "b6_perfil_transmite", label: "¿Tu perfil actual transmite realmente lo que quieres transmitir?", type: "select", options: ["Sí", "No", "No estoy seguro"] },
      {
        id: "b6_origen_oportunidades",
        label: "¿Dónde llegan actualmente las oportunidades?",
        type: "checklist",
        options: ["WhatsApp", "Instagram", "Facebook", "TikTok", "LinkedIn", "Web", "Recomendación", "Otro"],
      },
    ],
  },
  {
    id: 7,
    title: "Contenido y comunicación",
    fields: [
      { id: "b7_temas_comunicar", label: "¿Qué temas quieres comunicar?", type: "textarea" },
      { id: "b7_temas_cuesta", label: "¿Qué temas te cuesta comunicar?", type: "textarea" },
      {
        id: "b7_formato_preferido",
        label: "¿Qué formato prefieres?",
        type: "checklist",
        options: ["Carrusel", "Reel", "Vídeo", "Historias", "Post", "Email", "Artículo"],
      },
      { id: "comodidad_video", label: "Del 1 al 10, ¿qué cómodo te sientes apareciendo en vídeo?", type: "scale", min: 1, max: 10 }, // [MOTOR]
      { id: "b7_impide_publicar", label: "¿Qué te impide publicar con más frecuencia?", type: "textarea" },
      { id: "b7_publicaria", label: "Si mañana tuvieras que publicar algo, ¿sobre qué hablarías?", type: "textarea" },
    ],
  },
  {
    id: 8,
    title: "Activos disponibles",
    fields: [
      {
        id: "assets", // [MOTOR]
        label: "Marca lo que ya tienes:",
        type: "checklist",
        options: [
          "Logo", "Colores definidos", "Manual de marca", "Web", "Landing page",
          "WhatsApp Business", "Fotos profesionales", "Vídeos propios", "Casos de éxito",
          "Testimonios", "PDF", "Lead magnet", "Presentación comercial", "CRM",
          "Base de datos", "Calendario de contenido", "Ninguno",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "IA, sistemas y tecnología",
    fields: [
      {
        id: "b9_herramientas",
        label: "¿Qué herramientas utilizas actualmente?",
        type: "checklist",
        options: ["ChatGPT", "Claude", "Gemini", "Canva", "CapCut", "Notion", "Google Sheets", "Metricool", "Trello", "Zapier", "Make", "GoHighLevel", "Otras"],
      },
      { id: "nivel_ia_cliente", label: "¿Cómo valorarías tu nivel de IA?", type: "select", options: ["Nunca la he usado", "Principiante", "Intermedio", "Avanzado"] }, // [MOTOR]
      { id: "b9_uso_actual", label: "¿Para qué la utilizas actualmente?", type: "textarea" },
      { id: "b9_objetivo_ia", label: "¿Qué te gustaría conseguir con IA?", type: "textarea" },
      { id: "b9_tarea_delegaria", label: "¿Qué tarea repetirías encantado si alguien la hiciera por ti?", type: "textarea" },
      { id: "b9_tarea_consume", label: "¿Qué tarea te consume más tiempo cada semana?", type: "textarea" },
      { id: "b9_procesos_automatizar", label: "¿Qué procesos te gustaría automatizar o simplificar?", type: "textarea" },
    ],
  },
  {
    id: 10,
    title: "Recursos y capacidad de implementación",
    fields: [
      { id: "tiempo_semanal", label: "¿Cuánto tiempo real puedes dedicar cada semana a mejorar esto?", type: "select", options: ["Menos de 1h", "1–3h", "3–5h", "Más de 5h"] }, // [MOTOR]
      { id: "equipo", label: "¿Trabajas solo o tienes equipo?", type: "select", options: ["Solo", "Con equipo"] }, // [MOTOR]
      { id: "b10_decisiones", label: "¿Quién tomará las decisiones?", type: "text" },
      { id: "tipo_ayuda", label: "¿Qué tipo de ayuda buscas?", type: "select", options: ["Que me lo monten", "Que me acompañen", "Aprender a hacerlo", "Una combinación"] }, // [MOTOR]
    ],
  },
  {
    id: 11,
    title: "Experiencia previa y encaje",
    fields: [
      { id: "b11_experiencia_previa", label: "¿Has trabajado antes con agencias, consultores o formaciones?", type: "select", options: ["Sí", "No"] },
      { id: "b11_como_fue", label: "¿Cómo fue la experiencia?", type: "textarea" },
      { id: "b11_mas_gusto", label: "¿Qué fue lo que más te gustó?", type: "textarea" },
      { id: "b11_menos_gusto", label: "¿Qué fue lo que menos te gustó?", type: "textarea" },
      { id: "disposicion_invertir", label: "¿Estás dispuesto/a a invertir en ordenar esto si ves que la propuesta encaja con lo que necesitas?", type: "select", options: ["Sí", "No", "Necesito entender primero el alcance"] }, // [MOTOR]
    ],
  },
];

// Mensaje final NEUTRO de la vista cliente. No insinúa lectura ni valoración.
export const CLIENT_FINISH_MESSAGE = "Diagnóstico completado. Gracias por la información.";
