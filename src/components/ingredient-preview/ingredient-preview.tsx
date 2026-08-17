import type { JSX } from 'react';

import styles from './ingredient-preview.module.css';

type IngredientPreviewProps = {
  image: string;
  text?: string;
};

function IngredientPreview({ image, text }: IngredientPreviewProps): JSX.Element {
  return (
    <div className={styles.backdrop}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}>
        <div className={'text text_type_main-default'}>{text}</div>
      </div>
    </div>
  );
}

export default IngredientPreview;
