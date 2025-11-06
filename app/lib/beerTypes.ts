export type StageKey =
  | 'molienda'
  | 'maceracion'
  | 'coccion'
  | 'fermentacion'
  | 'maduracion'
  | 'embotellado';

export type IngredientOption = { id: string; label: string; note?: string };

export type Recipe = {
  id: string;
  name: string;
  province: string;
  malts: string[];
  hops: string[];
  yeasts: string[];
  params: {
    mashTemp: number; // °C
    mashTime: number; // min
    boilTime: number; // min
    fermentTemp: number; // °C
  };
  estimates: { og: number; fg: number; abv: number; ibu: number };
  createdAt: number;
};
