import { describe, expect, it } from 'vitest';

import { initialState } from '@services/store/user/slice.ts';
import { deepClone } from '@utils/helper.ts';

import { fetchIngredients } from './actions.ts';
import { ingredientsSlice, type TIngredientsState } from './slice.ts';

import type { TIngredient } from '@utils/types.ts';

const { reducer } = ingredientsSlice;

const ingredientsMock: TIngredient[] = [
  {
    _id: '692889f16bf770001bfeb4cc',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '692889f16bf770001bfeb4d2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
  },
];

class IngredientsStateBuilder {
  readonly state: TIngredientsState;

  constructor() {
    this.state = { ingredients: [], loading: false, error: null };
  }

  withIngredients(ingredients: TIngredient[]): this {
    this.state.ingredients = ingredients;
    return this;
  }

  withLoading(loading: boolean): this {
    this.state.loading = loading;
    return this;
  }

  withError(error: string | null): this {
    this.state.error = error;
    return this;
  }

  build(): TIngredientsState {
    return deepClone(this.state);
  }
}

const builder = (): IngredientsStateBuilder => new IngredientsStateBuilder();

describe('ingredientsSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const result = ingredientsSlice.getInitialState();

      expect(result).toEqual(initialState);
    });
  });

  describe('fetchIngredients', () => {
    describe('pending', () => {
      it('должен устанавливать loading в true и сбрасывать ошибку', () => {
        const state = builder().withError('Старая ошибка').build();

        const result = reducer(state, fetchIngredients.pending('requestId'));

        expect(result.loading).toBeTruthy();
        expect(result.error).toBeNull();
      });

      it('не должен менять ingredients', () => {
        const state = builder().withIngredients(ingredientsMock).build();

        const result = reducer(state, fetchIngredients.pending('requestId'));

        expect(result.ingredients).toEqual(ingredientsMock);
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withError('Старая ошибка').build();
        const stateCopy = deepClone(state);

        reducer(state, fetchIngredients.pending('requestId'));

        expect(state).toEqual(stateCopy);
      });
    });

    describe('fulfilled', () => {
      it('должен сохранять ингредиенты и сбрасывать loading', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          fetchIngredients.fulfilled(ingredientsMock, 'requestId')
        );

        expect(result.loading).toBeFalsy();
        expect(result.ingredients).toEqual(ingredientsMock);
      });

      it('должен заменять старые ингредиенты новыми', () => {
        const oldIngredients: TIngredient[] = [
          { ...ingredientsMock[0], _id: '692889f16bf770001bfeb4da' },
        ];
        const state = builder().withIngredients(oldIngredients).build();

        const result = reducer(
          state,
          fetchIngredients.fulfilled(ingredientsMock, 'requestId')
        );

        expect(result.ingredients).toEqual(ingredientsMock);
        expect(result.ingredients).not.toContainEqual(
          expect.objectContaining({ _id: '692889f16bf770001bfeb4da' })
        );
      });

      it('не должен сбрасывать ошибку, если она была установлена', () => {
        const state = builder().withError('Старая ошибка').build();

        const result = reducer(
          state,
          fetchIngredients.fulfilled(ingredientsMock, 'requestId')
        );

        expect(result.error).toBe('Старая ошибка');
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withLoading(true).withError('Старая ошибка').build();
        const stateCopy = deepClone(state);

        reducer(state, fetchIngredients.fulfilled(ingredientsMock, 'requestId'));

        expect(state).toEqual(stateCopy);
      });
    });

    describe('rejected', () => {
      it('должен сохранять message ошибки и сбрасывать loading', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          fetchIngredients.rejected(new Error('Ошибка загрузки'), 'requestId')
        );

        expect(result.loading).toBeFalsy();
        expect(result.error).toBe('Ошибка загрузки');
      });

      it('должен сохранять пустую строку, если message пустой', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          fetchIngredients.rejected({ name: 'Error', message: '' }, 'requestId')
        );

        expect(result.error).toBe('');
      });

      it('не должен менять ingredients', () => {
        const state = builder().withIngredients(ingredientsMock).build();

        const result = reducer(
          state,
          fetchIngredients.rejected(new Error('Ошибка загрузки'), 'requestId')
        );

        expect(result.ingredients).toEqual(ingredientsMock);
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder()
          .withLoading(true)
          .withIngredients(ingredientsMock)
          .build();
        const stateCopy = deepClone(state);

        reducer(
          state,
          fetchIngredients.rejected(new Error('Ошибка загрузки'), 'requestId')
        );

        expect(state).toEqual(stateCopy);
      });
    });
  });
});
