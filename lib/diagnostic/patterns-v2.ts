import type { VariableScore } from "./variables";
import type { DiagnosticPattern } from "./patterns";

export type PatternV2 = {
  id: string;
  category: string;
  name: string;
  severity: number;
  variables: string[];
  description: string;
  mode?: "any" | "all";
  minScore?: number;
};

export const PATTERNS_V2: PatternV2[] = [
  {
    id: "C01",
    category: "Claridad",
    name: "No saben explicar claramente qué hacen",
    severity: 8,
    variables: ["claridad_mensaje"],
    description:
      "La comunicación genera confusión y dificulta entender rápidamente qué ofrece el negocio.",
  },
  {
    id: "C02",
    category: "Claridad",
    name: "Intentan hablar para todos y no conectan con nadie",
    severity: 8,
    variables: ["cliente_ideal"],
    description:
      "La falta de foco comercial impide conectar de forma clara con un segmento concreto.",
  },
  {
    id: "C03",
    category: "Claridad",
    name: "Su mensaje cambia según con quién hablan",
    severity: 7,
    variables: ["claridad_mensaje", "diferenciacion"],
    description:
      "No existe una narrativa estable que permita construir posicionamiento consistente.",
  },
  {
    id: "C04",
    category: "Claridad",
    name: "No saben cuál es su cliente ideal porque nunca lo han definido con precisión",
    severity: 8,
    variables: ["cliente_ideal", "captacion"],
    description:
      "La captación se realiza de forma demasiado amplia y poco precisa.",
  },
  {
    id: "C05",
    category: "Claridad",
    name: "Definen su cliente ideal por demografía y no por comportamiento ni problema real",
    severity: 7,
    variables: ["cliente_ideal"],
    description:
      "Existe información superficial sobre el cliente, pero no comprensión profunda.",
  },

  {
    id: "O01",
    category: "Oferta",
    name: "No tienen una oferta clara, tienen una lista de servicios",
    severity: 10,
    variables: ["propuesta_valor", "claridad_mensaje"],
    description:
      "El negocio presenta servicios aislados sin una oferta principal claramente definida.",
  },
  {
    id: "O02",
    category: "Oferta",
    name: "No tienen una propuesta de valor, tienen un catálogo",
    severity: 9,
    variables: ["propuesta_valor", "diferenciacion"],
    description:
      "La oferta muestra opciones pero no comunica transformación ni valor diferencial.",
  },
  {
    id: "O03",
    category: "Oferta",
    name: "Lanzan sin haber validado si alguien lo quiere de verdad",
    severity: 9,
    variables: ["captacion", "conversion", "implementacion"],
    description:
      "Las decisiones se toman por intuición sin evidencia suficiente del mercado.",
  },
  {
    id: "O04",
    category: "Oferta",
    name: "Tienen miedo de poner precio y lo evitan hasta el último momento",
    severity: 7,
    variables: ["conversion"],
    description:
      "Existe inseguridad sobre el valor percibido y el posicionamiento de la oferta.",
  },
  {
    id: "O05",
    category: "Oferta",
    name: "Bajan el precio antes de que el cliente diga que es caro",
    severity: 8,
    variables: ["conversion", "diferenciacion"],
    description:
      "La estrategia comercial erosiona autoridad y rentabilidad.",
  },
  {
    id: "O06",
    category: "Oferta",
    name: "Hablan de características cuando deberían hablar de consecuencias",
    severity: 8,
    variables: ["propuesta_valor", "contenido"],
    description:
      "La comunicación se centra en atributos y no en resultados para el cliente.",
  },
  {
    id: "O07",
    category: "Oferta",
    name: "Explican el proceso cuando el cliente solo quiere saber el resultado",
    severity: 7,
    variables: ["contenido", "conversion"],
    description:
      "Existe exceso de complejidad en la comunicación comercial.",
  },

  {
    id: "X01",
    category: "Contradicción estratégica",
    name: "Hay actividad de contenido, pero no dirección comercial",
    severity: 9,
    variables: ["contenido", "captacion", "propuesta_valor"],
    mode: "all",
    minScore: 1,
    description:
      "El negocio genera actividad visible, pero esa actividad no está suficientemente conectada con una oferta principal ni con una intención comercial clara.",
  },
  {
    id: "X02",
    category: "Contradicción estratégica",
    name: "Existe interés, pero el seguimiento no convierte",
    severity: 9,
    variables: ["captacion", "seguimiento", "conversion"],
    mode: "all",
    minScore: 1,
    description:
      "El negocio puede generar oportunidades o conversaciones, pero no existe un proceso suficientemente claro para transformar ese interés en decisión.",
  },
  {
    id: "X03",
    category: "Contradicción estratégica",
    name: "La IA está presente, pero no integrada en el sistema comercial",
    severity: 8,
    variables: ["ia", "sistemas", "seguimiento"],
    mode: "all",
    minScore: 1,
    description:
      "La IA aparece como apoyo puntual o herramienta aislada, pero todavía no funciona como parte de un proceso comercial medible y consistente.",
  },
  {
    id: "X04",
    category: "Contradicción estratégica",
    name: "Hay herramientas, pero falta arquitectura operativa",
    severity: 8,
    variables: ["sistemas", "conversion", "seguimiento"],
    mode: "all",
    minScore: 1,
    description:
      "Existen herramientas o intención de sistematizar, pero todavía no están conectadas con un flujo claro de captación, seguimiento y conversión.",
  },
  {
    id: "X05",
    category: "Contradicción estratégica",
    name: "Hay valor real, pero el mercado no lo entiende con rapidez",
    severity: 9,
    variables: ["propuesta_valor", "claridad_mensaje", "diferenciacion"],
    mode: "all",
    minScore: 1,
    description:
      "El negocio tiene valor aprovechable, pero la forma de presentarlo no permite que el cliente comprenda rápidamente por qué debería avanzar.",
  },
  {
    id: "X06",
    category: "Contradicción estratégica",
    name: "Hay experiencia, pero el negocio sigue dependiendo demasiado de explicación individual",
    severity: 8,
    variables: ["claridad_mensaje", "conversion", "propuesta_valor"],
    mode: "all",
    minScore: 1,
    description:
      "La conversión depende demasiado de conversaciones personalizadas porque el mensaje, la oferta y el proceso no comunican suficiente claridad por sí solos.",
  },
  {
    id: "X07",
    category: "Contradicción estratégica",
    name: "El contenido atrae atención, pero no filtra oportunidades correctas",
    severity: 8,
    variables: ["contenido", "cliente_ideal", "captacion"],
    mode: "all",
    minScore: 1,
    description:
      "El contenido puede generar visibilidad, pero no está filtrando con precisión al tipo de cliente que realmente debería avanzar hacia una conversación comercial.",
  },
  {
    id: "X08",
    category: "Contradicción estratégica",
    name: "La captación existe, pero la propuesta no está preparada para convertir",
    severity: 9,
    variables: ["captacion", "propuesta_valor", "conversion"],
    mode: "all",
    minScore: 1,
    description:
      "El negocio puede atraer oportunidades, pero la propuesta todavía no está suficientemente empaquetada para facilitar una decisión de compra clara.",
  },
];

function variableScore(
  variables: Record<string, VariableScore>,
  variable: string
) {
  return variables[variable]?.score ?? 0;
}

function matchesPattern(
  pattern: PatternV2,
  variables: Record<string, VariableScore>
) {
  const minScore = pattern.minScore ?? 1;

  if (pattern.mode === "all") {
    return pattern.variables.every(
      (variable) => variableScore(variables, variable) >= minScore
    );
  }

  return pattern.variables.some(
    (variable) => variableScore(variables, variable) >= minScore
  );
}

export function detectPatternsV2FromVariables(
  variables: Record<string, VariableScore>
): DiagnosticPattern[] {
  return PATTERNS_V2.filter((pattern) =>
    matchesPattern(pattern, variables)
  ).map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    description: pattern.description,
    severity: pattern.severity,
    evidence: [],
    matched_variables: pattern.variables,
  }));
}