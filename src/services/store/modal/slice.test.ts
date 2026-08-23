import { describe, expect, it } from 'vitest';

import { deepClone } from '@utils/helper.ts';

import { createOrder } from './actions.ts';
import { type TModalState, closeAllModals, modalSlice, initialState } from './slice.ts';

const { reducer } = modalSlice;

class ModalStateBuilder {
  readonly state: TModalState;

  constructor() {
    this.state = {
      orderDetails: { isOpen: false, isLoading: false, orderId: null, error: null },
    };
  }

  withIsOpen(isOpen: boolean): this {
    this.state.orderDetails.isOpen = isOpen;
    return this;
  }

  withIsLoading(isLoading: boolean): this {
    this.state.orderDetails.isLoading = isLoading;
    return this;
  }

  withOrderId(orderId: number | null): this {
    this.state.orderDetails.orderId = orderId;
    return this;
  }

  withError(error: string | null): this {
    this.state.orderDetails.error = error;
    return this;
  }

  build(): TModalState {
    return deepClone(this.state);
  }
}

const builder = (): ModalStateBuilder => new ModalStateBuilder();

describe('modalSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const result = reducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });
  });

  describe('closeAllModals', () => {
    it('должен закрывать модальное окно, сохраняя остальные поля', () => {
      const state = builder()
        .withIsOpen(true)
        .withIsLoading(true)
        .withOrderId(2356)
        .withError('Ошибка')
        .build();

      const result = reducer(state, closeAllModals());

      expect(result.orderDetails.isOpen).toBeFalsy();
      expect(result.orderDetails.isLoading).toBeTruthy();
      expect(result.orderDetails.orderId).toBe(2356);
      expect(result.orderDetails.error).toBe('Ошибка');
    });

    it('должен корректно работать, если окно уже закрыто', () => {
      const state = builder().withIsOpen(false).withOrderId(123).build();
      const stateCopy = deepClone(state);

      const result = reducer(state, closeAllModals());

      expect(result).toEqual(state);
      expect(state).toEqual(stateCopy);
    });
  });

  describe('createOrder', () => {
    describe('pending', () => {
      it('должен открывать окно, ставить isLoading и сбрасывать ошибку', () => {
        const state = builder()
          .withIsOpen(false)
          .withIsLoading(false)
          .withOrderId(2356)
          .withError('Старая ошибка')
          .build();

        const result = reducer(state, createOrder.pending('requestId', []));

        expect(result.orderDetails.isOpen).toBeTruthy();
        expect(result.orderDetails.isLoading).toBeTruthy();
        expect(result.orderDetails.error).toBeNull();
      });

      it('должен сбрасывать старый orderId', () => {
        const state = builder().withOrderId(2356).build();

        const result = reducer(state, createOrder.pending('requestId', []));

        expect(result.orderDetails.orderId).toBeNull();
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withOrderId(2356).withError('Старая ошибка').build();
        const stateCopy = deepClone(state);

        reducer(state, createOrder.pending('requestId', []));

        expect(state).toEqual(stateCopy);
      });
    });

    describe('fulfilled', () => {
      it('должен сохранять номер заказа, сбрасывать isLoading и сохранять isOpen', () => {
        const state = builder().withIsOpen(true).withIsLoading(true).build();

        const result = reducer(state, createOrder.fulfilled(2356, 'requestId', []));

        expect(result.orderDetails.orderId).toBe(2356);
        expect(result.orderDetails.isLoading).toBeFalsy();
        expect(result.orderDetails.isOpen).toBeTruthy();
      });

      it('должен сбрасывать ошибку после успешного заказа', () => {
        const state = builder().withError('Старая ошибка').build();

        const result = reducer(state, createOrder.fulfilled(2356, 'requestId', []));

        expect(result.orderDetails.error).toBeNull();
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withIsOpen(true).withIsLoading(true).build();
        const stateCopy = deepClone(state);

        reducer(state, createOrder.fulfilled(2356, 'requestId', []));

        expect(state).toEqual(stateCopy);
      });
    });

    describe('rejected', () => {
      it('должен сохранять message ошибки, сбрасывать isLoading и сохранять isOpen', () => {
        const state = builder().withIsOpen(true).withIsLoading(true).build();

        const result = reducer(
          state,
          createOrder.rejected(new Error('Ошибка создания заказа'), 'requestId', [])
        );

        expect(result.orderDetails.error).toBe('Ошибка создания заказа');
        expect(result.orderDetails.isLoading).toBeFalsy();
        expect(result.orderDetails.isOpen).toBeTruthy();
      });

      it('должен сохранять orderId, если он был установлен', () => {
        const state = builder().withOrderId(2356).build();

        const result = reducer(
          state,
          createOrder.rejected(new Error('Ошибка создания заказа'), 'requestId', [])
        );

        expect(result.orderDetails.orderId).toBe(2356);
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withIsLoading(true).build();
        const stateCopy = deepClone(state);

        reducer(
          state,
          createOrder.rejected(new Error('Ошибка создания заказа'), 'requestId', [])
        );

        expect(state).toEqual(stateCopy);
      });
    });
  });
});
