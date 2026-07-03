import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <div className={`flex flex-column ${styles.form}`}>
          <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            value={''}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            placeholder={'Введите код из письма'}
            value={''}
            onChange={(e) => console.log(e.target.value)}
          />
          <Button htmlType={'submit'} onChange={() => console.log('tap')}>
            Сохранить
          </Button>
        </div>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
