"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { generarPdfCliente } from "@/lib/lib/pdf-generator";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

interface DashboardShellProps {
  children: React.ReactNode;
  clientName: string;
  brand?: string | null;
  recommendation?: StrategicRecommendation;
}

export default function DashboardShell({
  children,
  clientName,
  brand = null,
  recommendation,
}: DashboardShellProps) {
  const [generatingPdf, setGeneratingPdf] = useState(false);

  async function handleGenerarPdf() {
    if (!recommendation) {
      alert("No hay datos del diagnóstico para generar el PDF.");
      return;
    }

    setGeneratingPdf(true);

    try {
      await generarPdfCliente({
        clientName,
        brand,
        recommendation,
      });
    } catch (error) {
      console.error("ERROR al generar PDF:", error);
      alert("Error al generar PDF. Revisa la consola (F12).");
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1B2D]">
      <Sidebar />

      <div className="ml-[260px] flex min-h-screen flex-col">
        <Header clientName={clientName} />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      <button
        onClick={handleGenerarPdf}
        disabled={!recommendation || generatingPdf}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        style={{
          background: generatingPdf ? "#667085" : "#2563EB",
          boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
        }}
      >
        {generatingPdf ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Generando…</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>PDF Cliente</span>
          </>
        )}
      </button>
    </div>
  );
}