import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../styles";

interface HeaderProps {
  meta?: string;
}

export function Header({ meta = "Diagnóstico Estratégico Empresarial" }: HeaderProps) {
  return (
    <View style={pdfStyles.header}>
      <Text style={pdfStyles.headerBrand}>NEXO IA</Text>
      <Text style={pdfStyles.headerMeta}>{meta}</Text>
    </View>
  );
}
