import type {
  AreaReasoningMap,
  CardConfidence,
  CardPriority,
  CardStatus,
  DiagnosticCard,
} from "../types";

export interface CardEngineContext {
  signals: unknown[];
  scores: unknown;
  indices: unknown[];
  frictions: unknown[];
  rootCause: unknown;
  roadmap: unknown;

  /**
   * Nuevo motor de razonamiento.
   * Las cards dejarán de construir textos y pasarán
   * a representar la información generada aquí.
   */
  reasoning?: unknown;

  strategicInsights?: unknown[];

  areaReasoning?: AreaReasoningMap;
}

export interface CardDefinition {
  id: string;
  numero: number;

  titulo: string;
  subtitulo: string;

  estado: CardStatus;
  prioridad: CardPriority;
  confianza: CardConfidence;

  resumen: string;

  hallazgos: string[];

  explicacion: string;

  acciones: string[];

  impacto: string;

  datos: Record<string, unknown>;
}

export type CardBuilder = (
  context: CardEngineContext
) => DiagnosticCard;