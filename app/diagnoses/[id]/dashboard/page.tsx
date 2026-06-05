import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { analyzeAnswers } from "@/lib/diagnostic/engine";
import type { InternalEval } from "@/lib/internal-fields";
import DashboardView from "./DashboardView";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("diagnoses")
    .select("id, status, answers, internal_eval, client_id, created_at")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const { data: client } = await supabase
    .from("clients")
    .select("name, last_name, brand")
    .eq("id", data.client_id)
    .single();

  const answers = (data.answers as Record<string, unknown>) ?? {};
  const diagnosticAnalysis = analyzeAnswers(answers);

  const fullName =
    [client?.name, client?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() || "Cliente";

  return (
    <DashboardView
      id={data.id}
      clientId={data.client_id}
      clientName={fullName}
      brand={client?.brand ?? null}
      status={data.status ?? "borrador"}
      createdAt={data.created_at ?? null}
      answers={answers}
      diagnosticAnalysis={diagnosticAnalysis}
      initialInternal={(data.internal_eval as InternalEval) ?? null}
    />
  );
}