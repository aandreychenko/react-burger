import type { TSocketResponse } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './orders-dashboard.module.css';

type OrdersDashboardProps = {
  orders: TSocketResponse | null;
};

function OrdersDashboard({ orders }: OrdersDashboardProps): JSX.Element {
  const doneOrders = orders?.orders
    .filter((order) => order.status === 'done')
    .slice(0, 10);
  const pendingOrders = orders?.orders
    .filter((order) => order.status === 'pending')
    .slice(0, 10);

  return (
    <div className={styles.dashboard}>
      <div className={styles.statusContainer}>
        <div className={styles.done}>
          <div className={'text text_type_main-medium mb-6'}>Готовы:</div>
          <div className={styles.numbers}>
            {doneOrders?.map((order) => (
              <span
                key={order._id}
                className={`text text_type_digits-default ${styles.highlight}`}
              >
                {order.number}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.pending}>
          <div className={'text text_type_main-medium mb-6'}>В работе:</div>
          <div className={styles.numbers}>
            {pendingOrders?.map((order) => (
              <span key={order._id} className={'text text_type_digits-default'}>
                {order.number}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className={'text text_type_main-medium'}>Выполнено за все время:</div>
        <div className={'text text_type_digits-large'}>{orders?.total}</div>
      </div>
      <div>
        <div className={'text text_type_main-medium'}>Выполнено за сегодня:</div>
        <div className={'text text_type_digits-large'}>{orders?.totalToday}</div>
      </div>
    </div>
  );
}

export default OrdersDashboard;
