import styles from './not-found.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <div className={`flex flex-column ${styles.page}`}>
      <div className={`flex flex-column ${styles.container}`}>
        <h1 className={'text text_type_digits-large text_color_inactive'}>404</h1>
        <span className={'text text_type_main-default text_color_inactive'}>
          Страница не найдена
        </span>
      </div>
    </div>
  );
};
