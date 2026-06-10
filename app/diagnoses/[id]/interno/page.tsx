import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, FileText, ArrowRight, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: diagnoses, error } = await supabase
    .from("diagnoses")
    .select(`
      id,
      status,
      created_at,
      client_id,
      clients (
        name,
        last_name,
        brand
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando diagnósticos:", error.message);
  }

  const list = diagnoses ?? [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              NEXO IA
            </h1>
            <p className="text-slate-500 mt-1">
              Diagnósticos de negocio con inteligencia artificial
            </p>
          </div>
          <Link
            href="/diagnoses/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo diagnóstico
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              No hay diagnósticos aún
            </h3>
            <p className="text-slate-500 mb-6">
              Crea tu primer diagnóstico para empezar a analizar negocios.
            </p>
            <Link
              href="/diagnoses/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Crear diagnóstico
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Marca / Negocio
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {list.map((item: any) => {
                    const client = item.clients;
                    const fullName =
                      [client?.name, client?.last_name]
                        .filter(Boolean)
                        .join(" ")
                        .trim() || "Sin nombre";

                    const statusColors: Record<string, string> = {
                      borrador: "bg-yellow-100 text-yellow-700",
                      completo: "bg-emerald-100 text-emerald-700",
                      archivado: "bg-slate-100 text-slate-600",
                    };

                    const statusLabel =
                      item.status === "completo" ? "Completado" : "Borrador";

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                              {fullName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-900">
                              {fullName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {client?.brand ?? "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[item.status] ??
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString(
                                  "es-ES",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/diagnoses/${item.id}/interno`}
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                          >
                            Ver diagnóstico
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}