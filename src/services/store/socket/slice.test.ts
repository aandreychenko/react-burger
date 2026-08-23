import { describe, expect, it } from 'vitest';

import { deepClone } from '@utils/helper.ts';

import {
  type TSocketState,
  connect,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
  socketSlice,
  initialState,
} from './slice.ts';

import type { TSocketResponse } from '@utils/types.ts';

const { reducer } = socketSlice;

const ordersMock: TSocketResponse = {
  success: true,
  orders: [
    {
      _id: '6a86f8eec7a7f9001b6de278',
      ingredients: [
        '692889f16bf770001bfeb4cc',
        '692889f16bf770001bfeb4d3',
        '692889f16bf770001bfeb4cc',
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2026-08-20T12:54:06.062Z',
      updatedAt: '2026-08-20T12:54:21.126Z',
      number: 2356,
    },
    {
      _id: '6a84c12bc7a7f9001b6de24b',
      ingredients: [
        '692889f16bf770001bfeb4cd',
        '692889f16bf770001bfeb4d1',
        '692889f16bf770001bfeb4cd',
      ],
      status: 'done',
      name: 'Био-марсианский флюоресцентный бургер',
      createdAt: '2026-08-18T20:31:39.293Z',
      updatedAt: '2026-08-18T20:31:54.357Z',
      number: 2355,
    },
  ],
  total: 2,
  totalToday: 2,
};

const socketUrl = 'wss://new-stellarburgers.education-services.ru/orders/all';

class SocketStateBuilder {
  readonly state: TSocketState;

  constructor() {
    this.state = {
      isConnected: false,
      orders: null,
      error: null,
      isLoading: false,
    };
  }

  withConnected(isConnected: boolean): this {
    this.state.isConnected = isConnected;
    return this;
  }

  withOrders(orders: TSocketResponse | null): this {
    this.state.orders = orders;
    return this;
  }

  withError(error: string | null): this {
    this.state.error = error;
    return this;
  }

  withLoading(isLoading: boolean): this {
    this.state.isLoading = isLoading;
    return this;
  }

  build(): TSocketState {
    return deepClone(this.state);
  }
}

const builder = (): SocketStateBuilder => new SocketStateBuilder();

describe('socketSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const result = socketSlice.getInitialState();

      expect(result).toEqual(initialState);
    });
  });

  describe('connect', () => {
    it('должен устанавливать isLoading и сбрасывать ошибку', () => {
      const state = builder().withError('Старая ошибка').build();

      const result = reducer(state, connect({ url: socketUrl }));

      expect(result.isLoading).toBeTruthy();
      expect(result.error).toBeNull();
    });

    it('не должен менять orders и isConnected', () => {
      const state = builder()
        .withConnected(true)
        .withOrders(ordersMock)
        .withLoading(true)
        .build();

      const result = reducer(state, connect({ url: socketUrl }));

      expect(result.orders).toEqual(ordersMock);
      expect(result.isConnected).toBeTruthy();
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withError('Старая ошибка').build();
      const stateCopy = deepClone(state);

      reducer(state, connect({ url: socketUrl }));

      expect(state).toEqual(stateCopy);
    });
  });

  describe('disconnect', () => {
    it('должен сбрасывать соединение, заказы, isLoading и ошибку', () => {
      const state = builder()
        .withConnected(true)
        .withOrders(ordersMock)
        .withLoading(true)
        .withError('Ошибка соединения')
        .build();

      const result = reducer(state, disconnect());

      expect(result.isConnected).toBeFalsy();
      expect(result.orders).toBeNull();
      expect(result.isLoading).toBeFalsy();
      expect(result.error).toBeNull();
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withConnected(true).withOrders(ordersMock).build();
      const stateCopy = deepClone(state);

      reducer(state, disconnect());

      expect(state).toEqual(stateCopy);
    });
  });

  describe('onOpen', () => {
    it('должен открывать соединение, сбрасывать isLoading и ошибку', () => {
      const state = builder().withLoading(true).withError('Старая ошибка').build();

      const result = reducer(state, onOpen());

      expect(result.isConnected).toBeTruthy();
      expect(result.isLoading).toBeFalsy();
      expect(result.error).toBeNull();
    });

    it('не должен менять orders', () => {
      const state = builder().withOrders(ordersMock).build();

      const result = reducer(state, onOpen());

      expect(result.orders).toEqual(ordersMock);
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withLoading(true).withError('Старая ошибка').build();
      const stateCopy = deepClone(state);

      reducer(state, onOpen());

      expect(state).toEqual(stateCopy);
    });
  });

  describe('onMessage', () => {
    it('должен сохранять полученные заказы', () => {
      const state = builder().build();

      const result = reducer(state, onMessage(ordersMock));

      expect(result.orders).toEqual(ordersMock);
    });

    it('не должен менять isConnected и isLoading', () => {
      const state = builder().withConnected(true).build();

      const result = reducer(state, onMessage(ordersMock));

      expect(result.isConnected).toBeTruthy();
      expect(result.isLoading).toBeFalsy();
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withOrders(ordersMock).build();
      const stateCopy = deepClone(state);

      reducer(state, onMessage(ordersMock));

      expect(state).toEqual(stateCopy);
    });
  });

  describe('onError', () => {
    it('должен сохранять ошибку и сбрасывать isLoading', () => {
      const state = builder().withLoading(true).build();

      const result = reducer(state, onError('Ошибка соединения'));

      expect(result.error).toBe('Ошибка соединения');
      expect(result.isLoading).toBeFalsy();
    });

    it('должен сохранять ранее полученные заказы', () => {
      const state = builder().withOrders(ordersMock).build();

      const result = reducer(state, onError('Ошибка соединения'));

      expect(result.orders).toEqual(ordersMock);
    });

    it('не должен менять isConnected', () => {
      const state = builder().withConnected(true).build();

      const result = reducer(state, onError('Ошибка соединения'));

      expect(result.isConnected).toBeTruthy();
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withOrders(ordersMock).withLoading(true).build();
      const stateCopy = deepClone(state);

      reducer(state, onError('Ошибка соединения'));

      expect(state).toEqual(stateCopy);
    });
  });

  describe('onClose', () => {
    it('должен закрывать соединение и сбрасывать isLoading', () => {
      const state = builder().withConnected(true).withLoading(true).build();

      const result = reducer(state, onClose());

      expect(result.isConnected).toBeFalsy();
      expect(result.isLoading).toBeFalsy();
    });

    it('должен сохранять заказы и ошибку при закрытии', () => {
      const state = builder()
        .withOrders(ordersMock)
        .withError('Ошибка соединения')
        .build();

      const result = reducer(state, onClose());

      expect(result.orders).toEqual(ordersMock);
      expect(result.error).toBe('Ошибка соединения');
    });

    it('не должен мутировать исходное состояние', () => {
      const state = builder().withOrders(ordersMock).withError('Ошибка').build();
      const stateCopy = deepClone(state);

      reducer(state, onClose());

      expect(state).toEqual(stateCopy);
    });
  });
});
