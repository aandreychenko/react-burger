import IngredientPreview from '@components/ingredient-preview/ingredient-preview.tsx';
import Price from '@components/price/price.tsx';

import type { JSX } from 'react';

import styles from './order-composition-item.module.css';

type OrderCompositionItemProps = {
  image: string;
  name: string;
  count: number;
  price: number;
};

function OrderCompositionItem({
  image,
  name,
  count,
  price,
}: OrderCompositionItemProps): JSX.Element {
  return (
    <div className={styles.container}>
      <IngredientPreview image={image} />
      <span className={`text text_type_main-default ${styles.name}`}>{name}</span>
      <Price value={`${count} x ${price}`} />
    </div>
  );
}

export default OrderCompositionItem;
