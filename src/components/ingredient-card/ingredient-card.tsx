import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

import Ingredient, {
  type TIngredientProps,
} from '@components/ingredient/ingredient.tsx';
import { DRAG_TYPE_INGREDIENT } from '@utils/consts.ts';

import type { JSX } from 'react';

import styles from './ingredient-card.module.css';

export function IngredientCard({ ingredient }: TIngredientProps): JSX.Element {
  const [, dragRef] = useDrag({
    type: DRAG_TYPE_INGREDIENT,
    item: ingredient,
  });

  return (
    <div ref={(node) => void dragRef(node)} data-testid="ingredient-item" draggable>
      <Link
        key={ingredient._id}
        className={styles.link}
        to={`/ingredients/${ingredient._id}`}
      >
        <Ingredient ingredient={ingredient} />
      </Link>
    </div>
  );
}
