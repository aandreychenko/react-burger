import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { resetPasswordUser } from '@services/store/user/actions.ts';
import {
  selectIsLoading,
  selectError,
  selectResetPasswordSuccess,
  clearError,
  clearResetPasswordSuccess,
} from '@services/store/user/slice.ts';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(resetPasswordUser(form));
  };

  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSubmit}>
          <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
          <PasswordInput
            name="password"
            placeholder="Введите новый пароль"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            name="token"
            placeholder="Введите код из письма"
            value={form.token}
            onChange={handleChange}
          />
          <Button htmlType="submit" disabled={isLoading}>
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
