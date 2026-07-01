import type { BusinessAreaId } from "./definitions/knowledge/types";

export interface CardMapItem {
  cardId: string;
  area: BusinessAreaId;
}

export const CARD_MAP: CardMapItem[] = [
  { cardId: "card01", area: "business_model" },
  { cardId: "card02", area: "captacion" },
  { cardId: "card03", area: "conversion" },
  { cardId: "card04", area: "seguimiento" },
  { cardId: "card05", area: "procesos" },
  { cardId: "card06", area: "automatizacion" },
  { cardId: "card07", area: "liderazgo" },
  { cardId: "card08", area: "rentabilidad" },
  { cardId: "card09", area: "business_model" },
  { cardId: "card10", area: "captacion" },
  { cardId: "card11", area: "conversion" },
  { cardId: "card12", area: "prioridades" },
];

export function getCardArea(cardId: string): BusinessAreaId | undefined {
  return CARD_MAP.find((c) => c.cardId === cardId)?.area;
}