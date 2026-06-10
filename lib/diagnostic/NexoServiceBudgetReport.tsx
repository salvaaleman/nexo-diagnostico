import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

type ServiceBudgetData = {
  name: string;
  price: string;
  objective: string;
  includes: string[];
  obtains: string[];
  excludes: string[];
};

interface NexoServiceBudgetReportProps {
  clientName: string;
  brand: string | null;
  date: string;
  recommendation: StrategicRecommendation;
}

const SERVICES: Record<string, ServiceBudgetData> = {
  "Diagnóstico NEXO": {
    name: "Diagnóstico NEXO",
    price: "97 €",
    objective:
      "Identificar qué está limitando realmente el crecimiento del negocio antes de recomendar acciones.",
    includes: [
      "Cuestionario de diagnóstico: recogida estructurada de información clave sobre oferta, captación, mensaje, seguimiento y procesos.",
      "Análisis asistido por IA: lectura de respuestas, señales y patrones para ordenar la información del negocio.",
      "Detección de cuellos de botella: identificación de los problemas que pueden estar frenando el crecimiento.",
      "Identificación de riesgos y oportunidades: lectura de puntos críticos y posibles mejoras prioritarias.",
      "Informe de diagnóstico: documento con la evaluación comercial y estratégica del caso.",
      "Sesión de revisión: explicación del diagnóstico y contraste con Salvador Alemán.",
    ],
    obtains: [
      "Comprensión clara de la situación actual del negocio.",
      "Principales problemas detectados y explicados.",
      "Áreas prioritarias de intervención.",
      "Recomendaciones iniciales para decidir el siguiente paso.",
    ],
    excludes: [
      "Implementación.",
      "Gestión de redes sociales.",
      "Diseño gráfico.",
      "Campañas de pago.",
      "Automatizaciones.",
      "Consultoría continuada.",
    ],
  },

  "NEXO Esencial": {
    name: "NEXO Esencial",
    price: "697 €",
    objective:
      "Corregir una única área crítica del negocio interviniendo sobre el principal cuello de botella detectado.",
    includes: [
      "Diagnóstico previo: revisión de la información del negocio para identificar el problema principal.",
      "Auditoría de la problemática seleccionada: análisis específico del área que está generando mayor bloqueo.",
      "Definición de mejoras: propuesta concreta de ajustes para corregir el problema detectado.",
      "Documento estratégico: guía escrita con la lectura del problema, decisiones y recomendaciones.",
      "Recomendaciones concretas: acciones prioritarias para aplicar en los siguientes 15-30 días.",
      "Sesión estratégica: reunión para explicar el documento, resolver dudas y ordenar la ejecución.",
    ],
    obtains: [
      "Una lectura clara del problema principal.",
      "Una propuesta concreta de corrección.",
      "Un documento estratégico aplicable.",
      "Una hoja de acción para los siguientes 15-30 días.",
      "Una sesión de revisión para tomar decisiones con mayor claridad.",
    ],
    excludes: [
      "Gestión operativa.",
      "Ejecución técnica.",
      "Creación de contenidos.",
      "Campañas de pago.",
      "Automatizaciones.",
      "Gestión de campañas.",
    ],
  },

  "NEXO Estratégico": {
    name: "NEXO Estratégico",
    price: "995 €",
    objective:
      "Ordenar el sistema comercial completo del negocio para trabajar con más claridad, prioridad y dirección.",
    includes: [
      "Diagnóstico completo: análisis de la situación comercial para detectar bloqueos, riesgos y prioridades reales.",
      "Revisión de la oferta: evaluación de qué se vende, cómo se presenta y si el valor resulta claro para el cliente.",
      "Revisión del mensaje comercial: ajuste de la forma de explicar la oferta para que sea más comprensible y consistente.",
      "Revisión de la captación: análisis de cómo llegan las oportunidades y qué parte del proceso necesita más estructura.",
      "Revisión del seguimiento: evaluación de cómo se gestionan interesados, conversaciones y oportunidades abiertas.",
      "Revisión del proceso comercial: orden de las fases necesarias para convertir interés en decisión.",
      "Priorización estratégica: definición de qué debe corregirse primero para evitar dispersión.",
      "Dos sesiones estratégicas: reuniones para revisar diagnóstico, decisiones, prioridades y plan de acción.",
    ],
    obtains: [
      "Oferta clara: una forma más precisa de explicar qué se ofrece, para quién y qué problema resuelve.",
      "Mensaje coherente: comunicación más alineada entre oferta, cliente ideal, contenido y venta.",
      "Sistema de captación definido: dirección clara para generar oportunidades sin depender solo de la improvisación.",
      "Proceso comercial estructurado: fases y criterios para ordenar el seguimiento y no perder oportunidades.",
      "Plan de acción de 30 días: prioridades concretas para avanzar con foco después del diagnóstico.",
    ],
    excludes: [
      "Gestión de redes.",
      "Diseño gráfico.",
      "Publicidad.",
      "Campañas de pago.",
      "Automatizaciones.",
      "Implementación técnica.",
    ],
  },

  "NEXO Implementación": {
    name: "NEXO Implementación",
    price: "1.600 €",
    objective:
      "Construir la estrategia y dejar preparados los materiales necesarios para facilitar la ejecución.",
    includes: [
      "Todo lo incluido en NEXO Estratégico.",
      "Mensajes comerciales listos para utilizar: textos base para explicar mejor la oferta y activar conversaciones.",
      "Secuencias de seguimiento: estructura de mensajes para gestionar interesados y oportunidades abiertas.",
      "Guiones comerciales: argumentos y líneas de conversación para presentar la propuesta con más claridad.",
      "Estructuras de captación: definición de recorridos y puntos de contacto para generar oportunidades.",
      "Hoja de ruta de 60 días: planificación priorizada para llevar la estrategia a la práctica.",
      "Cuatro sesiones estratégicas: reuniones de revisión, ajuste y acompañamiento durante el proceso.",
      "Supervisión de implementación: revisión estratégica de avances y correcciones necesarias.",
    ],
    obtains: [
      "Sistema comercial definido.",
      "Materiales preparados para ejecutar.",
      "Prioridades claras.",
      "Estructura de crecimiento.",
      "Menor dependencia de decisiones improvisadas.",
    ],
    excludes: [
      "Gestión diaria.",
      "Community management.",
      "Diseño gráfico.",
      "Publicación de contenidos.",
      "Campañas de pago.",
      "Gestión de campañas.",
      "Desarrollo web.",
    ],
  },

  "PLUS Captación y Mensaje": {
    name: "PLUS Captación y Mensaje",
    price: "397 €",
    objective:
      "Mejorar la forma en que el negocio atrae oportunidades y comunica su valor.",
    includes: [
      "Revisión del mensaje: análisis de cómo se explica actualmente la oferta.",
      "Posicionamiento: definición de una dirección más clara para diferenciarse.",
      "Propuesta comercial: ajuste del mensaje principal para hacerlo más comprensible.",
      "Captación principal recomendada: orientación sobre el canal o acción más adecuada para generar oportunidades.",
      "CTA: definición de una llamada a la acción más clara para el cliente potencial.",
      "Recorrido del prospecto: estructura básica del camino desde el interés hasta la conversación comercial.",
    ],
    obtains: [
      "Comunicación más clara.",
      "Mejor conversión de interesados.",
      "Sistema básico de captación.",
      "Menos dependencia exclusiva de recomendaciones.",
    ],
    excludes: [
      "Gestión de campañas.",
      "Campañas de pago.",
      "Publicaciones.",
      "Community management.",
    ],
  },

  "PLUS Seguimiento y Proceso Comercial": {
    name: "PLUS Seguimiento y Proceso Comercial",
    price: "697 €",
    objective:
      "Mejorar la conversión de oportunidades comerciales mediante seguimiento, orden y proceso.",
    includes: [
      "Diseño del proceso comercial: definición de fases desde el primer contacto hasta la decisión.",
      "Fases de seguimiento: estructura para saber cuándo y cómo retomar conversaciones.",
      "Mensajes de seguimiento: textos base para avanzar oportunidades sin improvisar cada respuesta.",
      "Gestión de objeciones: preparación de respuestas ante dudas frecuentes del cliente.",
      "Recuperación de interesados: estrategia para reactivar contactos que quedaron abiertos.",
      "Checklist comercial: criterios simples para controlar oportunidades y próximos pasos.",
    ],
    obtains: [
      "Mayor control comercial.",
      "Menor pérdida de oportunidades.",
      "Seguimiento estructurado.",
      "Más claridad sobre qué hacer con cada interesado.",
    ],
    excludes: [
      "Llamadas comerciales.",
      "Gestión comercial diaria.",
      "CRM gestionado por NEXO.",
      "Campañas de pago.",
    ],
  },

  "PLUS Automatización Estratégica": {
    name: "PLUS Automatización Estratégica",
    price: "1.397 €",
    objective:
      "Diseñar qué debe automatizarse y cómo debe hacerse antes de montar herramientas.",
    includes: [
      "Análisis de procesos: revisión de tareas, fases y puntos de fricción.",
      "Diseño estratégico: definición de qué automatizar, por qué y en qué orden.",
      "Arquitectura de automatización: mapa del sistema recomendado antes de ejecutar.",
      "Flujos recomendados: secuencias lógicas de contacto, seguimiento o gestión.",
      "Lógica de seguimiento: criterios para activar mensajes, tareas o acciones.",
      "Documento técnico: guía para que la automatización pueda implementarse con claridad.",
    ],
    obtains: [
      "Mapa completo de automatización.",
      "Prioridades de implementación.",
      "Sistema preparado para desarrollarse.",
      "Menos riesgo de automatizar procesos mal definidos.",
    ],
    excludes: [
      "Montaje técnico.",
      "Configuración de herramientas.",
      "Programación.",
      "Gestión de software.",
      "Campañas de pago.",
    ],
  },

  "Auditoría Estratégica de Redes Sociales": {
    name: "Auditoría Estratégica de Redes Sociales",
    price: "297 €",
    objective:
      "Detectar si el perfil digital está alineado con el negocio, la oferta y el tipo de cliente que se quiere atraer.",
    includes: [
      "Revisión del perfil actual: análisis general de presentación, coherencia y claridad.",
      "Análisis de biografía y mensaje principal: evaluación de qué entiende el visitante al entrar.",
      "Revisión de contenido y coherencia visual: lectura estratégica de publicaciones, tono y señales de marca.",
      "Detección de problemas de posicionamiento: identificación de confusión, falta de foco o incoherencia.",
      "Recomendaciones estratégicas: prioridades de mejora antes de publicar más contenido.",
    ],
    obtains: [
      "Lectura clara del estado del perfil.",
      "Problemas prioritarios detectados.",
      "Recomendaciones de mejora.",
      "Próximos pasos sugeridos.",
    ],
    excludes: [
      "Gestión mensual.",
      "Publicaciones.",
      "Diseños.",
      "Reels.",
      "Campañas de pago.",
      "Community management.",
    ],
  },

  "Optimización Estratégica de Perfil": {
    name: "Optimización Estratégica de Perfil",
    price: "249 €",
    objective:
      "Mejorar la presentación del perfil de Instagram o Facebook para comunicar con más claridad qué ofrece el negocio, a quién ayuda y qué acción debe tomar el visitante.",
    includes: [
      "Revisión del perfil actual: lectura de la situación inicial antes de optimizar.",
      "Bio: propuesta de biografía más clara, directa y orientada al cliente.",
      "Mensaje principal: ajuste de la idea central que debe entender quien visita el perfil.",
      "CTA: definición de una llamada a la acción más concreta.",
      "Enlaces: revisión de la coherencia entre perfil, enlace y siguiente paso.",
      "Destacados: recomendación de organización para reforzar confianza y claridad.",
      "Coherencia visual básica: orientación para que el perfil se vea más ordenado y profesional.",
      "Optimización básica realizada: ajustes estratégicos aplicados sobre la estructura del perfil.",
    ],
    obtains: [
      "Perfil más claro.",
      "Mejor posicionamiento.",
      "Mejor comprensión de lo que ofrece.",
      "Mayor capacidad de conversión.",
      "Perfil más ordenado y profesional.",
    ],
    excludes: [
      "Gestión mensual.",
      "Publicaciones.",
      "Diseños.",
      "Reels.",
      "Campañas de pago.",
      "Community management.",
    ],
  },

  "Creación de Contenidos Base": {
    name: "Creación de Contenidos Base",
    price: "397 €/mes",
    objective:
      "Disponer de contenido mensual planificado y preparado para publicar.",
    includes: [
      "6 posts simples: piezas de contenido base para mantener presencia y coherencia.",
      "3 carruseles: publicaciones educativas o explicativas con estructura de lectura.",
      "10 historias: ideas y textos para mantener actividad y conexión con la audiencia.",
      "Copies incluidos: textos preparados para acompañar cada publicación.",
      "Calendario mensual de contenidos: distribución organizada de publicaciones durante el mes.",
      "Planificación básica: enfoque general para evitar improvisación semanal.",
    ],
    obtains: [
      "Contenido organizado.",
      "Calendario de publicaciones.",
      "Coherencia en la comunicación.",
      "Menos improvisación.",
      "Material preparado para publicar.",
    ],
    excludes: [
      "Reels.",
      "Edición de vídeo.",
      "Grabación.",
      "Campañas de pago.",
      "Respuesta a mensajes.",
      "Community management.",
      "Publicación de contenidos.",
    ],
  },

  "Creación de Contenidos Pro": {
    name: "Creación de Contenidos Pro",
    price: "697 €/mes",
    objective:
      "Desarrollar una comunicación más estratégica y orientada al posicionamiento de marca.",
    includes: [
      "8 posts simples: publicaciones orientadas a sostener presencia y autoridad.",
      "6 carruseles: piezas educativas o estratégicas para explicar mejor la propuesta.",
      "15 historias: contenidos breves para reforzar relación, criterio y continuidad.",
      "4 guiones de reels: estructura, texto e idea central para vídeos cortos.",
      "Copies incluidos: textos preparados para cada pieza de contenido.",
      "Calendario editorial estratégico mensual: planificación conectada con objetivos comerciales.",
      "Revisión estratégica mensual: análisis y ajuste del enfoque de contenido.",
    ],
    obtains: [
      "Contenido organizado.",
      "Planificación avanzada.",
      "Contenidos alineados con objetivos comerciales.",
      "Mayor autoridad.",
      "Mejor posicionamiento.",
      "Material preparado para publicar.",
    ],
    excludes: [
      "Edición de reels.",
      "Grabación de vídeo.",
      "Publicación de contenidos.",
      "Community management.",
      "Campañas publicitarias.",
      "Respuesta a mensajes.",
    ],
  },
};

function getServiceData(packName: string): ServiceBudgetData {
  return (
    SERVICES[packName] ?? {
      name: packName,
      price: "Precio pendiente de validar",
      objective:
        "Servicio recomendado a partir del diagnóstico realizado mediante NEXO IA.",
      includes: [
        "Revisión estratégica del caso.",
        "Definición de prioridades.",
        "Recomendaciones concretas.",
      ],
      obtains: [
        "Mayor claridad sobre la intervención recomendada.",
        "Siguiente paso comercial definido.",
      ],
      excludes: ["Servicios no especificados expresamente en esta propuesta."],
    }
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function RecommendationReason({
  serviceName,
}: {
  serviceName: string;
}) {
  return (
    <View style={styles.reasonBox}>
      <Text style={styles.reasonTitle}>¿Por qué recomendamos este servicio?</Text>
      <Text style={styles.reasonText}>
        Según el diagnóstico realizado, se han detectado señales que necesitan
        orden estratégico antes de seguir ejecutando acciones aisladas.
      </Text>
      <Text style={styles.reasonText}>
        Por este motivo recomendamos {serviceName} como intervención principal
        para ordenar prioridades, mejorar la toma de decisiones y construir una
        base más consistente para el crecimiento del negocio.
      </Text>
    </View>
  );
}

export function NexoServiceBudgetReport({
  clientName,
  brand,
  date,
  recommendation,
}: NexoServiceBudgetReportProps) {
  const service = getServiceData(recommendation.recommended_pack);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTitleBlock}>
            <Text style={styles.brandSmall}>NEXO IA</Text>
            <Text style={styles.title}>Presupuesto del Servicio</Text>
          </View>

          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>Fecha</Text>
            <Text style={styles.headerValue}>{date}</Text>
          </View>
        </View>

        <View style={styles.clientBox}>
          <View style={styles.clientColumn}>
            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.clientValue}>{clientName}</Text>
          </View>

          <View style={styles.clientDivider} />

          <View style={styles.clientColumn}>
            <Text style={styles.label}>Empresa / marca</Text>
            <Text style={styles.clientValue}>{brand || "No especificada"}</Text>
          </View>
        </View>

        <View style={styles.serviceHero}>
          <View style={styles.serviceContent}>
            <Text style={styles.labelBlue}>Servicio recomendado</Text>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceObjective}>{service.objective}</Text>
          </View>
        </View>

        <RecommendationReason serviceName={service.name} />

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Qué incluye</Text>
            {service.includes.slice(0, 8).map((item) => (
              <Bullet key={`include-${item}`}>{item}</Bullet>
            ))}
          </View>

          <View style={styles.valueColumn}>
            <Text style={styles.sectionTitle}>Qué obtiene el cliente</Text>
            {service.obtains.slice(0, 6).map((item) => (
              <Bullet key={`obtain-${item}`}>{item}</Bullet>
            ))}
          </View>
        </View>

        <View style={styles.priceStrip}>
          <View style={styles.priceStripLabelBox}>
            <Text style={styles.priceStripLabel}>Inversión del servicio</Text>
          </View>

          <View style={styles.priceStripValueBox}>
            <Text style={styles.priceStripValue}>{service.price}</Text>
          </View>
        </View>

        <View style={styles.paymentBox}>
          <View style={styles.paymentContent}>
            <Text style={styles.sectionTitle}>Forma de pago</Text>
            <Text style={styles.paymentText}>
              50% al aceptar la propuesta.
            </Text>
            <Text style={styles.paymentText}>
              50% a la entrega del servicio.
            </Text>
          </View>

          <View style={styles.signatureDivider} />

          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>Salvador Alemán</Text>
            <Text style={styles.signatureText}>Consultor NEXO IA</Text>
          </View>
        </View>

        <View style={styles.excludesBox}>
          <Text style={styles.excludesTitle}>Qué NO incluye</Text>
          <Text style={styles.excludesText}>{service.excludes.join(" · ")}</Text>
        </View>

        <Text style={styles.footer}>
          Esta propuesta corresponde al servicio recomendado tras el diagnóstico
          realizado mediante NEXO IA. El catálogo completo de servicios puede
          facilitarse como documento independiente.
        </Text>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 20,
    paddingHorizontal: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#F6F9FC",
    color: "#0F1B2D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerTitleBlock: {
    flex: 1,
    paddingRight: 18,
  },
  brandSmall: {
    fontSize: 9.5,
    letterSpacing: 2.7,
    color: "#1A6BB5",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: 700,
  },
  title: {
    fontSize: 23,
    lineHeight: 1.08,
    color: "#0F1B2D",
    fontWeight: 700,
  },
  headerBox: {
    width: 110,
    backgroundColor: "#FFFFFF",
    border: "1 solid #D7E3F0",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  headerLabel: {
    fontSize: 7.6,
    color: "#1A6BB5",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.8,
    fontWeight: 700,
  },
  headerValue: {
    fontSize: 9.6,
    color: "#0F1B2D",
    fontWeight: 700,
  },
  clientBox: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    border: "1 solid #D7E3F0",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginBottom: 10,
  },
  clientColumn: {
    flex: 1,
  },
  clientDivider: {
    width: 1,
    backgroundColor: "#D7E3F0",
    marginHorizontal: 13,
  },
  label: {
    fontSize: 7.6,
    color: "#6B7A90",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.6,
    fontWeight: 700,
  },
  labelBlue: {
    fontSize: 7.7,
    color: "#1A6BB5",
    textTransform: "uppercase",
    marginBottom: 5,
    letterSpacing: 0.8,
    fontWeight: 700,
  },
  clientValue: {
    fontSize: 11.3,
    color: "#0F1B2D",
    fontWeight: 700,
  },
  serviceHero: {
    backgroundColor: "#EAF5FF",
    border: "1 solid #C8E6FA",
    borderRadius: 16,
    padding: 12,
    marginBottom: 9,
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 19,
    color: "#0F1B2D",
    fontWeight: 700,
    marginBottom: 5,
  },
  serviceObjective: {
    fontSize: 9,
    lineHeight: 1.34,
    color: "#24364F",
  },
  reasonBox: {
    backgroundColor: "#FFFFFF",
    border: "1 solid #D7E3F0",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 11,
    marginBottom: 10,
  },
  reasonTitle: {
    fontSize: 9.6,
    color: "#1A6BB5",
    fontWeight: 700,
    marginBottom: 5,
  },
  reasonText: {
    fontSize: 7.4,
    lineHeight: 1.33,
    color: "#24364F",
    marginBottom: 3,
  },
  twoColumns: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 9,
  },
  column: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    border: "1 solid #D7E3F0",
    borderRadius: 14,
    padding: 10,
    minHeight: 210,
  },
  valueColumn: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    border: "1 solid #C8E6FA",
    borderRadius: 14,
    padding: 10,
    minHeight: 210,
  },
  sectionTitle: {
    fontSize: 9.8,
    color: "#1A6BB5",
    fontWeight: 700,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3.9,
  },
  bulletDot: {
    width: 7.5,
    fontSize: 8,
    color: "#2E9ED6",
    lineHeight: 1.18,
  },
  bulletText: {
    flex: 1,
    fontSize: 6.75,
    lineHeight: 1.22,
    color: "#0F1B2D",
  },
  priceStrip: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 9,
  },
  priceStripLabelBox: {
    flex: 1,
    backgroundColor: "#EAF5FF",
    border: "1 solid #C8E6FA",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 13,
    justifyContent: "center",
  },
  priceStripLabel: {
    fontSize: 8.6,
    color: "#1A6BB5",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: 700,
  },
  priceStripValueBox: {
    width: 145,
    backgroundColor: "#4FC3F7",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  priceStripValue: {
    fontSize: 16,
    color: "#0F1B2D",
    fontWeight: 700,
  },
  paymentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    border: "1 solid #D7E3F0",
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
  },
  paymentContent: {
    flex: 1,
  },
  paymentText: {
    fontSize: 8.8,
    lineHeight: 1.28,
    color: "#0F1B2D",
  },
  signatureDivider: {
    width: 1,
    backgroundColor: "#D7E3F0",
    marginHorizontal: 13,
  },
  signatureBox: {
    width: 145,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  signatureLine: {
    fontSize: 10.8,
    color: "#0F1B2D",
    fontWeight: 700,
    marginBottom: 3,
  },
  signatureText: {
    fontSize: 7.6,
    color: "#6B7A90",
  },
  excludesBox: {
    backgroundColor: "#EEF4FA",
    border: "1 solid #D7E3F0",
    borderRadius: 11,
    padding: 7,
    marginBottom: 6,
  },
  excludesTitle: {
    fontSize: 7.2,
    color: "#1A6BB5",
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  excludesText: {
    fontSize: 6.7,
    lineHeight: 1.25,
    color: "#4A5A70",
  },
  footer: {
    fontSize: 6.6,
    lineHeight: 1.25,
    color: "#6B7A90",
    textAlign: "center",
  },
});