import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { connect, disconnect, getOrders } from '@services/store/socket/slice.ts';
import { BURGER_WS_BASE_URL } from '@utils/consts.ts';

import type { JSX } from 'react';

import styles from './profile-orders.module.css';

export const ProfileOrderPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '') ?? '';

    dispatch(
      connect({
        url: `${BURGER_WS_BASE_URL}/orders?token=${token}`,
        withTokenRefresh: true,
      })
    );

    return (): void => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <div className={`flex flex-column ${styles.page}`}>
      <div className={`flex flex-column ${styles.container}`}>
        <h1 className={'text text_type_main-large text_color_inactive'}>
          История заказов
        </h1>
        <span className={'text text_type_main-default text_color_inactive'}>
          total: {orders?.total}
          total today: {orders?.totalToday}
          orders:
          {orders?.orders.map((order) => (
            <div key={order._id}>{order?.createdAt}</div>
          ))}
        </span>
      </div>
    </div>
  );
};
