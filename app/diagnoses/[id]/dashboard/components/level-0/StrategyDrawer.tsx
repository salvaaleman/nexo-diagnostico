"use client";

import { X } from "lucide-react";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

interface StrategyDrawerProps {
  open: boolean;
  onClose: () => void;
  cardNumber: string;
  title: string;
  description: string;
  recommendations?: StrategicRecommendation | null;
}

export default function StrategyDrawer({
  open,
  onClose,
  cardNumber,
  title,
  description,
  recommendations,
}: StrategyDrawerProps) {
  if (!open) return null;

  const isMainProblem = cardNumber === "01" && recommendations;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 z-[100] h-screen w-[50vw] min-w-[700px] overflow-y-auto border-l"
        style={{
          background: "#0F1B2D",
          borderColor: "rgba(79,195,247,0.15)",
        }}
      >
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#4FC3F7]">
                NEXO IA
              </p>

              <h2 className="text-3xl font-bold text-white">{title}</h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {isMainProblem ? (
              <>
                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Resumen ejecutivo
                  </h3>
                  <p className="leading-relaxed text-[#B0C4DE]">
                    {recommendations.summary}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Problema detectado
                  </h3>
                  <p className="leading-relaxed text-[#B0C4DE]">
                    {recommendations.main_bottleneck}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Lectura estratégica
                  </h3>
                  <div className="space-y-4">
                    {recommendations.strategic_explanation
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="leading-relaxed text-[#B0C4DE]"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Plan de prioridades
                  </h3>
                  <div className="space-y-4">
                    {recommendations.priority_plan.map((item, index) => (
                      <div key={`${item.title}-${index}`}>
                        <p className="font-semibold text-white">
                          {String(index + 1).padStart(2, "0")} · {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                          {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Recomendación comercial
                  </h3>
                  <p className="font-semibold text-[#4FC3F7]">
                    {recommendations.recommended_pack}
                  </p>
                  <p className="mt-3 leading-relaxed text-[#B0C4DE]">
                    {recommendations.pack_reason}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Resumen
                  </h3>
                  <p className="leading-relaxed text-[#B0C4DE]">
                    {description}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Pendiente de conectar
                  </h3>
                  <p className="leading-relaxed text-[#B0C4DE]">
                    Esta tarjeta todavía usa contenido temporal. Primero estamos
                    validando la tarjeta 01 con datos reales.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}