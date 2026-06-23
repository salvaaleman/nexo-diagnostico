"use client";

import { useState } from "react";
import { QUESTION_BLOCKS, type Field } from "@/lib/questions";
import { analyzeAnswers } from "@/lib/diagnostic/engine";
import { saveAnswers } from "./actions";

type Answers = Record<string, unknown>;
type IconType = "target" | "growth" | "megaphone" | "people" | "trophy" | "lock";

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
    const analysis = analyzeAnswers(answers);
    const recommendation = analysis.recommendations;
    const mainProblems = recommendation.main_problems.slice(0, 3);

    return (
      <div className="min-h-screen bg-[#F3F7FB] px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#D7E7F7] bg-white p-8 shadow-sm md:p-10">
          <header className="mb-10 border-b border-[#C9DCF0] pb-7">
            <div className="mb-2 font-display text-4xl font-black tracking-tight">
              <span className="text-[#0F1B2D]">NEXO</span>{" "}
              <span className="text-[#2E9ED6]">IA</span>
            </div>

            <p className="text-base text-[#26364A]">
              Diagnóstico estratégico empresarial
            </p>
          </header>

          <section className="mb-8">
            <h1 className="font-display mb-4 text-4xl font-bold leading-tight text-[#0F1B2D]">
              Tu diagnóstico inicial está listo
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-[#26364A]">
              Hemos revisado tus respuestas y detectado varias señales que
              pueden estar frenando el crecimiento de tu negocio. Este resumen
              muestra solo una primera lectura.
            </p>
          </section>

          <section className="mb-5 rounded-2xl border border-[#BFDDF5] bg-[#F4FAFF] p-6">
            <div className="flex gap-5">
              <IconBubble type="target" />

              <div>
                <p className="mb-2 text-lg font-bold text-[#1A6BB5]">
                  Principal área de atención detectada
                </p>

                <h2 className="mb-4 font-display text-2xl font-bold text-[#0F1B2D]">
                  {recommendation.main_bottleneck}
                </h2>

                <p className="text-base leading-relaxed text-[#26364A]">
                  {getBottleneckPainText(recommendation.main_bottleneck)}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-[#BFDDF5] bg-[#F4FAFF] p-6">
            <div className="flex gap-5">
              <IconBubble type="growth" />

              <div>
                <p className="mb-2 text-lg font-bold text-[#1A6BB5]">
                  Prioridad inicial
                </p>

                <h2 className="mb-4 font-display text-2xl font-bold capitalize text-[#0F1B2D]">
                  {recommendation.priority}
                </h2>

                <p className="text-base leading-relaxed text-[#26364A]">
                  Si esta prioridad es alta, conviene revisar esta parte antes
                  de seguir invirtiendo tiempo, dinero o esfuerzo en nuevas
                  acciones. De lo contrario, podrías estar empujando el negocio
                  en una dirección que no resuelve el problema de fondo.
                </p>
              </div>
            </div>
          </section>

          {mainProblems.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display mb-5 text-2xl font-bold text-[#0F1B2D]">
                Señales destacadas
              </h2>

              <div className="space-y-4">
                {mainProblems.map((problem) => (
                  <div
                    key={problem}
                    className="rounded-2xl border border-[#BFDDF5] bg-[#F4FAFF] p-5"
                  >
                    <div className="flex gap-5">
                      <IconBubble type={getProblemIcon(problem)} />

                      <div>
                        <p className="mb-2 text-lg font-bold text-[#1A6BB5]">
                          {problem}
                        </p>

                        <p className="text-base leading-relaxed text-[#26364A]">
                          {getProblemPainText(problem)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl border-2 border-[#1A6BB5] bg-[#F4FAFF] p-6">
            <div className="flex gap-5">
              <IconBubble type="lock" />

              <div>
                <h2 className="font-display mb-3 text-2xl font-bold text-[#0F1B2D]">
                  ¿Quieres ver el diagnóstico completo?
                </h2>

                <p className="mb-6 text-base leading-relaxed text-[#26364A]">
                  Este resumen solo muestra una parte de las señales detectadas.
                  El diagnóstico completo explica qué está ocurriendo, por qué
                  puede estar ocurriendo, qué riesgos existen y qué deberías
                  revisar primero.
                </p>

                <button
                  className="rounded-xl bg-[#1A6BB5] px-6 py-3 text-base font-bold text-white transition hover:bg-[#0F1B2D]"
                  type="button"
                >
                  Acceder al diagnóstico completo →
                </button>
              </div>
            </div>
          </section>
        </div>
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

function IconBubble({ type }: { type: IconType }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DDF0FF] text-[#1A6BB5]">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "target" && (
          <>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 12L20 4" />
            <path d="M16 4h4v4" />
          </>
        )}

        {type === "growth" && (
          <>
            <path d="M4 17l5-5 4 4 7-8" />
            <path d="M15 8h5v5" />
          </>
        )}

        {type === "megaphone" && (
          <>
            <path d="M4 13h3l9 4V7L7 11H4z" />
            <path d="M7 13v5" />
            <path d="M19 9a4 4 0 010 6" />
          </>
        )}

        {type === "people" && (
          <>
            <circle cx="9" cy="8" r="3" />
            <circle cx="17" cy="9" r="2" />
            <path d="M3 19a6 6 0 0112 0" />
            <path d="M14 19a4 4 0 017 0" />
          </>
        )}

        {type === "trophy" && (
          <>
            <path d="M8 4h8v4a4 4 0 01-8 0z" />
            <path d="M8 6H5a3 3 0 003 3" />
            <path d="M16 6h3a3 3 0 01-3 3" />
            <path d="M12 12v4" />
            <path d="M9 20h6" />
            <path d="M10 16h4" />
          </>
        )}

        {type === "lock" && (
          <>
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 018 0v3" />
            <path d="M12 15v2" />
          </>
        )}
      </svg>
    </div>
  );
}

function getProblemIcon(problem: string): IconType {
  const text = problem.toLowerCase();

  if (text.includes("cliente")) return "people";
  if (text.includes("diferenciación")) return "trophy";
  if (text.includes("posicionamiento")) return "megaphone";
  if (text.includes("seguimiento")) return "growth";
  if (text.includes("recomendaciones")) return "growth";

  return "target";
}

function getBottleneckPainText(bottleneck: string) {
  const text = bottleneck.toLowerCase();

  if (text.includes("oferta") || text.includes("servicios")) {
    return "Cuando tu oferta no se entiende rápido, el cliente no siempre pregunta para aclararse. Muchas veces simplemente compara por precio, pospone la decisión o se va con otra opción que le resulta más fácil de entender.";
  }

  if (text.includes("posicionamiento")) {
    return "Cuando no queda claro qué haces, para quién eres y por qué deberían elegirte, puedes estar perdiendo oportunidades sin darte cuenta. El problema no siempre es falta de interés, sino falta de claridad.";
  }

  if (text.includes("cliente ideal")) {
    return "Cuando no tienes claro a quién quieres atraer, el mensaje se vuelve demasiado general. Eso puede traer contactos poco cualificados, conversaciones largas y pocas decisiones reales.";
  }

  if (text.includes("seguimiento")) {
    return "Cuando el seguimiento no está ordenado, muchas oportunidades se enfrían aunque al principio hubiera interés. Esto puede hacer que pierdas ventas que ya estaban parcialmente abiertas.";
  }

  if (text.includes("captación") || text.includes("recomendaciones")) {
    return "Cuando las oportunidades dependen demasiado de recomendaciones o acciones sueltas, el crecimiento se vuelve poco previsible. Puedes tener buenos clientes, pero no un sistema estable para atraer más.";
  }

  if (text.includes("contenido")) {
    return "Cuando el contenido no está conectado con una intención comercial clara, puedes estar publicando sin que eso se traduzca en más conversaciones, más confianza o más clientes.";
  }

  if (text.includes("operación") || text.includes("persona")) {
    return "Cuando todo depende demasiado de una sola persona, el negocio puede funcionar, pero queda limitado. Cualquier pausa, carga de trabajo o falta de tiempo afecta directamente al crecimiento.";
  }

  if (text.includes("automatización") || text.includes("ia")) {
    return "Cuando se intenta automatizar sin tener claro el proceso, la herramienta no soluciona el problema. Solo hace más rápido algo que todavía no está bien ordenado.";
  }

  return "Esta parte puede estar afectando más de lo que parece. Cuando el problema no se identifica bien, es fácil invertir esfuerzo en acciones que no corrigen la causa real.";
}

function getProblemPainText(problem: string) {
  const text = problem.toLowerCase();

  if (text.includes("posicionamiento")) {
    return "Puede hacer que el mercado no entienda rápido qué haces, para quién eres y por qué tu servicio debería importarle. Cuando eso pasa, muchas personas interesadas no dan el siguiente paso.";
  }

  if (text.includes("cliente ideal")) {
    return "Puede provocar mensajes demasiado generales, contenido poco enfocado y conversaciones con personas que no encajan realmente con lo que quieres vender.";
  }

  if (text.includes("diferenciación")) {
    return "Cuando tu propuesta se parece demasiado a otras, el cliente termina comparando por precio. El problema no es vender más, sino no estar dando motivos claros para elegirte.";
  }

  if (text.includes("oferta") || text.includes("propuesta")) {
    return "Si el cliente necesita hacer demasiado esfuerzo para entender lo que ofreces, es más probable que retrase la decisión o elija una alternativa más clara.";
  }

  if (text.includes("seguimiento")) {
    return "Algunas oportunidades pueden mostrar interés inicial, pero sin un seguimiento claro muchas terminan enfriándose antes de tomar una decisión.";
  }

  if (text.includes("recomendaciones")) {
    return "Las recomendaciones son valiosas, pero si son la fuente principal de clientes, el crecimiento queda condicionado a algo que no controlas.";
  }

  if (text.includes("contenido")) {
    return "Puedes estar dedicando tiempo a publicar sin que ese esfuerzo ayude realmente a atraer clientes adecuados o a generar conversaciones comerciales.";
  }

  if (text.includes("perfil digital")) {
    return "Tu perfil puede estar recibiendo visitas, pero si no transmite rápido qué haces y por qué deberían confiar en ti, esas visitas se pierden sin dejar rastro.";
  }

  if (text.includes("operación") || text.includes("persona")) {
    return "Si todo depende de ti, el negocio puede quedarse atascado aunque haya demanda. El límite deja de ser el mercado y empieza a ser tu capacidad de sostenerlo todo.";
  }

  if (text.includes("automatización")) {
    return "Automatizar antes de ordenar puede crear más confusión. La tecnología ayuda cuando el proceso está claro; si no, solo acelera el desorden.";
  }

  return "Esta señal puede estar provocando que pierdas oportunidades sin darte cuenta. Muchas veces el negocio no falla por falta de trabajo, sino porque el esfuerzo está puesto en el lugar equivocado.";
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