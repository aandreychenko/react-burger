import type { INGREDIENT_CATEGORY } from '@utils/consts.ts';

export type TIngredient = {
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

export type TConstructorItem = TIngredient & { constructorId: string };

export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TIngredientCategory = (typeof INGREDIENT_CATEGORY)[number];

export type TRegisterFormData = {
  email: string;
  password: string;
  name: string;
};

export type TLoginFormData = {
  email: string;
  password: string;
};

export type TRegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
  message?: string;
};

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
  message?: string;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type TForgotPasswordFormData = {
  email: string;
};

export type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type TResetPasswordFormData = {
  password: string;
  token: string;
};

export type TOrder = {
  _id: string;
  status: string;
  ingredients: string[];
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TSocketResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  message?: string;
};

export type TConnectPayload = {
  url: string;
  withTokenRefresh?: boolean;
};
