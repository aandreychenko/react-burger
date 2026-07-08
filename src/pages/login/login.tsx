import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/use-form.ts';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { loginUser } from '@services/store/user/actions.ts';
import { selectIsLoading, selectError, clearError } from '@services/store/user/slice.ts';

import type { TLoginFormData } from '@utils/types.ts';
import type React from 'react';

import styles from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const { values, handleChange } = useForm<TLoginFormData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    return (): void => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(loginUser(values));
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Вход</h1>
          <EmailInput name={'email'} value={values.email} onChange={handleChange} />
          <PasswordInput
            name={'password'}
            value={values.password}
            onChange={handleChange}
          />
          <Button htmlType={'submit'} disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
          {error && (
            <p className={`text text_type_main-default ${styles.error}`}>{error}</p>
          )}
        </form>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Вы&nbsp;— новый пользователь?{' '}
            <Link to={'/register'}>Зарегистрироваться</Link>
          </span>
          <span className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
