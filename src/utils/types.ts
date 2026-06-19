import type { INGREDIENT_CATEGORY } from '@utils/consts.ts';

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

type IIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: unknown;
};

type TIngredientCategory = (typeof INGREDIENT_CATEGORY)[number];

export type {
  TIngredient,
  TIngredientsState,
  IIngredientsResponse,
  TOrderResponse,
  TIngredientCategory,
};
