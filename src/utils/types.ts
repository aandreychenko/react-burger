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

type TIngredientCategory = (typeof INGREDIENT_CATEGORY)[number];

export type { TIngredient, IIngredientsResponse, TIngredientCategory };
