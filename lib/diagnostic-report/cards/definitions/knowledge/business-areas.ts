import type {
  BusinessAreaId,
  BusinessAreaKnowledge,
} from "./types";

export const BUSINESS_AREAS: Record<
  BusinessAreaId,
  BusinessAreaKnowledge
> = {
  business_model: {
    id: "business_model",
    nombre: "Modelo de negocio",
    descripcion:
      "Una propuesta clara reduce dudas, diferencia el negocio y facilita que el cliente entienda por qué debe elegirte.",
    objetivoDiagnostico:
      "Detectar si el negocio sabe qué vende, a quién se dirige, por qué le compran y cómo genera ingresos.",
    senalesHabituales: [
      "Oferta poco clara",
      "Propuesta de valor difícil de explicar",
      "Cliente ideal poco definido",
      "Falta de diferenciación",
    ],
    riesgos: [
      "Comunicación confusa",
      "Baja conversión",
      "Dificultad para captar clientes adecuados",
      "Dependencia excesiva del esfuerzo comercial",
    ],
    recomendacionesBase: [
      "Clarificar la propuesta de valor",
      "Definir con precisión el cliente ideal",
      "Simplificar la oferta comercial",
      "Alinear mensaje, servicio y proceso de venta",
    ],
  },

  captacion: {
    id: "captacion",
    nombre: "Captación",
    descripcion:
      "La captación muestra si el negocio genera oportunidades de forma constante o depende demasiado de acciones puntuales y recomendaciones.",
    objetivoDiagnostico:
      "Identificar si la captación depende de acciones puntuales, recomendaciones o esfuerzos no sistematizados.",
    senalesHabituales: [
      "Entrada irregular de oportunidades",
      "Dependencia de recomendaciones",
      "Falta de canales definidos",
      "Acciones de visibilidad sin estrategia clara",
    ],
    riesgos: [
      "Inestabilidad comercial",
      "Dificultad para planificar crecimiento",
      "Picos de actividad sin continuidad",
      "Dependencia excesiva del entorno cercano",
    ],
    recomendacionesBase: [
      "Definir canales prioritarios de captación",
      "Establecer una rutina comercial medible",
      "Separar visibilidad de generación de oportunidades",
      "Medir origen y calidad de los contactos",
    ],
  },

  conversion: {
    id: "conversion",
    nombre: "Conversión",
    descripcion:
      "La conversión revela si el interés inicial termina transformándose en clientes reales o se pierde durante el proceso comercial.",
    objetivoDiagnostico:
      "Detectar si el negocio pierde oportunidades por falta de claridad, seguimiento o estructura de decisión.",
    senalesHabituales: [
      "Leads que no avanzan",
      "Propuestas sin respuesta",
      "Mensajes comerciales poco claros",
      "Falta de proceso de cierre",
    ],
    riesgos: [
      "Pérdida de oportunidades reales",
      "Mayor coste de captación",
      "Sensación de falta de demanda",
      "Decisiones comerciales basadas en intuición",
    ],
    recomendacionesBase: [
      "Definir un proceso de conversión claro",
      "Mejorar la presentación de la oferta",
      "Establecer criterios de cualificación",
      "Medir tasas de avance y cierre",
    ],
  },

  seguimiento: {
    id: "seguimiento",
    nombre: "Seguimiento",
    descripcion:
      "El seguimiento determina cuánto valor se conserva después del primer contacto y cuántas oportunidades terminan olvidándose.",
    objetivoDiagnostico:
      "Detectar pérdidas por falta de continuidad, memoria comercial o seguimiento estructurado.",
    senalesHabituales: [
      "Contactos sin respuesta posterior",
      "Seguimiento manual e improvisado",
      "Falta de recordatorios",
      "Oportunidades olvidadas",
    ],
    riesgos: [
      "Pérdida silenciosa de ventas",
      "Dependencia de la memoria personal",
      "Baja recuperación de oportunidades",
      "Experiencia comercial inconsistente",
    ],
    recomendacionesBase: [
      "Crear un sistema básico de seguimiento",
      "Clasificar oportunidades por estado",
      "Definir recordatorios y próximas acciones",
      "Registrar interacciones comerciales relevantes",
    ],
  },

  procesos: {
    id: "procesos",
    nombre: "Procesos",
    descripcion:
      "Los procesos indican si el negocio puede crecer de forma ordenada o si cada mejora depende del esfuerzo diario de una sola persona.",
    objetivoDiagnostico:
      "Identificar si el negocio depende demasiado de la improvisación, la memoria o la intervención directa del propietario.",
    senalesHabituales: [
      "Todo depende de una persona",
      "Tareas repetidas sin sistema",
      "Ausencia de procedimientos claros",
      "Dificultad para delegar",
    ],
    riesgos: [
      "Saturación operativa",
      "Errores repetidos",
      "Dificultad para escalar",
      "Crecimiento desordenado",
    ],
    recomendacionesBase: [
      "Documentar procesos críticos",
      "Definir responsables y secuencias",
      "Separar tareas operativas de decisiones estratégicas",
      "Crear rutinas mínimas de revisión",
    ],
  },

  automatizacion: {
    id: "automatizacion",
    nombre: "Automatización",
    descripcion:
      "La automatización solo aporta valor cuando existe un proceso claro sobre el que trabajar, no cuando intenta sustituir el desorden.",
    objetivoDiagnostico:
      "Determinar si el negocio está preparado para automatizar o si primero necesita ordenar procesos y criterios.",
    senalesHabituales: [
      "Uso de herramientas sin integración",
      "Automatizaciones aisladas",
      "Procesos manuales repetitivos",
      "Interés en IA sin diagnóstico previo",
    ],
    riesgos: [
      "Automatizar errores",
      "Aumentar complejidad operativa",
      "Duplicar tareas",
      "Invertir en herramientas sin retorno claro",
    ],
    recomendacionesBase: [
      "Automatizar solo procesos claros",
      "Priorizar tareas repetitivas y medibles",
      "Evitar implementar IA sin criterio operativo",
      "Conectar automatización con seguimiento y conversión",
    ],
  },

  liderazgo: {
    id: "liderazgo",
    nombre: "Dirección y liderazgo",
    descripcion:
      "La dirección estratégica refleja si las decisiones siguen una prioridad clara o responden continuamente a las urgencias del día a día.",
    objetivoDiagnostico:
      "Detectar si la falta de foco, criterio o decisiones pendientes está afectando al avance del negocio.",
    senalesHabituales: [
      "Demasiadas prioridades simultáneas",
      "Decisiones pospuestas",
      "Trabajo reactivo",
      "Falta de revisión estratégica",
    ],
    riesgos: [
      "Dispersión de recursos",
      "Cansancio directivo",
      "Avance lento pese a mucho trabajo",
      "Falta de foco en acciones de mayor impacto",
    ],
    recomendacionesBase: [
      "Definir prioridades trimestrales",
      "Separar urgencias de decisiones estratégicas",
      "Revisar métricas clave de forma periódica",
      "Reducir iniciativas simultáneas",
    ],
  },

  rentabilidad: {
    id: "rentabilidad",
    nombre: "Rentabilidad",
    descripcion:
      "La rentabilidad muestra si el crecimiento genera más beneficio o simplemente incrementa el volumen de trabajo.",
    objetivoDiagnostico:
      "Detectar si el negocio factura, pero no necesariamente mejora margen, eficiencia o estabilidad.",
    senalesHabituales: [
      "Mucho trabajo con poco margen",
      "Precios poco revisados",
      "Servicios difíciles de escalar",
      "Falta de control económico por línea de negocio",
    ],
    riesgos: [
      "Crecimiento poco rentable",
      "Dependencia de volumen",
      "Sobrecarga operativa",
      "Decisiones comerciales sin análisis económico",
    ],
    recomendacionesBase: [
      "Revisar rentabilidad por servicio",
      "Identificar actividades de bajo margen",
      "Ajustar precios, paquetes o condiciones",
      "Medir esfuerzo, coste y retorno",
    ],
  },

  prioridades: {
    id: "prioridades",
    nombre: "Prioridades estratégicas",
    descripcion:
      "Las prioridades ayudan a decidir qué debe corregirse primero para obtener el mayor impacto con el menor esfuerzo posible.",
    objetivoDiagnostico:
      "Definir qué debe corregirse antes, qué puede esperar y qué acciones tienen mayor impacto.",
    senalesHabituales: [
      "Todo parece urgente",
      "Falta de foco mensual",
      "Acciones dispersas",
      "Dificultad para decidir por dónde empezar",
    ],
    riesgos: [
      "Pérdida de tiempo en acciones secundarias",
      "Ejecución sin dirección",
      "Decisiones reactivas",
      "Sensación de avance sin progreso real",
    ],
    recomendacionesBase: [
      "Establecer tres prioridades principales",
      "Ordenar acciones por impacto y urgencia",
      "Evitar abrir nuevas iniciativas antes de cerrar bloqueos críticos",
      "Revisar prioridades cada 30 días",
    ],
  },
};

export function getBusinessAreaKnowledge(
  areaId: BusinessAreaId
): BusinessAreaKnowledge {
  return BUSINESS_AREAS[areaId];
}