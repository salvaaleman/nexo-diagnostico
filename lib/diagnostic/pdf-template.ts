// Nexo IA · Plantilla visual PDF
// Este archivo bloquea la identidad visual del informe.
// No contiene datos de clientes. Solo diseño.

export const PDF_THEME = {
  colors: {
    white: "#FFFFFF",
    blueLight: "#27A7DE",
    blue: "#0C7EC4",
    blueDark: "#00002F",
    text: "#111827",
    muted: "#5B6472",
    softBg: "#F4F8FB",
    line: "#D9E4EC",
  },

  fonts: {
    title: "Nunito Sans ExtraBold",
    subtitle: "Avenir Next Arabic",
    body: "Poppins",
  },

  page: {
    size: "A4",
    paddingTop: 42,
    paddingRight: 44,
    paddingBottom: 38,
    paddingLeft: 44,
  },

  header: {
    height: 18,
    color: "#00002F",
  },

  logo: {
    src: "/logo-nexo.png",
    width: 150,
    height: 150,
  },

  typography: {
    coverTitle: 34,
    pageTitle: 25,
    sectionTitle: 18,
    subtitle: 14,
    body: 10.5,
    small: 8.5,
    cardNumber: 30,
  },

  spacing: {
    sectionGap: 18,
    blockGap: 12,
    cardPadding: 14,
    cardRadius: 10,
    pageFooterTop: 18,
  },

  layout: {
    maxProblemsPerPage: 18,
    maxCardsPerRow: 2,
  },
} as const;

export type PdfTheme = typeof PDF_THEME;