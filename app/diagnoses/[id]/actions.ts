"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { analyzeAnswers } from "@/lib/diagnostic/engine";

// Guarda las respuestas del cliente y añade el análisis automático.
// Conserva cualquier evaluación interna manual existente.
export async function saveAnswers(
  id: string,
  answers: Record<string, unknown>,
  finish: boolean
) {
  const supabase = await createClient();
  const diagnosticAnalysis = analyzeAnswers(answers);

  const { data: current } = await supabase
    .from("diagnoses")
    .select("internal_eval")
    .eq("id", id)
    .single();

  const previousInternal =
    current?.internal_eval &&
    typeof current.internal_eval === "object" &&
    !Array.isArray(current.internal_eval)
      ? current.internal_eval
      : {};

  const update: Record<string, unknown> = {
    answers,
    internal_eval: {
      ...previousInternal,
      diagnostic: diagnosticAnalysis,
    },
  };

  if (finish) update.status = "completado";

  await supabase.from("diagnoses").update(update).eq("id", id);

  revalidatePath(`/diagnoses/${id}`);
  revalidatePath(`/diagnoses/${id}/interno`);
}