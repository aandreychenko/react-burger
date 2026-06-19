import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/api.ts';

export const fetchIngredients = createAsyncThunk('ingredients/fetch', getIngredients);
