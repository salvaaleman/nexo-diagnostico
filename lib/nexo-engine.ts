export type NexoArea =
  | "captacion"
  | "oferta"
  | "seguimiento_conversion"
  | "contenido_comunicacion"
  | "presencia_digital"
  | "cliente_ideal"
  | "marca_posicionamiento"
  | "operaciones_recursos"
  | "tecnologia_automatizacion";

export type NexoPack =
  | "PLUS Captación y Mensaje"
  | "NEXO Esencial"
  | "PLUS Seguimiento y Proceso Comercial"
  | "Creación de Contenidos Base"
  | "Creación de Contenidos Pro"
  | "Auditoría Estratégica de Redes Sociales"
  | "Optimización Estratégica de Perfil"
  | "NEXO Estratégico"
  | "NEXO Implementación"
  | "PLUS Automatización Estratégica"
  | "Sin recomendación directa";

export type NexoReviewType =
  | "oferta"
  | "redes_sociales"
  | "perfil_digital"
  | "mensaje"
  | "captacion"
  | "automatizacion";

export interface NexoSignal {
  label: string;
  source: string;
  evidence: string;
}

export interface NexoCard {
  id: string;
  title: string;
  area: NexoArea;
  weight: 8 | 9;
  idea: string;
  dashboardText: string;
  risk: string;
  strongSignals: NexoSignal[];
  supportSignals: NexoSignal[];
  isActive: boolean;
  requiresHumanReview: boolean;
  reviewType?: NexoReviewType;
  possiblePacks: NexoPack[];
}

export interface NexoEngineResult {
  activeCards: NexoCard[];
  reviewRequired: NexoCard[];
  recommendedPack: NexoPack;
  recommendationReason: string;
}

export type Answers = Record<string, unknown>;

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function hasText(answers: Answers, key: string): boolean {
  return asText(answers[key]).length > 0;
}

function includesAny(value: unknown, terms: string[]): boolean {
  const text = asText(value).toLowerCase();
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function arrayIncludesAny(value: unknown, terms: string[]): boolean {
  const arr = asArray(value).map((item) => item.toLowerCase());
  return terms.some((term) =>
    arr.some((item) => item.includes(term.toLowerCase()))
  );
}

function hasAsset(answers: Answers, asset: string): boolean {
  return arrayIncludesAny(answers.assets, [asset]);
}

function countSignals(signals: NexoSignal[]): number {
  return signals.length;
}

function isActiveMinimum(
  strongSignals: NexoSignal[],
  supportSignals: NexoSignal[]
): boolean {
  return countSignals(strongSignals) >= 2 && countSignals(supportSignals) >= 1;
}

function isActiveStrict(
  strongSignals: NexoSignal[],
  supportSignals: NexoSignal[]
): boolean {
  return (
    (countSignals(strongSignals) >= 3 && countSignals(supportSignals) >= 1) ||
    (countSignals(strongSignals) >= 2 && countSignals(supportSignals) >= 2)
  );
}

function createSignal(
  label: string,
  source: string,
  evidence: string
): NexoSignal {
  return { label, source, evidence };
}

function evaluateDependenciaRecomendaciones(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (arrayIncludesAny(answers.b6_origen_oportunidades, ["Recomendación"])) {
    strongSignals.push(
      createSignal(
        "Las oportunidades llegan principalmente por recomendación.",
        "b6_origen_oportunidades",
        asText(answers.b6_origen_oportunidades)
      )
    );
  }

  if (asText(answers.canal_principal) === "Ninguno claro") {
    strongSignals.push(
      createSignal(
        "No existe un canal principal claramente definido.",
        "canal_principal",
        asText(answers.canal_principal)
      )
    );
  }

  const hasCaptureMechanism =
    hasAsset(answers, "WhatsApp Business") ||
    hasAsset(answers, "Web") ||
    hasAsset(answers, "Landing page") ||
    hasAsset(answers, "Lead magnet") ||
    hasAsset(answers, "Base de datos");

  if (!hasCaptureMechanism || hasAsset(answers, "Ninguno")) {
    strongSignals.push(
      createSignal(
        "No se observan mecanismos claros de captación.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (
    includesAny(answers.b6_contenido_mejor, [
      "no sé",
      "no lo sé",
      "no mido",
      "no tengo claro",
      "nunca lo he analizado",
    ])
  ) {
    supportSignals.push(
      createSignal(
        "No identifica qué contenido funciona mejor.",
        "b6_contenido_mejor",
        asText(answers.b6_contenido_mejor)
      )
    );
  }

  const channels = asArray(answers.b6_canales);
  if (channels.length <= 1) {
    supportSignals.push(
      createSignal(
        "Presencia digital limitada o pocos canales activos.",
        "b6_canales",
        asText(answers.b6_canales)
      )
    );
  }

  if (!hasAsset(answers, "Calendario de contenido")) {
    supportSignals.push(
      createSignal(
        "No existe calendario de contenido como apoyo a la captación.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  return {
    id: "dependencia_recomendaciones",
    title: "Dependencia excesiva de recomendaciones",
    area: "captacion",
    weight: 9,
    idea: "El negocio depende demasiado de recomendaciones, contactos previos o boca a boca.",
    dashboardText:
      "La mayor parte de las oportunidades parecen depender de recomendaciones o contactos previos, sin un sistema claro para generar nuevas oportunidades de forma constante.",
    risk: "Si disminuye el flujo de recomendaciones, el crecimiento puede ralentizarse sin una fuente alternativa de captación.",
    strongSignals,
    supportSignals,
    isActive: isActiveMinimum(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: ["PLUS Captación y Mensaje", "NEXO Estratégico"],
  };
}

function evaluatePropuestaDificil(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (hasText(answers, "b3_confusion")) {
    strongSignals.push(
      createSignal(
        "El cliente reconoce que alguna parte de su propuesta genera confusión.",
        "b3_confusion",
        asText(answers.b3_confusion)
      )
    );
  }

  if (
    includesAny(answers.b3_que_vendes, [
      "varias cosas",
      "muchas cosas",
      "depende",
      "de todo",
      "un poco de todo",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "La explicación de lo que vende puede resultar demasiado amplia o poco concreta.",
        "b3_que_vendes",
        asText(answers.b3_que_vendes)
      )
    );
  }

  if (
    includesAny(answers.b3_propuesta_frase, [
      "ayudo",
      "acompaño",
      "mejorar",
      "crecer",
      "soluciones",
    ]) &&
    asText(answers.b3_propuesta_frase).length < 180
  ) {
    supportSignals.push(
      createSignal(
        "La frase resumen puede sonar genérica y requerir revisión.",
        "b3_propuesta_frase",
        asText(answers.b3_propuesta_frase)
      )
    );
  }

  if (
    includesAny(answers.b3_por_que_ti, [
      "profesional",
      "trabajo bien",
      "me implico",
      "calidad",
      "precio",
      "calidad/precio",
      "experiencia",
    ])
  ) {
    supportSignals.push(
      createSignal(
        "La razón para elegirle se apoya en argumentos genéricos.",
        "b3_por_que_ti",
        asText(answers.b3_por_que_ti)
      )
    );
  }

  if (
    includesAny(answers.b3_resultado, [
      "mejorar",
      "crecer",
      "más visibilidad",
      "resultados",
      "depende",
    ])
  ) {
    supportSignals.push(
      createSignal(
        "El resultado prometido necesita mayor concreción.",
        "b3_resultado",
        asText(answers.b3_resultado)
      )
    );
  }

  const activeBySignals = isActiveMinimum(strongSignals, supportSignals);

  return {
    id: "propuesta_dificil_entender",
    title: "Propuesta difícil de entender",
    area: "oferta",
    weight: 9,
    idea: "La gente no termina de entender lo que haces o lo que vendes.",
    dashboardText:
      "Tu propuesta parece necesitar demasiadas explicaciones para que una persona entienda qué haces, qué vendes y qué resultado puede obtener contigo.",
    risk: "Si la gente no entiende rápido lo que vendes, muchas oportunidades se pierden antes de llegar a una conversación real.",
    strongSignals,
    supportSignals,
    isActive: activeBySignals,
    requiresHumanReview: activeBySignals,
    reviewType: "oferta",
    possiblePacks: ["NEXO Esencial", "NEXO Estratégico"],
  };
}

function evaluateSeguimientoInconsistente(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  const hasTrackingSystem =
    hasAsset(answers, "CRM") || hasAsset(answers, "Base de datos");

  if (!hasTrackingSystem) {
    strongSignals.push(
      createSignal(
        "No se detecta CRM, base de datos o sistema claro de seguimiento.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (
    includesAny(answers.b9_tarea_delegaria, [
      "seguimiento",
      "mensajes",
      "clientes",
      "contactos",
      "whatsapp",
      "responder",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "El cliente delegaría tareas relacionadas con seguimiento o gestión de contactos.",
        "b9_tarea_delegaria",
        asText(answers.b9_tarea_delegaria)
      )
    );
  }

  if (
    includesAny(answers.b9_procesos_automatizar, [
      "seguimiento",
      "mensajes",
      "clientes",
      "contactos",
      "whatsapp",
      "responder",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "El cliente quiere automatizar o simplificar seguimiento, mensajes o gestión de clientes.",
        "b9_procesos_automatizar",
        asText(answers.b9_procesos_automatizar)
      )
    );
  }

  if (asText(answers.equipo) === "Solo") {
    supportSignals.push(
      createSignal(
        "La ejecución depende principalmente de una sola persona.",
        "equipo",
        asText(answers.equipo)
      )
    );
  }

  if (
    asText(answers.tiempo_semanal) === "Menos de 1h" ||
    asText(answers.tiempo_semanal) === "1–3h"
  ) {
    supportSignals.push(
      createSignal(
        "Dispone de poco tiempo semanal para mejorar el sistema.",
        "tiempo_semanal",
        asText(answers.tiempo_semanal)
      )
    );
  }

  if (arrayIncludesAny(answers.b6_origen_oportunidades, ["WhatsApp"])) {
    supportSignals.push(
      createSignal(
        "Las oportunidades llegan por WhatsApp, lo que requiere seguimiento claro.",
        "b6_origen_oportunidades",
        asText(answers.b6_origen_oportunidades)
      )
    );
  }

  return {
    id: "seguimiento_inconsistente",
    title: "Seguimiento inconsistente",
    area: "seguimiento_conversion",
    weight: 9,
    idea: "Las oportunidades existen, pero no parece haber un sistema constante para hacer seguimiento.",
    dashboardText:
      "Parte de las oportunidades pueden estar perdiéndose porque el seguimiento depende demasiado de la memoria, el momento o la improvisación.",
    risk: "Cuando no existe un sistema claro de seguimiento, muchas oportunidades terminan enfriándose antes de tomar una decisión.",
    strongSignals,
    supportSignals,
    isActive: isActiveMinimum(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "PLUS Seguimiento y Proceso Comercial",
      "NEXO Estratégico",
      "PLUS Automatización Estratégica",
    ],
  };
}

function evaluateContenidoSinSistema(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (hasText(answers, "b7_temas_comunicar")) {
    const text = asText(answers.b7_temas_comunicar);
    if (
      includesAny(text, [
        "no sé",
        "no lo sé",
        "no tengo claro",
        "me cuesta",
        "no estoy seguro",
      ])
    ) {
      strongSignals.push(
        createSignal(
          "No sabe qué temas comunicar.",
          "b7_temas_comunicar",
          text
        )
      );
    }
  }

  if (hasText(answers, "b7_temas_cuesta")) {
    strongSignals.push(
      createSignal(
        "Le cuesta comunicar temas importantes.",
        "b7_temas_cuesta",
        asText(answers.b7_temas_cuesta)
      )
    );
  }

  if (
    includesAny(answers.b6_contenido_mejor, [
      "no sé",
      "no lo sé",
      "no mido",
      "no tengo claro",
      "nunca lo he analizado",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "No sabe qué contenido ha funcionado mejor.",
        "b6_contenido_mejor",
        asText(answers.b6_contenido_mejor)
      )
    );
  }

  if (!hasAsset(answers, "Calendario de contenido")) {
    strongSignals.push(
      createSignal(
        "No tiene calendario de contenido.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (
    includesAny(answers.b7_impide_publicar, [
      "tiempo",
      "planificación",
      "planificacion",
      "ideas",
      "constancia",
      "organización",
      "organizacion",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "Publica sin planificación estable o con dificultad de organización.",
        "b7_impide_publicar",
        asText(answers.b7_impide_publicar)
      )
    );
  }

  if (!arrayIncludesAny(answers.b6_origen_oportunidades, ["Instagram", "Facebook", "TikTok", "LinkedIn"])) {
    supportSignals.push(
      createSignal(
        "Las oportunidades no parecen llegar desde redes sociales.",
        "b6_origen_oportunidades",
        asText(answers.b6_origen_oportunidades)
      )
    );
  }

  if (asArray(answers.b6_canales).length > 0 && !hasText(answers, "b6_contenido_mejor")) {
    supportSignals.push(
      createSignal(
        "Existe presencia digital, pero no hay lectura clara del contenido.",
        "b6_canales",
        asText(answers.b6_canales)
      )
    );
  }

  if (!hasAsset(answers, "Calendario de contenido")) {
    supportSignals.push(
      createSignal(
        "No se detecta plan mensual, calendario o sistema editorial.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  return {
    id: "contenido_sin_sistema",
    title: "Contenido sin sistema comercial",
    area: "contenido_comunicacion",
    weight: 8,
    idea: "El contenido existe, pero no parece estar conectado a una estrategia clara para generar confianza, conversaciones u oportunidades.",
    dashboardText:
      "El contenido puede estar generando actividad, pero no parece estar trabajando de forma consistente para apoyar el crecimiento del negocio.",
    risk: "Publicar sin una dirección clara puede consumir tiempo y esfuerzo sin traducirse en oportunidades reales.",
    strongSignals,
    supportSignals,
    isActive: isActiveStrict(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "Creación de Contenidos Base",
      "Creación de Contenidos Pro",
      "PLUS Captación y Mensaje",
      "NEXO Estratégico",
    ],
  };
}

function evaluatePerfilDigital(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (asText(answers.b6_perfil_transmite) === "No") {
    strongSignals.push(
      createSignal(
        "El cliente declara que su perfil no transmite lo que quiere transmitir.",
        "b6_perfil_transmite",
        asText(answers.b6_perfil_transmite)
      )
    );
  }

  if (asText(answers.b6_perfil_transmite) === "No estoy seguro") {
    strongSignals.push(
      createSignal(
        "El cliente duda de si su perfil transmite correctamente.",
        "b6_perfil_transmite",
        asText(answers.b6_perfil_transmite)
      )
    );
  }

  if (
    hasText(answers, "b5_percepcion_deseada") &&
    hasText(answers, "b5_percepcion_actual")
  ) {
    strongSignals.push(
      createSignal(
        "Existe diferencia entre cómo quiere ser percibido y cómo cree que se percibe actualmente.",
        "b5_percepcion_deseada / b5_percepcion_actual",
        `${asText(answers.b5_percepcion_deseada)} / ${asText(
          answers.b5_percepcion_actual
        )}`
      )
    );
  }

  if (!hasAsset(answers, "Logo") || !hasAsset(answers, "Colores definidos")) {
    supportSignals.push(
      createSignal(
        "No se detectan elementos básicos de identidad visual.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (!arrayIncludesAny(answers.b6_origen_oportunidades, ["Instagram", "Facebook"])) {
    supportSignals.push(
      createSignal(
        "Las oportunidades no llegan desde Instagram o Facebook.",
        "b6_origen_oportunidades",
        asText(answers.b6_origen_oportunidades)
      )
    );
  }

  const active = countSignals(strongSignals) >= 2;

  return {
    id: "perfil_digital_poco_alineado",
    title: "Perfil digital poco alineado",
    area: "presencia_digital",
    weight: 8,
    idea: "Lo que transmite tu presencia digital no parece estar alineado con lo que realmente quieres comunicar.",
    dashboardText:
      "Tu presencia digital puede estar generando una percepción diferente a la que deseas transmitir a posibles clientes.",
    risk: "Cuando el perfil no comunica correctamente quién eres, qué haces o para quién trabajas, muchas personas pierden interés antes de iniciar una conversación.",
    strongSignals,
    supportSignals,
    isActive: active,
    requiresHumanReview: active,
    reviewType: "redes_sociales",
    possiblePacks: [
      "Auditoría Estratégica de Redes Sociales",
      "Optimización Estratégica de Perfil",
      "PLUS Captación y Mensaje",
      "NEXO Estratégico",
    ],
  };
}

function evaluateClienteIdeal(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (
    includesAny(answers.b2_persona_ideal, [
      "todo el mundo",
      "cualquiera",
      "empresas",
      "emprendedores",
      "personas",
      "depende",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "La descripción del cliente ideal es demasiado amplia o genérica.",
        "b2_persona_ideal",
        asText(answers.b2_persona_ideal)
      )
    );
  }

  if (
    !hasText(answers, "b2_problema") ||
    includesAny(answers.b2_problema, ["no sé", "no lo sé", "depende"])
  ) {
    strongSignals.push(
      createSignal(
        "No identifica con claridad el problema del cliente ideal.",
        "b2_problema",
        asText(answers.b2_problema)
      )
    );
  }

  if (
    !hasText(answers, "b2_deseo") ||
    includesAny(answers.b2_deseo, ["no sé", "no lo sé", "depende"])
  ) {
    strongSignals.push(
      createSignal(
        "No define claramente qué desea conseguir su cliente ideal.",
        "b2_deseo",
        asText(answers.b2_deseo)
      )
    );
  }

  if (
    !hasText(answers, "b2_objeciones") ||
    includesAny(answers.b2_objeciones, ["no sé", "no lo sé", "ninguna"])
  ) {
    strongSignals.push(
      createSignal(
        "No identifica objeciones habituales del cliente ideal.",
        "b2_objeciones",
        asText(answers.b2_objeciones)
      )
    );
  }

  if (
    includesAny(answers.b7_temas_comunicar, [
      "no sé",
      "no lo sé",
      "no tengo claro",
    ])
  ) {
    supportSignals.push(
      createSignal(
        "No sabe qué temas comunicar.",
        "b7_temas_comunicar",
        asText(answers.b7_temas_comunicar)
      )
    );
  }

  if (hasText(answers, "b3_confusion")) {
    supportSignals.push(
      createSignal(
        "La propuesta también presenta confusión.",
        "b3_confusion",
        asText(answers.b3_confusion)
      )
    );
  }

  if (
    !hasText(answers, "b2_cliente_no") ||
    includesAny(answers.b2_cliente_no, ["no sé", "no lo sé", "ninguno"])
  ) {
    supportSignals.push(
      createSignal(
        "No tiene claro qué cliente no quiere atraer.",
        "b2_cliente_no",
        asText(answers.b2_cliente_no)
      )
    );
  }

  return {
    id: "cliente_ideal_poco_definido",
    title: "Cliente ideal poco definido",
    area: "cliente_ideal",
    weight: 9,
    idea: "No parece existir una definición suficientemente clara de la persona que realmente quieres atraer.",
    dashboardText:
      "Parte de las dificultades para comunicar, captar o vender pueden estar relacionadas con una definición poco precisa del cliente ideal.",
    risk: "Cuando intentas comunicar para todo el mundo, normalmente terminas conectando con muy pocas personas.",
    strongSignals,
    supportSignals,
    isActive: isActiveStrict(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "NEXO Estratégico",
      "NEXO Esencial",
      "PLUS Captación y Mensaje",
    ],
  };
}

function evaluateDiferenciacion(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (
    !hasText(answers, "b3_diferenciacion") ||
    includesAny(answers.b3_diferenciacion, [
      "profesional",
      "calidad",
      "precio",
      "calidad/precio",
      "experiencia",
      "trato",
      "cercanía",
      "cercania",
      "me implico",
      "trabajo bien",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "La diferenciación declarada es débil o genérica.",
        "b3_diferenciacion",
        asText(answers.b3_diferenciacion)
      )
    );
  }

  if (
    includesAny(answers.b3_por_que_ti, [
      "profesional",
      "calidad",
      "precio",
      "calidad/precio",
      "experiencia",
      "trato",
      "cercanía",
      "cercania",
      "me implico",
      "trabajo bien",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "La razón para elegirle se apoya en argumentos comunes.",
        "b3_por_que_ti",
        asText(answers.b3_por_que_ti)
      )
    );
  }

  if (
    includesAny(answers.b3_propuesta_frase, [
      "calidad",
      "precio",
      "soluciones",
      "servicios",
      "profesional",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "La frase resumen puede parecer similar a la de otros competidores.",
        "b3_propuesta_frase",
        asText(answers.b3_propuesta_frase)
      )
    );
  }

  if (
    includesAny(answers.b5_percepcion_deseada, ["premium", "experto", "profesional"]) &&
    includesAny(answers.b3_por_que_ti, ["precio", "calidad/precio"])
  ) {
    supportSignals.push(
      createSignal(
        "Quiere una percepción fuerte, pero comunica desde precio o argumentos genéricos.",
        "b5_percepcion_deseada / b3_por_que_ti",
        `${asText(answers.b5_percepcion_deseada)} / ${asText(
          answers.b3_por_que_ti
        )}`
      )
    );
  }

  if (hasText(answers, "b3_confusion")) {
    supportSignals.push(
      createSignal(
        "La propuesta también genera confusión.",
        "b3_confusion",
        asText(answers.b3_confusion)
      )
    );
  }

  return {
    id: "falta_diferenciacion_clara",
    title: "Falta de diferenciación clara",
    area: "marca_posicionamiento",
    weight: 9,
    idea: "No parece existir una razón suficientemente clara para que un cliente te elija frente a otras alternativas.",
    dashboardText:
      "Tu propuesta puede estar compitiendo en un mercado donde las diferencias no resultan suficientemente visibles para el cliente.",
    risk: "Cuando la diferenciación no es clara, el precio suele convertirse en el principal criterio de decisión.",
    strongSignals,
    supportSignals,
    isActive: isActiveStrict(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "NEXO Estratégico",
      "NEXO Esencial",
      "PLUS Captación y Mensaje",
    ],
  };
}

function evaluateOperacionDependiente(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (asText(answers.equipo) === "Solo") {
    strongSignals.push(
      createSignal(
        "Trabaja solo.",
        "equipo",
        asText(answers.equipo)
      )
    );
  }

  if (
    asText(answers.tiempo_semanal) === "Menos de 1h" ||
    asText(answers.tiempo_semanal) === "1–3h"
  ) {
    strongSignals.push(
      createSignal(
        "Dispone de menos de 3 horas semanales para mejorar.",
        "tiempo_semanal",
        asText(answers.tiempo_semanal)
      )
    );
  }

  if (hasText(answers, "b9_tarea_consume")) {
    strongSignals.push(
      createSignal(
        "Existe una tarea que consume mucho tiempo semanal.",
        "b9_tarea_consume",
        asText(answers.b9_tarea_consume)
      )
    );
  }

  if (hasText(answers, "b9_tarea_delegaria")) {
    strongSignals.push(
      createSignal(
        "Quiere delegar una tarea operativa del día a día.",
        "b9_tarea_delegaria",
        asText(answers.b9_tarea_delegaria)
      )
    );
  }

  if (asText(answers.tipo_ayuda) === "Que me lo monten") {
    strongSignals.push(
      createSignal(
        "Busca que le monten parte del sistema.",
        "tipo_ayuda",
        asText(answers.tipo_ayuda)
      )
    );
  }

  if (!hasAsset(answers, "CRM") || !hasAsset(answers, "Calendario de contenido")) {
    supportSignals.push(
      createSignal(
        "No se detectan sistemas organizativos suficientes.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (
    includesAny(answers.b11_cambios, [
      "me cuesta cambiar",
      "me cuesta",
      "falta de tiempo",
    ])
  ) {
    supportSignals.push(
      createSignal(
        "Declara dificultad para cambiar procesos actuales.",
        "b11_cambios",
        asText(answers.b11_cambios)
      )
    );
  }

  return {
    id: "operacion_dependiente_persona",
    title: "Operación dependiente de la persona",
    area: "operaciones_recursos",
    weight: 8,
    idea: "El negocio depende demasiado de la persona que lo dirige para avanzar, responder, vender o ejecutar.",
    dashboardText:
      "Gran parte del funcionamiento parece depender directamente de tu tiempo, tu memoria o tu intervención diaria.",
    risk: "Si todo depende de una sola persona, el crecimiento se vuelve difícil de sostener y cualquier mejora compite con la operación diaria.",
    strongSignals,
    supportSignals,
    isActive: isActiveStrict(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "NEXO Estratégico",
      "NEXO Implementación",
      "PLUS Seguimiento y Proceso Comercial",
      "PLUS Automatización Estratégica",
    ],
  };
}

function evaluateAutomatizacionPrematura(answers: Answers): NexoCard {
  const strongSignals: NexoSignal[] = [];
  const supportSignals: NexoSignal[] = [];

  if (hasText(answers, "b9_procesos_automatizar")) {
    strongSignals.push(
      createSignal(
        "Quiere automatizar o simplificar partes del negocio.",
        "b9_procesos_automatizar",
        asText(answers.b9_procesos_automatizar)
      )
    );
  }

  if (hasText(answers, "b9_tarea_delegaria")) {
    strongSignals.push(
      createSignal(
        "Quiere delegar tareas que podrían requerir estructura previa.",
        "b9_tarea_delegaria",
        asText(answers.b9_tarea_delegaria)
      )
    );
  }

  if (
    arrayIncludesAny(answers.b9_herramientas, [
      "Zapier",
      "Make",
      "GoHighLevel",
      "ChatGPT",
      "Claude",
      "Gemini",
    ])
  ) {
    strongSignals.push(
      createSignal(
        "Utiliza o considera herramientas tecnológicas.",
        "b9_herramientas",
        asText(answers.b9_herramientas)
      )
    );
  }

  if (hasText(answers, "b3_confusion")) {
    supportSignals.push(
      createSignal(
        "La propuesta todavía genera confusión.",
        "b3_confusion",
        asText(answers.b3_confusion)
      )
    );
  }

  if (!hasAsset(answers, "CRM")) {
    supportSignals.push(
      createSignal(
        "No se detecta CRM como base mínima de seguimiento.",
        "assets",
        asText(answers.assets)
      )
    );
  }

  if (asText(answers.canal_principal) === "Ninguno claro") {
    supportSignals.push(
      createSignal(
        "No existe canal principal claro.",
        "canal_principal",
        asText(answers.canal_principal)
      )
    );
  }

  return {
    id: "automatizacion_prematura",
    title: "Automatización prematura",
    area: "tecnologia_automatizacion",
    weight: 8,
    idea: "Existe interés por automatizar procesos que todavía no parecen estar suficientemente definidos o estructurados.",
    dashboardText:
      "Antes de automatizar, es importante asegurarse de que los procesos, mensajes y prioridades estén suficientemente claros.",
    risk: "Automatizar un proceso confuso no suele resolver el problema; normalmente lo acelera.",
    strongSignals,
    supportSignals,
    isActive: isActiveStrict(strongSignals, supportSignals),
    requiresHumanReview: false,
    possiblePacks: [
      "NEXO Estratégico",
      "PLUS Automatización Estratégica",
      "NEXO Implementación",
    ],
  };
}

function chooseRecommendedPack(activeCards: NexoCard[]): {
  pack: NexoPack;
  reason: string;
} {
  const ids = activeCards.map((card) => card.id);

  const hasStrategicBaseProblem =
    ids.includes("cliente_ideal_poco_definido") ||
    ids.includes("propuesta_dificil_entender") ||
    ids.includes("falta_diferenciacion_clara");

  const hasMultipleStrategicProblems =
    [
      "cliente_ideal_poco_definido",
      "propuesta_dificil_entender",
      "falta_diferenciacion_clara",
      "dependencia_recomendaciones",
      "contenido_sin_sistema",
    ].filter((id) => ids.includes(id)).length >= 2;

  if (ids.includes("operacion_dependiente_persona") && hasMultipleStrategicProblems) {
    return {
      pack: "NEXO Implementación",
      reason:
        "Se detectan problemas estratégicos conectados y además una alta dependencia de la persona que dirige el negocio. Conviene trabajar estrategia y dejar materiales preparados para ejecutar.",
    };
  }

  if (hasStrategicBaseProblem && hasMultipleStrategicProblems) {
    return {
      pack: "NEXO Estratégico",
      reason:
        "El problema no parece estar en una sola pieza, sino en varias áreas conectadas: cliente ideal, oferta, diferenciación, captación o contenido.",
    };
  }

  if (ids.includes("seguimiento_inconsistente")) {
    return {
      pack: "PLUS Seguimiento y Proceso Comercial",
      reason:
        "Las oportunidades pueden estar perdiéndose por falta de seguimiento, proceso y control comercial.",
    };
  }

  if (ids.includes("dependencia_recomendaciones")) {
    return {
      pack: "PLUS Captación y Mensaje",
      reason:
        "El negocio necesita dejar de depender únicamente de recomendaciones y definir un sistema básico de captación.",
    };
  }

  if (ids.includes("perfil_digital_poco_alineado")) {
    return {
      pack: "Auditoría Estratégica de Redes Sociales",
      reason:
        "Existen indicios de que Instagram o Facebook pueden estar afectando la percepción o conversión, pero requiere revisión humana antes de recomendar una intervención.",
    };
  }

  if (ids.includes("automatizacion_prematura")) {
    return {
      pack: "NEXO Estratégico",
      reason:
        "Antes de automatizar, conviene ordenar estrategia, procesos, mensaje y prioridades.",
    };
  }

  return {
    pack: "Sin recomendación directa",
    reason:
      "No hay todavía suficiente evidencia para recomendar una intervención concreta.",
  };
}

export function runNexoEngine(answers: Answers): NexoEngineResult {
  const cards = [
    evaluateDependenciaRecomendaciones(answers),
    evaluatePropuestaDificil(answers),
    evaluateSeguimientoInconsistente(answers),
    evaluateContenidoSinSistema(answers),
    evaluatePerfilDigital(answers),
    evaluateClienteIdeal(answers),
    evaluateDiferenciacion(answers),
    evaluateOperacionDependiente(answers),
    evaluateAutomatizacionPrematura(answers),
  ];

  const activeCards = cards.filter((card) => card.isActive);

  const reviewRequired = activeCards.filter((card) => card.requiresHumanReview);

  const recommendation = chooseRecommendedPack(activeCards);

  return {
    activeCards,
    reviewRequired,
    recommendedPack: recommendation.pack,
    recommendationReason: recommendation.reason,
  };
}