import type { Signal } from "./types";

type Answers = Record<string, unknown>;

function valueEquals(value: unknown, expected: string): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => valueEquals(item, expected));
  }

  if (typeof value !== "string") return false;

  return value.trim().toLowerCase() === expected.trim().toLowerCase();
}

function valueIncludes(value: unknown, terms: string[]): boolean {
  const text = Array.isArray(value)
    ? value.join(" ").toLowerCase()
    : typeof value === "string"
      ? value.toLowerCase()
      : "";

  return terms.some((term) => text.includes(term.toLowerCase()));
}

function addSignal(
  signals: Signal[],
  id: string,
  questionId: string,
  value: unknown,
  score: number
) {
  signals.push({
    id,
    questionId,
    value,
    score,
  });
}

export function detectSignals(answers: Answers): Signal[] {
  const signals: Signal[] = [];

  if (
    valueIncludes(answers.b1_ausencia_semana, [
      "se detiene",
      "prácticamente se detiene",
      "decisiones quedan pendientes",
      "tareas importantes se retrasan",
    ])
  ) {
    addSignal(signals, "dependencia_fundador", "b1_ausencia_semana", answers.b1_ausencia_semana, 3);
  }

  if (
    valueEquals(answers.b1_personas_negocio, "Solo yo") ||
    valueEquals(answers.equipo, "Solo")
  ) {
    addSignal(signals, "estructura_unipersonal", "b1_personas_negocio", answers.b1_personas_negocio ?? answers.equipo, 2);
  }

  if (
    valueEquals(answers.b1_decisiones_negocio, "Las tomo yo") ||
    valueEquals(answers.b10_decisiones, "Yo")
  ) {
    addSignal(signals, "decision_centralizada", "b1_decisiones_negocio", answers.b1_decisiones_negocio ?? answers.b10_decisiones, 3);
  }

  if (
    valueIncludes(answers.b3_confusion, ["dudas", "confusión", "explicar", "no entienden"]) ||
    valueIncludes(answers.b7_cuesta_explicar, ["todo", "precio", "valor", "diferencia", "resultado"])
  ) {
    addSignal(signals, "oferta_confusa", "b3_confusion", answers.b3_confusion ?? answers.b7_cuesta_explicar, 3);
  }

  if (
    valueIncludes(answers.b3_diferenciacion, [
      "no sé",
      "no tengo claro",
      "similar",
      "igual",
      "mucha competencia",
    ])
  ) {
    addSignal(signals, "diferenciacion_debil", "b3_diferenciacion", answers.b3_diferenciacion, 3);
  }

  if (
    valueIncludes(answers.b3_propuesta_frase, [
      "servicios",
      "soluciones",
      "ayudo",
      "calidad",
    ])
  ) {
    addSignal(signals, "mensaje_generico", "b3_propuesta_frase", answers.b3_propuesta_frase, 2);
  }

  if (
    valueIncludes(answers.b5_cliente_entiende, [
      "en parte",
      "no estoy seguro",
      "confusión",
      "no",
    ])
  ) {
    addSignal(signals, "cliente_no_entiende", "b5_cliente_entiende", answers.b5_cliente_entiende, 3);
  }

  if (
    valueIncludes(answers.b2_objeciones, [
      "precio",
      "caro",
      "confianza",
      "comparar",
      "más adelante",
      "consultarlo",
    ])
  ) {
    addSignal(signals, "objeciones_comerciales", "b2_objeciones", answers.b2_objeciones, 2);
  }

  if (
    valueIncludes(answers.b2_origen_mejores_clientes, ["recomendación", "boca a boca"])
  ) {
    addSignal(signals, "dependencia_recomendaciones", "b2_origen_mejores_clientes", answers.b2_origen_mejores_clientes, 2);
  }

  if (
    valueIncludes(answers.b6_canales, ["no tengo presencia digital"])
  ) {
    addSignal(signals, "sin_presencia_digital", "b6_canales", answers.b6_canales, 2);
  }

  if (
    valueIncludes(answers.b6_tiempo_respuesta, [
      "24",
      "48",
      "más de 48",
      "no lo sé",
    ])
  ) {
    addSignal(signals, "respuesta_lenta", "b6_tiempo_respuesta", answers.b6_tiempo_respuesta, 3);
  }

  if (
    valueIncludes(answers.b6_quien_responde, [
      "depende",
      "varias personas",
    ])
  ) {
    addSignal(signals, "respuesta_no_asignada", "b6_quien_responde", answers.b6_quien_responde, 2);
  }

  if (
    valueIncludes(answers.b12_proceso_definido, [
      "no",
      "en parte",
    ])
  ) {
    addSignal(signals, "proceso_no_definido", "b12_proceso_definido", answers.b12_proceso_definido, 3);
  }

  if (
    valueIncludes(answers.b12_seguimiento, [
      "yo",
      "depende",
      "varias personas",
    ])
  ) {
    addSignal(signals, "seguimiento_fragil", "b12_seguimiento", answers.b12_seguimiento, 2);
  }

  if (
    valueIncludes(answers.b12_donde_pierde, [
      "seguimiento",
      "respuesta",
      "precio",
      "propuesta",
      "llamada",
      "presupuesto",
      "no responden",
    ])
  ) {
    addSignal(signals, "perdida_oportunidades", "b12_donde_pierde", answers.b12_donde_pierde, 3);
  }

  if (
    valueIncludes(answers.b10_crecimiento_30, [
      "probablemente no",
      "no",
      "no lo sé",
    ])
  ) {
    addSignal(signals, "crecimiento_no_absorbible", "b10_crecimiento_30", answers.b10_crecimiento_30, 3);
  }

  if (
    valueIncludes(answers.b10_recurso_limita, [
      "tiempo",
      "equipo",
      "organización",
      "procesos",
      "tecnología",
      "ventas",
    ])
  ) {
    addSignal(signals, "recurso_limitante", "b10_recurso_limita", answers.b10_recurso_limita, 2);
  }

  if (
    valueIncludes(answers.b10_depende_ti, [
      "todo",
      "ventas",
      "clientes",
      "seguimiento",
      "entrega",
      "decisiones",
    ])
  ) {
    addSignal(signals, "dependencia_personal_critica", "b10_depende_ti", answers.b10_depende_ti, 3);
  }

  if (
    valueIncludes(answers.b9_manual, [
      "manual",
      "manualmente",
      "repetitivo",
      "me consume",
      "mucho tiempo",
    ])
  ) {
    addSignal(signals, "tareas_manuales", "b9_manual", answers.b9_manual, 3);
  }

  if (
    valueIncludes(answers.b9_herramientas, [
      "ninguna",
    ])
  ) {
    addSignal(signals, "sin_herramientas", "b9_herramientas", answers.b9_herramientas, 2);
  }

  if (
    valueIncludes(answers.b9_automatizar, [
      "no sé",
      "no se",
      "no tengo claro",
      "todo",
    ])
  ) {
    addSignal(signals, "automatizacion_sin_criterio", "b9_automatizar", answers.b9_automatizar, 2);
  }

  if (
    valueIncludes(answers.b7_frecuencia, [
      "nunca",
      "ocasional",
      "una vez al mes",
    ])
  ) {
    addSignal(signals, "comunicacion_irregular", "b7_frecuencia", answers.b7_frecuencia, 2);
  }

  if (
    valueIncludes(answers.b7_impide_comunicar, [
      "tiempo",
      "ideas",
      "no sé",
      "vergüenza",
      "constancia",
      "organización",
    ])
  ) {
    addSignal(signals, "bloqueo_comunicacion", "b7_impide_comunicar", answers.b7_impide_comunicar, 2);
  }

  if (
    valueIncludes(answers.b4_objetivo_6_meses, [
      "crecer",
      "más clientes",
      "facturar",
      "escalar",
    ]) &&
    valueIncludes(answers.b10_recurso_limita, [
      "tiempo",
      "equipo",
      "procesos",
      "organización",
    ])
  ) {
    addSignal(signals, "objetivo_vs_recursos", "b4_objetivo_6_meses", answers.b4_objetivo_6_meses, 3);
  }

  return signals;
}