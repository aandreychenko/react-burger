import { type RefObject, useMemo } from 'react';

import IngredientsCategory from '@components/ingredients-category/ingredients-category.tsx';
import { CATEGORY_TRANSLATE } from '@utils/consts.ts';

import type { TIngredient, TIngredientCategory } from '@utils/types.ts';

import styles from './ingridients-list.module.css';

type TIngredientsListProps = {
  ingredients: TIngredient[];
  refs: RefObject<Record<string, HTMLDivElement | null>>;
  whenClick: (ingredient: TIngredient) => void;
};

function IngredientsList({
  ingredients,
  refs,
  whenClick,
}: TIngredientsListProps): React.JSX.Element {
  const ingredientsByType = useMemo(() => {
    return ingredients.reduce(
      (acc: Record<string, TIngredient[]>, ingredient: TIngredient) => {
        acc[ingredient.type] ??= [];
        acc[ingredient.type].push(ingredient);
        return acc;
      },
      {}
    );
  }, [ingredients]);

  return (
    <div className={`${styles.list} custom-scroll pb-6`}>
      {Object.entries(ingredientsByType).map(([type, list], index) => (
        <div
          key={index}
          ref={(element) => {
            if (refs.current) {
              refs.current[type] = element;
            }
          }}
        >
          <IngredientsCategory
            title={CATEGORY_TRANSLATE[type as TIngredientCategory] || type}
            ingredients={list}
            whenClick={whenClick}
          />
        </div>
      ))}
    </div>
  );
}

export default IngredientsList;
