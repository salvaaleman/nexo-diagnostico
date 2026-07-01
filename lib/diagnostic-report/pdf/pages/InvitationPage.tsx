import { Page, Text, View } from "@react-pdf/renderer";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { pdfStyles } from "../styles";

export function InvitationPage() {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />

      <SectionTitle
        eyebrow="Siguiente paso"
        title="Convertir el diagnóstico en un plan de acción"
        intro="El valor del diagnóstico aparece cuando se transforma en decisiones concretas."
      />

      <View style={pdfStyles.darkCard}>
        <Text style={{ ...pdfStyles.sectionTitle, color: "#FFFFFF" }}>
          Revisión estratégica
        </Text>

        <Text style={{ ...pdfStyles.bodyText, color: "#DDEBFA" }}>
          Este diagnóstico te ha permitido identificar con claridad las áreas
          que hoy merecen mayor atención.
        </Text>

        <Text style={{ ...pdfStyles.bodyText, color: "#DDEBFA", marginTop: 10 }}>
          El siguiente paso consiste en convertir esa información en un plan
          claro, con prioridades, decisiones y acciones que generen resultados
          reales para tu negocio.
        </Text>
      </View>

      <View style={pdfStyles.card}>
        <Text style={pdfStyles.sectionTitle}>
          Cómo solicitar la revisión
        </Text>

        <Text style={pdfStyles.bodyText}>
          Escribe por WhatsApp indicando que ya has recibido tu diagnóstico
          estratégico y quieres revisar el plan de acción recomendado para tu
          negocio.
        </Text>
      </View>

      <View style={pdfStyles.callout}>
        <Text style={pdfStyles.calloutText}>
          En esa conversación se explicará el siguiente paso y se resolverán las
          dudas antes de avanzar.
        </Text>
      </View>

      <Footer page="Página 9" />
    </Page>
  );
}