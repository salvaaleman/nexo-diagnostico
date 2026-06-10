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
      background: "#0F1B2D",
      border: "1px solid #1E3A5F",
      shadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(30, 58, 95, 0.3)",
      numberOpacity: "text-[#374151]",
      hoverBorder: "#2E9ED6",
      hoverBg: "#162B4D",
      hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(46, 158, 214, 0.2)",
      marker: "PUNTO DE DECISIÓN",
    };
  }

  if (isSolution) {
    return {
      background: "#0F1B2D",
      border: "1px solid #1E3A5F",
      shadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(30, 58, 95, 0.2)",
      numberOpacity: "text-[#374151]",
      hoverBorder: "#2E9ED6",
      hoverBg: "#162B4D",
      hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(46, 158, 214, 0.15)",
      marker: "RUTA RECOMENDADA",
    };
  }

  switch (status) {
    case "CRÍTICO":
      return {
        background: "#0F1B2D",
        border: "1px solid #1E3A5F",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        numberOpacity: "text-[#374151]",
        hoverBorder: "#374151",
        hoverBg: "#162B4D",
        hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        marker: null,
      };
    case "ATENCIÓN":
      return {
        background: "#0F1B2D",
        border: "1px solid #1E3A5F",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        numberOpacity: "text-[#374151]",
        hoverBorder: "#374151",
        hoverBg: "#162B4D",
        hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        marker: null,
      };
    case "FORTALEZA":
      return {
        background: "#0F1B2D",
        border: "1px solid #1E3A5F",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        numberOpacity: "text-[#374151]",
        hoverBorder: "#374151",
        hoverBg: "#162B4D",
        hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        marker: null,
      };
    case "INTERVENCIÓN":
      return {
        background: "#0F1B2D",
        border: "1px solid #1E3A5F",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        numberOpacity: "text-[#374151]",
        hoverBorder: "#374151",
        hoverBg: "#162B4D",
        hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        marker: null,
      };
    default:
      return {
        background: "#0F1B2D",
        border: "1px solid #1E3A5F",
        shadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        numberOpacity: "text-[#374151]",
        hoverBorder: "#374151",
        hoverBg: "#162B4D",
        hoverShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
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
        className={`absolute top-3 right-5 select-none pointer-events-none transition-colors duration-300 group-hover:text-[#4B5563] ${
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
              className="rounded-full border border-[#4FC3F7]/30 bg-[#4FC3F7]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4FC3F7]"
              style={{ fontFamily: "var(--font-body, 'Poppins', sans-serif)" }}
            >
              {styles.marker}
            </span>
          )}
        </div>

        <h3
          className="text-lg font-semibold uppercase tracking-[0.02em] text-[#E5E7EB] leading-snug"
          style={{ fontFamily: "var(--font-title, 'Nunito Sans', sans-serif)" }}
        >
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          {score !== undefined && <MetricDisplay score={score} maxScore={100} />}
        </div>

        <p
          className={`text-[#9CA3AF] leading-relaxed mt-auto ${
            isFeatured ? "text-[15px] line-clamp-3" : "text-sm line-clamp-2"
          }`}
          style={{ fontFamily: "var(--font-body, 'Poppins', sans-serif)" }}
        >
          {description}
        </p>

        <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#1E3A5F] transition-all duration-300 group-hover:border-[#4FC3F7]/40 group-hover:bg-[#4FC3F7]/10">
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="text-[#4FC3F7] transition-all duration-300 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </button>
  );
}