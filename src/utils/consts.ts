import type { TIngredientCategory, TOrderStatus } from '@utils/types.ts';

export const BURGER_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';
export const BURGER_WS_BASE_URL = 'wss://new-stellarburgers.education-services.ru';

export const INGREDIENT_CATEGORY = ['bun', 'main', 'sauce'] as const;
export const ORDER_STATUS = ['created', 'pending', 'done'] as const;

export const CATEGORY_TRANSLATE: Record<TIngredientCategory, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

export const STATUS_TRANSLATE: Record<TOrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};

export const DRAG_TYPE_INGREDIENT = 'ingredient';
