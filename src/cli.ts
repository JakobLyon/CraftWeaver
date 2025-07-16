#!/usr/bin/env node

import { calculateCostPlan } from './engine';
import { schema, prices } from './adapters/bitcraft/bitcraft-adapter';
import type { ParsedArgs, PlanningResult, ReportOutput, ResolvedCostNode } from 'types';

// --- Simple CLI args parser ---
function parseArgs(): ParsedArgs {
  const [, , ...args] = process.argv;
  const result: ParsedArgs = {
    gameId: 'bitcraft',
    itemId: '',
    format: 'json',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--item':
        result.itemId = args[++i];
        break;
      case '--game':
        result.gameId = args[++i];
        break;
      case '--format':
        result.format = args[++i] as 'json' | 'table';
        break;
    }
  }

  if (!result.itemId) {
    console.error('❌ Missing required --item argument.');
    process.exit(1);
  }

  return result;
}

// --- Table output helper ---
function formatAsTable(result: PlanningResult): string {
  const lines: string[] = [];

  function printNode(node: ResolvedCostNode, indent = 0): void {
    const prefix = '  '.repeat(indent);
    const line = `${prefix}- ${node.id} (${node.method}) — $${node.totalCost.toFixed(2)}`
      + (node.craftingTimeSeconds ? ` | ${node.craftingTimeSeconds}s` : '');
    lines.push(line);
    if (node.children) {
      for (const child of node.children) {
        printNode(child, indent + 1);
      }
    }
  }

  lines.push(`\n📦 Item: ${result.root.id}`);
  lines.push(`💰 Market Price: $${result.marketPrice}`);
  lines.push(`🛠️  Crafting Cost: $${result.totalCraftCost.toFixed(2)}`);
  lines.push(`💡 Savings: $${result.savings.toFixed(2)}`);
  if (result.craftingTimeSeconds) {
    lines.push(`⏱️  Total Crafting Time: ${result.craftingTimeSeconds}s`);
  }
  lines.push('\nRecipe Tree:\n');
  printNode(result.root);

  return lines.join('\n');
}

// --- Main Entry Point ---
function main(): ReportOutput {
  const args = parseArgs();

  if (args.gameId !== 'bitcraft') {
    throw new Error(`Unsupported game: ${args.gameId}`);
  }

  const plan = calculateCostPlan(args.itemId, schema, prices);

  let result: string;

  switch (args.format) {
    case 'json':
      result = JSON.stringify(plan, null, 2);
      break;
    case 'table':
    default:
      result = formatAsTable(plan);
      break;
  }

  return { result };
}

const { result } = main();
console.log(result);
