"use client";

import { useState } from "react";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";
import type { Card6to9Data } from "@/lib/diagnostic/cards6to9";
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

// ─── TIPOS ───
interface CardItem {
  number: string;
  title: string;
  status: "CRÍTICO" | "ATENCIÓN" | "FORTALEZA" | "INTERVENCIÓN";
  score?: number;
  description: string;
  icon: React.ReactNode;
}

interface ExecutiveGridProps {
  recommendations?: StrategicRecommendation;
  cards6to9?: Card6to9Data[];
}

// ─── ICONOS ───
const ICON_MAP: Record<string, React.ReactNode> = {
  Target: <Target size={24} strokeWidth={1.5} />,
  Lightbulb: <Lightbulb size={24} strokeWidth={1.5} />,
  Users: <Users size={24} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={24} strokeWidth={1.5} />,
  Award: <Award size={24} strokeWidth={1.5} />,
  Settings: <Settings size={24} strokeWidth={1.5} />,
  Cpu: <Cpu size={24} strokeWidth={1.5} />,
  AlertTriangle: <AlertTriangle size={24} strokeWidth={1.5} />,
  Wrench: <Wrench size={24} strokeWidth={1.5} />,
};

// ─── TARJETAS 1-5 ESTÁTICAS ───
const STATIC_CARDS: CardItem[] = [
  {
    number: "01",
    title: "PROBLEMA PRINCIPAL",
    status: "CRÍTICO",
    description:
      "La falta de una propuesta de valor clara está limitando la conversión y el crecimiento sostenible del negocio.",
    icon: <Target size={24} strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "OFERTA CONFUSA",
    status: "ATENCIÓN",
    score: 38,
    description:
      "Tu oferta no comunica el valor diferencial de forma efectiva al mercado objetivo.",
    icon: <Lightbulb size={24} strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "FALTA DE OPORTUNIDADES",
    status: "ATENCIÓN",
    score: 45,
    description:
      "Existe dependencia de recomendaciones y no hay un sistema activo de generación de leads.",
    icon: <Users size={24} strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "SEGUIMIENTO DÉBIL",
    status: "CRÍTICO",
    score: 32,
    description:
      "Se pierden oportunidades por falta de seguimiento estructurado y procesos comerciales definidos.",
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
  },
  {
    number: "05",
    title: "POSICIONAMIENTO INSUFICIENTE",
    status: "ATENCIÓN",
    score: 41,
    description:
      "La marca no está posicionada como referente en la mente del cliente ideal.",
    icon: <Award size={24} strokeWidth={1.5} />,
  },
];

// ─── COMPONENTE: BLOQUE DE EVIDENCIAS ───
function EvidenceBlock(props: {
  mainEvidence: string[];
  evidenceToShow: string[];
  additionalEvidenceCount: number;
  showAllEvidence: boolean;
  setShowAllEvidence: (value: boolean | ((prev: boolean) => boolean)) => void;
  description: string;
}) {
  const {
    mainEvidence,
    evidenceToShow,
    additionalEvidenceCount,
    showAllEvidence,
    setShowAllEvidence,
    description,
  } = props;

  return (
    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1F2937]">
            Evidencias principales
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
        </div>
        <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
          {mainEvidence.length} principales
        </span>
      </div>

      {evidenceToShow.length > 0 ? (
        <div className="space-y-3">
          {evidenceToShow.map((problem, index) => (
            <div
              key={`${problem}-${index}`}
              className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4"
            >
              <p className="text-sm font-semibold text-[#2563EB]">
                Evidencia {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {problem}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="leading-relaxed text-[#6B7280]">
          No hay evidencias suficientes registradas para mostrar este bloque.
        </p>
      )}

      {additionalEvidenceCount > 0 && (
        <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#6B7280]">
              {showAllEvidence
                ? "Mostrando todas las evidencias detectadas."
                : `${additionalEvidenceCount} evidencias adicionales detectadas.`}
            </p>
            <button
              onClick={() => setShowAllEvidence((current) => !current)}
              className="rounded-lg border border-[#2563EB]/40 px-4 py-2 text-sm font-semibold text-[#2563EB] transition-all hover:bg-[#EFF6FF]"
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

// ─── COMPONENTE: BLOQUE DE RIESGO ───
function RiskBlock(props: { title: string; children: React.ReactNode }) {
  const { title, children } = props;
  return (
    <div
      className="rounded-2xl bg-[#FEF2F2] p-6"
      style={{
        border: "3px solid rgba(220,38,38,0.72)",
        boxShadow:
          "0 0 0 1px rgba(220,38,38,0.28), 0 18px 55px rgba(220,38,38,0.16)",
      }}
    >
      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">{title}</h3>
      <p className="leading-relaxed text-[#6B7280]">{children}</p>
    </div>
  );
}

// ─── COMPONENTE: BLOQUE DE RECOMENDACIÓN ───
function RecommendationBlock(props: {
  recommendations: StrategicRecommendation;
  children?: React.ReactNode;
}) {
  const { recommendations, children } = props;
  return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6">
      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
        Recomendación comercial
      </h3>
      <p className="font-semibold text-[#2563EB]">
        {recommendations.recommended_pack}
      </p>
      <p className="mt-3 leading-relaxed text-[#6B7280]">
        {recommendations.pack_reason}
      </p>
      {children}
    </div>
  );
}

// ─── COMPONENTE: MODAL PARA TARJETAS 6-9 ───
function Card6to9Modal(props: {
  data: Card6to9Data;
  recommendations: StrategicRecommendation;
  mainEvidence: string[];
  evidenceToShow: string[];
  additionalEvidenceCount: number;
  showAllEvidence: boolean;
  setShowAllEvidence: (value: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const {
    data,
    recommendations,
    mainEvidence,
    evidenceToShow,
    additionalEvidenceCount,
    showAllEvidence,
    setShowAllEvidence,
  } = props;

  return (
    <>
      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
        <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
          Resumen ejecutivo
        </h3>
        <p className="leading-relaxed text-[#6B7280]">{data.details.resumen}</p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
        <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
          Bloqueo detectado
        </h3>
        <p className="text-xl font-semibold leading-snug text-[#1F2937]">
          {data.details.bloqueo}
        </p>
      </div>

      <EvidenceBlock
        mainEvidence={mainEvidence}
        evidenceToShow={evidenceToShow}
        additionalEvidenceCount={additionalEvidenceCount}
        showAllEvidence={showAllEvidence}
        setShowAllEvidence={setShowAllEvidence}
        description="Señales que ayudan a explicar el diagnóstico durante la conversación comercial."
      />

      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
        <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
          Lectura estratégica
        </h3>
        <div className="space-y-4">
          {data.details.lectura.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-[#6B7280]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <RiskBlock title="Impacto comercial">{data.details.riesgo}</RiskBlock>

      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
        <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
          Qué diría en la reunión
        </h3>
        <p className="leading-relaxed text-[#6B7280]">
          {data.details.reunion}
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
        <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
          Plan de prioridades
        </h3>
        <div className="space-y-4">
          {data.details.plan.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <p className="font-semibold text-[#1F2937]">
                {String(index + 1).padStart(2, "0")} · {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      <RecommendationBlock recommendations={recommendations} />
    </>
  );
}

// ─── COMPONENTE PRINCIPAL: EXECUTIVE GRID ───
export default function ExecutiveGrid(props: ExecutiveGridProps) {
  const { recommendations, cards6to9 } = props;

  const [selectedCard, setSelectedCard] = useState(null as CardItem | null);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  function openCard(card: CardItem) {
    setSelectedCard(card);
    setShowAllEvidence(false);
  }

  const mainProblems = recommendations?.main_problems ?? [];
  const mainEvidence = mainProblems.slice(0, 6);
  const additionalEvidence = mainProblems.slice(6);
  const additionalEvidenceCount = additionalEvidence.length;
  const evidenceToShow = showAllEvidence ? mainProblems : mainEvidence;

  // ─── FUSIONAR 1-5 ESTÁTICAS + 6-9 DINÁMICAS ───
  const dynamicCards: CardItem[] =
    cards6to9?.map((c) => ({
      number: c.number,
      title: c.title,
      status: c.status,
      score: c.score,
      description: c.description,
      icon: ICON_MAP[c.icon] || <Settings size={24} strokeWidth={1.5} />,
    })) ?? [];

  const allCards: CardItem[] = [...STATIC_CARDS, ...dynamicCards];

  // Buscar data 6-9 si la tarjeta seleccionada es dinámica
  const selected6to9 =
    selectedCard && cards6to9
      ? cards6to9.find((c) => c.number === selectedCard.number)
      : undefined;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allCards.map((card) => (
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
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          />

          <aside
            className="fixed right-0 top-0 z-[100] h-screen w-[50vw] min-w-[700px] overflow-y-auto border-l"
            style={{
              background: "#F4F6F9",
              borderColor: "#E5E7EB",
            }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#2563EB]">
                    NEXO IA
                  </p>
                  <h2 className="text-3xl font-bold text-[#1F2937]">
                    {selectedCard.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                {selectedCard.number === "01" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Resumen ejecutivo
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        {recommendations.summary}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Problema detectado
                      </h3>
                      <p className="text-xl font-semibold leading-snug text-[#1F2937]">
                        {recommendations.main_bottleneck}
                      </p>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Lectura estratégica
                      </h3>
                      <div className="space-y-4">
                        {recommendations.strategic_explanation
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p
                              key={index}
                              className="leading-relaxed text-[#6B7280]"
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Qué diría en la reunión
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        "Aquí no estamos viendo un problema de trabajar más. Lo
                        que aparece es que el negocio necesita ordenar mejor la
                        forma en que se entiende, se explica y se convierte en
                        una decisión clara para el cliente. Antes de escalar más
                        acciones, hay que corregir esta base."
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Plan de prioridades
                      </h3>
                      {recommendations.priority_plan.length > 0 ? (
                        <div className="space-y-4">
                          {recommendations.priority_plan.map((item, index) => (
                            <div key={`${item.title}-${index}`}>
                              <p className="font-semibold text-[#1F2937]">
                                {String(index + 1).padStart(2, "0")} ·{" "}
                                {item.title}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                                {item.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="leading-relaxed text-[#6B7280]">
                          No hay prioridades definidas para este diagnóstico.
                        </p>
                      )}
                    </div>

                    <RecommendationBlock recommendations={recommendations} />
                  </>
                ) : selectedCard.number === "02" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Resumen ejecutivo
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        La oferta no está funcionando como una herramienta de
                        decisión clara. El problema no es únicamente qué se vende,
                        sino cómo se entiende, cómo se percibe y qué tan rápido
                        el cliente potencial puede identificar el valor real de
                        la propuesta.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Bloqueo detectado
                      </h3>
                      <p className="text-xl font-semibold leading-snug text-[#1F2937]">
                        La propuesta no comunica con suficiente precisión qué
                        problema resuelve, para quién es y por qué debería
                        elegirse ahora.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Lectura estratégica
                      </h3>
                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#6B7280]">
                          Una oferta confusa no siempre significa que el servicio
                          sea débil. Muchas veces significa que el valor está
                          disperso, que el mensaje intenta cubrir demasiadas
                          cosas o que el resultado prometido no aparece con la
                          fuerza suficiente.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
                          Si el cliente potencial no entiende rápidamente qué
                          problema se resuelve, para quién está pensada la
                          solución y qué cambio concreto puede esperar, la venta
                          empieza cuesta arriba. En ese escenario, el consultor tiene
                          que compensar con explicación, cercanía y esfuerzo algo
                          que debería estar más claro desde la propia estructura
                          de la oferta.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Qué diría en la reunión
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        "Aquí no veo un problema de falta de valor. Lo que veo es
                        que la oferta necesita explicarse de una forma más simple
                        y más directa. Si el cliente potencial necesita demasiado
                        tiempo para entender qué compra, para quién es y qué
                        cambio va a conseguir, la decisión se enfría antes de
                        llegar a la venta."
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Plan de prioridades
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            01 · Definir la propuesta principal
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Ordenar qué se vende exactamente y cuál es la idea
                            central que debe recordar el cliente potencial.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            02 · Delimitar el cliente ideal
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Evitar que el mensaje intente hablarle a demasiadas
                            personas y pierda fuerza frente al perfil más
                            rentable.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            03 · Clarificar el resultado esperado
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Traducir la oferta en un cambio concreto, entendible
                            y comercialmente defendible.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            04 · Eliminar ruido comercial
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Reducir explicaciones secundarias, servicios
                            dispersos o mensajes que no ayudan a tomar una
                            decisión.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            05 · Construir un mensaje único de venta
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Crear una forma clara, repetible y consistente de
                            explicar la oferta en contenido, reuniones y
                            seguimiento.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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
                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Resumen ejecutivo
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        El negocio no cuenta con una entrada constante y
                        predecible de nuevas oportunidades. Esto limita el ritmo
                        comercial, reduce las conversaciones útiles y hace que el
                        crecimiento dependa demasiado de contactos puntuales,
                        recomendaciones o esfuerzos aislados.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Bloqueo detectado
                      </h3>
                      <p className="text-xl font-semibold leading-snug text-[#1F2937]">
                        No existe un sistema activo y consistente para generar
                        oportunidades comerciales suficientes.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Lectura estratégica
                      </h3>
                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#6B7280]">
                          La falta de oportunidades no suele aparecer de golpe.
                          Normalmente se acumula cuando el negocio no tiene un
                          mecanismo claro para atraer personas nuevas, activar
                          conversaciones y mantener una entrada constante de
                          posibles clientes.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
                          Si el negocio depende principalmente de conocidos,
                          recomendaciones, publicaciones sueltas o contactos
                          ocasionales, la captación queda fuera de control. Eso
                          impide planificar ventas, medir qué funciona y construir
                          un crecimiento estable.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Qué diría en la reunión
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        "Aquí el problema no parece ser únicamente cerrar mejor.
                        Antes de hablar de cierre, necesitamos mirar cuántas
                        oportunidades reales están entrando al negocio y de dónde
                        vienen. Si no existe un sistema para generar
                        conversaciones nuevas de forma constante, el crecimiento
                        queda demasiado condicionado por momentos puntuales."
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Plan de prioridades
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            01 · Identificar las fuentes actuales de oportunidad
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Revisar de dónde llegan hoy las conversaciones:
                            recomendaciones, redes, contactos directos, eventos,
                            publicidad o acciones aisladas.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            02 · Separar visibilidad de captación real
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            No confundir publicar o tener presencia con generar
                            oportunidades comerciales medibles.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            03 · Definir el perfil de oportunidad adecuada
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Establecer qué tipo de persona merece entrar en el
                            sistema comercial y qué señales indican potencial
                            real.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            04 · Crear un mecanismo de entrada constante
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Diseñar una vía simple para atraer, registrar y
                            activar nuevas conversaciones de manera repetible.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            05 · Medir volumen, calidad y conversión
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Controlar cuántas oportunidades llegan, cuántas son
                            útiles y cuántas avanzan hacia una decisión
                            comercial.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
                        En este caso, la intervención debe ayudar a transformar
                        la captación en un sistema más claro: menos dependencia
                        de contactos sueltos y más capacidad de generar
                        oportunidades útiles de forma constante.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selectedCard.number === "04" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Resumen ejecutivo
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        El negocio está perdiendo oportunidades porque no existe
                        un proceso claro para acompañar, reactivar y llevar cada
                        contacto hacia una decisión. El problema no es solo
                        captar más; también es no dejar que las conversaciones
                        útiles se enfríen por falta de seguimiento.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Bloqueo detectado
                      </h3>
                      <p className="text-xl font-semibold leading-snug text-[#1F2937]">
                        Las oportunidades no avanzan con suficiente estructura
                        después del primer contacto.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Lectura estratégica
                      </h3>
                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#6B7280]">
                          Un seguimiento débil convierte la captación en un
                          esfuerzo incompleto. El negocio puede estar generando
                          interés, pero si después no existe una secuencia clara
                          para acompañar la decisión, resolver dudas y mantener
                          viva la conversación, una parte importante del trabajo
                          comercial se pierde.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
                          Este punto suele ser invisible porque no siempre se ve
                          como un error. Muchas oportunidades simplemente dejan
                          de responder, quedan pendientes o se diluyen con el
                          paso de los días. Pero detrás de eso puede haber falta
                          de criterio, falta de cadencia y ausencia de un proceso
                          definido.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Qué diría en la reunión
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        "Aquí no basta con mirar cuántas personas llegan. También
                        tenemos que mirar qué pasa después. Si una oportunidad
                        muestra interés y luego no hay un proceso claro para
                        acompañarla, la venta no se pierde porque el cliente no
                        quiera; muchas veces se pierde porque nadie la guió hasta
                        una decisión."
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Plan de prioridades
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            01 · Mapear el recorrido actual del contacto
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Identificar qué ocurre desde el primer interés hasta
                            la decisión final, incluyendo los puntos donde las
                            conversaciones se enfrían.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            02 · Definir próximas acciones por etapa
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Establecer qué debe hacerse después de cada contacto:
                            responder, agendar, enviar información, resolver
                            dudas o reactivar.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            03 · Crear una cadencia de seguimiento
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Ordenar tiempos, mensajes y momentos de contacto para
                            que el seguimiento no dependa de improvisación.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            04 · Clasificar oportunidades por temperatura
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Diferenciar contactos fríos, templados y calientes
                            para no tratar todas las conversaciones de la misma
                            forma.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            05 · Medir pérdidas por falta de seguimiento
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Revisar cuántas oportunidades se quedan sin respuesta
                            o sin siguiente paso para detectar el coste real del
                            problema.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
                        En este caso, la intervención debe ordenar el proceso
                        comercial posterior al primer contacto. No se trata solo
                        de captar más oportunidades, sino de aprovechar mejor las
                        que ya muestran interés.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selectedCard.number === "05" && recommendations ? (
                  <>
                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Resumen ejecutivo
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        La marca no ocupa todavía una posición suficientemente
                        clara en la mente del cliente ideal. El negocio puede
                        tener valor, experiencia o una buena solución, pero si el
                        mercado no asocia rápidamente la marca con un problema
                        concreto, una categoría o una ventaja reconocible, la
                        decisión comercial se debilita.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Bloqueo detectado
                      </h3>
                      <p className="text-xl font-semibold leading-snug text-[#1F2937]">
                        El mercado no tiene una razón suficientemente clara para
                        recordar, diferenciar o priorizar esta marca frente a
                        otras opciones.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Lectura estratégica
                      </h3>
                      <div className="space-y-4">
                        <p className="leading-relaxed text-[#6B7280]">
                          Un posicionamiento insuficiente no significa que la
                          marca sea mala. Significa que todavía no está ocupando
                          un espacio claro, defendible y fácil de recordar dentro
                          de su mercado. El cliente potencial puede ver la marca,
                          pero no necesariamente entiende por qué debería
                          prestarle atención antes que a otras alternativas.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
                          Este problema afecta directamente a la conversión,
                          porque una marca poco posicionada necesita explicar más,
                          demostrar más y perseguir más. En cambio, cuando el
                          posicionamiento está bien trabajado, la conversación
                          comercial empieza antes de la reunión: el cliente ya
                          llega con una percepción previa de valor, criterio y
                          especialización.
                        </p>
                        <p className="leading-relaxed text-[#6B7280]">
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

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Qué diría en la reunión
                      </h3>
                      <p className="leading-relaxed text-[#6B7280]">
                        "Aquí no estamos hablando solo de verse mejor o publicar
                        más. Estamos hablando de ocupar un lugar claro en la mente
                        del cliente ideal. Si la persona no entiende rápidamente
                        por qué esta marca es relevante para ella, la conversación
                        comercial empieza con desventaja."
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                      <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                        Plan de prioridades
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            01 · Definir el territorio de posicionamiento
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Aclarar qué problema, categoría o transformación debe
                            representar la marca en la mente del cliente ideal.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            02 · Identificar el punto de vista propio
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Establecer qué cree la marca, qué defiende y qué
                            enfoque la diferencia de mensajes genéricos del
                            mercado.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            03 · Reforzar autoridad percibida
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Mostrar criterio, método, experiencia y señales que
                            eleven la confianza antes de la conversación
                            comercial.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            04 · Ordenar la narrativa de marca
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Convertir el mensaje en una historia clara: problema,
                            tensión, enfoque, solución y resultado esperado.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">
                            05 · Alinear contenido, oferta y venta
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                            Evitar que cada canal comunique algo distinto y
                            construir una percepción coherente en todos los
                            puntos de contacto.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RecommendationBlock recommendations={recommendations}>
                      <p className="mt-4 leading-relaxed text-[#6B7280]">
                        En este caso, la intervención debe ayudar a construir una
                        posición más clara y defendible antes de aumentar la
                        presión comercial. La marca necesita ser más fácil de
                        recordar, más fácil de explicar y más difícil de confundir
                        con otras opciones.
                      </p>
                    </RecommendationBlock>
                  </>
                ) : selected6to9 && recommendations ? (
                  <Card6to9Modal
                    data={selected6to9}
                    recommendations={recommendations}
                    mainEvidence={mainEvidence}
                    evidenceToShow={evidenceToShow}
                    additionalEvidenceCount={additionalEvidenceCount}
                    showAllEvidence={showAllEvidence}
                    setShowAllEvidence={setShowAllEvidence}
                  />
                ) : (
                  <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white">
                    <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                      Resumen
                    </h3>
                    <p className="leading-relaxed text-[#6B7280]">
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