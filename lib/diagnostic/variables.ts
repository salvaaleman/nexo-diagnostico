export interface VariableScore {
  name: string;
  score: number;
  signals: string[];
}

export type VariableMap = Record<string, VariableScore>;

export function emptyVariables(): VariableMap {
  return {
    claridad_mensaje: {
      name: "claridad_mensaje",
      score: 0,
      signals: [],
    },
    cliente_ideal: {
      name: "cliente_ideal",
      score: 0,
      signals: [],
    },
    propuesta_valor: {
      name: "propuesta_valor",
      score: 0,
      signals: [],
    },
    diferenciacion: {
      name: "diferenciacion",
      score: 0,
      signals: [],
    },
    captacion: {
      name: "captacion",
      score: 0,
      signals: [],
    },
    contenido: {
      name: "contenido",
      score: 0,
      signals: [],
    },
    conversion: {
      name: "conversion",
      score: 0,
      signals: [],
    },
    seguimiento: {
      name: "seguimiento",
      score: 0,
      signals: [],
    },
    sistemas: {
      name: "sistemas",
      score: 0,
      signals: [],
    },
    ia: {
      name: "ia",
      score: 0,
      signals: [],
    },
    implementacion: {
      name: "implementacion",
      score: 0,
      signals: [],
    },
  };
}