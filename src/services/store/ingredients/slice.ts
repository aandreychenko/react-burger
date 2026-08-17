import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchIngredients } from '@services/store/ingredients/actions.ts';

import type { TIngredient } from '@utils/types.ts';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: unknown;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Неизвестная ошибка';
      });
  },
});

export const { getIngredients, getIngredientsLoading, getIngredientsError } =
  ingredientsSlice.selectors;

export const getIngredientById = createSelector(
  [getIngredients, (_, id: string | undefined): string | undefined => id],
  (ingredients, id) => ingredients.find((item) => item._id === id)
);

export const getIngredientImagesById = createSelector([getIngredients], (ingredients) =>
  ingredients.reduce((acc, item): Record<string, string> => {
    return { ...acc, [item._id]: item.image };
  }, {})
);

export const getIngredientNamesById = createSelector([getIngredients], (ingredients) =>
  ingredients.reduce((acc, item): Record<string, string> => {
    return { ...acc, [item._id]: item.name };
  }, {})
);

export const getIngredientPricesById = createSelector([getIngredients], (ingredients) =>
  ingredients.reduce((acc, item): Record<string, number> => {
    return { ...acc, [item._id]: item.price };
  }, {})
);
