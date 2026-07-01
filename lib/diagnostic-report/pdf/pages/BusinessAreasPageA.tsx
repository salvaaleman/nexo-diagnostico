import { Page, View } from "@react-pdf/renderer";
import type { DiagnosticReport } from "@/lib/diagnostic-report/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { AreaCard } from "../components/AreaCard";
import { pdfStyles } from "../styles";

interface BusinessAreasPageAProps {
  report: DiagnosticReport;
}

export function BusinessAreasPageA({ report }: BusinessAreasPageAProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />
      <SectionTitle
        eyebrow="Diagnóstico por áreas"
        title="Áreas 1 a 4"
        intro="Estas áreas muestran las primeras señales que afectan al funcionamiento actual del negocio."
      />

      <View>
        {report.cards.slice(0, 4).map((card) => (
          <AreaCard key={card.id} card={card} />
        ))}
      </View>

      <Footer page="Página 3" />
    </Page>
  );
}
