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
  options?: string[];
  min?: number;
  max?: number;
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
      { id: "b1_tiempo_proyecto", label: "¿Cuánto tiempo lleva funcionando tu negocio?", type: "text" },
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
      { id: "b3_diferenciacion", label: "¿Qué te diferencia de otros negocios similares?", type: "textarea" },
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
      { id: "urgencia", label: "¿Qué urgencia tiene resolver esto?", type: "select", options: ["Baja", "Media", "Alta"] },
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
        id: "canal_principal",
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
      { id: "comodidad_video", label: "Del 1 al 10, ¿qué cómodo te sientes apareciendo en vídeo?", type: "scale", min: 1, max: 10 },
      { id: "b7_impide_publicar", label: "¿Qué te impide publicar con más frecuencia?", type: "textarea" },
      { id: "b7_publicaria", label: "Si mañana tuvieras que publicar algo, ¿sobre qué hablarías?", type: "textarea" },
    ],
  },
  {
    id: 8,
    title: "Qué estás usando hoy para hacer crecer tu negocio",
    fields: [
      {
        id: "assets",
        label: "¿Qué estás usando hoy para hacer crecer tu negocio?",
        type: "checklist",
        options: [
          "Logo",
          "Colores definidos",
          "Manual de marca",
          "Web",
          "Landing page",
          "WhatsApp Business",
          "Fotos profesionales",
          "Vídeos propios",
          "Casos de éxito",
          "Testimonios",
          "PDF",
          "Lead magnet",
          "Presentación comercial",
          "CRM",
          "Base de datos",
          "Calendario de contenido",
          "Ninguno",
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
      { id: "nivel_ia_cliente", label: "¿Cómo valorarías tu nivel de IA?", type: "select", options: ["Nunca la he usado", "Principiante", "Intermedio", "Avanzado"] },
      { id: "b9_uso_actual", label: "¿Para qué la utilizas actualmente?", type: "textarea" },
      { id: "b9_objetivo_ia", label: "¿Qué te gustaría conseguir con IA?", type: "textarea" },
      { id: "b9_tarea_delegaria", label: "¿Qué tarea delegarías si pudieras quitarla de tu día a día?", type: "textarea" },
      { id: "b9_tarea_consume", label: "¿Qué tarea te consume más tiempo cada semana?", type: "textarea" },
      { id: "b9_procesos_automatizar", label: "¿Qué te gustaría automatizar o simplificar de tu negocio?", type: "textarea" },
    ],
  },
  {
    id: 10,
    title: "Recursos y capacidad de implementación",
    fields: [
      { id: "tiempo_semanal", label: "¿Cuánto tiempo real puedes dedicar cada semana a mejorar esto?", type: "select", options: ["Menos de 1h", "1–3h", "3–5h", "Más de 5h"] },
      { id: "equipo", label: "¿Trabajas solo o tienes equipo?", type: "select", options: ["Solo", "Con equipo"] },
      {
        id: "b10_decisiones",
        label: "¿Quién tomará la decisión final sobre las mejoras a implementar?",
        type: "select",
        options: ["Yo", "Mi socio", "Ambos"],
      },
      { id: "tipo_ayuda", label: "¿Qué tipo de ayuda buscas?", type: "select", options: ["Que me lo monten", "Que me acompañen", "Aprender a hacerlo", "Una combinación"] },
    ],
  },
  {
    id: 11,
    title: "Experiencia previa y encaje",
    fields: [
      {
        id: "b11_experiencia_previa",
        label: "¿Cuál ha sido tu experiencia previa trabajando con agencias, consultores, formaciones o servicios externos para mejorar tu negocio?",
        type: "select",
        options: [
          "Nunca he contratado este tipo de ayuda",
          "He invertido en formaciones, pero no he trabajado con alguien que me ayudara a aplicarlo",
          "He trabajado con agencias o consultores y la experiencia fue positiva",
          "He trabajado con agencias o consultores, pero los resultados no cumplieron mis expectativas",
        ],
      },
      {
        id: "b11_factor_resultado",
        label: "Si has tenido una experiencia previa, ¿qué fue lo que más influyó en el resultado?",
        type: "select",
        options: [
          "Faltó acompañamiento real para aplicar lo aprendido",
          "Hubo demasiada teoría y poca acción concreta",
          "El proceso dependía demasiado de mi tiempo y me saturé",
          "Todo estaba bien estructurado, claro y con pasos medibles",
          "No aplica",
        ],
      },
      {
        id: "b11_cambios",
        label: "Cuando un proceso requiere cambios en tu forma actual de trabajar, ¿cómo prefieres afrontarlo?",
        type: "select",
        options: [
          "Prefiero recibir la estrategia clara y ejecutar por mi cuenta",
          "Prefiero una guía paso a paso con apoyo durante el proceso",
          "Prefiero delegar la mayor parte de la implementación",
          "Me cuesta cambiar procesos aunque sepa que es necesario",
        ],
      },
      {
        id: "disposicion_invertir",
        label: "Ordenar tu negocio y corregir los cuellos de botella detectados puede requerir inversión. ¿En qué punto te encuentras?",
        type: "select",
        options: [
          "Estoy listo para invertir si la propuesta encaja con lo que necesito",
          "Estoy dispuesto a invertir si el retorno y la viabilidad son claros",
          "Tengo presupuesto limitado y necesito valorar fases o prioridades",
          "Ahora mismo busco claridad inicial antes de tomar una decisión mayor",
        ],
      },
    ],
  },
];

export const CLIENT_FINISH_MESSAGE = "Diagnóstico completado. Gracias por la información.";