import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { analyzeAnswers } from "@/lib/diagnostic/engine";
import InternalForm from "./InternalForm";
import type { InternalEval } from "@/lib/internal-fields";

export const dynamic = "force-dynamic";

export default async function InternalDiagnosisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("diagnoses")
    .select("id, status, answers, internal_eval, client_id")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const { data: client } = await supabase
    .from("clients")
    .select("name, brand")
    .eq("id", data.client_id)
    .single();

  const answers = (data.answers as Record<string, unknown>) ?? {};

  // Durante desarrollo, recalculamos siempre para ver cambios reales del motor.
  const diagnosticAnalysis = analyzeAnswers(answers);

  return (
    <>
      <TopBar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link href={`/clients/${data.client_id}`} className="hint hover:text-ink">
          ← {client?.name ?? "Cliente"}
        </Link>

        <h1 className="font-display text-3xl mt-4 mb-8">
          Diagnóstico · interno
        </h1>

        <InternalForm
          id={data.id}
          clientName={client?.name ?? "Cliente"}
          brand={client?.brand ?? null}
          answers={answers}
          initialInternal={(data.internal_eval as InternalEval) ?? null}
          diagnosticAnalysis={diagnosticAnalysis}
        />
      </main>
    </>
  );
}