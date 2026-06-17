import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { fetchIngredients } from '@services/store/ingredients/actions.ts';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from '@services/store/ingredients/slice.ts';
import { INGREDIENTS } from '@utils/ingredients.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const loading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, []);

  const content = (): React.JSX.Element => {
    switch (true) {
      case error:
        return (
          <div className={styles.error}>
            <h1 className="text text_type_main-large mb-5">Произошла ошибка</h1>
            <p className="text text_type_main-default text_color_inactive">
              Не удалось получить ингредиенты.
              <br />
              Попробуйте обновить страницу
            </p>
          </div>
        );
      case loading:
        return <Preloader />;
      default:
        return (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={INGREDIENTS} />
          </>
        );
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5 pb-10`}>{content()}</main>
    </div>
  );
};

export default App;
