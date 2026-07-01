import type { DiagnosticCard } from "../types";

type CardStatus = DiagnosticCard["estado"];
type CardPriority = DiagnosticCard["prioridad"];
type CardConfidence = DiagnosticCard["confianza"];

type AreaReasoning = {
  areaId?: string;
  summary?: string;
  status?: CardStatus;
  priority?: CardPriority;
  confidence?: CardConfidence;
  findings?: string[];
  explanation?: string;
  actions?: string[];
  impact?: string;
};

type AreaReasoningMap = Record<string, AreaReasoning | undefined>;

type BuildCardsParams = {
  areaReasoning: AreaReasoningMap;
};

const AREA_LABELS: Record<string, string> = {
  business_model: "Modelo de negocio",
  captacion: "Captación",
  conversion: "Conversión",
  seguimiento: "Seguimiento",
  procesos: "Procesos",
  automatizacion: "Automatización",
  liderazgo: "Liderazgo",
  rentabilidad: "Rentabilidad",
  escalabilidad: "Escalabilidad",
};

const AREA_SUBTITLES: Record<string, string> = {
  business_model:
    "Una propuesta clara reduce dudas, diferencia el negocio y facilita que el cliente entienda por qué debe elegirte.",
  captacion:
    "La captación muestra si el negocio genera oportunidades de forma constante o depende demasiado de acciones puntuales.",
  conversion:
    "La conversión revela si el interés inicial termina transformándose en clientes reales o se pierde durante el proceso comercial.",
  seguimiento:
    "El seguimiento determina cuánto valor se conserva después del primer contacto y cuántas oportunidades terminan olvidándose.",
  procesos:
    "Los procesos indican si el negocio puede crecer de forma ordenada o si cada mejora depende del esfuerzo diario de una sola persona.",
  automatizacion:
    "La automatización solo aporta valor cuando existe un proceso claro sobre el que trabajar, no cuando intenta sustituir el desorden.",
  liderazgo:
    "La dirección estratégica refleja si las decisiones siguen una prioridad clara o responden continuamente a urgencias del día a día.",
  rentabilidad:
    "La rentabilidad muestra si el crecimiento genera más beneficio o simplemente incrementa el volumen de trabajo.",
  escalabilidad:
    "La escalabilidad indica si el negocio puede crecer sin multiplicar fricción operativa, dependencia personal o improvisación.",
};

const ORDER = [
  "business_model",
  "captacion",
  "conversion",
  "seguimiento",
  "procesos",
  "automatizacion",
  "liderazgo",
  "rentabilidad",
  "escalabilidad",
];

function normalizeText(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildCards({
  areaReasoning,
}: BuildCardsParams): DiagnosticCard[] {
  if (!areaReasoning) return [];

  return ORDER.map((areaId, index): DiagnosticCard => {
    const area = areaReasoning[areaId];

    return {
      id: areaId,
      numero: index + 1,

      titulo: AREA_LABELS[areaId] ?? areaId,
      subtitulo: AREA_SUBTITLES[areaId] ?? "",

      estado: area?.status ?? "atencion",
      prioridad: area?.priority ?? "media",
      confianza: area?.confidence ?? "media",

      resumen: normalizeText(area?.summary),

      hallazgos: normalizeStringArray(area?.findings),

      explicacion: normalizeText(area?.explanation),

      acciones: normalizeStringArray(area?.actions),

      impacto: normalizeText(area?.impact),

      datos: {
        areaId,
        raw: area ?? null,
      },
    };
  });
}