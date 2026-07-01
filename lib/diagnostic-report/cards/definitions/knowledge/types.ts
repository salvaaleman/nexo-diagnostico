export type BusinessAreaId =
  | "business_model"
  | "captacion"
  | "conversion"
  | "seguimiento"
  | "procesos"
  | "automatizacion"
  | "liderazgo"
  | "rentabilidad"
  | "prioridades";

export type StrategicPriorityLevel =
  | "alta"
  | "media"
  | "baja";

export interface PriorityKnowledge {
  nivel: StrategicPriorityLevel;
  nombre: string;
  descripcion: string;
  plazoRecomendado: string;
  impactoEsperado: string;
  criterio: string;
}

export interface BusinessAreaKnowledge {
  id: BusinessAreaId;
  nombre: string;
  descripcion: string;
  objetivoDiagnostico: string;
  senalesHabituales: string[];
  riesgos: string[];
  recomendacionesBase: string[];
}