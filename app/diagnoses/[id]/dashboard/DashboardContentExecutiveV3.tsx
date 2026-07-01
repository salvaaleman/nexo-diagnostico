
"use client";

import type { ReactNode } from "react";
import type { InternalEval } from "@/lib/internal-fields";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";

type Props = {
  id: string;
  clientId: string;
  clientName: string;
  brand: string | null;
  status: string;
  createdAt: string | null;
  answers: Record<string, unknown>;
  diagnosticReport: DiagnosticReport;
  diagnosticV2: any;
  initialInternal: InternalEval | null;
};

type Tone = "critico" | "atencion" | "correcto" | "estable" | "neutral";

type AreaInsight = {
  key: string;
  number: string;
  title: string;
  status: "Sólido" | "Estable" | "Necesita atención" | "Crítico";
  tone: Tone;
  summary: string;
  impact: string;
  findings: {
    title: string;
    text: string;
  }[];
};

const COMPLETE_DIAGNOSTIC_URL =
  "https://buy.stripe.com/9B64gA1Jl7sX04h6re0Ba01";

function formatDate(value: string | null) {
  if (!value) return "No disponible";

  try {
    return new Date(value).toLocaleDateString("es-ES");
  } catch {
    return "No disponible";
  }
}

function getStatusLabel(status: string) {
  if (status === "completed") return "Completado";
  if (status === "draft") return "Borrador";
  if (status === "pending") return "Pendiente";
  if (status === "borrador") return "Borrador";

  return status || "No disponible";
}

function getPriorityTone(priority: string): Tone {
  if (priority === "alta") return "critico";
  if (priority === "media") return "atencion";
  if (priority === "baja") return "estable";

  return "neutral";
}

function getRootCauseValue(rootCause: any, fallback = "No disponible") {
  return (
    rootCause?.title ||
    rootCause?.titulo ||
    rootCause?.name ||
    rootCause?.label ||
    fallback
  );
}

function getRootCauseDescription(rootCause: any, fallback = "No disponible") {
  return (
    rootCause?.description ||
    rootCause?.descripcion ||
    rootCause?.reasoning ||
    rootCause?.explanation ||
    rootCause?.summary ||
    fallback
  );
}

function normalizeScore(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreToStatus(score: number | null): AreaInsight["status"] {
  if (score === null) return "Necesita atención";
  if (score >= 80) return "Sólido";
  if (score >= 65) return "Estable";
  if (score >= 45) return "Necesita atención";
  return "Crítico";
}

function scoreToTone(score: number | null): Tone {
  if (score === null) return "atencion";
  if (score >= 80) return "correcto";
  if (score >= 65) return "estable";
  if (score >= 45) return "atencion";
  return "critico";
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const className =
    tone === "critico"
      ? "bg-red-50 text-red-700 ring-red-200"
      : tone === "atencion"
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : tone === "correcto"
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : tone === "estable"
            ? "bg-sky-50 text-sky-700 ring-sky-200"
            : "bg-slate-100 text-slate-600 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ring-1 ${className}`}
    >
      {children}
    </span>
  );
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#1A6BB5]">
      {children}
    </p>
  );
}

function PrimaryButton({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "light";
}) {
  const className =
    variant === "light"
      ? "bg-white text-[#0F1B2D] hover:bg-[#EAF6FF]"
      : "bg-[#1A6BB5] text-white hover:bg-[#2E9ED6]";

  return (
    <a
      href={COMPLETE_DIAGNOSTIC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-sm transition ${className}`}
    >
      {children}
    </a>
  );
}

function ExecutiveMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-l border-[#D7E4F2] pl-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7C93]">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold text-[#0F1B2D]">{value}</p>
    </div>
  );
}

function TopMeta({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-[#D7E4F2] py-2 last:border-b-0">
      <p className="text-sm text-[#6B7C93]">{label}</p>
      <p className="text-right text-sm font-bold text-[#0F1B2D]">{value}</p>
    </div>
  );
}

function buildAreaInsights(diagnosticReport: DiagnosticReport): AreaInsight[] {
  const scores = ((diagnosticReport as any).globalScores || {}) as Record<
    string,
    unknown
  >;

  const base: Omit<AreaInsight, "status" | "tone">[] = [
    {
      key: "claridad",
      number: "01",
      title: "Claridad estratégica",
      summary:
        "Evalúa si el negocio comunica con precisión qué ofrece, para quién es y por qué debería ser elegido.",
      impact:
        "Cuando la claridad no está completamente resuelta, el cliente tarda más en entender el valor y el negocio depende demasiado de explicaciones personales.",
      findings: [
        {
          title: "Qué detectamos",
          text: "La propuesta necesita revisarse para comprobar si comunica con suficiente precisión el problema que resuelve, el resultado que promete y su diferencia frente a otras opciones.",
        },
        {
          title: "Qué significa",
          text: "El negocio puede estar haciendo acciones comerciales, publicando o captando atención, pero dejando dudas en el recorrido de decisión.",
        },
        {
          title: "Qué puede provocar",
          text: "Más objeciones, menor conversión, conversaciones más largas y dificultad para escalar campañas o contenido.",
        },
        {
          title: "Qué revisar primero",
          text: "La promesa principal, la estructura de la oferta y el mensaje que recibe el cliente antes de contactar.",
        },
      ],
    },
    {
      key: "captacion",
      number: "02",
      title: "Captación",
      summary:
        "Analiza si el negocio genera oportunidades de forma constante o depende de acciones aisladas.",
      impact:
        "La captación no es solo visibilidad. Es la capacidad de convertir atención en oportunidades reales con una entrada previsible.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existen canales definidos, una propuesta clara para captar demanda y un sistema mínimo de generación de oportunidades.",
        },
        {
          title: "Qué significa",
          text: "El negocio puede estar visible, pero no necesariamente estar captando contactos cualificados de forma constante.",
        },
        {
          title: "Qué puede provocar",
          text: "Meses irregulares, dependencia de recomendaciones, presión por publicar más y dificultad para saber qué acción genera clientes.",
        },
        {
          title: "Qué revisar primero",
          text: "Qué canal trae mejores oportunidades, qué mensaje se está usando y si existe una llamada a la acción clara.",
        },
      ],
    },
    {
      key: "conversion",
      number: "03",
      title: "Conversión",
      summary:
        "Mide si el interés inicial termina transformándose en clientes reales.",
      impact:
        "Muchos negocios no pierden por falta de visibilidad, sino por pérdida de oportunidades entre el primer contacto y la decisión.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que observar si el proceso comercial ayuda al cliente a decidir o si deja demasiadas dudas abiertas durante la conversación.",
        },
        {
          title: "Qué significa",
          text: "Puede existir interés real, pero no un recorrido suficientemente claro para que ese interés avance hacia una decisión.",
        },
        {
          title: "Qué puede provocar",
          text: "Conversaciones largas, clientes que desaparecen, propuestas sin respuesta y sensación de falta de insistencia.",
        },
        {
          title: "Qué revisar primero",
          text: "Cómo se presenta la oferta, qué objeciones aparecen y qué seguimiento recibe cada oportunidad.",
        },
      ],
    },
    {
      key: "seguimiento",
      number: "04",
      title: "Seguimiento",
      summary:
        "Evalúa si las oportunidades se conservan, se clasifican y se recuperan correctamente.",
      impact:
        "El seguimiento suele ser uno de los puntos donde más valor se pierde después del primer contacto.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existe un flujo definido o si cada conversación depende de memoria, intuición o disponibilidad.",
        },
        {
          title: "Qué significa",
          text: "Sin seguimiento, el negocio puede perder oportunidades que sí tenían interés pero necesitaban más tiempo.",
        },
        {
          title: "Qué puede provocar",
          text: "Pérdida de leads, baja conversión, dependencia del propietario y lectura falsa de que la captación no funciona.",
        },
        {
          title: "Qué revisar primero",
          text: "Cómo se registran los contactos, cómo se clasifican y qué secuencia mínima se aplica tras el primer interés.",
        },
      ],
    },
    {
      key: "procesos",
      number: "05",
      title: "Procesos",
      summary:
        "Revisa si el negocio funciona con estructura o si depende demasiado de esfuerzo, memoria y resolución manual.",
      impact:
        "Sin procesos claros, el crecimiento aumenta la carga operativa en lugar de aumentar la capacidad real del negocio.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Conviene revisar si las tareas clave están definidas, documentadas y ordenadas o si cada caso se gestiona de forma distinta.",
        },
        {
          title: "Qué significa",
          text: "El negocio puede estar funcionando, pero con una estructura débil que limita su capacidad de escalar.",
        },
        {
          title: "Qué puede provocar",
          text: "Errores repetidos, retrasos, dependencia del propietario y pérdida de control cuando aumenta la demanda.",
        },
        {
          title: "Qué revisar primero",
          text: "El recorrido desde que entra un contacto hasta que se convierte en cliente y recibe el servicio.",
        },
      ],
    },
    {
      key: "automatizacion",
      number: "06",
      title: "Automatización",
      summary:
        "Determina si la tecnología está ayudando a ordenar el sistema o si todavía falta criterio antes de automatizar.",
      impact:
        "Automatizar sin orden previo puede escalar el desorden. La automatización debe reforzar procesos claros, no sustituirlos.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que identificar qué tareas se repiten, cuáles consumen tiempo y cuáles deberían seguir dependiendo de criterio humano.",
        },
        {
          title: "Qué significa",
          text: "La tecnología puede aportar eficiencia, pero solo si se aplica sobre una estructura comercial y operativa bien definida.",
        },
        {
          title: "Qué puede provocar",
          text: "Herramientas infrautilizadas, automatizaciones que no convierten y sensación de complejidad innecesaria.",
        },
        {
          title: "Qué revisar primero",
          text: "Captura de contactos, seguimiento, recordatorios, clasificación de oportunidades y tareas repetitivas.",
        },
      ],
    },
    {
      key: "direccion",
      number: "07",
      title: "Dirección",
      summary:
        "Analiza si existen prioridades claras o si el negocio avanza por acumulación de tareas, urgencias y decisiones reactivas.",
      impact:
        "La dirección estratégica define qué se corrige primero. Sin prioridades, cualquier acción parece válida.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si el negocio tiene objetivos concretos, indicadores mínimos y decisiones priorizadas para los próximos meses.",
        },
        {
          title: "Qué significa",
          text: "Puede existir mucha actividad, pero no necesariamente una secuencia clara de mejora.",
        },
        {
          title: "Qué puede provocar",
          text: "Dispersión, cambios constantes, desgaste operativo y dificultad para evaluar si se está avanzando.",
        },
        {
          title: "Qué revisar primero",
          text: "Objetivo principal, restricción más importante y criterio para decidir qué no se hará todavía.",
        },
      ],
    },
    {
      key: "nivelAlerta",
      number: "08",
      title: "Nivel de alerta",
      summary:
        "Resume la presión general del sistema y el riesgo de que varios puntos débiles se estén acumulando al mismo tiempo.",
      impact:
        "El nivel de alerta no señala un único problema. Indica si el negocio necesita intervención ordenada antes de seguir ejecutando más acciones.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Conviene observar si los problemas de captación, conversión, seguimiento y procesos están conectados entre sí.",
        },
        {
          title: "Qué significa",
          text: "Cuando varias áreas se debilitan a la vez, el negocio suele interpretar síntomas sueltos en lugar de ver el patrón completo.",
        },
        {
          title: "Qué puede provocar",
          text: "Decisiones improvisadas, inversión mal dirigida y acumulación de tareas que no atacan la causa raíz.",
        },
        {
          title: "Qué revisar primero",
          text: "La relación entre oferta, captación, proceso comercial y seguimiento posterior.",
        },
      ],
    },
  ];

  return base.map((area) => {
    const score = normalizeScore(scores[area.key]);

    return {
      ...area,
      status: scoreToStatus(score),
      tone: scoreToTone(score),
    };
  });
}

function getPriorities(diagnosticReport: DiagnosticReport) {
  const report = diagnosticReport as any;

  const source =
    report.priorities ||
    report.prioridades ||
    report.actionPriorities ||
    report.recommendedPriorities ||
    [];

  if (Array.isArray(source) && source.length > 0) {
    return source.slice(0, 4).map((item: any, index: number) => ({
      title:
        item?.title ||
        item?.titulo ||
        item?.name ||
        `Prioridad ${String(index + 1).padStart(2, "0")}`,
      description:
        item?.description ||
        item?.descripcion ||
        item?.summary ||
        item?.text ||
        "Revisar esta prioridad en la sesión estratégica para definir la intervención correcta.",
      priority: item?.priority || item?.prioridad || item?.level || "media",
    }));
  }

  return [
    {
      title: "Ordenar el sistema comercial",
      description:
        "Revisar cómo entra una oportunidad, cómo se clasifica, qué mensaje recibe y qué pasos existen hasta la decisión.",
      priority: "alta",
    },
    {
      title: "Clarificar la propuesta principal",
      description:
        "Reducir ambigüedad en oferta, promesa, público objetivo y argumento de elección.",
      priority: "alta",
    },
    {
      title: "Definir seguimiento mínimo",
      description:
        "Crear un flujo simple para no perder oportunidades después del primer contacto.",
      priority: "media",
    },
    {
      title: "Separar síntomas de causa raíz",
      description:
        "Evitar actuar sobre problemas aislados antes de entender qué área está condicionando al resto.",
      priority: "media",
    },
  ];
}

function getRoadmap() {
  return [
    {
      phase: "01",
      title: "Lectura estratégica",
      text: "Interpretar las señales principales del diagnóstico y separar síntomas visibles de restricciones reales.",
    },
    {
      phase: "02",
      title: "Priorización",
      text: "Definir qué área debe corregirse primero para evitar dispersión y acciones de bajo impacto.",
    },
    {
      phase: "03",
      title: "Intervención",
      text: "Diseñar una secuencia concreta de ajustes en oferta, captación, conversión, seguimiento o procesos.",
    },
    {
      phase: "04",
      title: "Seguimiento",
      text: "Convertir las decisiones en un plan operativo simple, medible y aplicable.",
    },
  ];
}

export default function DashboardContentExecutiveV3({
  id,
  clientId,
  clientName,
  brand,
  status,
  createdAt,
  diagnosticReport,
  diagnosticV2,
  initialInternal,
}: Props) {
  const areas = buildAreaInsights(diagnosticReport);
  const priorities = getPriorities(diagnosticReport);
  const roadmap = getRoadmap();

  const criticalAreas = areas.filter((area) => area.tone === "critico").length;
  const attentionAreas = areas.filter((area) => area.tone === "atencion").length;
  const solidAreas = areas.filter(
    (area) => area.tone === "correcto" || area.tone === "estable",
  ).length;

  const rootCause =
    (diagnosticReport as any)?.rootCause ||
    (diagnosticReport as any)?.causaRaiz ||
    diagnosticV2?.rootCause ||
    diagnosticV2?.causaRaiz ||
    (initialInternal as any)?.rootCause ||
    (initialInternal as any)?.causaRaiz ||
    null;

  return (
    <main className="min-h-screen bg-[#FAFCFF] px-5 py-8 text-[#0F1B2D] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[38px] border border-[#DCEAF7] bg-white shadow-[0_28px_90px_rgba(15,27,45,0.07)]">
          <div className="px-7 pb-8 pt-8 sm:px-10 lg:px-14 lg:pb-16 lg:pt-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="estable">NEXO IA</Badge>
                  <Badge tone="neutral">Executive Report</Badge>
                </div>

                <p className="mt-10 text-xs font-black uppercase tracking-[0.34em] text-[#1A6BB5]">
                  Diagnóstico estratégico empresarial
                </p>

                <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#0F1B2D] sm:text-6xl lg:text-[5.5rem]">
                  Diagnóstico estratégico inicial
                </h1>

                <p className="mt-7 max-w-3xl text-xl leading-9 text-[#43546A]">
                  Lectura ejecutiva del estado actual del negocio para ordenar
                  señales, detectar áreas de atención y convertir información
                  dispersa en prioridades estratégicas.
                </p>
              </div>

              <aside className="rounded-[30px] bg-[#EEF6FD] p-6 ring-1 ring-[#DCEAF7]">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#1A6BB5]">
                  Datos del informe
                </p>
                <TopMeta label="Cliente" value={clientName} />
                <TopMeta label="Marca" value={brand || "No indicada"} />
                <TopMeta label="Estado" value={getStatusLabel(status)} />
                <TopMeta label="Fecha" value={formatDate(createdAt)} />
                <TopMeta label="ID" value={clientId || id} />
              </aside>
            </div>
          </div>

          <div className="border-t border-[#DCEAF7] bg-[#EEF6FD] px-7 py-8 sm:px-10 lg:px-14">
            <div className="grid gap-8 md:grid-cols-3">
              <ExecutiveMetric
                label="Áreas críticas"
                value={`${criticalAreas} detectadas`}
              />
              <ExecutiveMetric
                label="Áreas en atención"
                value={`${attentionAreas} detectadas`}
              />
              <ExecutiveMetric
                label="Áreas estables"
                value={`${solidAreas} detectadas`}
              />
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[34px] bg-[#EEF6FD] px-8 py-12 ring-1 ring-[#DCEAF7] sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
            <div>
              <SectionKicker>Resumen ejecutivo</SectionKicker>
              <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F1B2D]">
                El negocio necesita claridad operativa antes de ampliar la
                ejecución.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#43546A]">
                Este diagnóstico inicial no sustituye una revisión estratégica
                completa. Su función es ordenar las primeras señales, detectar
                dónde puede estar concentrándose la fricción y mostrar qué áreas
                deberían analizarse antes de invertir más tiempo, contenido,
                herramientas o campañas.
              </p>
            </div>

            <aside className="rounded-[30px] bg-white p-7 ring-1 ring-[#DCEAF7]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1A6BB5]">
                Siguiente paso
              </p>
              <h3 className="mt-4 text-2xl font-black leading-tight text-[#0F1B2D]">
                Revisión estratégica personalizada
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#43546A]">
                Convierte esta lectura inicial en una sesión 1:1 para revisar
                causa raíz, prioridades y plan de intervención.
              </p>
              <div className="mt-6">
                <PrimaryButton>Solicitar revisión estratégica</PrimaryButton>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-20">
          <SectionKicker>Diagnóstico por áreas</SectionKicker>
          <div className="overflow-hidden rounded-[34px] bg-white ring-1 ring-[#DCEAF7]">
            {areas.map((area, index) => (
              <article
                key={area.key}
                className={`grid gap-8 border-b border-[#DCEAF7] px-7 py-8 last:border-b-0 sm:px-10 lg:grid-cols-[110px_1fr_190px] lg:px-12 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#EEF6FD]"
                }`}
              >
                <div>
                  <p className="text-3xl font-black tracking-[-0.04em] text-[#1A6BB5]">
                    {area.number}
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black tracking-[-0.04em] text-[#0F1B2D]">
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[#43546A]">
                    {area.summary}
                  </p>

                  <div className="mt-6 border-t border-[#DCEAF7] pt-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6B7C93]">
                      Impacto estratégico
                    </p>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-[#0F1B2D]">
                      {area.impact}
                    </p>
                  </div>
                </div>

                <div className="lg:text-right">
                  <Badge tone={area.tone}>{area.status}</Badge>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[34px] bg-[#EEF6FD] px-8 py-12 ring-1 ring-[#DCEAF7] sm:px-10 lg:px-14">
          <SectionKicker>8 lecturas estratégicas iniciales</SectionKicker>
          <div className="space-y-10">
            {areas.map((area) => (
              <article key={`${area.key}-reading`}>
                <div className="grid gap-6 border-b border-[#DCEAF7] pb-6 lg:grid-cols-[90px_1fr_170px] lg:items-start">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[#1A6BB5]">
                    {area.number}
                  </p>
                  <div>
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-[#0F1B2D]">
                      {area.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-[#43546A]">
                      {area.summary}
                    </p>
                  </div>
                  <div className="lg:text-right">
                    <Badge tone={area.tone}>{area.status}</Badge>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 lg:grid-cols-4">
                  {area.findings.map((finding) => (
                    <div key={finding.title} className="border-l border-[#BFD8EE] pl-5">
                      <p className="text-sm font-black text-[#0F1B2D]">
                        {finding.title}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[#43546A]">
                        {finding.text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[34px] bg-white px-8 py-12 ring-1 ring-[#DCEAF7] sm:px-10 lg:px-12">
            <SectionKicker>Prioridades</SectionKicker>
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F1B2D]">
              Qué debería revisarse primero
            </h2>

            <div className="mt-8 space-y-7">
              {priorities.map((priority: any, index: number) => (
                <article
                  key={`${priority.title}-${index}`}
                  className="grid gap-5 border-b border-[#DCEAF7] pb-7 last:border-b-0 last:pb-0 lg:grid-cols-[70px_1fr]"
                >
                  <p className="text-2xl font-black tracking-[-0.04em] text-[#1A6BB5]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-2xl font-black tracking-[-0.03em] text-[#0F1B2D]">
                        {priority.title}
                      </h3>
                      <Badge tone={getPriorityTone(priority.priority)}>
                        {priority.priority}
                      </Badge>
                    </div>

                    <p className="mt-4 text-base leading-7 text-[#43546A]">
                      {priority.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] bg-[#EEF6FD] px-8 py-12 ring-1 ring-[#DCEAF7] sm:px-10 lg:px-12">
            <SectionKicker>Hoja de ruta sugerida</SectionKicker>
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F1B2D]">
              Secuencia inicial de intervención
            </h2>

            <div className="mt-8 space-y-7">
              {roadmap.map((item) => (
                <article
                  key={item.phase}
                  className="grid gap-5 border-b border-[#DCEAF7] pb-7 last:border-b-0 last:pb-0 lg:grid-cols-[70px_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-[#1A6BB5] ring-1 ring-[#DCEAF7]">
                    {item.phase}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#0F1B2D]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#43546A]">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-[38px] bg-[#244D78] text-white shadow-[0_28px_90px_rgba(24,60,99,0.18)]">
          <div className="grid gap-10 px-8 py-12 sm:px-10 lg:grid-cols-[1fr_360px] lg:px-14 lg:py-14">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9FD8FF]">
                Causa raíz detectada
              </p>
              <h2 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                {getRootCauseValue(
                  rootCause,
                  "Falta de sistema claro para convertir señales en decisiones",
                )}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D7E8F7]">
                {getRootCauseDescription(
                  rootCause,
                  "La lectura inicial indica que el negocio necesita ordenar la relación entre propuesta, captación, conversión, seguimiento y procesos antes de seguir ampliando acciones.",
                )}
              </p>
            </div>

            <aside className="rounded-[30px] bg-white/10 p-7 ring-1 ring-white/20 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9FD8FF]">
                Continuación recomendada
              </p>
              <h3 className="mt-4 text-2xl font-black leading-tight">
                Convertir esta lectura inicial en una revisión estratégica
                completa.
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#D7E8F7]">
                En la sesión 1:1 se revisa el caso con criterio humano,
                priorización real y una hoja de ruta accionable.
              </p>
              <div className="mt-7">
                <PrimaryButton variant="light">
                  Acceder al diagnóstico completo
                </PrimaryButton>
              </div>
            </aside>
          </div>
        </section>

        <footer className="py-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7C93]">
          NEXO IA · Diagnóstico estratégico empresarial asistido por IA
        </footer>
      </div>
    </main>
  );
}

