import { createSlice, nanoid } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types.ts';

export type TConstructorItem = TIngredient & { constructorId: string };

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorItem[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorItem>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, constructorId: nanoid() },
      }),
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;

      const [draggedIngredient] = state.ingredients.splice(dragIndex, 1);

      state.ingredients.splice(hoverIndex, 0, draggedIngredient);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.constructorId !== action.payload
      );
    },
  },
  selectors: {
    getConstructorState: (state) => state,
  },
});

export const { addIngredient, moveIngredient, removeIngredient } =
  constructorSlice.actions;
export const { getConstructorState } = constructorSlice.selectors;
