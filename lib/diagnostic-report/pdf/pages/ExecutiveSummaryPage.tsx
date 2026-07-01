import { Page, Text, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { Badge } from "../components/Badge";
import { pdfStyles } from "../styles";
import { normalizeLevel } from "../helpers";

interface ExecutiveSummaryPageProps {
  report: DiagnosticReport;
}

export function ExecutiveSummaryPage({ report }: ExecutiveSummaryPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />
      <SectionTitle
        eyebrow="Resumen ejecutivo"
        title={report.executiveSummary.titulo}
        intro={report.executiveSummary.subtitulo}
      />

      <View style={pdfStyles.darkCard}>
        <Text style={{ ...pdfStyles.sectionTitle, color: "#FFFFFF" }}>
          Diagnóstico general
        </Text>
        <Text style={{ ...pdfStyles.bodyText, color: "#DDEBFA" }}>
          {report.executiveSummary.resumen}
        </Text>
      </View>

      <View style={pdfStyles.card}>
        <View style={pdfStyles.cardHeader}>
          <Text style={pdfStyles.cardTitle}>Nivel general del negocio</Text>
          <Badge label={normalizeLevel(report.executiveSummary.nivelGeneral)} />
        </View>
        <Text style={pdfStyles.bodyText}>
          {report.executiveSummary.diagnosticoGeneral}
        </Text>
      </View>

      <View style={pdfStyles.callout}>
        <Text style={pdfStyles.calloutText}>
          Este informe no busca aumentar la actividad del negocio. Busca ordenar
          la lectura del problema para decidir mejor dónde actuar primero.
        </Text>
      </View>

      <Footer page="Página 2" />
    </Page>
  );
}
