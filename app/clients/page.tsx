import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createClientRecord } from "./actions";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, last_name, brand, sector, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <TopBar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl mb-1">Clientes</h1>
        <p className="hint mb-8">Ficha y análisis estratégico por cliente.</p>

        <details className="mb-10 bg-card border border-line rounded-lg p-5">
          <summary className="label cursor-pointer">+ Nuevo cliente</summary>

          <form action={createClientRecord} className="grid sm:grid-cols-2 gap-3 mt-5">
            <div>
              <label className="label">Nombre *</label>
              <input name="name" required className="field mt-1" />
            </div>

            <div>
              <label className="label">Apellidos *</label>
              <input name="last_name" required className="field mt-1" />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Email *</label>
              <input name="email" type="email" required className="field mt-1" />
            </div>

            <div>
              <label className="label">Empresa o marca *</label>
              <input name="brand" required className="field mt-1" />
            </div>

            <div>
              <label className="label">Área o sector *</label>
              <input
                name="sector"
                required
                placeholder="Ej: salud, ferretería, formación, estética..."
                className="field mt-1"
              />
            </div>

            <div>
              <label className="label">Teléfono</label>
              <input name="phone" className="field mt-1" />
            </div>

            <div>
              <label className="label">Web</label>
              <input name="web" className="field mt-1" />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Redes</label>
              <input name="socials" className="field mt-1" />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Notas iniciales</label>
              <textarea name="notes" className="field mt-1" />
            </div>

            <div className="sm:col-span-2">
              <button className="btn" type="submit">
                Iniciar análisis estratégico
              </button>
            </div>
          </form>
        </details>

        <div className="divide-y divide-line border-y border-line">
          {(clients ?? []).map((c) => (
            <Link
              key={c.id}
              href={`/clients/${c.id}`}
              className="flex items-center justify-between py-4 group"
            >
              <div>
                <p className="font-medium group-hover:text-accent transition-colors">
                  {c.name} {c.last_name ?? ""}
                </p>
                {c.brand && <p className="hint">{c.brand}</p>}
                {c.sector && <p className="hint">{c.sector}</p>}
              </div>
              <span className="hint">→</span>
            </Link>
          ))}

          {(!clients || clients.length === 0) && (
            <p className="hint py-6">Aún no hay clientes.</p>
          )}
        </div>
      </main>
    </>
  );
}