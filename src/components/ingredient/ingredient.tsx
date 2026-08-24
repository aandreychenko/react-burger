import { Counter } from '@krgaa/react-developer-burger-ui-components';

import Price from '@components/price/price.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import { getConstructorState } from '@services/store/constructor/slice.ts';

import type { TIngredient } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './ingridient.module.css';

export type TIngredientProps = {
  ingredient: TIngredient;
};

function Ingredient({ ingredient }: TIngredientProps): JSX.Element {
  const { bun, ingredients } = useAppSelector(getConstructorState);

  const getCount = (): number => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : 0;
    }

    return ingredients.filter((item) => item._id === ingredient._id).length;
  };

  const count = getCount();

  return (
    <div
      className={styles.card}
      data-ingredient-name={ingredient.name}
      data-ingredient-type={ingredient.type}
      data-ingredient-id={ingredient._id}
    >
      <img className={'pl-4 pr-4'} src={ingredient.image} alt={ingredient.name} />
      <Price value={ingredient.price} />
      <div className={`${styles.title} text`}>{ingredient.name}</div>

      {!!count && (
        <div className={styles.counter}>
          <Counter count={count} />
        </div>
      )}
    </div>
  );
}

export default Ingredient;
