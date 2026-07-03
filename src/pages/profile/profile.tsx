import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, Outlet, useLocation } from 'react-router-dom';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const location = useLocation();

  const getLinkClasses = (link: string): string => {
    const isActive = location.pathname === link;

    if (isActive) return `${styles.link} ${styles.link_active}`;
    return styles.link;
  };

  const renderContent = (): React.JSX.Element => {
    if (location.pathname === '/profile') {
      return (
        <div className={`flex flex-column ${styles.form}`}>
          <Input
            placeholder="Имя"
            value={''}
            onChange={(e) => console.log(e.target.value)}
          />
          <EmailInput
            placeholder={'Логин'}
            value={''}
            onChange={(e) => console.log(e.target.value)}
          />
          <PasswordInput value={''} onChange={(e) => console.log(e.target.value)} />
        </div>
      );
    }
    return <Outlet />;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={`flex flex-column ${styles.sidebar}`}>
          <ul className={`flex flex-column ${styles.menu}`}>
            <li>
              <Link
                className={`text text_type_main-medium ${getLinkClasses('/profile')}`}
                to={'/profile'}
              >
                Профиль
              </Link>
            </li>
            <li>
              <Link
                className={`text text_type_main-medium ${getLinkClasses('/profile/orders')}`}
                to={'/profile/orders'}
              >
                История заказов
              </Link>
            </li>
            <li>
              <Link
                className={`text text_type_main-medium ${styles.link}`}
                to={'/profile'}
              >
                Выход
              </Link>
            </li>
          </ul>
          <span
            className={`text text_type_main-default text_color_inactive ${styles.caption}`}
          >
            В этом разделе вы можете изменить&nbsp;свои персональные данные
          </span>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
