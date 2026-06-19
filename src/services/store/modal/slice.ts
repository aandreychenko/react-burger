import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@services/store/modal/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types.ts';

type TModalState = {
  ingredientDetails: TIngredient | null;
  orderDetails: TOrderDetailsState;
};

type TOrderDetailsState = {
  isOpen: boolean;
  isLoading: boolean;
  orderId: number | null;
  error: string | null;
};

const initialState: TModalState = {
  ingredientDetails: null,
  orderDetails: {
    isOpen: false,
    isLoading: false,
    orderId: null,
    error: null,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<TIngredient | null>) => {
      state.ingredientDetails = action.payload;
    },

    closeAllModals: (state) => {
      state.ingredientDetails = null;
      state.orderDetails.isOpen = false;
    },
  },
  selectors: {
    getIngredientDetails: (state) => state.ingredientDetails,
    getOrderDetails: (state) => state.orderDetails,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderDetails.isOpen = true;
        state.orderDetails.isLoading = true;
        state.orderDetails.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.orderDetails.isLoading = false;
        state.orderDetails.orderId = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderDetails.isLoading = false;
        state.orderDetails.error = action.error?.message ?? 'Неизвестная ошибка';
      });
  },
});

export const { setIngredientDetails, closeAllModals } = modalSlice.actions;
export const { getIngredientDetails, getOrderDetails } = modalSlice.selectors;
