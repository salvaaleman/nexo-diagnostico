"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { InternalEval } from "@/lib/internal-fields";

// Guarda la evaluación interna sin borrar el análisis diagnóstico del motor.
// Conserva internal_eval.diagnostic aunque InternalEval no lo incluya en su tipo.
export async function saveInternalEval(id: string, internal: InternalEval) {
  const supabase = await createClient();

  // Leer el diagnostic guardado previamente para no perderlo.
  const { data: current } = await supabase
    .from("diagnoses")
    .select("internal_eval")
    .eq("id", id)
    .single();

  const existingDiagnostic = (current?.internal_eval as any)?.diagnostic ?? null;

  const payload: Record<string, unknown> = { ...internal };
  if (existingDiagnostic) {
    payload.diagnostic = existingDiagnostic;
  }

  await supabase
    .from("diagnoses")
    .update({ internal_eval: payload, status: "evaluado" })
    .eq("id", id);

  revalidatePath(`/diagnoses/${id}/interno`);
}