import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch } from '@services/hooks/hooks.ts';
import { logoutUser } from '@services/store/user/actions.ts';

import type { JSX } from 'react';

import styles from './profile.module.css';

export const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = (): void => {
    void dispatch(logoutUser());
  };

  const renderHint = (): string => {
    if (location.pathname === '/profile') {
      return 'В этом разделе вы можете изменить свои персональные данные';
    } else if (location.pathname.startsWith('/profile/orders')) {
      return 'В этом разделе вы можете просмотреть свою историю заказов';
    } else {
      return '';
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={`flex flex-column ${styles.sidebar}`}>
          <ul className={`flex flex-column ${styles.menu}`}>
            <li>
              <NavLink
                to={'/profile'}
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
                to={'/profile/orders'}
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.link} ${isActive ? styles.link_active : ''}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                className={`text text_type_main-medium ${styles.link} ${styles.menuButton}`}
                type={'button'}
                onClick={handleLogout}
              >
                Выйти
              </button>
            </li>
          </ul>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.caption}`}
          >
            {renderHint()}
          </p>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
