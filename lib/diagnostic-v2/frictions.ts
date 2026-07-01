import type { Friction, Signal, Severity, Confidence } from "./types";

type FrictionDefinition = {
  id: string;
  name: string;
  category: string;
  description: string;
  signalIds: string[];
  recommendation: string;
};

const FRICTION_DEFINITIONS: FrictionDefinition[] = [
  {
    id: "claridad_oferta",
    name: "Fricción de claridad de oferta",
    category: "Estrategia",
    description:
      "El negocio no está explicando con suficiente claridad qué ofrece, qué problema resuelve o qué resultado obtiene el cliente.",
    signalIds: [
      "oferta_confusa",
      "mensaje_generico",
      "cliente_no_entiende",
      "objeciones_comerciales",
    ],
    recommendation:
      "Clarificar la oferta principal antes de aumentar acciones de captación o comunicación.",
  },
  {
    id: "posicionamiento",
    name: "Fricción de posicionamiento",
    category: "Estrategia",
    description:
      "Lo que el negocio quiere transmitir no termina de coincidir con lo que el cliente percibe o entiende.",
    signalIds: [
      "diferenciacion_debil",
      "mensaje_generico",
      "cliente_no_entiende",
      "bloqueo_comunicacion",
    ],
    recommendation:
      "Revisar la propuesta de valor, el mensaje principal y los elementos que justifican la elección frente a otras alternativas.",
  },
  {
    id: "cliente_ideal_real",
    name: "Fricción entre cliente ideal y cliente real",
    category: "Estrategia",
    description:
      "El negocio puede estar atrayendo personas que no encajan del todo con el perfil que realmente quiere atender.",
    signalIds: [
      "objeciones_comerciales",
      "dependencia_recomendaciones",
      "perdida_oportunidades",
      "mensaje_generico",
    ],
    recommendation:
      "Revisar si el mensaje, los canales y el proceso comercial están filtrando correctamente al tipo de cliente deseado.",
  },
];

function severityFromScore(score: number): Severity {
  if (score >= 12) return "critica";
  if (score >= 9) return "alta";
  if (score >= 6) return "media";
  return "baja";
}

function confidenceFromSignals(matchedSignals: Signal[]): Confidence {
  if (matchedSignals.length >= 4) return "alta";
  if (matchedSignals.length >= 2) return "media";
  return "baja";
}

function safeNumber(value: unknown): number {
  if (typeof value === "number" && !isNaN(value)) return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

function safeValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

export function detectFrictions(signals: Signal[]): Friction[] {
  const safeSignals = Array.isArray(signals) ? signals : [];

  const frictions: Friction[] = [];

  for (const definition of FRICTION_DEFINITIONS) {
    const matchedSignals = safeSignals.filter((signal) =>
      definition.signalIds.includes(signal.id)
    );

    const score = matchedSignals.reduce((total, signal) => {
      return total + safeNumber((signal as any).weight ?? (signal as any).score);
    }, 0);

    if (score < 3 || matchedSignals.length < 2) continue;

    frictions.push({
      id: definition.id,
      name: definition.name,
      category: definition.category,
      description: definition.description,
      severity: severityFromScore(score),
      confidence: confidenceFromSignals(matchedSignals),
      score,
      conditions: matchedSignals.map((s) => s.id),
      evidence: matchedSignals.map((s) => safeValue((s as any).evidence ?? s.id)),
      recommendation: definition.recommendation,
    });
  }

  return frictions.sort((a, b) => b.score - a.score);
}