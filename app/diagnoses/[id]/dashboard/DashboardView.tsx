"use client";

import { useState } from "react";
import Link from "next/link";
import { pdf } from "@react-pdf/renderer";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";
import type { DiagnosticPattern } from "@/lib/diagnostic/patterns";
import type { InternalEval } from "@/lib/internal-fields";
import { NexoClientReport } from "@/lib/diagnostic/NexoClientReport";
import { toMarkdown } from "@/lib/export";

import Card from "./components/shared/Card";
import SectionTitle from "./components/shared/SectionTitle";
import AccordionSection from "./components/shared/AccordionSection";
import BottleNeckCard from "./components/level-0/BottleNeckCard";
import MaturityGauge from "./components/level-0/MaturityGauge";
import PriorityBadge from "./components/level-0/PriorityBadge";
import InterventionCard from "./components/level-0/InterventionCard";
import AreaMap from "./components/level-0/AreaMap";
import FocusChips from "./components/level-0/FocusChips";

import DashboardShell from "./components/layout/DashboardShell";
import ExecutiveGrid from "./components/level-0/ExecutiveGrid";

type Answers = Record<string, unknown>;

interface DiagnosticAnalysis {
  patterns: DiagnosticPattern[];
  variables: Record<string, { score: number; signals: string[] }>;
  recommendations: StrategicRecommendation;
  analyzed_at: string;
}

interface Props {
  id: string;
  clientId: string;
  clientName: string;
  brand: string | null;
  status: string;
  createdAt: string | null;
  answers: Answers;
  diagnosticAnalysis: DiagnosticAnalysis;
  initialInternal: InternalEval | null;
}

const AREAS = [
  { key: "Oferta", vars: ["propuesta_valor", "diferenciacion"] },
  { key: "Cliente", vars: ["cliente_ideal"] },
  { key: "Mensaje", vars: ["claridad_mensaje"] },
  { key: "Captación", vars: ["captacion"] },
  { key: "Contenido", vars: ["contenido"] },
  { key: "Conversión", vars: ["conversion", "seguimiento"] },
  { key: "Sistemas", vars: ["sistemas"] },
  { key: "IA", vars: ["ia"] },
];

function getAreaScore(
  variables: DiagnosticAnalysis["variables"],
  vars: string[]
): number {
  return vars.reduce((acc, v) => acc + (variables[v]?.score ?? 0), 0);
}

function safeFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(iso: string | null) {
  if (!iso) return new Date().toLocaleDateString("es-ES");
  return new Date(iso).toLocaleDateString("es-ES");
}

const STATUS_LABELS: Record<string, string> = {
  borrador: "Borrador",
  completado: "Completado",
  en_proceso: "En proceso",
};

function formatAnswer(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function formatQuestionKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export default function DashboardView({
  id,
  clientId,
  clientName,
  brand,
  status,
  createdAt,
  answers,
  diagnosticAnalysis,
  initialInternal,
}: Props) {
  const { patterns, variables, recommendations: r } = diagnosticAnalysis;

  const alertas = initialInternal?.alertas ?? [];
  const notas = initialInternal?.notas ?? "";

  const [copied, setCopied] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const areaScores = AREAS.map((a) => ({
    key: a.key,
    score: getAreaScore(variables, a.vars),
  }));

  const maxScore = Math.max(...areaScores.map((a) => a.score), 1);

  async function copiarMarkdown() {
    if (!initialInternal) return;
    const md = toMarkdown(clientName, brand, answers, initialInternal);
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function generarPdfCliente() {
    if (!initialInternal) return;

    setGeneratingPdf(true);

    const date = new Date().toLocaleDateString("es-ES");

    const blob = await pdf(
      <NexoClientReport
        clientName={clientName}
        brand={brand}
        date={date}
        recommendation={initialInternal.recommendation}
        alertas={initialInternal.alertas}
        notas={initialInternal.notas}
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

  const problemsByArea: Record<string, string[]> = {};

  r.main_problems.forEach((p) => {
    let area = "Otros";

    if (/oferta|servicio|catálogo/i.test(p)) area = "Oferta";
    else if (/propuesta|valor/i.test(p)) area = "Oferta";
    else if (/cliente|público|nicho/i.test(p)) area = "Cliente";
    else if (/mensaje|explicar|comunica/i.test(p)) area = "Mensaje";
    else if (/captación|captar|tráfico/i.test(p)) area = "Captación y sistema";
    else if (/contenido/i.test(p)) area = "Captación y sistema";
    else if (/conversión|seguimiento|venta/i.test(p)) area = "Captación y sistema";
    else if (/sistema|proceso|automatiz/i.test(p)) area = "Captación y sistema";
    else if (/ia|inteligencia/i.test(p)) area = "Captación y sistema";

    if (!problemsByArea[area]) problemsByArea[area] = [];
    problemsByArea[area].push(p);
  });

  let nextAction = "Preparar propuesta y presentar intervención recomendada";

  if (r.recommended_pack === "No apto todavía") {
    nextAction = "Completar el diagnóstico antes de proponer intervención";
  } else if (r.priority === "alta") {
    nextAction = "Presentar intervención recomendada hoy — urgencia alta";
  }

  const useExecutivePreview = true;

  if (useExecutivePreview) {
    return (
      <DashboardShell clientName={clientName}>
        <ExecutiveGrid recommendations={r} />
      </DashboardShell>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#00002f", fontFamily: "system-ui, sans-serif" }}
    >
      <header
        className="border-b border-white/10 px-6 py-4"
        style={{ background: "#00002f" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#27a7de" }}
              >
                Nexo IA · Dashboard Consultor
              </span>

              <span className="text-white/20 text-xs">|</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  status === "completado"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}
              >
                {STATUS_LABELS[status] ?? status}
              </span>
            </div>

            <h1 className="text-2xl font-bold mt-1 truncate">
              {clientName}
              {brand && (
                <span className="text-white/40 font-normal ml-2 text-xl">
                  · {brand}
                </span>
              )}
            </h1>

            <p className="text-xs text-white/30 mt-0.5">
              {formatDate(createdAt)}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap shrink-0">
            <Link
              href={`/clients/${clientId}`}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              ← Volver
            </Link>

            <Link
              href={`/diagnoses/${id}/interno`}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              Vista interna
            </Link>

            <button
              onClick={copiarMarkdown}
              disabled={!initialInternal}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white/60 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30"
            >
              {copied ? "Copiado ✓" : "Copiar Markdown"}
            </button>

            <button
              onClick={generarPdfCliente}
              disabled={!initialInternal || generatingPdf}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-30"
              style={{ background: "#0c7ec4", color: "#fff" }}
            >
              {generatingPdf ? "Generando…" : "PDF Cliente"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <BottleNeckCard bottleneck={r.main_bottleneck} />

            <div>
              <SectionTitle>Mapa de áreas</SectionTitle>
              <AreaMap areas={areaScores} maxScore={maxScore} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              <MaturityGauge level={r.maturity_level} />
              <PriorityBadge priority={r.priority} reason={r.pack_reason} />
              <InterventionCard pack={r.recommended_pack} />
            </div>

            {r.recommended_focus.length > 0 && (
              <div>
                <SectionTitle>Foco recomendado</SectionTitle>
                <FocusChips focuses={r.recommended_focus} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <AccordionSection title="Centro de evidencias" defaultOpen>
            <div>
              <SectionTitle>Respuestas del cliente</SectionTitle>

              {Object.keys(answers).length === 0 ? (
                <Card>
                  <p className="text-sm text-white/30">
                    Sin respuestas registradas.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-3">
                  {Object.entries(answers).map(([key, value]) => (
                    <Card key={key} className="py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                        {formatQuestionKey(key)}
                      </p>

                      <p className="text-sm text-white/80 leading-snug whitespace-pre-wrap">
                        {formatAnswer(value)}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <SectionTitle>Problemas detectados</SectionTitle>

                {Object.keys(problemsByArea).length === 0 ? (
                  <Card>
                    <p className="text-sm text-white/30">
                      No se detectaron patrones con las respuestas actuales.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(problemsByArea).map(([area, problems]) => (
                      <Card key={area}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                          {area}
                        </p>

                        <ul className="space-y-2">
                          {problems.map((p) => (
                            <li
                              key={p}
                              className="flex gap-2 text-sm text-white/70"
                            >
                              <span className="text-amber-400 mt-0.5 shrink-0">
                                ▸
                              </span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <SectionTitle>Fortalezas activas</SectionTitle>

                {r.active_strengths.length === 0 ? (
                  <Card>
                    <p className="text-sm text-white/30">
                      No se detectaron fortalezas destacables.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {r.active_strengths.map((s) => (
                      <Card key={s} className="flex gap-3 items-start">
                        <span className="text-emerald-400 mt-0.5 shrink-0 text-base">
                          ✦
                        </span>

                        <p className="text-sm text-white/80 leading-snug">
                          {s}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <SectionTitle>Lectura estratégica</SectionTitle>

              <Card>
                <p className="text-sm text-white/40 mb-3 leading-snug">
                  {r.summary}
                </p>

                <div className="border-t border-white/10 pt-4">
                  {r.strategic_explanation ? (
                    <div className="space-y-3">
                      {r.strategic_explanation
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <p
                            key={i}
                            className="text-base text-white/85 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/30">
                      Sin análisis disponible.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {patterns.length > 0 && (
              <div>
                <SectionTitle>Patrones detectados</SectionTitle>

                <div className="space-y-2">
                  {patterns.map((p, i) => (
                    <Card key={i} className="py-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white/50 font-medium text-sm">
                          {p.name}
                        </span>

                        <span className="text-xs text-white/30">·</span>

                        <span className="text-xs text-white/30">
                          severidad {p.severity}
                        </span>

                        <span className="text-xs text-white/30">·</span>

                        <span className="text-xs text-white/30">
                          {p.matched_variables.join(", ")}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </AccordionSection>

          <AccordionSection title="Plan de acción">
            <div>
              <SectionTitle>Prioridades</SectionTitle>

              {r.priority_plan.length === 0 ? (
                <Card>
                  <p className="text-sm text-white/30">
                    No hay prioridades definidas.
                  </p>
                </Card>
              ) : (
                <div className="relative pl-8">
                  <div className="absolute left-3 top-3 bottom-3 w-px bg-white/10" />

                  <div className="space-y-6">
                    {r.priority_plan.map((item, i) => (
                      <div key={`${item.title}-${i}`} className="relative">
                        <div
                          className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border"
                          style={{
                            background: "#00002f",
                            borderColor: "#0c7ec4",
                            color: "#27a7de",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        <Card>
                          <p className="text-sm font-semibold text-white mb-1">
                            {item.title}
                          </p>

                          <p className="text-sm text-white/50 leading-snug">
                            {item.reason}
                          </p>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <SectionTitle>Próxima acción recomendada</SectionTitle>

              <div
                className="rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                style={{
                  background: "rgba(12,126,196,0.08)",
                  borderColor: "rgba(39,167,222,0.25)",
                }}
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">
                    {nextAction}
                  </p>

                  <p className="text-sm text-white/40 mt-1">
                    Intervención:{" "}
                    <span className="text-[#27a7de]">
                      {r.recommended_pack}
                    </span>
                    {" · "}
                    Prioridad:{" "}
                    <span
                      className={
                        r.priority === "alta"
                          ? "text-red-400"
                          : r.priority === "media"
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }
                    >
                      {r.priority}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={generarPdfCliente}
                    disabled={!initialInternal || generatingPdf}
                    className="px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-30 transition-opacity hover:opacity-90"
                    style={{ background: "#0c7ec4", color: "#fff" }}
                  >
                    {generatingPdf ? "Generando…" : "Generar PDF"}
                  </button>

                  <Link
                    href={`/diagnoses/${id}/interno`}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                  >
                    Editar evaluación
                  </Link>
                </div>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Panel interno">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                  Señales de alerta
                </p>

                {alertas.length === 0 ? (
                  <p className="text-sm text-white/25 italic">
                    Sin alertas registradas
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {alertas.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-500/15 text-red-300 border-red-500/25"
                      >
                        ⚠ {a}
                      </span>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                  Notas internas
                </p>

                {notas ? (
                  <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                    {notas}
                  </p>
                ) : (
                  <p className="text-sm text-white/25 italic">
                    Sin notas guardadas
                  </p>
                )}
              </Card>
            </div>

            <div className="mt-4">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                  Estado comercial
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Pendiente",
                    "Propuesta enviada",
                    "Aceptado",
                    "Descartado",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/30 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-white/20 mt-3">
                  Estado comercial configurable desde la vista interna
                  (próximamente)
                </p>
              </Card>
            </div>
          </AccordionSection>
        </div>
      </main>
    </div>
  );
}