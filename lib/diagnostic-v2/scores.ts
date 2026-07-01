import type { Friction } from "./types";

export function calculateGlobalScore(frictions: Friction[]): number {
  if (frictions.length === 0) return 100;

  const total = frictions.reduce(
    (sum, friction) => sum + friction.score,
    0
  );

  const max = frictions.length * 12;

  return Math.max(
    0,
    Math.round(100 - (total / max) * 100)
  );
}

export function topFrictions(frictions: Friction[], limit = 3): Friction[] {
  return [...frictions]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}