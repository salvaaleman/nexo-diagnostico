"use client";

interface MetricDisplayProps {
  score: number;
  maxScore?: number;
  label?: string;
}

function scoreColor(ratio: number): string {
  if (ratio < 0.4) return "bg-red-500";
  if (ratio < 0.7) return "bg-amber-400";
  return "bg-[#4FC3F7]";
}

function scoreTextColor(ratio: number): string {
  if (ratio < 0.4) return "text-red-400";
  if (ratio < 0.7) return "text-amber-400";
  return "text-[#4FC3F7]";
}

export default function MetricDisplay({
  score,
  maxScore = 100,
  label,
}: MetricDisplayProps) {
  const ratio = maxScore > 0 ? score / maxScore : 0;
  const width = Math.max(ratio * 100, score > 0 ? 2 : 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold tabular-nums ${scoreTextColor(ratio)}`}>
          {score}
        </span>
        <span className="text-sm text-white/30">/ {maxScore}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${scoreColor(ratio)}`}
          style={{ width: `${width}%` }}
        />
      </div>

      {label && (
        <p className="text-[10px] uppercase tracking-wider text-[#B0C4DE]">
          {label}
        </p>
      )}
    </div>
  );
}