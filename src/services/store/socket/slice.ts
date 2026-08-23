import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TConnectPayload, TSocketResponse } from '@utils/types.ts';

export type TSocketState = {
  isConnected: boolean;
  orders: TSocketResponse | null;
  error: string | null;
  isLoading: boolean;
};

export const initialState: TSocketState = {
  isConnected: false,
  orders: null,
  error: null,
  isLoading: false,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  selectors: {
    getOrders: (state) => state.orders,
    getOrderById: (state, id: string | undefined) =>
      state.orders?.orders.find((item) => item._id === id),
  },
  reducers: {
    connect: (state, _action: PayloadAction<TConnectPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.orders = null;
      state.isLoading = false;
      state.error = null;
    },
    onOpen: (state) => {
      state.isLoading = false;
      state.isConnected = true;
      state.error = null;
    },
    onMessage: (state, action: PayloadAction<TSocketResponse>) => {
      state.orders = action.payload;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onClose: (state) => {
      state.isConnected = false;
      state.isLoading = false;
    },
  },
});

export const { connect, disconnect, onOpen, onMessage, onError, onClose } =
  socketSlice.actions;

export const { getOrders, getOrderById } = socketSlice.selectors;

export default socketSlice.reducer;
