"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClientRecord(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    last_name: (formData.get("last_name") as string) || null,
    email: (formData.get("email") as string) || null,
    brand: (formData.get("brand") as string) || null,
    sector: (formData.get("sector") as string) || null,
    phone: (formData.get("phone") as string) || null,
    web: (formData.get("web") as string) || null,
    socials: (formData.get("socials") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };

  if (!payload.name) return;

  const { data, error } = await supabase
    .from("clients")
    .insert(payload)
    .select("id")
    .single();

  if (error || !data?.id) {
    // En producción aquí podríamos lanzar un error con mejor mensaje.
    console.error("Error creando cliente:", error);
    return;
  }

  revalidatePath("/clients");
  redirect(`/clients/${data.id}`);
}

export async function createDiagnosis(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("diagnoses")
    .insert({ client_id: clientId, status: "iniciado" })
    .select("id")
    .single();

  if (data?.id) {
    redirect(`/diagnoses/${data.id}`);
  }
}
