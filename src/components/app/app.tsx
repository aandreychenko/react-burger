import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { useAppDispatch } from '@services/hooks/hooks.ts';
import { fetchIngredients } from '@services/store/ingredients/actions.ts';
import { getUserData } from '@services/store/user/actions.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUserData());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5 pb-10`}>
        <Outlet />
      </main>
    </div>
  );
};
