"use client";

import { useState } from "react";
import { QUESTION_BLOCKS } from "@/lib/questions";
import { ALERTAS, emptyInternalEval, type InternalEval } from "@/lib/internal-fields";
import { toMarkdown } from "@/lib/export";
import { saveInternalEval } from "./actions";

type Answers = Record<string, unknown>;

function val(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return String(v);
}

export default function InternalForm({
  id,
  clientName,
  brand,
  answers,
  initialInternal,
}: {
  id: string;
  clientName: string;
  brand: string | null;
  answers: Answers;
  initialInternal: InternalEval | null;
  diagnosticAnalysis?: unknown;
}) {
  const [internal, setInternal] = useState<InternalEval>(() => {
    return {
      ...emptyInternalEval(),
      ...(initialInternal ?? {}),
    };
  });

  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const diagnostic = internal.diagnostic_v2;

  function toggleAlerta(a: string) {
    const cur = internal.alertas ?? [];

    setInternal({
      ...internal,
      alertas: cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a],
    });
  }

  async function guardar() {
    setSaving(true);
    await saveInternalEval(id, internal);
    setSaving(false);
  }

  async function copiarMarkdown() {
    const md = toMarkdown(clientName, brand, answers, internal);

    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-10">
      <section className="bg-card border border-line rounded-lg p-6">
        <h2 className="font-display text-xl mb-4">Análisis estratégico NEXO IA V2</h2>

        {diagnostic ? (
          <div className="space-y-6">
            <div>
              <p className="label mb-1">Resumen</p>
              <p className="text-sm text-muted">{diagnostic.resumen}</p>
            </div>

            <div>
              <p className="label mb-2">Índices NEXO</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {diagnostic.indices.map((index) => (
                  <div key={index.id} className="rounded-lg border border-line p-4">
                    <p className="text-sm font-medium">{index.name}</p>
                    <p className="text-2xl font-bold">{index.score}/100</p>
                    <p className="text-xs text-muted">{index.level}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="label mb-2">Fricciones detectadas</p>
              {diagnostic.frictions.length > 0 ? (
                <div className="space-y-3">
                  {diagnostic.frictions.map((friction) => (
                    <div key={friction.id} className="rounded-lg border border-line p-4">
                      <p className="text-sm font-bold">{friction.name}</p>
                      <p className="text-sm text-muted mt-1">{friction.description}</p>
                      <p className="text-xs text-muted mt-2">
                        Severidad: {friction.severity} · Confianza: {friction.confidence} · Puntuación: {friction.score}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No se detectaron fricciones suficientes.</p>
              )}
            </div>

            <div>
              <p className="label mb-1">Causa raíz</p>
              <p className="text-sm font-medium">{diagnostic.rootCause.title}</p>
              <p className="text-sm text-muted mt-1">{diagnostic.rootCause.description}</p>
            </div>

            <div>
              <p className="label mb-2">Hoja de ruta</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold">Ahora</p>
                  {diagnostic.roadmap.ahora.length ? (
                    diagnostic.roadmap.ahora.map((item) => (
                      <p key={item.title} className="text-sm text-muted">
                        - {item.title}: {item.description}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted">—</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold">30 días</p>
                  {diagnostic.roadmap.dias30.length ? (
                    diagnostic.roadmap.dias30.map((item) => (
                      <p key={item.title} className="text-sm text-muted">
                        - {item.title}: {item.description}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted">—</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold">90 días</p>
                  {diagnostic.roadmap.dias90.length ? (
                    diagnostic.roadmap.dias90.map((item) => (
                      <p key={item.title} className="text-sm text-muted">
                        - {item.title}: {item.description}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted">—</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Todavía no hay análisis V2 disponible. Finaliza o vuelve a guardar el diagnóstico del cliente.
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
      </div>
    </div>
  );
}