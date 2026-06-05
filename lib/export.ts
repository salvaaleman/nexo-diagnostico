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
    lines.push("## Informe Estratégico Nexo IA");
    lines.push("");

    lines.push(`**Alertas:** ${val(internal.alertas)}`);
    lines.push("");

    const r = internal.recommendation;

    lines.push("### Diagnóstico estratégico");
    lines.push("");

    lines.push("**Resumen:**");
    lines.push(val(r?.summary));
    lines.push("");

    lines.push("**Problemas detectados:**");
    if (Array.isArray(r?.main_problems) && r.main_problems.length > 0) {
      for (const problem of r.main_problems) {
        lines.push(`- ${problem}`);
      }
    } else {
      lines.push("—");
    }
    lines.push("");

    lines.push("**Cuello de botella principal:**");
    lines.push(val(r?.main_bottleneck));
    lines.push("");

    lines.push("**Madurez global:**");
    lines.push(val(r?.maturity_level));
    lines.push("");

    lines.push("**Fortalezas activas:**");
    if (Array.isArray(r?.active_strengths) && r.active_strengths.length > 0) {
      for (const strength of r.active_strengths) {
        lines.push(`- ${strength}`);
      }
    } else {
      lines.push("—");
    }
    lines.push("");

    lines.push("**Plan de prioridades:**");
    if (Array.isArray(r?.priority_plan) && r.priority_plan.length > 0) {
      r.priority_plan.forEach((item, index) => {
        lines.push(`${index + 1}. ${item.title}`);
        lines.push(`   ${item.reason}`);
        lines.push("");
      });
    } else {
      lines.push("—");
      lines.push("");
    }

    lines.push("**Qué está ocurriendo realmente:**");
    lines.push(val(r?.strategic_explanation));
    lines.push("");

    lines.push("**Intervención recomendada:**");
    lines.push(val(r?.recommended_pack));
    lines.push("");

    lines.push("**Prioridad:**");
    lines.push(val(r?.priority));
    lines.push("");

    lines.push("**Foco recomendado:**");
    lines.push(val(r?.recommended_focus));
    lines.push("");

    lines.push("**Por qué esta intervención:**");
    lines.push(val(r?.pack_reason));
    lines.push("");

    lines.push(`**Notas internas:** ${val(internal.notas)}`);
  }

  return lines.join("\n");
}