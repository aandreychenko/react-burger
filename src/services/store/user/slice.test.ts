import { describe, expect, it } from 'vitest';

import { deepClone } from '@utils/helper.ts';

import {
  forgotPasswordUser,
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordUser,
  updateUserData,
} from './actions.ts';
import {
  type TUser,
  type TUserState,
  clearError,
  clearForgotPasswordSuccess,
  clearRegisterSuccess,
  clearResetPasswordSuccess,
  userSlice,
} from './slice.ts';

const { reducer } = userSlice;

const userMock: TUser = {
  email: 'user@ya.ru',
  name: 'Petr Petrov',
};

const registerData = {
  email: 'user@ya.ru',
  password: 'password',
  name: 'Petr Petrov',
};

const loginData = {
  email: 'user@ya.ru',
  password: 'password',
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
  isAuthChecked: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

class UserStateBuilder {
  readonly state: TUserState;

  constructor() {
    this.state = {
      user: null,
      isLoading: false,
      error: null,
      registerSuccess: false,
      isAuthChecked: false,
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false,
    };
  }

  withUser(user: TUser | null): this {
    this.state.user = user;
    return this;
  }

  withLoading(isLoading: boolean): this {
    this.state.isLoading = isLoading;
    return this;
  }

  withError(error: string | null): this {
    this.state.error = error;
    return this;
  }

  withRegisterSuccess(registerSuccess: boolean): this {
    this.state.registerSuccess = registerSuccess;
    return this;
  }

  withIsAuthChecked(isAuthChecked: boolean): this {
    this.state.isAuthChecked = isAuthChecked;
    return this;
  }

  withForgotPasswordSuccess(forgotPasswordSuccess: boolean): this {
    this.state.forgotPasswordSuccess = forgotPasswordSuccess;
    return this;
  }

  withResetPasswordSuccess(resetPasswordSuccess: boolean): this {
    this.state.resetPasswordSuccess = resetPasswordSuccess;
    return this;
  }

  build(): TUserState {
    return deepClone(this.state);
  }
}

const builder = (): UserStateBuilder => new UserStateBuilder();

describe('userSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const result = userSlice.getInitialState();

      expect(result).toEqual(initialState);
    });
  });

  describe('Редьюсеры', () => {
    describe('clearError', () => {
      it('должен очищать ошибку, не трогая остальные поля', () => {
        const state = builder().withUser(userMock).withError('Ошибка').build();

        const result = reducer(state, clearError());

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          error: null,
        });
      });
    });

    describe('clearRegisterSuccess', () => {
      it('должен очищать статус успешной регистрации', () => {
        const state = builder().withUser(userMock).withRegisterSuccess(true).build();

        const result = reducer(state, clearRegisterSuccess());

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          registerSuccess: false,
        });
      });
    });

    describe('clearForgotPasswordSuccess', () => {
      it('должен очищать статус успешного восстановления', () => {
        const state = builder()
          .withUser(userMock)
          .withForgotPasswordSuccess(true)
          .build();

        const result = reducer(state, clearForgotPasswordSuccess());

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          forgotPasswordSuccess: false,
        });
      });
    });

    describe('clearResetPasswordSuccess', () => {
      it('должен очищать статус успешного сброса пароля', () => {
        const state = builder()
          .withUser(userMock)
          .withResetPasswordSuccess(true)
          .build();

        const result = reducer(state, clearResetPasswordSuccess());

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          resetPasswordSuccess: false,
        });
      });
    });

    describe('Иммутабельность редьюсеров', () => {
      it('редьюсеры не должны мутировать исходное состояние', () => {
        const state = builder().withUser(userMock).withError('Ошибка').build();
        const stateCopy = deepClone(state);

        reducer(state, clearError());
        reducer(state, clearRegisterSuccess());
        reducer(state, clearForgotPasswordSuccess());
        reducer(state, clearResetPasswordSuccess());

        expect(state).toEqual(stateCopy);
      });
    });
  });

  describe('Обработчики экшенов (extraReducers)', () => {
    describe('registerUser', () => {
      it('pending: должен ставить isLoading и сбрасывать error и registerSuccess', () => {
        const state = builder()
          .withError('Старая ошибка')
          .withRegisterSuccess(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(state, registerUser.pending('requestId', registerData));

        expect(result).toEqual({
          ...initialState,
          isLoading: true,
          registerSuccess: false,
          isAuthChecked: true,
        });
      });

      it('fulfilled: должен сохранять пользователя и ставить registerSuccess', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          registerUser.fulfilled(
            {
              success: true,
              user: userMock,
              accessToken: 'access-token',
              refreshToken: 'refresh-token',
            },
            'requestId',
            registerData
          )
        );

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          registerSuccess: true,
          isAuthChecked: true,
        });
      });

      it('rejected: должен сбрасывать user и ставить ошибку и сбрасывать registerSuccess', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withRegisterSuccess(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          registerUser.rejected(
            new Error('Ошибка регистрации'),
            'requestId',
            registerData
          )
        );

        expect(result).toEqual({
          ...initialState,
          user: null,
          error: 'Ошибка регистрации',
          registerSuccess: false,
          isAuthChecked: true,
        });
      });

      it('не должен мутировать исходное состояние', () => {
        const state = builder().withUser(userMock).withRegisterSuccess(true).build();
        const stateCopy = deepClone(state);

        reducer(state, registerUser.pending('requestId', registerData));
        expect(state).toEqual(stateCopy);

        reducer(
          state,
          registerUser.fulfilled(
            { success: true, user: userMock, accessToken: 'a', refreshToken: 'b' },
            'requestId',
            registerData
          )
        );
        expect(state).toEqual(stateCopy);
      });
    });

    describe('loginUser', () => {
      it('pending: должен ставить isLoading и сбрасывать error', () => {
        const state = builder()
          .withUser(userMock)
          .withError('Старая ошибка')
          .withIsAuthChecked(true)
          .build();

        const result = reducer(state, loginUser.pending('requestId', loginData));

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          isLoading: true,
          isAuthChecked: true,
        });
      });

      it('fulfilled: должен сохранять пользователя и ставить isAuthChecked', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          loginUser.fulfilled(
            { success: true, user: userMock, accessToken: 'a', refreshToken: 'b' },
            'requestId',
            loginData
          )
        );

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          isAuthChecked: true,
        });
      });

      it('rejected: должен сбрасывать user и ставить ошибку и isAuthChecked', () => {
        const state = builder().withUser(userMock).withLoading(true).build();

        const result = reducer(
          state,
          loginUser.rejected(new Error('Ошибка авторизации'), 'requestId', loginData)
        );

        expect(result).toEqual({
          ...initialState,
          user: null,
          error: 'Ошибка авторизации',
          isAuthChecked: true,
        });
      });
    });

    describe('logoutUser', () => {
      it('pending: должен ставить isLoading и сбрасывать error', () => {
        const state = builder()
          .withUser(userMock)
          .withError('Старая ошибка')
          .withIsAuthChecked(true)
          .build();

        const result = reducer(state, logoutUser.pending('requestId'));

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          isLoading: true,
          isAuthChecked: true,
        });
      });

      it('fulfilled: должен очищать пользователя и сбрасывать isAuthChecked', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          logoutUser.fulfilled({ success: true, message: 'Успешный выход' }, 'requestId')
        );

        expect(result).toEqual({
          ...initialState,
          user: null,
          isAuthChecked: false,
        });
      });

      it('rejected: должен ставить ошибку, сохраняя user и isAuthChecked', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          logoutUser.rejected(new Error('Ошибка выхода'), 'requestId')
        );

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          error: 'Ошибка выхода',
          isAuthChecked: true,
        });
      });
    });

    describe('getUserData', () => {
      it('pending: должен ставить isLoading и сбрасывать error', () => {
        const state = builder().withError('Старая ошибка').build();

        const result = reducer(state, getUserData.pending('requestId'));

        expect(result).toEqual({
          ...initialState,
          isLoading: true,
        });
      });

      it('fulfilled: должен сохранять пользователя и ставить isAuthChecked', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(state, getUserData.fulfilled(userMock, 'requestId'));

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          isAuthChecked: true,
        });
      });

      it('rejected: должен сбрасывать user и ставить ошибку и isAuthChecked', () => {
        const state = builder().withUser(userMock).withLoading(true).build();

        const result = reducer(
          state,
          getUserData.rejected(new Error('Ошибка получения пользователя'), 'requestId')
        );

        expect(result).toEqual({
          ...initialState,
          user: null,
          error: 'Ошибка получения пользователя',
          isAuthChecked: true,
        });
      });
    });

    describe('updateUserData', () => {
      const updateData = { name: 'Updated User' };
      const updatedUser: TUser = { email: 'updated@example.com', name: 'Updated User' };

      it('pending: должен ставить isLoading и сбрасывать error', () => {
        const state = builder()
          .withUser(userMock)
          .withError('Старая ошибка')
          .withIsAuthChecked(true)
          .build();

        const result = reducer(state, updateUserData.pending('requestId', updateData));

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          isLoading: true,
          isAuthChecked: true,
        });
      });

      it('fulfilled: должен сохранять обновленные данные, не меняя isAuthChecked', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          updateUserData.fulfilled(updatedUser, 'requestId', updateData)
        );

        expect(result).toEqual({
          ...initialState,
          user: updatedUser,
          isAuthChecked: true,
        });
      });

      it('rejected: должен ставить ошибку, сохраняя user и isAuthChecked', () => {
        const state = builder()
          .withUser(userMock)
          .withLoading(true)
          .withIsAuthChecked(true)
          .build();

        const result = reducer(
          state,
          updateUserData.rejected(
            new Error('Ошибка обновления'),
            'requestId',
            updateData
          )
        );

        expect(result).toEqual({
          ...initialState,
          user: userMock,
          error: 'Ошибка обновления',
          isAuthChecked: true,
        });
      });
    });

    describe('forgotPasswordUser', () => {
      const email = 'user@ya.ru';

      it('pending: должен ставить isLoading и сбрасывать error и forgotPasswordSuccess', () => {
        const state = builder()
          .withError('Старая ошибка')
          .withForgotPasswordSuccess(true)
          .build();

        const result = reducer(state, forgotPasswordUser.pending('requestId', email));

        expect(result).toEqual({
          ...initialState,
          isLoading: true,
        });
      });

      it('fulfilled: должен ставить forgotPasswordSuccess и сбрасывать loading', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          forgotPasswordUser.fulfilled(
            { success: true, message: 'Письмо отправлено' },
            'requestId',
            email
          )
        );

        expect(result).toEqual({
          ...initialState,
          forgotPasswordSuccess: true,
        });
      });

      it('rejected: должен ставить ошибку и сбрасывать forgotPasswordSuccess', () => {
        const state = builder()
          .withLoading(true)
          .withForgotPasswordSuccess(true)
          .build();

        const result = reducer(
          state,
          forgotPasswordUser.rejected(new Error('Ошибка'), 'requestId', email)
        );

        expect(result).toEqual({
          ...initialState,
          error: 'Ошибка',
        });
      });
    });

    describe('resetPasswordUser', () => {
      const resetData = { password: 'new-password', token: 'reset-token' };

      it('pending: должен ставить isLoading и сбрасывать error и resetPasswordSuccess', () => {
        const state = builder()
          .withError('Старая ошибка')
          .withResetPasswordSuccess(true)
          .build();

        const result = reducer(state, resetPasswordUser.pending('requestId', resetData));

        expect(result).toEqual({
          ...initialState,
          isLoading: true,
        });
      });

      it('fulfilled: должен ставить resetPasswordSuccess и сбрасывать loading', () => {
        const state = builder().withLoading(true).build();

        const result = reducer(
          state,
          resetPasswordUser.fulfilled(
            { success: true, message: 'Пароль изменен' },
            'requestId',
            resetData
          )
        );

        expect(result).toEqual({
          ...initialState,
          resetPasswordSuccess: true,
        });
      });

      it('rejected: должен ставить ошибку и сбрасывать resetPasswordSuccess', () => {
        const state = builder().withLoading(true).withResetPasswordSuccess(true).build();

        const result = reducer(
          state,
          resetPasswordUser.rejected(new Error('Ошибка'), 'requestId', resetData)
        );

        expect(result).toEqual({
          ...initialState,
          error: 'Ошибка',
        });
      });
    });
  });
});
