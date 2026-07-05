import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  updateUserData,
  forgotPasswordUser,
  resetPasswordUser,
} from './actions.ts';

import type { TUserState } from '@utils/types.ts';

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
  isAuthChecked: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearForgotPasswordSuccess: (state) => {
      state.forgotPasswordSuccess = false;
    },
    clearResetPasswordSuccess: (state) => {
      state.resetPasswordSuccess = false;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectRegisterSuccess: (state) => state.registerSuccess,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectForgotPasswordSuccess: (state) => state.forgotPasswordSuccess,
    selectResetPasswordSuccess: (state) => state.resetPasswordSuccess,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? 'Не удалось зарегистрироваться';
        state.registerSuccess = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? 'Не удалось войти';
        state.isAuthChecked = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось выйти';
      })

      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message ?? 'Не удалось получить пользователя';
        state.isAuthChecked = true;
      })

      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось обновить данные';
      })

      .addCase(forgotPasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Не удалось отправить письмо';
        state.forgotPasswordSuccess = false;
      })

      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Не удалось сбросить пароль';
        state.resetPasswordSuccess = false;
      });
  },
});

export const {
  clearError,
  clearRegisterSuccess,
  clearUser,
  setIsAuthChecked,
  clearForgotPasswordSuccess,
  clearResetPasswordSuccess,
} = userSlice.actions;

export const {
  selectUser,
  selectIsLoading,
  selectError,
  selectRegisterSuccess,
  selectIsAuthChecked,
  selectForgotPasswordSuccess,
  selectResetPasswordSuccess,
} = userSlice.selectors;
