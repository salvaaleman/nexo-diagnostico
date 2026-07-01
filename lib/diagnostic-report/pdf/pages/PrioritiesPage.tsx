import { Page, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { PriorityCard } from "../components/PriorityCard";
import { pdfStyles } from "../styles";

interface PrioritiesPageProps {
  report: DiagnosticReport;
}

export function PrioritiesPage({ report }: PrioritiesPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />
      <SectionTitle
        eyebrow="Prioridades"
        title="Dónde conviene actuar primero"
        intro="No todas las áreas tienen el mismo peso. Estas prioridades ordenan la intervención inicial para evitar dispersión."
      />

      <View>
        {report.priorities.slice(0, 5).map((priority, index) => (
          <PriorityCard key={`${priority.titulo}-${index}`} priority={priority} />
        ))}
      </View>

      <Footer page="Página 5" />
    </Page>
  );
}
