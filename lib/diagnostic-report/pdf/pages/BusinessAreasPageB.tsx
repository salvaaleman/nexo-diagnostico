import { Page, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { AreaCard } from "../components/AreaCard";
import { pdfStyles } from "../styles";

interface BusinessAreasPageBProps {
  report: DiagnosticReport;
}

export function BusinessAreasPageB({ report }: BusinessAreasPageBProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />
      <SectionTitle
        eyebrow="Diagnóstico por áreas"
        title="Áreas 5 a 8"
        intro="Esta segunda lectura completa la radiografía principal del sistema comercial y operativo."
      />

      <View>
        {report.cards.slice(4, 8).map((card) => (
          <AreaCard key={card.id} card={card} />
        ))}
      </View>

      <Footer page="Página 4" />
    </Page>
  );
}
