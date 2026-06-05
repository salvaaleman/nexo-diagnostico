"use client";

type StatusType = "CRÍTICO" | "ATENCIÓN" | "FORTALEZA" | "INTERVENCIÓN";

interface StatusBadgeProps {
  status: StatusType;
}

const STATUS_CONFIG: Record<StatusType, { bg: string; text: string; border: string }> = {
  CRÍTICO: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/25",
  },
  ATENCIÓN: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/25",
  },
  FORTALEZA: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/25",
  },
  INTERVENCIÓN: {
    bg: "bg-[#4FC3F7]/10",
    text: "text-[#4FC3F7]",
    border: "border-[#4FC3F7]/25",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.text} ${config.border}`}
    >
      {status}
    </span>
  );
}