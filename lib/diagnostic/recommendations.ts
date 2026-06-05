import type { DiagnosticPattern } from "./patterns";

export type RecommendedPack =
  | "Intervención Visibilidad"
  | "Intervención Sistema"
  | "Intervención Completa"
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
    return "Desestructurado con impacto transversal";
  }

  if (total >= 8 || affectedAreas >= 3) {
    return "Desestructurado";
  }

  if (total >= 5 || maxSeverity >= 7) {
    return "Con bloqueos relevantes";
  }

  if (total >= 3) {
    return "En desarrollo";
  }

  if (total >= 1) {
    return "Estructurado con áreas de mejora";
  }

  return "Sin datos suficientes";
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

  if (
    context?.has_operational_assets &&
    context?.has_ai_tools &&
    hasStrategyProblem &&
    hasSystemProblem
  ) {
    return "El diagnóstico muestra una contradicción relevante: el negocio dispone de herramientas, IA y activos operativos, pero todavía no los está convirtiendo en un sistema comercial claro y coherente.";
  }

  if (hasStrategyProblem && hasSystemProblem && hasVisibilityProblem) {
    return "El diagnóstico muestra un bloqueo transversal: la oferta, el mensaje, la captación y el sistema comercial no están trabajando como una misma estructura.";
  }

  if (hasStrategyProblem && hasSystemProblem) {
    return "El diagnóstico muestra que el negocio no necesita solo más herramientas, sino una arquitectura comercial más clara que conecte oferta, mensaje, seguimiento y conversión.";
  }

  if (hasStrategyProblem && hasVisibilityProblem) {
    return "El diagnóstico muestra que la visibilidad existe o puede crecer, pero está limitada por una propuesta que todavía no se entiende con suficiente rapidez.";
  }

  if (variables.has("ia") && variables.has("sistemas")) {
    return "El diagnóstico muestra que la tecnología está presente, pero todavía no funciona como un sistema operativo comercial claro.";
  }

  if (mainPattern.name === "No tienen una oferta clara, tienen una lista de servicios") {
    return "El diagnóstico muestra que el bloqueo principal está en la arquitectura de la oferta.";
  }

  if (mainPattern.name === "No tienen una propuesta de valor, tienen un catálogo") {
    return "El diagnóstico muestra que el negocio necesita transformar servicios sueltos en una propuesta de valor comprensible y vendible.";
  }

  if (mainPattern.name === "No saben explicar claramente qué hacen") {
    return "El diagnóstico muestra que el primer bloqueo está en la claridad del mensaje.";
  }

  if (mainPattern.name === "Intentan hablar para todos y no conectan con nadie") {
    return "El diagnóstico muestra que el negocio necesita definir con mayor precisión a quién quiere atraer y qué problema quiere resolver primero.";
  }

  return `El diagnóstico muestra como bloqueo principal: ${mainPattern.name}. El área dominante afectada es ${dominantArea.label}.`;
}

function buildStrategicExplanation(
  mainPattern: DiagnosticPattern,
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const variables = getVariables(patterns);

  const hasOfferProblem = hasAnyVariable(patterns, [
    "propuesta_valor",
    "claridad_mensaje",
    "diferenciacion",
  ]);

  const hasClientProblem = variables.has("cliente_ideal");
  const hasContentProblem = hasAnyVariable(patterns, ["contenido", "captacion"]);
  const hasSystemProblem = hasAnyVariable(patterns, [
    "conversion",
    "seguimiento",
    "sistemas",
    "ia",
  ]);

  const hasTechButNoStructure =
    (hasAnyVariable(patterns, ["sistemas", "ia"]) ||
      context?.has_operational_assets ||
      context?.has_ai_tools) &&
    hasAnyVariable(patterns, [
      "propuesta_valor",
      "claridad_mensaje",
      "seguimiento",
      "conversion",
    ]);

  if (
    context?.has_operational_assets &&
    context?.has_ai_tools &&
    hasOfferProblem &&
    hasSystemProblem
  ) {
    return "El problema principal no es la falta de recursos.\n\nEl diagnóstico muestra que el negocio ya cuenta con herramientas, IA, activos operativos o sistemas de apoyo, pero todavía no existe una arquitectura clara que conecte esos recursos con una oferta principal, un mensaje preciso y un proceso comercial consistente.\n\nCuando esto ocurre, la tecnología ayuda a producir más, organizar más o responder más rápido, pero no necesariamente mejora la conversión ni la claridad de compra.\n\nLa prioridad es convertir los activos disponibles en un sistema comercial: qué oportunidad se atrae, cómo se califica, qué mensaje recibe, qué objeciones se trabajan y qué decisión se busca provocar.";
  }

  if (hasOfferProblem && hasClientProblem && hasSystemProblem) {
    return "El problema principal no está en una única pieza aislada.\n\nEl diagnóstico muestra que el negocio tiene actividad, recursos y capacidad de trabajo, pero todavía no existe una arquitectura clara que conecte cliente ideal, propuesta, mensaje, captación y seguimiento.\n\nCuando estas piezas no están alineadas, el cliente potencial puede percibir valor, pero no entiende con rapidez qué se le ofrece, por qué es relevante para su situación y cuál es el siguiente paso lógico.\n\nEsto provoca que la conversión dependa demasiado de conversaciones individuales, explicaciones largas y esfuerzo personal. El negocio no necesita simplemente hacer más contenido o usar más herramientas; necesita ordenar el sistema que convierte interés en decisión.";
  }

  if (hasTechButNoStructure) {
    return "El problema principal no es la falta de tecnología.\n\nEl diagnóstico muestra que ya existen herramientas, IA o intención de sistematizar, pero esas piezas no están conectadas bajo una estrategia comercial clara.\n\nCuando la tecnología se incorpora sin una oferta definida, sin un mensaje preciso y sin un proceso de seguimiento bien ordenado, termina acelerando tareas sueltas en lugar de mejorar la conversión.\n\nLa prioridad debe ser convertir las herramientas disponibles en un sistema operativo simple: qué se capta, cómo se califica, qué mensaje recibe cada oportunidad y qué decisión se busca provocar.";
  }

  if (hasOfferProblem && hasContentProblem) {
    return "El problema principal no es publicar más ni aumentar la presencia.\n\nEl diagnóstico muestra que la visibilidad está condicionada por una propuesta que todavía no se entiende con suficiente precisión.\n\nCuando el contenido habla de muchas cosas, pero la oferta no está bien empaquetada, el público puede interesarse por ideas sueltas sin avanzar hacia una decisión comercial clara.\n\nAntes de escalar captación, conviene ordenar qué problema se resuelve, para quién, con qué resultado y por qué esta propuesta es distinta.";
  }

  if (mainPattern.name === "No tienen una oferta clara, tienen una lista de servicios") {
    return "El problema principal no es la captación ni el contenido.\n\nEl negocio está intentando vender múltiples servicios sin una oferta principal claramente definida.\n\nCuando esto ocurre, el cliente potencial entiende partes de lo que se ofrece, pero no comprende con rapidez qué problema se resuelve, qué resultado obtiene ni por qué debería elegir esta propuesta frente a otras alternativas.\n\nComo consecuencia, la captación se vuelve más difícil, las conversaciones comerciales requieren demasiada explicación y la conversión termina dependiendo más del esfuerzo individual que de la claridad de la oferta.";
  }

  if (mainPattern.name === "No tienen una propuesta de valor, tienen un catálogo") {
    return "El problema principal no es que falten productos, servicios o conocimiento.\n\nEl negocio tiene elementos que ofrecer, pero todavía no los ha traducido en una propuesta de valor clara para el cliente.\n\nCuando la comunicación se presenta como catálogo, el cliente ve opciones, características o servicios sueltos, pero no entiende con precisión qué cambia para él, qué problema se reduce o qué resultado puede esperar.\n\nComo consecuencia, la decisión de compra se enfría, la comparación con otras alternativas aumenta y el precio empieza a pesar más que el valor percibido.";
  }

  if (mainPattern.name === "No saben explicar claramente qué hacen") {
    return "El problema principal está en la claridad inicial del mensaje.\n\nEl negocio puede tener valor real, pero si la explicación requiere demasiado esfuerzo, el cliente potencial no llega a comprender rápidamente qué se ofrece, para quién es y por qué debería prestarle atención.\n\nCuando esto ocurre, la captación pierde fuerza, la confianza tarda más en construirse y cada conversación comercial empieza desde cero.\n\nAntes de escalar contenido, automatización o campañas, hay que ordenar la forma en que el negocio se explica.";
  }

  if (mainPattern.name === "Intentan hablar para todos y no conectan con nadie") {
    return "El problema principal está en la falta de foco comercial.\n\nEl negocio intenta mantener abiertas demasiadas posibilidades y eso debilita el mensaje.\n\nCuando se habla para todo el mundo, nadie siente que la propuesta está pensada específicamente para su situación, su problema o su deseo.\n\nComo consecuencia, el contenido se vuelve genérico, la captación pierde precisión y la conversión depende demasiado de explicar caso por caso lo que debería entenderse desde el primer contacto.";
  }

  return `El diagnóstico muestra un bloqueo principal en: ${mainPattern.name}.\n\n${mainPattern.description}\n\nEste problema no debe tratarse como un hecho aislado, porque afecta la forma en que el cliente potencial entiende la propuesta, percibe el valor y decide si avanzar o no.`;
}

function buildActiveStrengths(
  patterns: DiagnosticPattern[],
  context?: DiagnosticContext
) {
  const variables = getVariables(patterns);
  const strengths: string[] = [];

  if (context?.has_commercial_assets && context?.has_operational_assets) {
    strengths.push("Existen pruebas de confianza y activos operativos que permiten mejorar conversión sin depender únicamente de más captación");
  } else if (context?.has_commercial_assets) {
    strengths.push("Existen pruebas de confianza comercial que pueden reforzar la propuesta, como testimonios o casos de éxito");
  } else if (context?.has_operational_assets) {
    strengths.push("El negocio ya cuenta con activos operativos aprovechables, como CRM, base de datos o herramientas de automatización");
  }

  if (context?.has_ai_tools && context?.has_operational_assets) {
    strengths.push("La IA y las herramientas disponibles pueden convertirse en un sistema de seguimiento, priorización y decisión comercial");
  } else if (context?.has_ai_tools) {
    strengths.push("La IA ya forma parte del trabajo habitual y puede pasar de apoyo puntual a sistema de decisión y ejecución");
  }

  if (
    context?.has_previous_experience &&
    (context?.willing_to_invest || context?.has_commercial_assets)
  ) {
    strengths.push("La experiencia previa con consultores o formaciones permite valorar mejor una intervención concreta, práctica y no genérica");
  } else if (context?.has_previous_experience) {
    strengths.push("Existe experiencia previa con consultores, agencias o formaciones, lo que permite distinguir mejor entre teoría genérica y ayuda realmente útil");
  }

  if (context?.willing_to_invest) {
    strengths.push("Hay disposición a invertir si la propuesta demuestra encaje, claridad de proceso y utilidad práctica");
  }

  if (
    variables.has("propuesta_valor") ||
    variables.has("claridad_mensaje") ||
    variables.has("diferenciacion")
  ) {
    strengths.push("Hay valor real que puede convertirse en una oferta más clara, específica y vendible");
  }

  if (variables.has("cliente_ideal")) {
    strengths.push("El negocio muestra señales suficientes para redefinir mejor a quién debe atraer y a quién debe evitar");
  }

  if (
    (variables.has("contenido") || variables.has("captacion")) &&
    (variables.has("propuesta_valor") || variables.has("cliente_ideal"))
  ) {
    strengths.push("La visibilidad puede ganar impacto al conectarse con una oferta principal y un cliente más preciso");
  } else if (variables.has("contenido") || variables.has("captacion")) {
    strengths.push("La visibilidad puede ganar impacto si el contenido se conecta con una oferta y un cliente más precisos");
  }

  if (
    (variables.has("conversion") || variables.has("seguimiento")) &&
    context?.has_operational_assets
  ) {
    strengths.push("El seguimiento puede mejorar aprovechando activos ya existentes, sin tener que construir todo desde cero");
  } else if (variables.has("conversion") || variables.has("seguimiento")) {
    strengths.push("Existe margen claro para mejorar ventas sin depender únicamente de más alcance o más publicaciones");
  }

  if (patterns.length >= 7) {
    strengths.push("Los problemas detectados están conectados, lo que permite intervenir con una estrategia completa y no con acciones aisladas");
  }

  if (strengths.length < 5) {
    strengths.push("Existe una base de negocio aprovechable sobre la que construir una intervención ordenada");
  }

  return unique(strengths).slice(0, 5);
}

function buildPriorityPlan(patterns: DiagnosticPattern[]): PriorityPlanItem[] {
  const variables = getVariables(patterns);

  const priorities: Array<PriorityPlanItem & { weight: number }> = [];

  if (
    variables.has("propuesta_valor") ||
    variables.has("claridad_mensaje") ||
    variables.has("diferenciacion")
  ) {
    priorities.push({
      title: "Convertir la oferta en una propuesta principal",
      reason:
        "Porque el cliente necesita entender con rapidez qué problema se resuelve, qué resultado obtiene y por qué debería elegir esta opción frente a otras.",
      weight: 100,
    });
  }

  if (variables.has("cliente_ideal")) {
    priorities.push({
      title: "Definir cliente, problema y situación de compra",
      reason:
        "Porque una oferta débilmente segmentada obliga a explicar demasiado, atrae oportunidades desiguales y reduce la fuerza del mensaje.",
      weight: 90,
    });
  }

  if (variables.has("contenido") || variables.has("captacion")) {
    priorities.push({
      title: "Reenfocar contenido y captación hacia oportunidades reales",
      reason:
        "Porque la visibilidad solo tiene valor si atrae personas con un problema concreto, capacidad de decisión y encaje con la propuesta.",
      weight: 70,
    });
  }

  if (variables.has("conversion") || variables.has("seguimiento")) {
    priorities.push({
      title: "Estructurar seguimiento y conversión",
      reason:
        "Porque captar interés no sirve si después no existe un proceso claro para acompañar, responder objeciones y llevar al cliente hacia una decisión.",
      weight: 80,
    });
  }

  if (variables.has("sistemas") || variables.has("ia")) {
    priorities.push({
      title: "Integrar IA y sistemas en un proceso operativo simple",
      reason:
        "Porque la IA y las herramientas deben ordenar decisiones, seguimiento y ejecución; no convertirse en tareas sueltas sin impacto comercial.",
      weight: variables.has("conversion") || variables.has("seguimiento") ? 75 : 55,
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      title: "Revisar la base estratégica antes de implementar",
      reason:
        "Porque no hay suficientes señales para priorizar con seguridad. Conviene validar primero oferta, cliente ideal, mensaje y capacidad real de ejecución.",
      weight: 100,
    });
  }

  return priorities
    .sort((a, b) => b.weight - a.weight)
    .map(({ weight, ...item }) => item)
    .slice(0, 5);
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
    (variables.has("sistemas") || variables.has("ia")) ||
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
  const affectedLabels = getAffectedAreaLabels(patterns);
  const affectedText = affectedLabels.slice(0, 5).join(", ");

  const hasTechButNoStructure =
    (hasAnyVariable(patterns, ["sistemas", "ia"]) ||
      context?.has_operational_assets ||
      context?.has_ai_tools) &&
    hasAnyVariable(patterns, [
      "propuesta_valor",
      "claridad_mensaje",
      "seguimiento",
      "conversion",
    ]);

  if (recommendedPack === "Intervención Completa") {
    if (hasTechButNoStructure) {
      return "El diagnóstico muestra que existen herramientas, IA o activos operativos, pero la oferta, el mensaje y el seguimiento todavía no están alineados. Se recomienda una Intervención Completa para ordenar estrategia, captación, conversión y sistema operativo.";
    }

    return `El diagnóstico muestra problemas conectados en varias áreas críticas: ${affectedText}. Se recomienda una Intervención Completa porque actuar sobre una sola pieza dejaría bloqueos importantes sin resolver.`;
  }

  if (recommendedPack === "Intervención Sistema") {
    return "El bloqueo principal está en procesos, seguimiento, conversión, sistemas o IA. Se recomienda una Intervención Sistema para convertir herramientas y contactos en un flujo comercial más claro.";
  }

  if (recommendedPack === "Intervención Visibilidad") {
    return "El negocio necesita fortalecer claridad, posicionamiento, contenido o captación antes de escalar. Se recomienda una Intervención Visibilidad enfocada en hacer más comprensible y atractiva la propuesta.";
  }

  return "No existe evidencia diagnóstica suficiente para recomendar una intervención.";
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

  const estrategiaScore = countMatches(patterns, PACK_AREAS.estrategia);
  const visibilidadScore = countMatches(patterns, PACK_AREAS.visibilidad);
  const sistemaScore = countMatches(patterns, PACK_AREAS.sistema);

  const affectedAreas = [
    estrategiaScore > 0 ? "estrategia" : null,
    visibilidadScore > 0 ? "visibilidad" : null,
    sistemaScore > 0 ? "sistema" : null,
  ].filter(Boolean);

  const maturityLevel = buildMaturityLevel(patterns);
  const activeStrengths = buildActiveStrengths(patterns, context);
  const priorityPlan = buildPriorityPlan(patterns);
  const recommendedFocus = buildRecommendedFocus(patterns, context);

  let recommendedPack: RecommendedPack = "No apto todavía";

  if (affectedAreas.length >= 3 || patterns.length >= 8) {
    recommendedPack = "Intervención Completa";
  } else if (
    sistemaScore >= estrategiaScore &&
    sistemaScore >= visibilidadScore &&
    sistemaScore > 0
  ) {
    recommendedPack = "Intervención Sistema";
  } else if (visibilidadScore > 0 || estrategiaScore > 0) {
    recommendedPack = "Intervención Visibilidad";
  }

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