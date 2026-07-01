import type {
  Confidence,
  Friction,
  FrictionRelation,
  RootCause,
  Severity,
} from "./types";

export type Answers = Record<string, unknown>;

export type ReasoningArea =
  | "claridad"
  | "captacion"
  | "conversion"
  | "seguimiento"
  | "procesos"
  | "automatizacion"
  | "direccion"
  | "rentabilidad";

export interface ReasoningSignal {
  id: string;
  area: ReasoningArea;
  label: string;
  evidence: string;
  weight: number;
}

export interface ReasoningContradiction {
  id: string;
  area: ReasoningArea;
  title: string;
  evidence: string[];
  impact: string;
  weight: number;
}

export interface ReasoningHypothesis {
  id: string;
  area: ReasoningArea;
  title: string;
  summary: string;
  evidence: string[];
  risk: string;
  opportunity: string;
  recommendation: string;
  nextAction: string;
  severity: Severity;
  confidence: Confidence;
  scoreImpact: number;
}

export interface StrategicReasoning {
  strengths: ReasoningSignal[];
  weaknesses: ReasoningSignal[];
  contradictions: ReasoningContradiction[];
  hypotheses: ReasoningHypothesis[];
  areaScores: Record<ReasoningArea, number>;
  globalRisk: number;
  mainConclusion: string;
  mainProblem?: string;
  mainRisk?: string;
  mainOpportunity?: string;
  priorities?: string[];
  recommendations?: string[];
  causalChain?: string[];
  areas?: Record<string, unknown>;
}

interface BuildReasoningParams {
  answers: Answers;
  frictions?: Friction[];
  frictionRelations?: FrictionRelation[];
  rootCause?: RootCause;
}

type BuildReasoningInput = Answers | BuildReasoningParams;

type EvidenceContext = {
  canalPrincipal: string;
  frenoCrecimiento: string;
  objetivo6Meses: string;
  tareaConsumeTiempo: string;
  automatizar: string;
  propuestaFrase: string;
  diferencia: string;
  objeciones: string;
  contenidoFunciona: string;
  oportunidades: string;
  herramientas: string;
  equipo: string;
  ayuda: string;
  metricas: string;
  seguimiento: string;
  canalesActuales: string;
};

type DiagnosisFlags = {
  instagramActivo: boolean;
  whatsappActivo: boolean;
  canalesConversacionales: boolean;
  sinCrm: boolean;
  sinCalendario: boolean;
  trabajaSola: boolean;
  quiereAutomatizar: boolean;
  tieneDiferencial: boolean;
  tienePropuesta: boolean;
  tieneObjeciones: boolean;
  tieneMetricas: boolean;
  seguimientoFormal: boolean;
  objetivoComercial: boolean;
  objetivoRentabilidad: boolean;
  frenoOperativo: boolean;
  frenoComercial: boolean;
  frenoClaridad: boolean;
  dependenciaPersonal: boolean;
  contenidoConRespuesta: boolean;
  herramientasInsuficientes: boolean;
  necesitaSistemaComercial: boolean;
};

const AREAS: ReasoningArea[] = [
  "claridad",
  "captacion",
  "conversion",
  "seguimiento",
  "procesos",
  "automatizacion",
  "direccion",
  "rentabilidad",
];

const AREA_LABELS: Record<ReasoningArea, string> = {
  claridad: "claridad de oferta",
  captacion: "captación",
  conversion: "conversión",
  seguimiento: "seguimiento comercial",
  procesos: "procesos",
  automatizacion: "automatización",
  direccion: "dirección estratégica",
  rentabilidad: "rentabilidad",
};

function normalizeInput(input: BuildReasoningInput): BuildReasoningParams {
  if (
    typeof input === "object" &&
    input !== null &&
    "answers" in input &&
    typeof (input as BuildReasoningParams).answers === "object"
  ) {
    return input as BuildReasoningParams;
  }

  return {
    answers: input as Answers,
    frictions: [],
    frictionRelations: [],
    rootCause: undefined,
  };
}

function readText(answers: Answers, key: string): string {
  const value = answers[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  return "";
}

function includesAny(text: string, terms: string[]): boolean {
  const normalized = text.toLowerCase();

  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function hasSelected(answers: Answers, key: string, option: string): boolean {
  const value = answers[key];

  if (Array.isArray(value)) {
    return value.some(
      (item) =>
        typeof item === "string" &&
        item.trim().toLowerCase() === option.trim().toLowerCase()
    );
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === option.trim().toLowerCase();
  }

  return false;
}

function cleanList(items: string[]): string[] {
  const seen = new Set<string>();

  return items
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .filter((item) => {
      const key = item.toLowerCase();

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function severityFromImpact(impact: number): Severity {
  if (impact >= 34) return "critica";
  if (impact >= 24) return "alta";
  if (impact >= 14) return "media";
  return "baja";
}

function confidenceFromEvidence(count: number): Confidence {
  if (count >= 4) return "alta";
  if (count >= 2) return "media";
  return "baja";
}

function pushSignal(
  list: ReasoningSignal[],
  signal: ReasoningSignal,
  condition: boolean
): void {
  if (condition) {
    list.push(signal);
  }
}

function pushContradiction(
  list: ReasoningContradiction[],
  contradiction: ReasoningContradiction,
  condition: boolean
): void {
  if (condition) {
    list.push(contradiction);
  }
}

function pushHypothesis(
  list: ReasoningHypothesis[],
  hypothesis: ReasoningHypothesis,
  condition: boolean
): void {
  if (condition) {
    list.push(hypothesis);
  }
}

function createEvidenceContext(answers: Answers): EvidenceContext {
  return {
    canalPrincipal: readText(answers, "canal_principal"),
    frenoCrecimiento: readText(answers, "freno_crecimiento"),
    objetivo6Meses: readText(answers, "objetivo_6_meses"),
    tareaConsumeTiempo: readText(answers, "tarea_consume_tiempo"),
    automatizar: readText(answers, "automatizar_simplificar"),
    propuestaFrase: readText(answers, "propuesta_frase"),
    diferencia: readText(answers, "diferenciacion"),
    objeciones: readText(answers, "objeciones"),
    contenidoFunciona: readText(answers, "contenido_funciona_mejor"),
    oportunidades: readText(answers, "donde_llegan_oportunidades"),
    herramientas: readText(answers, "herramientas_crecimiento"),
    equipo: readText(answers, "equipo"),
    ayuda: readText(answers, "tipo_ayuda"),
    metricas: readText(answers, "metricas_actuales"),
    seguimiento: readText(answers, "seguimiento_actual"),
    canalesActuales: readText(answers, "canales_actuales"),
  };
}

function createFlags(answers: Answers, context: EvidenceContext): DiagnosisFlags {
  const instagramActivo =
    hasSelected(answers, "canales_actuales", "Instagram") ||
    includesAny(context.canalPrincipal, ["instagram"]) ||
    includesAny(context.oportunidades, ["instagram"]) ||
    includesAny(context.canalesActuales, ["instagram"]);

  const whatsappActivo =
    hasSelected(answers, "canales_actuales", "WhatsApp") ||
    includesAny(context.oportunidades, ["whatsapp"]) ||
    includesAny(context.canalesActuales, ["whatsapp"]);

  const sinCrm =
    !hasSelected(answers, "herramientas_crecimiento", "CRM") &&
    !includesAny(context.herramientas, ["crm"]);

  const sinCalendario =
    !hasSelected(
      answers,
      "herramientas_crecimiento",
      "Calendario de contenido"
    ) && !includesAny(context.herramientas, ["calendario"]);

  const trabajaSola = includesAny(context.equipo, [
    "sola",
    "solo",
    "solo yo",
    "trabajo sola",
    "trabajo solo",
    "una persona",
    "yo misma",
    "yo mismo",
  ]);

  const quiereAutomatizar = includesAny(context.automatizar, [
    "citas",
    "respuestas",
    "recordatorios",
    "seguimiento",
    "whatsapp",
    "mensajes",
    "agenda",
    "automatizar",
    "simplificar",
  ]);

  const tieneDiferencial = context.diferencia.trim().length > 0;
  const tienePropuesta = context.propuestaFrase.trim().length > 0;
  const tieneObjeciones = context.objeciones.trim().length > 0;

  const tieneMetricas =
    context.metricas.trim().length > 0 &&
    !includesAny(context.metricas, [
      "no",
      "ninguna",
      "no mido",
      "no tengo",
      "nada",
    ]);

  const seguimientoFormal =
    context.seguimiento.trim().length > 0 &&
    !includesAny(context.seguimiento, [
      "manual",
      "whatsapp",
      "cuando puedo",
      "no tengo",
      "improvisado",
      "memoria",
      "sobre la marcha",
    ]);

  const objetivoComercial = includesAny(context.objetivo6Meses, [
    "ventas",
    "vender",
    "clientes",
    "clientas",
    "agenda",
    "captar",
    "facturación",
    "facturar",
    "crecer",
  ]);

  const objetivoRentabilidad = includesAny(context.objetivo6Meses, [
    "rentabilidad",
    "rentable",
    "margen",
    "beneficio",
    "ticket",
    "facturación",
    "facturar",
  ]);

  const frenoOperativo = includesAny(context.frenoCrecimiento, [
    "tiempo",
    "sistema",
    "organización",
    "organizacion",
    "procesos",
    "depende",
    "seguimiento",
    "agenda",
    "operativo",
  ]);

  const frenoComercial = includesAny(context.frenoCrecimiento, [
    "ventas",
    "clientes",
    "clientas",
    "captación",
    "captacion",
    "conversión",
    "conversion",
    "visibilidad",
  ]);

  const frenoClaridad = includesAny(
    [context.frenoCrecimiento, context.objeciones].join(" "),
    [
      "precio",
      "caro",
      "no entienden",
      "confusión",
      "confusion",
      "diferenciar",
      "competencia",
      "valor",
    ]
  );

  const dependenciaPersonal =
    trabajaSola ||
    includesAny(context.frenoCrecimiento, [
      "depende de mí",
      "depende de mi",
      "depende demasiado",
      "todo pasa por mí",
      "todo pasa por mi",
    ]);

  const contenidoConRespuesta = context.contenidoFunciona.trim().length > 0;

  const herramientasInsuficientes =
    sinCrm ||
    sinCalendario ||
    includesAny(context.herramientas, [
      "whatsapp",
      "instagram",
      "excel",
      "libreta",
      "manual",
      "ninguna",
      "no tengo",
    ]);

  const canalesConversacionales = instagramActivo || whatsappActivo;

  const necesitaSistemaComercial =
    canalesConversacionales &&
    (sinCrm || !seguimientoFormal || context.seguimiento.trim().length === 0);

  return {
    instagramActivo,
    whatsappActivo,
    canalesConversacionales,
    sinCrm,
    sinCalendario,
    trabajaSola,
    quiereAutomatizar,
    tieneDiferencial,
    tienePropuesta,
    tieneObjeciones,
    tieneMetricas,
    seguimientoFormal,
    objetivoComercial,
    objetivoRentabilidad,
    frenoOperativo,
    frenoComercial,
    frenoClaridad,
    dependenciaPersonal,
    contenidoConRespuesta,
    herramientasInsuficientes,
    necesitaSistemaComercial,
  };
}

function mapCategoryToArea(category: string): ReasoningArea {
  const value = category.trim().toLowerCase();

  if (
    value === "claridad" ||
    value === "oferta" ||
    value === "modelo_negocio" ||
    value === "modelo de negocio" ||
    value === "comunicacion" ||
    value === "comunicación"
  ) {
    return "claridad";
  }

  if (
    value === "captacion" ||
    value === "captación" ||
    value === "marketing" ||
    value === "visibilidad" ||
    value === "canales"
  ) {
    return "captacion";
  }

  if (
    value === "conversion" ||
    value === "conversión" ||
    value === "ventas" ||
    value === "sistema_comercial"
  ) {
    return "conversion";
  }

  if (value === "seguimiento" || value === "crm") {
    return "seguimiento";
  }

  if (
    value === "procesos" ||
    value === "operaciones" ||
    value === "operacion" ||
    value === "operación" ||
    value === "escalabilidad"
  ) {
    return "procesos";
  }

  if (
    value === "automatizacion" ||
    value === "automatización" ||
    value === "ia"
  ) {
    return "automatizacion";
  }

  if (
    value === "direccion" ||
    value === "dirección" ||
    value === "liderazgo" ||
    value === "estrategia" ||
    value === "prioridades" ||
    value === "metricas" ||
    value === "métricas"
  ) {
    return "direccion";
  }

  if (value === "rentabilidad" || value === "finanzas") {
    return "rentabilidad";
  }

  return "direccion";
}

function getFrictionById(
  frictions: Friction[],
  frictionId: string | undefined
): Friction | undefined {
  if (!frictionId) return undefined;

  return frictions.find((friction) => friction.id === frictionId);
}

function getRelationImpact(relation: FrictionRelation): number {
  const strengthImpact =
    relation.strength === "alta" ? 22 : relation.strength === "media" ? 14 : 8;

  const typeImpact =
    relation.type === "causa"
      ? 12
      : relation.type === "bloquea"
        ? 11
        : relation.type === "agrava"
          ? 9
          : relation.type === "amplifica"
            ? 7
            : 6;

  return strengthImpact + typeImpact;
}

function getFrictionImpact(friction: Friction): number {
  const severityImpact =
    friction.severity === "critica"
      ? 34
      : friction.severity === "alta"
        ? 25
        : friction.severity === "media"
          ? 16
          : 8;

  const confidenceImpact =
    friction.confidence === "alta" ? 8 : friction.confidence === "media" ? 5 : 2;

  return friction.score + severityImpact + confidenceImpact;
}

function buildStrengths(
  context: EvidenceContext,
  flags: DiagnosisFlags
): ReasoningSignal[] {
  const strengths: ReasoningSignal[] = [];

  pushSignal(
    strengths,
    {
      id: "canales_entrada_identificados",
      area: "captacion",
      label: "Canales de entrada identificados",
      evidence: context.oportunidades || context.canalPrincipal,
      weight: 5,
    },
    flags.canalesConversacionales
  );

  pushSignal(
    strengths,
    {
      id: "diferencial_de_servicio_declarado",
      area: "claridad",
      label: "Diferencial de servicio declarado",
      evidence: context.diferencia,
      weight: 6,
    },
    flags.tieneDiferencial
  );

  pushSignal(
    strengths,
    {
      id: "propuesta_descrita_por_el_negocio",
      area: "claridad",
      label: "Existe una propuesta descrita por el negocio",
      evidence: context.propuestaFrase,
      weight: 5,
    },
    flags.tienePropuesta
  );

  pushSignal(
    strengths,
    {
      id: "contenido_con_respuesta_identificado",
      area: "captacion",
      label: "Contenido que genera respuesta identificado",
      evidence: context.contenidoFunciona,
      weight: 5,
    },
    flags.contenidoConRespuesta
  );

  pushSignal(
    strengths,
    {
      id: "seguimiento_formal",
      area: "seguimiento",
      label: "Existe un seguimiento mínimamente estructurado",
      evidence: context.seguimiento,
      weight: 9,
    },
    flags.seguimientoFormal
  );

  pushSignal(
    strengths,
    {
      id: "objetivo_de_crecimiento_expresado",
      area: "direccion",
      label: "Objetivo de crecimiento expresado",
      evidence: context.objetivo6Meses,
      weight: 5,
    },
    context.objetivo6Meses.trim().length > 0
  );

  pushSignal(
    strengths,
    {
      id: "necesidad_de_mejora_identificada",
      area: "direccion",
      label: "El negocio identifica una necesidad concreta de mejora",
      evidence: context.ayuda || context.frenoCrecimiento,
      weight: 4,
    },
    context.ayuda.trim().length > 0 || context.frenoCrecimiento.trim().length > 0
  );

  pushSignal(
    strengths,
    {
      id: "metricas_disponibles",
      area: "direccion",
      label: "Existen métricas declaradas para revisar el negocio",
      evidence: context.metricas,
      weight: 8,
    },
    flags.tieneMetricas
  );

  return strengths;
}

function buildWeaknesses(
  context: EvidenceContext,
  flags: DiagnosisFlags
): ReasoningSignal[] {
  const weaknesses: ReasoningSignal[] = [];

  pushSignal(
    weaknesses,
    {
      id: "sin_crm",
      area: "seguimiento",
      label: "Seguimiento sin CRM o sistema formal",
      evidence:
        context.herramientas ||
        "No aparece un CRM o sistema formal de seguimiento entre las herramientas actuales.",
      weight: 22,
    },
    flags.sinCrm
  );

  pushSignal(
    weaknesses,
    {
      id: "captacion_dependiente_de_canales_conversacionales",
      area: "captacion",
      label: "Captación dependiente de canales conversacionales",
      evidence: context.oportunidades || context.canalPrincipal,
      weight: 16,
    },
    flags.instagramActivo && flags.whatsappActivo
  );

  pushSignal(
    weaknesses,
    {
      id: "conversion_manual",
      area: "conversion",
      label: "Conversión dependiente de conversaciones manuales",
      evidence:
        context.oportunidades || context.seguimiento || context.canalPrincipal,
      weight: 20,
    },
    flags.necesitaSistemaComercial
  );

  pushSignal(
    weaknesses,
    {
      id: "sin_sistema_editorial",
      area: "captacion",
      label: "Contenido sin sistema editorial",
      evidence:
        context.contenidoFunciona ||
        "Existe actividad de contenido, pero no aparece calendario editorial.",
      weight: 14,
    },
    flags.sinCalendario && flags.contenidoConRespuesta
  );

  pushSignal(
    weaknesses,
    {
      id: "dependencia_operativa_personal",
      area: "procesos",
      label: "Dependencia operativa de quien dirige el negocio",
      evidence: context.equipo || context.frenoCrecimiento,
      weight: 22,
    },
    flags.dependenciaPersonal || flags.frenoOperativo
  );

  pushSignal(
    weaknesses,
    {
      id: "automatizacion_no_implementada",
      area: "automatizacion",
      label: "Necesidad de automatización sin sistema implantado",
      evidence: context.automatizar || context.tareaConsumeTiempo,
      weight: 28,
    },
    flags.quiereAutomatizar && flags.sinCrm
  );

  pushSignal(
    weaknesses,
    {
      id: "automatizacion_inmadura",
      area: "automatizacion",
      label: "La automatización aparece como necesidad, no como capacidad madura",
      evidence: context.herramientas || context.automatizar || context.seguimiento,
      weight: 18,
    },
    flags.quiereAutomatizar || flags.herramientasInsuficientes
  );

  pushSignal(
    weaknesses,
    {
      id: "metricas_insuficientes",
      area: "direccion",
      label: "Decisiones con pocas métricas visibles",
      evidence: context.metricas || "No aparecen métricas claras en las respuestas.",
      weight: 16,
    },
    !flags.tieneMetricas
  );

  pushSignal(
    weaknesses,
    {
      id: "claridad_no_validada",
      area: "claridad",
      label: "La claridad declarada todavía no está validada por el mercado",
      evidence: cleanList([
        context.propuestaFrase,
        context.diferencia,
        context.objeciones,
      ]).join(" | "),
      weight: 12,
    },
    flags.tienePropuesta && flags.tieneDiferencial && flags.tieneObjeciones
  );

  pushSignal(
    weaknesses,
    {
      id: "objeciones_presentes",
      area: "claridad",
      label: "Existen objeciones que afectan la percepción de valor",
      evidence: context.objeciones,
      weight: 12,
    },
    flags.tieneObjeciones
  );

  pushSignal(
    weaknesses,
    {
      id: "rentabilidad_no_aislada",
      area: "rentabilidad",
      label: "La rentabilidad no aparece aislada de servicios, tiempo y demanda",
      evidence: cleanList([
        context.objetivo6Meses,
        context.frenoCrecimiento,
        context.tareaConsumeTiempo,
      ]).join(" | "),
      weight: 14,
    },
    flags.objetivoRentabilidad || flags.frenoOperativo
  );

  return weaknesses;
}

function buildContradictions(
  context: EvidenceContext,
  flags: DiagnosisFlags
): ReasoningContradiction[] {
  const contradictions: ReasoningContradiction[] = [];

  pushContradiction(
    contradictions,
    {
      id: "interes_sin_sistema",
      area: "conversion",
      title: "Hay entrada de oportunidades, pero no un sistema claro para convertirlas.",
      evidence: cleanList([context.oportunidades, context.herramientas]),
      impact:
        "El negocio puede estar generando atención, pero perdiendo parte del valor en la transición entre interés, respuesta, cita y seguimiento.",
      weight: 20,
    },
    flags.canalesConversacionales && flags.sinCrm
  );

  pushContradiction(
    contradictions,
    {
      id: "captacion_no_es_sistema",
      area: "captacion",
      title: "Tener canales activos no equivale a tener un sistema de captación.",
      evidence: cleanList([
        context.canalPrincipal,
        context.oportunidades,
        context.contenidoFunciona,
      ]),
      impact:
        "La visibilidad puede depender de actividad constante, no de un sistema repetible de atracción, clasificación y conversión.",
      weight: 16,
    },
    flags.canalesConversacionales && flags.sinCalendario
  );

  pushContradiction(
    contradictions,
    {
      id: "crecer_con_dependencia_personal",
      area: "procesos",
      title:
        "El objetivo de crecimiento choca con una estructura demasiado dependiente de una sola persona.",
      evidence: cleanList([
        context.objetivo6Meses,
        context.equipo,
        context.frenoCrecimiento,
      ]),
      impact:
        "Aumentar demanda sin reducir dependencia operativa puede generar más presión, más tareas y menos capacidad de sostener calidad.",
      weight: 22,
    },
    context.objetivo6Meses.trim().length > 0 && flags.dependenciaPersonal
  );

  pushContradiction(
    contradictions,
    {
      id: "automatizacion_deseada_sin_base_operativa",
      area: "automatizacion",
      title: "Existe interés en automatizar, pero falta una base operativa mínima.",
      evidence: cleanList([
        context.automatizar,
        context.herramientas,
        context.seguimiento,
      ]),
      impact:
        "La automatización puede ayudar, pero si se implanta sin proceso previo solo hará más rápido un seguimiento todavía desordenado.",
      weight: 24,
    },
    flags.quiereAutomatizar && flags.sinCrm
  );

  pushContradiction(
    contradictions,
    {
      id: "valor_existente_pero_objeciones_activas",
      area: "claridad",
      title:
        "El negocio declara valor diferencial, pero las objeciones indican que ese valor no siempre se percibe antes de decidir.",
      evidence: cleanList([
        context.propuestaFrase,
        context.diferencia,
        context.objeciones,
      ]),
      impact:
        "Cuando el valor no se entiende de forma anticipada, el cliente compara por precio, posterga o necesita más explicación antes de avanzar.",
      weight: 16,
    },
    flags.tieneDiferencial && flags.tieneObjeciones
  );

  pushContradiction(
    contradictions,
    {
      id: "objetivo_comercial_sin_metricas",
      area: "direccion",
      title:
        "Existe intención de crecimiento, pero no aparecen métricas suficientes para decidir dónde actuar primero.",
      evidence: cleanList([context.objetivo6Meses, context.metricas]),
      impact:
        "Sin medición mínima, el negocio puede invertir esfuerzo en acciones visibles pero no necesariamente prioritarias.",
      weight: 18,
    },
    flags.objetivoComercial && !flags.tieneMetricas
  );

  pushContradiction(
    contradictions,
    {
      id: "mas_demanda_puede_no_mejorar_rentabilidad",
      area: "rentabilidad",
      title:
        "Más demanda no garantiza mejor rentabilidad si no se ordenan servicios, tiempo y margen.",
      evidence: cleanList([
        context.objetivo6Meses,
        context.frenoCrecimiento,
        context.tareaConsumeTiempo,
      ]),
      impact:
        "Llenar agenda o aumentar volumen puede ocultar servicios poco rentables y elevar la carga operativa sin mejorar el beneficio real.",
      weight: 16,
    },
    flags.objetivoRentabilidad || flags.frenoOperativo
  );

  return contradictions;
}

function buildCausalChain(
  frictions: Friction[],
  frictionRelations: FrictionRelation[],
  rootCause?: RootCause
): string[] {
  if (frictionRelations.length === 0) {
    if (!rootCause || rootCause.id === "sin_causa_raiz") {
      return [];
    }

    return [
      `La causa raíz detectada es ${rootCause.title}.`,
      rootCause.description,
    ];
  }

  const rootRelations = rootCause?.relatedRelations?.length
    ? frictionRelations.filter((relation) =>
        rootCause.relatedRelations?.includes(relation.id)
      )
    : frictionRelations;

  const prioritizedRelations = [...rootRelations].sort(
    (a, b) => getRelationImpact(b) - getRelationImpact(a)
  );

  const relationSteps = prioritizedRelations.slice(0, 4).map((relation) => {
    const origin = AREA_LABELS[mapCategoryToArea(relation.fromCategory)];
    const effect = AREA_LABELS[mapCategoryToArea(relation.toCategory)];

    return `${origin} está afectando a ${effect}: ${relation.explanation}`;
  });

  if (rootCause && rootCause.id !== "sin_causa_raiz") {
    return cleanList([
      `La causa raíz más influyente es ${rootCause.title}.`,
      rootCause.description,
      ...relationSteps,
    ]);
  }

  return cleanList(relationSteps);
}

function buildMainProblem(
  causalChain: string[],
  context: EvidenceContext,
  flags: DiagnosisFlags,
  rootCause?: RootCause
): string {
  if (rootCause && rootCause.id !== "sin_causa_raiz") {
    return `El problema principal no es una acción aislada, sino ${rootCause.title}, porque desde ahí se generan o amplifican otras tensiones del negocio.`;
  }

  if (causalChain.length > 0) {
    return causalChain[0];
  }

  if (flags.necesitaSistemaComercial) {
    return "El negocio genera conversaciones, pero no tiene un sistema suficientemente claro para convertirlas en oportunidades gestionadas.";
  }

  if (flags.dependenciaPersonal) {
    return "El crecimiento está limitado por una estructura demasiado dependiente de la disponibilidad diaria de quien dirige el negocio.";
  }

  if (context.frenoCrecimiento) {
    return `El principal freno declarado por el negocio es: ${context.frenoCrecimiento}.`;
  }

  return "El diagnóstico no muestra una causa única dominante, pero sí señales suficientes para ordenar prioridades antes de ejecutar nuevas acciones.";
}

function buildMainRisk(
  causalChain: string[],
  flags: DiagnosisFlags
): string {
  if (causalChain.length >= 3) {
    return "El riesgo principal es seguir corrigiendo síntomas visibles sin intervenir la causa que conecta varias áreas del negocio.";
  }

  if (flags.necesitaSistemaComercial) {
    return "El negocio puede aumentar visibilidad o actividad comercial y aun así seguir perdiendo oportunidades por falta de seguimiento y conversión.";
  }

  if (flags.dependenciaPersonal) {
    return "Si entra más demanda sin reducir dependencia operativa, el crecimiento puede traducirse en saturación y pérdida de calidad.";
  }

  return "El riesgo principal es dispersar esfuerzo entre varias mejoras sin definir cuál tiene más impacto real.";
}

function buildMainOpportunity(
  causalChain: string[],
  rootCause?: RootCause
): string {
  if (rootCause && rootCause.id !== "sin_causa_raiz") {
    return "Trabajar primero la causa raíz permite que varias áreas mejoren de forma indirecta sin multiplicar acciones.";
  }

  if (causalChain.length > 0) {
    return "Ordenar la cadena causa → efecto permite actuar con más precisión y evitar intervenciones aisladas.";
  }

  return "Convertir el diagnóstico en una secuencia de intervención permite mejorar el negocio sin añadir más complejidad.";
}

function getRelationEvidence(relation: FrictionRelation): string[] {
  return cleanList([
    relation.explanation,
    relation.strategicImplication,
    ...relation.evidence,
  ]);
}

function buildHypothesisFromRelation(
  relation: FrictionRelation,
  frictions: Friction[],
  rootCause?: RootCause
): ReasoningHypothesis {
  const fromArea = mapCategoryToArea(relation.fromCategory);
  const toArea = mapCategoryToArea(relation.toCategory);
  const fromFriction = getFrictionById(frictions, relation.fromFrictionId);
  const toFriction = getFrictionById(frictions, relation.toFrictionId);

  const evidence = cleanList([
    fromFriction?.description ?? "",
    toFriction?.description ?? "",
    ...getRelationEvidence(relation),
  ]);

  const impact = getRelationImpact(relation);
  const isRootRelation =
    rootCause?.id === relation.fromFrictionId ||
    rootCause?.id === relation.toFrictionId ||
    rootCause?.relatedRelations?.includes(relation.id);

  const scoreImpact = isRootRelation ? impact + 10 : impact;

  return {
    id: `relacion_${relation.id}`,
    area: toArea,
    title: `${AREA_LABELS[fromArea]} está condicionando ${AREA_LABELS[toArea]}.`,
    summary:
      relation.explanation ||
      `Lo que ocurre en ${AREA_LABELS[fromArea]} está reduciendo el rendimiento de ${AREA_LABELS[toArea]}.`,
    evidence,
    risk:
      "Si esta relación no se corrige, el negocio puede seguir actuando sobre el área visible sin resolver la causa que la alimenta.",
    opportunity:
      relation.strategicImplication ||
      "Corregir el origen de la fricción puede mejorar varias áreas sin aumentar la cantidad de acciones.",
    recommendation:
      fromArea === toArea
        ? `Revisar ${AREA_LABELS[fromArea]} como un bloque completo antes de sumar nuevas acciones.`
        : `Corregir primero ${AREA_LABELS[fromArea]} antes de exigir más rendimiento a ${AREA_LABELS[toArea]}.`,
    nextAction: buildNextActionForArea(fromArea, toArea),
    severity: severityFromImpact(scoreImpact),
    confidence: confidenceFromEvidence(evidence.length),
    scoreImpact,
  };
}

function buildNextActionForArea(
  fromArea: ReasoningArea,
  toArea: ReasoningArea
): string {
  if (fromArea === "claridad") {
    return "Reformular la propuesta para que el cliente entienda valor, destinatario y diferencia antes de comparar opciones.";
  }

  if (fromArea === "captacion" && toArea === "seguimiento") {
    return "Separar mensaje recibido, contacto cualificado y oportunidad real antes de aumentar actividad en canales.";
  }

  if (fromArea === "seguimiento" || toArea === "conversion") {
    return "Definir un recorrido comercial desde primer mensaje hasta cita confirmada, con estados y próximos pasos.";
  }

  if (fromArea === "procesos" || toArea === "automatizacion") {
    return "Documentar el proceso real antes de automatizar, delegar o aumentar demanda.";
  }

  if (fromArea === "direccion") {
    return "Convertir el diagnóstico en tres prioridades operativas para los próximos 30 días.";
  }

  if (fromArea === "rentabilidad") {
    return "Revisar servicios por precio, duración, margen y esfuerzo antes de aumentar volumen.";
  }

  return "Elegir la fricción de origen y trabajarla antes de abrir nuevas líneas de acción.";
}

function buildCoreHypotheses(
  context: EvidenceContext,
  flags: DiagnosisFlags
): ReasoningHypothesis[] {
  const hypotheses: ReasoningHypothesis[] = [];

  const sistemaComercialEvidence = cleanList([
    context.oportunidades
      ? `Las oportunidades llegan por: ${context.oportunidades}.`
      : "",
    context.herramientas
      ? `Herramientas actuales: ${context.herramientas}.`
      : "",
    context.seguimiento
      ? `Seguimiento actual: ${context.seguimiento}.`
      : "",
    context.tareaConsumeTiempo
      ? `La tarea que más consume tiempo es: ${context.tareaConsumeTiempo}.`
      : "",
  ]);

  pushHypothesis(
    hypotheses,
    {
      id: "sistema_comercial_incompleto",
      area: "conversion",
      title:
        "El negocio no tiene un problema principal de visibilidad, sino de conversión y seguimiento.",
      summary:
        "Ya existen canales de entrada, pero el circuito posterior no está suficientemente ordenado para transformar interés en oportunidades gestionadas.",
      evidence: sistemaComercialEvidence,
      risk:
        "Más contenido o más mensajes pueden aumentar la carga operativa sin mejorar proporcionalmente las citas, ventas o conversaciones cualificadas.",
      opportunity:
        "Ordenar el flujo desde el primer contacto hasta el seguimiento puede mejorar resultados sin aumentar inversión ni actividad visible.",
      recommendation:
        "Definir un sistema mínimo: entrada del contacto, respuesta inicial, clasificación, cita, recordatorio y recuperación.",
      nextAction:
        "Crear un flujo comercial simple para Instagram y WhatsApp con estados claros de cada contacto.",
      severity: "critica",
      confidence: confidenceFromEvidence(sistemaComercialEvidence.length),
      scoreImpact: 32,
    },
    flags.necesitaSistemaComercial
  );

  const dependenciaEvidence = cleanList([
    context.equipo ? `Estructura declarada: ${context.equipo}.` : "",
    context.frenoCrecimiento
      ? `Freno percibido: ${context.frenoCrecimiento}.`
      : "",
    context.ayuda ? `Ayuda buscada: ${context.ayuda}.` : "",
    context.tareaConsumeTiempo
      ? `Tarea que consume más tiempo: ${context.tareaConsumeTiempo}.`
      : "",
  ]);

  pushHypothesis(
    hypotheses,
    {
      id: "dependencia_operativa",
      area: "procesos",
      title:
        "El crecimiento está limitado por dependencia operativa, no solo por captación.",
      summary:
        "El negocio puede funcionar, pero todavía depende demasiado de la disponibilidad diaria de quien lo dirige.",
      evidence: dependenciaEvidence,
      risk:
        "Si entra más demanda sin procesos claros, crecer puede traducirse en saturación, retrasos y pérdida de calidad.",
      opportunity:
        "Separar tareas repetibles, seguimiento y agenda permite crecer con menos presión operativa.",
      recommendation:
        "Documentar los procesos que más se repiten y decidir cuáles deben sistematizarse primero.",
      nextAction:
        "Mapear gestión de citas, respuestas frecuentes, entrega del servicio y seguimiento posterior.",
      severity: "alta",
      confidence: confidenceFromEvidence(dependenciaEvidence.length),
      scoreImpact: 28,
    },
    flags.dependenciaPersonal || dependenciaEvidence.length >= 2
  );

  const claridadEvidence = cleanList([
    context.propuestaFrase ? `Propuesta: ${context.propuestaFrase}.` : "",
    context.diferencia ? `Diferenciación: ${context.diferencia}.` : "",
    context.objeciones ? `Objeciones: ${context.objeciones}.` : "",
  ]);

  pushHypothesis(
    hypotheses,
    {
      id: "valor_no_traducido_a_mensaje",
      area: "claridad",
      title:
        "El valor real del servicio existe, pero necesita expresarse mejor para no competir por precio.",
      summary:
        "Hay diferenciales reales, pero las objeciones indican que parte del valor puede no estar suficientemente visible antes de la decisión.",
      evidence: claridadEvidence,
      risk:
        "Cuando el cliente no entiende el estándar profesional, compara por precio o posterga la decisión.",
      opportunity:
        "Convertir experiencia, detalle, confianza, método o resultado en mensajes visibles eleva la percepción de valor.",
      recommendation:
        "Reformular la comunicación para explicar el estándar del servicio, no solo mostrar el resultado final.",
      nextAction:
        "Crear tres mensajes base: confianza, resultado y experiencia, conectados con las objeciones reales.",
      severity: "media",
      confidence: confidenceFromEvidence(claridadEvidence.length),
      scoreImpact: 20,
    },
    flags.tienePropuesta && flags.tieneDiferencial && flags.tieneObjeciones
  );

  const automatizacionEvidence = cleanList([
    context.automatizar,
    context.tareaConsumeTiempo,
    context.herramientas,
    context.seguimiento,
  ]);

  pushHypothesis(
    hypotheses,
    {
      id: "automatizacion_util_pero_no_avanzada",
      area: "automatizacion",
      title:
        "La automatización tiene sentido, pero debe empezar por tareas simples conectadas a citas y seguimiento.",
      summary:
        "El negocio no necesita automatización compleja; necesita reducir repetición y evitar pérdida de oportunidades.",
      evidence: automatizacionEvidence,
      risk:
        "Automatizar sin ordenar antes puede añadir complejidad y crear una falsa sensación de control.",
      opportunity:
        "Un flujo básico de WhatsApp, recordatorios y seguimiento puede liberar tiempo y mejorar conversión.",
      recommendation:
        "Automatizar solo lo repetitivo: preguntas frecuentes, recordatorios, confirmaciones y seguimiento.",
      nextAction:
        "Definir las 10 preguntas frecuentes y los estados principales de una cita o contacto comercial.",
      severity: "alta",
      confidence: confidenceFromEvidence(automatizacionEvidence.length),
      scoreImpact: 26,
    },
    flags.quiereAutomatizar && (flags.sinCrm || flags.herramientasInsuficientes)
  );

  const captacionEvidence = cleanList([
    context.canalPrincipal,
    context.oportunidades,
    context.contenidoFunciona,
    context.herramientas,
  ]);

  pushHypothesis(
    hypotheses,
    {
      id: "captacion_activa_pero_no_previsible",
      area: "captacion",
      title:
        "La captación tiene actividad, pero todavía no parece funcionar como un sistema previsible.",
      summary:
        "Existen canales y señales de respuesta, pero falta convertir esa actividad en una rutina medible y repetible.",
      evidence: captacionEvidence,
      risk:
        "El negocio puede depender de presencia constante sin saber qué acciones generan contactos útiles.",
      opportunity:
        "Ordenar canal, mensaje, frecuencia y seguimiento permite diferenciar visibilidad de captación real.",
      recommendation:
        "Medir durante 30 días qué contenido, canal o conversación genera oportunidades concretas.",
      nextAction:
        "Crear un registro simple con fecha, canal, origen del contacto, necesidad y siguiente paso.",
      severity: "media",
      confidence: confidenceFromEvidence(captacionEvidence.length),
      scoreImpact: 18,
    },
    flags.canalesConversacionales && flags.sinCalendario
  );

  return hypotheses;
}

function buildRootCauseHypothesis(
  frictions: Friction[],
  frictionRelations: FrictionRelation[],
  rootCause?: RootCause
): ReasoningHypothesis | null {
  if (!rootCause || rootCause.id === "sin_causa_raiz") return null;

  const rootFriction = frictions.find((friction) => friction.id === rootCause.id);

  if (!rootFriction) return null;

  const relatedRelations = frictionRelations.filter((relation) =>
    rootCause.relatedRelations?.includes(relation.id)
  );

  const evidence = cleanList([
    rootFriction.description,
    ...rootFriction.evidence,
    ...relatedRelations.map((relation) => relation.explanation),
    ...relatedRelations.map((relation) => relation.strategicImplication),
  ]);

  const rootArea = mapCategoryToArea(rootFriction.category);

  return {
    id: `causa_raiz_${rootCause.id}`,
    area: rootArea,
    title: `La causa raíz más influyente es ${rootCause.title}.`,
    summary:
      relatedRelations.length > 0
        ? `${rootCause.description} Esta causa no aparece aislada: está conectando ${relatedRelations
            .slice(0, 2)
            .map(
              (relation) =>
                `${AREA_LABELS[mapCategoryToArea(relation.fromCategory)]} con ${AREA_LABELS[mapCategoryToArea(relation.toCategory)]}`
            )
            .join(" y ")}.`
        : rootCause.description,
    evidence,
    risk:
      "Si esta causa se trata como una incidencia aislada, el negocio puede invertir esfuerzo en acciones correctas pero mal ordenadas.",
    opportunity:
      "Trabajar primero esta causa permite que varias áreas mejoren de forma indirecta sin multiplicar acciones.",
    recommendation:
      "Convertir esta causa raíz en la prioridad principal del primer ciclo de intervención.",
    nextAction:
      "Definir una acción concreta de 7 días centrada únicamente en reducir esta causa raíz antes de abrir nuevas mejoras.",
    severity: rootFriction.severity,
    confidence: rootFriction.confidence,
    scoreImpact: getFrictionImpact(rootFriction) + 12,
  };
}

function buildHypotheses(
  context: EvidenceContext,
  flags: DiagnosisFlags,
  frictions: Friction[],
  frictionRelations: FrictionRelation[],
  rootCause?: RootCause
): ReasoningHypothesis[] {
  const hypotheses: ReasoningHypothesis[] = [];

  const rootHypothesis = buildRootCauseHypothesis(
    frictions,
    frictionRelations,
    rootCause
  );

  if (rootHypothesis) {
    hypotheses.push(rootHypothesis);
  }

  const relationHypotheses = [...frictionRelations]
    .sort((a, b) => getRelationImpact(b) - getRelationImpact(a))
    .slice(0, 5)
    .map((relation) => buildHypothesisFromRelation(relation, frictions, rootCause));

  relationHypotheses.forEach((hypothesis) => {
    if (!hypotheses.some((item) => item.id === hypothesis.id)) {
      hypotheses.push(hypothesis);
    }
  });

  buildCoreHypotheses(context, flags).forEach((hypothesis) => {
    const duplicatedArea = hypotheses.some(
      (item) =>
        item.area === hypothesis.area &&
        item.summary.toLowerCase() === hypothesis.summary.toLowerCase()
    );

    if (!duplicatedArea) {
      hypotheses.push(hypothesis);
    }
  });

  return hypotheses.sort((a, b) => b.scoreImpact - a.scoreImpact);
}

function buildAreaScores(
  strengths: ReasoningSignal[],
  weaknesses: ReasoningSignal[],
  contradictions: ReasoningContradiction[],
  hypotheses: ReasoningHypothesis[],
  frictionRelations: FrictionRelation[]
): Record<ReasoningArea, number> {
  const scores = Object.fromEntries(AREAS.map((area) => [area, 66])) as Record<
    ReasoningArea,
    number
  >;

  strengths.forEach((strength) => {
    scores[strength.area] += strength.weight;
  });

  weaknesses.forEach((weakness) => {
    scores[weakness.area] -= weakness.weight;
  });

  contradictions.forEach((contradiction) => {
    scores[contradiction.area] -= contradiction.weight;
  });

  hypotheses.forEach((hypothesis) => {
    scores[hypothesis.area] -= Math.round(hypothesis.scoreImpact * 0.65);
  });

  frictionRelations.forEach((relation) => {
    const fromArea = mapCategoryToArea(relation.fromCategory);
    const toArea = mapCategoryToArea(relation.toCategory);
    const impact =
      relation.strength === "alta" ? 8 : relation.strength === "media" ? 5 : 3;

    scores[toArea] -= impact;

    if (relation.type === "bloquea" || relation.type === "causa") {
      scores[fromArea] -= Math.round(impact * 0.5);
    }
  });

  if (scores.seguimiento < 45) {
    scores.conversion -= 8;
    scores.automatizacion -= 5;
  }

  if (scores.procesos < 45) {
    scores.automatizacion -= 8;
    scores.rentabilidad -= 6;
  }

  if (scores.claridad < 50) {
    scores.captacion -= 5;
    scores.conversion -= 6;
  }

  if (scores.direccion < 45) {
    scores.rentabilidad -= 5;
    scores.captacion -= 5;
  }

  AREAS.forEach((area) => {
    scores[area] = clampScore(scores[area]);
  });

  return scores;
}

function buildPriorities(hypotheses: ReasoningHypothesis[]): string[] {
  return hypotheses.slice(0, 4).map((hypothesis) => hypothesis.nextAction);
}

function buildRecommendations(hypotheses: ReasoningHypothesis[]): string[] {
  return hypotheses.slice(0, 4).map((hypothesis) => hypothesis.recommendation);
}

function buildAreaNarratives(
  hypotheses: ReasoningHypothesis[],
  frictionRelations: FrictionRelation[],
  causalChain: string[]
): Record<string, unknown> {
  const areas: Record<string, unknown> = {};

  AREAS.forEach((area) => {
    const areaHypotheses = hypotheses.filter(
      (hypothesis) => hypothesis.area === area
    );

    const areaRelations = frictionRelations.filter(
      (relation) =>
        mapCategoryToArea(relation.fromCategory) === area ||
        mapCategoryToArea(relation.toCategory) === area
    );

    const mainHypothesis = areaHypotheses[0];
    const mainRelation = areaRelations[0];

    if (!mainHypothesis && !mainRelation) {
      return;
    }

    areas[area] = {
      summary:
        mainHypothesis?.summary ||
        mainRelation?.explanation ||
        `${AREA_LABELS[area]} debe revisarse por su conexión con el resto del sistema.`,
      findings: cleanList([
        mainHypothesis?.summary ?? "",
        mainHypothesis?.risk ?? "",
        mainRelation?.explanation ?? "",
        ...causalChain.slice(0, 2),
      ]).slice(0, 4),
      explanation:
        mainRelation?.strategicImplication ||
        mainHypothesis?.risk ||
        "Esta área no debe interpretarse de forma aislada, sino como parte de una cadena de causa y efecto.",
      actions: cleanList([
        mainHypothesis?.nextAction ?? "",
        mainHypothesis?.recommendation ?? "",
      ]).slice(0, 3),
      impact:
        mainHypothesis?.opportunity ||
        "Corregir esta área puede reducir fricción en otras partes del negocio.",
      confidence: mainHypothesis?.confidence ?? "media",
      priority:
        mainHypothesis?.severity === "critica" || mainHypothesis?.severity === "alta"
          ? "alta"
          : mainHypothesis?.severity === "media"
            ? "media"
            : "baja",
      status:
        mainHypothesis?.severity === "critica" || mainHypothesis?.severity === "alta"
          ? "critico"
          : mainHypothesis?.severity === "media"
            ? "atencion"
            : "correcto",
    };
  });

  return areas;
}

function buildMainConclusion(
  mainProblem: string,
  causalChain: string[],
  rootCause?: RootCause
): string {
  if (rootCause && rootCause.id !== "sin_causa_raiz") {
    return `${mainProblem} La intervención debe empezar por esa causa, porque el diagnóstico muestra que varias áreas están respondiendo a la misma tensión de origen.`;
  }

  if (causalChain.length > 1) {
    return `${mainProblem} La prioridad no es actuar sobre todas las áreas a la vez, sino ordenar la cadena causal y corregir primero el punto que más arrastra al resto.`;
  }

  return mainProblem;
}

export function buildReasoning(input: BuildReasoningInput): StrategicReasoning {
  const params = normalizeInput(input);
  const answers = params.answers;
  const frictions = params.frictions ?? [];
  const frictionRelations = params.frictionRelations ?? [];
  const rootCause = params.rootCause;

  const context = createEvidenceContext(answers);
  const flags = createFlags(answers, context);

  const strengths = buildStrengths(context, flags);
  const weaknesses = buildWeaknesses(context, flags);
  const contradictions = buildContradictions(context, flags);
  const causalChain = buildCausalChain(frictions, frictionRelations, rootCause);
  const hypotheses = buildHypotheses(
    context,
    flags,
    frictions,
    frictionRelations,
    rootCause
  );

  const areaScores = buildAreaScores(
    strengths,
    weaknesses,
    contradictions,
    hypotheses,
    frictionRelations
  );

  const averageScore =
    Object.values(areaScores).reduce((sum, score) => sum + score, 0) /
    Object.values(areaScores).length;

  const globalRisk = clampScore(100 - averageScore);
  const mainProblem = buildMainProblem(causalChain, context, flags, rootCause);
  const mainRisk = buildMainRisk(causalChain, flags);
  const mainOpportunity = buildMainOpportunity(causalChain, rootCause);
  const priorities = buildPriorities(hypotheses);
  const recommendations = buildRecommendations(hypotheses);
  const areas = buildAreaNarratives(hypotheses, frictionRelations, causalChain);
  const mainConclusion = buildMainConclusion(
    mainProblem,
    causalChain,
    rootCause
  );

  return {
    strengths,
    weaknesses,
    contradictions,
    hypotheses,
    areaScores,
    globalRisk,
    mainConclusion,
    mainProblem,
    mainRisk,
    mainOpportunity,
    priorities,
    recommendations,
    causalChain,
    areas,
  };
}