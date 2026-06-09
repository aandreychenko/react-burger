import { Counter } from '@krgaa/react-developer-burger-ui-components';

import Price from '@components/price/price.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingridient.module.css';

export type TIngredientProps = {
  ingredient: TIngredient;
  whenClick: (ingredient: TIngredient) => void;
};

function Ingredient({ ingredient, whenClick }: TIngredientProps): React.JSX.Element {
  const handleClick = function (): void {
    whenClick(ingredient);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img className={'pl-4 pr-4'} src={ingredient.image} alt={ingredient.name} />
      <Price value={ingredient.price} />
      <div className={`${styles.title} text`}>{ingredient.name}</div>
      <div className={styles.counter}>
        <Counter count={1} />
      </div>
    </div>
  );
}

export default Ingredient;
