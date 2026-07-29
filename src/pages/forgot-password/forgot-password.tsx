import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/use-form.ts';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { forgotPasswordUser } from '@services/store/user/actions.ts';
import {
  selectIsLoading,
  selectError,
  selectForgotPasswordSuccess,
  clearError,
  clearForgotPasswordSuccess,
} from '@services/store/user/slice.ts';

import type { TForgotPasswordFormData } from '@utils/types.ts';
import type { JSX, FormEvent } from 'react';

import styles from './forgot-password.module.css';

export const ForgotPasswordPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm<TForgotPasswordFormData>({
    email: '',
  });

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const forgotPasswordSuccess = useAppSelector(selectForgotPasswordSuccess);

  useEffect(() => {
    if (forgotPasswordSuccess) {
      sessionStorage.setItem('resetPasswordAllowed', 'true');
      dispatch(clearForgotPasswordSuccess());
      void navigate('/reset-password');
    }
  }, [forgotPasswordSuccess, dispatch, navigate]);

  useEffect(() => {
    return (): void => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (values.email) {
      void dispatch(forgotPasswordUser(values.email));
    }
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
          <EmailInput name={'email'} value={values.email} onChange={handleChange} />
          <Button htmlType={'submit'} disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Восстановить'}
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
