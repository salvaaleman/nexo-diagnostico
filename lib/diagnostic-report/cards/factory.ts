import type { DiagnosticCard } from "../types";
import type {
  CardBuilder,
  CardDefinition,
  CardEngineContext,
} from "./types";

export function createCard(
  definition: CardDefinition
): DiagnosticCard {
  return {
    id: definition.id,

    numero: definition.numero,

    titulo: definition.titulo,

    subtitulo: definition.subtitulo,

    estado: definition.estado,

    prioridad: definition.prioridad,

    confianza: definition.confianza,

    resumen: definition.resumen,

    hallazgos: [...definition.hallazgos],

    explicacion: definition.explicacion,

    acciones: [...definition.acciones],

    impacto: definition.impacto,

    datos: { ...definition.datos },
  };
}

export function createCardBuilder(
  build: (context: CardEngineContext) => CardDefinition
): CardBuilder {
  return (context: CardEngineContext) => {
    const definition = build(context);

    return createCard(definition);
  };
}