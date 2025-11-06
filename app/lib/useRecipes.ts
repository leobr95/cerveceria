'use client';
import { useEffect, useState } from 'react';
import type { Recipe } from './beerTypes';

const KEY = 'siete-estrellas:recipes';

export default function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setRecipes(JSON.parse(raw) as Recipe[]);
    } catch { /* noop */ }
  }, []);

  const save = (r: Recipe) => {
    setRecipes((prev) => {
      const next = [r, ...prev];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const remove = (id: string) => {
    setRecipes((prev) => {
      const next = prev.filter((r) => r.id !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { recipes, save, remove };
}
