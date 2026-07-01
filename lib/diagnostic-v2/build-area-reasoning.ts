import type {
  AreaReasoningContent,
  AreaReasoningMap,
  CardConfidence,
  CardPriority,
  CardStatus,
} from "../diagnostic-report/types";

type InsightLike = {
  id?: string;
  title?: string;
  category?: string;
  severity?: string;
  confidence?: string;
  summary?: string;
  evidence?: string[];
  interpretation?: string;
  risk?: string;
  opportunity?: string;
  recommendation?: string;
  nextAction?: string;
};

type FrictionLike = {
  id?: string;
  category?: string;
  description?: string;
  score?: number;
};

type FrictionRelationLike = {
  id?: string;
  fromFrictionId?: string;
  toFrictionId?: string;
  fromCategory?: string;
  toCategory?: string;
  type?: string;
  strength?: string;
  explanation?: string;
  evidence?: string[];
  strategicImplication?: string;
};

type IndexLike = {
  id?: string;
  score?: number;
};

type HypothesisLike = {
  id?: string;
  area?: string;
  title?: string;
  summary?: string;
  evidence?: string[];
  risk?: string;
  opportunity?: string;
  recommendation?: string;
  nextAction?: string;
  severity?: string;
  confidence?: string;
  scoreImpact?: number;
};

type ReasoningLike = {
  summary?: string;
  mainProblem?: string;
  mainOpportunity?: string;
  mainRisk?: string;
  mainConclusion?: string;
  priorities?: unknown[];
  recommendations?: unknown[];
  hypotheses?: unknown[];
  areas?: Record<string, unknown>;
  areaReasoning?: Record<string, unknown>;
};

type AreaReasoningLike = {
  summary?: string;
  findings?: unknown[];
  explanation?: string;
  actions?: unknown[];
  impact?: string;
  confidence?: string;
  priority?: string;
  status?: string;
};

interface BuildAreaReasoningParams {
  strategicInsights?: unknown[];
  reasoning?: unknown;
  frictions?: unknown[];
  frictionRelations?: unknown[];
  indices?: unknown[];
}

const AREA_ORDER = [
  "business_model",
  "captacion",
  "conversion",
  "seguimiento",
  "procesos",
  "automatizacion",
  "liderazgo",
  "rentabilidad",
  "escalabilidad",
  "canales",
  "sistema_comercial",
  "prioridades",
];

const AREA_LABELS: Record<string, string> = {
  business_model: "modelo de negocio",
  captacion: "captación",
  conversion: "conversión",
  seguimiento: "seguimiento",
  procesos: "procesos",
  automatizacion: "automatización",
  liderazgo: "liderazgo",
  rentabilidad: "rentabilidad",
  escalabilidad: "escalabilidad",
  canales: "canales",
  sistema_comercial: "sistema comercial",
  prioridades: "prioridades",
};

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();

      if (typeof item === "object" && item !== null) {
        const record = item as Record<string, unknown>;

        return (
          normalizeText(record.text) ||
          normalizeText(record.title) ||
          normalizeText(record.summary) ||
          normalizeText(record.description) ||
          normalizeText(record.action) ||
          normalizeText(record.recommendation) ||
          normalizeText(record.explanation) ||
          normalizeText(record.strategicImplication)
        );
      }

      return "";
    })
    .filter((item) => item.length > 0);
}

function uniqueList(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  items.forEach((item) => {
    const normalized = item.trim();

    if (!normalized) return;

    const key = normalized.toLowerCase();

    if (seen.has(key)) return;

    seen.add(key);
    result.push(normalized);
  });

  return result;
}

function limitList(items: string[], limit: number): string[] {
  return uniqueList(items).slice(0, limit);
}

function asInsights(value: unknown[] | undefined): InsightLike[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is InsightLike => typeof item === "object" && item !== null
  );
}

function asFrictions(value: unknown[] | undefined): FrictionLike[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is FrictionLike => typeof item === "object" && item !== null
  );
}

function asFrictionRelations(
  value: unknown[] | undefined
): FrictionRelationLike[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is FrictionRelationLike =>
      typeof item === "object" && item !== null
  );
}

function asIndices(value: unknown[] | undefined): IndexLike[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is IndexLike => typeof item === "object" && item !== null
  );
}

function asReasoning(value: unknown): ReasoningLike {
  if (typeof value !== "object" || value === null) return {};

  return value as ReasoningLike;
}

function asHypotheses(value: unknown[] | undefined): HypothesisLike[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is HypothesisLike => typeof item === "object" && item !== null
  );
}

function asAreaReasoning(value: unknown): AreaReasoningLike {
  if (typeof value !== "object" || value === null) return {};

  return value as AreaReasoningLike;
}

function mapSeverityToStatus(severity: string | undefined): CardStatus {
  if (severity === "critica" || severity === "alta") return "critico";
  if (severity === "media") return "atencion";
  return "correcto";
}

function mapSeverityToPriority(severity: string | undefined): CardPriority {
  if (severity === "critica" || severity === "alta") return "alta";
  if (severity === "media") return "media";
  return "baja";
}

function mapConfidence(value: string | undefined): CardConfidence {
  if (value === "alta" || value === "media" || value === "baja") {
    return value;
  }

  return "media";
}

function mapPriority(value: string | undefined, fallback: CardPriority): CardPriority {
  if (value === "alta" || value === "media" || value === "baja") {
    return value;
  }

  return fallback;
}

function mapStatus(value: string | undefined, fallback: CardStatus): CardStatus {
  if (value === "critico" || value === "atencion" || value === "correcto") {
    return value;
  }

  return fallback;
}

function getScoreForArea(indices: IndexLike[], areaId: string): number {
  const index = indices.find((item) => item.id === areaId);

  return typeof index?.score === "number" ? index.score : 0;
}

function getStatusFromScore(score: number): CardStatus {
  if (score >= 75) return "correcto";
  if (score >= 45) return "atencion";
  return "critico";
}

function getPriorityFromScore(score: number): CardPriority {
  if (score < 45) return "alta";
  if (score < 75) return "media";
  return "baja";
}

function normalizeCategory(category: string | undefined): string {
  const value = normalizeText(category).toLowerCase();

  if (value === "oferta") return "business_model";
  if (value === "modelo_negocio") return "business_model";
  if (value === "modelo de negocio") return "business_model";
  if (value === "claridad") return "business_model";
  if (value === "comunicacion") return "business_model";
  if (value === "comunicación") return "business_model";

  if (value === "marketing") return "captacion";
  if (value === "visibilidad") return "captacion";
  if (value === "captación") return "captacion";

  if (value === "ventas") return "conversion";
  if (value === "conversión") return "conversion";

  if (value === "crm") return "seguimiento";

  if (value === "operaciones") return "procesos";
  if (value === "operacion") return "procesos";
  if (value === "operación") return "procesos";

  if (value === "ia") return "automatizacion";
  if (value === "automatización") return "automatizacion";

  if (value === "direccion") return "liderazgo";
  if (value === "dirección") return "liderazgo";
  if (value === "estrategia") return "liderazgo";
  if (value === "liderazgo") return "liderazgo";
  if (value === "metricas") return "liderazgo";
  if (value === "métricas") return "liderazgo";

  if (value === "finanzas") return "rentabilidad";

  return value;
}

function categoryMatchesArea(category: string | undefined, areaId: string): boolean {
  const normalized = normalizeCategory(category);

  if (!normalized) return false;

  if (normalized === areaId) return true;

  if (areaId === "escalabilidad") {
    return normalized === "procesos" || normalized === "automatizacion";
  }

  if (areaId === "canales") {
    return normalized === "captacion";
  }

  if (areaId === "sistema_comercial") {
    return (
      normalized === "conversion" ||
      normalized === "seguimiento" ||
      normalized === "captacion"
    );
  }

  if (areaId === "prioridades") {
    return (
      normalized === "liderazgo" ||
      normalized === "procesos" ||
      normalized === "business_model"
    );
  }

  return false;
}

function getInsightsForArea(insights: InsightLike[], areaId: string): InsightLike[] {
  return insights.filter((insight) => categoryMatchesArea(insight.category, areaId));
}

function getFrictionsForArea(
  frictions: FrictionLike[],
  areaId: string
): FrictionLike[] {
  return frictions.filter((friction) =>
    categoryMatchesArea(friction.category, areaId)
  );
}

function getRelationsForArea(
  relations: FrictionRelationLike[],
  areaId: string
): FrictionRelationLike[] {
  return relations.filter(
    (relation) =>
      categoryMatchesArea(relation.fromCategory, areaId) ||
      categoryMatchesArea(relation.toCategory, areaId)
  );
}

function getHypothesesForArea(
  hypotheses: HypothesisLike[],
  areaId: string
): HypothesisLike[] {
  return hypotheses.filter((hypothesis) =>
    categoryMatchesArea(hypothesis.area, areaId)
  );
}

function getReasoningForArea(
  reasoning: ReasoningLike,
  areaId: string
): AreaReasoningLike {
  const directAreaReasoning = reasoning.areaReasoning?.[areaId];
  const directArea = reasoning.areas?.[areaId];

  return asAreaReasoning(directAreaReasoning ?? directArea);
}

function getGeneralReasoningFindings(reasoning: ReasoningLike): string[] {
  return limitList(
    [
      normalizeText(reasoning.mainProblem),
      normalizeText(reasoning.mainRisk),
      normalizeText(reasoning.mainOpportunity),
      normalizeText(reasoning.mainConclusion),
    ],
    3
  );
}

function getGeneralReasoningActions(reasoning: ReasoningLike): string[] {
  return limitList(
    [
      ...normalizeList(reasoning.recommendations),
      ...normalizeList(reasoning.priorities),
    ],
    4
  );
}

function buildScoreFinding(areaId: string, score: number): string {
  const label = AREA_LABELS[areaId] ?? areaId;

  if (score <= 0) {
    return `La puntuación de ${label} no aparece como el dato más fiable por sí sola; debe leerse junto con las fricciones y relaciones detectadas.`;
  }

  if (score < 45) {
    return `El índice de ${label} muestra una señal débil y confirma que esta área puede estar participando en una cadena de bloqueo.`;
  }

  if (score < 75) {
    return `El índice de ${label} muestra una situación intermedia: no es un colapso, pero sí puede estar reduciendo el rendimiento de otras áreas.`;
  }

  return `El índice de ${label} muestra una base razonablemente sólida, aunque debe revisarse su conexión con las áreas más débiles.`;
}

function buildFrictionFinding(areaId: string, frictions: FrictionLike[]): string {
  const label = AREA_LABELS[areaId] ?? areaId;

  if (frictions.length === 0) {
    return `No aparece una fricción aislada dominante en ${label}; la lectura debe hacerse por su relación con el resto del sistema.`;
  }

  if (frictions.length === 1) {
    return `La fricción detectada en ${label} puede estar condicionando decisiones o resultados en otras áreas del negocio.`;
  }

  return `Se detectan varias fricciones en ${label}, lo que sugiere un bloqueo compuesto y no una incidencia puntual.`;
}

function buildRelationFinding(
  areaId: string,
  relations: FrictionRelationLike[]
): string {
  const label = AREA_LABELS[areaId] ?? areaId;
  const mainRelation = relations[0];

  if (!mainRelation) {
    return "";
  }

  const fromLabel = AREA_LABELS[normalizeCategory(mainRelation.fromCategory)] ??
    normalizeCategory(mainRelation.fromCategory);
  const toLabel = AREA_LABELS[normalizeCategory(mainRelation.toCategory)] ??
    normalizeCategory(mainRelation.toCategory);

  return `La relación crítica detectada conecta ${fromLabel} con ${toLabel}: ${normalizeText(
    mainRelation.explanation
  ) || `lo que ocurre en ${fromLabel} está afectando el rendimiento de ${toLabel}.`}`;
}

function buildRelationExplanation(
  relations: FrictionRelationLike[],
  fallback: string
): string {
  const relation = relations[0];

  if (!relation) return fallback;

  const implication = normalizeText(relation.strategicImplication);
  const explanation = normalizeText(relation.explanation);

  if (explanation && implication) {
    return `${explanation} ${implication}`;
  }

  return explanation || implication || fallback;
}

function buildRelationActions(
  areaId: string,
  relations: FrictionRelationLike[]
): string[] {
  const relation = relations[0];

  if (!relation) return [];

  const fromCategory = normalizeCategory(relation.fromCategory);
  const toCategory = normalizeCategory(relation.toCategory);

  if (fromCategory === "business_model") {
    return [
      "Reformular la propuesta para que el cliente entienda valor, destinatario y diferencia antes de comparar opciones.",
      "Revisar si las objeciones actuales nacen de falta de claridad, falta de confianza o falta de diferenciación.",
    ];
  }

  if (fromCategory === "captacion" || toCategory === "seguimiento") {
    return [
      "Separar visibilidad, contacto recibido y oportunidad real para detectar dónde se pierde valor.",
      "Crear un registro simple de cada contacto con canal de origen, necesidad y siguiente paso.",
    ];
  }

  if (fromCategory === "seguimiento" || toCategory === "conversion") {
    return [
      "Definir estados claros para cada oportunidad: nuevo contacto, respondido, pendiente, cita, perdido y recuperable.",
      "Establecer tiempos máximos de respuesta y recordatorios para evitar pérdida silenciosa de oportunidades.",
    ];
  }

  if (fromCategory === "procesos" || toCategory === "automatizacion") {
    return [
      "Documentar el proceso real antes de automatizar, delegar o aumentar demanda.",
      "Identificar qué tareas repetitivas deben ordenarse primero para no automatizar desorden.",
    ];
  }

  if (fromCategory === "liderazgo" || toCategory === "liderazgo") {
    return [
      "Convertir los objetivos generales en tres prioridades operativas para los próximos 30 días.",
      "Definir qué decisión queda aplazada porque no afecta al cuello de botella principal.",
    ];
  }

  if (fromCategory === "rentabilidad" || toCategory === "rentabilidad") {
    return [
      "Revisar qué servicios consumen más tiempo y qué margen dejan realmente.",
      "Separar crecimiento en volumen de crecimiento rentable antes de aumentar captación.",
    ];
  }

  return [
    `Corregir primero la fricción de origen antes de exigir más rendimiento a ${AREA_LABELS[areaId] ?? areaId}.`,
  ];
}

function getFallbackContent(areaId: string): AreaReasoningContent {
  const fallback: Record<string, AreaReasoningContent> = {
    business_model: {
      areaId,
      summary:
        "La propuesta necesita mostrar con más claridad qué valor entrega, a quién se dirige y por qué debería ser elegida frente a otras alternativas.",
      findings: [
        "La claridad de la propuesta condiciona la calidad de la conversación comercial.",
        "La diferenciación debe percibirse antes de que el cliente compare por precio.",
        "Una oferta fácil de entender reduce dudas y acelera la decisión.",
      ],
      explanation:
        "El modelo de negocio no se evalúa solo por lo que vende, sino por la claridad con la que conecta propuesta, cliente ideal, diferenciación y forma de generar ingresos.",
      actions: [
        "Reformular la propuesta de valor en una frase clara.",
        "Definir el cliente ideal con criterios concretos.",
        "Ordenar la oferta principal y separar servicios secundarios.",
      ],
      impact:
        "Una propuesta más clara mejora la percepción de valor y reduce pérdida de oportunidades por confusión.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    captacion: {
      areaId,
      summary:
        "La captación debe pasar de depender de acciones puntuales a funcionar como un sistema repetible de generación de oportunidades.",
      findings: [
        "Tener canales activos no garantiza captación previsible.",
        "La visibilidad debe diferenciarse de la generación real de oportunidades.",
        "Medir origen y calidad de contactos permite decidir mejor dónde concentrar esfuerzo.",
      ],
      explanation:
        "Captar no es solo estar presente en canales. Es conseguir oportunidades alineadas, medibles y suficientemente constantes para sostener crecimiento.",
      actions: [
        "Elegir dos canales prioritarios de captación.",
        "Registrar el origen de cada contacto durante 30 días.",
        "Separar acciones de visibilidad de acciones de generación de contacto.",
      ],
      impact:
        "Una captación más ordenada mejora la previsibilidad comercial y reduce dependencia de esfuerzos aislados.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    conversion: {
      areaId,
      summary:
        "El interés inicial necesita un proceso más claro para transformarse en clientes reales sin depender de improvisación.",
      findings: [
        "Parte del valor puede perderse entre el contacto inicial y la decisión.",
        "La ausencia de proceso aumenta la pérdida de oportunidades.",
        "La conversión mejora cuando el cliente entiende el siguiente paso.",
      ],
      explanation:
        "La conversión depende de claridad, respuesta, seguimiento y capacidad de reducir dudas en el momento adecuado.",
      actions: [
        "Definir una secuencia desde primer contacto hasta cita o compra.",
        "Crear respuestas base para objeciones frecuentes.",
        "Medir cuántas oportunidades avanzan y cuántas se detienen.",
      ],
      impact:
        "Mejorar conversión permite obtener más resultado con las oportunidades que ya existen.",
      confidence: "media",
      priority: "alta",
      status: "atencion",
    },

    seguimiento: {
      areaId,
      summary:
        "El seguimiento necesita estructura para evitar que oportunidades reales se pierdan por falta de continuidad.",
      findings: [
        "Las oportunidades pueden quedar sin próxima acción definida.",
        "La memoria personal no debería ser el sistema de seguimiento.",
        "La recuperación de contactos requiere estados y recordatorios claros.",
      ],
      explanation:
        "Muchos negocios no pierden ventas por falta de interés, sino porque no existe una continuidad organizada después del primer contacto.",
      actions: [
        "Crear estados simples para cada contacto.",
        "Definir recordatorios y tiempos máximos de respuesta.",
        "Revisar semanalmente contactos sin respuesta.",
      ],
      impact:
        "Un seguimiento ordenado recupera oportunidades y reduce pérdida silenciosa de ventas.",
      confidence: "media",
      priority: "alta",
      status: "atencion",
    },

    procesos: {
      areaId,
      summary:
        "La operación necesita reducir dependencia personal para que el crecimiento no dependa únicamente de más esfuerzo diario.",
      findings: [
        "Las tareas repetitivas deben transformarse en procesos.",
        "La dependencia de una sola persona limita la capacidad de crecer.",
        "Antes de delegar o automatizar conviene ordenar la operación.",
      ],
      explanation:
        "Los procesos permiten que el negocio repita resultados con menos improvisación y menos carga operativa.",
      actions: [
        "Documentar las tareas que más se repiten.",
        "Definir secuencias para citas, atención y seguimiento.",
        "Separar tareas operativas de decisiones estratégicas.",
      ],
      impact:
        "Procesos más claros liberan capacidad y permiten crecer con menos presión interna.",
      confidence: "media",
      priority: "alta",
      status: "atencion",
    },

    automatizacion: {
      areaId,
      summary:
        "La automatización puede aportar valor, pero solo si se aplica sobre procesos claros y repetibles.",
      findings: [
        "La automatización no debe sustituir el orden operativo.",
        "Las mejores oportunidades suelen estar en respuestas, recordatorios y seguimiento.",
        "Automatizar sin proceso previo puede aumentar la complejidad.",
      ],
      explanation:
        "La tecnología amplifica lo que ya existe. Si el proceso está claro, ahorra tiempo; si está desordenado, acelera el desorden.",
      actions: [
        "Definir qué proceso se quiere automatizar y por qué.",
        "Empezar por tareas repetitivas y medibles.",
        "Conectar automatización con seguimiento y conversión.",
      ],
      impact:
        "Automatizar con criterio reduce carga operativa sin perder control de la experiencia del cliente.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    liderazgo: {
      areaId,
      summary:
        "La dirección estratégica necesita convertir objetivos generales en prioridades concretas y revisables.",
      findings: [
        "Sin prioridades claras, cualquier acción puede parecer urgente.",
        "La dirección debe separar urgencias de decisiones estratégicas.",
        "El avance necesita revisarse con métricas simples.",
      ],
      explanation:
        "El liderazgo estratégico se mide por la capacidad de decidir qué no hacer, no solo por añadir nuevas acciones.",
      actions: [
        "Definir tres prioridades para los próximos 30 días.",
        "Separar urgencias operativas de decisiones estratégicas.",
        "Revisar avances semanalmente con una métrica simple.",
      ],
      impact:
        "Una dirección más clara reduce dispersión y mejora la calidad de las decisiones.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    rentabilidad: {
      areaId,
      summary:
        "El crecimiento debe evaluarse por rentabilidad real, no solo por volumen de trabajo o número de clientes.",
      findings: [
        "Más actividad no siempre significa más beneficio.",
        "Conviene diferenciar servicios por margen, esfuerzo y recurrencia.",
        "La agenda debe analizarse también por calidad económica.",
      ],
      explanation:
        "Un negocio puede crecer y no mejorar su beneficio si aumenta trabajo poco rentable o difícil de sostener.",
      actions: [
        "Analizar cada servicio por precio, duración y margen.",
        "Identificar servicios de mayor retorno y recurrencia.",
        "Revisar qué tareas consumen tiempo sin suficiente beneficio.",
      ],
      impact:
        "Medir rentabilidad permite crecer con más criterio y no solo con más trabajo.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    escalabilidad: {
      areaId,
      summary:
        "La escalabilidad depende de repetir resultados sin aumentar la presión operativa en la misma proporción.",
      findings: [
        "Escalar exige procesos repetibles.",
        "La dependencia personal limita la capacidad de crecimiento.",
        "La oferta debe poder venderse y entregarse con claridad.",
      ],
      explanation:
        "Escalar no significa hacer más de todo, sino conseguir que las partes clave funcionen con menos improvisación.",
      actions: [
        "Detectar qué parte se rompe si aumenta la demanda.",
        "Crear una versión simple y repetible del proceso comercial.",
        "Ordenar la entrega antes de aumentar volumen.",
      ],
      impact:
        "La escalabilidad real aparece cuando crecer no multiplica el desorden ni la carga diaria.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    canales: {
      areaId,
      summary:
        "Los canales deben evaluarse por calidad, previsibilidad y capacidad real de generar oportunidades útiles.",
      findings: [
        "No todos los canales generan el mismo tipo de oportunidad.",
        "La visibilidad debe separarse de la captación real.",
        "Conviene saber qué canal atrae mejores clientes.",
      ],
      explanation:
        "Un canal es valioso cuando genera oportunidades alineadas, medibles y suficientemente constantes.",
      actions: [
        "Registrar el origen de cada contacto durante 30 días.",
        "Separar canales de visibilidad, recomendación y conversión.",
        "Priorizar los canales que puedan sostenerse con una rutina realista.",
      ],
      impact:
        "Elegir bien los canales evita dispersión y mejora la calidad de oportunidades.",
      confidence: "media",
      priority: "media",
      status: "atencion",
    },

    sistema_comercial: {
      areaId,
      summary:
        "El sistema comercial necesita ordenar cómo avanza cada oportunidad desde el interés inicial hasta la decisión final.",
      findings: [
        "Cada oportunidad debería tener una etapa definida.",
        "El cierre depende de claridad, respuesta y seguimiento.",
        "La propuesta debe facilitar el siguiente paso del cliente.",
      ],
      explanation:
        "Un sistema comercial permite saber qué ocurre con cada oportunidad y qué acción corresponde en cada momento.",
      actions: [
        "Definir estados del proceso comercial.",
        "Crear respuestas base para cada etapa.",
        "Medir oportunidades que avanzan y oportunidades que se pierden.",
      ],
      impact:
        "Un sistema comercial claro mejora conversión y reduce improvisación.",
      confidence: "media",
      priority: "alta",
      status: "atencion",
    },

    prioridades: {
      areaId,
      summary:
        "El negocio necesita ordenar prioridades para evitar que todas las mejoras parezcan urgentes al mismo tiempo.",
      findings: [
        "No todas las mejoras tienen el mismo impacto.",
        "La falta de orden dispersa tiempo y recursos.",
        "Las prioridades deben definirse por impacto, no por urgencia aparente.",
      ],
      explanation:
        "El diagnóstico solo tiene valor si ayuda a decidir qué corregir primero y qué dejar para después.",
      actions: [
        "Elegir una prioridad principal para los próximos 30 días.",
        "Definir una segunda prioridad de soporte.",
        "Aplazar acciones que no afecten al cuello de botella principal.",
      ],
      impact:
        "Ordenar prioridades evita dispersión y permite avanzar con foco.",
      confidence: "media",
      priority: "alta",
      status: "atencion",
    },
  };

  return fallback[areaId] ?? fallback.prioridades;
}

function buildContentFromInsight(
  areaId: string,
  insight: InsightLike,
  areaReasoning: AreaReasoningLike,
  globalReasoning: ReasoningLike,
  frictions: FrictionLike[],
  relations: FrictionRelationLike[],
  hypotheses: HypothesisLike[],
  score: number
): AreaReasoningContent {
  const fallback = getFallbackContent(areaId);

  const evidence = normalizeList(insight.evidence);
  const frictionDescriptions = frictions
    .map((friction) => normalizeText(friction.description))
    .filter(Boolean);

  const relationFinding = buildRelationFinding(areaId, relations);
  const relationExplanation = buildRelationExplanation(
    relations,
    normalizeText(areaReasoning.explanation) ||
      normalizeText(insight.interpretation) ||
      normalizeText(insight.risk) ||
      fallback.explanation
  );

  const hypothesisFindings = hypotheses
    .flatMap((hypothesis) => [
      normalizeText(hypothesis.summary),
      normalizeText(hypothesis.risk),
    ])
    .filter(Boolean);

  const findings = limitList(
    [
      ...normalizeList(areaReasoning.findings),
      ...hypothesisFindings,
      relationFinding,
      ...evidence,
      ...frictionDescriptions,
      buildScoreFinding(areaId, score),
      buildFrictionFinding(areaId, frictions),
      ...getGeneralReasoningFindings(globalReasoning),
      ...fallback.findings,
    ],
    4
  );

  const relationActions = buildRelationActions(areaId, relations);

  const actions = limitList(
    [
      ...normalizeList(areaReasoning.actions),
      ...hypotheses.map((hypothesis) => normalizeText(hypothesis.nextAction)),
      ...hypotheses.map((hypothesis) => normalizeText(hypothesis.recommendation)),
      ...relationActions,
      normalizeText(insight.nextAction),
      normalizeText(insight.recommendation),
      ...getGeneralReasoningActions(globalReasoning),
      ...fallback.actions,
    ],
    4
  );

  const scoreStatus = getStatusFromScore(score);
  const severityStatus =
    insight.severity === "critica" || insight.severity === "alta"
      ? mapSeverityToStatus(insight.severity)
      : scoreStatus;

  const hypothesisPriority = hypotheses[0]?.severity
    ? mapSeverityToPriority(hypotheses[0].severity)
    : undefined;

  const scorePriority = getPriorityFromScore(score);
  const severityPriority = insight.severity
    ? mapSeverityToPriority(insight.severity)
    : scorePriority;

  return {
    areaId,
    summary:
      normalizeText(areaReasoning.summary) ||
      normalizeText(hypotheses[0]?.summary) ||
      normalizeText(insight.summary) ||
      fallback.summary,
    findings,
    explanation: relationExplanation,
    actions,
    impact:
      normalizeText(areaReasoning.impact) ||
      normalizeText(hypotheses[0]?.opportunity) ||
      normalizeText(insight.opportunity) ||
      normalizeText(insight.risk) ||
      fallback.impact,
    confidence: mapConfidence(
      normalizeText(areaReasoning.confidence) ||
        hypotheses[0]?.confidence ||
        insight.confidence
    ),
    priority: mapPriority(
      normalizeText(areaReasoning.priority),
      hypothesisPriority ?? severityPriority
    ),
    status: mapStatus(normalizeText(areaReasoning.status), severityStatus),
  };
}

function buildContentFromFallback(
  areaId: string,
  areaReasoning: AreaReasoningLike,
  globalReasoning: ReasoningLike,
  frictions: FrictionLike[],
  relations: FrictionRelationLike[],
  hypotheses: HypothesisLike[],
  score: number
): AreaReasoningContent {
  const fallback = getFallbackContent(areaId);

  const frictionDescriptions = frictions
    .map((friction) => normalizeText(friction.description))
    .filter(Boolean);

  const relationFinding = buildRelationFinding(areaId, relations);
  const relationExplanation = buildRelationExplanation(
    relations,
    normalizeText(areaReasoning.explanation) || fallback.explanation
  );

  const hypothesisFindings = hypotheses
    .flatMap((hypothesis) => [
      normalizeText(hypothesis.summary),
      normalizeText(hypothesis.risk),
    ])
    .filter(Boolean);

  const findings = limitList(
    [
      ...normalizeList(areaReasoning.findings),
      ...hypothesisFindings,
      relationFinding,
      ...frictionDescriptions,
      buildScoreFinding(areaId, score),
      buildFrictionFinding(areaId, frictions),
      ...getGeneralReasoningFindings(globalReasoning),
      ...fallback.findings,
    ],
    4
  );

  const relationActions = buildRelationActions(areaId, relations);

  const actions = limitList(
    [
      ...normalizeList(areaReasoning.actions),
      ...hypotheses.map((hypothesis) => normalizeText(hypothesis.nextAction)),
      ...hypotheses.map((hypothesis) => normalizeText(hypothesis.recommendation)),
      ...relationActions,
      ...getGeneralReasoningActions(globalReasoning),
      ...fallback.actions,
    ],
    4
  );

  const status = getStatusFromScore(score);
  const priority = hypotheses[0]?.severity
    ? mapSeverityToPriority(hypotheses[0].severity)
    : getPriorityFromScore(score);

  return {
    ...fallback,
    summary:
      normalizeText(areaReasoning.summary) ||
      normalizeText(hypotheses[0]?.summary) ||
      fallback.summary,
    findings,
    explanation: relationExplanation,
    actions,
    impact:
      normalizeText(areaReasoning.impact) ||
      normalizeText(hypotheses[0]?.opportunity) ||
      fallback.impact,
    confidence: mapConfidence(
      normalizeText(areaReasoning.confidence) || hypotheses[0]?.confidence
    ),
    priority: mapPriority(normalizeText(areaReasoning.priority), priority),
    status: mapStatus(normalizeText(areaReasoning.status), status),
  };
}

export function buildAreaReasoning({
  strategicInsights,
  reasoning,
  frictions,
  frictionRelations,
  indices,
}: BuildAreaReasoningParams): AreaReasoningMap {
  const insights = asInsights(strategicInsights);
  const normalizedReasoning = asReasoning(reasoning);
  const normalizedFrictions = asFrictions(frictions);
  const normalizedFrictionRelations = asFrictionRelations(frictionRelations);
  const normalizedIndices = asIndices(indices);
  const hypotheses = asHypotheses(normalizedReasoning.hypotheses);

  const result: AreaReasoningMap = {};

  AREA_ORDER.forEach((areaId) => {
    const areaInsights = getInsightsForArea(insights, areaId);
    const areaFrictions = getFrictionsForArea(normalizedFrictions, areaId);
    const areaRelations = getRelationsForArea(
      normalizedFrictionRelations,
      areaId
    );
    const areaHypotheses = getHypothesesForArea(hypotheses, areaId);
    const areaReasoning = getReasoningForArea(normalizedReasoning, areaId);
    const score = getScoreForArea(normalizedIndices, areaId);

    const mainInsight = areaInsights[0];

    result[areaId] = mainInsight
      ? buildContentFromInsight(
          areaId,
          mainInsight,
          areaReasoning,
          normalizedReasoning,
          areaFrictions,
          areaRelations,
          areaHypotheses,
          score
        )
      : buildContentFromFallback(
          areaId,
          areaReasoning,
          normalizedReasoning,
          areaFrictions,
          areaRelations,
          areaHypotheses,
          score
        );
  });

  return result;
}