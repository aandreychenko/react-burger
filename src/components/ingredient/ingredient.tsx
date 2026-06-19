import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import Price from '@components/price/price.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import { getConstructorState } from '@services/store/constructor/slice.ts';
import { DRAG_TYPE_INGREDIENT } from '@utils/consts.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingridient.module.css';

export type TIngredientProps = {
  ingredient: TIngredient;
  whenClick: (ingredient: TIngredient) => void;
};

function Ingredient({ ingredient, whenClick }: TIngredientProps): React.JSX.Element {
  const { bun, ingredients } = useAppSelector(getConstructorState);

  const getCount = (): number => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : 0;
    }

    return ingredients.filter((item) => item._id === ingredient._id).length;
  };

  const count = getCount();

  const [, dragRef] = useDrag({
    type: DRAG_TYPE_INGREDIENT,
    item: ingredient,
  });

  const handleClick = function (): void {
    whenClick(ingredient);
  };

  return (
    <div
      ref={(node) => void dragRef(node)}
      className={styles.card}
      onClick={handleClick}
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
