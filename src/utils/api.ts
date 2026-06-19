import { create } from 'axios';

import { BURGER_BASE_URL } from './consts';

import type { IIngredientsResponse, TOrderResponse, TIngredient } from '@utils/types.ts';
import type { AxiosError } from 'axios';

const burgerApi = create({
  baseURL: BURGER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIngredients = async (): Promise<TIngredient[]> => {
  try {
    const { data } = await burgerApi.get<IIngredientsResponse>('/ingredients');

    if (!data?.success) {
      throw new Error('[getIngredients] Поле success: false');
    }

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[getIngredients] Ошибка получения ингредиентов: ${axiosError.message}`
    );

    throw error;
  }
};

export const createOrder = async (ingredientsIds: string[]): Promise<number> => {
  try {
    const { data } = await burgerApi.post<TOrderResponse>('/orders', {
      ingredients: ingredientsIds,
    });

    if (!data?.success) {
      throw new Error('[createOrder] Поле success: false');
    }

    return data.order.number;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`[createOrder] Ошибка создания заказа: ${axiosError.message}`);
    throw error;
  }
};
