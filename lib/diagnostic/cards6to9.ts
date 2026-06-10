import type { DiagnosticPattern } from "@/lib/diagnostic/patterns";
import type { StrategicRecommendation } from "@/lib/diagnostic/recommendations";

export interface Card6to9Data {
  number: string;
  title: string;
  status: "CRÍTICO" | "ATENCIÓN" | "FORTALEZA" | "INTERVENCIÓN";
  score?: number;
  description: string;
  icon: string;
  details: {
    resumen: string;
    bloqueo: string;
    lectura: string[];
    riesgo: string;
    reunion: string;
    plan: Array<{ title: string; reason: string }>;
  };
}

interface VariablesMap {
  [key: string]: { score: number; signals: string[] };
}

function calcStatus(score: number): "CRÍTICO" | "ATENCIÓN" | "FORTALEZA" {
  if (score < 40) return "CRÍTICO";
  if (score < 70) return "ATENCIÓN";
  return "FORTALEZA";
}

function avgScore(vars: VariablesMap, keys: string[]): number {
  const values = keys
    .map((k) => vars[k]?.score)
    .filter((v): v is number => v !== undefined);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function buildCard6(
  vars: VariablesMap,
  _patterns: DiagnosticPattern[],
  _rec: StrategicRecommendation
): Card6to9Data {
  const score = avgScore(vars, ["sistemas", "seguimiento", "conversion"]);
  const status = calcStatus(score);

  const sistemas = vars["sistemas"];
  const seguimiento = vars["seguimiento"];
  const conversion = vars["conversion"];

  const signals = [
    ...(sistemas?.signals ?? []),
    ...(seguimiento?.signals ?? []),
    ...(conversion?.signals ?? []),
  ];

  const hasNoSystem = signals.some((s) =>
    /no existe|sin sistema|falta.*proceso|desorden|caótico/i.test(s)
  );
  const hasWeakFollowUp = signals.some((s) =>
    /seguimiento|fugas|pierde|olvida|no.*recontacta/i.test(s)
  );

  let description =
    "El sistema comercial no tiene la estructura necesaria para convertir interés en ventas de forma predecible.";
  if (hasNoSystem && hasWeakFollowUp) {
    description =
      "No existe un sistema comercial documentado y las oportunidades se pierden por falta de seguimiento estructurado.";
  } else if (hasNoSystem) {
    description =
      "Falta un sistema comercial documentado que ordene el proceso desde la captación hasta el cierre.";
  } else if (hasWeakFollowUp) {
    description =
      "Las oportunidades se enfrían por falta de seguimiento sistemático después del primer contacto.";
  }

  return {
    number: "06",
    title: "SISTEMA COMERCIAL",
    status,
    score,
    description,
    icon: "Settings",
    details: {
      resumen:
        "El negocio no cuenta con un sistema comercial que transforme la captación en ventas de forma ordenada. La ausencia de procesos claros genera fugas en cada etapa del pipeline.",
      bloqueo:
        "No existe un recorrido comercial definido: desde que una persona muestra interés hasta que se convierte en cliente, no hay pasos claros, tiempos definidos ni responsables asignados.",
      lectura: [
        "Un sistema comercial débil convierte cada venta en un esfuerzo artesanal. El consultor tiene que recordar quién dijo qué, cuándo seguir y cómo cerrar, en lugar de confiar en un proceso que funcione incluso cuando él no está.",
        "Esto no es solo un problema de organización. Es un problema de ingresos, porque cada oportunidad que se pierde por falta de seguimiento representa tiempo invertido que no se recupera.",
        "La prioridad no es comprar un CRM costoso. La prioridad es definir qué pasa después de cada contacto, quién lo hace, con qué mensaje y con qué objetivo.",
      ],
      riesgo:
        "Si este punto no se corrige, el negocio seguirá dependiendo de la memoria y la energía del momento para vender. Eso pone un techo invisible a los ingresos y hace que el crecimiento sea imposible sin trabajar más horas.",
      reunion:
        "Aquí no estamos hablando de tecnología. Estamos hablando de que cada oportunidad que entra necesita un camino claro. Si no hay pasos definidos, la venta no se pierde porque el cliente no quiera; se pierde porque nadie la guió.",
      plan: [
        {
          title: "Mapear el recorrido del cliente",
          reason:
            "Dibujar cada paso desde el primer contacto hasta la venta: qué pasa, quién lo hace y cuánto tiempo debe tardar.",
        },
        {
          title: "Definir etapas y criterios",
          reason:
            "Establecer qué significa 'contacto', 'interés', 'propuesta', 'negociación' y 'cierre' para que no haya ambigüedad.",
        },
        {
          title: "Crear secuencias de seguimiento",
          reason:
            "Diseñar los mensajes, tiempos y canales para cada etapa sin depender de la memoria del consultor.",
        },
        {
          title: "Medir fugas por etapa",
          reason:
            "Identificar en qué punto del proceso se pierden más oportunidades para priorizar correcciones.",
        },
        {
          title: "Documentar el sistema",
          reason:
            "Convertir el proceso en un documento simple que cualquier persona pueda seguir, incluso si el consultor no está.",
        },
      ],
    },
  };
}

export function buildCard7(
  vars: VariablesMap,
  _patterns: DiagnosticPattern[],
  _rec: StrategicRecommendation
): Card6to9Data {
  const score = avgScore(vars, ["ia", "sistemas"]);
  const status = calcStatus(score);

  const ia = vars["ia"];
  const sistemas = vars["sistemas"];

  const signals = [...(ia?.signals ?? []), ...(sistemas?.signals ?? [])];

  const noAutomation = signals.some((s) =>
    /manual|no.*automatiza|sin.*herramienta|hace.*todo/i.test(s)
  );
  const noAI = signals.some((s) =>
    /no.*usa.*ia|sin.*inteligencia|desconoce.*herramienta/i.test(s)
  );

  let description =
    "El bajo nivel de automatización limita la eficiencia, el seguimiento y la escalabilidad del negocio.";
  if (noAutomation && noAI) {
    description =
      "El negocio opera de forma manual en tareas que podrían automatizarse y no aprovecha herramientas de IA para ganar eficiencia.";
  } else if (noAutomation) {
    description =
      "La mayoría de las tareas operativas y comerciales se hacen manualmente, consumiendo tiempo que no se invierte en crecimiento.";
  } else if (noAI) {
    description =
      "Aunque hay algunos sistemas, no se aprovecha la IA para acelerar contenido, seguimiento o análisis de clientes.";
  }

  return {
    number: "07",
    title: "AUTOMATIZACIÓN E IA",
    status,
    score,
    description,
    icon: "Cpu",
    details: {
      resumen:
        "El negocio depende demasiado del esfuerzo manual para tareas repetitivas. La ausencia de automatización y herramientas de IA genera un techo de productividad que no se puede romper con más horas de trabajo.",
      bloqueo:
        "No hay herramientas que reduzcan la carga operativa. El consultor está ocupado respondiendo mensajes, enviando recordatorios, creando contenido uno por uno y gestionando tareas que un sistema podría ejecutar automáticamente. La tecnología existe, pero no se está usando.",
      lectura: [
        "La automatización no es un lujo tecnológico. Es una decisión estratégica de cuánto vale tu tiempo. Cada hora que pasas haciendo algo que una máquina podría hacer, es una hora que no estás dedicando a vender, crear o descansar.",
        "La IA no reemplaza el juicio humano. Lo potencia. Un consultor que usa IA para contenido, seguimiento y análisis puede atender el triple de clientes sin triplicar su carga mental.",
        "El bloqueo real no es técnico. Es la creencia de que 'configurar sistemas' toma más tiempo que 'hacerlo a mano'. Esa creencia se mantiene verdadera hasta que el volumen de trabajo demuestra que ya no se puede seguir así.",
      ],
      riesgo:
        "Si no se automatiza, el negocio alcanzará un techo de ingresos determinado por las horas disponibles del consultor. Crecer implicará trabajar más, y eventualmente eso genera agotamiento, errores y abandono del proyecto.",
      reunion:
        "No estamos hablando de convertirte en un experto en tecnología. Estamos hablando de que tu tiempo debería ir en lo que solo tú puedes hacer: conversar, diagnosticar, cerrar. Todo lo demás puede tener un sistema.",
      plan: [
        {
          title: "Auditar tareas repetitivas",
          reason:
            "Listar todas las actividades que se repiten semanalmente para identificar cuáles pueden automatizarse primero.",
        },
        {
          title: "Automatizar seguimiento comercial",
          reason:
            "Implementar secuencias automáticas de mensajes y recordatorios para cada etapa del cliente.",
        },
        {
          title: "Usar IA para contenido y análisis",
          reason:
            "Aplicar herramientas de IA para generar contenido, analizar conversaciones y priorizar leads sin intervención manual.",
        },
        {
          title: "Integrar herramientas existentes",
          reason:
            "Conectar CRM, calendario, email y WhatsApp para que la información fluya sin que el consultor tenga que moverla.",
        },
        {
          title: "Medir tiempo recuperado",
          reason:
            "Calcular cuántas horas semanales se liberan con cada automatización para reinvertirlas en ventas o descanso.",
        },
      ],
    },
  };
}

export function buildCard8(
  vars: VariablesMap,
  _patterns: DiagnosticPattern[],
  _rec: StrategicRecommendation
): Card6to9Data {
  const score = avgScore(vars, ["equipo", "delegacion", "liderazgo"]);
  const status = calcStatus(score);

  const equipo = vars["equipo"];
  const delegacion = vars["delegacion"];
  const liderazgo = vars["liderazgo"];

  const signals = [
    ...(equipo?.signals ?? []),
    ...(delegacion?.signals ?? []),
    ...(liderazgo?.signals ?? []),
  ];

  const noTeam = signals.some((s) =>
    /solo|sin.*equipo|no.*contrata|hace.*todo/i.test(s)
  );
  const noDelegation = signals.some((s) =>
    /no.*delega|microgestiona|control.*total|no.*confía/i.test(s)
  );
  const weakLeadership = signals.some((s) =>
    /sin.*liderazgo|no.*dirige|equipo.*desorientado|falta.*vision/i.test(s)
  );

  let description =
    "La estructura de equipo y liderazgo no permite que el negocio funcione sin la presencia constante del fundador.";
  if (noTeam && noDelegation) {
    description =
      "El consultor trabaja solo en todo el negocio y no delega tareas, convirtiéndose en el cuello de botella de todas las operaciones.";
  } else if (noTeam) {
    description =
      "No existe un equipo que soporte las operaciones, lo que limita la capacidad de atención y crecimiento del negocio.";
  } else if (noDelegation) {
    description =
      "Aunque hay personas en el equipo, el consultor retiene el control de todas las decisiones y tareas clave.";
  } else if (weakLeadership) {
    description =
      "El equipo existe pero carece de dirección clara, procesos definidos o una visión compartida de hacia dónde se dirige el negocio.";
  }

  return {
    number: "08",
    title: "EQUIPO Y DELEGACIÓN",
    status,
    score,
    description,
    icon: "Users",
    details: {
      resumen:
        "El negocio está construido alrededor de una sola persona. La ausencia de equipo o la incapacidad para delegar convierte al consultor en el único recurso disponible, limitando la capacidad de crecimiento y aumentando el riesgo de agotamiento.",
      bloqueo:
        "No hay personas ni procesos que permitan que el negocio opere cuando el consultor no está. Cada decisión, cada tarea y cada problema pasan obligatoriamente por él. Esto no es un negocio; es un empleo autoimpuesto con múltiples jefes (los clientes).",
      lectura: [
        "Un negocio que depende al 100% de su fundador no es un activo; es una trampa. Si te enfermas, si quieres vacaciones, si quieres escalar, el negocio se detiene. Eso no es libertad; es una jaula dorada.",
        "Delegar no es perder control. Es ganar escala. El consultor que no delega está diciendo, sin darse cuenta, que prefiere ser indispensable a ser libre. Y la indispensaibilidad es el peor negocio del mundo.",
        "El primer paso no es contratar a alguien caro. Es definir qué tareas no requieren tu juicio experto, documentarlas y entregarlas. La mayoría de los consultores descubren que el 60% de su tiempo está en tareas que cualquier persona organizada podría hacer.",
      ],
      riesgo:
        "Sin equipo ni delegación, el crecimiento del negocio está directamente atado a la capacidad física y mental de una sola persona. El agotamiento es inevitable, y cuando llega, no solo se estanca el negocio: se deteriora la calidad de atención y la reputación.",
      reunion:
        "Aquí la pregunta no es '¿puedes permitirte contratar a alguien?' La pregunta es '¿puedes permitirte seguir siendo el único que hace todo?' Porque cada día que pasa sin delegar, estás decidiendo que tu techo de ingresos es tu techo de energía.",
      plan: [
        {
          title: "Identificar tareas delegables",
          reason:
            "Hacer una lista honesta de todo lo que se hace en una semana y marcar qué no requiere juicio experto ni relación directa con el cliente.",
        },
        {
          title: "Documentar procesos clave",
          reason:
            "Crear instrucciones simples y claras para las tareas repetitivas antes de entregarlas a otra persona.",
        },
        {
          title: "Contratar o asignar un primer apoyo",
          reason:
            "Empezar con una persona part-time o virtual que se haga cargo de operaciones, seguimiento o contenido según la prioridad del negocio.",
        },
        {
          title: "Definir límites de decisión",
          reason:
            "Establecer qué decisiones puede tomar el equipo sin consultar y cuáles requieren aprobación, para liberar mentalmente al consultor.",
        },
        {
          title: "Crear un sistema de liderazgo simple",
          reason:
            "Implementar reuniones breves, objetivos claros y métricas visibles para que el equipo sepa qué éxito se espera sin necesidad de microgestión.",
        },
      ],
    },
  };
}

export function buildCard9(
  vars: VariablesMap,
  _patterns: DiagnosticPattern[],
  _rec: StrategicRecommendation
): Card6to9Data {
  const score = avgScore(vars, ["crecimiento", "escalabilidad", "vision"]);
  const status = calcStatus(score);

  const crecimiento = vars["crecimiento"];
  const escalabilidad = vars["escalabilidad"];
  const vision = vars["vision"];

  const signals = [
    ...(crecimiento?.signals ?? []),
    ...(escalabilidad?.signals ?? []),
    ...(vision?.signals ?? []),
  ];

  const noGrowthPlan = signals.some((s) =>
    /sin.*plan|no.*sabe.*crecer|estancado|techo|imposible.*escalar/i.test(s)
  );
  const noScalability = signals.some((s) =>
    /no.*escalable|depende.*tiempo|no.*multiplica|ingresos.*lineales/i.test(s)
  );
  const noVision = signals.some((s) =>
    /sin.*vision|no.*sabe.*donde|falta.*direccion|confuso.*futuro/i.test(s)
  );

  let description =
    "El negocio carece de una estrategia clara para crecer más allá del esfuerzo directo del consultor.";
  if (noGrowthPlan && noScalability && noVision) {
    description =
      "No existe una visión de crecimiento definida, el modelo no es escalable y no hay un plan para multiplicar ingresos sin multiplicar horas.";
  } else if (noGrowthPlan && noScalability) {
    description =
      "Aunque hay intención de crecer, el modelo de negocio actual no permite escalar porque depende linealmente del tiempo del consultor.";
  } else if (noVision) {
    description =
      "Falta una dirección clara de hacia dónde se quiere llegar, lo que genera decisiones reactivas y oportunidades desperdiciadas.";
  } else if (noScalability) {
    description =
      "La visión existe, pero el modelo actual no permite crecer sin que el consultor trabaje proporcionalmente más.";
  }

  return {
    number: "09",
    title: "CRECIMIENTO Y ESCALABILIDAD",
    status,
    score,
    description,
    icon: "TrendingUp",
    details: {
      resumen:
        "El negocio funciona hoy, pero no tiene un diseño que permita crecer mañana. La ausencia de un plan de escalabilidad condena al consultor a un crecimiento lineal donde más ingresos siempre significan más horas, más estrés y menos libertad.",
      bloqueo:
        "No hay una estrategia que responda a la pregunta: '¿Cómo duplico los ingresos sin duplicar mi tiempo?' El modelo actual está diseñado para funcionar, no para multiplicarse. Cada nuevo cliente representa más carga, no más margen.",
      lectura: [
        "Crecer no es solo tener más clientes. Es tener un modelo que permita que el negocio produzca más valor sin que tú produzcas más horas. Si tu ingreso está atado a tu presencia, no tienes un negocio escalable; tienes un trabajo bien pagado.",
        "La visión de crecimiento no es un sueño abstracto. Es un diseño concreto: ¿qué ofrecerás, a quién, con qué equipo, con qué sistemas y a qué precio para que los números funcionen sin tu intervención constante?",
        "Muchos consultores confunden movimiento con crecimiento. Publicar más, trabajar más, ofrecer más servicios no es escalar. Escalar es que el negocio genere resultados crecientes con una estructura que no depende de tu energía diaria.",
      ],
      riesgo:
        "Sin un modelo escalable, el consultor llegará a un punto de saturación donde no podrá atender más clientes, no podrá cobrar más por tiempo y no podrá delegar porque nunca diseñó el negocio para funcionar sin él. El estancamiento se convierte en retroceso.",
      reunion:
        "Aquí no estamos hablando de ambición. Estamos hablando de arquitectura. Un negocio que no está diseñado para crecer, no crece. Y si no crece, eventualmente se contrae. Necesitamos un plan donde tu tiempo sea el activo más protegido, no el recurso más gastado.",
      plan: [
        {
          title: "Definir la visión de crecimiento a 3 años",
          reason:
            "Establecer con claridad qué tamaño, ingresos y estructura se quiere tener para poder tomar decisiones coherentes hoy.",
        },
        {
          title: "Diseñar un modelo de ingresos escalable",
          reason:
            "Crear ofertas que no dependan 1:1 de horas de consultoría: programas, membresías, productos digitales o licencias.",
        },
        {
          title: "Identificar los cuellos de botella del crecimiento",
          reason:
            "Detectar qué limita hoy la capacidad de atender más clientes: tiempo, equipo, sistemas o posicionamiento.",
        },
        {
          title: "Crear un plan de escalabilidad por fases",
          reason:
            "Diseñar una ruta concreta de etapas: automatización primero, delegación después, nuevas ofertas al final.",
        },
        {
          title: "Medir métricas de crecimiento real",
          reason:
            "Establecer indicadores que muestren si el negocio crece en ingresos por hora invertida, no solo en ingresos totales.",
        },
      ],
    },
  };
}