"use client";

function maturityToValue(level: string): number {
  const map: Record<string, number> = {
    Desestructurado: 20,
    "Con bloqueos relevantes": 40,
    "En desarrollo": 60,
    Sólido: 80,
    Optimizado: 100,
  };
  return map[level] ?? 50;
}

function maturityColor(level: string) {
  if (level === "Desestructurado") return "text-red-400";
  if (level === "Con bloqueos relevantes") return "text-amber-400";
  if (level === "En desarrollo") return "text-sky-400";
  return "text-emerald-400";
}

function maturityStrokeColor(level: string) {
  if (level === "Desestructurado") return "#ff4757";
  if (level === "Con bloqueos relevantes") return "#ffa502";
  if (level === "En desarrollo") return "#27a7de";
  return "#2ed573";
}

interface MaturityGaugeProps {
  level: string;
}

export default function MaturityGauge({ level }: MaturityGaugeProps) {
  const value = maturityToValue(level);
  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference * 0.5;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-20">
        <svg height="80" width="128" viewBox="0 0 128 80" className="absolute top-0 left-0">
          <circle
            stroke="rgba(255,255,255,0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="64"
            cy="64"
            strokeDasharray={`${circumference * 0.5} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform="rotate(180 64 64)"
          />
          <circle
            stroke={maturityStrokeColor(level)}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="64"
            cy="64"
            strokeDasharray={`${circumference * 0.5} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(180 64 64)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className={`text-2xl font-bold ${maturityColor(level)}`}>{value}%</span>
        </div>
      </div>
      <p className={`text-sm font-medium ${maturityColor(level)}`}>{level || "Sin datos"}</p>
      <p className="text-xs text-white/30">Madurez global</p>
    </div>
  );
}