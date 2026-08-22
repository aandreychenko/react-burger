import { IngredientCard } from '@components/ingredient-card/ingredient-card.tsx';

import type { TIngredient } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './ingredients-category.module.css';

type TIngredientCategoryProps = {
  title: string;
  ingredients: TIngredient[];
};

function IngredientsCategory({
  title,
  ingredients,
}: TIngredientCategoryProps): JSX.Element {
  return (
    <div className={'pt-10'}>
      <div className={'text text_type_main-medium pb-6'}>{title}</div>
      <div className={`${styles.list} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

export default IngredientsCategory;
