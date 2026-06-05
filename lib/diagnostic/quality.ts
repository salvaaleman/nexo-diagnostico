export type QualityResult = {
  score: number;
  valid: boolean;
  reasons: string[];
};

const SPANISH_WORDS = [
  "yo", "mi", "mis", "me", "nos", "nuestro", "nuestra",
  "el", "la", "los", "las", "un", "una", "unos", "unas",
  "que", "de", "del", "con", "para", "por", "en", "y", "o",
  "tengo", "tenemos", "hago", "hacemos", "vendo", "ofrezco",
  "quiero", "busco", "necesito", "ayudo", "trabajo",
  "cliente", "clientes", "persona", "personas", "negocio",
  "marca", "producto", "productos", "servicio", "servicios",
  "ventas", "vender", "comprar", "redes", "contenido",
  "instagram", "facebook", "tiktok", "whatsapp", "web",
  "equipo", "sistema", "proceso", "problema", "objetivo",
  "estrategia", "leads", "seguimiento", "automatizacion",
  "automatización", "salud", "bienestar", "marketing",
  "emprendedores", "emprendedor", "digital", "online",
  "tiempo", "dinero", "ingresos", "crecimiento",
];

export function evaluateAnswerQuality(text: string): QualityResult {
  const reasons: string[] = [];
  const cleanText = text.trim().toLowerCase();

  if (!cleanText) {
    reasons.push("respuesta_vacia");
  }

  const words = cleanText
    .replace(/[^a-záéíóúñü\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length < 2) {
    reasons.push("muy_pocas_palabras");
  }

  const spanishMatches = words.filter((word) =>
    SPANISH_WORDS.includes(word)
  );

  if (spanishMatches.length === 0) {
    reasons.push("texto_no_reconocible_en_espanol");
  }

  return {
    score: reasons.length === 0 ? 100 : 0,
    valid: reasons.length === 0,
    reasons,
  };
}