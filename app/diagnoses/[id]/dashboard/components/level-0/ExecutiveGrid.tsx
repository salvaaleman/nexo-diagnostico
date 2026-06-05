"use client";

import { useState } from "react";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";
import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Award,
  Settings,
  Cpu,
  AlertTriangle,
  Wrench,
  X,
} from "lucide-react";

import StrategyCard from "./StrategyCard";

interface ExecutiveGridProps {
  recommendations?: StrategicRecommendation;
}

const CARDS_DATA = [
  {
    number: "01",
    title: "PROBLEMA PRINCIPAL",
    status: "CRÍTICO" as const,
    description:
      "La falta de una propuesta de valor clara está limitando la conversión y el crecimiento sostenible del negocio.",
    icon: <Target size={24} strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "OFERTA CONFUSA",
    status: "ATENCIÓN" as const,
    score: 38,
    description:
      "Tu oferta no comunica el valor diferencial de forma efectiva al mercado objetivo.",
    icon: <Lightbulb size={24} strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "FALTA DE OPORTUNIDADES",
    status: "ATENCIÓN" as const,
    score: 45,
    description:
      "Existe dependencia de recomendaciones y no hay un sistema activo de generación de leads.",
    icon: <Users size={24} strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "SEGUIMIENTO DÉBIL",
    status: "CRÍTICO" as const,
    score: 32,
    description:
      "Se pierden oportunidades por falta de seguimiento estructurado y procesos comerciales definidos.",
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
  },
  {
    number: "05",
    title: "POSICIONAMIENTO INSUFICIENTE",
    status: "ATENCIÓN" as const,
    score: 41,
    description:
      "La marca no está posicionada como referente en la mente del cliente ideal.",
    icon: <Award size={24} strokeWidth={1.5} />,
  },
  {
    number: "06",
    title: "SISTEMA COMERCIAL",
    status: "CRÍTICO" as const,
    score: 36,
    description:
      "No existe un sistema comercial documentado ni procesos estandarizados.",
    icon: <Settings size={24} strokeWidth={1.5} />,
  },
  {
    number: "07",
    title: "AUTOMATIZACIÓN E IA",
    status: "CRÍTICO" as const,
    score: 28,
    description:
      "El bajo nivel de automatización limita eficiencia, seguimiento y escalabilidad.",
    icon: <Cpu size={24} strokeWidth={1.5} />,
  },
  {
    number: "08",
    title: "RIESGOS DETECTADOS",
    status: "CRÍTICO" as const,
    description:
      "Hay riesgos importantes que pueden comprometer el crecimiento sostenible del negocio.",
    icon: <AlertTriangle size={24} strokeWidth={1.5} />,
  },
  {
    number: "09",
    title: "RECOMENDACIÓN NEXO IA",
    status: "INTERVENCIÓN" as const,
    description:
      "Ruta estratégica sugerida para corregir los bloqueos principales y avanzar hacia la propuesta comercial.",
    icon: <Wrench size={24} strokeWidth={1.5} />,
  },
];

function EvidenceBlock({
  mainEvidence,
  evidenceToShow,
  additionalEvidenceCount,
  showAllEvidence,
  setShowAllEvidence,
  description,
}: {
  mainEvidence: string[];
  evidenceToShow: string[];
  additionalEvidenceCount: number;
  showAllEvidence: boolean;
  setShowAllEvidence: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Evidencias principales
          </h3>

          <p className="mt-1 text-sm text-[#B0C4DE]">{description}</p>
        </div>

        <span className="rounded-full border border-[#4FC3F7]/30 bg-[#4FC3F7]/10 px-3 py-1 text-xs font-semibold text-[#4FC3F7]">
          {mainEvidence.length} principales
        </span>
      </div>

      {evidenceToShow.length > 0 ? (
        <div className="space-y-3">
          {evidenceToShow.map((problem, index) => (
            <div
              key={`${problem}-${index}`}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <p className="text-sm font-semibold text-[#4FC3F7]">
                Evidencia {String(index + 1).padStart(2, "0")}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#B0C4DE]">
                {problem}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="leading-relaxed text-[#B0C4DE]">
          No hay evidencias suficientes registradas para mostrar este bloque.
        </p>
      )}

      {additionalEvidenceCount > 0 && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#B0C4DE]">
              {showAllEvidence
                ? "Mostrando todas las evidencias detectadas."
                : `${additionalEvidenceCount} evidencias adicionales detectadas.`}
            </p>

            <button
              onClick={() => setShowAllEvidence((current) => !current)}
              className="rounded-lg border border-[#4FC3F7]/40 px-4 py-2 text-sm font-semibold text-[#4FC3F7] transition-all hover:bg-[#4FC3F7]/10"
            >
              {showAllEvidence
                ? "Ver solo principales"
                : "Ver todas las evidencias"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RiskBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl bg-red-500/[0.08] p-6"
      style={{
        border: "3px solid rgba(239,68,68,0.72)",
        boxShadow:
          "0 0 0 1px rgba(239,68,68,0.28), 0 18px 55px rgba(239,68,68,0.16)",
      }}
    >
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>

      <p className="leading-relaxed text-[#B0C4DE]">{children}</p>
    </div>
  );
}

function RecommendationBlock({
  recommendations,
  children,
}: {
  recommendations: StrategicRecommendation;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#4FC3F7]/20 bg-[#4FC3F7]/[0.04] p-6">
      <h3 className="mb-3 text-lg font-semibold text-white">
        Recomendación comercial
      </h3>

      <p className="font-semibold text-[#4FC3F7]">
        {recommendations.recommended_pack}
      </p>

      <p className="mt-3 leading-relaxed text-[#B0C4DE]">
        {recommendations.pack_reason}
      </p>

      {children}
    </div>
  );
}

export default function ExecutiveGrid({ recommendations }: ExecutiveGridProps) {
  const [selectedCard, setSelectedCard] = useState<
    (typeof CARDS_DATA)[number] | null
  >(null);

  const [showAllEvidence, setShowAllEvidence] = useState(false);

  function openCard(card: (typeof CARDS_DATA)[number]) {
    setSelectedCard(card);
    setShowAllEvidence(false);
  }

  const mainProblems = recommendations?.main_problems ?? [];
  const mainEvidence = mainProblems.slice(0, 6);
  const additionalEvidence = mainProblems.slice(6);
  const additionalEvidenceCount = additionalEvidence.length;
  const evidenceToShow = showAllEvidence ? mainProblems : mainEvidence;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CARDS_DATA.map((card) => (
          <StrategyCard
            key={card.number}
            number={card.number}
            title={card.title}
            status={card.status}
            score={card.score}
            description={card.description}
            icon={card.icon}
            onClick={() => openCard(card)}
          />
        ))}
      </div>

      {selectedCard && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          />

          <aside
            className="fixed right-0 top-0 z-[100] h-screen w-[50vw] min-w-[700px] overflow-y-auto border-l"
            style={{
              background: "#0F1B2D",
              borderColor: "rgba(79,195,247,0.15)",
            }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#4FC3F7]">
                    NEXO IA
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    {selectedCard.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                {selectedCard.number === "01" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Resumen ejecutivo
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        {recommendations.summary}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Problema detectado
                      </h3>

                      <p className="text-xl font-semibold leading-snug text-white">
                        {recommendations.main_bottleneck}
                      </p>

                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        Este es el bloqueo principal que NEXO IA detecta como
                        punto de mayor impacto. No debe tratarse como un detalle
                        aislado, sino como la pieza que condiciona el resto del
                        diagnóstico.
                      </p>
                    </div>

                    <EvidenceBlock
                      mainEvidence={mainEvidence}
                      evidenceToShow={evidenceToShow}
                      additionalEvidenceCount={additionalEvidenceCount}
                      showAllEvidence={showAllEvidence}
                      setShowAllEvidence={setShowAllEvidence}
                      description="Las señales más útiles para explicar el diagnóstico durante la conversación comercial."
                    />

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Lectura estratégica
                      </h3>

                      <div className="space-y-4">
                        {recommendations.strategic_explanation
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p
                              key={index}
                              className="leading-relaxed text-[#B0C4DE]"
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>

                    <RiskBlock title="Consecuencia de no corregirlo">
                      Si este bloqueo se mantiene, cualquier acción posterior
                      —contenido, captación, automatización, seguimiento o IA—
                      seguirá trabajando sobre una base poco clara. Eso obliga a
                      explicar demasiado, reduce la velocidad de decisión y hace
                      que la conversión dependa más del esfuerzo personal que de
                      un sistema comercial ordenado.
                    </RiskBlock>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Qué diría en la reunión
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        “Aquí no estamos viendo un problema de trabajar más. Lo
                        que aparece es que el negocio necesita ordenar mejor la
                        forma en que se entiende, se explica y se convierte en
                        una decisión clara para el cliente. Antes de escalar más
                        acciones, hay que corregir esta base.”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Plan de prioridades
                      </h3>

                      {recommendations.priority_plan.length > 0 ? (
                        <div className="space-y-4">
                          {recommendations.priority_plan.map((item, index) => (
                            <div key={`${item.title}-${index}`}>
                              <p className="font-semibold text-white">
                                {String(index + 1).padStart(2, "0")} ·{" "}
                                {item.title}
                              </p>

                              <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                                {item.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="leading-relaxed text-[#B0C4DE]">
                          No hay prioridades definidas para este diagnóstico.
                        </p>
                      )}
                    </div>

                    <RecommendationBlock recommendations={recommendations} />
                  </>
                ) : selectedCard.number === "02" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Resumen ejecutivo
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        La oferta no está funcionando como una herramienta de
                        decisión clara. El problema no es únicamente qué se vende,
                        sino cómo se entiende, cómo se percibe y qué tan rápido
                        el cliente potencial puede identificar el valor real de
                        la propuesta.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Bloqueo detectado
                      </h3>

                      <p className="text-xl font-semibold leading-snug text-white">
                        La propuesta no comunica con suficiente precisión qué
                        problema resuelve, para quién es y por qué debería
                        elegirse ahora.
                      </p>

                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        Cuando una oferta necesita demasiada explicación, el
                        mercado no avanza con claridad. La conversación comercial
                        se vuelve más pesada, aparecen más dudas y el cliente
                        potencial no siempre entiende la diferencia entre esta
                        solución y otras alternativas disponibles.
                      </p>
                    </div>

                    <EvidenceBlock
                      mainEvidence={mainEvidence}
                      evidenceToShow={evidenceToShow}
                      additionalEvidenceCount={additionalEvidenceCount}
                      showAllEvidence={showAllEvidence}
                      setShowAllEvidence={setShowAllEvidence}
                      description="Señales que ayudan a explicar por qué la oferta puede estar generando confusión o baja claridad comercial."
                    />

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Lectura estratégica
                      </h3>

                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#B0C4DE]">
                          Una oferta confusa no siempre significa que el servicio
                          sea débil. Muchas veces significa que el valor está
                          disperso, que el mensaje intenta cubrir demasiadas
                          cosas o que el resultado prometido no aparece con la
                          fuerza suficiente.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          Si el cliente potencial no entiende rápidamente qué
                          problema se resuelve, para quién está pensada la
                          solución y qué cambio concreto puede esperar, la venta
                          empieza cuesta arriba. En ese escenario, Salvador tiene
                          que compensar con explicación, cercanía y esfuerzo algo
                          que debería estar más claro desde la propia estructura
                          de la oferta.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          La prioridad no es añadir más servicios ni adornar el
                          mensaje. La prioridad es reducir ruido, ordenar la
                          propuesta principal y convertir la oferta en una
                          decisión más fácil de entender.
                        </p>
                      </div>
                    </div>

                    <RiskBlock title="Impacto comercial">
                      El mercado no rechaza necesariamente la solución. Muchas
                      veces simplemente no entiende qué problema resuelve, qué
                      resultado puede esperar o por qué debería actuar ahora.
                      Cuando esto ocurre, la captación se vuelve más costosa, las
                      reuniones requieren demasiada explicación y la conversión
                      depende más del esfuerzo personal que de la claridad de la
                      oferta.
                    </RiskBlock>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Qué diría en la reunión
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        “Aquí no veo un problema de falta de valor. Lo que veo es
                        que la oferta necesita explicarse de una forma más simple
                        y más directa. Si el cliente potencial necesita demasiado
                        tiempo para entender qué compra, para quién es y qué
                        cambio va a conseguir, la decisión se enfría antes de
                        llegar a la venta.”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Plan de prioridades
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white">
                            01 · Definir la propuesta principal
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Ordenar qué se vende exactamente y cuál es la idea
                            central que debe recordar el cliente potencial.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            02 · Delimitar el cliente ideal
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Evitar que el mensaje intente hablarle a demasiadas
                            personas y pierda fuerza frente al perfil más
                            rentable.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            03 · Clarificar el resultado esperado
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Traducir la oferta en un cambio concreto, entendible
                            y comercialmente defendible.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            04 · Eliminar ruido comercial
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Reducir explicaciones secundarias, servicios
                            dispersos o mensajes que no ayudan a tomar una
                            decisión.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            05 · Construir un mensaje único de venta
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Crear una forma clara, repetible y consistente de
                            explicar la oferta en contenido, reuniones y
                            seguimiento.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        En este caso, la intervención debe empezar por ordenar la
                        oferta antes de aumentar captación, automatización o
                        contenido. Si la propuesta no se entiende con claridad,
                        cualquier acción posterior puede generar más movimiento,
                        pero no necesariamente más conversión.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selectedCard.number === "03" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Resumen ejecutivo
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        El negocio no cuenta con una entrada constante y
                        predecible de nuevas oportunidades. Esto limita el ritmo
                        comercial, reduce las conversaciones útiles y hace que el
                        crecimiento dependa demasiado de contactos puntuales,
                        recomendaciones o esfuerzos aislados.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Bloqueo detectado
                      </h3>

                      <p className="text-xl font-semibold leading-snug text-white">
                        No existe un sistema activo y consistente para generar
                        oportunidades comerciales suficientes.
                      </p>

                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        Cuando la entrada de oportunidades no está sistematizada,
                        el negocio entra en ciclos irregulares: semanas con
                        movimiento, semanas sin conversaciones y decisiones
                        comerciales que dependen más de la suerte que de un
                        proceso controlado.
                      </p>
                    </div>

                    <EvidenceBlock
                      mainEvidence={mainEvidence}
                      evidenceToShow={evidenceToShow}
                      additionalEvidenceCount={additionalEvidenceCount}
                      showAllEvidence={showAllEvidence}
                      setShowAllEvidence={setShowAllEvidence}
                      description="Señales que indican falta de captación predecible, dependencia comercial o ausencia de generación activa de demanda."
                    />

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Lectura estratégica
                      </h3>

                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#B0C4DE]">
                          La falta de oportunidades no suele aparecer de golpe.
                          Normalmente se acumula cuando el negocio no tiene un
                          mecanismo claro para atraer personas nuevas, activar
                          conversaciones y mantener una entrada constante de
                          posibles clientes.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          Si el negocio depende principalmente de conocidos,
                          recomendaciones, publicaciones sueltas o contactos
                          ocasionales, la captación queda fuera de control. Eso
                          impide planificar ventas, medir qué funciona y construir
                          un crecimiento estable.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          La prioridad no es hacer más ruido ni publicar por
                          publicar. La prioridad es crear una fuente de
                          oportunidades más intencional, medible y conectada con
                          el cliente ideal.
                        </p>
                      </div>
                    </div>

                    <RiskBlock title="Impacto comercial">
                      Si no se corrige este punto, el negocio seguirá teniendo
                      picos de actividad sin estabilidad comercial. Eso genera
                      presión, dificulta prever ingresos y obliga a reaccionar
                      cada vez que baja el volumen de conversaciones. Sin una
                      entrada constante de oportunidades, incluso una buena oferta
                      puede quedarse sin mercado suficiente al que presentarse.
                    </RiskBlock>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Qué diría en la reunión
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        “Aquí el problema no parece ser únicamente cerrar mejor.
                        Antes de hablar de cierre, necesitamos mirar cuántas
                        oportunidades reales están entrando al negocio y de dónde
                        vienen. Si no existe un sistema para generar
                        conversaciones nuevas de forma constante, el crecimiento
                        queda demasiado condicionado por momentos puntuales.”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Plan de prioridades
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white">
                            01 · Identificar las fuentes actuales de oportunidad
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Revisar de dónde llegan hoy las conversaciones:
                            recomendaciones, redes, contactos directos, eventos,
                            publicidad o acciones aisladas.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            02 · Separar visibilidad de captación real
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            No confundir publicar o tener presencia con generar
                            oportunidades comerciales medibles.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            03 · Definir el perfil de oportunidad adecuada
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Establecer qué tipo de persona merece entrar en el
                            sistema comercial y qué señales indican potencial
                            real.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            04 · Crear un mecanismo de entrada constante
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Diseñar una vía simple para atraer, registrar y
                            activar nuevas conversaciones de manera repetible.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            05 · Medir volumen, calidad y conversión
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Controlar cuántas oportunidades llegan, cuántas son
                            útiles y cuántas avanzan hacia una decisión
                            comercial.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        En este caso, la intervención debe ayudar a transformar
                        la captación en un sistema más claro: menos dependencia
                        de contactos sueltos y más capacidad de generar
                        oportunidades útiles de forma constante.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selectedCard.number === "04" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Resumen ejecutivo
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        El negocio está perdiendo oportunidades porque no existe
                        un proceso claro para acompañar, reactivar y llevar cada
                        contacto hacia una decisión. El problema no es solo
                        captar más; también es no dejar que las conversaciones
                        útiles se enfríen por falta de seguimiento.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Bloqueo detectado
                      </h3>

                      <p className="text-xl font-semibold leading-snug text-white">
                        Las oportunidades no avanzan con suficiente estructura
                        después del primer contacto.
                      </p>

                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        Cuando el seguimiento depende de la memoria, el ánimo o
                        la disponibilidad del momento, muchas conversaciones se
                        quedan abiertas sin una siguiente acción clara. Eso
                        reduce la conversión y hace que contactos con potencial
                        desaparezcan sin haber sido trabajados correctamente.
                      </p>
                    </div>

                    <EvidenceBlock
                      mainEvidence={mainEvidence}
                      evidenceToShow={evidenceToShow}
                      additionalEvidenceCount={additionalEvidenceCount}
                      showAllEvidence={showAllEvidence}
                      setShowAllEvidence={setShowAllEvidence}
                      description="Señales que indican pérdida de oportunidades por falta de proceso, continuidad o acciones comerciales posteriores."
                    />

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Lectura estratégica
                      </h3>

                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#B0C4DE]">
                          Un seguimiento débil convierte la captación en un
                          esfuerzo incompleto. El negocio puede estar generando
                          interés, pero si después no existe una secuencia clara
                          para acompañar la decisión, resolver dudas y mantener
                          viva la conversación, una parte importante del trabajo
                          comercial se pierde.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          Este punto suele ser invisible porque no siempre se ve
                          como un error. Muchas oportunidades simplemente dejan
                          de responder, quedan pendientes o se diluyen con el
                          paso de los días. Pero detrás de eso puede haber falta
                          de criterio, falta de cadencia y ausencia de un proceso
                          definido.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          La prioridad es convertir el seguimiento en un sistema:
                          saber qué hacer después de cada contacto, cuándo
                          hacerlo, con qué mensaje y con qué objetivo comercial.
                        </p>
                      </div>
                    </div>

                    <RiskBlock title="Impacto comercial">
                      Si este punto no se corrige, el negocio seguirá perdiendo
                      ventas que ya estaban parcialmente abiertas. Cada contacto
                      no trabajado representa tiempo, confianza y oportunidad
                      desperdiciada. Además, aumenta la necesidad de captar más
                      personas para compensar lo que se pierde por falta de
                      seguimiento.
                    </RiskBlock>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Qué diría en la reunión
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        “Aquí no basta con mirar cuántas personas llegan. También
                        tenemos que mirar qué pasa después. Si una oportunidad
                        muestra interés y luego no hay un proceso claro para
                        acompañarla, la venta no se pierde porque el cliente no
                        quiera; muchas veces se pierde porque nadie la guió hasta
                        una decisión.”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Plan de prioridades
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white">
                            01 · Mapear el recorrido actual del contacto
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Identificar qué ocurre desde el primer interés hasta
                            la decisión final, incluyendo los puntos donde las
                            conversaciones se enfrían.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            02 · Definir próximas acciones por etapa
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Establecer qué debe hacerse después de cada contacto:
                            responder, agendar, enviar información, resolver
                            dudas o reactivar.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            03 · Crear una cadencia de seguimiento
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Ordenar tiempos, mensajes y momentos de contacto para
                            que el seguimiento no dependa de improvisación.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            04 · Clasificar oportunidades por temperatura
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Diferenciar contactos fríos, templados y calientes
                            para no tratar todas las conversaciones de la misma
                            forma.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            05 · Medir pérdidas por falta de seguimiento
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Revisar cuántas oportunidades se quedan sin respuesta
                            o sin siguiente paso para detectar el coste real del
                            problema.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        En este caso, la intervención debe ordenar el proceso
                        comercial posterior al primer contacto. No se trata solo
                        de captar más oportunidades, sino de aprovechar mejor las
                        que ya muestran interés.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selectedCard.number === "05" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Resumen ejecutivo
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        La marca no ocupa todavía una posición suficientemente
                        clara en la mente del cliente ideal. El negocio puede
                        tener valor, experiencia o una buena solución, pero si el
                        mercado no asocia rápidamente la marca con un problema
                        concreto, una categoría o una ventaja reconocible, la
                        decisión comercial se debilita.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Bloqueo detectado
                      </h3>

                      <p className="text-xl font-semibold leading-snug text-white">
                        El mercado no tiene una razón suficientemente clara para
                        recordar, diferenciar o priorizar esta marca frente a
                        otras opciones.
                      </p>

                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        Cuando el posicionamiento es débil, el negocio puede
                        parecer una opción más dentro del mercado. Eso obliga a
                        competir por cercanía, precio, simpatía o insistencia,
                        en lugar de competir desde autoridad, claridad y
                        relevancia percibida.
                      </p>
                    </div>

                    <EvidenceBlock
                      mainEvidence={mainEvidence}
                      evidenceToShow={evidenceToShow}
                      additionalEvidenceCount={additionalEvidenceCount}
                      showAllEvidence={showAllEvidence}
                      setShowAllEvidence={setShowAllEvidence}
                      description="Señales que indican baja diferenciación, poca autoridad percibida o falta de un lugar claro en la mente del cliente ideal."
                    />

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Lectura estratégica
                      </h3>

                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#B0C4DE]">
                          Un posicionamiento insuficiente no significa que la
                          marca sea mala. Significa que todavía no está ocupando
                          un espacio claro, defendible y fácil de recordar dentro
                          de su mercado. El cliente potencial puede ver la marca,
                          pero no necesariamente entiende por qué debería
                          prestarle atención antes que a otras alternativas.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          Este problema afecta directamente a la conversión,
                          porque una marca poco posicionada necesita explicar más,
                          demostrar más y perseguir más. En cambio, cuando el
                          posicionamiento está bien trabajado, la conversación
                          comercial empieza antes de la reunión: el cliente ya
                          llega con una percepción previa de valor, criterio y
                          especialización.
                        </p>

                        <p className="leading-relaxed text-[#B0C4DE]">
                          La prioridad es definir con precisión qué lugar debe
                          ocupar la marca: qué problema representa, para quién es
                          relevante, qué punto de vista sostiene y por qué debería
                          ser considerada una opción seria.
                        </p>
                      </div>
                    </div>

                    <RiskBlock title="Impacto comercial">
                      Si este punto no se corrige, el negocio seguirá siendo
                      percibido como una opción más. Eso reduce autoridad, baja la
                      intención de compra y hace que muchas conversaciones tengan
                      que empezar desde cero. Sin posicionamiento claro, incluso
                      una buena oferta puede perder fuerza porque el mercado no
                      sabe exactamente por qué debería elegirla.
                    </RiskBlock>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Qué diría en la reunión
                      </h3>

                      <p className="leading-relaxed text-[#B0C4DE]">
                        “Aquí no estamos hablando solo de verse mejor o publicar
                        más. Estamos hablando de ocupar un lugar claro en la mente
                        del cliente ideal. Si la persona no entiende rápidamente
                        por qué esta marca es relevante para ella, la conversación
                        comercial empieza con desventaja.”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Plan de prioridades
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white">
                            01 · Definir el territorio de posicionamiento
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Aclarar qué problema, categoría o transformación debe
                            representar la marca en la mente del cliente ideal.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            02 · Identificar el punto de vista propio
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Establecer qué cree la marca, qué defiende y qué
                            enfoque la diferencia de mensajes genéricos del
                            mercado.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            03 · Reforzar autoridad percibida
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Mostrar criterio, método, experiencia y señales que
                            eleven la confianza antes de la conversación
                            comercial.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            04 · Ordenar la narrativa de marca
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Convertir el mensaje en una historia clara: problema,
                            tensión, enfoque, solución y resultado esperado.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            05 · Alinear contenido, oferta y venta
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-[#B0C4DE]">
                            Evitar que cada canal comunique algo distinto y
                            construir una percepción coherente en todos los
                            puntos de contacto.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#B0C4DE]">
                        En este caso, la intervención debe ayudar a construir una
                        posición más clara y defendible antes de aumentar la
                        presión comercial. La marca necesita ser más fácil de
                        recordar, más fácil de explicar y más difícil de confundir
                        con otras opciones.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : (
                  <div className="rounded-2xl border border-white/10 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      Resumen
                    </h3>

                    <p className="leading-relaxed text-[#B0C4DE]">
                      {selectedCard.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}