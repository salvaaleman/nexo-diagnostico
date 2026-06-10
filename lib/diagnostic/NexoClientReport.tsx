import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  StrategicRecommendation,
  PriorityPlanItem,
} from "./recommendations";

type Props = {
  clientName: string;
  brand: string | null;
  date: string;
  recommendation: StrategicRecommendation;
  alertas?: string[];
  notas?: string;
};

const C = {
  white: "#FFFFFF",
  dark: "#00002F",
  blue: "#0C7EC4",
  cyan: "#27A7DE",
  text: "#101828",
  muted: "#667085",
  soft: "#F4F8FB",
  line: "#D9E4EC",
};

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    color: C.text,
  },

  darkPage: {
    backgroundColor: C.dark,
    color: C.white,
  },

  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: C.muted,
  },

  footerDark: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#B8C3D1",
  },

  heroTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 155,
    backgroundColor: C.dark,
    alignItems: "center",
    justifyContent: "center",
  },

  heroTitle: {
    color: C.white,
    fontSize: 31,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 16,
  },

  heroSubtitle: {
    color: C.cyan,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },

  cyanLeft: {
    position: "absolute",
    top: 155,
    left: 0,
    width: 215,
    height: 18,
    backgroundColor: C.cyan,
  },

  cyanRight: {
    position: "absolute",
    top: 155,
    right: 0,
    width: 215,
    height: 18,
    backgroundColor: C.cyan,
  },

  coverMethodBox: {
    position: "absolute",
    top: 245,
    left: 90,
    right: 90,
    backgroundColor: C.dark,
    borderRadius: 12,
    paddingTop: 26,
    paddingBottom: 28,
    paddingHorizontal: 30,
  },

  coverMethodTitle: {
    color: C.cyan,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 1,
  },

  coverMethodText: {
    color: C.white,
    fontSize: 10.4,
    lineHeight: 1.5,
    marginBottom: 13,
  },

  coverDivider: {
    height: 1,
    backgroundColor: C.cyan,
    marginBottom: 13,
  },

  coverClientBox: {
    position: "absolute",
    left: 110,
    right: 110,
    bottom: 95,
    backgroundColor: C.soft,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 24,
  },

  coverLabel: {
    color: C.blue,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  coverClient: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    marginBottom: 18,
  },

  coverMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9.5,
    color: C.muted,
  },

  kicker: {
    color: C.blue,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },

  title: {
    fontSize: 27,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    textTransform: "uppercase",
    marginBottom: 28,
  },

  intro: {
    fontSize: 10.5,
    color: C.muted,
    lineHeight: 1.45,
    marginBottom: 24,
  },

  executiveText: {
    fontSize: 13,
    lineHeight: 1.55,
    marginBottom: 28,
    color: C.text,
  },

  executiveGrid: {
    flexDirection: "row",
    marginBottom: 40,
  },

  executiveCard: {
    flex: 1,
    backgroundColor: C.soft,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    padding: 18,
    minHeight: 128,
    marginRight: 14,
  },

  executiveCardLast: {
    marginRight: 0,
  },

  cardLabel: {
    color: C.blue,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  cardValue: {
    color: C.dark,
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.25,
  },

  bigStatement: {
    marginTop: 20,
    backgroundColor: C.dark,
    padding: 24,
    borderRadius: 14,
  },

  statementWhite: {
    color: C.white,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    lineHeight: 1.25,
  },

  statementCyan: {
    color: C.cyan,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    lineHeight: 1.25,
  },

  insightGrid: {
    flexDirection: "row",
  },

  insightCol: {
    flex: 1,
    marginRight: 18,
  },

  insightColLast: {
    marginRight: 0,
  },

  insightCard: {
    backgroundColor: C.soft,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    minHeight: 145,
  },

  insightTitle: {
    color: C.blue,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 9,
  },

  insightText: {
    fontSize: 10.2,
    color: C.text,
    lineHeight: 1.42,
    marginBottom: 10,
  },

  evidenceLabel: {
    color: C.muted,
    fontSize: 7.8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },

  evidenceItem: {
    fontSize: 8.5,
    color: C.muted,
    lineHeight: 1.3,
    marginBottom: 4,
  },

  strengthRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    paddingBottom: 15,
    marginBottom: 15,
  },

  strengthNumber: {
    width: 48,
    color: C.cyan,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },

  strengthText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 1.35,
    color: C.text,
    fontFamily: "Helvetica-Bold",
  },

  darkTitle: {
    color: C.white,
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    lineHeight: 1.2,
    marginBottom: 34,
  },

  darkTitleCyan: {
    color: C.cyan,
  },

  whiteBox: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cyan,
    padding: 28,
    minHeight: 420,
  },

  whiteBoxText: {
    color: C.text,
    fontSize: 13,
    lineHeight: 1.58,
    marginBottom: 13,
  },

  priorityItem: {
    flexDirection: "row",
    marginBottom: 18,
  },

  priorityNumber: {
    width: 58,
    color: C.cyan,
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
  },

  priorityContent: {
    flex: 1,
  },

  priorityTitle: {
    fontSize: 13,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },

  priorityReason: {
    fontSize: 9.8,
    color: C.text,
    lineHeight: 1.45,
  },

  recommendationBox: {
    backgroundColor: C.dark,
    borderRadius: 16,
    padding: 28,
    marginBottom: 26,
  },

  recommendationMain: {
    color: C.white,
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 22,
  },

  recLabel: {
    color: C.cyan,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },

  recValue: {
    color: C.white,
    fontSize: 12,
    lineHeight: 1.45,
    marginBottom: 16,
  },

  closingLogoBox: {
    position: "absolute",
    top: 58,
    left: 125,
    right: 125,
    height: 112,
    backgroundColor: C.white,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  closingLogoText: {
    color: C.dark,
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  closingContent: {
    marginTop: 280,
    alignItems: "center",
  },

  closingBig: {
    color: C.white,
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 14,
  },

  closingBlue: {
    color: C.cyan,
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 42,
  },

  closingText: {
    color: C.white,
    fontSize: 13,
    lineHeight: 1.55,
    textAlign: "center",
    width: "72%",
    marginBottom: 105,
  },

  closingBrandDivider: {
    width: 58,
    height: 1,
    backgroundColor: C.cyan,
    marginBottom: 24,
  },

  closingBrand: {
    color: C.cyan,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
  },

  closingSub: {
    color: C.white,
    fontSize: 11,
    textAlign: "center",
  },
});

function Footer({ page, dark = false }: { page: string; dark?: boolean }) {
  return (
    <View style={dark ? styles.footerDark : styles.footer} fixed>
      <Text>NEXO IA · Sistema de Seguimiento Inteligente</Text>
      <Text>{page}</Text>
    </View>
  );
}

function splitParagraphs(text: string) {
  return text
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function pickEvidence(
  problems: string[],
  regex: RegExp,
  used: Set<string>,
  limit = 2
) {
  const result: string[] = [];

  for (const item of problems) {
    if (regex.test(item) && !used.has(item) && result.length < limit) {
      result.push(item);
      used.add(item);
    }
  }

  return result;
}

function buildProblemInsights(problems: string[]) {
  const used = new Set<string>();

  return [
    {
      title: "Oferta",
      text:
        "La oferta actual no está suficientemente estructurada para que el cliente entienda con rapidez qué problema se resuelve, qué resultado obtiene y por qué debería elegir esta propuesta.",
      evidence: pickEvidence(
        problems,
        /oferta|propuesta|catálogo|validado|precio|caro|características|consecuencias|resultado/i,
        used
      ),
    },
    {
      title: "Cliente",
      text:
        "El perfil de cliente ideal todavía no está definido con suficiente precisión, lo que dificulta la captación, aumenta la dispersión del mensaje y atrae oportunidades desiguales.",
      evidence: pickEvidence(
        problems,
        /cliente|todos|conectan|demografía|comportamiento/i,
        used
      ),
    },
    {
      title: "Mensaje",
      text:
        "La comunicación actual no transmite con suficiente claridad el valor diferencial de la propuesta ni facilita una comprensión rápida de lo que se ofrece.",
      evidence: pickEvidence(
        problems,
        /posicionamiento|diferenciación|explicar|mensaje/i,
        used
      ),
    },
    {
      title: "Captación y sistema",
      text:
        "Existen oportunidades de mejora en captación, seguimiento y conversión que limitan la capacidad de transformar interés en decisiones comerciales concretas.",
      evidence: pickEvidence(
        problems,
        /captación|contenido|ia|implementación|conversión|seguimiento/i,
        used
      ),
    },
  ];
}

function ProblemInsight({
  title,
  text,
  evidence,
}: {
  title: string;
  text: string;
  evidence: string[];
}) {
  return (
    <View style={styles.insightCard}>
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightText}>{text}</Text>

      {evidence.length ? (
        <>
          <Text style={styles.evidenceLabel}>Señales detectadas</Text>
          {evidence.map((item) => (
            <Text key={item} style={styles.evidenceItem}>
              {item}
            </Text>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.evidenceLabel}>Señales detectadas</Text>
          <Text style={styles.evidenceItem}>
            Sin señales específicas suficientes.
          </Text>
        </>
      )}
    </View>
  );
}

export function NexoClientReport({
  clientName,
  brand,
  date,
  recommendation,
}: Props) {
  const safeRecommendation: StrategicRecommendation = recommendation || {
    main_problems: [],
    active_strengths: [],
    priority_plan: [],
    strategic_explanation: "",
    summary: "",
    main_bottleneck: "",
    maturity_level: "",
    recommended_pack: "",
    priority: "",
    recommended_focus: [],
    pack_reason: "",
  };

  const problems = safeRecommendation.main_problems ?? [];
  const problemInsights = buildProblemInsights(problems);
  const strengths = safeRecommendation.active_strengths ?? [];
  const priorities = safeRecommendation.priority_plan ?? [];
  const explanation = splitParagraphs(
    safeRecommendation.strategic_explanation || "—"
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.heroTop}>
          <Text style={styles.heroTitle}>Informe Estratégico</Text>
          <Text style={styles.heroSubtitle}>
            Diagnóstico empresarial y prioridades de crecimiento
          </Text>
        </View>

        <View style={styles.cyanLeft} />
        <View style={styles.cyanRight} />

        <View style={styles.coverMethodBox}>
          <Text style={styles.coverMethodTitle}>Nota metodológica</Text>

          <Text style={styles.coverMethodText}>
            Las conclusiones de este informe se han desarrollado a partir de las
            respuestas facilitadas durante el proceso de diagnóstico, del análisis
            de los factores estratégicos evaluados y de la interpretación
            realizada por el sistema Nexo IA.
          </Text>

          <View style={styles.coverDivider} />

          <Text style={styles.coverMethodText}>
            Este documento identifica patrones, oportunidades de crecimiento,
            áreas de mejora y posibles limitaciones operativas detectadas en el
            momento del análisis, tomando como referencia exclusivamente la
            información aportada.
          </Text>

          <View style={styles.coverDivider} />

          <Text style={styles.coverMethodText}>
            Su finalidad es proporcionar una herramienta de orientación
            estratégica que permita comprender mejor la situación actual del
            proyecto, establecer prioridades de actuación y facilitar una toma de
            decisiones más clara, coherente y ejecutable.
          </Text>

          <View style={styles.coverDivider} />

          <Text style={styles.coverMethodText}>
            La calidad y precisión de las conclusiones dependen directamente de
            la información facilitada durante el proceso de evaluación.
          </Text>
        </View>

        <View style={styles.coverClientBox}>
          <Text style={styles.coverLabel}>Cliente</Text>
          <Text style={styles.coverClient}>{clientName}</Text>
          <View style={styles.coverMetaRow}>
            <Text>Proyecto / marca: {brand || "—"}</Text>
            <Text>Fecha: {date}</Text>
          </View>
        </View>

        <Footer page="01" />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Resumen ejecutivo</Text>
        <Text style={styles.title}>Resumen ejecutivo</Text>

        <Text style={styles.executiveText}>
          {safeRecommendation.summary || "No hay resumen disponible."}
        </Text>

        <View style={styles.executiveGrid}>
          <View style={[styles.executiveCard]}>
            <Text style={styles.cardLabel}>Cuello de botella</Text>
            <Text style={styles.cardValue}>
              {safeRecommendation.main_bottleneck || "No identificado"}
            </Text>
          </View>

          <View style={[styles.executiveCard]}>
            <Text style={styles.cardLabel}>Madurez global</Text>
            <Text style={styles.cardValue}>
              {safeRecommendation.maturity_level || "Sin datos suficientes"}
            </Text>
          </View>

          <View style={[styles.executiveCard, styles.executiveCardLast]}>
            <Text style={styles.cardLabel}>Intervención</Text>
            <Text style={styles.cardValue}>
              {safeRecommendation.recommended_pack || "—"}
            </Text>
          </View>
        </View>

        <View style={styles.bigStatement}>
          <Text style={styles.statementWhite}>La prioridad no es hacer más.</Text>
          <Text style={styles.statementCyan}>
            Es intervenir primero sobre lo que bloquea el crecimiento.
          </Text>
        </View>

        <Footer page="02" />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Diagnóstico</Text>
        <Text style={styles.title}>Problemas detectados</Text>
        <Text style={styles.intro}>
          Lectura ejecutiva de las áreas que hoy están limitando claridad,
          avance y conversión.
        </Text>

        <View style={styles.insightGrid}>
          <View style={[styles.insightCol]}>
            <ProblemInsight
              title={problemInsights[0].title}
              text={problemInsights[0].text}
              evidence={problemInsights[0].evidence}
            />
            <ProblemInsight
              title={problemInsights[1].title}
              text={problemInsights[1].text}
              evidence={problemInsights[1].evidence}
            />
          </View>

          <View style={[styles.insightCol, styles.insightColLast]}>
            <ProblemInsight
              title={problemInsights[2].title}
              text={problemInsights[2].text}
              evidence={problemInsights[2].evidence}
            />
            <ProblemInsight
              title={problemInsights[3].title}
              text={problemInsights[3].text}
              evidence={problemInsights[3].evidence}
            />
          </View>
        </View>

        <Footer page="03" />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Base aprovechable</Text>
        <Text style={styles.title}>Fortalezas activas</Text>
        <Text style={styles.intro}>
          Lo que ya existe y puede convertirse en ventaja si se ordena con método.
        </Text>

        {strengths.map((strength: string, index: number) => (
          <View key={strength} style={styles.strengthRow}>
            <Text style={styles.strengthNumber}>
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Text style={styles.strengthText}>{strength}</Text>
          </View>
        ))}

        <Footer page="04" />
      </Page>

      <Page size="A4" style={[styles.page, styles.darkPage]}>
        <Text style={styles.darkTitle}>
          Lo que está{"\n"}limitando{"\n"}
          <Text style={styles.darkTitleCyan}>el crecimiento</Text>
        </Text>

        <View style={styles.whiteBox}>
          {explanation.map((p) => (
            <Text key={p} style={styles.whiteBoxText}>
              {p}
            </Text>
          ))}
        </View>

        <Footer page="05" dark />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Plan de acción</Text>
        <Text style={styles.title}>Plan de prioridades</Text>
        <Text style={styles.intro}>
          Orden recomendado para intervenir sin dispersar energía ni recursos.
        </Text>

        {priorities.map((item: PriorityPlanItem, index: number) => (
          <View key={`${item.title}-${index}`} style={styles.priorityItem}>
            <Text style={styles.priorityNumber}>
              {String(index + 1).padStart(2, "0")}
            </Text>
            <View style={styles.priorityContent}>
              <Text style={styles.priorityTitle}>{item.title}</Text>
              <Text style={styles.priorityReason}>{item.reason}</Text>
            </View>
          </View>
        ))}

        <Footer page="06" />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Recomendación</Text>
        <Text style={styles.title}>Intervención recomendada</Text>

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationMain}>
            {safeRecommendation.recommended_pack || "Intervención no definida"}
          </Text>

          <Text style={styles.recLabel}>Prioridad</Text>
          <Text style={styles.recValue}>
            {(safeRecommendation.priority || "—").toUpperCase()}
          </Text>

          <Text style={styles.recLabel}>Foco recomendado</Text>
          <Text style={styles.recValue}>
            {(safeRecommendation.recommended_focus ?? []).join(", ") || "—"}
          </Text>

          <Text style={styles.recLabel}>Motivo</Text>
          <Text style={styles.recValue}>
            {safeRecommendation.pack_reason || "—"}
          </Text>
        </View>

        <Footer page="07" />
      </Page>

      <Page size="A4" style={[styles.page, styles.darkPage]}>
        <View style={styles.closingLogoBox}>
          <Text style={styles.closingLogoText}>NEXO IA</Text>
        </View>

        <View style={styles.closingContent}>
          <Text style={styles.closingBig}>La prioridad no es hacer más.</Text>
          <Text style={styles.closingBlue}>
            Es ordenar lo que genera impacto.
          </Text>

          <Text style={styles.closingBrandDivider} />

          <Text style={styles.closingText}>
            Este informe identifica los principales factores que actualmente
            limitan el crecimiento de su negocio o empresa. El siguiente paso es
            convertir este diagnóstico en una intervención clara, priorizada y
            ejecutable.
          </Text>

          <Text style={styles.closingBrandDivider} />

          <Text style={styles.closingBrand}>Nexo IA</Text>
          <Text style={styles.closingSub}>
            Sistema de Seguimiento Inteligente
          </Text>
        </View>

        <Footer page="08" dark />
      </Page>
    </Document>
  );
}