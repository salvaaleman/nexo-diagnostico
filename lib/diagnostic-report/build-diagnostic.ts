import type {
  DiagnosticReport,
  Metadata,
  ExecutiveSummary,
  BusinessSnapshot,
  GlobalScores,
  PriorityItem,
  RoadmapItem,
  DiagnosticCard,
  EngineData,
  AreaReasoningMap,
} from "./types";

import type { IndexScore, Friction, Signal } from "../diagnostic-v2/types";

import { buildCards } from "./cards";

interface BuildDiagnosticReportParams {
  metadata: Metadata;
  businessSnapshot: BusinessSnapshot;
  executiveSummary: ExecutiveSummary;
  globalScores: GlobalScores;
  priorities: PriorityItem[];
  roadmap: {
    ahora: RoadmapItem[];
    dias30: RoadmapItem[];
    dias90: RoadmapItem[];
  };

  engine: {
    signals: Signal[];
    scores: unknown;
    indices: IndexScore[];
    frictions: Friction[];
    frictionRelations?: unknown[];
    rootCause: unknown;
    roadmap: unknown;
    strategicInsights?: unknown[];
    reasoning?: unknown;
    areaReasoning?: AreaReasoningMap;
  };
}

export function buildDiagnosticReport({
  metadata,
  businessSnapshot,
  executiveSummary,
  globalScores,
  priorities,
  roadmap,
  engine,
}: BuildDiagnosticReportParams): DiagnosticReport {
  const engineData: EngineData = {
    signals: engine.signals,
    scores: engine.scores,
    indices: engine.indices,
    frictions: engine.frictions,
    frictionRelations: engine.frictionRelations,
    rootCause: engine.rootCause,
    roadmap: engine.roadmap,
    strategicInsights: engine.strategicInsights,
    reasoning: engine.reasoning,
    areaReasoning: engine.areaReasoning,
  };

  const cards: DiagnosticCard[] = buildCards({
    signals: engine.signals,
    scores: engine.scores,
    indices: engine.indices,
    frictions: engine.frictions,
    frictionRelations: engine.frictionRelations,
    rootCause: engine.rootCause,
    roadmap: engine.roadmap,
    areaReasoning: engine.areaReasoning ?? {},
  } as any);

  return {
    metadata,
    executiveSummary,
    businessSnapshot,
    globalScores,
    priorities,
    roadmap,
    cards,
    engine: engineData,
  };
}