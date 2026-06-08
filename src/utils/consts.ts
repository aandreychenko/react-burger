import type { TIngredientCategory } from '@utils/types.ts';

export const BURGER_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export const INGREDIENT_CATEGORY = ['bun', 'main', 'sauce'] as const;

export const CATEGORY_TRANSLATE: Record<TIngredientCategory, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};
