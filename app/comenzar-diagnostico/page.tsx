import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Comenzar diagnóstico | NEXO IA",
  description:
    "Página de inicio del Diagnóstico Estratégico NEXO IA tras completar el pago.",
};

export default function ComenzarDiagnosticoPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
          NEXO IA · Diagnóstico Estratégico
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Pago recibido correctamente
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Ya puedes comenzar tu diagnóstico. El cuestionario te llevará entre
          10 y 15 minutos y nos permitirá analizar las áreas clave de tu negocio
          con mayor precisión.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard icon={<Clock />} title="Tiempo estimado" text="Reserva unos minutos tranquilos para responder con claridad." />
          <InfoCard icon={<FileText />} title="Qué recibirás" text="Un diagnóstico estratégico en PDF con señales detectadas, prioridades y recomendaciones iniciales." />
          <InfoCard icon={<CheckCircle2 />} title="Cómo responder" text="Cuanto más concretas sean tus respuestas, más útil será el análisis." />
          <InfoCard icon={<ShieldCheck />} title="Proceso seguro" text="Tus respuestas se utilizarán únicamente para generar tu diagnóstico dentro de NEXO IA." />
        </div>

        <div className="mt-10 rounded-3xl border border-sky-400/30 bg-sky-950/30 p-6">
          <h2 className="text-xl font-bold">Antes de empezar</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            <li>• Responde pensando en la situación real de tu negocio.</li>
            <li>• Evita respuestas demasiado generales.</li>
            <li>• Describe problemas concretos siempre que puedas.</li>
            <li>• Al finalizar, recibirás tu informe estratégico.</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-500 px-7 py-4 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:scale-[1.01]"
          >
            Comenzar diagnóstico
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <p className="text-sm text-slate-400">
            Acceso incluido tras la compra del Diagnóstico Estratégico.
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-sky-400/20 bg-white/[0.03] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  );
}