import type { Friction, RoadmapItem } from "./types";

export function buildRoadmap(frictions: Friction[]) {
  const ahora: RoadmapItem[] = [];
  const dias30: RoadmapItem[] = [];
  const dias90: RoadmapItem[] = [];

  for (const friction of frictions.slice(0, 5)) {
    if (ahora.length < 2) {
      ahora.push({
        title: friction.name,
        description: friction.recommendation ?? "",
        priority: "alta",
      });
      continue;
    }

    if (dias30.length < 2) {
      dias30.push({
        title: friction.name,
        description: friction.recommendation ?? "",
        priority: "media",
      });
      continue;
    }

    dias90.push({
      title: friction.name,
      description: friction.recommendation ?? "",
      priority: "baja",
    });
  }

  return {
    ahora,
    dias30,
    dias90,
  };
}