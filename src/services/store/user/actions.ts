import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUser, login, logout, register, updateUser } from '@utils/api.ts';

export const registerUser = createAsyncThunk('user/register', register);

export const loginUser = createAsyncThunk('user/login', login);

export const logoutUser = createAsyncThunk('user/logout', logout);

export const getUserData = createAsyncThunk('user/getUserData', getUser);

export const updateUserData = createAsyncThunk('user/updateUserData', updateUser);
