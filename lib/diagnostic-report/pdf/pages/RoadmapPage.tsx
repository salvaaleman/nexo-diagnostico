import { Page, Text, View } from "@react-pdf/renderer";
import type { DiagnosticReport, RoadmapItem } from "@/lib/diagnostic-report/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { Badge } from "../components/Badge";
import { pdfStyles } from "../styles";

interface RoadmapPageProps {
  report: DiagnosticReport;
}

interface RoadmapColumnProps {
  title: string;
  items: RoadmapItem[];
}

function RoadmapColumn({ title, items }: RoadmapColumnProps) {
  return (
    <View style={pdfStyles.roadmapColumn}>
      <Text style={pdfStyles.roadmapTitle}>{title}</Text>

      {items.slice(0, 3).map((item, index) => (
        <View key={`${title}-${item.titulo}-${index}`} style={{ marginBottom: 9 }}>
          <View style={pdfStyles.cardHeader}>
            <Text style={pdfStyles.cardTitle}>{item.titulo}</Text>
            <Badge type={item.prioridad} />
          </View>

          <Text style={pdfStyles.smallText}>{item.descripcion}</Text>
        </View>
      ))}
    </View>
  );
}

export function RoadmapPage({ report }: RoadmapPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />

      <SectionTitle
        eyebrow="Hoja de ruta"
        title="Secuencia recomendada de actuación"
        intro="La mejora no depende de hacer más cosas a la vez. Depende de intervenir en el orden correcto."
      />

      <View style={pdfStyles.row}>
        <RoadmapColumn title="Ahora" items={report.roadmap.ahora} />
        <RoadmapColumn title="Próximos 30 días" items={report.roadmap.dias30} />
        <RoadmapColumn title="Próximos 90 días" items={report.roadmap.dias90} />
      </View>

      <View style={[pdfStyles.callout, { marginTop: 16 }]}>
        <Text style={pdfStyles.calloutText}>
          Esta hoja de ruta no sustituye una revisión estratégica. Ordena los
          primeros pasos para evitar decisiones dispersas o acciones sin prioridad.
        </Text>
      </View>

      <Footer page="Página 6" />
    </Page>
  );
}