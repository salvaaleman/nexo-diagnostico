import type { Friction, FrictionRelation, RootCause } from "./types";

const ROOT_CAUSE_PRIORITY = [
  "claridad_oferta",
  "posicionamiento",
  "procesos",
  "dependencia_fundador",
  "seguimiento_comercial",
  "objetivos_recursos",
  "crecimiento_sostenible",
];

function getBasePriorityScore(friction: Friction): number {
  const index = ROOT_CAUSE_PRIORITY.indexOf(friction.id);
  if (index === -1) return 0;
  return Math.max(0, ROOT_CAUSE_PRIORITY.length - index) * 8;
}

function getSeverityWeight(friction: Friction): number {
  if (friction.severity === "critica") return 40;
  if (friction.severity === "alta") return 30;
  if (friction.severity === "media") return 18;
  return 8;
}

function getConfidenceWeight(friction: Friction): number {
  if (friction.confidence === "alta") return 12;
  if (friction.confidence === "media") return 7;
  return 3;
}

function getRelationStrengthWeight(relation: FrictionRelation): number {
  if (relation.strength === "alta") return 18;
  if (relation.strength === "media") return 10;
  return 5;
}

function getRelationTypeWeight(relation: FrictionRelation): number {
  if (relation.type === "causa") return 14;
  if (relation.type === "bloquea") return 12;
  if (relation.type === "agrava") return 9;
  if (relation.type === "amplifica") return 8;
  if (relation.type === "depende_de") return 6;
  return 4;
}

function calculateInfluenceScore(
  friction: Friction,
  relations: FrictionRelation[]
): number {
  const safeRelations = Array.isArray(relations) ? relations : [];

  const outgoingRelations = safeRelations.filter(
    (r) => r.fromFrictionId === friction.id
  );

  const incomingRelations = safeRelations.filter(
    (r) => r.toFrictionId === friction.id
  );

  const outgoingScore = outgoingRelations.reduce((total, relation) => {
    return (
      total +
      getRelationStrengthWeight(relation) +
      getRelationTypeWeight(relation)
    );
  }, 0);

  const incomingPenalty = incomingRelations.reduce((total, relation) => {
    return total + Math.round(getRelationStrengthWeight(relation) * 0.4);
  }, 0);

  return outgoingScore - incomingPenalty;
}

function safeScore(friction: Friction): number {
  return typeof friction.score === "number" && !isNaN(friction.score)
    ? friction.score
    : 0;
}

function scoreFriction(
  friction: Friction,
  relations: FrictionRelation[]
): number {
  return (
    safeScore(friction) +
    getBasePriorityScore(friction) +
    getSeverityWeight(friction) +
    getConfidenceWeight(friction) +
    calculateInfluenceScore(friction, relations)
  );
}

function buildRootDescription(
  root: Friction,
  relations: FrictionRelation[]
): string {
  const safeRelations = Array.isArray(relations) ? relations : [];

  const outgoingRelations = safeRelations.filter(
    (r) => r.fromFrictionId === root.id
  );

  if (outgoingRelations.length === 0) return root.description;

  const strongestRelation = [...outgoingRelations].sort(
    (a, b) =>
      getRelationStrengthWeight(b) - getRelationStrengthWeight(a)
  )[0];

  if (!strongestRelation) return root.description;

  return `${root.description} Esta fricción no aparece aislada: ${strongestRelation.explanation}`;
}

function getRelatedFrictions(
  root: Friction,
  frictions: Friction[],
  relations: FrictionRelation[]
): string[] {
  const safeFrictions = Array.isArray(frictions) ? frictions : [];
  const safeRelations = Array.isArray(relations) ? relations : [];

  const relatedFromRelations = safeRelations
    .filter(
      (r) =>
        r.fromFrictionId === root.id || r.toFrictionId === root.id
    )
    .flatMap((r) => [r.fromFrictionId, r.toFrictionId])
    .filter((id) => id && id !== root.id);

  const relatedByScore = [...safeFrictions]
    .filter((f) => f.id !== root.id)
    .sort((a, b) => safeScore(b) - safeScore(a))
    .map((f) => f.id);

  return Array.from(new Set([...relatedFromRelations, ...relatedByScore])).slice(
    0,
    4
  );
}

function getRelatedRelations(
  root: Friction,
  relations: FrictionRelation[]
): string[] {
  const safeRelations = Array.isArray(relations) ? relations : [];

  return safeRelations
    .filter(
      (r) =>
        r.fromFrictionId === root.id || r.toFrictionId === root.id
    )
    .map((r) => r.id)
    .slice(0, 5);
}

export function detectRootCause(
  frictions: Friction[],
  relations: FrictionRelation[] = []
): RootCause {
  const safeFrictions = Array.isArray(frictions) ? frictions : [];
  const safeRelations = Array.isArray(relations) ? relations : [];

  const ordered = [...safeFrictions].sort((a, b) => {
    const diff =
      scoreFriction(b, safeRelations) -
      scoreFriction(a, safeRelations);

    if (diff !== 0) return diff;

    const aPriority = ROOT_CAUSE_PRIORITY.indexOf(a.id);
    const bPriority = ROOT_CAUSE_PRIORITY.indexOf(b.id);

    const safeA = aPriority === -1 ? 999 : aPriority;
    const safeB = bPriority === -1 ? 999 : bPriority;

    if (safeA !== safeB) return safeA - safeB;

    return safeScore(b) - safeScore(a);
  });

  const root = ordered[0];

  if (!root) {
    return {
      id: "sin_causa_raiz",
      title: "No se ha detectado una causa raíz dominante",
      description:
        "Con la información disponible no aparece una fricción estructural suficientemente fuerte como para señalar una causa raíz principal.",
      relatedFrictions: [],
      relatedRelations: [],
    };
  }

  return {
    id: root.id,
    title: root.name,
    description: buildRootDescription(root, safeRelations),
    relatedFrictions: getRelatedFrictions(root, safeFrictions, safeRelations),
    relatedRelations: getRelatedRelations(root, safeRelations),
  };
}