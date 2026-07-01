import { detectSignals } from "./signals";
import { detectFrictions } from "./frictions";
import { buildFrictionRelations } from "./friction-relations";
import { buildIndices } from "./indices";
import { detectRootCause } from "./root-cause";
import { buildRoadmap } from "./roadmap";
import { buildStrategicInsights } from "./strategic-insights";
import { buildReasoning } from "./reasoning";
import { buildAreaReasoning } from "./build-area-reasoning";

import { buildDiagnosticReport } from "../diagnostic-report/build-diagnostic";

import type {
  BusinessSnapshot,
  ExecutiveSummary,
  GlobalScores,
  PriorityItem,
  RoadmapItem,
} from "../diagnostic-report/types";

type Answers = Record<string, unknown>;

function getText(value: unknown, fallback = "No indicado"): string {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function getRootCauseTitle(rootCause: any): string {
  return (
    rootCause?.title ||
    rootCause?.titulo ||
    rootCause?.name ||
    "Fricción principal no determinada"
  );
}

function getRootCauseDescription(rootCause: any): string {
  return (
    rootCause?.description ||
    rootCause?.descripcion ||
    rootCause?.reasoning ||
    rootCause?.explanation ||
    "El diagnóstico detecta tensiones relevantes en el sistema de negocio que deben interpretarse antes de aumentar ejecución, inversión o automatización."
  );
}

function normalizeScore(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function findIndexScore(indices: any[], keys: string[]): number {
  const found = indices.find((index) => {
    const id = String(index?.id || index?.area || index?.key || "").toLowerCase();
    const label = String(index?.label || index?.name || index?.title || "").toLowerCase();

    return keys.some((key) => id.includes(key) || label.includes(key));
  });

  return normalizeScore(found?.score ?? found?.value ?? 0);
}

function buildBusinessSnapshot(answers: Answers): BusinessSnapshot {
  return {
    sector: getText(answers.sector || answers.business_sector || answers.b1_sector),
    tipoNegocio: getText(
      answers.tipoNegocio ||
        answers.tipo_negocio ||
        answers.business_type ||
        answers.b1_tipo_negocio
    ),
    modeloNegocio: getText(
      answers.modeloNegocio ||
        answers.modelo_negocio ||
        answers.business_model ||
        answers.b1_modelo
    ),
    empleados: getText(
      answers.empleados ||
        answers.numero_empleados ||
        answers.team_size ||
        answers.b1_empleados
    ),
    facturacion: getText(
      answers.facturacion ||
        answers.facturacion_anual ||
        answers.revenue ||
        answers.b1_facturacion
    ),
    añosActividad: getText(
      answers.añosActividad ||
        answers.anosActividad ||
        answers.years_active ||
        answers.b1_antiguedad
    ),
    faseEmpresa: getText(
      answers.faseEmpresa ||
        answers.fase_empresa ||
        answers.business_stage ||
        answers.b1_fase
    ),
  };
}

function buildExecutiveSummaryFromEngine(params: {
  rootCause: any;
  frictions: any[];
}): ExecutiveSummary {
  const { rootCause, frictions } = params;

  const rootCauseTitle = getRootCauseTitle(rootCause);
  const rootCauseDescription = getRootCauseDescription(rootCause);

  const nivelGeneral =
    frictions.length >= 8 ? "critico" : frictions.length >= 4 ? "atencion" : "correcto";

  const confianzaGlobal =
    frictions.length >= 8 ? "baja" : frictions.length >= 4 ? "media" : "alta";

  return {
    titulo: "Diagnóstico estratégico empresarial",
    subtitulo:
      "El negocio no tiene un problema aislado. El diagnóstico muestra tensiones conectadas que afectan al crecimiento, la conversión y la continuidad operativa.",
    resumen:
      "Ya existen señales suficientes para interpretar el sistema de negocio. El siguiente paso no es aumentar actividad, sino ordenar prioridades y actuar sobre la causa que más condiciona el rendimiento.",
    diagnosticoGeneral: `El problema principal no es una acción aislada, sino ${rootCauseTitle}, porque desde ahí se generan o amplifican otras tensiones del negocio. ${rootCauseDescription}`,
    nivelGeneral,
    confianzaGlobal,
  };
}

function buildGlobalScoresFromIndices(indices: any[]): GlobalScores {
  return {
    claridad: findIndexScore(indices, ["claridad", "oferta", "mensaje"]),
    captacion: findIndexScore(indices, ["captacion", "canales", "visibilidad"]),
    conversion: findIndexScore(indices, ["conversion", "venta", "cliente"]),
    seguimiento: findIndexScore(indices, ["seguimiento", "contacto", "crm"]),
    procesos: findIndexScore(indices, ["procesos", "operacion", "sistema"]),
    automatizacion: findIndexScore(indices, ["automatizacion", "ia", "herramientas"]),
    direccion: findIndexScore(indices, ["direccion", "liderazgo", "prioridad"]),
    riesgoGlobal: normalizeScore(
      indices.reduce((acc: number, index: any) => acc + (index?.score || 0), 0) /
        Math.max(indices.length, 1)
    ),
  };
}

function buildPrioritiesFromEngine(params: {
  rootCause: any;
  frictions: any[];
}): PriorityItem[] {
  const { rootCause, frictions } = params;

  const rootCauseTitle = getRootCauseTitle(rootCause);
  const rootCauseDescription = getRootCauseDescription(rootCause);

  const firstFriction = frictions[0] as any;
  const secondFriction = frictions[1] as any;

  return [
    {
      titulo: rootCauseTitle,
      descripcion: rootCauseDescription,
      impacto:
        "Trabajar primero esta causa permite que varias áreas mejoren de forma indirecta sin multiplicar acciones sueltas.",
      urgencia: "alta",
    },
    {
      titulo:
        firstFriction?.title ||
        firstFriction?.label ||
        "Ordenar el flujo comercial antes de aumentar actividad",
      descripcion:
        firstFriction?.description ||
        firstFriction?.evidence ||
        "Definir entrada del contacto, respuesta inicial, clasificación, seguimiento y recuperación.",
      impacto:
        "Un flujo mínimo reduce pérdida de oportunidades y mejora la lectura real del sistema comercial.",
      urgencia: "media",
    },
    {
      titulo:
        secondFriction?.title ||
        secondFriction?.label ||
        "Documentar procesos críticos y separar tareas repetibles",
      descripcion:
        secondFriction?.description ||
        secondFriction?.evidence ||
        "Identificar qué tareas se repiten y cuáles deben quedar sistematizadas antes de escalar.",
      impacto:
        "La estructura operativa permite crecer con menos dependencia de una sola persona.",
      urgencia: "alta",
    },
  ];
}

function normalizeRoadmapItems(items: unknown, fallback: RoadmapItem[]): RoadmapItem[] {
  if (!Array.isArray(items)) return fallback;

  return items.map((item: any): RoadmapItem => {
    return {
      titulo: item?.titulo || item?.title || item?.label || "Acción recomendada",
      descripcion:
        item?.descripcion ||
        item?.description ||
        item?.impact ||
        item?.reason ||
        "Acción derivada del diagnóstico estratégico.",
      prioridad: item?.prioridad || item?.priority || "media",
    };
  });
}

function buildRoadmapFromEngine(roadmap: any, priorities: PriorityItem[]): {
  ahora: RoadmapItem[];
  dias30: RoadmapItem[];
  dias90: RoadmapItem[];
} {
  return {
    ahora: normalizeRoadmapItems(roadmap?.ahora || roadmap?.now, [
      {
        titulo: priorities[0]?.titulo || "Definir la primera prioridad de intervención",
        descripcion:
          priorities[0]?.descripcion ||
          "Convertir la causa principal en una acción concreta de mejora.",
        prioridad: "alta",
      },
      {
        titulo: priorities[1]?.titulo || "Ordenar el flujo comercial mínimo",
        descripcion:
          priorities[1]?.descripcion ||
          "Definir cómo entra, se clasifica, se responde y se recupera cada oportunidad.",
        prioridad: "media",
      },
    ]),
    dias30: normalizeRoadmapItems(roadmap?.dias30 || roadmap?.days30, [
      {
        titulo: "Consolidar el sistema mínimo de seguimiento",
        descripcion:
          "Convertir las primeras acciones en un proceso repetible y medible durante los próximos 30 días.",
        prioridad: "media",
      },
      {
        titulo: "Documentar los procesos más repetidos",
        descripcion:
          "Separar tareas operativas, comerciales y estratégicas para reducir improvisación.",
        prioridad: "media",
      },
    ]),
    dias90: normalizeRoadmapItems(roadmap?.dias90 || roadmap?.days90, [
      {
        titulo: "Consolidar mejora en conversión",
        descripcion:
          "Revisar si las oportunidades captadas están transformándose en clientes reales con más continuidad.",
        prioridad: "baja",
      },
      {
        titulo: "Consolidar mejora en procesos",
        descripcion:
          "Medir si el negocio depende menos de improvisación y más de estructura operativa.",
        prioridad: "baja",
      },
    ]),
  };
}

export function analyzeV2(answers: Answers) {
  const signals = detectSignals(answers);

  const frictions = detectFrictions(signals);
  const frictionRelations = buildFrictionRelations(frictions);
  const indices = buildIndices(frictions);

  const rootCause = detectRootCause(frictions, frictionRelations);
  const roadmapRaw = buildRoadmap(frictions);

  const strategicInsights = buildStrategicInsights(answers);

  const reasoning = buildReasoning({
    answers,
    frictions,
    frictionRelations,
    rootCause,
  });

  const areaReasoning = buildAreaReasoning({
    strategicInsights,
    reasoning,
    frictions,
    frictionRelations,
    indices,
  });

  const engine = {
    signals,
    scores: {
      global: indices.reduce((acc: number, i: any) => acc + (i.score || 0), 0),
      count: indices.length,
    },
    indices,
    frictions,
    frictionRelations,
    rootCause,
    roadmap: roadmapRaw,
    strategicInsights,
    reasoning,
    areaReasoning,
  };

  const executiveSummary = buildExecutiveSummaryFromEngine({
    rootCause,
    frictions,
  });

  const globalScores = buildGlobalScoresFromIndices(indices);

  const priorities = buildPrioritiesFromEngine({
    rootCause,
    frictions,
  });

  const roadmap = buildRoadmapFromEngine(roadmapRaw, priorities);

  const report = buildDiagnosticReport({
    metadata: {
      version: "2.0",
      diagnosticId: "auto",
      clientId: "auto",
      createdAt: new Date().toISOString(),
      questionnaireVersion: "v1",
      analysisVersion: "v2",
    },

    businessSnapshot: buildBusinessSnapshot(answers),

    executiveSummary,

    globalScores,

    priorities,

    roadmap,

    engine,
  });

  return {
    engine,
    report,
    analyzedAt: new Date().toISOString(),
  };
}