// Nexo IA · Diagnóstico Cliente
// export.ts — Convierte un diagnóstico a texto limpio (Markdown) para analizar con IA.
// Se usa SOLO desde la vista interna.

import { QUESTION_BLOCKS } from "./questions";
import type { InternalEval } from "./internal-fields";

type Answers = Record<string, unknown>;

function val(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return String(v);
}

export function toMarkdown(
  clientName: string,
  brand: string | null,
  answers: Answers,
  internal: InternalEval | null
): string {
  const lines: string[] = [];

  lines.push(`# Diagnóstico — ${clientName}${brand ? ` (${brand})` : ""}`);
  lines.push("");

  for (const block of QUESTION_BLOCKS) {
    lines.push(`## Bloque ${block.id} — ${block.title}`);

    for (const f of block.fields) {
      lines.push(`**${f.label}**`);
      lines.push(val(answers[f.id]));
      lines.push("");
    }
  }

  if (internal) {
    lines.push("---");
    lines.push("## Evaluación Interna NEXO IA V2");
    lines.push("");

    lines.push(`**Alertas:** ${val(internal.alertas)}`);
    lines.push("");
    lines.push(`**Notas internas:** ${val(internal.notas)}`);
    lines.push("");

    const diagnostic = internal.diagnostic_v2;

    if (diagnostic) {
      lines.push("### Diagnóstico estratégico");
      lines.push("");

      lines.push("**Resumen:**");
      lines.push(val(diagnostic.resumen));
      lines.push("");

      lines.push("### Índices NEXO");
      lines.push("");

      if (Array.isArray(diagnostic.indices) && diagnostic.indices.length > 0) {
        for (const index of diagnostic.indices) {
          lines.push(`- ${index.name}: ${index.score}/100 (${index.level})`);
        }
      } else {
        lines.push("—");
      }

      lines.push("");

      lines.push("### Fricciones detectadas");
      lines.push("");

      if (Array.isArray(diagnostic.frictions) && diagnostic.frictions.length > 0) {
        for (const friction of diagnostic.frictions) {
          lines.push(`#### ${friction.name}`);
          lines.push(`- Categoría: ${friction.category}`);
          lines.push(`- Intensidad: ${friction.severity}`);
          lines.push(`- Confianza: ${friction.confidence}`);
          lines.push(`- Puntuación: ${friction.score}`);
          lines.push(`- Descripción: ${friction.description}`);
          lines.push(`- Recomendación: ${val(friction.recommendation)}`);
          lines.push("");
        }
      } else {
        lines.push("—");
        lines.push("");
      }

      lines.push("### Causa raíz");
      lines.push("");

      lines.push(`**${val(diagnostic.rootCause.title)}**`);
      lines.push("");
      lines.push(val(diagnostic.rootCause.description));
      lines.push("");

      lines.push("### Hoja de ruta");
      lines.push("");

      lines.push("#### Ahora");
      if (diagnostic.roadmap.ahora.length > 0) {
        for (const item of diagnostic.roadmap.ahora) {
          lines.push(`- ${item.title}: ${item.description}`);
        }
      } else {
        lines.push("—");
      }

      lines.push("");

      lines.push("#### 30 días");
      if (diagnostic.roadmap.dias30.length > 0) {
        for (const item of diagnostic.roadmap.dias30) {
          lines.push(`- ${item.title}: ${item.description}`);
        }
      } else {
        lines.push("—");
      }

      lines.push("");

      lines.push("#### 90 días");
      if (diagnostic.roadmap.dias90.length > 0) {
        for (const item of diagnostic.roadmap.dias90) {
          lines.push(`- ${item.title}: ${item.description}`);
        }
      } else {
        lines.push("—");
      }

      lines.push("");
    }
  }

  return lines.join("\n");
}