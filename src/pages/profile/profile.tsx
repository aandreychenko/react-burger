import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { logoutUser, updateUserData } from '@services/store/user/actions.ts';
import { selectUser } from '@services/store/user/slice.ts';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectUser);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const initialFormRef = useRef({
    name: '',
    email: '',
    password: '',
  });

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        password: '',
      };

      const isUserDataChanged =
        userData.name !== initialFormRef.current.name ||
        userData.email !== initialFormRef.current.email;

      if (isUserDataChanged || !isInitializedRef.current) {
        setForm(userData);
        initialFormRef.current = userData;
        setIsFormChanged(false);
        isInitializedRef.current = true;
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const isChanged =
      updatedForm.name !== initialFormRef.current.name ||
      updatedForm.email !== initialFormRef.current.email ||
      updatedForm.password !== initialFormRef.current.password;

    setIsFormChanged(isChanged);
  };

  const handleSave = (e: React.FormEvent): void => {
    e.preventDefault();

    const updatedData: Partial<typeof form> = {};
    if (form.name !== initialFormRef.current.name) updatedData.name = form.name;
    if (form.email !== initialFormRef.current.email) updatedData.email = form.email;
    if (form.password) updatedData.password = form.password;

    if (Object.keys(updatedData).length > 0) {
      void dispatch(updateUserData(updatedData));
      initialFormRef.current = { ...form };
      setIsFormChanged(false);
    }
  };

  const handleCancel = (): void => {
    setForm({ ...initialFormRef.current });
    setIsFormChanged(false);
  };

  const handleLogout = (): void => {
    void dispatch(logoutUser());
  };

  const renderHint = (): string => {
    switch (location.pathname) {
      case '/profile':
        return 'В этом разделе вы можете изменить свои персональные данные';
      case '/profile/orders':
        return 'В этом разделе вы можете просмотреть свою историю заказов';
      default:
        return '';
    }
  };

  const renderContent = (): React.JSX.Element => {
    if (location.pathname === '/profile') {
      return (
        <form className={`flex flex-column ${styles.form}`} onSubmit={handleSave}>
          <Input
            name="name"
            placeholder="Имя"
            value={form.name}
            onChange={handleChange}
            icon="EditIcon"
          />
          <EmailInput
            name="email"
            placeholder="Логин"
            value={form.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
          />
          {isFormChanged && (
            <div className={styles.actions}>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={handleCancel}
              >
                Отмена
              </Button>
            </div>
          )}
        </form>
      );
    }
    return <Outlet />;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={`flex flex-column ${styles.sidebar}`}>
          <ul className={`flex flex-column ${styles.menu}`}>
            <li>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.link} ${isActive ? styles.link_active : ''}`
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.link} ${isActive ? styles.link_active : ''}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <Button
                htmlType="button"
                onClick={handleLogout}
                extraClass={`text text_type_main-medium ${styles.link}`}
              >
                Выйти
              </Button>
            </li>
          </ul>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.caption}`}
          >
            {renderHint()}
          </p>
        </nav>
        {renderContent()}
      </div>
    </div>
  );
};
