import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../styles";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export function SectionTitle({ eyebrow, title, intro }: SectionTitleProps) {
  return (
    <View style={pdfStyles.pageTitleBlock}>
      {eyebrow ? <Text style={pdfStyles.pageEyebrow}>{eyebrow}</Text> : null}
      <Text style={pdfStyles.pageTitle}>{title}</Text>
      {intro ? <Text style={pdfStyles.pageIntro}>{intro}</Text> : null}
    </View>
  );
}
