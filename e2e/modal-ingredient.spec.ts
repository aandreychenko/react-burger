import { expect, test, type Page } from '@playwright/test';

import { ConstructorPage } from './helpers/main-page.ts';
import { setupMocks } from './helpers/setup';

const INGREDIENT = 'Флюоресцентная булка';

async function openIngredientModal(page: Page): Promise<ConstructorPage> {
  await setupMocks(page);
  const constructor = new ConstructorPage(page);
  await constructor.openPage();

  await expect(constructor.ingredientCards.first()).toBeVisible({ timeout: 15_000 });
  await constructor.ingredientCards.filter({ hasText: INGREDIENT }).first().click();
  await expect(constructor.modal).toBeVisible();

  return constructor;
}

test.describe('Модалка ингредиента', () => {
  test('открывается и содержит данные ингредиента', async ({ page }) => {
    const constructor = await openIngredientModal(page);

    await expect(constructor.modal).toContainText('Детали ингредиента');
    await expect(constructor.modal).toContainText(INGREDIENT);

    for (const label of ['Калории', 'Белки', 'Жиры', 'Углеводы']) {
      await expect(constructor.modal).toContainText(label);
    }
  });

  test('закрывается по крестику', async ({ page }) => {
    const constructor = await openIngredientModal(page);
    await constructor.modalClose.click();
    await expect(constructor.modal).toBeHidden({ timeout: 5_000 });
  });

  test('закрывается по клику на оверлей', async ({ page }) => {
    const constructor = await openIngredientModal(page);
    await constructor.modalOverlay.click({ position: { x: 5, y: 5 } });
    await expect(constructor.modal).toBeHidden({ timeout: 5_000 });
  });
});
