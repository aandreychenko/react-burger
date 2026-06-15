import { type RefObject, useMemo } from 'react';

import IngredientsCategory from '@components/ingredients-category/ingredients-category.tsx';
import { CATEGORY_TRANSLATE } from '@utils/consts.ts';

import type { TIngredient, TIngredientCategory } from '@utils/types.ts';

import styles from './ingridients-list.module.css';

type TIngredientsListProps = {
  ingredients: TIngredient[];
  categoryRefs: RefObject<Record<string, HTMLDivElement | null>>;
  containerRef: RefObject<HTMLDivElement | null>;
  whenScroll: () => void;
  whenClick: (ingredient: TIngredient) => void;
};

function IngredientsList({
  ingredients,
  categoryRefs,
  containerRef,
  whenScroll,
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
    <div
      className={`${styles.list} custom-scroll pb-6`}
      ref={containerRef}
      onScroll={whenScroll}
    >
      {Object.entries(ingredientsByType).map(([type, list], index) => (
        <div
          key={index}
          ref={(element) => {
            if (categoryRefs.current) {
              categoryRefs.current[type] = element;
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
