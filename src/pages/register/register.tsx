import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={`flex flex-column ${styles.container}`}>
        <div className={`flex flex-column ${styles.form}`}>
          <h1 className={'text text_type_main-medium'}>Регистрация</h1>
          <Input
            placeholder="Имя"
            value={''}
            onChange={(e) => console.log(e.target.value)}
          />
          <EmailInput value={''} onChange={(e) => console.log(e.target.value)} />
          <PasswordInput value={''} onChange={(e) => console.log(e.target.value)} />
          <Button htmlType={'submit'} onChange={() => console.log('tap')}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={`flex flex-column ${styles.actions}`}>
          <span className={'text text_type_main-default text_color_inactive'}>
            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
