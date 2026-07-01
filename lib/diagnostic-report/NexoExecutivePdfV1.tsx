import React from "react";
import { Document } from "@react-pdf/renderer";

import type { DiagnosticReport } from "@/lib/diagnostic-report/types";

import { CoverPage } from "./pdf/pages/CoverPage";
import { ExecutiveSummaryPage } from "./pdf/pages/ExecutiveSummaryPage";
import { BusinessAreasPageA } from "./pdf/pages/BusinessAreasPageA";
import { BusinessAreasPageB } from "./pdf/pages/BusinessAreasPageB";
import { PrioritiesPage } from "./pdf/pages/PrioritiesPage";
import { RoadmapPage } from "./pdf/pages/RoadmapPage";
import { RootCausePage } from "./pdf/pages/RootCausePage";
import { ClosingPage } from "./pdf/pages/ClosingPage";
import { InvitationPage } from "./pdf/pages/InvitationPage";

interface NexoExecutivePdfV1Props {
  report: DiagnosticReport;
  clientName?: string;
}

export default function NexoExecutivePdfV1({
  report,
  clientName = "Cliente NEXO IA",
}: NexoExecutivePdfV1Props) {
  return (
    <Document>
      <CoverPage report={report} clientName={clientName} />
      <ExecutiveSummaryPage report={report} />
      <BusinessAreasPageA report={report} />
      <BusinessAreasPageB report={report} />
      <PrioritiesPage report={report} />
      <RoadmapPage report={report} />
      <RootCausePage report={report} />
      <ClosingPage report={report} />
      <InvitationPage />
    </Document>
  );
}