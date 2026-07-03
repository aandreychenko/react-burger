import { create } from 'axios';

import { getToken, removeTokens, setTokens } from '@utils/token.ts';

import { BURGER_BASE_URL } from './consts';

import type {
  IIngredientsResponse,
  TOrderResponse,
  TIngredient,
  TRegisterResponse,
  TRegisterFormData,
  TLogoutResponse,
  TLoginResponse,
  TLoginFormData,
  TRefreshTokenResponse,
} from '@utils/types.ts';
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

export const register = async (
  formData: TRegisterFormData
): Promise<TRegisterResponse> => {
  try {
    const { data } = await burgerApi.post<TRegisterResponse>('/auth/register', formData);

    if (!data?.success) {
      throw new Error(data.message ?? 'Ошибка регистрации');
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.response?.data?.message) {
      console.error(
        `[register] Ошибка регистрации: ${axiosError.response.data.message}`
      );
      throw new Error(axiosError.response.data.message);
    }

    console.error(`[register] Ошибка регистрации: ${axiosError.message}`);
    throw error;
  }
};

export const refreshToken = async (): Promise<TRefreshTokenResponse> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token не найден');
    }

    const { data } = await burgerApi.post<TRefreshTokenResponse>('/auth/token', {
      token: refreshToken,
    });

    if (!data?.success) {
      throw new Error('[refreshToken] Поле success: false');
    }

    setTokens(data.accessToken, data.refreshToken);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`[refreshToken] Ошибка обновления токена: ${axiosError.message}`);
    throw error;
  }
};

export const login = async (formData: TLoginFormData): Promise<TLoginResponse> => {
  try {
    const { data } = await burgerApi.post<TLoginResponse>('/auth/login', formData);

    if (!data?.success) {
      throw new Error(data.message ?? 'Ошибка авторизации');
    }

    setTokens(data.accessToken, data.refreshToken);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      console.error(`[login] Ошибка входа: ${axiosError.response.data.message}`);
      throw new Error(axiosError.response.data.message);
    }
    console.error(`[login] Ошибка входа: ${axiosError.message}`);
    throw error;
  }
};

export const logout = async (): Promise<TLogoutResponse> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token не найден');
    }

    const { data } = await burgerApi.post<TLogoutResponse>('/auth/logout', {
      token: refreshToken,
    });

    if (!data?.success) {
      throw new Error(data.message || 'Неизвестная ошибка выхода');
    }

    removeTokens();

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      console.error(`[logout] Ошибка выхода: ${axiosError.response.data.message}`);
      throw new Error(axiosError.response.data.message);
    }
    console.error(`[logout] Ошибка выхода: ${axiosError.message}`);
    throw error;
  }
};

export const getUser = async (): Promise<TLoginResponse['user']> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Токен не найден');
    }

    const { data } = await burgerApi.get<TLoginResponse>('/auth/user', {
      headers: {
        Authorization: token,
      },
    });

    if (!data?.success) {
      throw new Error('[getUser] Поле success: false');
    }

    return data.user;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      try {
        await refreshToken();
        return await getUser();
      } catch (refreshError) {
        removeTokens();
        throw refreshError;
      }
    }

    console.error(`[getUser] Ошибка получения пользователя: ${axiosError.message}`);
    throw error;
  }
};

export const updateUser = async (
  userData: Partial<TLoginResponse['user']>
): Promise<TLoginResponse['user']> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Токен не найден');
    }

    const { data } = await burgerApi.patch<TLoginResponse>('/auth/user', userData, {
      headers: {
        Authorization: token,
      },
    });

    if (!data?.success) {
      throw new Error('[updateUser] Поле success: false');
    }

    return data.user;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      try {
        await refreshToken();
        return await updateUser(userData);
      } catch (refreshError) {
        removeTokens();
        throw refreshError;
      }
    }

    console.error(`[updateUser] Ошибка обновления пользователя: ${axiosError.message}`);
    throw error;
  }
};
