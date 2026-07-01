import type { Friction, IndexScore } from "./types";

const INDEX_DEFINITIONS: Array<{
  id: string;
  name: string;
  frictionIds: string[];
}> = [
  {
    id: "claridad",
    name: "Índice de Claridad",
    frictionIds: ["claridad_oferta", "posicionamiento"],
  },
  {
    id: "comercial",
    name: "Índice Comercial",
    frictionIds: [
      "cliente_ideal_real",
      "confianza",
      "captacion",
      "seguimiento_comercial",
      "respuesta_cliente",
      "conversion",
    ],
  },
  {
    id: "operativo",
    name: "Índice Operativo",
    frictionIds: [
      "dependencia_fundador",
      "procesos",
      "capacidad_operativa",
      "organizacion_interna",
    ],
  },
  {
    id: "tecnologico",
    name: "Índice Tecnológico",
    frictionIds: ["tecnologica", "herramientas_procesos"],
  },
  {
    id: "crecimiento",
    name: "Índice de Crecimiento",
    frictionIds: [
      "escalabilidad",
      "priorizacion",
      "objetivos_recursos",
      "toma_decisiones",
      "crecimiento_sostenible",
    ],
  },
  {
    id: "comunicacion",
    name: "Índice de Comunicación",
    frictionIds: ["comunicacion", "posicionamiento", "claridad_oferta"],
  },
];

function levelFromScore(score: number): IndexScore["level"] {
  if (score >= 80) return "excelente";
  if (score >= 65) return "alto";
  if (score >= 45) return "medio";
  if (score >= 25) return "bajo";
  return "muy_bajo";
}

export function buildIndices(frictions: Friction[]): IndexScore[] {
  return INDEX_DEFINITIONS.map((definition) => {
    const related = frictions.filter((friction) =>
      definition.frictionIds.includes(friction.id)
    );

    const totalFrictionScore = related.reduce(
      (total, friction) => total + friction.score,
      0
    );

    const maxExpectedScore = definition.frictionIds.length * 12;

    const healthScore =
      maxExpectedScore === 0
        ? 100
        : Math.max(
            0,
            Math.round(100 - (totalFrictionScore / maxExpectedScore) * 100)
          );

    return {
      id: definition.id,
      name: definition.name,
      score: healthScore,
      level: levelFromScore(healthScore),
    };
  });
}