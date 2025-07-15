import { UniversalSchema, PriceMap } from 'types';

export const schema: UniversalSchema = {
  items: {
    'emarium-ore-piece': { id: 'emarium-ore-piece', name: 'Emarium Ore Piece' },
    'emarium-ore-concentrate': { id: 'emarium-ore-concentrate', name: 'Emarium Ore Concentrate' },
    'emarium-ingot': { id: 'emarium-ingot', name: 'Emarium Ingot' },
    'sturdy-wood-log': { id: 'sturdy-wood-log', name: 'Sturdy Wood Log' },
    'metalworking-flux': { id: 'metalworking-flux', name: 'Metalworking Flux'}
  },
  recipes: {
    'emarium-ore-concentrate': {
      outputItem: 'emarium-ore-concentrate',
      outputQuantity: 1,
      inputs: [
        { item: 'emarium-ore-piece', quantity: 2 },
      ],
    },
    'emarium-ingot': {
      outputItem: 'emarium-ingot',
      outputQuantity: 1,
      inputs: [
        { item: 'emarium-ore-concentrate', quantity: 2 },
        { item: 'sturdy-wood-log', quantity: 1 },
      ],
    },
  },
};

export const prices: PriceMap = {
  'emarium-ore-piece': 1,
  'metalworking-flux': 10,
  'sturdy-wood-log': 2,
  'emarium-ore-concentrate': 12,
  'emarium-ingot': 30,
};

