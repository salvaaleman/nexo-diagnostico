"use client";

import { useState } from "react";
import Link from "next/link";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";
import type { DiagnosticPattern } from "@/lib/diagnostic/patterns";
import type { InternalEval } from "@/lib/internal-fields";
import type { Card6to9Data } from "@/lib/diagnostic/cards6to9";
import { toMarkdown } from "@/lib/export";
import { runNexoEngine } from "@/lib/nexo-engine";
import { generarPdfPresupuestoServicio } from "@/lib/lib/pdf-generator";

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
  cards6to9?: Card6to9Data[];
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
  cards6to9,
  initialInternal,
}: Props) {
  const { patterns, variables, recommendations: r } = diagnosticAnalysis;

  const alertas = initialInternal?.alertas ?? [];
  const notas = initialInternal?.notas ?? "";

  const [copied, setCopied] = useState(false);

  const nexoEngineResult = runNexoEngine(answers);

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

  async function descargarPresupuestoServicio() {
    await generarPdfPresupuestoServicio({
      clientName,
      brand,
      recommendation: {
        ...r,
        recommended_pack:
          nexoEngineResult.recommendedPack as StrategicRecommendation["recommended_pack"],
        pack_reason: nexoEngineResult.recommendationReason,
      },
    });
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
      <DashboardShell
  clientName={clientName}
  brand={brand}
  recommendation={r}
  cards6to9={cards6to9}
>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300/80">
                  Lectura estratégica del diagnóstico
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Bloqueos detectados por NEXO
                </h2>

                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  Estas tarjetas se generan a partir de las respuestas del
                  cliente y ayudan a detectar dónde pueden estar los principales
                  bloqueos del negocio.
                </p>

                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  No son una conclusión cerrada: sirven como guía para revisar
                  mejor la situación, validar lo importante y decidir qué
                  intervención tiene más sentido.
                </p>
              </div>

              <button
                type="button"
                onClick={descargarPresupuestoServicio}
                className="w-full rounded-2xl border border-sky-400/20 bg-sky-400/10 p-5 text-left transition hover:border-sky-300/50 hover:bg-sky-400/15 xl:w-[320px]"
                title="Generar presupuesto del servicio"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200/80">
                  Pack sugerido
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {nexoEngineResult.recommendedPack}
                </p>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-sky-100/70">
                  Clic para generar presupuesto
                </p>
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Motivo de recomendación
              </p>

              <p className="mt-3 text-base leading-relaxed text-slate-200">
                {nexoEngineResult.recommendationReason}
              </p>
            </div>

            {nexoEngineResult.reviewRequired.length > 0 && (
              <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                      Revisión humana requerida
                    </p>

                    <p className="mt-2 text-base leading-relaxed text-amber-50/90">
                      NEXO ha detectado puntos que necesitan validación de
                      Salvador antes de convertirlos en recomendación definitiva.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {nexoEngineResult.reviewRequired.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-xl border border-amber-400/25 bg-black/20 p-4"
                    >
                      <p className="text-base font-semibold text-white">
                        {card.title}
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-amber-100/85">
                        Revisar: {card.reviewType ?? "criterio consultor"}.
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-amber-100/75">
                        Esta tarjeta no debería darse por cerrada sin una
                        validación manual previa.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tarjetas detectadas
              </p>

              {nexoEngineResult.activeCards.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-base text-slate-300">
                    NEXO todavía no detecta suficiente contexto para activar una
                    tarjeta principal.
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid gap-5 xl:grid-cols-3">
                  {nexoEngineResult.activeCards.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/70">
                            {card.area.replace(/_/g, " ")}
                          </p>

                          <h3 className="mt-2 text-xl font-semibold leading-snug text-white">
                            {card.title}
                          </h3>
                        </div>

                        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-200">
                          Detectada
                        </span>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Qué está ocurriendo
                          </p>

                          <p className="mt-2 text-base leading-relaxed text-slate-200">
                            {card.dashboardText}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Por qué es importante
                          </p>

                          <p className="mt-2 text-base leading-relaxed text-slate-300">
                            {card.risk}
                          </p>
                        </div>
                      </div>

                      {card.requiresHumanReview && (
                        <div className="mt-5 rounded-xl border border-amber-400/35 bg-amber-400/10 px-4 py-3">
                          <p className="text-sm font-semibold text-amber-100">
                            Requiere validación de Salvador
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ExecutiveGrid recommendations={r} cards6to9={cards6to9} />
        </div>
      </DashboardShell>
    );
  }

  return (
    <div
      className="min-h-screen text-[#1F2937]"
      style={{ background: "#F4F6F9", fontFamily: "system-ui, sans-serif" }}
    >
      <header
        className="border-b border-[#E5E7EB] px-6 py-4"
        style={{ background: "#F4F6F9" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#2563EB" }}
              >
                Nexo IA · Dashboard Consultor
              </span>

              <span className="text-[#D1D5DB] text-xs">|</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  status === "completado"
                    ? "bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]"
                    : "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
                }`}
              >
                {STATUS_LABELS[status] ?? status}
              </span>
            </div>

            <h1 className="text-2xl font-bold mt-1 truncate text-[#111827]">
              {clientName}
              {brand && (
                <span className="text-[#9CA3AF] font-normal ml-2 text-xl">
                  · {brand}
                </span>
              )}
            </h1>

            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {formatDate(createdAt)}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap shrink-0">
            <Link
              href={`/clients/${clientId}`}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB] transition-colors"
            >
              ← Volver
            </Link>

            <Link
              href={`/diagnoses/${id}/interno`}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB] transition-colors"
            >
              Vista interna
            </Link>

            <button
              onClick={copiarMarkdown}
              disabled={!initialInternal}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB] transition-colors disabled:opacity-30"
            >
              {copied ? "Copiado ✓" : "Copiar Markdown"}
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
                  <p className="text-sm text-[#9CA3AF]">
                    Sin respuestas registradas.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-3">
                  {Object.entries(answers).map(([key, value]) => (
                    <Card key={key} className="py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
                        {formatQuestionKey(key)}
                      </p>

                      <p className="text-sm text-[#4B5563] leading-snug whitespace-pre-wrap">
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
                    <p className="text-sm text-[#9CA3AF]">
                      No se detectaron patrones con las respuestas actuales.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(problemsByArea).map(([area, problems]) => (
                      <Card key={area}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                          {area}
                        </p>

                        <ul className="space-y-2">
                          {problems.map((p) => (
                            <li
                              key={p}
                              className="flex gap-2 text-sm text-[#4B5563]"
                            >
                              <span className="text-[#D97706] mt-0.5 shrink-0">
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
                    <p className="text-sm text-[#9CA3AF]">
                      No se detectaron fortalezas destacables.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {r.active_strengths.map((s) => (
                      <Card key={s} className="flex gap-3 items-start">
                        <span className="text-[#059669] mt-0.5 shrink-0 text-base">
                          ✦
                        </span>

                        <p className="text-sm text-[#4B5563] leading-snug">
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
                <p className="text-sm text-[#6B7280] mb-3 leading-snug">
                  {r.summary}
                </p>

                <div className="border-t border-[#E5E7EB] pt-4">
                  {r.strategic_explanation ? (
                    <div className="space-y-3">
                      {r.strategic_explanation
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <p
                            key={i}
                            className="text-base text-[#1F2937] leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#9CA3AF]">
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
                        <span className="text-[#4B5563] font-medium text-sm">
                          {p.name}
                        </span>

                        <span className="text-xs text-[#9CA3AF]">·</span>

                        <span className="text-xs text-[#9CA3AF]">
                          severidad {p.severity}
                        </span>

                        <span className="text-xs text-[#9CA3AF]">·</span>

                        <span className="text-xs text-[#9CA3AF]">
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
                  <p className="text-sm text-[#9CA3AF]">
                    No hay prioridades definidas.
                  </p>
                </Card>
              ) : (
                <div className="relative pl-8">
                  <div className="absolute left-3 top-3 bottom-3 w-px bg-[#E5E7EB]" />

                  <div className="space-y-6">
                    {r.priority_plan.map((item, i) => (
                      <div key={`${item.title}-${i}`} className="relative">
                        <div
                          className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border"
                          style={{
                            background: "#FFFFFF",
                            borderColor: "#2563EB",
                            color: "#2563EB",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        <Card>
                          <p className="text-sm font-semibold text-[#1F2937] mb-1">
                            {item.title}
                          </p>

                          <p className="text-sm text-[#6B7280] leading-snug">
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
                  background: "#EFF6FF",
                  borderColor: "#BFDBFE",
                }}
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-[#1F2937]">
                    {nextAction}
                  </p>

                  <p className="text-sm text-[#6B7280] mt-1">
                    Intervención:{" "}
                    <span className="text-[#2563EB]">
                      {r.recommended_pack}
                    </span>
                    {" · "}
                    Prioridad:{" "}
                    <span
                      className={
                        r.priority === "alta"
                          ? "text-[#DC2626]"
                          : r.priority === "media"
                          ? "text-[#D97706]"
                          : "text-[#059669]"
                      }
                    >
                      {r.priority}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 flex-wrap">
                  <Link
                    href={`/diagnoses/${id}/interno`}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB] transition-colors"
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
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                  Señales de alerta
                </p>

                {alertas.length === 0 ? (
                  <p className="text-sm text-[#9CA3AF] italic">
                    Sin alertas registradas
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {alertas.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-full text-xs font-medium border bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                      >
                        ⚠ {a}
                      </span>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
                  Notas internas
                </p>

                {notas ? (
                  <p className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
                    {notas}
                  </p>
                ) : (
                  <p className="text-sm text-[#9CA3AF] italic">
                    Sin notas guardadas
                  </p>
                )}
              </Card>
            </div>

            <div className="mt-4">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
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
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#E5E7EB] text-[#9CA3AF] cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-[#9CA3AF] mt-3">
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