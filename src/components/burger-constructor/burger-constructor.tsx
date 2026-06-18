import { Button, ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorItem } from '@components/constructor-item/constructor-item.tsx';
import OrderDetails from '@components/order-details/order-details.tsx';
import Price from '@components/price/price.tsx';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import {
  addIngredient,
  getConstructorState,
} from '@services/store/constructor/slice.ts';
import { createOrder } from '@services/store/modal/actions.ts';
import { closeAllModals, getOrderDetails } from '@services/store/modal/slice.ts';
import { DRAG_TYPE_INGREDIENT } from '@utils/consts.ts';

import Modal from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBunPosition = 'top' | 'bottom';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector(getOrderDetails);

  const { bun, ingredients } = useAppSelector(getConstructorState);

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: DRAG_TYPE_INGREDIENT,
    drop(ingredient: TIngredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalCost = useMemo(() => {
    const bunsPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    return bunsPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const handleOpenModal = (): void => {
    if (!bun) return;

    const orderDataIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];
    void dispatch(createOrder(orderDataIds));
  };

  const handleCloseModal = (): void => {
    dispatch(closeAllModals());
  };

  const constructorClassName = `
    ${styles.burger_constructor}
    ${isHover ? styles.onHover : ''}
    pt-25 pl-4 pr-4`;

  const renderBun = (
    bun: TIngredient | null,
    position: TBunPosition
  ): React.JSX.Element => {
    const isTop = position === 'top';
    return (
      <div className={`${isTop ? 'mb-4' : 'mt-4'} pl-8`}>
        {bun ? (
          <ConstructorElement
            price={bun.price}
            text={`${bun.name} ${isTop ? '(верх)' : '(низ)'}`}
            thumbnail={bun.image}
            type={position}
            isLocked
          />
        ) : (
          <div
            className={`${styles.emptyElement}
            ${isTop ? styles.emptyBunTop : styles.emptyBunBottom}
            text text_type_main-default`}
          >
            Выберите булки
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={(node) => void dropTargetRef(node)} className={constructorClassName}>
      {renderBun(bun, 'top')}

      {ingredients.length > 0 ? (
        <ul className={`${styles.list} custom-scroll`}>
          {ingredients.map((ingredient, index) => (
            <ConstructorItem
              key={ingredient.constructorId} // Передаем железный уникальный ID
              ingredient={ingredient}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <div className={'pl-8'}>
          <div
            className={`${styles.emptyElement} ${styles.emptyIngredient} text text_type_main-default`}
          >
            Выберите начинку
          </div>
        </div>
      )}

      {renderBun(bun, 'bottom')}

      <div className={`${styles.footer} mt-10 mb-13`}>
        <Price value={totalCost} size={'medium'} />
        <Button
          onClick={handleOpenModal}
          type="primary"
          htmlType="button"
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>

      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
