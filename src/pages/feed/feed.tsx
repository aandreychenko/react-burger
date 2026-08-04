import { type JSX, useEffect } from 'react';

import OrdersList from '@components/orders-list/orders-list.tsx';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { connect, disconnect, getOrders } from '@services/store/socket/slice.ts';
import { BURGER_WS_BASE_URL } from '@utils/consts.ts';

import styles from './feed.module.css';

export const FeedPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const ordersList = orders?.orders ?? [];

  useEffect(() => {
    dispatch(connect({ url: `${BURGER_WS_BASE_URL}/orders/all` }));

    return (): void => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <div className={`flex flex-column ${styles.page}`}>
      <div className={`flex flex-column ${styles.container}`}>
        <h1 className={'text text_type_main-large text_color_inactive'}>
          Лента заказов
        </h1>
        <OrdersList list={ordersList} />
      </div>
    </div>
  );
};
