import { Text, View } from "@react-pdf/renderer";
import type { PriorityItem } from "@/lib/diagnostic-report/types";
import { pdfStyles } from "../styles";
import { buildPriorityExplanation } from "../helpers";
import { Badge } from "./Badge";

interface PriorityCardProps {
  priority: PriorityItem;
}

export function PriorityCard({ priority }: PriorityCardProps) {
  return (
    <View style={pdfStyles.card}>
      <View style={pdfStyles.cardHeader}>
        <View>
          <Text style={pdfStyles.cardTitle}>{priority.titulo}</Text>
          <Text style={pdfStyles.cardSubtitle}>Área prioritaria de intervención</Text>
        </View>
        <Badge type={priority.urgencia} />
      </View>

      <Text style={pdfStyles.bodyText}>
        {buildPriorityExplanation(priority.descripcion, priority.impacto)}
      </Text>
    </View>
  );
}
