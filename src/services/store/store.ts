import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from '@services/store/constructor/slice.ts';
import { ingredientsSlice } from '@services/store/ingredients/slice.ts';
import { socketMiddleware } from '@services/store/middleware/socket-middleware.ts';
import { modalSlice } from '@services/store/modal/slice.ts';
import { socketSlice } from '@services/store/socket/slice.ts';
import { userSlice } from '@services/store/user/slice.ts';

const rootReducer = combineSlices(
  ingredientsSlice,
  modalSlice,
  constructorSlice,
  userSlice,
  socketSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
