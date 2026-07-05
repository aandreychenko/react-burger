import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useAppDispatch, useAppSelector } from '@services/hooks/hooks.ts';
import { fetchIngredients } from '@services/store/ingredients/actions.ts';
import {
  getIngredientsError,
  getIngredientsLoading,
} from '@services/store/ingredients/slice.ts';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  const content = (): React.JSX.Element => {
    switch (true) {
      case error:
        return (
          <div className={styles.error}>
            <h1 className={'text text_type_main-large mb-5'}>Произошла ошибка</h1>
            <p className={'text text_type_main-default text_color_inactive'}>
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
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        );
    }
  };

  return <DndProvider backend={HTML5Backend}>{content()}</DndProvider>;
};
