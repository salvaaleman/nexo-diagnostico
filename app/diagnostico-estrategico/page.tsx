import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  ClipboardList,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";

const STRIPE_URL = "https://buy.stripe.com/bJe6oI73FdRl18l7vi0Ba00";

export const metadata = {
  title: "Diagnóstico Estratégico Empresarial | NEXO IA",
  description:
    "Diagnóstico estratégico empresarial asistido por inteligencia artificial para identificar bloqueos, prioridades y oportunidades de mejora en tu negocio.",
};

export default function DiagnosticoEstrategicoPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#101010]">
      <Hero />
      <EditorialProblem />
      <NexoMethod />
      <ReportShowcase />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(79,195,247,0.16),transparent_32%),radial-gradient(circle_at_22%_82%,rgba(214,168,94,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_34%,rgba(255,255,255,0.03)_70%,transparent)]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
        <div>
          <p className="text-3xl font-semibold tracking-[-0.05em]">
            NEXO <span className="text-[#4FC3F7]">IA</span>
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.36em] text-slate-400">
            Diagnóstico estratégico empresarial
          </p>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#metodo" className="transition hover:text-white">
            Qué es
          </a>
          <a href="#informe" className="transition hover:text-white">
            Informe
          </a>
          <a href="#proceso" className="transition hover:text-white">
            Proceso
          </a>
          <a href="#precio" className="transition hover:text-white">
            Precio
          </a>
        </nav>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-110px)] max-w-7xl items-center gap-16 px-6 pb-20 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-300">
            Sistema NEXO IA
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[0.9] tracking-[-0.075em] sm:text-6xl md:text-8xl">
            Hay decisiones que parecen difíciles.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
            En realidad, muchas veces solo falta{" "}
            <span className="font-semibold text-[#d6a85e]">claridad</span>.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={STRIPE_URL}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-500 px-7 py-4 text-sm font-bold text-[#111] shadow-2xl shadow-orange-500/25 transition hover:scale-[1.015]"
            >
              Solicitar diagnóstico · 27 €
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            <p className="flex items-center gap-2 text-sm text-slate-400">
              <Lock className="h-4 w-4" />
              Pago seguro con Stripe
            </p>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <Metric label="Tiempo estimado" value="15 min" />
            <Metric label="Entrega" value="PDF" />
            <Metric label="Precio" value="27 €" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-[3rem] bg-[#4FC3F7]/10 blur-3xl" />

          <div className="relative rotate-[-1deg] rounded-[2.2rem] border border-white/15 bg-white/[0.045] p-4 shadow-2xl shadow-black/60 backdrop-blur">
            <div className="rounded-[1.7rem] border border-white/10 bg-[#0b1424] p-7">
              <div className="mb-12 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-300">NEXO IA</p>
                <span className="rounded-full bg-lime-400/10 px-3 py-1 text-[11px] font-bold text-lime-300">
                  Informe estratégico
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
                <div>
                  <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-slate-500">
                    Diagnóstico
                  </p>
                  <h2 className="text-5xl font-semibold leading-[0.92] tracking-[-0.07em]">
                    Diagnóstico Estratégico Empresarial
                  </h2>

                  <div className="mt-12 space-y-4">
                    <ReportLine width="w-11/12" />
                    <ReportLine width="w-8/12" />
                    <ReportLine width="w-10/12" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/12 bg-black/25 p-6">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                    Prioridad estratégica
                  </p>
                  <p className="mt-6 text-6xl font-semibold text-[#d6a85e]">
                    01
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-slate-300">
                    Ordenar el sistema comercial antes de aumentar la actividad.
                  </p>

                  <div className="mt-10 flex items-end gap-2">
                    {[18, 32, 44, 57, 72, 92].map((height) => (
                      <div
                        key={height}
                        className="w-6 rounded-t bg-[#d6a85e]"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                <MiniCard title="Resumen" value="Claro" />
                <MiniCard title="Áreas" value="9" />
                <MiniCard title="Prioridades" value="3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialProblem() {
  return (
    <section className="border-b border-black/10 bg-[#f8f4ec] px-6 py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="max-w-md text-6xl font-semibold leading-[0.96] tracking-[-0.065em]">
            Cada decisión mueve recursos.
          </h2>

          <div className="mt-12 space-y-4 text-xl text-neutral-600">
            <p>Tiempo.</p>
            <p>Dinero.</p>
            <p>Equipo.</p>
            <p>Marketing.</p>
            <p>Ventas.</p>
          </div>
        </div>

        <div className="border-l border-black/10 pl-12">
          <p className="max-w-2xl text-2xl leading-relaxed tracking-[-0.035em] text-neutral-700">
            Pero muy pocas empresas saben realmente qué decisión tiene mayor
            impacto.
          </p>

          <p className="mt-20 max-w-4xl text-6xl font-semibold leading-[1.02] tracking-[-0.065em]">
            El problema no suele ser ejecutar.{" "}
            <span className="text-[#c79243]">El problema es decidir.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function NexoMethod() {
  return (
    <section id="metodo" className="bg-[#f1ebdf] px-6 py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#c79243]">
            NEXO IA
          </p>

          <h2 className="text-6xl font-semibold leading-[0.96] tracking-[-0.065em]">
            NEXO IA analiza tu negocio.
          </h2>

          <p className="mt-8 max-w-md text-xl leading-relaxed text-neutral-700">
            No para decirte todo. Sino para mostrarte qué deberías mover
            primero.
          </p>

          <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-500">
            El sistema ordena respuestas, detecta señales y convierte
            información dispersa en prioridades estratégicas.
          </p>
        </div>

        <div className="rounded-[2.4rem] bg-white p-8 shadow-2xl shadow-black/10">
          <div className="grid gap-6 md:grid-cols-2">
            <PaperPage number="03" title="Lectura por áreas" />
            <PaperPage number="07" title="Prioridades estratégicas" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportShowcase() {
  return (
    <section
      id="informe"
      className="border-y border-black/10 bg-[#f8f4ec] px-6 py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <h2 className="text-6xl font-semibold tracking-[-0.065em]">
              Qué recibes
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-neutral-600">
              Un informe profesional con claridad accionable.
            </p>
          </div>

          <p className="max-w-3xl text-2xl leading-relaxed tracking-[-0.035em] text-neutral-700">
            El diagnóstico no está pensado para añadir más ruido. Está diseñado
            para ordenar qué ocurre, por qué ocurre y qué conviene revisar
            primero.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ReportItem
            number="01"
            title="Resumen ejecutivo"
            text="Una lectura clara de la situación actual del negocio."
          />
          <ReportItem
            number="02"
            title="Diagnóstico estratégico"
            text="Análisis estructurado de las áreas clave del sistema."
          />
          <ReportItem
            number="03"
            title="Prioridades"
            text="Qué revisar primero para evitar dispersión."
          />
          <ReportItem
            number="04"
            title="Secuencia de acción"
            text="Una primera hoja de ruta para actuar con criterio."
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="proceso" className="bg-[#f6f2ea] px-6 py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-6xl font-semibold tracking-[-0.065em]">
            Cómo funciona
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-neutral-600">
            Un proceso simple. Resultados profesionales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Step
            number="01"
            icon={<ShieldCheck />}
            title="Realizas el pago"
            text="Accedes al proceso del Diagnóstico Estratégico NEXO IA."
          />
          <Step
            number="02"
            icon={<ClipboardList />}
            title="Respondes el cuestionario"
            text="Preguntas diseñadas para extraer información relevante."
          />
          <Step
            number="03"
            icon={<Sparkles />}
            title="El sistema analiza"
            text="NEXO IA procesa respuestas y detecta patrones estratégicos."
          />
          <Step
            number="04"
            icon={<FileText />}
            title="Recibes el diagnóstico"
            text="Tu informe se genera al completar el cuestionario."
          />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precio" className="bg-[#f6f2ea] px-6 pb-32 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2.4rem] bg-[#07111f] p-10 text-white shadow-2xl shadow-black/25 md:p-14">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1fr_0.8fr]">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d6a85e]">
              Precio único
            </p>
            <h2 className="text-5xl font-semibold leading-none tracking-[-0.065em]">
              Diagnóstico Estratégico Empresarial
            </h2>
            <p className="mt-8 text-7xl font-semibold tracking-[-0.07em] text-[#d6a85e]">
              27 €
            </p>
          </div>

          <ul className="space-y-4 text-sm text-slate-300">
            <Feature>Informe profesional en PDF</Feature>
            <Feature>Análisis de áreas clave del negocio</Feature>
            <Feature>Prioridades estratégicas accionables</Feature>
            <Feature>Secuencia inicial de intervención</Feature>
            <Feature>Acceso inmediato tras el pago</Feature>
            <Feature>Sin permanencias ni llamadas comerciales</Feature>
          </ul>

          <div>
            <a
              href={STRIPE_URL}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-500 px-7 py-4 text-sm font-bold text-[#111] shadow-2xl shadow-orange-500/25 transition hover:scale-[1.015]"
            >
              Solicitar diagnóstico · 27 €
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-slate-400">
              <Lock className="h-4 w-4" />
              Pago seguro a través de Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="border-t border-black/10 bg-[#f8f4ec] px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-6xl font-semibold tracking-[-0.065em]">
          Preguntas frecuentes
        </h2>

        <div className="mt-14 divide-y divide-black/10">
          <FaqItem
            question="¿Es una consultoría?"
            answer="No. Es un diagnóstico estratégico automatizado que entrega una primera lectura profesional del negocio. La consultoría personalizada forma parte del Plan Estratégico."
          />
          <FaqItem
            question="¿Qué ocurre después del pago?"
            answer="Tras completar el pago, accederás a una página de bienvenida y desde ahí comenzarás el cuestionario."
          />
          <FaqItem
            question="¿Cuánto tarda el cuestionario?"
            answer="El tiempo estimado es de 10 a 15 minutos, dependiendo del nivel de detalle de tus respuestas."
          />
          <FaqItem
            question="¿Qué recibo al finalizar?"
            answer="Recibirás un informe estratégico en PDF con lectura ejecutiva, prioridades, áreas de mejora y una primera secuencia de intervención."
          />
          <FaqItem
            question="¿Necesito conocimientos técnicos?"
            answer="No. El cuestionario está diseñado para empresarios, autónomos y profesionales. Solo necesitas responder con claridad sobre tu negocio."
          />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#07111f] px-6 py-28 text-white lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.46fr]">
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d6a85e]">
            NEXO IA
          </p>
          <h2 className="max-w-4xl text-6xl font-semibold leading-[1] tracking-[-0.07em]">
            La mayoría de negocios no tienen un problema de esfuerzo. Tienen un
            problema de dirección.
          </h2>
        </div>

        <a
          href={STRIPE_URL}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-500 px-7 py-4 text-sm font-bold text-[#111] shadow-2xl shadow-orange-500/25 transition hover:scale-[1.015]"
        >
          Solicitar diagnóstico · 27 €
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-xl font-semibold">{value}</p>
    </div>
  );
}

function ReportLine({ width }: { width: string }) {
  return <div className={`h-3 rounded-full bg-white/10 ${width}`} />;
}

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function PaperPage({ number, title }: { number: string; title: string }) {
  return (
    <div className="min-h-[370px] rounded-2xl border border-black/10 bg-[#fbfaf7] p-6 shadow-xl shadow-black/5">
      <p className="text-sm font-semibold text-[#c79243]">{number}</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <div className="mt-8 space-y-4">
        <div className="h-3 w-11/12 rounded-full bg-black/10" />
        <div className="h-3 w-8/12 rounded-full bg-black/10" />
        <div className="h-3 w-10/12 rounded-full bg-black/10" />
      </div>

      <div className="mt-12 grid grid-cols-5 items-end gap-2">
        {[42, 74, 61, 88, 71].map((height) => (
          <div
            key={height}
            className="rounded-t bg-[#d6a85e]"
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
}

function ReportItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-8 rounded-xl border border-black/10 bg-[#f8f4ec] p-5">
        <p className="text-sm font-semibold text-[#c79243]">{number}</p>
        <div className="mt-6 h-3 w-10/12 rounded-full bg-black/10" />
        <div className="mt-3 h-3 w-7/12 rounded-full bg-black/10" />
        <div className="mt-8 h-24 rounded-xl bg-gradient-to-br from-[#07111f] via-[#1a2435] to-[#d6a85e]" />
      </div>

      <h3 className="text-xl font-semibold tracking-[-0.035em]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
    </article>
  );
}

function Step({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#c79243]">{number}</span>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-neutral-700">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-semibold tracking-[-0.035em]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
    </article>
  );
}

function Feature({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a85e]" />
      <span>{children}</span>
    </li>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="grid gap-4 py-8 md:grid-cols-[0.45fr_1fr]">
      <h3 className="text-lg font-semibold tracking-[-0.03em]">{question}</h3>
      <p className="leading-relaxed text-neutral-600">{answer}</p>
    </div>
  );
}