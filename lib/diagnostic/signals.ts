import { evaluateAnswerQuality } from "./quality";
import { QUESTION_BLOCKS } from "../questions";

export interface DetectedSignal {
  id: string;
  label: string;
  questionId: string;
  evidence: string;
  weight: number;
}

type SignalRule = {
  id: string;
  label: string;
  keywords: string[];
  weight: number;
};

const SIGNAL_RULES: SignalRule[] = [
  {
    id: "mensaje_confuso",
    label: "No puede explicar claramente qué hace",
    keywords: [
      "no sé explicarlo",
      "me cuesta explicarlo",
      "no sé cómo explicarlo",
      "no tengo claro",
      "no está claro",
      "confuso",
      "confusión",
    ],
    weight: 2,
  },
  {
    id: "habla_para_todo_el_mundo",
    label: "Habla para todo el mundo",
    keywords: [
      "todo el mundo",
      "todos",
      "cualquiera",
      "cualquier persona",
      "todo tipo de personas",
      "a todo el mundo",
    ],
    weight: 2,
  },
  {
    id: "direccion_cambiante",
    label: "Cambia constantemente de dirección",
    keywords: [
      "cambio mucho",
      "cambio constantemente",
      "voy cambiando",
      "no tengo foco",
      "sin foco",
      "muchas ideas",
      "demasiadas ideas",
    ],
    weight: 2,
  },
  {
    id: "problema_principal_no_claro",
    label: "No identifica claramente el problema principal que resuelve",
    keywords: [
      "no sé qué problema",
      "no tengo claro el problema",
      "no sé cuál es el problema",
      "no sé qué necesitan",
      "no sé qué dolor",
    ],
    weight: 2,
  },
  {
    id: "servicios_sin_resultado",
    label: "Enumera servicios pero no resultados",
    keywords: [
      "servicios",
      "varios servicios",
      "hago de todo",
      "ofrezco varias cosas",
      "tengo varios servicios",
      "catálogo",
      "lista de servicios",
    ],
    weight: 2,
  },
  {
    id: "proceso_antes_que_beneficio",
    label: "Explica procesos antes que beneficios",
    keywords: [
      "proceso",
      "metodología",
      "paso a paso",
      "herramientas",
      "funcionalidades",
      "características",
    ],
    weight: 1,
  },
  {
    id: "multiples_ofertas_sin_principal",
    label: "Tiene múltiples ofertas sin una principal",
    keywords: [
      "varias ofertas",
      "muchas ofertas",
      "no sé cuál vender",
      "no sé qué vender primero",
      "vendo varias cosas",
      "muchos productos",
    ],
    weight: 3,
  },
  {
    id: "diferenciacion_no_clara",
    label: "No puede explicar qué lo hace diferente",
    keywords: [
      "no sé qué me diferencia",
      "no tengo diferencial",
      "no sé por qué elegirían",
      "no sé por qué a mí",
      "soy igual",
      "similar a otros",
      "hay mucha competencia",
    ],
    weight: 3,
  },
  {
    id: "copia_estrategias",
    label: "Copia estrategias de otros sin adaptarlas",
    keywords: [
      "copio",
      "veo lo que hacen otros",
      "hago lo que veo",
      "imitando",
      "me inspiro demasiado",
    ],
    weight: 2,
  },
  {
    id: "compite_por_precio",
    label: "Compite principalmente por precio",
    keywords: [
      "precio bajo",
      "barato",
      "más barato",
      "descuento",
      "rebajo",
      "bajo el precio",
      "competir por precio",
    ],
    weight: 3,
  },
  {
    id: "sin_testimonios",
    label: "No utiliza testimonios",
    keywords: [
      "no tengo testimonios",
      "sin testimonios",
      "no tengo casos",
      "sin casos de éxito",
      "no tengo referencias",
      "sin referencias",
    ],
    weight: 3,
  },
  {
    id: "audiencia_sin_oportunidades",
    label: "Tiene audiencia pero pocas oportunidades",
    keywords: [
      "tengo seguidores pero no vendo",
      "tengo audiencia pero no clientes",
      "me ven pero no compran",
      "muchas visitas pero pocas ventas",
      "mucho interés pero pocas ventas",
    ],
    weight: 3,
  },
  {
    id: "presencia_digital_confusa",
    label: "Su presencia digital genera confusión",
    keywords: [
      "mi perfil no transmite",
      "mi perfil no está claro",
      "mis redes están desordenadas",
      "redes desordenadas",
      "no se entiende mi perfil",
    ],
    weight: 2,
  },
  {
    id: "dependencia_referidos",
    label: "Depende principalmente de referidos",
    keywords: [
      "referidos",
      "recomendaciones",
      "boca a boca",
      "me recomiendan",
      "por recomendación",
    ],
    weight: 2,
  },
  {
    id: "trafico_sin_recorrido",
    label: "Genera tráfico sin recorrido definido",
    keywords: [
      "no sé qué hacer con los leads",
      "no tengo recorrido",
      "no tengo embudo",
      "no tengo funnel",
      "no sé cómo llevarlos",
    ],
    weight: 3,
  },
  {
    id: "sin_puerta_entrada",
    label: "No existe una puerta de entrada clara",
    keywords: [
      "no tengo lead magnet",
      "no tengo entrada",
      "no tengo recurso gratuito",
      "no tengo landing",
      "no tengo llamada clara",
    ],
    weight: 3,
  },
  {
    id: "publica_sin_estrategia",
    label: "Publica sin estrategia",
    keywords: [
      "publico lo que sale",
      "publico cuando puedo",
      "sin estrategia",
      "improviso contenido",
      "contenido improvisado",
      "no tengo calendario",
    ],
    weight: 3,
  },
  {
    id: "ideas_sin_publicacion",
    label: "Tiene ideas pero no publica",
    keywords: [
      "tengo ideas pero no publico",
      "me cuesta publicar",
      "no publico",
      "no soy constante",
      "falta de constancia",
    ],
    weight: 2,
  },
  {
    id: "sin_cta",
    label: "No existe CTA claro",
    keywords: [
      "no tengo llamada a la acción",
      "sin cta",
      "no sé qué pedir",
      "no sé cómo cerrar",
      "no invito a nada",
    ],
    weight: 2,
  },
  {
    id: "conversaciones_sin_estructura",
    label: "Conversaciones sin estructura",
    keywords: [
      "conversaciones sin estructura",
      "hablo por hablar",
      "no tengo guion",
      "no tengo proceso de venta",
      "vendo improvisando",
    ],
    weight: 3,
  },
  {
    id: "interes_sin_ventas",
    label: "Mucho interés pero pocas ventas",
    keywords: [
      "mucho interés pero pocas ventas",
      "preguntan pero no compran",
      "me preguntan y desaparecen",
      "interesados pero no cierran",
    ],
    weight: 3,
  },
  {
    id: "sin_metricas",
    label: "No conoce sus métricas comerciales",
    keywords: [
      "no mido",
      "no tengo métricas",
      "no sé mis números",
      "no sé la conversión",
      "no sé cuántos llegan",
    ],
    weight: 2,
  },
  {
    id: "sin_seguimiento",
    label: "No existe seguimiento posterior",
    keywords: [
      "no hago seguimiento",
      "sin seguimiento",
      "no vuelvo a escribir",
      "no los contacto otra vez",
      "se quedan sin responder",
    ],
    weight: 3,
  },
  {
    id: "abandona_oportunidades",
    label: "Abandona oportunidades demasiado pronto",
    keywords: [
      "si no responde lo dejo",
      "abandono rápido",
      "no insisto",
      "me da miedo insistir",
      "no quiero molestar",
    ],
    weight: 2,
  },
  {
    id: "no_reactiva_clientes",
    label: "No reactiva clientes antiguos",
    keywords: [
      "no reactivo clientes",
      "no vuelvo a clientes antiguos",
      "no tengo recompra",
      "no tengo fidelización",
    ],
    weight: 2,
  },
  {
    id: "dependencia_persona",
    label: "Todo depende de una persona",
    keywords: [
      "todo depende de mí",
      "si yo no lo hago no pasa",
      "no puedo delegar",
      "depende de una persona",
      "lo hago todo yo",
    ],
    weight: 3,
  },
  {
    id: "sin_procesos_documentados",
    label: "No existen procesos documentados",
    keywords: [
      "no tengo procesos",
      "no está documentado",
      "no tengo documentación",
      "todo está en mi cabeza",
      "no tengo sistema escrito",
    ],
    weight: 3,
  },
  {
    id: "herramientas_desconectadas",
    label: "Utiliza herramientas desconectadas",
    keywords: [
      "herramientas desconectadas",
      "uso muchas herramientas",
      "todo separado",
      "no está integrado",
      "tengo todo disperso",
    ],
    weight: 2,
  },
  {
    id: "tareas_repetitivas_manuales",
    label: "Realiza tareas repetitivas manualmente",
    keywords: [
      "tareas repetitivas",
      "manual",
      "lo hago manualmente",
      "pierdo tiempo",
      "me consume tiempo",
      "repetitivo",
    ],
    weight: 3,
  },
  {
    id: "ia_puntual",
    label: "Utiliza IA solo de forma puntual",
    keywords: [
      "uso chatgpt a veces",
      "uso ia a veces",
      "uso ia poco",
      "puntualmente",
      "solo para ideas",
      "solo para textos",
    ],
    weight: 2,
  },
  {
    id: "desconoce_automatizacion",
    label: "Desconoce posibilidades de automatización",
    keywords: [
      "no sé qué automatizar",
      "no sé cómo automatizar",
      "no conozco automatizaciones",
      "no sé por dónde empezar con ia",
    ],
    weight: 3,
  },
  {
    id: "sabe_no_ejecuta",
    label: "Sabe qué hacer pero no lo ejecuta",
    keywords: [
      "sé lo que tengo que hacer pero no lo hago",
      "sé qué hacer",
      "me falta ejecutar",
      "no ejecuto",
      "me cuesta ejecutar",
    ],
    weight: 3,
  },
  {
    id: "planifica_mas_de_lo_que_ejecuta",
    label: "Planifica más de lo que ejecuta",
    keywords: [
      "planifico mucho",
      "pienso demasiado",
      "le doy muchas vueltas",
      "me quedo planificando",
      "no paso a la acción",
    ],
    weight: 2,
  },
  {
    id: "abandona_estrategias",
    label: "Abandona estrategias demasiado pronto",
    keywords: [
      "abandono estrategias",
      "cambio de estrategia",
      "no mantengo nada",
      "lo dejo rápido",
      "no soy constante",
    ],
    weight: 2,
  },
];

/* =========================
   DETECTOR POR RESPUESTA
========================= */

export function detectSignalsFromAnswer(
  questionId: string,
  answer: unknown
): DetectedSignal[] {
  const signals: DetectedSignal[] = [];

  const field = QUESTION_BLOCKS
    .flatMap((block) => block.fields)
    .find((f) => f.id === questionId);

  if (field && field.type !== "text" && field.type !== "textarea") {
    return signals;
  }

  const text =
    typeof answer === "string"
      ? answer.trim()
      : Array.isArray(answer)
        ? answer.join(", ")
        : "";

  if (!text) return signals;

  const quality = evaluateAnswerQuality(text);

  if (!quality.valid) {
    signals.push({
      id: "respuesta_invalida",
      label: "Respuesta inválida o insuficiente",
      questionId,
      evidence: quality.reasons.join(", "),
      weight: 0,
    });

    return signals;
  }

  const normalizedText = text.toLowerCase();

  for (const rule of SIGNAL_RULES) {
    if (rule.keywords.some((keyword) => normalizedText.includes(keyword))) {
      signals.push({
        id: rule.id,
        label: rule.label,
        questionId,
        evidence: text,
        weight: rule.weight,
      });
    }
  }

  if (text.length < 20) {
    signals.push({
      id: "respuesta_pobre",
      label: "Respuesta pobre o poco desarrollada",
      questionId,
      evidence: text,
      weight: 1,
    });
  }

  return signals;
}