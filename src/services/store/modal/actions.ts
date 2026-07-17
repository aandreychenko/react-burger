import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '@utils/api.ts';

export const createOrder = createAsyncThunk('ingredients/order', createOrderApi);
