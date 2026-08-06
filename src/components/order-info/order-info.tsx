import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import OrderCompositionItem from '@components/order-composition-item/order-composition-item.tsx';
import Price from '@components/price/price';
import { useAppSelector } from '@services/hooks/hooks';
import {
  getIngredientImagesById,
  getIngredientNamesById,
  getIngredientPricesById,
} from '@services/store/ingredients/slice';
import { STATUS_TRANSLATE } from '@utils/consts.ts';

import type { TOrder } from '@utils/types';
import type { JSX } from 'react';

import styles from './order-info.module.css';

type TOrderInfoProps = {
  order: TOrder;
};

function OrderInfo({ order }: TOrderInfoProps): JSX.Element {
  const ingredientImages = useAppSelector(getIngredientImagesById);
  const ingredientNames = useAppSelector(getIngredientNamesById);
  const ingredientPrices = useAppSelector(getIngredientPricesById);

  const countMap = new Map<string, number>();
  order.ingredients.forEach((ingredient) => {
    countMap.set(ingredient, (countMap.get(ingredient) ?? 0) + 1);
  });

  const uniqueIngredients = Array.from(countMap.entries()).map(([id, count]) => ({
    id,
    count,
  }));

  const totalCost = order.ingredients.reduce((acc, item) => {
    return acc + ingredientPrices[item];
  }, 0);

  let orderStatus;
  let statusStyles = `text text_type_main-default`;

  switch (order.status) {
    case 'created':
      orderStatus = STATUS_TRANSLATE.created;
      break;
    case 'pending':
      orderStatus = STATUS_TRANSLATE.pending;
      break;
    case 'done':
      orderStatus = STATUS_TRANSLATE.done;
      statusStyles = statusStyles.concat(` ${styles.highlight}`);
      break;
    default:
      break;
  }

  return (
    <div className={`mb-10 ${styles.orderInfo}`}>
      <div className={'text text_type_digits-default mb-10'}>#{order.number}</div>
      <div className={'mb-15'}>
        <div className={'text text_type_main-medium mb-3'}>{order.name}</div>
        <div className={statusStyles}>{orderStatus}</div>
      </div>
      <div className={'text text_type_main-medium mb-6'}>Состав:</div>
      <div className={`mb-10 ${styles.list}`}>
        {uniqueIngredients.map((item) => (
          <OrderCompositionItem
            key={item.id}
            image={ingredientImages[item.id]}
            name={ingredientNames[item.id]}
            count={item.count}
            price={ingredientPrices[item.id]}
          />
        ))}
      </div>
      <div className={styles.bottom}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={'text text_type_main-default text_color_inactive'}
        />
        <Price value={totalCost} size={'default'} />
      </div>
    </div>
  );
}

export default OrderInfo;
