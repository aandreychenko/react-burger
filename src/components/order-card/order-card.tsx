import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from '@reduxjs/toolkit';

import IngredientPreviewList from '@components/ingredient-preview-list/ingredient-preview-list.tsx';
import Price from '@components/price/price.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import {
  getIngredientImagesById,
  getIngredientNamesById,
  getIngredientPricesById,
} from '@services/store/ingredients/slice.ts';
import { STATUS_TRANSLATE } from '@utils/consts.ts';

import type { TIngredientPreviewImage, TOrderStatus } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './order-card.module.css';

type TOrderCardProps = {
  name: string;
  status?: TOrderStatus;
  number: number;
  date: Date;
  ingredients: string[];
};

function OrderCard({
  name,
  number,
  date,
  status,
  ingredients,
}: TOrderCardProps): JSX.Element {
  const ingredientImages = useAppSelector(getIngredientImagesById);
  const ingredientNames = useAppSelector(getIngredientNamesById);
  const ingredientPrices = useAppSelector(getIngredientPricesById);

  let orderStatus;
  let statusStyles = `text text_type_main-default`;

  switch (status) {
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

  const totalPrice = ingredients.reduce((acc, item) => {
    return acc + ingredientPrices[item];
  }, 0);

  const ingredientPreviews = ingredients.reduce(
    (acc, item): TIngredientPreviewImage[] => {
      return [
        ...acc,
        {
          id: nanoid(),
          name: ingredientNames[item],
          image: ingredientImages[item],
        },
      ];
    },
    []
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={'text text_type_digits-default'}>#{number}</span>
        <FormattedDate
          date={date}
          className={'text text_type_main-default text_color_inactive'}
        />
      </div>
      <div className={styles.main}>
        <div className={'text text_type_main-medium'}>{name}</div>
        {status && <div className={statusStyles}>{orderStatus}</div>}
      </div>
      <div className={styles.footer}>
        <IngredientPreviewList list={ingredientPreviews} />
        <Price value={totalPrice} size={'default'} />
      </div>
    </div>
  );
}

export default OrderCard;
