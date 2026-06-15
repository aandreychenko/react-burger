import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useCallback, useEffect } from 'react';

import IngredientDetails from '@components/ingredient-details/ingredient-details.tsx';
import IngredientsList from '@components/ingredients-list/ingredients-list.tsx';
import useModal from '@hooks/use-modal.ts';
import { INGREDIENT_CATEGORY } from '@utils/consts.ts';

import type { TIngredient, TIngredientCategory } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [tab, setTab] = useState<TIngredientCategory>('bun');
  const [currentIngredient, setCurrentIngredient] = useState<TIngredient | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const isClickScrolling = useRef<boolean>(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleOpenModal = (ingredient: TIngredient): void => {
    setCurrentIngredient(ingredient);
    openModal();
  };

  const handleCloseModal = useCallback(() => {
    closeModal();
    setCurrentIngredient(null);
  }, []);

  const handleScroll = (): void => {
    if (isClickScrolling.current || !listContainerRef.current) return;

    const paddingTop = 40;
    const containerTop =
      listContainerRef.current.getBoundingClientRect().top + paddingTop;
    let closestTab: TIngredientCategory = 'bun';
    let minDistance = Infinity;

    Object.entries(categoryRefs.current).forEach(([categoryType, categoryElement]) => {
      if (!categoryElement) return;

      const categoryTop = categoryElement.getBoundingClientRect().top;
      const distance = Math.abs(categoryTop - containerTop);

      if (distance < minDistance) {
        minDistance = distance;
        closestTab = categoryType as TIngredientCategory;
      }
    });

    if (closestTab !== tab) {
      setTab(closestTab);
    }
  };

  const isTab = function (value: string): value is TIngredientCategory {
    return INGREDIENT_CATEGORY.includes(value as TIngredientCategory);
  };

  const handleTabChange = (tab: string): void => {
    if (!isTab(tab)) return;

    setTab(tab);

    const element = categoryRefs.current[tab];
    if (element) {
      isClickScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const handleScrollEnd = (): void => {
      isClickScrolling.current = false;
    };

    container.addEventListener('scrollend', handleScrollEnd);
    return (): void => container.removeEventListener('scrollend', handleScrollEnd);
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Tab value="bun" active={tab === 'bun'} onClick={handleTabChange}>
              Булки
            </Tab>
          </li>
          <li>
            <Tab value="main" active={tab === 'main'} onClick={handleTabChange}>
              Начинки
            </Tab>
          </li>
          <li>
            <Tab value="sauce" active={tab === 'sauce'} onClick={handleTabChange}>
              Соусы
            </Tab>
          </li>
        </ul>
      </nav>
      <IngredientsList
        ingredients={ingredients}
        categoryRefs={categoryRefs}
        containerRef={listContainerRef}
        whenScroll={handleScroll}
        whenClick={handleOpenModal}
      />
      {currentIngredient && isModalOpen && (
        <IngredientDetails ingredient={currentIngredient} onClose={handleCloseModal} />
      )}
    </section>
  );
};
