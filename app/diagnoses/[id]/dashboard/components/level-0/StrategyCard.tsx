"use client";

import { ArrowRight } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import MetricDisplay from "../shared/MetricDisplay";

interface StrategyCardProps {
  number: string;
  title: string;
  status: "CRÍTICO" | "ATENCIÓN" | "FORTALEZA" | "INTERVENCIÓN";
  score?: number;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function getCardStyles(
  status: StrategyCardProps["status"],
  isPrimary: boolean,
  isSolution: boolean
) {
  if (isPrimary) {
    return {
      background:
        "linear-gradient(135deg, rgba(26, 107, 181, 0.46), rgba(15, 27, 45, 0.94))",
      border: "2px solid rgba(79, 195, 247, 0.70)",
      shadow:
        "0 0 0 1px rgba(79,195,247,0.10), 0 18px 55px rgba(79,195,247,0.16), inset 0 1px 0 rgba(255,255,255,0.10)",
      numberOpacity: "text-white/[0.20]",
      hoverBorder: "rgba(79, 195, 247, 0.95)",
      hoverBg:
        "linear-gradient(135deg, rgba(26, 107, 181, 0.58), rgba(15, 27, 45, 0.98))",
      hoverShadow:
        "0 0 0 1px rgba(79,195,247,0.20), 0 22px 70px rgba(79,195,247,0.22), inset 0 1px 0 rgba(255,255,255,0.14)",
      marker: "PUNTO DE DECISIÓN",
    };
  }

  if (isSolution) {
    return {
      background:
        "linear-gradient(135deg, rgba(79, 195, 247, 0.22), rgba(15, 27, 45, 0.94))",
      border: "2px solid rgba(79, 195, 247, 0.62)",
      shadow:
        "0 0 0 1px rgba(79,195,247,0.08), 0 18px 55px rgba(79,195,247,0.13), inset 0 1px 0 rgba(255,255,255,0.08)",
      numberOpacity: "text-white/[0.20]",
      hoverBorder: "rgba(79, 195, 247, 0.90)",
      hoverBg:
        "linear-gradient(135deg, rgba(79, 195, 247, 0.30), rgba(15, 27, 45, 0.98))",
      hoverShadow:
        "0 0 0 1px rgba(79,195,247,0.18), 0 22px 70px rgba(79,195,247,0.20), inset 0 1px 0 rgba(255,255,255,0.12)",
      marker: "RUTA RECOMENDADA",
    };
  }

  switch (status) {
    case "CRÍTICO":
      return {
        background: "rgba(239, 68, 68, 0.04)",
        border: "1px solid rgba(239, 68, 68, 0.12)",
        shadow: "0 4px 24px rgba(239, 68, 68, 0.03)",
        numberOpacity: "text-white/[0.10]",
        hoverBorder: "rgba(239, 68, 68, 0.28)",
        hoverBg: "rgba(239, 68, 68, 0.08)",
        hoverShadow: "0 8px 32px rgba(239, 68, 68, 0.06)",
        marker: null,
      };
    case "ATENCIÓN":
      return {
        background: "rgba(234, 179, 8, 0.03)",
        border: "1px solid rgba(234, 179, 8, 0.10)",
        shadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
        numberOpacity: "text-white/[0.10]",
        hoverBorder: "rgba(234, 179, 8, 0.25)",
        hoverBg: "rgba(234, 179, 8, 0.06)",
        hoverShadow: "0 8px 32px rgba(234, 179, 8, 0.05)",
        marker: null,
      };
    case "FORTALEZA":
      return {
        background: "rgba(34, 197, 94, 0.04)",
        border: "1px solid rgba(34, 197, 94, 0.12)",
        shadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
        numberOpacity: "text-white/[0.10]",
        hoverBorder: "rgba(34, 197, 94, 0.25)",
        hoverBg: "rgba(34, 197, 94, 0.08)",
        hoverShadow: "0 8px 32px rgba(34, 197, 94, 0.05)",
        marker: null,
      };
    case "INTERVENCIÓN":
      return {
        background: "rgba(79, 195, 247, 0.06)",
        border: "1px solid rgba(79, 195, 247, 0.18)",
        shadow: "0 4px 24px rgba(79, 195, 247, 0.04)",
        numberOpacity: "text-white/[0.10]",
        hoverBorder: "rgba(79, 195, 247, 0.40)",
        hoverBg: "rgba(79, 195, 247, 0.12)",
        hoverShadow: "0 8px 32px rgba(79, 195, 247, 0.08)",
        marker: null,
      };
    default:
      return {
        background: "rgba(26, 107, 181, 0.10)",
        border: "1px solid rgba(47, 158, 214, 0.15)",
        shadow: "0 4px 24px rgba(0, 0, 0, 0.20)",
        numberOpacity: "text-white/[0.10]",
        hoverBorder: "rgba(47, 158, 214, 0.35)",
        hoverBg: "rgba(26, 107, 181, 0.18)",
        hoverShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        marker: null,
      };
  }
}

export default function StrategyCard({
  number,
  title,
  status,
  score,
  description,
  icon,
  onClick,
}: StrategyCardProps) {
  const isPrimary = number === "01";
  const isSolution = number === "09";
  const isFeatured = isPrimary || isSolution;
  const styles = getCardStyles(status, isPrimary, isSolution);

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0"
      style={{
        minHeight: isFeatured ? "240px" : "220px",
        background: styles.background,
        border: styles.border,
        boxShadow: styles.shadow,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = styles.hoverBg;
        el.style.borderColor = styles.hoverBorder;
        el.style.boxShadow = styles.hoverShadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = styles.background;
        el.style.border = styles.border;
        el.style.boxShadow = styles.shadow;
      }}
    >
      <span
        className={`absolute top-3 right-5 select-none pointer-events-none transition-colors duration-300 group-hover:text-white/[0.24] ${
          isFeatured ? "text-7xl" : "text-6xl"
        } font-bold ${styles.numberOpacity}`}
        style={{ fontFamily: "var(--font-title, 'Nunito Sans', sans-serif)" }}
      >
        {number}
      </span>

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[#4FC3F7] transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          {styles.marker && (
            <span
              className="rounded-full border border-[#4FC3F7]/40 bg-[#4FC3F7]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4FC3F7]"
              style={{ fontFamily: "var(--font-body, 'Poppins', sans-serif)" }}
            >
              {styles.marker}
            </span>
          )}
        </div>

        <h3
          className="text-lg font-semibold uppercase tracking-[0.02em] text-white leading-snug"
          style={{ fontFamily: "var(--font-title, 'Nunito Sans', sans-serif)" }}
        >
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          {score !== undefined && <MetricDisplay score={score} maxScore={100} />}
        </div>

        <p
          className={`text-[#B0C4DE] leading-relaxed mt-auto ${
            isFeatured ? "text-[15px] line-clamp-3" : "text-sm line-clamp-2"
          }`}
          style={{ fontFamily: "var(--font-body, 'Poppins', sans-serif)" }}
        >
          {description}
        </p>

        <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#2E9ED6]/30 transition-all duration-300 group-hover:border-[#4FC3F7]/60 group-hover:bg-[#4FC3F7]/10">
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="text-[#2E9ED6] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#4FC3F7]"
          />
        </div>
      </div>
    </button>
  );
}