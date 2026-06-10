import type { DiagnosticPattern } from "./patterns";

export type RecommendedPack =
  | "Diagnóstico NEXO"
  | "NEXO Esencial"
  | "NEXO Estratégico"
  | "NEXO Implementación"
  | "PLUS Captación y Mensaje"
  | "PLUS Seguimiento y Proceso Comercial"
  | "PLUS Automatización Estratégica"
  | "Auditoría Estratégica de Redes Sociales"
  | "Optimización Estratégica de Perfil"
  | "Creación de Contenidos Base"
  | "Creación de Contenidos Pro"
  | "No apto todavía";

export type PriorityPlanItem = {
  title: string;
  reason: string;
};

export type DiagnosticContext = {
  raw_text?: string;
  assets?: string[];
  tools?: string[];
  evidence?: string[];
  has_commercial_assets?: boolean;
  has_operational_assets?: boolean;
  has_ai_tools?: boolean;
  works_alone?: boolean;
  has_previous_experience?: boolean;
  willing_to_invest?: boolean;
};

export type StrategicRecommendation = {
  summary: string;
  main_problems: string[];
  main_bottleneck: string;
  maturity_level: string;
  active_strengths: string[];
  priority_plan: PriorityPlanItem[];
  strategic_explanation: string;
  recommended_focus: string[];
  recommended_pack: RecommendedPack;
  pack_reason: string;
  priority: "alta" | "media" | "baja";
};

const PACK_AREAS = {
  estrategia: [
    "claridad_mensaje",
    "cliente_ideal",
    "propuesta_valor",
    "diferenciacion",
  ],
  visibilidad: ["contenido", "captacion"],
  sistema: ["conversion", "seguimiento", "sistemas", "ia"],
};

const AREA_LABELS: Record<string, string> = {
  claridad_mensaje: "claridad del mensaje",
  cliente_ideal: "cliente ideal",
  propuesta_valor: "propuesta de valor",
  diferenciacion: "diferenciación",
  contenido: "contenido",
  captacion: "captación",
  conversion: "conversión",
  seguimiento: "seguimiento",
  sistemas: "sistemas",
  ia: "IA",
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function getVariables(patterns: DiagnosticPattern[]) {
  return new Set(patterns.flatMap((pattern) => pattern.matched_variables));
}

function countMatches(patterns: DiagnosticPattern[], areas: string[]) {
  return patterns.filter((pattern) =>
    pattern.matched_variables.some((variable) => areas.includes(variable))
  ).length;
}

function scoreArea(patterns: DiagnosticPattern[], areas: string[]) {
  return patterns.reduce((total, pattern) => {
    const matches = pattern.matched_variables.some((variable) =>
      areas.includes(variable)
    );

    return matches ? total + pattern.severity : total;
  }, 0);
}

function getMainPattern(patterns: DiagnosticPattern[]) {
  return [...patterns].sort((a, b) => {
    if (b.severity !== a.severity) return b.severity - a.severity;
    return b.matched_variables.length - a.matched_variables.length;
  })[0] ?? null;
}

function getDominantArea(patterns: DiagnosticPattern[]) {
  const scores = [
    {
      key: "estrategia",
      label: "estrategia, oferta y mensaje",
      score: scoreArea(patterns, PACK_AREAS.estrategia),
    },
    {
      key: "visibilidad",
      label: "contenido, visibilidad y captación",
      score: scoreArea(patterns, PACK_AREAS.visibilidad),
    },
    {
      key: "sistema",
      label: "seguimiento, conversión, sistemas e IA",
      score: scoreArea(patterns, PACK_AREAS.sistema),
    },
  ];

  return scores.sort((a, b) => b.score - a.score)[0];
}

function getAffectedAreaLabels(patterns: DiagnosticPattern[]) {
  const variables = getVariables(patterns);

  return unique(
    Array.from(variables)
      .map((variable) => AREA_LABELS[variable])
      .filter(Boolean)
  );
}

function hasAnyVariable(patterns: DiagnosticPattern[], variablesToFind: string[]) {
  const variables = getVariables(patterns);
  return variablesToFind.some((variable) => variables.has(variable));
}

function buildMaturityLevel(patterns: DiagnosticPattern[]) {
  const total = patterns.length;
  const maxSeverity = Math.max(...patterns.map((pattern) => pattern.severity), 0);
  const affectedAreas = [
    countMatches(patterns, PACK_AREAS.estrategia) > 0,
    countMatches(patterns, PACK_AREAS.visibilidad) > 0,
    countMatches(patterns, PACK_AREAS.sistema) > 0,
  ].filter(Boolean).length;

  if (total >= 10 || (maxSeverity >= 9 && affectedAreas >= 3)) {
    return "Desestructurado con múltiples frentes críticos";
  }

  if (total >= 6 || affectedAreas >= 2) {
    return "Intermedio con bloqueos conectados";
  }

  if (total >= 3) {
    return "Inicial con áreas prioritarias visibles";
  }

  return "Básico con señales puntuales";
}

function buildSummary(
  mainPattern: DiagnosticPattern,
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const dominantArea = getDominantArea(patterns);
  const variables = getVariables(patterns);

  const hasStrategyProblem = hasAnyVariable(patterns, [
    "claridad_mensaje",
    "cliente_ideal",
    "propuesta_valor",
    "diferenciacion",
  ]);

  const hasSystemProblem = hasAnyVariable(patterns, [
    "conversion",
    "seguimiento",
    "sistemas",
    "ia",
  ]);

  const hasVisibilityProblem = hasAnyVariable(patterns, ["contenido", "captacion"]);

  if (context?.willing_to_invest === false) {
    return "El diagnóstico muestra señales relevantes, pero también una posible falta de disposición para intervenir ahora. Antes de recomendar ejecución, conviene validar compromiso, prioridades y capacidad real de avance.";
  }

  if (variables.has("ia") && (hasStrategyProblem || hasSystemProblem)) {
    return "El negocio muestra intención de usar herramientas o inteligencia artificial, pero todavía existen bloqueos estratégicos o comerciales que deben ordenarse antes de escalar procesos.";
  }

  if (hasStrategyProblem && hasSystemProblem && hasVisibilityProblem) {
    return "El diagnóstico muestra un bloqueo integral: la oferta, la captación y el seguimiento no están suficientemente alineados. Esto puede provocar esfuerzo comercial sin una dirección clara.";
  }

  if (hasStrategyProblem && hasVisibilityProblem) {
    return "El principal bloqueo está en la forma de comunicar y atraer oportunidades. El negocio necesita clarificar su propuesta antes de aumentar acciones de visibilidad.";
  }

  if (hasSystemProblem) {
    return "El negocio no parece tener un problema únicamente de visibilidad. La señal más importante está en el seguimiento, la conversión y la falta de estructura comercial.";
  }

  return `El diagnóstico indica que el principal cuello de botella está relacionado con ${dominantArea.label}. El patrón más relevante detectado es: ${mainPattern.name}.`;
}

function buildStrategicExplanation(
  mainPattern: DiagnosticPattern,
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const variables = getVariables(patterns);

  const hasOfferProblem = hasAnyVariable(patterns, [
    "claridad_mensaje",
    "propuesta_valor",
    "diferenciacion",
  ]);

  const hasClientProblem = variables.has("cliente_ideal");
  const hasContentProblem = hasAnyVariable(patterns, ["contenido", "captacion"]);
  const hasSystemProblem = hasAnyVariable(patterns, [
    "conversion",
    "seguimiento",
    "sistemas",
  ]);

  const hasTechButNoStructure =
    (variables.has("ia") ||
      context?.has_ai_tools ||
      context?.has_operational_assets) &&
    (hasOfferProblem || hasSystemProblem);

  if (hasTechButNoStructure) {
    return "Existe una señal clara de querer apoyarse en herramientas, IA o sistemas, pero el diagnóstico indica que todavía hay problemas previos de oferta, mensaje, seguimiento o proceso. Automatizar en este punto podría acelerar el desorden si antes no se define qué debe ocurrir, con quién, cuándo y con qué objetivo.";
  }

  if (hasOfferProblem && hasClientProblem) {
    return "El negocio necesita trabajar antes la base estratégica. Cuando no está claro para quién se vende, qué se promete y por qué el cliente debería elegir la propuesta, cualquier esfuerzo posterior en contenido, captación o automatización pierde precisión.";
  }

  if (hasContentProblem && !hasOfferProblem) {
    return "La presencia comercial necesita dejar de depender de acciones aisladas. El contenido y la captación deben conectarse con una intención comercial clara, no funcionar únicamente como visibilidad o actividad.";
  }

  if (hasSystemProblem) {
    return "El diagnóstico muestra que el problema no está únicamente en atraer más oportunidades, sino en cómo se gestionan después. Sin seguimiento, control y proceso comercial, parte del esfuerzo de captación se pierde antes de convertirse en venta.";
  }

  return `El patrón dominante es "${mainPattern.name}". Esta señal debe interpretarse como una prioridad estratégica porque puede estar afectando varias decisiones comerciales posteriores.`;
}

function buildActiveStrengths(
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const variables = getVariables(patterns);
  const strengths: string[] = [];

  if (context?.has_previous_experience) {
    strengths.push(
      "Existe experiencia previa que puede convertirse en criterio comercial si se ordena correctamente."
    );
  }

  if (context?.has_commercial_assets) {
    strengths.push(
      "El negocio ya cuenta con activos comerciales que pueden ser reutilizados o mejorados."
    );
  }

  if (context?.has_operational_assets) {
    strengths.push(
      "Hay elementos operativos que pueden servir como base para construir un sistema más claro."
    );
  }

  if (context?.has_ai_tools) {
    strengths.push(
      "Existe apertura hacia herramientas e IA, lo que puede acelerar la implementación cuando la estrategia esté definida."
    );
  }

  if (context?.works_alone) {
    strengths.push(
      "La toma de decisiones puede ser rápida al depender de una sola persona, siempre que exista claridad estratégica."
    );
  }

  if (variables.has("captacion") || variables.has("contenido")) {
    strengths.push(
      "Ya existe conciencia sobre la necesidad de generar visibilidad y oportunidades."
    );
  }

  if (variables.has("seguimiento") || variables.has("conversion")) {
    strengths.push(
      "El negocio ya está detectando señales vinculadas a la conversión y al proceso comercial."
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      "El principal activo actual es haber iniciado un proceso de diagnóstico antes de seguir ejecutando acciones aisladas."
    );
  }

  return unique(strengths).slice(0, 5);
}

function buildPriorityPlan(patterns: DiagnosticPattern[]): PriorityPlanItem[] {
  const variables = getVariables(patterns);

  const priorities: Array<PriorityPlanItem & { weight: number }> = [];

  if (
    variables.has("claridad_mensaje") ||
    variables.has("propuesta_valor") ||
    variables.has("diferenciacion")
  ) {
    priorities.push({
      title: "Clarificar la propuesta comercial",
      reason:
        "Antes de captar más oportunidades, el negocio necesita explicar con precisión qué ofrece, para quién y qué resultado promete.",
      weight: 100,
    });
  }

  if (variables.has("cliente_ideal")) {
    priorities.push({
      title: "Definir el cliente prioritario",
      reason:
        "Sin un cliente claro, el mensaje, el contenido y la captación se vuelven demasiado generales.",
      weight: 95,
    });
  }

  if (variables.has("seguimiento") || variables.has("conversion")) {
    priorities.push({
      title: "Ordenar el seguimiento comercial",
      reason:
        "Las oportunidades pueden perderse si no existe un proceso claro para avanzar conversaciones y gestionar objeciones.",
      weight: 90,
    });
  }

  if (variables.has("captacion")) {
    priorities.push({
      title: "Diseñar una captación más consistente",
      reason:
        "El negocio necesita dejar de depender solo de acciones sueltas o recomendaciones y construir un flujo mínimo de oportunidades.",
      weight: 80,
    });
  }

  if (variables.has("contenido")) {
    priorities.push({
      title: "Conectar el contenido con objetivos comerciales",
      reason:
        "Publicar sin sistema puede generar actividad, pero no necesariamente oportunidades cualificadas.",
      weight: 75,
    });
  }

  if (variables.has("sistemas") || variables.has("ia")) {
    priorities.push({
      title: "Definir procesos antes de automatizar",
      reason:
        "La tecnología solo debe escalar procesos que ya tienen lógica, objetivo y criterio de seguimiento.",
      weight: 70,
    });
  }

  const ordered = priorities.sort((a, b) => b.weight - a.weight).slice(0, 4);

  if (ordered.length === 0) {
    return [
      {
        title: "Completar lectura estratégica",
        reason:
          "La información actual no permite priorizar con precisión. Conviene revisar más evidencias antes de decidir una intervención.",
      },
    ];
  }

  return ordered.map(({ title, reason }) => ({ title, reason }));
}

function buildRecommendedFocus(
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const variables = getVariables(patterns);

  const weightedFocus: Array<{ label: string; weight: number }> = [];

  if (
    variables.has("claridad_mensaje") ||
    variables.has("propuesta_valor") ||
    variables.has("diferenciacion")
  ) {
    weightedFocus.push({ label: "Oferta", weight: 100 });
    weightedFocus.push({ label: "Propuesta de valor", weight: 95 });
  }

  if (variables.has("cliente_ideal")) {
    weightedFocus.push({ label: "Cliente ideal", weight: 90 });
  }

  if (variables.has("conversion") || variables.has("seguimiento")) {
    weightedFocus.push({ label: "Conversión", weight: 85 });
    weightedFocus.push({ label: "Seguimiento", weight: 80 });
  }

  if (
    variables.has("sistemas") ||
    variables.has("ia") ||
    context?.has_operational_assets ||
    context?.has_ai_tools
  ) {
    weightedFocus.push({ label: "Sistema comercial", weight: 78 });
  }

  if (variables.has("contenido") || variables.has("captacion")) {
    weightedFocus.push({ label: "Captación", weight: 72 });
  }

  const uniqueFocus = Array.from(
    new Map(
      weightedFocus
        .sort((a, b) => b.weight - a.weight)
        .map((item) => [item.label, item])
    ).values()
  );

  return uniqueFocus.slice(0, 5).map((item) => item.label);
}

function buildPackReason(
  recommendedPack: RecommendedPack,
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const mainPattern = getMainPattern(patterns);
  const affectedLabels = getAffectedAreaLabels(patterns);
  const affectedText = affectedLabels.slice(0, 5).join(", ");

  if (recommendedPack === "PLUS Captación y Mensaje") {
    return "El negocio necesita dejar de depender solo de recomendaciones y construir una base clara para generar oportunidades comerciales con un mensaje más definido.";
  }

  if (recommendedPack === "NEXO Esencial") {
    return "El principal bloqueo está concentrado en una zona crítica del negocio. Se recomienda corregir primero esa área antes de ampliar la intervención.";
  }

  if (recommendedPack === "PLUS Seguimiento y Proceso Comercial") {
    return "Las oportunidades pueden estar existiendo, pero se están perdiendo por falta de seguimiento, mensajes, fases comerciales y control del proceso.";
  }

  if (recommendedPack === "Creación de Contenidos Base") {
    return "El contenido necesita una planificación mínima, coherencia comercial y una estructura mensual para dejar de depender de la improvisación.";
  }

  if (recommendedPack === "Creación de Contenidos Pro") {
    return "El contenido necesita un sistema más sólido de posicionamiento, autoridad, calendario editorial y conexión con objetivos comerciales.";
  }

  if (recommendedPack === "Auditoría Estratégica de Redes Sociales") {
    return "El perfil digital muestra señales de desalineación, pero conviene revisar primero la presencia actual antes de ejecutar cambios concretos.";
  }

  if (recommendedPack === "Optimización Estratégica de Perfil") {
    return "El perfil digital necesita ajustes concretos para comunicar mejor qué ofrece el negocio, a quién ayuda y qué acción debe tomar el visitante.";
  }

  if (recommendedPack === "NEXO Estratégico") {
    return `El diagnóstico muestra problemas conectados en áreas estratégicas del negocio${
      affectedText ? `: ${affectedText}` : ""
    }. Se recomienda ordenar la base antes de ejecutar acciones aisladas.`;
  }

  if (recommendedPack === "NEXO Implementación") {
    return "El negocio necesita convertir la estrategia en materiales, estructura y activos concretos para facilitar la ejecución y reducir dependencia de la persona.";
  }

  if (recommendedPack === "PLUS Automatización Estratégica") {
    return "Existen procesos que podrían automatizarse, pero primero debe diseñarse la arquitectura, la lógica de seguimiento y las prioridades de implementación.";
  }

  if (recommendedPack === "Diagnóstico NEXO") {
    return "La información disponible apunta a la necesidad de una primera lectura estratégica antes de recomendar una intervención concreta.";
  }

  if (mainPattern) {
    return `El diagnóstico ha detectado como bloqueo principal: ${mainPattern.name}.`;
  }

  if (context?.willing_to_invest === false) {
    return "No existe disposición suficiente para iniciar una intervención estratégica en este momento.";
  }

  return "No existe evidencia diagnóstica suficiente para recomendar una intervención.";
}

function affectedStrategicAreas(patterns: DiagnosticPattern[]) {
  return [
    countMatches(patterns, PACK_AREAS.estrategia) > 0,
    countMatches(patterns, PACK_AREAS.visibilidad) > 0,
    countMatches(patterns, PACK_AREAS.sistema) > 0,
  ].filter(Boolean).length;
}

function resolveRecommendedPack(
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
): RecommendedPack {
  const mainPattern = getMainPattern(patterns);

  if (!mainPattern) {
    return "No apto todavía";
  }

  const variables = getVariables(patterns);
  const estrategiaScore = countMatches(patterns, PACK_AREAS.estrategia);
  const visibilidadScore = countMatches(patterns, PACK_AREAS.visibilidad);
  const sistemaScore = countMatches(patterns, PACK_AREAS.sistema);

  const hasProfileProblem =
    mainPattern.name === "Perfil digital poco alineado" ||
    variables.has("contenido");

  const hasContentProblem =
    mainPattern.name === "Contenido sin sistema comercial" ||
    (variables.has("contenido") && variables.has("captacion"));

  const hasAutomationProblem =
    mainPattern.name === "Automatización prematura" || variables.has("ia");

  if (mainPattern.name === "Dependencia excesiva de recomendaciones") {
    return "PLUS Captación y Mensaje";
  }

  if (mainPattern.name === "Propuesta difícil de entender") {
    return "NEXO Esencial";
  }

  if (mainPattern.name === "Seguimiento inconsistente") {
    return "PLUS Seguimiento y Proceso Comercial";
  }

  if (mainPattern.name === "Contenido sin sistema comercial") {
    if (mainPattern.severity >= 8 || patterns.length >= 6) {
      return "Creación de Contenidos Pro";
    }

    return "Creación de Contenidos Base";
  }

  if (mainPattern.name === "Perfil digital poco alineado") {
    return "Auditoría Estratégica de Redes Sociales";
  }

  if (
    mainPattern.name === "Cliente ideal poco definido" ||
    mainPattern.name === "Falta de diferenciación clara" ||
    mainPattern.name === "Automatización prematura"
  ) {
    return "NEXO Estratégico";
  }

  if (mainPattern.name === "Operación dependiente de la persona") {
    return "NEXO Implementación";
  }

  if (hasAutomationProblem && sistemaScore > estrategiaScore) {
    return "PLUS Automatización Estratégica";
  }

  if (hasContentProblem && visibilidadScore >= estrategiaScore) {
    return patterns.length >= 6
      ? "Creación de Contenidos Pro"
      : "Creación de Contenidos Base";
  }

  if (hasProfileProblem && visibilidadScore > 0 && estrategiaScore === 0) {
    return "Auditoría Estratégica de Redes Sociales";
  }

  if (
    variables.has("seguimiento") ||
    variables.has("conversion") ||
    sistemaScore > estrategiaScore
  ) {
    return "PLUS Seguimiento y Proceso Comercial";
  }

  if (
    variables.has("captacion") ||
    mainPattern.name.toLowerCase().includes("recomendaciones")
  ) {
    return "PLUS Captación y Mensaje";
  }

  if (
    variables.has("cliente_ideal") ||
    variables.has("diferenciacion") ||
    affectedStrategicAreas(patterns) >= 2
  ) {
    return "NEXO Estratégico";
  }

  if (variables.has("claridad_mensaje") || variables.has("propuesta_valor")) {
    return "NEXO Esencial";
  }

  return "Diagnóstico NEXO";
}

export function buildRecommendations(
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
): StrategicRecommendation {
  const mainProblems = unique(patterns.map((pattern) => pattern.name));
  const mainPattern = getMainPattern(patterns);

  if (!mainPattern) {
    return {
      summary:
        "No hay suficiente información diagnóstica para emitir una recomendación estratégica fiable.",
      main_problems: [],
      main_bottleneck: "No identificado",
      maturity_level: "Sin datos suficientes",
      active_strengths: [],
      priority_plan: [],
      strategic_explanation:
        "Las respuestas actuales no muestran suficientes señales acumuladas como para identificar un patrón dominante.",
      recommended_focus: [],
      recommended_pack: "No apto todavía",
      pack_reason:
        "No existe evidencia diagnóstica suficiente para recomendar una intervención.",
      priority: "baja",
    };
  }

  const maturityLevel = buildMaturityLevel(patterns);
  const activeStrengths = buildActiveStrengths(patterns, context);
  const priorityPlan = buildPriorityPlan(patterns);
  const recommendedFocus = buildRecommendedFocus(patterns, context);
  const recommendedPack = resolveRecommendedPack(patterns, context);

  const priority =
    mainPattern.severity >= 9 || patterns.length >= 8
      ? "alta"
      : mainPattern.severity >= 7 || patterns.length >= 4
      ? "media"
      : "baja";

  return {
    summary: buildSummary(mainPattern, patterns, context),
    main_problems: mainProblems,
    main_bottleneck: mainPattern.name,
    maturity_level: maturityLevel,
    active_strengths: activeStrengths,
    priority_plan: priorityPlan,
    strategic_explanation: buildStrategicExplanation(
      mainPattern,
      patterns,
      context
    ),
    recommended_focus: recommendedFocus,
    recommended_pack: recommendedPack,
    pack_reason: buildPackReason(recommendedPack, patterns, context),
    priority,
  };
}