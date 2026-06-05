"use client";

import Card from "../shared/Card";

interface BottleNeckCardProps {
  bottleneck: string;
}

export default function BottleNeckCard({ bottleneck }: BottleNeckCardProps) {
  return (
    <Card className="flex flex-col gap-3 border-amber-500/20">
      <p className="text-xs text-white/40 uppercase tracking-widest">
        Cuello de botella principal
      </p>
      <p className="text-xl sm:text-2xl font-bold text-amber-300 leading-snug">
        {bottleneck || "No identificado"}
      </p>
      <div className="flex gap-2 mt-1">
        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/20">
          Alto impacto
        </span>
      </div>
    </Card>
  );
}