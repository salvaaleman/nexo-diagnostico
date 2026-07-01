import type {
  CardConfidence,
  CardPriority,
  CardStatus,
} from "../types";

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  return Math.round(total / values.length);
}

export function statusFromScore(score: number): CardStatus {
  if (score >= 80) {
    return "correcto";
  }

  if (score >= 50) {
    return "atencion";
  }

  return "critico";
}

export function priorityFromScore(score: number): CardPriority {
  if (score < 40) {
    return "alta";
  }

  if (score < 70) {
    return "media";
  }

  return "baja";
}

export function confidenceFromEvidence(
  evidences: number
): CardConfidence {
  if (evidences >= 5) {
    return "alta";
  }

  if (evidences >= 2) {
    return "media";
  }

  return "baja";
}

export function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}

export function firstOrDefault<T>(
  values: T[],
  defaultValue: T
): T {
  if (values.length === 0) {
    return defaultValue;
  }

  return values[0];
}

export function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
