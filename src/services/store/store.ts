import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { modalSlice } from '@services/store/modal/slice.ts';

import { ingredientsSlice } from './ingredients/slice.ts';

const rootReducer = combineSlices(ingredientsSlice, modalSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
