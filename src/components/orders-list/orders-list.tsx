import { Link } from 'react-router-dom';

import OrderCard from '@components/order-card/order-card.tsx';

import type { TOrder } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './orders-list.module.css';

type OrdersListProps = {
  list: TOrder[];
  page: string;
  isShowStatus?: boolean;
};

function OrdersList({ list, page, isShowStatus }: OrdersListProps): JSX.Element {
  return (
    <div className={`${styles.list} custom-scroll`}>
      {list.map((order) => (
        <Link key={order._id} className={styles.link} to={`/${page}/${order._id}`}>
          <OrderCard
            number={order.number}
            name={order.name}
            status={order.status}
            date={new Date(order.createdAt)}
            ingredients={order.ingredients}
            isShowStatus={isShowStatus}
          />
        </Link>
      ))}
    </div>
  );
}

export default OrdersList;
