import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/use-form.ts';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { resetPasswordUser } from '@services/store/user/actions.ts';
import {
  selectIsLoading,
  selectError,
  selectResetPasswordSuccess,
  clearError,
  clearResetPasswordSuccess,
} from '@services/store/user/slice.ts';

import type { TResetPasswordFormData } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm<TResetPasswordFormData>({
    password: '',
    token: '',
  });

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const resetPasswordSuccess = useAppSelector(selectResetPasswordSuccess);

  useEffect(() => {
    const isResetAllowed = sessionStorage.getItem('resetPasswordAllowed');
    if (!isResetAllowed) {
      void navigate('/forgot-password');
    }
  }, [navigate]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      sessionStorage.removeItem('resetPasswordAllowed');
      dispatch(clearResetPasswordSuccess());
      void navigate('/login');
    }
  }, [resetPasswordSuccess, dispatch, navigate]);

  useEffect(() => {
    return (): void => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(resetPasswordUser(values));
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
          <PasswordInput
            name={'password'}
            placeholder={'Введите новый пароль'}
            value={values.password}
            onChange={handleChange}
          />
          <Input
            name={'token'}
            placeholder={'Введите код из письма'}
            value={values.token}
            onChange={handleChange}
          />
          <Button htmlType={'submit'} disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
          {error && (
            <p className={`text text_type_main-default ${styles.error}`}>{error}</p>
          )}
        </form>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
