import axios from 'axios';

import { BURGER_BASE_URL } from './consts';

import type { IIngredientsResponse, TIngredient } from '@utils/types.ts';
import type { AxiosError } from 'axios';

const burgerApi = axios.create({
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
