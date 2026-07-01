"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { InternalEval } from "@/lib/internal-fields";

export async function saveInternalEval(id: string, internal: InternalEval) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("diagnoses")
    .update({
      internal_eval: internal,
      status: "evaluado",
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Error guardando evaluación interna: ${error.message}`);
  }

  revalidatePath(`/diagnoses/${id}/interno`);
}