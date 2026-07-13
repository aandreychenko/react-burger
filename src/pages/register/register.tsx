import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/use-form.ts';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { registerUser } from '@services/store/user/actions.ts';
import {
  selectIsLoading,
  selectError,
  selectRegisterSuccess,
  clearError,
  clearRegisterSuccess,
} from '@services/store/user/slice.ts';

import type { TRegisterFormData } from '@utils/types.ts';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm<TRegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const registerSuccess = useAppSelector(selectRegisterSuccess);

  useEffect(() => {
    if (registerSuccess) {
      dispatch(clearRegisterSuccess());
      void navigate('/login');
    }
  }, [registerSuccess, dispatch, navigate]);

  useEffect(() => {
    return (): void => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(registerUser(values));
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Регистрация</h1>
          <Input
            name={'name'}
            placeholder={'Имя'}
            value={values.name}
            onChange={handleChange}
          />
          <EmailInput name={'email'} value={values.email} onChange={handleChange} />
          <PasswordInput
            name={'password'}
            value={values.password}
            onChange={handleChange}
          />
          <Button htmlType={'submit'} disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          {error && (
            <p className={`text text_type_main-default ${styles.error}`}>{error}</p>
          )}
        </form>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
