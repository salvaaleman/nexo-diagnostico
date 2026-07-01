import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../styles";

interface FooterProps {
  page: string;
}

export function Footer({ page }: FooterProps) {
  return (
    <View style={pdfStyles.footer}>
      <Text style={pdfStyles.footerText}>NEXO IA · Diagnóstico Estratégico Empresarial</Text>
      <Text style={pdfStyles.footerText}>{page}</Text>
    </View>
  );
}
