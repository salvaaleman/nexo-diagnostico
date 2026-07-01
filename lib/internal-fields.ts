// Nexo IA · Diagnóstico Cliente
// internal-fields.ts — TODO esto es 100% INTERNO.
// Se guarda en la columna `internal_eval` (jsonb) de la tabla `diagnoses`.

import type { DiagnosticResult } from "./diagnostic-v2/types";

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

export interface InternalEval {
  alertas: string[];
  notas: string;
  diagnostic_v2: DiagnosticResult | null;
}

export function emptyInternalEval(): InternalEval {
  return {
    alertas: [],
    notas: "",
    diagnostic_v2: null,
  };
}