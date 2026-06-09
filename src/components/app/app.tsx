import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { getIngredients } from '@utils/api.ts';
import { INGREDIENTS } from '@utils/ingredients.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState([] as TIngredient[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getIngredientsList = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await getIngredients();

        setIngredients(data);
      } catch (error) {
        console.error(error);

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void getIngredientsList();
  }, []);

  const content = (): React.JSX.Element => {
    switch (true) {
      case isError:
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
      case isLoading:
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
