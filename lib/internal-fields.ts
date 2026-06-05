// Nexo IA · Diagnóstico Cliente
// internal-fields.ts — TODO esto es 100% INTERNO.
// Se guarda en la columna `internal_eval` (jsonb) de la tabla `diagnoses`.

import type { StrategicRecommendation } from "./diagnostic/recommendations";

// ────────────────────────────────────────────────────────────────────────
// 1) ALERTAS INTERNAS
// ────────────────────────────────────────────────────────────────────────

export const ALERTAS: string[] = [
  "Quiere resultados inmediatos",
  "Quiere llegar a todo el mundo",
  "No sabe explicar qué vende",
  "No tiene oferta clara",
  "Busca garantías de ventas",
  "No quiere implicarse",
  "No dispone de tiempo para implementar",
  "Siempre culpa a terceros",
  'Busca solo "posts bonitos"',
  "No tiene activos mínimos",
  "No tiene decisión clara",
  "Tiene urgencia sin motivo real",
];

// ────────────────────────────────────────────────────────────────────────
// 2) EVALUACIÓN INTERNA
// ────────────────────────────────────────────────────────────────────────

export type Recommendation = StrategicRecommendation;

export interface InternalEval {
  alertas: string[];
  recommendation: Recommendation;
  notas: string;
}

export function emptyInternalEval(): InternalEval {
  return {
    alertas: [],
    recommendation: {
      summary: "",
      main_problems: [],
      main_bottleneck: "",
      maturity_level: "",
      active_strengths: [],
      priority_plan: [],
      strategic_explanation: "",
      recommended_focus: [],
      recommended_pack: "No apto todavía",
      pack_reason: "",
      priority: "baja",
    },
    notas: "",
  };
}