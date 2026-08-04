import OrderCard from '@components/order-card/order-card.tsx';

import type { TOrder } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './orders-list.module.css';

type OrdersListProps = {
  list: TOrder[];
};

function OrdersList({ list }: OrdersListProps): JSX.Element {
  return (
    <div className={styles.list}>
      {list.map((order) => (
        <div key={order._id}>
          <OrderCard
            number={order.number}
            name={order.name}
            status={order.status}
            date={new Date(order.createdAt)}
            ingredients={order.ingredients}
          />
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
