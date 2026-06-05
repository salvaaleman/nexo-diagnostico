import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DiagnosisClientForm from "./DiagnosisClientForm";

export const dynamic = "force-dynamic";

export default async function ClientDiagnosisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // CRÍTICO: la vista cliente NUNCA pide internal_eval.
  const { data } = await supabase
    .from("diagnoses")
    .select("id, status, answers")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <main className="min-h-screen">
      <DiagnosisClientForm
        id={data.id}
        initialAnswers={(data.answers as Record<string, unknown>) ?? {}}
        initialStatus={data.status}
      />
    </main>
  );
}
