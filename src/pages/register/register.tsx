import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { registerUser } from '@services/store/user/actions.ts';
import {
  selectIsLoading,
  selectError,
  selectRegisterSuccess,
  clearError,
  clearRegisterSuccess,
} from '@services/store/user/slice.ts';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(registerUser(form));
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Регистрация</h1>
          <Input
            name={'name'}
            placeholder={'Имя'}
            value={form.name}
            onChange={handleChange}
          />
          <EmailInput name={'email'} value={form.email} onChange={handleChange} />
          <PasswordInput
            name={'password'}
            value={form.password}
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
