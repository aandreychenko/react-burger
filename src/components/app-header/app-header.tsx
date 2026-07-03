import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();

  const isActive = (link: string): boolean => {
    const pathname = location.pathname;

    if (link === '/') {
      return pathname === '/' || pathname.startsWith('/ingredients/');
    }
    if (link === '/profile') {
      return pathname === '/profile' || pathname.startsWith('/profile/');
    }
    return pathname === link;
  };

  const getLinkClasses = (link: string): string => {
    return `${styles.link} ${isActive(link) && styles.link_active}`;
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <a href="/" className={getLinkClasses('/')}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a href="/feed" className={`${getLinkClasses('/feed')} ml-10`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a
          href="/profile"
          className={`${getLinkClasses('/profile')} ${styles.link_position_last}`}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
};
