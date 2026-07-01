import { Page, Text, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import { pdfStyles } from "../styles";
import { formatDate } from "../helpers";

interface CoverPageProps {
  report: DiagnosticReport;
  clientName: string;
}

export function CoverPage({ report, clientName }: CoverPageProps) {
  return (
    <Page size="A4" style={pdfStyles.coverPage}>
      <View style={pdfStyles.coverAccent} />
      <View style={pdfStyles.coverAccentTwo} />

      <Text style={pdfStyles.coverBrand}>NEXO IA</Text>

      <Text style={pdfStyles.coverTitle}>
        Diagnóstico Estratégico Empresarial
      </Text>

      <Text style={pdfStyles.coverSubtitle}>
        Informe ejecutivo para identificar con claridad las áreas que hoy
        merecen mayor atención dentro del negocio.
      </Text>

      <View style={pdfStyles.coverMetaBox}>
        <Text style={pdfStyles.coverMetaText}>Cliente: {clientName}</Text>
        <Text style={pdfStyles.coverMetaText}>
          Fecha: {formatDate(report.metadata.createdAt)}
        </Text>
        <Text style={pdfStyles.coverMetaText}>Versión: Executive PDF V1</Text>
      </View>
    </Page>
  );
}
