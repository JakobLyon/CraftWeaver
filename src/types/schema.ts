export interface Item {
  id: string;
  name: string;
  isCraftable?: boolean;
  isVendorOnly?: boolean;
}

export interface Recipe {
  outputItem: string;
  outputQuantity: number;
  inputs: { item: string; quantity: number }[];
  timeToCraftSeconds?: number;
  costOverride?: number;
}

export interface UniversalSchema {
  items: Record<string, Item>;
  recipes: Record<string, Recipe>;
}
