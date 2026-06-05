"use client";

function priorityColor(p: string) {
  if (p === "alta") return "bg-red-500/20 text-red-300 border-red-500/30";
  if (p === "media") return "bg-amber-500/20 text-amber-300 border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
}

interface PriorityBadgeProps {
  priority: string;
  reason?: string;
}

export default function PriorityBadge({ priority, reason }: PriorityBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${priorityColor(
          priority
        )}`}
      >
        {priority.toUpperCase()}
      </span>
      {reason && (
        <p className="text-xs text-white/40 text-center leading-snug max-w-[200px]">
          {reason}
        </p>
      )}
      <p className="text-xs text-white/30">Prioridad</p>
    </div>
  );
}