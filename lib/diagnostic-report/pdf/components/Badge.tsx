import { Text } from "@react-pdf/renderer";
import type { CardPriority, CardStatus } from "@/lib/diagnostic-report/types";
import { pdfStyles } from "../styles";
import { priorityShortLabel, statusLabel } from "../helpers";

interface BadgeProps {
  type?: CardStatus | CardPriority | "neutral";
  label?: string;
}

export function Badge({ type = "neutral", label }: BadgeProps) {
  const style =
    type === "critico" || type === "alta"
      ? [pdfStyles.badge, pdfStyles.badgeCritical]
      : type === "atencion" || type === "media"
        ? [pdfStyles.badge, pdfStyles.badgeAttention]
        : type === "correcto" || type === "baja"
          ? [pdfStyles.badge, pdfStyles.badgeSolid]
          : [pdfStyles.badge, pdfStyles.badgeNeutral];

  const text =
    label ??
    (type === "neutral"
      ? "Diagnóstico"
      : type === "alta" || type === "media" || type === "baja"
        ? priorityShortLabel(type)
        : statusLabel(type));

  return <Text style={style}>{text}</Text>;
}
