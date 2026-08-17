import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import OrdersList from '@components/orders-list/orders-list.tsx';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { connect, disconnect, getOrders } from '@services/store/socket/slice.ts';
import { BURGER_WS_BASE_URL } from '@utils/consts.ts';

import type { JSX } from 'react';

import styles from './profile-orders.module.css';

export const ProfileOrderPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const ordersList = orders?.orders ?? [];

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
      <OrdersList list={ordersList} page={'profile/orders'} isShowStatus />
      <Outlet />
    </div>
  );
};
