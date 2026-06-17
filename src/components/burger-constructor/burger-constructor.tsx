import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import OrderDetails from '@components/order-details/order-details.tsx';
import Price from '@components/price/price.tsx';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { createOrder } from '@services/store/modal/actions.ts';
import { closeAllModals, getOrderDetails } from '@services/store/modal/slice.ts';
import { BUN } from '@utils/ingredients.ts';

import Modal from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const { isOpen } = useAppSelector(getOrderDetails);
  const dispatch = useAppDispatch();

  const openModal = (): void => {
    const orderData = [
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d7',
      '692889f16bf770001bfeb4cc',
    ];

    void dispatch(createOrder(orderData));
  };

  const closeModal = (): void => {
    dispatch(closeAllModals());
  };

  return (
    <section className={`${styles.burger_constructor} pt-25 pl-4 pr-4`}>
      <div className={'mb-4 pl-8'}>
        <ConstructorElement
          price={BUN.price}
          text={`${BUN.name} (верх)`}
          thumbnail={BUN.image}
          type={'top'}
          isLocked
        />
      </div>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.dragIcon}>
              <DragIcon type={'primary'} />
            </div>
            <ConstructorElement
              price={ingredient.price}
              text={ingredient.name}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className={'mt-4 pl-8'}>
        <ConstructorElement
          price={BUN.price}
          text={`${BUN.name} (низ)`}
          thumbnail={BUN.image}
          type={'bottom'}
          isLocked
        />
      </div>
      <div className={`${styles.footer} mt-10 mb-13`}>
        <Price value={610} size={'medium'} />
        <Button onClick={openModal} type="primary" htmlType="button">
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
