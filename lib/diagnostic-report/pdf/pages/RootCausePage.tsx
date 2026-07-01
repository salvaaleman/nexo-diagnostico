import { Page, Text, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { pdfStyles } from "../styles";
import { rootCauseText } from "../helpers";

interface RootCausePageProps {
  report: DiagnosticReport;
}

export function RootCausePage({ report }: RootCausePageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />

      <SectionTitle
        eyebrow="Causa raíz"
        title="Qué está provocando la mayor parte de las fricciones"
        intro="Los síntomas suelen aparecer en varias áreas del negocio, pero normalmente comparten una misma causa de fondo."
      />

      <View style={pdfStyles.darkCard}>
        <Text style={{ ...pdfStyles.sectionTitle, color: "#FFFFFF" }}>
          Interpretación principal
        </Text>

        <Text style={{ ...pdfStyles.bodyText, color: "#DDEBFA" }}>
          {rootCauseText(report)}
        </Text>
      </View>

      <View style={pdfStyles.card}>
        <Text style={pdfStyles.sectionTitle}>
          ¿Por qué es importante identificar la causa?
        </Text>

        <Text style={pdfStyles.bodyText}>
          Cuando se actúa únicamente sobre los síntomas, es frecuente invertir
          tiempo y recursos sin resolver el origen del problema. Comprender la
          causa principal permite establecer prioridades más claras y tomar
          decisiones con mayor impacto.
        </Text>
      </View>

      <View style={pdfStyles.callout}>
        <Text style={pdfStyles.calloutText}>
          Una mejora sostenida suele comenzar cuando se corrige el origen del
          bloqueo, no cuando se añaden más acciones sobre un sistema que ya está
          desordenado.
        </Text>
      </View>

      <Footer page="Página 7" />
    </Page>
  );
}