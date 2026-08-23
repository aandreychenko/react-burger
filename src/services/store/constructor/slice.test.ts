import { describe, expect, it } from 'vitest';

import { deepClone } from '@utils/helper.ts';

import {
  type TConstructorState,
  addIngredient,
  clearConstructor,
  constructorSlice,
  moveIngredient,
  removeIngredient,
  initialState,
} from './slice.ts';

import type { TIngredient } from '@utils/types.ts';

const { reducer } = constructorSlice;

const bun: TIngredient = {
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
};

const sauce: TIngredient = {
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
};

const main: TIngredient = {
  _id: '692889f16bf770001bfeb4d8',
  name: 'Кристаллы марсианских альфа-сахаридов',
  type: 'main',
  proteins: 234,
  fat: 432,
  carbohydrates: 111,
  calories: 189,
  price: 762,
  image: 'https://code.s3.yandex.net/react/code/core.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
  __v: 0,
};

class ConstructorStateBuilder {
  readonly state: TConstructorState;

  constructor() {
    this.state = {
      bun: null,
      ingredients: [],
    };
  }

  withBun(ingredient: TIngredient = bun, constructorId = 'lw4y-AfV2egW5fVoLjVe6'): this {
    this.state.bun = { ...ingredient, constructorId };
    return this;
  }

  withIngredient(ingredient: TIngredient, constructorId: string): this {
    this.state.ingredients.push({ ...ingredient, constructorId });
    return this;
  }

  build(): TConstructorState {
    return deepClone(this.state);
  }
}

const builder = (): ConstructorStateBuilder => new ConstructorStateBuilder();

describe('constructorSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const result = constructorSlice.getInitialState();

      expect(result).toEqual(initialState);
    });
  });

  describe('addIngredient', () => {
    it('должен добавлять булку в конструктор', () => {
      const result = reducer(initialState, addIngredient(bun));

      expect(result.bun).toMatchObject(bun);
      expect(result.bun?.constructorId).toBeDefined();
      expect(result.ingredients).toEqual([]);
    });

    it('должен заменять существующую булку новой', () => {
      const state = builder().withBun().build();
      const newBun: TIngredient = {
        ...bun,
        _id: '692889f16bf770001bfeb4cd',
        name: 'Флюоресцентная булка R2-D3',
      };

      const result = reducer(state, addIngredient(newBun));

      expect(result.bun?._id).toBe('692889f16bf770001bfeb4cd');
      expect(result.bun?.constructorId).toBeDefined();
      expect(result.bun?._id).not.toBe(state.bun?._id);
      expect(result.ingredients).toEqual([]);
    });

    it('должен добавлять обычный ингредиент', () => {
      const result = reducer(initialState, addIngredient(sauce));

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toMatchObject(sauce);
      expect(result.ingredients[0].constructorId).toBeDefined();
      expect(result.bun).toBeNull();
    });

    it('должен добавлять разные ингредиенты', () => {
      const result = reducer(
        reducer(initialState, addIngredient(sauce)),
        addIngredient(main)
      );

      expect(result.ingredients).toHaveLength(2);
      expect(result.ingredients[0]).toMatchObject(sauce);
      expect(result.ingredients[1]).toMatchObject(main);
    });

    it('добавление булки не должно менять список ингредиентов', () => {
      const state = builder().withIngredient(sauce, 'Sutz4shEdreAXje911Dt3').build();

      const result = reducer(state, addIngredient(bun));

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toMatchObject(sauce);
      expect(result.ingredients[0].constructorId).toBe('Sutz4shEdreAXje911Dt3');
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withIngredient(sauce, 'Sutz4shEdreAXje911Dt3').build();
      const stateCopy = deepClone(state);

      reducer(state, addIngredient(main));

      expect(state).toEqual(stateCopy);
    });
  });

  describe('moveIngredient', () => {
    it('должен перемещать первый ингредиент в конец списка', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt3')
        .build();

      const result = reducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 2 }));

      expect(result.ingredients.map((item) => item.constructorId)).toEqual([
        'Sutz4shEdreAXje911Dt2',
        'Sutz4shEdreAXje911Dt3',
        'Sutz4shEdreAXje911Dt1',
      ]);
      expect(result.ingredients[0]).toMatchObject(main);
      expect(result.ingredients[1]).toMatchObject(sauce);
      expect(result.ingredients[2]).toMatchObject(sauce);
    });

    it('должен перемещать последний ингредиент в начало списка', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt3')
        .build();

      const result = reducer(state, moveIngredient({ dragIndex: 2, hoverIndex: 0 }));

      expect(result.ingredients.map((item) => item.constructorId)).toEqual([
        'Sutz4shEdreAXje911Dt3',
        'Sutz4shEdreAXje911Dt1',
        'Sutz4shEdreAXje911Dt2',
      ]);
    });

    it('должен перемещать ингредиент в середину списка', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt3')
        .build();

      const result = reducer(state, moveIngredient({ dragIndex: 2, hoverIndex: 1 }));

      expect(result.ingredients.map((item) => item.constructorId)).toEqual([
        'Sutz4shEdreAXje911Dt1',
        'Sutz4shEdreAXje911Dt3',
        'Sutz4shEdreAXje911Dt2',
      ]);
    });

    it('не должен менять порядок ингредиентов при перемещении на тот же индекс', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt3')
        .build();

      const result = reducer(state, moveIngredient({ dragIndex: 1, hoverIndex: 1 }));

      expect(result.ingredients.map((item) => item.constructorId)).toEqual([
        'Sutz4shEdreAXje911Dt1',
        'Sutz4shEdreAXje911Dt2',
        'Sutz4shEdreAXje911Dt3',
      ]);
    });

    it('не должен менять bun при перемещении ингредиентов', () => {
      const state = builder()
        .withBun()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .build();

      const result = reducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));

      expect(result.bun).toEqual(state.bun);
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .build();
      const stateCopy = deepClone(state);

      reducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));

      expect(state).toEqual(stateCopy);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по constructorId', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .build();

      const result = reducer(state, removeIngredient('Sutz4shEdreAXje911Dt1'));

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0].constructorId).toBe('Sutz4shEdreAXje911Dt2');
      expect(result.ingredients[0]).toMatchObject(main);
    });

    it('должен удалять средний ингредиент', () => {
      const state = builder()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt3')
        .build();

      const result = reducer(state, removeIngredient('Sutz4shEdreAXje911Dt2'));

      expect(result.ingredients).toHaveLength(2);
      expect(result.ingredients.map((item) => item.constructorId)).toEqual([
        'Sutz4shEdreAXje911Dt1',
        'Sutz4shEdreAXje911Dt3',
      ]);
    });

    it('не должен менять bun при удалении ингредиента', () => {
      const state = builder()
        .withBun()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .withIngredient(main, 'Sutz4shEdreAXje911Dt2')
        .build();

      const result = reducer(state, removeIngredient('Sutz4shEdreAXje911Dt1'));

      expect(result.bun).toEqual(state.bun);
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0].constructorId).toBe('Sutz4shEdreAXje911Dt2');
    });
  });

  describe('clearConstructor', () => {
    it('должен очищать булку и список ингредиентов', () => {
      const state = builder()
        .withBun()
        .withIngredient(sauce, 'Sutz4shEdreAXje911Dt1')
        .build();

      const result = reducer(state, clearConstructor());

      expect(result).toEqual(initialState);
    });

    it('должен корректно работать, если конструктор уже пуст', () => {
      const result = reducer(initialState, clearConstructor());

      expect(result).toEqual(initialState);
    });

    it('должен корректно работать, если есть булка, но нет ингредиентов', () => {
      const state = builder().withBun().build();

      const result = reducer(state, clearConstructor());

      expect(result).toEqual(initialState);
    });

    it('должен корректно работать, если есть ингредиенты, но нет булки', () => {
      const state = builder().withIngredient(sauce, 'Sutz4shEdreAXje911Dt1').build();

      const result = reducer(state, clearConstructor());

      expect(result).toEqual(initialState);
    });
  });
});
