export type CardStatus = "correcto" | "atencion" | "critico";

export type CardPriority = "alta" | "media" | "baja";

export type CardConfidence = "alta" | "media" | "baja";

export interface Metadata {
  version: string;
  diagnosticId: string;
  clientId: string;
  createdAt: string;
  questionnaireVersion: string;
  analysisVersion: string;
}

export interface ExecutiveSummary {
  titulo: string;
  subtitulo: string;
  resumen: string;
  diagnosticoGeneral: string;
  nivelGeneral: string;
  confianzaGlobal: CardConfidence;
}

export interface BusinessSnapshot {
  sector: string;
  tipoNegocio: string;
  modeloNegocio: string;
  empleados: string;
  facturacion: string;
  añosActividad: string;
  faseEmpresa: string;
}

export interface GlobalScores {
  claridad: number;
  captacion: number;
  conversion: number;
  seguimiento: number;
  procesos: number;
  automatizacion: number;
  direccion: number;
  riesgoGlobal: number;
}

export interface PriorityItem {
  titulo: string;
  descripcion: string;
  impacto: string;
  urgencia: CardPriority;
}

export interface RoadmapItem {
  titulo: string;
  descripcion: string;
  prioridad: CardPriority;
}

export interface AreaReasoningContent {
  areaId: string;
  summary: string;
  findings: string[];
  explanation: string;
  actions: string[];
  impact: string;
  confidence: CardConfidence;
  priority: CardPriority;
  status: CardStatus;
}

export type AreaReasoningMap = Record<string, AreaReasoningContent>;

export interface DiagnosticCard {
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

export interface EngineData {
  signals: unknown[];
  scores: unknown;
  indices: unknown[];
  frictions: unknown[];
  frictionRelations?: unknown[];
  rootCause: unknown;
  roadmap: unknown;
  strategicInsights?: unknown[];
  reasoning?: unknown;
  areaReasoning?: AreaReasoningMap;
}

export interface DiagnosticReport {
  metadata: Metadata;

  executiveSummary: ExecutiveSummary;

  businessSnapshot: BusinessSnapshot;

  globalScores: GlobalScores;

  priorities: PriorityItem[];

  roadmap: {
    ahora: RoadmapItem[];
    dias30: RoadmapItem[];
    dias90: RoadmapItem[];
  };

  cards: DiagnosticCard[];

  engine: EngineData;
}