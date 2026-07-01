import { StyleSheet } from "@react-pdf/renderer";

export const pdfColors = {
  navy: "#0F1B2D",
  blue: "#1A6BB5",
  sky: "#4FC3F7",
  cyan: "#2E9ED6",

  white: "#FFFFFF",
  offWhite: "#F6F9FC",
  paleBlue: "#EEF6FC",

  text: "#172033",
  muted: "#5F7188",
  softMuted: "#8CA0B6",

  border: "#D8E3F0",
  borderDark: "#B8C8DA",

  critical: "#B91C1C",
  attention: "#B45309",
  solid: "#15803D",

  criticalBg: "#FEE2E2",
  attentionBg: "#FEF3C7",
  solidBg: "#DCFCE7",

  darkCard: "#14243A",
  darkCardBorder: "#28415F",
};

export const pdfSpacing = {
  pageX: 36,
  pageY: 34,

  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
};

export const pdfTypography = {
  brand: {
    fontFamily: "Helvetica",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1.4,
  },

  coverTitle: {
    fontFamily: "Helvetica",
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.15,
  },

  coverSubtitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },

  pageTitle: {
    fontFamily: "Helvetica",
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.25,
  },

  sectionTitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.25,
  },

  cardTitle: {
    fontFamily: "Helvetica",
    fontSize: 10.5,
    fontWeight: 700,
    lineHeight: 1.25,
  },

  body: {
    fontFamily: "Helvetica",
    fontSize: 9.2,
    lineHeight: 1.45,
  },

  small: {
    fontFamily: "Helvetica",
    fontSize: 7.8,
    lineHeight: 1.35,
  },

  badge: {
    fontFamily: "Helvetica",
    fontSize: 7.2,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: 0.4,
  },
};

export const pdfStyles = StyleSheet.create({
  page: {
    position: "relative",
    paddingTop: pdfSpacing.pageY,
    paddingBottom: 42,
    paddingHorizontal: pdfSpacing.pageX,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: pdfColors.text,
    backgroundColor: pdfColors.white,
  },

  coverPage: {
    position: "relative",
    padding: 42,
    fontFamily: "Helvetica",
    color: pdfColors.white,
    backgroundColor: pdfColors.navy,
  },

  coverAccent: {
    position: "absolute",
    right: -80,
    top: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: pdfColors.blue,
    opacity: 0.22,
  },

  coverAccentTwo: {
    position: "absolute",
    left: -90,
    bottom: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: pdfColors.cyan,
    opacity: 0.14,
  },

  header: {
    marginBottom: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerBrand: {
    ...pdfTypography.brand,
    color: pdfColors.navy,
  },

  headerMeta: {
    ...pdfTypography.small,
    color: pdfColors.muted,
  },

  footer: {
    position: "absolute",
    left: pdfSpacing.pageX,
    right: pdfSpacing.pageX,
    bottom: 22,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    ...pdfTypography.small,
    color: pdfColors.softMuted,
  },

  pageTitleBlock: {
    marginBottom: 16,
  },

  pageEyebrow: {
    ...pdfTypography.small,
    color: pdfColors.blue,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  pageTitle: {
    ...pdfTypography.pageTitle,
    color: pdfColors.navy,
  },

  pageIntro: {
    ...pdfTypography.body,
    color: pdfColors.muted,
    marginTop: 6,
    maxWidth: 455,
  },

  section: {
    marginBottom: 14,
  },

  sectionTitle: {
    ...pdfTypography.sectionTitle,
    color: pdfColors.navy,
    marginBottom: 7,
  },

  bodyText: {
    ...pdfTypography.body,
    color: pdfColors.text,
  },

  mutedText: {
    ...pdfTypography.body,
    color: pdfColors.muted,
  },

  smallText: {
    ...pdfTypography.small,
    color: pdfColors.muted,
  },

  card: {
    borderWidth: 1,
    borderColor: pdfColors.border,
    borderRadius: 10,
    backgroundColor: pdfColors.white,
    padding: 12,
    marginBottom: 10,
  },

  cardSoft: {
    borderWidth: 1,
    borderColor: pdfColors.border,
    borderRadius: 10,
    backgroundColor: pdfColors.offWhite,
    padding: 12,
    marginBottom: 10,
  },

  darkCard: {
    borderWidth: 1,
    borderColor: pdfColors.darkCardBorder,
    borderRadius: 12,
    backgroundColor: pdfColors.darkCard,
    padding: 14,
    marginBottom: 10,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 7,
  },

  cardTitle: {
    ...pdfTypography.cardTitle,
    color: pdfColors.navy,
    maxWidth: 360,
  },

  cardSubtitle: {
    ...pdfTypography.small,
    color: pdfColors.muted,
    marginTop: 2,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  col: {
    flexDirection: "column",
  },

  half: {
    width: "50%",
  },

  third: {
    width: "33.33%",
  },

  twoThirds: {
    width: "66.66%",
  },

  badge: {
    ...pdfTypography.badge,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },

  badgeCritical: {
    color: pdfColors.critical,
    backgroundColor: pdfColors.criticalBg,
    borderColor: "#FCA5A5",
  },

  badgeAttention: {
    color: pdfColors.attention,
    backgroundColor: pdfColors.attentionBg,
    borderColor: "#FCD34D",
  },

  badgeSolid: {
    color: pdfColors.solid,
    backgroundColor: pdfColors.solidBg,
    borderColor: "#86EFAC",
  },

  badgeNeutral: {
    color: pdfColors.blue,
    backgroundColor: pdfColors.paleBlue,
    borderColor: pdfColors.border,
  },

  divider: {
    height: 1,
    backgroundColor: pdfColors.border,
    marginVertical: 10,
  },

  bulletRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
  },

  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: pdfColors.blue,
    marginTop: 5,
  },

  bulletText: {
    ...pdfTypography.body,
    color: pdfColors.text,
    flex: 1,
  },

  numberMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: pdfColors.navy,
    color: pdfColors.white,
    textAlign: "center",
    fontSize: 9,
    fontWeight: 700,
    paddingTop: 5,
  },

  callout: {
    borderLeftWidth: 3,
    borderLeftColor: pdfColors.blue,
    backgroundColor: pdfColors.offWhite,
    padding: 11,
    borderRadius: 8,
    marginBottom: 10,
  },

  calloutText: {
    ...pdfTypography.body,
    color: pdfColors.text,
  },

  roadmapColumn: {
    width: "33.33%",
    borderWidth: 1,
    borderColor: pdfColors.border,
    borderRadius: 10,
    padding: 10,
    backgroundColor: pdfColors.white,
  },

  roadmapTitle: {
    ...pdfTypography.cardTitle,
    color: pdfColors.blue,
    marginBottom: 7,
  },

  coverBrand: {
    ...pdfTypography.brand,
    color: pdfColors.white,
    marginBottom: 90,
  },

  coverTitle: {
    ...pdfTypography.coverTitle,
    color: pdfColors.white,
    maxWidth: 440,
  },

  coverSubtitle: {
    ...pdfTypography.coverSubtitle,
    color: "#DDEBFA",
    marginTop: 16,
    maxWidth: 390,
  },

  coverMetaBox: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 44,
    borderTopWidth: 1,
    borderTopColor: "#3A536F",
    paddingTop: 14,
  },

  coverMetaText: {
    ...pdfTypography.small,
    color: "#BFD3EA",
    marginBottom: 3,
  },
});
