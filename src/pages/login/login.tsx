import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <div className={`flex flex-column ${styles.form}`}>
          <h1 className={'text text_type_main-medium'}>Вход</h1>
          <EmailInput value={''} onChange={(e) => console.log(e.target.value)} />
          <PasswordInput value={''} onChange={(e) => console.log(e.target.value)} />
          <Button htmlType={'submit'} onChange={() => console.log('tap')}>
            Войти
          </Button>
        </div>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Вы&nbsp;— новый пользователь?{' '}
            <Link to={'/register'}>Зарегистрироваться</Link>
          </span>
          <span className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
