"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { QUESTION_BLOCKS } from "@/lib/questions";
import {
  ALERTAS,
  emptyInternalEval,
  type InternalEval,
} from "@/lib/internal-fields";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";
import { NexoClientReport } from "@/lib/diagnostic/NexoClientReport";
import { toMarkdown } from "@/lib/export";
import { saveInternalEval } from "./actions";

type Answers = Record<string, unknown>;

function val(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return String(v);
}

function normalizeRecommendation(
  recommendation: StrategicRecommendation | InternalEval["recommendation"] | null,
  fallback: InternalEval["recommendation"]
): InternalEval["recommendation"] {
  const empty = emptyInternalEval().recommendation;
  const source = (recommendation ?? fallback) as any;

  const recommendedPack =
    source.recommended_pack ??
    source.pack_final ??
    source.pack_auto ??
    fallback.recommended_pack;

  const priority = source.priority ?? fallback.priority ?? "baja";

  return {
    ...empty,
    ...fallback,
    ...source,
    recommended_pack: recommendedPack,
    priority,
    pack_reason: source.pack_reason ?? source.motivo ?? fallback.pack_reason ?? "",
    recommended_focus: Array.isArray(source.recommended_focus)
      ? source.recommended_focus
      : fallback.recommended_focus ?? [],
  };
}

function safeFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function InternalForm({
  id,
  clientName,
  brand,
  answers,
  initialInternal,
  diagnosticAnalysis,
}: {
  id: string;
  clientName: string;
  brand: string | null;
  answers: Answers;
  initialInternal: InternalEval | null;
  diagnosticAnalysis: { recommendations: StrategicRecommendation } | null;
}) {
  const strategic = diagnosticAnalysis?.recommendations ?? null;

  const baseRecommendation = normalizeRecommendation(
    strategic,
    emptyInternalEval().recommendation
  );

  const [internal, setInternal] = useState<InternalEval>(() => {
    if (initialInternal && Object.keys(initialInternal).length) {
      return {
        ...emptyInternalEval(),
        ...initialInternal,
        recommendation: normalizeRecommendation(
          initialInternal.recommendation?.main_bottleneck
            ? initialInternal.recommendation
            : baseRecommendation,
          baseRecommendation
        ),
      };
    }

    return {
      ...emptyInternalEval(),
      recommendation: baseRecommendation,
    };
  });

  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const r = normalizeRecommendation(internal.recommendation, baseRecommendation);

  function toggleAlerta(a: string) {
    const cur = internal.alertas ?? [];

    setInternal({
      ...internal,
      alertas: cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a],
    });
  }

  async function guardar() {
    setSaving(true);
    await saveInternalEval(id, {
      ...internal,
      recommendation: r,
    });
    setSaving(false);
  }

  async function copiarMarkdown() {
    const md = toMarkdown(clientName, brand, answers, {
      ...internal,
      recommendation: r,
    });

    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function generarPdfCliente() {
    setGeneratingPdf(true);

    const date = new Date().toLocaleDateString("es-ES");

    const blob = await pdf(
      <NexoClientReport
        clientName={clientName}
        brand={brand}
        date={date}
        recommendation={r}
        alertas={internal.alertas}
        notas={internal.notas}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `informe-nexo-ia-${safeFileName(clientName)}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    setGeneratingPdf(false);
  }

  return (
    <div className="space-y-10">
      <section className="bg-card border border-line rounded-lg p-6">
        <h2 className="font-display text-xl mb-4">Análisis estratégico Nexo IA</h2>

        {strategic ? (
          <div className="space-y-5">
            <div>
              <p className="label mb-1">Resumen</p>
              <p className="text-sm text-muted">{strategic.summary}</p>
            </div>

            <div>
              <p className="label mb-1">Problemas detectados</p>
              {strategic.main_problems.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                  {strategic.main_problems.map((problem: string) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  No se detectaron patrones con las respuestas actuales.
                </p>
              )}
            </div>

            <div>
              <p className="label mb-1">Cuello de botella principal</p>
              <p className="text-sm font-medium">
                {strategic.main_bottleneck || "No identificado"}
              </p>
            </div>

            <div>
              <p className="label mb-1">Madurez global</p>
              <p className="text-sm font-medium">
                {strategic.maturity_level || "Sin datos suficientes"}
              </p>
            </div>

            <div>
              <p className="label mb-1">Fortalezas activas</p>
              {strategic.active_strengths?.length ? (
                <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                  {strategic.active_strengths.map((strength: string) => (
                    <li key={strength}>{strength}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  No se detectaron fortalezas destacables.
                </p>
              )}
            </div>

            <div>
              <p className="label mb-1">Plan de prioridades</p>
              {strategic.priority_plan?.length ? (
                <div className="space-y-3">
                  {strategic.priority_plan.map(
                    (item: { title: string; reason: string }, index: number) => (
                      <div key={`${item.title}-${index}`}>
                        <p className="text-sm font-medium">
                          {index + 1}. {item.title}
                        </p>
                        <p className="text-sm text-muted">{item.reason}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted">
                  No hay prioridades definidas todavía.
                </p>
              )}
            </div>

            <div>
              <p className="label mb-1">Qué está ocurriendo realmente</p>
              <p className="text-sm text-muted">{strategic.strategic_explanation}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="label mb-1">Intervención recomendada</p>
                <p className="text-sm font-medium">{strategic.recommended_pack}</p>
              </div>

              <div>
                <p className="label mb-1">Prioridad</p>
                <p className="text-sm font-medium">{strategic.priority}</p>
              </div>

              <div>
                <p className="label mb-1">Foco recomendado</p>
                <p className="text-sm text-muted">
                  {strategic.recommended_focus.join(", ") || "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="label mb-1">Por qué esta intervención</p>
              <p className="text-sm text-muted">{strategic.pack_reason || "—"}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Todavía no hay análisis estratégico disponible.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">Señales de alerta</h2>
        <div className="flex flex-wrap gap-2">
          {ALERTAS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAlerta(a)}
              className={`px-3 py-1.5 rounded-full border text-sm ${
                internal.alertas.includes(a)
                  ? "bg-accent text-white border-accent"
                  : "bg-card border-line hover:border-ink"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">Notas internas</h2>
        <textarea
          className="field"
          style={{ minHeight: 140 }}
          value={internal.notas}
          onChange={(e) =>
            setInternal({
              ...internal,
              notas: e.target.value,
            })
          }
        />
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">Respuestas del cliente</h2>
        <div className="space-y-6">
          {QUESTION_BLOCKS.map((b) => (
            <div key={b.id} className="border-t border-line pt-4">
              <p className="hint mb-3">
                Bloque {b.id} · {b.title}
              </p>

              <div className="space-y-3">
                {b.fields.map((f) => (
                  <div key={f.id}>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="text-sm text-muted">{val(answers[f.id])}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 sticky bottom-0 bg-paper/90 backdrop-blur py-4 border-t border-line">
        <button className="btn" onClick={guardar} disabled={saving}>
          {saving ? "Guardando…" : "Guardar evaluación"}
        </button>

        <button className="btn-ghost btn" onClick={copiarMarkdown}>
          {copied ? "Copiado ✓" : "Copiar Markdown"}
        </button>

        <button
          className="btn-ghost btn"
          onClick={generarPdfCliente}
          disabled={generatingPdf}
        >
          {generatingPdf ? "Generando PDF…" : "Generar PDF Cliente"}
        </button>
      </div>
    </div>
  );
}