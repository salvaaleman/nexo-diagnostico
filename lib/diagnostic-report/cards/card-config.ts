import type { BusinessAreaId } from "./definitions/knowledge/types";

export interface CardConfig {
  cardId: string;
  area: BusinessAreaId;

  weights: {
    frictions: number;
    indices: number;
    signals: number;
  };

  behavior: {
    sensitivity: "low" | "medium" | "high";
    narrativeTone: "neutral" | "analytical" | "critical";
  };

  focus: string[];
}

export const CARD_CONFIG: CardConfig[] = [
  {
    cardId: "card01",
    area: "business_model",
    weights: { frictions: 0.5, indices: 0.3, signals: 0.2 },
    behavior: { sensitivity: "high", narrativeTone: "critical" },
    focus: ["claridad", "propuesta_valor", "estructura_oferta"],
  },
  {
    cardId: "card02",
    area: "captacion",
    weights: { frictions: 0.6, indices: 0.2, signals: 0.2 },
    behavior: { sensitivity: "high", narrativeTone: "analytical" },
    focus: ["entrada_leads", "canales", "dependencia"],
  },
  {
    cardId: "card03",
    area: "conversion",
    weights: { frictions: 0.7, indices: 0.2, signals: 0.1 },
    behavior: { sensitivity: "high", narrativeTone: "critical" },
    focus: ["cierres", "proceso_ventas", "objeciones"],
  },
  {
    cardId: "card04",
    area: "seguimiento",
    weights: { frictions: 0.6, indices: 0.3, signals: 0.1 },
    behavior: { sensitivity: "medium", narrativeTone: "analytical" },
    focus: ["pipeline", "contacto", "persistencia"],
  },
  {
    cardId: "card05",
    area: "procesos",
    weights: { frictions: 0.6, indices: 0.3, signals: 0.1 },
    behavior: { sensitivity: "medium", narrativeTone: "neutral" },
    focus: ["estructura", "operaciones", "dependencia_persona"],
  },
  {
    cardId: "card06",
    area: "automatizacion",
    weights: { frictions: 0.5, indices: 0.3, signals: 0.2 },
    behavior: { sensitivity: "medium", narrativeTone: "analytical" },
    focus: ["ia", "automatizacion", "herramientas", "procesos_repetitivos"],
  },
  {
    cardId: "card07",
    area: "liderazgo",
    weights: { frictions: 0.5, indices: 0.3, signals: 0.2 },
    behavior: { sensitivity: "high", narrativeTone: "critical" },
    focus: ["prioridades", "decision", "foco", "direccion"],
  },
  {
    cardId: "card08",
    area: "rentabilidad",
    weights: { frictions: 0.6, indices: 0.3, signals: 0.1 },
    behavior: { sensitivity: "high", narrativeTone: "analytical" },
    focus: ["margen", "precio", "retorno", "sostenibilidad"],
  },
  {
    cardId: "card09",
    area: "business_model",
    weights: { frictions: 0.5, indices: 0.3, signals: 0.2 },
    behavior: { sensitivity: "medium", narrativeTone: "analytical" },
    focus: ["coherencia", "oferta", "mercado", "modelo"],
  },
  {
    cardId: "card10",
    area: "captacion",
    weights: { frictions: 0.6, indices: 0.2, signals: 0.2 },
    behavior: { sensitivity: "medium", narrativeTone: "analytical" },
    focus: ["canales", "visibilidad", "origen_contactos", "previsibilidad"],
  },
  {
    cardId: "card11",
    area: "conversion",
    weights: { frictions: 0.7, indices: 0.2, signals: 0.1 },
    behavior: { sensitivity: "medium", narrativeTone: "critical" },
    focus: ["sistema_comercial", "avance", "cierre", "propuesta"],
  },
  {
    cardId: "card12",
    area: "prioridades",
    weights: { frictions: 0.5, indices: 0.3, signals: 0.2 },
    behavior: { sensitivity: "high", narrativeTone: "critical" },
    focus: ["prioridad", "impacto", "urgencia", "orden_de_accion"],
  },
];