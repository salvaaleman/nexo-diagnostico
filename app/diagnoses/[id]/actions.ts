"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { analyzeV2 } from "../../../lib/diagnostic-v2/analyze";

// Guarda las respuestas del cliente y añade el análisis automático V2.
// Conserva cualquier evaluación interna manual existente.
export async function saveAnswers(
  id: string,
  answers: Record<string, unknown>,
  finish: boolean
) {
  const supabase = await createClient();

  const diagnosticV2 = analyzeV2(answers);

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
      diagnostic_v2: diagnosticV2.report,
      diagnostic_v2_raw: diagnosticV2,
    },
  };

  if (finish) update.status = "completado";

  const { error } = await supabase.from("diagnoses").update(update).eq("id", id);

  if (error) {
    throw new Error(`Error guardando diagnóstico: ${error.message}`);
  }

  revalidatePath(`/diagnoses/${id}`);
  revalidatePath(`/diagnoses/${id}/interno`);
}