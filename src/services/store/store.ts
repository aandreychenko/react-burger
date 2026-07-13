import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from '@services/store/constructor/slice.ts';
import { ingredientsSlice } from '@services/store/ingredients/slice.ts';
import { modalSlice } from '@services/store/modal/slice.ts';
import { userSlice } from '@services/store/user/slice.ts';

const rootReducer = combineSlices(
  ingredientsSlice,
  modalSlice,
  constructorSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
