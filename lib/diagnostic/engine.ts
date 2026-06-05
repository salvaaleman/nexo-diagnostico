import { QUESTION_VARIABLE_MAP } from "./question-map";
import { detectSignalsFromAnswer } from "./signals";
import { emptyVariables } from "./variables";
import { detectPatternsFromVariables } from "./patterns";
import { detectPatternsV2FromVariables } from "./patterns-v2";
import {
  buildRecommendations,
  type DiagnosticContext,
} from "./recommendations";
import { buildStructuredVariables } from "./structured-variables";

type Answers = Record<string, unknown>;

function normalizeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(normalizeValue).join(" ");
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).map(normalizeValue).join(" ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function buildDiagnosticContext(answers: Answers): DiagnosticContext {
  const rawText = Object.values(answers).map(normalizeValue).join(" ");
  const text = rawText.toLowerCase();

  const has = (terms: string[]) =>
    terms.some((term) => text.includes(term.toLowerCase()));

  const assets: string[] = [];
  const tools: string[] = [];
  const evidence: string[] = [];

  if (has(["logo"])) assets.push("logo");
  if (has(["colores definidos", "colores"])) assets.push("colores definidos");
  if (has(["manual de marca"])) assets.push("manual de marca");
  if (has(["web", "página web", "sitio web"])) assets.push("web");
  if (has(["landing", "landing page"])) assets.push("landing page");
  if (has(["whatsapp business"])) assets.push("WhatsApp Business");
  if (has(["fotos profesionales"])) assets.push("fotos profesionales");
  if (has(["vídeos propios", "videos propios"])) assets.push("vídeos propios");
  if (has(["casos de éxito", "casos de exito"])) assets.push("casos de éxito");
  if (has(["testimonios"])) assets.push("testimonios");
  if (has(["pdf"])) assets.push("PDF");
  if (has(["lead magnet"])) assets.push("lead magnet");
  if (has(["presentación comercial", "presentacion comercial"])) {
    assets.push("presentación comercial");
  }
  if (has(["crm"])) assets.push("CRM");
  if (has(["base de datos"])) assets.push("base de datos");
  if (has(["calendario de contenido"])) assets.push("calendario de contenido");

  if (has(["chatgpt"])) tools.push("ChatGPT");
  if (has(["claude"])) tools.push("Claude");
  if (has(["gemini"])) tools.push("Gemini");
  if (has(["canva"])) tools.push("Canva");
  if (has(["capcut"])) tools.push("CapCut");
  if (has(["notion"])) tools.push("Notion");
  if (has(["google sheets"])) tools.push("Google Sheets");
  if (has(["metricool"])) tools.push("Metricool");
  if (has(["trello"])) tools.push("Trello");
  if (has(["zapier"])) tools.push("Zapier");
  if (has(["make"])) tools.push("Make");
  if (has(["gohighlevel", "go high level", "ghl"])) tools.push("GoHighLevel");

  const hasCommercialAssets =
    has(["testimonios", "casos de éxito", "casos de exito"]) ||
    assets.includes("testimonios") ||
    assets.includes("casos de éxito");

  const hasOperationalAssets =
    assets.includes("CRM") ||
    assets.includes("base de datos") ||
    tools.includes("GoHighLevel") ||
    tools.includes("Zapier") ||
    tools.includes("Make");

  const hasAITools =
    tools.includes("ChatGPT") ||
    tools.includes("Claude") ||
    tools.includes("Gemini");

  const worksAlone = has([
    "trabajo solo",
    "trabajo sola",
    "actualmente trabajo solo",
    "actualmente trabajo sola",
  ]);

  const hasPreviousExperience = has([
    "he trabajado antes",
    "agencias",
    "consultores",
    "formaciones",
    "experiencia fue mixta",
  ]);

  const willingToInvest = has([
    "dispuesto a invertir",
    "dispuesta a invertir",
    "invertir en ordenar",
  ]);

  if (hasCommercialAssets) {
    evidence.push("existen pruebas de confianza comercial como testimonios o casos de éxito");
  }

  if (hasOperationalAssets) {
    evidence.push("existen activos operativos como CRM, base de datos o herramientas de automatización");
  }

  if (hasAITools) {
    evidence.push("la IA ya forma parte del trabajo habitual");
  }

  if (worksAlone) {
    evidence.push("la toma de decisiones y la ejecución dependen principalmente de una sola persona");
  }

  if (hasPreviousExperience) {
    evidence.push("ya existe experiencia previa con formaciones, consultores o servicios externos");
  }

  if (willingToInvest) {
    evidence.push("hay disposición a invertir si la propuesta encaja con la necesidad real");
  }

  return {
    raw_text: rawText,
    assets,
    tools,
    evidence,
    has_commercial_assets: hasCommercialAssets,
    has_operational_assets: hasOperationalAssets,
    has_ai_tools: hasAITools,
    works_alone: worksAlone,
    has_previous_experience: hasPreviousExperience,
    willing_to_invest: willingToInvest,
  };
}

export function analyzeAnswers(answers: Answers) {
  const variables = emptyVariables();
  const detectedSignals = [];

  const structuredVariables = buildStructuredVariables(answers);
  const diagnosticContext = buildDiagnosticContext(answers);

  for (const key of Object.keys(structuredVariables)) {
    variables[key].score += structuredVariables[key].score;
  }

  for (const item of QUESTION_VARIABLE_MAP) {
    const answer = answers[item.questionId];
    const signals = detectSignalsFromAnswer(item.questionId, answer);

    detectedSignals.push(...signals);

    for (const variableName of item.variables) {
      for (const signal of signals) {
        variables[variableName].score += signal.weight;
        variables[variableName].signals.push(signal.label);
      }
    }
  }

  const patternsV1 = detectPatternsFromVariables(variables);
  const patternsV2 = detectPatternsV2FromVariables(variables);

  const patterns = [...patternsV1, ...patternsV2];

  const recommendations = buildRecommendations(patterns, diagnosticContext);

  return {
    signals: detectedSignals,
    variables,
    patterns,
    recommendations,
    diagnostic_context: diagnosticContext,
    analyzed_at: new Date().toISOString(),
  };
}