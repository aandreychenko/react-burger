import type { JSX } from 'react';

import styles from './profile-orders.module.css';

export const ProfileOrderPage = (): JSX.Element => {
  return (
    <div className={`flex flex-column ${styles.page}`}>
      <div className={`flex flex-column ${styles.container}`}>
        <h1 className={'text text_type_main-large text_color_inactive'}>
          История заказов
        </h1>
        <span className={'text text_type_main-default text_color_inactive'}>
          Раздел в работе, зайдите попозже :-)
        </span>
      </div>
    </div>
  );
};
