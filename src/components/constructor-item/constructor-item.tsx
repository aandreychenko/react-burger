import {
  DragIcon,
  ConstructorElement,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '@services/hooks/hooks.ts';
import { removeIngredient, moveIngredient } from '@services/store/constructor/slice.ts';

import type { TConstructorItem } from '@services/store/constructor/slice.ts';

import styles from './constructor-item.module.css';

type TConstructorItemProps = {
  ingredient: TConstructorItem;
  index: number;
};

const SORT_TYPE = 'sort_ingredient';

export const ConstructorItem = ({
  ingredient,
  index,
}: TConstructorItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);
  const dragIconRef = useRef<HTMLDivElement>(null);

  const [, dropRef] = useDrop({
    accept: SORT_TYPE,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: SORT_TYPE,
    item: () => ({ id: ingredient.constructorId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragPreview(dropRef(ref));

  dragRef(dragIconRef);

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      ref={ref}
      className={styles.item}
      style={{ opacity }}
      data-testid="constructor-item"
    >
      <div ref={dragIconRef} className={styles.dragIcon} style={{ cursor: 'grab' }}>
        <DragIcon type={'primary'} />
      </div>

      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient.constructorId))}
      />
    </li>
  );
};
