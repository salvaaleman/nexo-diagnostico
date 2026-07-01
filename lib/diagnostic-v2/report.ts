import type { DiagnosticResult, Friction, IndexScore, RootCause } from "./types";

export function buildReport(
  indices: IndexScore[],
  frictions: Friction[],
  rootCause: RootCause,
  roadmap: DiagnosticResult["roadmap"]
): DiagnosticResult {
  const estadoGeneral =
    indices.reduce((sum, index) => sum + index.score, 0) /
    Math.max(indices.length, 1);

  let resumen = "";

  if (estadoGeneral >= 80) {
    resumen =
      "El negocio presenta una estructura sólida. Las fricciones detectadas son puntuales y su corrección puede mejorar el rendimiento general.";
  } else if (estadoGeneral >= 60) {
    resumen =
      "Se detectan varias fricciones que limitan el crecimiento, aunque la base del negocio permite corregirlas con una hoja de ruta adecuada.";
  } else if (estadoGeneral >= 40) {
    resumen =
      "Existen fricciones estructurales relevantes que afectan al funcionamiento del negocio y dificultan su crecimiento de forma sostenible.";
  } else {
    resumen =
      "La arquitectura del negocio presenta varias desconexiones importantes. Antes de aumentar captación o inversión conviene ordenar la estructura interna.";
  }

  return {
    version: "2.0",
    resumen,
    indices,
    frictions,
    rootCause,
    roadmap,
  };
}