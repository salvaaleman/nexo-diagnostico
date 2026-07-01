import { Text, View } from "@react-pdf/renderer";
import type { DiagnosticCard } from "@/lib/diagnostic-report/types";
import { pdfStyles } from "../styles";
import { buildAreaExplanation, limitItems } from "../helpers";
import { Badge } from "./Badge";

interface AreaCardProps {
  card: DiagnosticCard;
}

export function AreaCard({ card }: AreaCardProps) {
  return (
    <View style={pdfStyles.card}>
      <View style={pdfStyles.cardHeader}>
        <View>
          <Text style={pdfStyles.cardTitle}>{card.titulo}</Text>
          <Text style={pdfStyles.cardSubtitle}>{card.subtitulo}</Text>
        </View>
        <Badge type={card.estado} />
      </View>

      <Text style={pdfStyles.bodyText}>{buildAreaExplanation(card)}</Text>

      {limitItems(card.hallazgos, 2).length > 0 ? (
        <View style={{ marginTop: 8 }}>
          {limitItems(card.hallazgos, 2).map((item, index) => (
            <View key={`${card.id}-finding-${index}`} style={pdfStyles.bulletRow}>
              <View style={pdfStyles.bulletDot} />
              <Text style={pdfStyles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
