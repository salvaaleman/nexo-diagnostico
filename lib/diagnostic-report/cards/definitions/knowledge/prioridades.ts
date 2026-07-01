import type {
  PriorityKnowledge,
  StrategicPriorityLevel,
} from "./types";

export const PRIORITIES: Record<
  StrategicPriorityLevel,
  PriorityKnowledge
> = {
  alta: {
    nivel: "alta",

    nombre: "Prioridad alta",

    descripcion:
      "La situación detectada tiene un impacto directo sobre el funcionamiento del negocio y debe abordarse antes de ejecutar nuevas iniciativas.",

    plazoRecomendado:
      "Inmediato (0-30 días).",

    impactoEsperado:
      "Reduce el riesgo operativo y desbloquea el crecimiento del negocio.",

    criterio:
      "Existe una fricción estructural que afecta al rendimiento general.",
  },

  media: {
    nivel: "media",

    nombre: "Prioridad media",

    descripcion:
      "La situación requiere intervención, aunque no compromete por sí sola la estabilidad del negocio.",

    plazoRecomendado:
      "30-90 días.",

    impactoEsperado:
      "Mejora la eficiencia y fortalece la estructura existente.",

    criterio:
      "La fricción genera pérdidas de rendimiento, pero existen otras más urgentes.",
  },

  baja: {
    nivel: "baja",

    nombre: "Prioridad baja",

    descripcion:
      "No requiere actuación inmediata. Conviene planificar su mejora una vez resueltas las prioridades superiores.",

    plazoRecomendado:
      "Más de 90 días.",

    impactoEsperado:
      "Optimiza el sistema y mejora el rendimiento a largo plazo.",

    criterio:
      "Su impacto actual es reducido y no limita el crecimiento inmediato.",
  },
};

export function getPriorityKnowledge(
  level: StrategicPriorityLevel
): PriorityKnowledge {
  return PRIORITIES[level];
}