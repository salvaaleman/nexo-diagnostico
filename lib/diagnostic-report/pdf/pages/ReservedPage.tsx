import { Page, Text, View } from "@react-pdf/renderer";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SectionTitle } from "../components/SectionTitle";
import { pdfStyles } from "../styles";

export function ReservedPage() {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Header />

      <SectionTitle
        eyebrow="Página reservada"
        title="Espacio reservado para futuras ampliaciones"
        intro="Esta página queda preparada para futuras versiones del informe."
      />

      <View style={pdfStyles.cardSoft}>
        <Text style={pdfStyles.bodyText}>
          Página reservada. No forma parte del informe Executive PDF V1.
        </Text>
      </View>

      <Footer page="Página 10" />
    </Page>
  );
}