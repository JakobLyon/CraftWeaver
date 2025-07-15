export interface ResolvedCostNode {
  id: string;
  method: "buy" | "craft";
  totalCost: number;
  children?: ResolvedCostNode[];
  unitPrice?: number;
}

export interface PlanningResult {
  root: ResolvedCostNode;
  totalCraftCost: number;
  marketPrice: number;
  savings: number;
}
