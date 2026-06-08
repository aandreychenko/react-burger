import Ingredient from '@components/ingredient/ingredient.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingredients-category.module.css';

type TIngredientCategoryProps = {
  title: string;
  ingredients: TIngredient[];
  whenClick: (ingredient: TIngredient) => void;
};

function IngredientsCategory({
  title,
  ingredients,
  whenClick,
}: TIngredientCategoryProps): React.JSX.Element {
  return (
    <div className={'pt-10'}>
      <div className={'text text_type_main-medium pb-6'}>{title}</div>
      <div className={`${styles.list} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            whenClick={whenClick}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientsCategory;
