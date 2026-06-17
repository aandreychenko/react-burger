import type { TIngredient } from '@utils/types.ts';
import type React from 'react';

import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
  ingredient: TIngredient;
};

function IngredientDetails({ ingredient }: IngredientDetailsProps): React.JSX.Element {
  const getProperty = (
    title: string,
    measure: string,
    value: number
  ): React.JSX.Element => {
    return (
      <div className={`${styles.spec} text text_type_main-default text_color_inactive`}>
        <div>
          {title}, {measure}
        </div>
        <div className={'text_type_digits-default'}>{value}</div>
      </div>
    );
  };

  return (
    <div className={'pb-15'}>
      <div className={styles.detail}>
        <div className={styles.detailMain}>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <div className={'text text_type_main-medium'}>{ingredient.name}</div>
        </div>
        <div className={styles.detailSpecs}>
          <div>{getProperty('Калории', 'ккал', ingredient.calories)}</div>
          <div>{getProperty('Белки', 'г', ingredient.proteins)}</div>
          <div>{getProperty('Жиры', 'г', ingredient.fat)}</div>
          <div>{getProperty('Углеводы', 'г', ingredient.carbohydrates)}</div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
