import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/hooks.ts';
import { selectUser } from '@services/store/user/slice.ts';

import type { JSX } from 'react';

import styles from './app-header.module.css';

export const AppHeader = (): JSX.Element => {
  const user = useAppSelector(selectUser);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive && styles.link_active}`
            }
          >
            <BurgerIcon type={'primary'} />
            <p className={'text text_type_main-default ml-2'}>Конструктор</p>
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              `${styles.link} ${isActive && styles.link_active} ml-10`
            }
          >
            <ListIcon type={'secondary'} />
            <p className={'text text_type_main-default ml-2'}>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to={'/'}>
            <Logo />
          </NavLink>
        </div>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            `${styles.link} ${isActive && styles.link_active} ${styles.link_position_last}`
          }
        >
          <ProfileIcon type={'secondary'} />
          <p className={'text text_type_main-default ml-2'}>
            {user ? user.name : 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
