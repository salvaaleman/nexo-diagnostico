import type { VariableScore } from "./variables";

export type DiagnosticPattern = {
  id: string;
  name: string;
  description: string;
  severity: number;
  evidence: string[];
  matched_variables: string[];
};

export function detectPatternsFromVariables(
  variables: Record<string, VariableScore>
): DiagnosticPattern[] {
  const patterns: DiagnosticPattern[] = [];

  const has = (key: string, minScore = 1) =>
    variables[key] && variables[key].score >= minScore;

  // POSICIONAMIENTO

  if (
    has("claridad_mensaje") &&
    has("propuesta_valor")
  ) {
    patterns.push({
      id: "P001",
      name: "Posicionamiento confuso",
      description:
        "La propuesta no se comunica con suficiente claridad y puede generar dudas sobre qué se ofrece realmente.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "claridad_mensaje",
        "propuesta_valor",
      ],
    });
  }

  // CLIENTE IDEAL

  if (has("cliente_ideal")) {
    patterns.push({
      id: "P002",
      name: "Cliente ideal poco definido",
      description:
        "No existe suficiente precisión sobre el perfil de cliente que se quiere atraer.",
      severity: 7,
      evidence: [],
      matched_variables: [
        "cliente_ideal",
      ],
    });
  }

  // DIFERENCIACIÓN

  if (has("diferenciacion")) {
    patterns.push({
      id: "P003",
      name: "Diferenciación insuficiente",
      description:
        "La propuesta parece fácilmente sustituible por alternativas similares.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "diferenciacion",
      ],
    });
  }

  // CAPTACIÓN

  if (has("captacion")) {
    patterns.push({
      id: "P004",
      name: "Captación poco estructurada",
      description:
        "La generación de oportunidades parece depender de acciones aisladas y no de un sistema estable.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "captacion",
      ],
    });
  }

  // CONTENIDO

  if (has("contenido")) {
    patterns.push({
      id: "P005",
      name: "Contenido sin estrategia clara",
      description:
        "La comunicación no parece responder a una arquitectura definida de autoridad y conversión.",
      severity: 7,
      evidence: [],
      matched_variables: [
        "contenido",
      ],
    });
  }

  // CONVERSIÓN

  if (has("conversion")) {
    patterns.push({
      id: "P006",
      name: "Fricción en la conversión",
      description:
        "Existen obstáculos que dificultan que una oportunidad avance hacia una decisión.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "conversion",
      ],
    });
  }

  // SEGUIMIENTO

  if (has("seguimiento")) {
    patterns.push({
      id: "P007",
      name: "Seguimiento débil",
      description:
        "No se detecta un proceso sólido para acompañar oportunidades en el tiempo.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "seguimiento",
      ],
    });
  }

  // SISTEMAS

  if (has("sistemas")) {
    patterns.push({
      id: "P008",
      name: "Ausencia de sistemas",
      description:
        "Existen señales de dependencia excesiva del trabajo manual.",
      severity: 9,
      evidence: [],
      matched_variables: [
        "sistemas",
      ],
    });
  }

  // IA

  if (has("ia")) {
    patterns.push({
      id: "P009",
      name: "Infrautilización de IA",
      description:
        "La inteligencia artificial todavía no forma parte central de los procesos.",
      severity: 6,
      evidence: [],
      matched_variables: [
        "ia",
      ],
    });
  }

  // IMPLEMENTACIÓN

  if (has("implementacion")) {
    patterns.push({
      id: "P010",
      name: "Capacidad de implementación limitada",
      description:
        "El tiempo, recursos o estructura actual pueden dificultar la ejecución.",
      severity: 8,
      evidence: [],
      matched_variables: [
        "implementacion",
      ],
    });
  }

  return patterns;
}