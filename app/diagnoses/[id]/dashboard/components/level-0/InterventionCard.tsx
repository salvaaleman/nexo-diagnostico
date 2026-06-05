"use client";

import Card from "../shared/Card";

interface InterventionCardProps {
  pack: string;
}

export default function InterventionCard({ pack }: InterventionCardProps) {
  return (
    <Card className="flex flex-col gap-2 items-center text-center border-[#27a7de]/20">
      <p className="text-xs text-white/40 uppercase tracking-widest">
        Intervención recomendada
      </p>
      <p className="text-lg font-semibold text-[#27a7de]">{pack || "—"}</p>
    </Card>
  );
}