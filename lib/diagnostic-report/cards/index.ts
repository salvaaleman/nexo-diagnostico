import type { DiagnosticCard } from "../types";
import type { CardEngineContext } from "./types";

import { CARD_MAP } from "./card-map";
import { CARD_CONFIG } from "./card-config";
import { buildGenericCard } from "./generic-card";

export function buildCards(
  context: CardEngineContext
): DiagnosticCard[] {
  const cards: DiagnosticCard[] = [];

  for (const item of CARD_MAP) {
    const config = CARD_CONFIG.find(
      (c) => c.cardId === item.cardId
    );

    if (config) {
      cards.push(buildGenericCard(context, config));
    }
  }

  return cards;
}