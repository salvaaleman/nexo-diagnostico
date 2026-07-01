export type Severity =
  | "baja"
  | "media"
  | "alta"
  | "critica";

export type Confidence =
  | "baja"
  | "media"
  | "alta";

export interface Signal {
  id: string;
  questionId: string;
  value: unknown;
  score: number;
}

export interface Friction {
  id: string;
  name: string;
  description: string;
  category: string;

  severity: Severity;
  confidence: Confidence;

  score: number;

  conditions: string[];

  evidence: string[];

  recommendation?: string;
}

export interface FrictionRelation {
  id: string;

  fromFrictionId: string;
  toFrictionId: string;

  fromCategory: string;
  toCategory: string;

  type:
    | "causa"
    | "agrava"
    | "bloquea"
    | "depende_de"
    | "amplifica";

  strength:
    | "baja"
    | "media"
    | "alta";

  explanation: string;

  evidence: string[];

  strategicImplication: string;
}

export interface IndexScore {
  id: string;
  name: string;

  score: number;

  level:
    | "muy_bajo"
    | "bajo"
    | "medio"
    | "alto"
    | "excelente";
}

export interface RootCause {
  id: string;
  title: string;
  description: string;

  relatedFrictions: string[];

  relatedRelations?: string[];
}

export interface RoadmapItem {
  title: string;
  description: string;
  priority: "alta" | "media" | "baja";
}

export interface DiagnosticResult {

  version: string;

  resumen: string;

  indices: IndexScore[];

  frictions: Friction[];

  frictionRelations?: FrictionRelation[];

  rootCause: RootCause;

  roadmap: {
    ahora: RoadmapItem[];
    dias30: RoadmapItem[];
    dias90: RoadmapItem[];
  };
}