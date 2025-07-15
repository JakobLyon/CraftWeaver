import type { UniversalSchema, PriceMap, ResolvedCostNode, PlanningResult } from 'types';

/**
 * Recursively resolves the cheapest way to acquire one unit of the given item.
 */
function resolveItemCost(
  itemId: string,
  schema: UniversalSchema,
  prices: PriceMap
): ResolvedCostNode {
  const itemPrice = prices[itemId] ?? Infinity;

  const recipe = schema.recipes[itemId];

  // Case: No recipe, only buyable
  if (!recipe) {
    return {
      id: itemId,
      method: 'buy',
      totalCost: itemPrice,
      unitPrice: itemPrice,
    };
  }

  // Case: Crafting path available
  let totalCost = 0;
  const children: ResolvedCostNode[] = [];

  for (const input of recipe.inputs) {
    const childNode = resolveItemCost(input.item, schema, prices);
    const childTotal = childNode.totalCost * input.quantity;

    totalCost += childTotal;
    children.push({
      ...childNode,
      totalCost: childTotal,
    });
  }

  // Divide by the output quantity to get per-unit cost
  const perUnitCost = totalCost / recipe.outputQuantity;

  const craftingNode: ResolvedCostNode = {
    id: itemId,
    method: 'craft',
    totalCost: perUnitCost,
    unitPrice: itemPrice,
    children,
    craftingTimeSeconds: recipe.timeToCraftSeconds,
  };

  // Compare to market price
  if (itemPrice < perUnitCost) {
    return {
      id: itemId,
      method: 'buy',
      totalCost: itemPrice,
      unitPrice: itemPrice,
    };
  }

  return craftingNode;
}

/**
 * Generates a planning result showing the cheapest way to acquire one unit of an item.
 */
export function calculateCostPlan(
  itemId: string,
  schema: UniversalSchema,
  prices: PriceMap
): PlanningResult {
  const root = resolveItemCost(itemId, schema, prices);

  const marketPrice = prices[itemId] ?? Infinity;
  const totalCraftCost = root.totalCost;
  const savings = marketPrice - totalCraftCost;

  return {
    root,
    totalCraftCost,
    marketPrice,
    savings,
    craftingTimeSeconds: root.craftingTimeSeconds ?? 0,
  };
}
