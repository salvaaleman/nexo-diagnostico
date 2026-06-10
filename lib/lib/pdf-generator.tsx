import { pdf } from "@react-pdf/renderer";
import { NexoClientReport } from "@/lib/diagnostic/NexoClientReport";
import { NexoServiceBudgetReport } from "@/lib/diagnostic/NexoServiceBudgetReport";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

function safeFileName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface GeneratePdfParams {
  clientName: string;
  brand: string | null;
  recommendation: StrategicRecommendation;
}

export async function generarPdfCliente({
  clientName,
  brand,
  recommendation,
}: GeneratePdfParams): Promise<void> {
  const date = new Date().toLocaleDateString("es-ES");

  const blob = await pdf(
    <NexoClientReport
      clientName={clientName}
      brand={brand}
      date={date}
      recommendation={recommendation}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `evaluacion-comercial-nexo-ia-${safeFileName(clientName)}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export async function generarPdfPresupuestoServicio({
  clientName,
  brand,
  recommendation,
}: GeneratePdfParams): Promise<void> {
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
  link.download = `presupuesto-servicio-nexo-ia-${safeFileName(clientName)}.pdf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}