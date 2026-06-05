"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createClientRecord(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    last_name: String(formData.get("last_name") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    brand: String(formData.get("brand") ?? "").trim() || null,
    sector: String(formData.get("sector") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    web: String(formData.get("web") ?? "").trim() || null,
    socials: String(formData.get("socials") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };

  if (!payload.name) return;

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .insert(payload)
    .select("id")
    .single();

  if (clientError || !client?.id) {
    console.error("Error creando cliente:", clientError);
    return;
  }

  const { data: diagnosis, error: diagnosisError } = await supabase
    .from("diagnoses")
    .insert({ client_id: client.id, status: "iniciado" })
    .select("id")
    .single();

  if (diagnosisError || !diagnosis?.id) {
    console.error("Error creando diagnóstico:", diagnosisError);
    return;
  }

  redirect(`/diagnoses/${diagnosis.id}`);
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