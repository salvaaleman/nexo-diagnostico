import { createClient } from "@/lib/supabase/server";
import { analyzeV2 } from "@/lib/diagnostic-v2/analyze";
import type { InternalEval } from "@/lib/internal-fields";
import DashboardView from "./DashboardView";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("diagnoses")
    .select("id, status, answers, internal_eval, client_id, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <ErrorScreen message={`Error de base de datos: ${error.message}`} />
    );
  }

  if (!data) {
    return (
      <ErrorScreen
        message={`No se encontró ningún diagnóstico con este ID: ${id}`}
      />
    );
  }

  const { data: client } = await supabase
    .from("clients")
    .select("name, last_name, brand")
    .eq("id", data.client_id)
    .maybeSingle();

  const answers = (data.answers as Record<string, unknown>) ?? {};
  const diagnosticV2 = analyzeV2(answers);

  const fullName =
    [client?.name, client?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() || "Cliente";

  return (
    <DashboardView
      id={data.id}
      clientId={data.client_id}
      clientName={fullName}
      brand={client?.brand ?? null}
      status={data.status ?? "borrador"}
      createdAt={data.created_at ?? null}
      answers={answers}
      diagnosticReport={diagnosticV2.report}
      diagnosticV2={{
        engine: diagnosticV2.engine,
        report: diagnosticV2.report,
        analyzedAt: diagnosticV2.analyzedAt,
      }}
      initialInternal={(data.internal_eval as InternalEval) ?? null}
    />
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-xl border border-red-200 p-8 max-w-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error en el diagnóstico
        </h2>

        <p className="text-slate-600 mb-4">{message}</p>

        <p className="text-sm text-slate-400">
          La ruta existe, pero la aplicación no puede leer el diagnóstico.
        </p>
      </div>
    </div>
  );
}