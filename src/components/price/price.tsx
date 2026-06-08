import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './price.module.css';

type PriceSize = 'default' | 'medium';

type TPriceProps = {
  value: number;
  size?: PriceSize;
};

function Price({ value, size = 'default' }: TPriceProps): React.JSX.Element {
  return (
    <div className={styles.price}>
      <div className={`text text_type_digits-${size} mr-2`}>{value}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default Price;
