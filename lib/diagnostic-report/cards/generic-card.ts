import type { DiagnosticCard } from "../types";
import type { CardEngineContext } from "./types";

export function buildGenericCard(
  context: CardEngineContext,
  config: any
): DiagnosticCard {

  const area = context.areaReasoning?.[config.areaId];

  return {
    id: config.cardId,
    numero: config.order,

    titulo: config.title,
    subtitulo: config.subtitle,

    estado: area?.status || "atencion",
    prioridad: area?.priority || "media",
    confianza: area?.confidence || "media",

    // SOLO DATOS (sin narrativa)
    resumen: "",

    // SOLO HECHOS
    hallazgos: (area?.findings || []).slice(0, 2),

    // ELIMINADO COMPLETAMENTE
    explicacion: "",

    // SOLO ACCIONES CORTAS (sin contexto)
    acciones: (area?.actions || []).slice(0, 2),

    // SIN INTERPRETACIÓN
    impacto: "",

    datos: {
      fricciones: context.frictions?.slice(0, 2) || [],
    },
  };
}