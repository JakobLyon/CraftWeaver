export interface ResolvedCostNode {
  /** The ID of the item */
  id: string;

  /** Whether we’re crafting or buying this item */
  method: 'buy' | 'craft';

  /** Total cost for 1 unit of this item via this method */
  totalCost: number;

  /** The market/vendor price per unit, if available */
  unitPrice?: number;

  /** Crafting time in seconds for this node (not including children) */
  craftingTimeSeconds?: number;

  /** Breakdown of how this item is made (if crafting) */
  children?: ResolvedCostNode[];
}

export interface PlanningResult {
  /** Full resolved cost tree */
  root: ResolvedCostNode;

  /** Total cost to acquire one unit (craft or buy tree) */
  totalCraftCost: number;

  /** Market price for one unit, if known */
  marketPrice: number;

  /** Savings = marketPrice - totalCraftCost */
  savings: number;

  /** Total crafting time for the tree, if applicable */
  craftingTimeSeconds?: number;
}
