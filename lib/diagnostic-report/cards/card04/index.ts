import type { CardEngineContext } from "../types";
import type { DiagnosticCard } from "../../types";
import { CARD_CONFIG } from "../card-config";
import { buildGenericCard } from "../generic-card";

export function buildcard04(
  context: CardEngineContext
): DiagnosticCard {
  const config = CARD_CONFIG.find((c) => c.cardId === "card04");

  if (!config) {
    throw new Error("No se encontró configuración para card04");
  }

  return buildGenericCard(context, config);
}
