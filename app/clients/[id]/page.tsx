import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createDiagnosis } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  iniciado: "Iniciado",
  completado: "Completado",
  evaluado: "Evaluado",
};

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const { data: diagnoses } = await supabase
    .from("diagnoses")
    .select("id, status, created_at")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const newDiagnosis = createDiagnosis.bind(null, id);

  return (
    <>
      <TopBar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/clients" className="hint hover:text-ink">← Clientes</Link>

        <h1 className="font-display text-3xl mt-4 mb-1">{client.name}</h1>
        {client.brand && <p className="hint mb-6">{client.brand}</p>}

        <div className="bg-card border border-line rounded-lg p-5 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm mb-10">
          {client.email && <p><span className="hint">Email · </span>{client.email}</p>}
          {client.phone && <p><span className="hint">Teléfono · </span>{client.phone}</p>}
          {client.web && <p><span className="hint">Web · </span>{client.web}</p>}
          {client.socials && <p><span className="hint">Redes · </span>{client.socials}</p>}
          {client.notes && <p className="sm:col-span-2"><span className="hint">Notas · </span>{client.notes}</p>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Diagnósticos</h2>
          <form action={newDiagnosis}>
            <button className="btn" type="submit">+ Nuevo diagnóstico</button>
          </form>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {(diagnoses ?? []).map((d) => (
            <div key={d.id} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm">
                  {new Date(d.created_at).toLocaleDateString("es-ES", {
                    day: "2-digit", month: "long", year: "numeric",
                  })}
                </p>
                <span className="hint">{STATUS_LABEL[d.status] ?? d.status}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <Link href={`/diagnoses/${d.id}`} className="hover:text-accent">
                  Vista cliente
                </Link>
                <Link href={`/diagnoses/${d.id}/interno`} className="hover:text-accent">
                  Interno
                </Link>
              </div>
            </div>
          ))}
          {(!diagnoses || diagnoses.length === 0) && (
            <p className="hint py-6">Sin diagnósticos todavía.</p>
          )}
        </div>
      </main>
    </>
  );
}
