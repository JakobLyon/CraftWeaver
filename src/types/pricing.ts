export type PriceMap = Record<string, number>;

export interface MarketData {
  itemId: string;
  buyPrice: number;
  sellPrice?: number;
  lastUpdated?: number;
}
