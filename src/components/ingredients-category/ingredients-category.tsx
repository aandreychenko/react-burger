import { Link } from 'react-router-dom';

import Ingredient from '@components/ingredient/ingredient.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './ingredients-category.module.css';

type TIngredientCategoryProps = {
  title: string;
  ingredients: TIngredient[];
};

function IngredientsCategory({
  title,
  ingredients,
}: TIngredientCategoryProps): React.JSX.Element {
  return (
    <div className={'pt-10'}>
      <div className={'text text_type_main-medium pb-6'}>{title}</div>
      <div className={`${styles.list} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <Link
            key={ingredient._id}
            className={styles.link}
            to={`/ingredients/${ingredient._id}`}
          >
            <Ingredient key={ingredient._id} ingredient={ingredient} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default IngredientsCategory;
