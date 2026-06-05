"use client";

import { useState } from "react";
import {
  QUESTION_BLOCKS,
  CLIENT_FINISH_MESSAGE,
  type Field,
} from "@/lib/questions";
import { saveAnswers } from "./actions";

type Answers = Record<string, unknown>;

export default function DiagnosisClientForm({
  id,
  initialAnswers,
  initialStatus,
}: {
  id: string;
  initialAnswers: Answers;
  initialStatus: string;
}) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(
    initialStatus === "completado" || initialStatus === "evaluado"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const total = QUESTION_BLOCKS.length;
  const block = QUESTION_BLOCKS[step];
  const progress = Math.round(((step + 1) / total) * 100);

  const isFilled = (value: unknown) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  };

  const currentBlockComplete = block.fields.every((field) =>
    isFilled(answers[field.id])
  );

  function set(fieldId: string, value: unknown) {
    setError("");
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  }

  function toggle(fieldId: string, option: string) {
    const cur = Array.isArray(answers[fieldId])
      ? (answers[fieldId] as string[])
      : [];

    set(
      fieldId,
      cur.includes(option)
        ? cur.filter((o) => o !== option)
        : [...cur, option]
    );
  }

  async function next() {
    if (!currentBlockComplete) {
      setError("Debes responder todas las preguntas antes de continuar.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await saveAnswers(id, answers, false);
      setStep((s) => Math.min(s + 1, total - 1));
    } catch (err) {
      console.error(err);
      setError("No se pudieron guardar las respuestas. Revisa la consola.");
    } finally {
      setSaving(false);
    }
  }

  async function finish() {
    if (!currentBlockComplete) {
      setError("Debes responder todas las preguntas antes de finalizar.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await saveAnswers(id, answers, true);
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("No se pudo finalizar el diagnóstico. Revisa la consola.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">
          {CLIENT_FINISH_MESSAGE}
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex justify-between hint mb-2">
          <span>
            Bloque {step + 1} de {total}
          </span>
          <span>{progress}%</span>
        </div>

        <div className="h-1 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl mb-6">{block.title}</h2>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {block.fields.map((f) => (
          <FieldInput
            key={f.id}
            field={f}
            value={answers[f.id]}
            onChange={(v) => set(f.id, v)}
            onToggle={(opt) => toggle(f.id, opt)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <button
          className="btn-ghost btn"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0 || saving}
        >
          ← Anterior
        </button>

        {step < total - 1 ? (
          <button className="btn" onClick={next} disabled={saving}>
            {saving ? "Guardando…" : "Siguiente →"}
          </button>
        ) : (
          <button className="btn" onClick={finish} disabled={saving}>
            {saving ? "Guardando…" : "Finalizar"}
          </button>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  onToggle,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  onToggle: (opt: string) => void;
}) {
  const selected = Array.isArray(value) ? (value as string[]) : [];

  return (
    <div>
      <label className="label block mb-2">{field.label}</label>

      {field.type === "text" && (
        <input
          className="field"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          className="field"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          className="field"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Selecciona…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === "scale" && (
        <div className="flex flex-wrap gap-2">
          {Array.from(
            { length: (field.max ?? 10) - (field.min ?? 1) + 1 },
            (_, i) => (field.min ?? 1) + i
          ).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`w-10 h-10 rounded-lg border text-sm transition-colors ${
                value === n
                  ? "bg-ink text-paper border-ink"
                  : "bg-card border-line hover:border-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {field.type === "checklist" && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                selected.includes(o)
                  ? "bg-ink text-paper border-ink"
                  : "bg-card border-line hover:border-ink"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}