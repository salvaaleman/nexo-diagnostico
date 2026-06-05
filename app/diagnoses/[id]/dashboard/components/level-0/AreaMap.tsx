"use client";

import AreaTile from "./AreaTile";

interface AreaScore {
  key: string;
  score: number;
}

interface AreaMapProps {
  areas: AreaScore[];
  maxScore: number;
}

export default function AreaMap({ areas, maxScore }: AreaMapProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {areas.map(({ key, score }) => (
          <AreaTile key={key} name={key} score={score} maxScore={maxScore} />
        ))}
      </div>
      <div className="flex gap-4 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <span className="w-3 h-2 rounded-full bg-red-500 inline-block" />
          crítica
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <span className="w-3 h-2 rounded-full bg-amber-400 inline-block" />
          atención
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <span className="w-3 h-2 rounded-full bg-sky-400 inline-block" />
          leve
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <span className="w-3 h-2 rounded-full bg-white/10 inline-block" />
          sin señal
        </div>
      </div>
    </div>
  );
}