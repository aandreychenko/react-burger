import DoneIcon from '@/assets/images/done-icon.svg';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@services/hooks/hooks.ts';
import { getOrderDetails } from '@services/store/modal/slice.ts';

import styles from './order-details.module.css';

function OrderDetails(): React.JSX.Element {
  const { isLoading, orderId, error } = useAppSelector(getOrderDetails);

  if (isLoading) {
    return (
      <div className={'pt-10 pb-20'}>
        <Preloader />
      </div>
    );
  }

  if (error) {
    return <div className={`text_type_main-medium pt-10 pb-10`}>{error}</div>;
  }

  return (
    <div className={`${styles.details} text mt-20 mb-30`}>
      <div className={'text_type_digits-large'}>{orderId}</div>
      <div className={'text_type_main-medium mt-8'}>Идентификатор заказа</div>
      <div className={`${styles.iconContainer} mt-15 mb-15`}>
        <img src={DoneIcon} alt={'Готово'} />
      </div>
      <div className={'text_type_main-small'}>Ваш заказ начали готовить</div>
      <div className={'text_type_main-small text_color_inactive mt-2'}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}

export default OrderDetails;
