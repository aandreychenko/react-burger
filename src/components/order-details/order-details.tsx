import DoneIcon from '@/assets/images/done-icon.svg';

import styles from './order-details.module.css';

const ORDER_ID = '034536';

function OrderDetails(): React.JSX.Element {
  return (
    <div className={`${styles.details} text mt-20 mb-30`}>
      <div className={'text_type_digits-large'}>{ORDER_ID}</div>
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
