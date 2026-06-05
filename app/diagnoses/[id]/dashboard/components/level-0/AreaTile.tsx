"use client";

function areaBarColor(score: number, max: number) {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.7) return "bg-red-500";
  if (ratio >= 0.4) return "bg-amber-400";
  if (ratio >= 0.1) return "bg-sky-400";
  return "bg-white/10";
}

function areaBgColor(score: number, max: number) {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.7) return "bg-red-500/10 border-red-500/20";
  if (ratio >= 0.4) return "bg-amber-400/10 border-amber-400/20";
  if (ratio >= 0.1) return "bg-sky-400/10 border-sky-400/20";
  return "bg-white/5 border-white/10";
}

interface AreaTileProps {
  name: string;
  score: number;
  maxScore: number;
}

export default function AreaTile({ name, score, maxScore }: AreaTileProps) {
  const isCritical = maxScore > 0 && score >= maxScore * 0.6;
  const ratio = maxScore > 0 ? score / maxScore : 0;
  const width = Math.max(ratio * 100, score > 0 ? 4 : 0);

  return (
    <div
      className={`relative rounded-xl border p-4 flex flex-col gap-2 transition-all hover:scale-[1.02] cursor-default ${areaBgColor(
        score,
        maxScore
      )}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="text-xs text-white/30 font-mono">
          {score > 0 ? score.toFixed(0) : "—"}
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-auto">
        <div
          className={`h-full rounded-full transition-all ${areaBarColor(score, maxScore)}`}
          style={{ width: `${width}%` }}
        />
      </div>
      {isCritical && (
        <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold shadow-lg">
          CRÍTICA
        </span>
      )}
    </div>
  );
}