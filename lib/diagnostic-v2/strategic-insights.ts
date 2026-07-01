import type { Confidence, Severity } from "./types";

type Answers = Record<string, unknown>;

export interface StrategicInsight {
  id: string;
  title: string;
  category:
    | "business_model"
    | "captacion"
    | "conversion"
    | "seguimiento"
    | "procesos"
    | "automatizacion"
    | "liderazgo"
    | "rentabilidad"
    | "prioridades";

  severity: Severity;
  confidence: Confidence;

  summary: string;
  evidence: string[];
  interpretation: string;
  risk: string;
  opportunity: string;
  recommendation: string;
  nextAction: string;
}

interface BusinessContext {
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

  instagramActivo: boolean;
  whatsappActivo: boolean;
  sinCrm: boolean;
  sinCalendario: boolean;
  trabajaSola: boolean;
  quiereAutomatizar: boolean;
  tieneDiferencial: boolean;
  tienePropuesta: boolean;
  tieneObjeciones: boolean;
  tieneMetricas: boolean;
  seguimientoManual: boolean;
  tieneCanalesEntrada: boolean;
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

function answerIncludes(
  answers: Answers,
  keys: string[],
  terms: string[]
): boolean {
  return keys.some((key) => includesAny(readText(answers, key), terms));
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

function compactEvidence(items: string[]): string[] {
  return items.filter((item) => item.trim().length > 0);
}

function confidenceFromEvidence(evidence: string[]): Confidence {
  if (evidence.length >= 3) return "alta";
  if (evidence.length >= 2) return "media";
  return "baja";
}

function buildContext(answers: Answers): BusinessContext {
  const canalPrincipal = readText(answers, "canal_principal");
  const frenoCrecimiento = readText(answers, "freno_crecimiento");
  const objetivo6Meses = readText(answers, "objetivo_6_meses");
  const tareaConsumeTiempo = readText(answers, "tarea_consume_tiempo");
  const automatizar = readText(answers, "automatizar_simplificar");
  const propuestaFrase = readText(answers, "propuesta_frase");
  const diferencia = readText(answers, "diferenciacion");
  const objeciones = readText(answers, "objeciones");
  const contenidoFunciona = readText(answers, "contenido_funciona_mejor");
  const oportunidades = readText(answers, "donde_llegan_oportunidades");
  const herramientas = readText(answers, "herramientas_crecimiento");
  const equipo = readText(answers, "equipo");
  const ayuda = readText(answers, "tipo_ayuda");
  const metricas = readText(answers, "metricas_actuales");
  const seguimiento = readText(answers, "seguimiento_actual");

  const instagramActivo =
    hasSelected(answers, "canales_actuales", "Instagram") ||
    includesAny(canalPrincipal, ["instagram"]) ||
    includesAny(oportunidades, ["instagram"]);

  const whatsappActivo =
    hasSelected(answers, "canales_actuales", "WhatsApp") ||
    includesAny(oportunidades, ["whatsapp"]) ||
    hasSelected(answers, "donde_llegan_oportunidades", "WhatsApp");

  const sinCrm =
    !hasSelected(answers, "herramientas_crecimiento", "CRM") &&
    !includesAny(herramientas, ["crm"]);

  const sinCalendario =
    !hasSelected(
      answers,
      "herramientas_crecimiento",
      "Calendario de contenido"
    ) && !includesAny(herramientas, ["calendario"]);

  const trabajaSola = includesAny(equipo, [
    "sola",
    "solo yo",
    "trabajo sola",
    "trabajo solo",
    "yo sola",
    "yo solo",
  ]);

  const quiereAutomatizar = includesAny(automatizar, [
    "citas",
    "respuestas",
    "recordatorios",
    "seguimiento",
    "whatsapp",
    "mensajes",
    "automatizar",
  ]);

  const tieneDiferencial = diferencia.trim().length > 0;
  const tienePropuesta = propuestaFrase.trim().length > 0;
  const tieneObjeciones = objeciones.trim().length > 0;

  const tieneMetricas =
    metricas.trim().length > 0 &&
    !includesAny(metricas, ["no", "ninguna", "no mido", "no tengo"]);

  const seguimientoManual =
    seguimiento.trim().length === 0 ||
    includesAny(seguimiento, [
      "manual",
      "whatsapp",
      "cuando puedo",
      "no tengo",
      "improvisado",
      "memoria",
    ]);

  return {
    canalPrincipal,
    frenoCrecimiento,
    objetivo6Meses,
    tareaConsumeTiempo,
    automatizar,
    propuestaFrase,
    diferencia,
    objeciones,
    contenidoFunciona,
    oportunidades,
    herramientas,
    equipo,
    ayuda,
    metricas,
    seguimiento,

    instagramActivo,
    whatsappActivo,
    sinCrm,
    sinCalendario,
    trabajaSola,
    quiereAutomatizar,
    tieneDiferencial,
    tienePropuesta,
    tieneObjeciones,
    tieneMetricas,
    seguimientoManual,
    tieneCanalesEntrada: instagramActivo || whatsappActivo,
  };
}

function buildCommercialSystemInsight(ctx: BusinessContext): StrategicInsight | null {
  if (!ctx.tieneCanalesEntrada || !ctx.sinCrm) return null;

  const evidence = compactEvidence([
    ctx.canalPrincipal
      ? `El canal principal declarado es: ${ctx.canalPrincipal}.`
      : "",
    ctx.oportunidades
      ? `Las oportunidades llegan actualmente por: ${ctx.oportunidades}.`
      : "",
    ctx.herramientas
      ? `Las herramientas actuales son: ${ctx.herramientas}.`
      : "",
    ctx.tareaConsumeTiempo
      ? `La tarea que más tiempo consume es: ${ctx.tareaConsumeTiempo}.`
      : "",
    ctx.sinCrm
      ? "No aparece un CRM o sistema formal de seguimiento entre las herramientas actuales."
      : "",
  ]);

  return {
    id: "sistema_comercial_incompleto",
    title:
      "El negocio genera interés, pero la pérdida principal aparece entre el primer contacto y el seguimiento.",
    category: "conversion",
    severity: "alta",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "El problema principal no parece estar en conseguir atención inicial, sino en transformar esa atención en citas, seguimiento y recurrencia con un proceso claro.",
    evidence,
    interpretation:
      "Cuando Instagram, WhatsApp o las recomendaciones generan oportunidades, pero no existe un sistema comercial mínimo, cada contacto depende de la disponibilidad del momento. Eso hace que el negocio pueda parecer activo desde fuera, aunque internamente esté perdiendo oportunidades por falta de orden.",
    risk:
      "Aumentar contenido, publicidad o mensajes sin ordenar primero el circuito comercial puede elevar la carga de trabajo sin mejorar proporcionalmente las citas confirmadas.",
    opportunity:
      "Ordenar el recorrido desde el primer mensaje hasta la cita y el seguimiento posterior puede mejorar resultados sin necesidad de aumentar inversión.",
    recommendation:
      "Diseñar un flujo simple de conversión: entrada del contacto, respuesta inicial, clasificación, cita, recordatorio, seguimiento y recuperación.",
    nextAction:
      "Crear un sistema mínimo para Instagram y WhatsApp con estados claros: nuevo contacto, interesado, cita propuesta, cita confirmada, pendiente de respuesta y seguimiento.",
  };
}

function buildOperationalDependencyInsight(
  ctx: BusinessContext
): StrategicInsight | null {
  const hasDependencySignal =
    ctx.trabajaSola ||
    includesAny(ctx.frenoCrecimiento, [
      "depende demasiado de mí",
      "depende de mí",
      "sistema",
      "seguimiento",
      "organización",
      "organizacion",
    ]);

  if (!hasDependencySignal) return null;

  const evidence = compactEvidence([
    ctx.equipo ? `La estructura declarada es: ${ctx.equipo}.` : "",
    ctx.frenoCrecimiento
      ? `El freno percibido es: ${ctx.frenoCrecimiento}.`
      : "",
    ctx.tareaConsumeTiempo
      ? `La tarea que más tiempo consume cada semana es: ${ctx.tareaConsumeTiempo}.`
      : "",
    ctx.ayuda ? `El tipo de ayuda buscada es: ${ctx.ayuda}.` : "",
  ]);

  return {
    id: "dependencia_operativa",
    title:
      "El crecimiento está limitado por dependencia operativa, no solo por captación.",
    category: "procesos",
    severity: "alta",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "El negocio puede funcionar y tener demanda, pero todavía depende demasiado de la disponibilidad diaria de quien lo dirige.",
    evidence,
    interpretation:
      "Cuando atención, agenda, seguimiento, decisiones y ejecución recaen sobre la misma persona, crecer no siempre significa mejorar el negocio. Puede significar más presión, más interrupciones y menos capacidad para sostener calidad.",
    risk:
      "Si entra más demanda sin procesos claros, el negocio puede saturarse antes de volverse más rentable.",
    opportunity:
      "Separar tareas repetibles, seguimiento y agenda permite ganar capacidad operativa sin perder trato personalizado.",
    recommendation:
      "Documentar primero los procesos que más se repiten y decidir cuáles deben sistematizarse antes de buscar más captación.",
    nextAction:
      "Mapear gestión de citas, respuestas frecuentes, recordatorios y seguimiento posterior al servicio.",
  };
}

function buildValueCommunicationInsight(
  ctx: BusinessContext
): StrategicInsight | null {
  if (!ctx.tienePropuesta && !ctx.tieneDiferencial) return null;

  const evidence = compactEvidence([
    ctx.propuestaFrase ? `Propuesta declarada: ${ctx.propuestaFrase}.` : "",
    ctx.diferencia ? `Diferenciación declarada: ${ctx.diferencia}.` : "",
    ctx.objeciones ? `Objeciones frecuentes: ${ctx.objeciones}.` : "",
  ]);

  const hasValueSignals = includesAny(
    `${ctx.propuestaFrase} ${ctx.diferencia}`,
    [
      "higiene",
      "puntualidad",
      "trato",
      "detalle",
      "calidad",
      "confianza",
      "profesional",
      "personalizado",
      "experiencia",
    ]
  );

  if (!hasValueSignals && !ctx.tieneObjeciones) return null;

  return {
    id: "valor_no_traducido_a_mensaje",
    title:
      "El valor real del servicio existe, pero necesita expresarse mejor para no competir por precio.",
    category: "business_model",
    severity: "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "Hay elementos de valor claros, pero las objeciones indican que una parte de ese valor puede no estar suficientemente visible antes de la compra.",
    evidence,
    interpretation:
      "El cliente no siempre compra el trabajo técnico que hay detrás del servicio; compra lo que entiende. Si higiene, cuidado, puntualidad, experiencia o resultado no se comunican de forma concreta, el mercado tiende a comparar por precio o por estética superficial.",
    risk:
      "Cuando el valor no queda claro antes del contacto, la conversación comercial se desplaza hacia precio, disponibilidad o comparación con alternativas más baratas.",
    opportunity:
      "Convertir los diferenciales reales en mensajes visibles puede atraer mejores clientas, elevar percepción de valor y reducir objeciones.",
    recommendation:
      "Reformular la comunicación para explicar el estándar profesional del servicio, no solo mostrar el resultado final.",
    nextAction:
      "Crear tres mensajes base: confianza, resultado y experiencia. Cada mensaje debe explicar por qué el servicio vale lo que vale.",
  };
}

function buildEditorialSystemInsight(ctx: BusinessContext): StrategicInsight | null {
  if (!ctx.sinCalendario || ctx.contenidoFunciona.trim().length === 0) {
    return null;
  }

  const evidence = compactEvidence([
    ctx.contenidoFunciona
      ? `El contenido que mejor funciona es: ${ctx.contenidoFunciona}.`
      : "",
    "No aparece un calendario de contenido entre las herramientas actuales.",
  ]);

  return {
    id: "contenido_sin_sistema_editorial",
    title:
      "El contenido funciona de forma puntual, pero todavía no opera como un sistema de captación.",
    category: "captacion",
    severity: "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "El negocio identifica qué contenidos generan respuesta, pero no parece haber una estructura para repetirlos con intención comercial.",
    evidence,
    interpretation:
      "Saber qué formato funciona es una ventaja, pero no equivale a tener un sistema. Un sistema editorial debe atraer, demostrar valor, reducir dudas y activar la cita de forma repetible.",
    risk:
      "Publicar solo cuando hay tiempo mantiene la captación atada al esfuerzo del momento y dificulta prever resultados.",
    opportunity:
      "Convertir los formatos que ya funcionan en una secuencia semanal puede mejorar captación sin cambiar radicalmente la marca.",
    recommendation:
      "Construir una rutina simple con tres tipos de contenido: prueba visual, explicación de valor y respuesta a objeciones.",
    nextAction:
      "Planificar dos semanas de contenido con 6 piezas: 2 antes/después, 2 procesos explicados y 2 respuestas a dudas frecuentes.",
  };
}

function buildAutomationInsight(ctx: BusinessContext): StrategicInsight | null {
  const hasAutomationSignal =
    ctx.quiereAutomatizar ||
    answerIncludes(
      {},
      [],
      []
    ) ||
    includesAny(ctx.tareaConsumeTiempo, [
      "responder",
      "mensajes",
      "citas",
      "recordatorios",
      "seguimiento",
    ]);

  if (!hasAutomationSignal) return null;

  const evidence = compactEvidence([
    ctx.automatizar ? `Automatización deseada: ${ctx.automatizar}.` : "",
    ctx.tareaConsumeTiempo
      ? `La tarea que más tiempo consume es: ${ctx.tareaConsumeTiempo}.`
      : "",
    ctx.herramientas ? `Herramientas actuales: ${ctx.herramientas}.` : "",
    ctx.sinCrm
      ? "No aparece una base operativa formal sobre la que automatizar."
      : "",
  ]);

  return {
    id: "automatizacion_ligera_con_base_operativa",
    title:
      "La automatización puede aportar valor, pero debe empezar por tareas simples conectadas con citas y seguimiento.",
    category: "automatizacion",
    severity: ctx.sinCrm ? "alta" : "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "El negocio no necesita automatización compleja; necesita reducir repetición, evitar olvidos y ordenar oportunidades.",
    evidence,
    interpretation:
      "La automatización solo es útil si mejora un proceso claro. Si se introduce antes de ordenar respuestas, citas y seguimiento, puede añadir complejidad sin resolver el problema principal.",
    risk:
      "Automatizar sin proceso previo puede crear una falsa sensación de control y hacer más rápido un seguimiento todavía desordenado.",
    opportunity:
      "Un flujo básico de WhatsApp, recordatorios y seguimiento puede liberar tiempo y mejorar la conversión sin perder tono humano.",
    recommendation:
      "Empezar con automatización ligera: preguntas frecuentes, confirmaciones, recordatorios y seguimiento posterior.",
    nextAction:
      "Definir las 10 preguntas frecuentes, los estados principales de una cita y los mensajes de seguimiento que se repiten cada semana.",
  };
}

function buildProfitabilityInsight(ctx: BusinessContext): StrategicInsight | null {
  const profitabilitySignal =
    includesAny(ctx.objetivo6Meses, [
      "facturación",
      "facturacion",
      "más clientas",
      "agenda",
      "ticket",
      "rentables",
      "rentabilidad",
      "ingresos",
    ]) ||
    includesAny(ctx.frenoCrecimiento, [
      "rentables",
      "facturación",
      "facturacion",
      "servicios",
      "precio",
      "margen",
    ]);

  if (!profitabilitySignal) return null;

  const evidence = compactEvidence([
    ctx.objetivo6Meses
      ? `Objetivo declarado a seis meses: ${ctx.objetivo6Meses}.`
      : "",
    ctx.frenoCrecimiento
      ? `Freno percibido: ${ctx.frenoCrecimiento}.`
      : "",
  ]);

  return {
    id: "crecimiento_debe_medir_rentabilidad",
    title:
      "El crecimiento debe medirse por rentabilidad y calidad de demanda, no solo por más citas.",
    category: "rentabilidad",
    severity: "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "Más volumen no garantiza mejor negocio si los servicios, tiempos, precios y recurrencia no están ordenados.",
    evidence,
    interpretation:
      "En un negocio de servicios, crecer no puede significar únicamente llenar más horas. La mejora real aparece cuando se identifican servicios de mayor margen, clientas más adecuadas y una agenda mejor estructurada.",
    risk:
      "Llenar agenda con servicios poco rentables puede generar más trabajo sin mejorar el beneficio real.",
    opportunity:
      "Ordenar servicios, precios y recurrencia puede aumentar ingresos sin depender solo de captar clientas nuevas.",
    recommendation:
      "Analizar qué servicios dejan más margen, cuáles fidelizan mejor y cuáles consumen demasiado tiempo para el retorno que generan.",
    nextAction:
      "Crear una tabla con servicio, precio, duración, frecuencia de repetición y margen estimado.",
  };
}

function buildDirectionInsight(ctx: BusinessContext): StrategicInsight | null {
  if (ctx.tieneMetricas) return null;

  const evidence = compactEvidence([
    ctx.metricas ? `Métricas declaradas: ${ctx.metricas}.` : "",
    ctx.objetivo6Meses ? `Objetivo a seis meses: ${ctx.objetivo6Meses}.` : "",
    ctx.frenoCrecimiento ? `Freno percibido: ${ctx.frenoCrecimiento}.` : "",
  ]);

  return {
    id: "decision_sin_metricas_suficientes",
    title:
      "La dirección del negocio necesita apoyarse en métricas simples, no solo en percepción o carga de trabajo.",
    category: "prioridades",
    severity: "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "Hay objetivos y frenos identificados, pero no aparecen suficientes métricas para priorizar con precisión.",
    evidence,
    interpretation:
      "Cuando las decisiones se toman principalmente por sensación, urgencia o volumen de trabajo, es fácil confundir síntomas con causas. Medir pocas variables bien elegidas permite saber si el problema está en captación, conversión, seguimiento, precio o capacidad.",
    risk:
      "Sin métricas mínimas, cualquier acción puede parecer razonable y el negocio puede invertir tiempo en mejoras que no atacan el cuello de botella real.",
    opportunity:
      "Medir pocos indicadores permite tomar mejores decisiones sin complicar la gestión.",
    recommendation:
      "Definir un cuadro mínimo con oportunidades recibidas, citas confirmadas, citas realizadas, clientas recurrentes y servicio más rentable.",
    nextAction:
      "Registrar durante 30 días cinco datos: contactos nuevos, citas propuestas, citas confirmadas, servicios realizados y ticket medio.",
  };
}

function buildFallbackInsight(ctx: BusinessContext): StrategicInsight {
  const evidence = compactEvidence([
    ctx.frenoCrecimiento ? `Freno declarado: ${ctx.frenoCrecimiento}.` : "",
    ctx.objetivo6Meses ? `Objetivo a seis meses: ${ctx.objetivo6Meses}.` : "",
    ctx.ayuda ? `Ayuda buscada: ${ctx.ayuda}.` : "",
  ]);

  return {
    id: "prioridades_antes_de_nuevas_acciones",
    title:
      "Antes de sumar nuevas acciones, conviene ordenar qué parte del negocio necesita atención primero.",
    category: "prioridades",
    severity: "media",
    confidence: confidenceFromEvidence(evidence),
    summary:
      "No aparece una causa única dominante, pero sí señales suficientes para trabajar con más foco y menos improvisación.",
    evidence,
    interpretation:
      "Cuando un negocio tiene varios puntos abiertos, el error no suele ser hacer poco, sino actuar sin una jerarquía clara. El diagnóstico debe convertir información dispersa en prioridades concretas.",
    risk:
      "Abrir demasiados frentes a la vez puede dispersar energía, presupuesto y atención.",
    opportunity:
      "Una secuencia clara permite mejorar el negocio sin depender de más esfuerzo ni de más herramientas.",
    recommendation:
      "Definir tres prioridades principales y dejar el resto como acciones secundarias.",
    nextAction:
      "Separar las mejoras posibles en tres grupos: inmediato, próximo mes y después de validar resultados.",
  };
}

function sortInsights(insights: StrategicInsight[]): StrategicInsight[] {
  const severityWeight: Record<Severity, number> = {
    critica: 4,
    alta: 3,
    media: 2,
    baja: 1,
  };

  const categoryWeight: Record<StrategicInsight["category"], number> = {
    conversion: 9,
    seguimiento: 8,
    procesos: 7,
    automatizacion: 6,
    captacion: 5,
    business_model: 4,
    rentabilidad: 3,
    prioridades: 2,
    liderazgo: 1,
  };

  return [...insights].sort((a, b) => {
    const severityDiff = severityWeight[b.severity] - severityWeight[a.severity];

    if (severityDiff !== 0) return severityDiff;

    return categoryWeight[b.category] - categoryWeight[a.category];
  });
}

export function buildStrategicInsights(answers: Answers): StrategicInsight[] {
  const ctx = buildContext(answers);

  const insights = compactEvidence([])
    .concat([])
    .map(() => null) as unknown as StrategicInsight[];

  const candidates: Array<StrategicInsight | null> = [
    buildCommercialSystemInsight(ctx),
    buildOperationalDependencyInsight(ctx),
    buildValueCommunicationInsight(ctx),
    buildEditorialSystemInsight(ctx),
    buildAutomationInsight(ctx),
    buildProfitabilityInsight(ctx),
    buildDirectionInsight(ctx),
  ];

  candidates.forEach((candidate) => {
    if (candidate) insights.push(candidate);
  });

  if (insights.length === 0) {
    insights.push(buildFallbackInsight(ctx));
  }

  return sortInsights(insights).slice(0, 6);
}