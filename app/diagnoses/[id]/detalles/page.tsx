import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

function formatAnswer(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function formatQuestionKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export default async function DetallesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error: dbError } = await supabase
      .from("diagnoses")
      .select("id, status, answers, client_id, created_at")
      .eq("id", id)
      .single();

    if (dbError) {
      console.error("DB Error:", dbError.message);
      return <ErrorScreen message={`Error de base de datos: ${dbError.message}`} />;
    }

    if (!data) notFound();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("name, last_name, brand, email")
      .eq("id", data.client_id)
      .single();

    if (clientError) {
      console.error("Client Error:", clientError.message);
    }

    const answers = (data.answers as Record<string, unknown>) ?? {};
    const fullName =
      [client?.name, client?.last_name]
        .filter(Boolean)
        .join(" ")
        .trim() || "Cliente";

    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al listado
            </Link>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Detalles del diagnóstico
                </h1>
                <p className="text-slate-500 mt-1">
                  Respuestas del cuestionario enviado por el cliente
                </p>
              </div>
              <Link
                href={`/diagnoses/${id}/dashboard`}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
              >
                Ver dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Información del cliente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Nombre</p>
                <p className="text-slate-900 font-medium">{fullName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Marca / Negocio</p>
                <p className="text-slate-900 font-medium">{client?.brand ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</p>
                <p className="text-slate-900 font-medium">{client?.email ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Fecha</p>
                <p className="text-slate-900 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {data.created_at ? new Date(data.created_at).toLocaleDateString("es-ES") : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Respuestas del cuestionario
            </h2>

            {Object.keys(answers).length === 0 ? (
              <p className="text-slate-500 text-center py-8">No hay respuestas registradas.</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(answers).map(([key, value], index) => (
                  <div key={key} className="border border-slate-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{formatQuestionKey(key)}</p>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{formatAnswer(value)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={`/diagnoses/${id}/dashboard`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Ver análisis completo (9 tarjetas)
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (e: any) {
    console.error("DetallesPage Error:", e.message);
    return <ErrorScreen message={`Error inesperado: ${e.message}`} />;
  }
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-xl border border-red-200 p-8 max-w-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error en la página</h2>
        <p className="text-slate-600 mb-4">{message}</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
          ← Volver al listado
        </Link>
      </div>
    </div>
  );
}