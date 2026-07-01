import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type {
  DiagnosticCard,
  DiagnosticReport,
  PriorityItem,
  RoadmapItem,
  CardStatus,
  CardPriority,
} from "./types";

type NexoV2PdfReportProps = {
  report: DiagnosticReport;
  clientName?: string;
};

const MAX_CRITICAL_AREAS = 6;

/* =========================
   COLORES
========================= */

const colors = {
  navy: "#0F1B2D",
  blue: "#1A6BB5",
  white: "#FFFFFF",
  text: "#1E293B",
  muted: "#64748B",
  border: "#D8E3F0",
  pale: "#F6F9FC",
  red: "#B91C1C",
  amber: "#B45309",
  green: "#15803D",
};

/* =========================
   ESTILOS
========================= */

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: colors.text,
  },

  header: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 6,
  },

  brand: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.navy,
  },

  section: {
    marginBottom: 14,
  },

  title: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
    color: colors.navy,
  },

  text: {
    fontSize: 9,
    lineHeight: 1.4,
  },

  card: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: colors.white,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  badge: {
    fontSize: 8,
    padding: 4,
    borderWidth: 1,
    borderRadius: 4,
  },

  critical: { color: colors.red, borderColor: "#FCA5A5" },
  medium: { color: colors.amber, borderColor: "#FCD34D" },
  good: { color: colors.green, borderColor: "#86EFAC" },
});

/* =========================
   HEADER
========================= */

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.brand}>NEXO IA</Text>
    </View>
  );
}

/* =========================
   UTIL
========================= */

function badgeStyle(v: CardStatus | CardPriority) {
  if (v === "critico" || v === "alta") return [styles.badge, styles.critical];
  if (v === "atencion" || v === "media") return [styles.badge, styles.medium];
  return [styles.badge, styles.good];
}

/* =========================
   EXECUTIVE (ÚNICO DIAGNÓSTICO)
========================= */

function ExecutivePage({ report, clientName }: NexoV2PdfReportProps) {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Resumen ejecutivo</Text>
        <Text style={styles.text}>{report.executiveSummary.resumen}</Text>
        <Text style={styles.text}>Cliente: {clientName}</Text>
      </View>
    </Page>
  );
}

/* =========================
   SCORE (SIN INTERPRETACIÓN)
========================= */

function ScorePage({ report }: NexoV2PdfReportProps) {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Radiografía del negocio</Text>

        {Object.entries(report.globalScores).map(([k, v]) => (
          <View key={k} style={styles.card}>
            <Text>{k}</Text>
            <Text>{String(v)}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

/* =========================
   PRIORIDADES (SIN NARRATIVA)
========================= */

function PrioritiesPage({ report }: NexoV2PdfReportProps) {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Prioridades</Text>

        {report.priorities.slice(0, 3).map((p, i) => (
          <View key={i} style={styles.card}>
            <Text>{p.titulo}</Text>
            <Text>{p.urgencia}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

/* =========================
   CONSECUENCIAS (SIN DIAGNÓSTICO)
========================= */

function ConsequencesPage({ report }: NexoV2PdfReportProps) {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Escenarios</Text>

        {report.priorities.slice(0, 3).map((p, i) => (
          <View key={i} style={styles.card}>
            <Text>{p.impacto}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

/* =========================
   ÁREAS (SOLO DATOS)
========================= */

function AreaPage({ cards }: { cards: DiagnosticCard[] }) {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Áreas críticas</Text>

        {cards.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text>{c.titulo}</Text>

            <View style={styles.row}>
              <Text style={badgeStyle(c.estado)}>{c.estado}</Text>
              <Text style={badgeStyle(c.prioridad)}>{c.prioridad}</Text>
            </View>

            <Text>{c.resumen}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

/* =========================
   CIERRE (SIN RESUMEN)
========================= */

function ClosingPage() {
  return (
    <Page style={styles.page}>
      <Header />

      <View style={styles.section}>
        <Text style={styles.title}>Siguiente paso</Text>

        <Text style={styles.text}>
          Revisión estratégica personalizada para definir prioridades de acción.
        </Text>

        {/* QR SOLO AQUÍ */}
        <View style={styles.card}>
          <Text>QR</Text>
        </View>
      </View>
    </Page>
  );
}

/* =========================
   DOCUMENTO FINAL
========================= */

export default function NexoV2PdfReport({
  report,
  clientName = "Cliente NEXO IA",
}: NexoV2PdfReportProps) {
  const cards = report.cards;

  const first = cards.slice(0, 2);
  const second = cards.slice(2, 4);
  const third = cards.slice(4, 6);

  return (
    <Document>
      <ExecutivePage report={report} clientName={clientName} />
      <ScorePage report={report} />
      <PrioritiesPage report={report} />
      <ConsequencesPage report={report} />
      <AreaPage cards={first} />
      <AreaPage cards={second} />
      <AreaPage cards={third} />
      <ClosingPage />
    </Document>
  );
}