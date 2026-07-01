
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

type AreaStatus = {
  label: "Crítico" | "Necesita atención" | "Estable" | "Sólido";
  tone: Tone;
  dot: string;
};

type AreaInsight = {
  key: keyof DiagnosticReport["globalScores"];
  title: string;
  subtitle: string;
  reading: string;
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

function formatDateTime(value: string) {
  try {
    return new Date(value).toLocaleString("es-ES");
  } catch {
    return "No disponible";
  }
}

function normalizeScore(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
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

function getStatusFromScore(value: unknown): AreaStatus {
  const score = normalizeScore(value);

  if (score >= 76) {
    return {
      label: "Sólido",
      tone: "correcto",
      dot: "●",
    };
  }

  if (score >= 51) {
    return {
      label: "Estable",
      tone: "estable",
      dot: "●",
    };
  }

  if (score >= 26) {
    return {
      label: "Necesita atención",
      tone: "atencion",
      dot: "●",
    };
  }

  return {
    label: "Crítico",
    tone: "critico",
    dot: "●",
  };
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#4FC3F7]">
      {children}
    </p>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl font-semibold tracking-tight text-white md:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[28px] border border-[#4FC3F7]/15 bg-[#12304D]/72 shadow-[0_24px_80px_rgba(0,0,0,0.22)] ${className}`}
    >
      {children}
    </section>
  );
}

function SoftPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-[#4FC3F7]/12 bg-[#0F1B2D]/72 ${className}`}
    >
      {children}
    </div>
  );
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
      ? "border-red-400/50 bg-red-500/12 text-red-100"
      : tone === "atencion"
        ? "border-yellow-300/50 bg-yellow-400/12 text-yellow-100"
        : tone === "correcto"
          ? "border-emerald-300/50 bg-emerald-400/12 text-emerald-100"
          : tone === "estable"
            ? "border-[#4FC3F7]/45 bg-[#2E9ED6]/16 text-[#D8F4FF]"
            : "border-[#4FC3F7]/25 bg-[#1A6BB5]/18 text-[#B0C4DE]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href = COMPLETE_DIAGNOSTIC_URL,
  variant = "primary",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "light";
}) {
  const className =
    variant === "light"
      ? "bg-white text-[#0F1B2D] hover:bg-[#B0C4DE]"
      : "bg-[#1A6BB5] text-white hover:bg-[#2E9ED6]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${className}`}
    >
      {children}
    </a>
  );
}

function HeaderMeta({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-[#4FC3F7]/14 bg-[#0F1B2D]/65 px-4 py-3">
      <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#B0C4DE]">
        {label}
      </p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function CompactCta() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#4FC3F7]/18 bg-[#0F1B2D]/72 px-5 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">
          Desbloquea el diagnóstico completo
        </p>
        <p className="mt-1 text-sm text-[#B0C4DE]">
          Incluye revisión personalizada con Salvador Alemán.
        </p>
      </div>

      <PrimaryButton>Ver diagnóstico completo</PrimaryButton>
    </div>
  );
}

function StrategicAreaCard({
  area,
  value,
  index,
}: {
  area: AreaInsight;
  value: number;
  index: number;
}) {
  const status = getStatusFromScore(value);

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#4FC3F7]/16 bg-[#17304D]/86 shadow-[0_24px_76px_rgba(0,0,0,0.24)]">
      <div className="border-b border-[#4FC3F7]/12 bg-gradient-to-br from-[#1A6BB5]/24 via-[#17304D] to-[#0F1B2D] p-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold text-[#4FC3F7]">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {area.title}
            </h3>
          </div>

          <Badge tone={status.tone}>
            <span className="mr-2">{status.dot}</span>
            {status.label}
          </Badge>
        </div>

        <p className="max-w-xl text-sm leading-7 text-[#B0C4DE]">
          {area.subtitle}
        </p>
      </div>

      <div className="p-7">
        <div className="mb-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#4FC3F7]">
            Lectura estratégica
          </p>
          <p className="text-sm leading-7 text-white/90">{area.reading}</p>
        </div>

        <div className="space-y-4 border-t border-[#4FC3F7]/12 pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#4FC3F7]">
            Cuatro hallazgos clave
          </p>

          {area.findings.map((finding, findingIndex) => (
            <div
              key={`${area.key}-${findingIndex}`}
              className="rounded-2xl border border-[#4FC3F7]/12 bg-[#0F1B2D]/58 p-5"
            >
              <p className="mb-2 text-sm font-semibold text-white">
                {finding.title}
              </p>
              <p className="text-sm leading-7 text-[#B0C4DE]">{finding.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-[#4FC3F7]/12 pt-5">
          <a
            href={COMPLETE_DIAGNOSTIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#4FC3F7] transition hover:text-white"
          >
            Desbloquear análisis completo →
          </a>
        </div>
      </div>
    </article>
  );
}

function PriorityCard({
  title,
  description,
  impact,
  urgency,
  index,
}: {
  title: string;
  description: string;
  impact: string;
  urgency: "alta" | "media" | "baja";
  index: number;
}) {
  return (
    <article className="rounded-3xl border border-[#4FC3F7]/16 bg-[#12304D]/72 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="text-sm font-semibold text-[#4FC3F7]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <Badge tone={getPriorityTone(urgency)}>{urgency}</Badge>
      </div>

      <h3 className="mb-4 text-lg font-semibold leading-7 text-white">
        {title}
      </h3>

      <p className="text-sm leading-7 text-[#B0C4DE]">{description}</p>

      <div className="mt-5 border-t border-[#4FC3F7]/12 pt-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#4FC3F7]">
          Impacto esperado
        </p>
        <p className="text-sm leading-7 text-white/86">{impact}</p>
      </div>
    </article>
  );
}
function RoadmapColumn({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: DiagnosticReport["roadmap"]["ahora"];
}) {
  return (
    <div className="rounded-[30px] border border-[#4FC3F7]/14 bg-[#12304D]/72 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
        {subtitle}
      </p>
      <h3 className="mb-6 text-xl font-semibold text-white">{title}</h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <article
            key={index}
            className="rounded-2xl border border-[#4FC3F7]/12 bg-[#0F1B2D]/62 p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h4 className="text-sm font-semibold leading-6 text-white">
                {item.titulo}
              </h4>

              <Badge tone={getPriorityTone(item.prioridad)}>
                {item.prioridad}
              </Badge>
            </div>

            <p className="text-sm leading-7 text-[#B0C4DE]">
              {item.descripcion}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="overflow-hidden rounded-[34px] border border-[#4FC3F7]/28 bg-gradient-to-br from-[#1A6BB5] via-[#2E9ED6] to-[#4FC3F7] shadow-[0_30px_100px_rgba(26,107,181,0.3)]">
      <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-white/76">
            Diagnóstico completo
          </p>

          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            ¿Quieres convertir este diagnóstico en un plan de acción
            personalizado?
          </h2>

          <p className="mt-6 max-w-4xl text-base leading-8 text-white/88">
            Este diagnóstico identifica las principales áreas de mejora de tu
            negocio y ofrece una primera interpretación estratégica.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-8 text-white/88">
            Sin embargo, ningún informe puede sustituir una revisión conjunta
            donde se analicen las causas reales, el contexto de tu empresa y el
            orden correcto de actuación.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-8 text-white/88">
            En una sesión estratégica individual de 30 minutos con{" "}
            <strong className="text-white">Salvador Alemán</strong>, revisaréis
            juntos cada resultado y definiréis las prioridades con mayor impacto
            para tu negocio.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/25 bg-white/14 p-6 backdrop-blur">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.26em] text-white/78">
            Incluye
          </p>

          <ul className="mb-7 space-y-4 text-sm leading-7 text-white">
            <li className="flex gap-3">
              <span>✓</span>
              <span>Interpretación completa del diagnóstico.</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Revisión de prioridades.</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Resolución de dudas.</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Hoja de ruta personalizada.</span>
            </li>
            <li className="flex gap-3">
              <span>✓</span>
              <span>Informe Premium completo.</span>
            </li>
          </ul>

          <PrimaryButton variant="light">
            Acceder al diagnóstico completo
          </PrimaryButton>

          <p className="mt-5 text-xs leading-6 text-white/75">
            Has visto el diagnóstico. Ahora descubre qué hacer con él.
          </p>
        </div>
      </div>
    </section>
  );
}

function buildAreaInsights(): AreaInsight[] {
  const areas: AreaInsight[] = [
    {
      key: "claridad",
      title: "Claridad estratégica",
      subtitle:
        "Evalúa si el negocio comunica con precisión qué ofrece, para quién es y por qué debería ser elegido.",
      reading:
        "La claridad estratégica determina si el cliente entiende rápidamente el valor de la oferta o si necesita demasiadas explicaciones para tomar una decisión. Cuando esta área no está bien resuelta, el negocio puede estar trabajando mucho, publicando contenido o haciendo acciones comerciales, pero dejando dudas en el recorrido del cliente.",
      findings: [
        {
          title: "Qué detectamos",
          text: "La propuesta necesita ser revisada para comprobar si comunica con suficiente precisión el problema que resuelve, el resultado que promete y la diferencia frente a otras opciones.",
        },
        {
          title: "Qué significa",
          text: "Cuando la claridad no es completa, el cliente tarda más en entender el valor y el negocio depende demasiado de explicaciones personales, llamadas o mensajes individuales.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede generar menor conversión, más objeciones, dificultad para escalar contenido o campañas y una sensación de que el mercado no responde aunque exista interés real.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "El primer punto es revisar la promesa principal, la estructura de la oferta y el mensaje que recibe el cliente antes de contactar o comprar.",
        },
      ],
    },
    {
      key: "captacion",
      title: "Captación",
      subtitle:
        "Analiza si el negocio genera oportunidades de forma constante o depende de acciones aisladas.",
      reading:
        "La captación no consiste solo en tener visibilidad. Consiste en que el negocio tenga una entrada constante de oportunidades con intención real. Cuando esta área está débil, el crecimiento suele depender de picos, recomendaciones, publicaciones puntuales o esfuerzos que no se repiten con método.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existen canales definidos, una propuesta clara para captar demanda y un sistema mínimo que convierta atención en oportunidades reales.",
        },
        {
          title: "Qué significa",
          text: "El negocio puede estar visible, pero no necesariamente estar captando contactos cualificados de manera previsible.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar meses irregulares, dependencia de recomendaciones, presión por publicar más y dificultad para saber qué acción genera clientes.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "Conviene revisar qué canal trae mejores oportunidades, qué mensaje se está usando y si existe una llamada a la acción clara.",
        },
      ],
    },
    {
      key: "conversion",
      title: "Conversión",
      subtitle:
        "Mide si el interés inicial termina transformándose en clientes reales.",
      reading:
        "La conversión muestra qué ocurre después de que una persona muestra interés. Muchos negocios no tienen un problema de visibilidad, sino una pérdida de oportunidades entre el primer contacto, la explicación de la oferta, la propuesta y el cierre.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que observar si el proceso comercial ayuda al cliente a decidir o si deja demasiadas dudas abiertas durante la conversación.",
        },
        {
          title: "Qué significa",
          text: "Puede existir interés, pero no un recorrido suficientemente claro para que ese interés avance hacia una decisión.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar conversaciones largas, clientes que desaparecen, propuestas sin respuesta y sensación de que falta insistencia cuando en realidad falta estructura.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "El primer punto es revisar cómo se presenta la oferta, qué objeciones aparecen y qué seguimiento recibe cada oportunidad.",
        },
      ],
    },
    {
      key: "seguimiento",
      title: "Seguimiento",
      subtitle:
        "Evalúa si las oportunidades se conservan, se clasifican y se recuperan correctamente.",
      reading:
        "El seguimiento suele ser uno de los puntos donde más valor se pierde. No basta con responder bien al primer contacto. El negocio necesita saber qué ocurre después, quién debe ser recuperado, cuándo volver a contactar y qué mensaje usar en cada etapa.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existe un flujo de seguimiento definido o si cada conversación depende de memoria, intuición o disponibilidad del momento.",
        },
        {
          title: "Qué significa",
          text: "Sin seguimiento, el negocio puede perder oportunidades que sí tenían interés pero que necesitaban más tiempo o una segunda interacción.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar pérdida de leads, baja conversión, dependencia del propietario y una lectura falsa de que la captación no funciona.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "Conviene revisar cómo se registran los contactos, cómo se clasifican y qué secuencia mínima se aplica después del primer interés.",
        },
      ],
    },
    {
      key: "procesos",
      title: "Procesos",
      subtitle:
        "Observa si el negocio puede funcionar con orden o si depende de improvisación diaria.",
      reading:
        "Los procesos son la estructura invisible del negocio. Cuando faltan, todo requiere más energía, más supervisión y más decisiones pequeñas. Un negocio puede facturar y aun así estar limitado porque cada avance depende demasiado del esfuerzo manual.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar qué tareas se repiten, qué pasos no están documentados y qué partes del negocio dependen exclusivamente de una persona.",
        },
        {
          title: "Qué significa",
          text: "La falta de procesos no siempre se ve como un problema grave al principio, pero aparece cuando el volumen aumenta o cuando se intenta delegar.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar desorden operativo, errores repetidos, dificultad para escalar y una sensación constante de estar apagando incendios.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "El primer punto es identificar los tres procesos más repetidos del negocio y documentarlos antes de intentar automatizarlos.",
        },
      ],
    },
    {
      key: "automatizacion",
      title: "Automatización",
      subtitle:
        "Analiza si el negocio está preparado para usar tecnología sin multiplicar el desorden.",
      reading:
        "La automatización solo funciona cuando existe claridad previa. Si el proceso no está definido, automatizar puede hacer que el desorden se mueva más rápido. Esta área no mide cuántas herramientas se usan, sino si el negocio está listo para convertir tareas repetibles en sistemas.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existen procesos claros, datos organizados y decisiones repetibles antes de incorporar IA, CRM o automatizaciones.",
        },
        {
          title: "Qué significa",
          text: "El negocio puede tener herramientas, pero eso no significa que tenga un sistema. La herramienta solo amplifica lo que ya está ordenado.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar inversión en tecnología sin retorno, automatizaciones que no resuelven el problema real y más complejidad operativa.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "Antes de automatizar, conviene definir el recorrido del cliente, los puntos de contacto y las tareas que realmente se repiten.",
        },
      ],
    },
    {
      key: "direccion",
      title: "Dirección",
      subtitle:
        "Evalúa si el negocio toma decisiones desde prioridades claras o desde urgencias constantes.",
      reading:
        "La dirección estratégica marca el orden de las decisiones. Cuando esta área está débil, todo parece importante, cualquier acción parece urgente y el negocio puede avanzar mucho en actividad pero poco en claridad.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que revisar si existe una prioridad principal o si el negocio está repartiendo energía entre demasiados frentes a la vez.",
        },
        {
          title: "Qué significa",
          text: "Sin dirección clara, las decisiones se toman por presión inmediata, intuición o reacción a problemas visibles.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar dispersión, pérdida de foco, inversión mal dirigida y dificultad para saber qué corregir primero.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "Conviene definir cuál es el cuello de botella principal y qué área debe recibir atención antes de seguir ejecutando nuevas acciones.",
        },
      ],
    },
    {
      key: "riesgoGlobal",
      title: "Nivel de alerta",
      subtitle:
        "Resume el grado de tensión general detectado en el sistema de negocio.",
      reading:
        "El nivel de alerta no debe leerse como una nota, sino como una señal de concentración de fricciones. Indica si las áreas del negocio están funcionando de forma coordinada o si existen tensiones que pueden bloquear crecimiento, conversión o ejecución.",
      findings: [
        {
          title: "Qué detectamos",
          text: "Hay que observar si los problemas aparecen de forma aislada o si varias áreas están conectadas por una misma causa de fondo.",
        },
        {
          title: "Qué significa",
          text: "Cuando varias fricciones se conectan, corregir acciones sueltas suele tener poco efecto porque el origen del problema sigue activo.",
        },
        {
          title: "Qué puede provocar",
          text: "Puede provocar meses de prueba y error, soluciones parciales y sensación de trabajar mucho sin conseguir avance proporcional.",
        },
        {
          title: "Qué conviene revisar primero",
          text: "El primer paso es identificar la causa raíz y separar síntomas visibles de problemas estructurales.",
        },
      ],
    },
  ];

  return areas;
}

export default function DashboardContent({
  id,
  clientId,
  clientName,
  brand,
  status,
  createdAt,
  answers,
  diagnosticReport,
  diagnosticV2,
}: Props) {
  const executiveSummary = diagnosticReport.executiveSummary;
  const globalScores = diagnosticReport.globalScores;
  const priorities = diagnosticReport.priorities ?? [];
  const roadmap = diagnosticReport.roadmap;
  const engine = diagnosticV2;

  const rootCause = engine?.rootCause;
  const rootCauseTitle = getRootCauseValue(rootCause);
  const rootCauseDescription = getRootCauseDescription(rootCause);
  const areaInsights = buildAreaInsights();

  return (
    <main className="min-h-screen bg-[#0F1B2D] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-18%] h-[420px] w-[420px] rounded-full bg-[#1A6BB5]/24 blur-[120px]" />
        <div className="absolute right-[-10%] top-[18%] h-[480px] w-[480px] rounded-full bg-[#4FC3F7]/14 blur-[140px]" />
        <div className="absolute bottom-[-18%] left-[24%] h-[420px] w-[420px] rounded-full bg-[#2E9ED6]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <header className="mb-8 overflow-hidden rounded-[34px] border border-[#4FC3F7]/16 bg-[#12304D]/70 shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
          <div className="grid gap-8 p-7 md:p-9 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-[#4FC3F7]">
                Diagnóstico estratégico NEXO IA
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {clientName}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#B0C4DE]">
                {brand || "Marca no indicada"}
              </p>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <HeaderMeta label="Estado" value={getStatusLabel(status)} />
              <HeaderMeta label="Fecha" value={formatDate(createdAt)} />
              <HeaderMeta
                label="Respuestas analizadas"
                value={Object.keys(answers || {}).length}
              />
            </div>
          </div>

          <div className="border-t border-[#4FC3F7]/12 px-7 py-5 text-xs text-[#B0C4DE] md:px-9 lg:px-10">
            <div className="grid gap-2 md:grid-cols-2">
              <p>ID diagnóstico: {id}</p>
              <p className="md:text-right">ID cliente: {clientId}</p>
            </div>
          </div>
        </header>

        <div className="space-y-10">
          <Panel className="p-7 md:p-9 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
              <div>
                <SectionLabel>Resumen ejecutivo</SectionLabel>

                <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {executiveSummary.titulo}
                </h2>

                <p className="mt-6 max-w-4xl text-lg leading-8 text-white/88">
                  {executiveSummary.subtitulo}
                </p>

                <p className="mt-5 max-w-4xl text-base leading-8 text-[#B0C4DE]">
                  {executiveSummary.resumen}
                </p>

                <SoftPanel className="mt-8 p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                    Diagnóstico general
                  </p>
                  <p className="text-base font-medium leading-8 text-white">
                    {executiveSummary.diagnosticoGeneral}
                  </p>
                </SoftPanel>
              </div>

              <div className="grid gap-4">
                <SoftPanel className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                    Nivel general
                  </p>
                  <p className="text-3xl font-semibold capitalize text-white">
                    {executiveSummary.nivelGeneral}
                  </p>
                </SoftPanel>

                <SoftPanel className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                    Confianza global
                  </p>
                  <p className="text-3xl font-semibold capitalize text-white">
                    {executiveSummary.confianzaGlobal}
                  </p>
                </SoftPanel>

                <SoftPanel className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                    Analizado
                  </p>
                  <p className="text-sm leading-6 text-white">
                    {formatDateTime(diagnosticReport.metadata.createdAt)}
                  </p>
                </SoftPanel>
              </div>
            </div>
          </Panel>

          <CompactCta />

          <section>
            <SectionLabel>Diagnóstico por áreas</SectionLabel>

            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <SectionTitle>Ocho lecturas estratégicas iniciales</SectionTitle>
              <p className="max-w-2xl text-sm leading-7 text-[#B0C4DE]">
                Esta sección no muestra una puntuación numérica. Resume las
                primeras señales interpretadas por área para entender dónde puede
                estar apareciendo fricción.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {areaInsights.map((area, index) => (
                <StrategicAreaCard
                  key={area.key}
                  area={area}
                  value={globalScores[area.key]}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>Prioridades</SectionLabel>

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <SectionTitle>Qué debe revisarse primero</SectionTitle>
              <p className="max-w-2xl text-sm leading-7 text-[#B0C4DE]">
                No todas las tensiones tienen el mismo peso. Estas son las áreas
                que conviene ordenar antes de seguir ejecutando.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {priorities.map((priority, index) => (
                <PriorityCard
                  key={`${priority.titulo}-${index}`}
                  index={index}
                  title={priority.titulo}
                  description={priority.descripcion}
                  impact={priority.impacto}
                  urgency={priority.urgencia}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>Secuencia de intervención</SectionLabel>

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <SectionTitle>Hoja de ruta sugerida</SectionTitle>
              <p className="max-w-2xl text-sm leading-7 text-[#B0C4DE]">
                Una primera secuencia para transformar el diagnóstico en avance
                operativo sin dispersar esfuerzos.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <RoadmapColumn
                title="Ahora"
                subtitle="Primer movimiento"
                items={roadmap.ahora}
              />
              <RoadmapColumn
                title="30 días"
                subtitle="Consolidación"
                items={roadmap.dias30}
              />
              <RoadmapColumn
                title="90 días"
                subtitle="Evolución"
                items={roadmap.dias90}
              />
            </div>
          </section>

          <FinalCta />

          <Panel className="p-7 md:p-9">
            <SectionLabel>Causa raíz detectada</SectionLabel>

            <div className="grid gap-5 md:grid-cols-2">
              <SoftPanel className="p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                  Diagnóstico principal
                </p>
                <p className="text-lg font-semibold leading-7 text-white">
                  {rootCauseTitle}
                </p>
              </SoftPanel>

              <SoftPanel className="p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4FC3F7]">
                  Lectura estratégica
                </p>
                <p className="text-sm leading-7 text-[#B0C4DE]">
                  {rootCauseDescription}
                </p>
              </SoftPanel>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}