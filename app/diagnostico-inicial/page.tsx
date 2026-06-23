export default function DiagnosticoInicialPage() {
  return (
    <main className="min-h-screen bg-[#F4F8FC] text-[#0F1B2D]">
      <section className="min-h-screen bg-[#071426] text-white">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 md:py-12 lg:px-10 xl:px-14">
          <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between lg:mb-16">
            <div>
              <div className="mb-3 font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                <span className="text-white">NEXO</span>{" "}
                <span className="text-[#4FC3F7]">IA</span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D7E9FF] sm:text-sm">
                Diagnóstico estratégico empresarial
              </p>
            </div>

            <div className="rounded-2xl border border-[#1A6BB5]/60 bg-white/5 px-5 py-4 backdrop-blur md:px-6">
              <p className="text-sm text-[#B0C4DE]">
                Sistema de análisis asistido por
              </p>
              <p className="text-base font-bold text-white md:text-lg">
                Inteligencia Artificial
              </p>
            </div>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] xl:gap-20">
            <div>
              <h1 className="mb-7 font-display text-[58px] font-black leading-[0.9] tracking-tight sm:text-[76px] md:text-[92px] lg:text-[84px] xl:text-[104px]">
                Descubre qué está{" "}
                <span className="text-[#168BFF]">frenando</span> tu negocio
              </h1>

              <p className="mb-9 max-w-3xl text-xl leading-relaxed text-[#D7E9FF] sm:text-2xl md:text-[28px]">
                Un diagnóstico inicial que analiza tu negocio y te muestra las
                señales que pueden estar limitando tu crecimiento.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/diagnostico"
                  className="inline-flex justify-center rounded-2xl bg-[#168BFF] px-8 py-5 text-lg font-black text-white shadow-[0_18px_45px_rgba(22,139,255,0.35)] transition hover:bg-[#4FC3F7] hover:text-[#071426] sm:px-10 sm:text-xl"
                >
                  Realizar diagnóstico inicial →
                </a>

                <p className="text-sm font-bold uppercase leading-relaxed text-[#D7E9FF] sm:max-w-[250px]">
                  TIEMPO ESTIMADO: 15 MINUTOS
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <HeroBadge label="Oferta" />
                <HeroBadge label="Captación" />
                <HeroBadge label="Seguimiento" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 hidden rounded-3xl border border-[#1A6BB5]/70 bg-[#0B2138] px-7 py-5 shadow-[0_25px_70px_rgba(22,139,255,0.30)] xl:block">
                <p className="text-sm font-bold uppercase tracking-wide text-[#4FC3F7]">
                  Señal detectada
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  Oferta poco clara
                </p>
              </div>

              <div className="absolute -right-8 bottom-10 hidden rounded-3xl border border-[#1A6BB5]/70 bg-[#0B2138] px-7 py-5 shadow-[0_25px_70px_rgba(22,139,255,0.30)] xl:block">
                <p className="text-sm font-bold uppercase tracking-wide text-[#4FC3F7]">
                  Prioridad
                </p>
                <p className="mt-2 text-2xl font-black text-[#FFD23F]">Alta</p>
              </div>

              <div className="rounded-[32px] border border-[#1A6BB5]/70 bg-[#0B2138] p-5 shadow-[0_30px_90px_rgba(22,139,255,0.3)] sm:p-7 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-black text-white sm:text-2xl">
                      Vista previa de tu diagnóstico
                    </p>
                    <p className="mt-1 text-sm text-[#B0C4DE]">
                      Lectura inicial de señales y prioridades
                    </p>
                  </div>

                  <div className="h-3 w-3 rounded-full bg-[#27D980] shadow-[0_0_20px_rgba(39,217,128,0.75)]" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-[#244C75] bg-[#08192C] p-5 sm:p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wide text-[#D7E9FF]">
                      Salud general
                    </p>

                    <div className="flex h-44 items-center justify-center sm:h-52">
                      <div className="flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-[#244C75] border-r-[#FFD23F] border-t-[#FFD23F] sm:h-44 sm:w-44 sm:border-[20px]">
                        <div className="text-center">
                          <p className="text-4xl font-black text-white sm:text-5xl">
                            62%
                          </p>
                          <p className="text-xs font-bold text-[#FFD23F] sm:text-sm">
                            Nivel medio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#244C75] bg-[#08192C] p-5 sm:p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wide text-[#D7E9FF]">
                      Señales detectadas
                    </p>

                    <div className="space-y-4">
                      <PreviewSignal label="Críticas" value="3" color="#FF4D5E" />
                      <PreviewSignal label="Atención" value="5" color="#FFD23F" />
                      <PreviewSignal label="Correctas" value="8" color="#27D980" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-[#244C75] bg-[#08192C] p-5 sm:p-6">
                  <p className="mb-5 text-xs font-bold uppercase tracking-wide text-[#D7E9FF]">
                    Áreas analizadas
                  </p>

                  <div className="space-y-4">
                    <PreviewBar label="Oferta" value="45%" color="#FF4D5E" />
                    <PreviewBar label="Captación" value="60%" color="#FFB020" />
                    <PreviewBar label="Mensaje" value="70%" color="#7CE35F" />
                    <PreviewBar label="Seguimiento" value="55%" color="#FFD23F" />
                    <PreviewBar label="Procesos" value="40%" color="#FF4D5E" />
                    <PreviewBar
                      label="IA y automatización"
                      value="65%"
                      color="#27D980"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 rounded-3xl border border-[#1A6BB5]/50 bg-white/5 p-4 backdrop-blur sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            <TrustItem title="100% confidencial" text="Tu información está segura" />
            <TrustItem title="Análisis con IA" text="Patrones, señales y riesgos" />
            <TrustItem title="Enfoque estratégico" text="Menos ruido, más claridad" />
            <TrustItem title="Criterio humano" text="La consultoría aporta interpretación" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 md:py-20 lg:px-10 xl:px-14">
        <h2 className="mx-auto mb-10 max-w-5xl text-center font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
          Puede que estés viviendo alguna de{" "}
          <span className="text-[#168BFF]">estas situaciones</span>
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          <PainCard
            icon="?"
            title="No sabes dónde está el problema"
            text="Trabajas, publicas, pruebas herramientas y haces cambios, pero no tienes claro qué parte del negocio necesita atención primero."
          />

          <PainCard
            icon="!"
            title="Todo parece urgente"
            text="Cuando falta diagnóstico, cualquier solución parece válida: más contenido, más anuncios, más IA o más herramientas."
          />

          <PainCard
            icon="↗"
            title="Necesitas claridad antes de actuar"
            text="El objetivo no es hacer más cosas. Es entender mejor qué está ocurriendo para saber dónde actuar con más criterio."
          />
        </div>

        <section className="mt-20">
          <h2 className="mx-auto mb-10 max-w-5xl text-center font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Al finalizar recibirás una{" "}
            <span className="text-[#168BFF]">primera lectura</span> de:
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <ResultCard icon="⌕" text="Qué puede estar frenando el crecimiento" />
            <ResultCard icon="◔" text="Qué áreas necesitan atención" />
            <ResultCard icon="⌁" text="Qué señales hemos detectado" />
            <ResultCard icon="⚑" text="Qué deberías revisar primero" />
          </div>
        </section>

        <section className="mt-20 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
            <h2 className="mb-8 font-display text-4xl font-black leading-tight sm:text-5xl">
              Analizamos diferentes variables en{" "}
              <span className="text-[#168BFF]">8 áreas clave</span> de tu negocio
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <AreaItem title="Oferta" />
              <AreaItem title="Cliente ideal" />
              <AreaItem title="Posicionamiento" />
              <AreaItem title="Comunicación" />
              <AreaItem title="Captación" />
              <AreaItem title="Seguimiento" />
              <AreaItem title="Procesos" />
              <AreaItem title="IA y automatización" />
            </div>
          </div>

          <div className="rounded-3xl bg-[#EAF4FF] p-7 sm:p-9">
            <h2 className="mb-5 font-display text-4xl font-black leading-tight sm:text-5xl">
              Esto no es una auditoría genérica
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-[#26364A] sm:text-xl">
              NEXO IA no vende herramientas, automatizaciones ni promesas
              rápidas. Es un sistema de diagnóstico diseñado para ayudarte a
              entender qué puede estar limitando tu crecimiento antes de seguir
              ejecutando acciones sueltas.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <NoItem text="No es un informe automático genérico" />
              <NoItem text="No es una auditoría de marketing" />
              <NoItem text="No es una propuesta comercial" />
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-[#071426] p-7 text-white sm:p-10 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]">
                Primer paso
              </p>

              <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                Empieza por{" "}
                <span className="text-[#168BFF]">entender</span> dónde está{" "}
                <span className="text-[#168BFF]">roto</span> el sistema de tu
                negocio
              </h2>

              <p className="mt-5 text-lg text-[#D7E9FF] sm:text-xl">
                Más claridad · Mejores decisiones · Mayor crecimiento
              </p>
            </div>

            <div>
              <a
                href="/diagnostico"
                className="inline-flex justify-center rounded-2xl bg-[#168BFF] px-8 py-5 text-lg font-black text-white transition hover:bg-[#4FC3F7] hover:text-[#071426] sm:text-xl"
              >
                Realizar diagnóstico inicial →
              </a>

              <p className="mt-4 text-sm text-[#D7E9FF]">
                Sin compromiso. Sin tarjeta. Solo claridad.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function HeroBadge({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-[#1A6BB5]/50 bg-white/5 px-4 py-3 text-sm font-bold text-[#D7E9FF] backdrop-blur">
      {label}
    </div>
  );
}

function PreviewSignal({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#061120] px-4 py-4">
      <span className="text-base text-white">{label}</span>
      <span className="text-2xl font-black" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function PreviewBar({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[95px_1fr_45px] items-center gap-3 text-sm sm:grid-cols-[150px_1fr_55px] sm:text-base">
      <span className="text-[#D7E9FF]">{label}</span>
      <div className="h-4 overflow-hidden rounded-full bg-[#173452]">
        <div
          className="h-full rounded-full"
          style={{ width: value, backgroundColor: color }}
        />
      </div>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function TrustItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl px-4 py-4">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="mt-1 text-sm text-[#B0C4DE]">{text}</p>
    </div>
  );
}

function PainCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-[#071426] p-7 text-white shadow-sm sm:p-9">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#168BFF] text-4xl font-black text-[#168BFF]">
        {icon}
      </div>

      <h3 className="mb-4 font-display text-3xl font-bold leading-tight">
        {title}
      </h3>

      <p className="text-lg leading-relaxed text-[#D7E9FF]">{text}</p>
    </div>
  );
}

function ResultCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-3xl border border-[#D7E7F7] bg-white p-7 shadow-sm">
      <div className="mb-5 text-6xl font-black text-[#168BFF]">{icon}</div>
      <p className="text-xl font-black leading-snug">{text}</p>
    </div>
  );
}

function AreaItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#F4FAFF] px-5 py-4">
      <div className="h-4 w-4 rounded-full bg-[#168BFF]" />
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
}

function NoItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#0F1B2D] text-xl font-black">
        ×
      </div>
      <p className="text-sm font-bold leading-snug text-[#0F1B2D]">{text}</p>
    </div>
  );
}