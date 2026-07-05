import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
  updateUser,
} from '@utils/api.ts';

export const registerUser = createAsyncThunk('user/register', register);

export const loginUser = createAsyncThunk('user/login', login);

export const logoutUser = createAsyncThunk('user/logout', logout);

export const getUserData = createAsyncThunk('user/getUserData', getUser);

export const updateUserData = createAsyncThunk('user/updateUserData', updateUser);

export const forgotPasswordUser = createAsyncThunk(
  'user/forgotPassword',
  forgotPassword
);

export const resetPasswordUser = createAsyncThunk('user/resetPassword', resetPassword);
