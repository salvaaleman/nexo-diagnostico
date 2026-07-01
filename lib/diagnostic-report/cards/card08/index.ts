import type { CardEngineContext } from "../types";
import type { DiagnosticCard } from "../../types";
import { CARD_CONFIG } from "../card-config";
import { buildGenericCard } from "../generic-card";

export function buildcard08(
  context: CardEngineContext
): DiagnosticCard {
  const config = CARD_CONFIG.find((c) => c.cardId === "card08");

  if (!config) {
    throw new Error("No se encontró configuración para card08");
  }

  return buildGenericCard(context, config);
}
