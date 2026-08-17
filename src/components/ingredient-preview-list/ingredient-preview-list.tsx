import IngredientPreview from '@components/ingredient-preview/ingredient-preview.tsx';

import type { TIngredientPreviewImage } from '@utils/types.ts';
import type { JSX } from 'react';

import styles from './ingredient-preview-list.module.css';

type IngredientsPreviewListProps = {
  list: TIngredientPreviewImage[];
  maxItems?: number;
};

function IngredientPreviewList({
  list,
  maxItems = 6,
}: IngredientsPreviewListProps): JSX.Element {
  const itemsToShow = list.slice(0, maxItems);

  const cutCounter = list.length - itemsToShow.length;

  const renderPreview = (
    ingredient: TIngredientPreviewImage,
    index: number
  ): JSX.Element => {
    const isLastItem = index === itemsToShow.length - 1;

    return (
      <div
        key={ingredient.id}
        className={styles.preview}
        style={{
          zIndex: maxItems - index,
        }}
      >
        <IngredientPreview
          image={ingredient.image}
          text={isLastItem && !!cutCounter ? `+${cutCounter}` : undefined}
        />
      </div>
    );
  };

  return <div className={styles.list}>{itemsToShow.map(renderPreview)}</div>;
}

export default IngredientPreviewList;
