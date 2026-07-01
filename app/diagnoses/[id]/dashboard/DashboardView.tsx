"use client";

import type { InternalEval } from "@/lib/internal-fields";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";

// ===== CAMBIO =====
// Producción:
// import DashboardContent from "./DashboardContent";

// Executive V2:
import DashboardContent from "./DashboardContentExecutiveV3";

type Props = {
  id: string;
  clientId: string;
  clientName: string;
  brand: string | null;
  status: string;
  createdAt: string | null;
  answers: Record<string, unknown>;
  diagnosticReport: DiagnosticReport;

  diagnosticV2: {
    engine: any;
    report: DiagnosticReport;
    analyzedAt: string;
  };

  initialInternal: InternalEval | null;
};

export default function DashboardView({
  id,
  clientId,
  clientName,
  brand,
  status,
  createdAt,
  answers,
  diagnosticReport,
  diagnosticV2,
  initialInternal,
}: Props) {
  const { engine } = diagnosticV2;

  return (
    <DashboardContent
      id={id}
      clientId={clientId}
      clientName={clientName}
      brand={brand}
      status={status}
      createdAt={createdAt}
      answers={answers}
      diagnosticReport={diagnosticReport}
      diagnosticV2={engine}
      initialInternal={initialInternal}
    />
  );
}