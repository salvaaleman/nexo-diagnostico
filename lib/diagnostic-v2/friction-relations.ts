import type { Friction, FrictionRelation } from "./types";

type RelationRule = {
  id: string;
  fromCategory: string;
  toCategory: string;
  type: FrictionRelation["type"];
  strength: FrictionRelation["strength"];
  explanation: string;
  strategicImplication: string;
};

const RELATION_RULES: RelationRule[] = [
  {
    id: "claridad_afecta_captacion",
    fromCategory: "claridad",
    toCategory: "captacion",
    type: "bloquea",
    strength: "alta",
    explanation:
      "Cuando la propuesta no se entiende con claridad, la captación pierde eficacia porque el cliente necesita más esfuerzo para comprender el valor antes de avanzar.",
    strategicImplication:
      "Antes de aumentar visibilidad, conviene revisar si el mensaje comunica con precisión qué se ofrece, para quién y por qué debería importar.",
  },
  {
    id: "claridad_afecta_conversion",
    fromCategory: "claridad",
    toCategory: "conversion",
    type: "bloquea",
    strength: "alta",
    explanation:
      "Una propuesta poco clara traslada dudas al proceso comercial y hace que la conversión dependa demasiado de explicaciones manuales.",
    strategicImplication:
      "La conversión puede mejorar sin captar más si el valor se explica mejor antes de la conversación comercial.",
  },
  {
    id: "captacion_afecta_seguimiento",
    fromCategory: "captacion",
    toCategory: "seguimiento",
    type: "agrava",
    strength: "media",
    explanation:
      "Cuando la captación depende de canales conversacionales o acciones poco sistematizadas, el seguimiento tiende a quedar disperso entre mensajes, recordatorios y respuestas manuales.",
    strategicImplication:
      "No basta con generar oportunidades; hay que definir cómo se registran, clasifican y recuperan después del primer contacto.",
  },
  {
    id: "seguimiento_afecta_conversion",
    fromCategory: "seguimiento",
    toCategory: "conversion",
    type: "causa",
    strength: "alta",
    explanation:
      "La ausencia de seguimiento estructurado provoca pérdida de oportunidades entre el primer interés y la decisión final.",
    strategicImplication:
      "La mejora de conversión debe empezar por ordenar estados, próximos pasos y tiempos de respuesta.",
  },
  {
    id: "procesos_afectan_automatizacion",
    fromCategory: "procesos",
    toCategory: "automatizacion",
    type: "depende_de",
    strength: "alta",
    explanation:
      "La automatización depende de procesos claros. Si el proceso no está definido, automatizar puede acelerar el desorden operativo.",
    strategicImplication:
      "Antes de implantar automatizaciones, conviene documentar el flujo real que se quiere simplificar.",
  },
  {
    id: "procesos_afectan_escalabilidad",
    fromCategory: "procesos",
    toCategory: "escalabilidad",
    type: "bloquea",
    strength: "alta",
    explanation:
      "Los procesos poco definidos limitan la capacidad de crecer porque cada aumento de demanda exige más intervención manual.",
    strategicImplication:
      "La escalabilidad debe construirse desde la repetición operativa, no desde más actividad comercial.",
  },
  {
    id: "automatizacion_afecta_seguimiento",
    fromCategory: "automatizacion",
    toCategory: "seguimiento",
    type: "amplifica",
    strength: "media",
    explanation:
      "Cuando la automatización está poco desarrollada, el seguimiento sigue dependiendo de memoria, disponibilidad y acciones manuales.",
    strategicImplication:
      "Automatizar recordatorios, respuestas iniciales y recuperación de contactos puede liberar capacidad sin perder control comercial.",
  },
  {
    id: "direccion_afecta_prioridades",
    fromCategory: "direccion",
    toCategory: "prioridades",
    type: "causa",
    strength: "alta",
    explanation:
      "Cuando no hay dirección clara, las prioridades se confunden con urgencias y el negocio reparte energía entre demasiadas acciones.",
    strategicImplication:
      "El diagnóstico debe convertir objetivos generales en una secuencia concreta de intervención.",
  },
  {
    id: "metricas_afectan_direccion",
    fromCategory: "metricas",
    toCategory: "direccion",
    type: "bloquea",
    strength: "media",
    explanation:
      "La falta de métricas limita la calidad de decisión porque impide distinguir entre percepción, urgencia y causa real.",
    strategicImplication:
      "Antes de decidir nuevas acciones, conviene medir las señales mínimas que muestran dónde se está perdiendo valor.",
  },
  {
    id: "rentabilidad_afecta_escalabilidad",
    fromCategory: "rentabilidad",
    toCategory: "escalabilidad",
    type: "bloquea",
    strength: "media",
    explanation:
      "Si la rentabilidad no está clara, escalar puede aumentar volumen sin mejorar beneficio real.",
    strategicImplication:
      "La escalabilidad debe analizarse junto con margen, esfuerzo, recurrencia y capacidad operativa.",
  },
  {
    id: "conversion_afecta_rentabilidad",
    fromCategory: "conversion",
    toCategory: "rentabilidad",
    type: "agrava",
    strength: "media",
    explanation:
      "Una conversión débil reduce la rentabilidad porque obliga a generar más oportunidades para obtener el mismo resultado comercial.",
    strategicImplication:
      "Mejorar conversión puede tener más impacto que aumentar captación si ya existen conversaciones o contactos activos.",
  },
  {
    id: "seguimiento_afecta_rentabilidad",
    fromCategory: "seguimiento",
    toCategory: "rentabilidad",
    type: "agrava",
    strength: "media",
    explanation:
      "Cuando el seguimiento es débil, parte de la inversión en captación, contenido o recomendaciones no se transforma en retorno.",
    strategicImplication:
      "Recuperar oportunidades existentes puede ser más rentable que buscar nuevos contactos de forma inmediata.",
  },
];

function normalizeCategory(category: string): string {
  const value = category.trim().toLowerCase();

  if (value === "oferta") return "claridad";
  if (value === "modelo_negocio") return "claridad";
  if (value === "modelo de negocio") return "claridad";
  if (value === "comunicacion") return "claridad";
  if (value === "comunicación") return "claridad";

  if (value === "ventas") return "conversion";
  if (value === "conversión") return "conversion";

  if (value === "crm") return "seguimiento";

  if (value === "operaciones") return "procesos";
  if (value === "operacion") return "procesos";
  if (value === "operación") return "procesos";

  if (value === "ia") return "automatizacion";
  if (value === "automatización") return "automatizacion";

  if (value === "liderazgo") return "direccion";
  if (value === "estrategia") return "direccion";

  if (value === "finanzas") return "rentabilidad";

  return value;
}

function getSeverityWeight(friction: Friction): number {
  if (friction.severity === "critica") return 4;
  if (friction.severity === "alta") return 3;
  if (friction.severity === "media") return 2;
  return 1;
}

function getStrengthValue(strength: FrictionRelation["strength"]): number {
  if (strength === "alta") return 3;
  if (strength === "media") return 2;
  return 1;
}

function buildEvidence(from: Friction, to: Friction): string[] {
  return [
    ...from.evidence.map((item) => `Origen: ${item}`),
    ...to.evidence.map((item) => `Efecto: ${item}`),
  ].filter(Boolean);
}

function buildRelationId(rule: RelationRule, from: Friction, to: Friction): string {
  return `${rule.id}__${from.id}__${to.id}`;
}

function findFrictionByCategory(
  frictions: Friction[],
  category: string
): Friction[] {
  return frictions.filter(
    (friction) => normalizeCategory(friction.category) === category
  );
}

function sortRelations(relations: FrictionRelation[]): FrictionRelation[] {
  return [...relations].sort((a, b) => {
    const strengthDiff = getStrengthValue(b.strength) - getStrengthValue(a.strength);

    if (strengthDiff !== 0) return strengthDiff;

    return a.id.localeCompare(b.id);
  });
}

export function buildFrictionRelations(
  frictions: Friction[]
): FrictionRelation[] {
  const relations: FrictionRelation[] = [];

  RELATION_RULES.forEach((rule) => {
    const fromFrictions = findFrictionByCategory(frictions, rule.fromCategory);
    const toFrictions = findFrictionByCategory(frictions, rule.toCategory);

    fromFrictions.forEach((from) => {
      toFrictions.forEach((to) => {
        if (from.id === to.id) return;

        const fromSeverity = getSeverityWeight(from);
        const toSeverity = getSeverityWeight(to);

        if (fromSeverity < 2 && toSeverity < 2) return;

        relations.push({
          id: buildRelationId(rule, from, to),
          fromFrictionId: from.id,
          toFrictionId: to.id,
          fromCategory: rule.fromCategory,
          toCategory: rule.toCategory,
          type: rule.type,
          strength: rule.strength,
          explanation: rule.explanation,
          evidence: buildEvidence(from, to),
          strategicImplication: rule.strategicImplication,
        });
      });
    });
  });

  return sortRelations(relations);
}