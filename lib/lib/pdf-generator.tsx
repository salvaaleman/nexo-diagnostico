import { pdf } from "@react-pdf/renderer";
import NexoExecutivePdfV1 from "@/lib/diagnostic-report/NexoExecutivePdfV1";
import { NexoServiceBudgetReport } from "@/lib/diagnostic/NexoServiceBudgetReport";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

function safeFileName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface GenerateV2PdfParams {
  clientName: string;
  report: DiagnosticReport;
}

interface GenerateServiceBudgetPdfParams {
  clientName: string;
  brand: string | null;
  recommendation: StrategicRecommendation;
}

export async function generarPdfCliente({
  clientName,
  report,
}: GenerateV2PdfParams): Promise<void> {
  const blob = await pdf(
    <NexoExecutivePdfV1 report={report} clientName={clientName} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `diagnostico-estrategico-nexo-ia-${safeFileName(
    clientName
  )}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export async function generarPdfPresupuestoServicio({
  clientName,
  brand,
  recommendation,
}: GenerateServiceBudgetPdfParams): Promise<void> {
  const date = new Date().toLocaleDateString("es-ES");

  const blob = await pdf(
    <NexoServiceBudgetReport
      clientName={clientName}
      brand={brand}
      date={date}
      recommendation={recommendation}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `presupuesto-servicio-nexo-ia-${safeFileName(
    clientName
  )}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}