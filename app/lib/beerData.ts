import type { IngredientOption } from './beerTypes';

export const PROVINCES: string[] = [
  'Vélez',
  'Comunera',
  'Guanentá',
  'García Rovira',
  'Mares',
  'Soto',
  'Yariguíes',
];

export const MALTS: IngredientOption[] = [
  { id: 'pale', label: 'Pale Ale' },
  { id: 'pils', label: 'Pilsner' },
  { id: 'caramelo', label: 'Caramelo 60L' },
  { id: 'chocolate', label: 'Chocolate' },
];

export const HOPS: IngredientOption[] = [
  { id: 'cascade', label: 'Cascade' },
  { id: 'saaz', label: 'Saaz' },
  { id: 'centennial', label: 'Centennial' },
  { id: 'magnum', label: 'Magnum' },
];

export const YEASTS: IngredientOption[] = [
  { id: 'us05', label: 'US-05 (Ale limpia)' },
  { id: 's04', label: 'S-04 (Inglesa)' },
  { id: 'wb06', label: 'WB-06 (Trigo)' },
];
