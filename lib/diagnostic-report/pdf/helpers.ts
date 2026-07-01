import type {
  CardPriority,
  CardStatus,
  DiagnosticCard,
  DiagnosticReport,
} from "@/lib/diagnostic-report/types";

export function formatDate(value?: string): string {
  if (!value) return "Fecha no disponible";

  try {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "Fecha no disponible";
  }
}

export function normalizeLevel(value?: string): string {
  const raw = String(value ?? "").toLowerCase();

  if (raw.includes("crítico") || raw.includes("critico")) return "Crítico";
  if (raw.includes("atención") || raw.includes("atencion")) return "Necesita atención";
  if (raw.includes("estable")) return "Estable";
  if (raw.includes("sólido") || raw.includes("solido")) return "Sólido";

  return value || "Necesita atención";
}

export function statusLabel(status: CardStatus): string {
  if (status === "critico") return "Crítico";
  if (status === "atencion") return "Necesita atención";
  return "Sólido";
}

export function priorityLabel(priority: CardPriority): string {
  if (priority === "alta") return "Alta prioridad";
  if (priority === "media") return "Prioridad media";
  return "Prioridad baja";
}

export function priorityShortLabel(priority: CardPriority): string {
  if (priority === "alta") return "Alta";
  if (priority === "media") return "Media";
  return "Baja";
}

export function getTopCards(report: DiagnosticReport, limit = 8): DiagnosticCard[] {
  return [...report.cards]
    .sort((a, b) => {
      const statusWeight = {
        critico: 3,
        atencion: 2,
        correcto: 1,
      };

      const priorityWeight = {
        alta: 3,
        media: 2,
        baja: 1,
      };

      const aScore = statusWeight[a.estado] * 10 + priorityWeight[a.prioridad];
      const bScore = statusWeight[b.estado] * 10 + priorityWeight[b.prioridad];

      return bScore - aScore;
    })
    .slice(0, limit);
}

export function safeText(value: unknown, fallback = "Información no disponible"): string {
  if (typeof value !== "string") return fallback;

  const clean = value.trim();

  return clean.length > 0 ? clean : fallback;
}

export function limitItems<T>(items: T[] | undefined, limit: number): T[] {
  if (!Array.isArray(items)) return [];

  return items.slice(0, limit);
}

export function splitCards(cards: DiagnosticCard[]): {
  first: DiagnosticCard[];
  second: DiagnosticCard[];
} {
  return {
    first: cards.slice(0, 4),
    second: cards.slice(4, 8),
  };
}

export function rootCauseText(report: DiagnosticReport): string {
  const rootCause = report.engine.rootCause;

  if (!rootCause || typeof rootCause !== "object") {
    return "El diagnóstico muestra que el principal bloqueo no está aislado en una sola acción. Aparece como una combinación de señales que afectan a la claridad, la captación, el seguimiento o los procesos del negocio.";
  }

  const data = rootCause as Record<string, unknown>;

  const possibleFields = [
    data.description,
    data.descripcion,
    data.summary,
    data.resumen,
    data.title,
    data.titulo,
  ];

  const text = possibleFields.find(
    (item) => typeof item === "string" && item.trim().length > 0
  );

  return typeof text === "string"
    ? text
    : "El diagnóstico muestra una causa de fondo que conviene ordenar antes de aumentar inversión, captación o nuevas acciones comerciales.";
}

export function buildAreaExplanation(card: DiagnosticCard): string {
  const base = safeText(card.explicacion, card.resumen);

  return `${base} Esta área merece atención porque puede afectar la forma en que el negocio atrae, convierte, organiza o retiene oportunidades.`;
}

export function buildPriorityExplanation(description: string, impact: string): string {
  return `${safeText(description)} Impacto esperado: ${safeText(impact)}`;
}
