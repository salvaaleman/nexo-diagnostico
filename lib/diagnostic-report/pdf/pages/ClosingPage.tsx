import { Page, Text, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { pdfStyles } from "../styles";

interface ClosingPageProps {
  report: DiagnosticReport;
}

export function ClosingPage({ report }: ClosingPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />

      <SectionTitle
        eyebrow="Conclusión estratégica"
        title="Qué significa este diagnóstico para tu negocio"
        intro="El objetivo de este informe no es generar más información, sino facilitar mejores decisiones."
      />

      <View style={pdfStyles.darkCard}>
        <Text style={{ ...pdfStyles.sectionTitle, color: "#FFFFFF" }}>
          Conclusión
        </Text>

        <Text style={{ ...pdfStyles.bodyText, color: "#DDEBFA" }}>
          {report.executiveSummary.diagnosticoGeneral}
        </Text>
      </View>

      <View style={pdfStyles.card}>
        <Text style={pdfStyles.sectionTitle}>
          La prioridad ahora no es hacer más.
        </Text>

        <Text style={pdfStyles.bodyText}>
          La prioridad consiste en actuar sobre las áreas que actualmente
          generan el mayor impacto dentro del negocio. Corregir primero los
          bloqueos principales permite que las siguientes decisiones sean más
          coherentes y produzcan resultados más consistentes.
        </Text>
      </View>

      <View style={pdfStyles.cardSoft}>
        <Text style={pdfStyles.sectionTitle}>
          Qué puedes esperar
        </Text>

        <Text style={pdfStyles.bodyText}>
          Este informe ofrece una visión estructurada del estado actual del
          negocio. A partir de aquí resulta posible definir un orden de trabajo,
          priorizar acciones y reducir la incertidumbre antes de realizar nuevas
          inversiones o cambios importantes.
        </Text>
      </View>

      <Footer page="Página 8" />
    </Page>
  );
}