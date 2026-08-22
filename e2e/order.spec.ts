import { expect, test } from '@playwright/test';

import { ConstructorPage } from './helpers/main-page.ts';
import { setupMocks } from './helpers/setup';

test.describe('Оформление заказа', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    const constructor = new ConstructorPage(page);
    await constructor.openPage();

    await expect(constructor.ingredientCards.first()).toBeVisible({ timeout: 15_000 });

    await constructor.ingredientCards
      .filter({ hasText: 'Краторная булка' })
      .first()
      .dragTo(constructor.dropZone);
    await constructor.ingredientCards
      .filter({ hasText: 'Хрустящие минеральные кольца' })
      .first()
      .dragTo(constructor.dropZone);
  });

  test('открывается модалка заказа с номером', async ({ page }) => {
    const constructor = new ConstructorPage(page);
    await constructor.orderButton.click();

    await expect(page.getByTestId('order-id')).toBeVisible({ timeout: 15_000 });
  });

  test('модалка заказа закрывается по крестику', async ({ page }) => {
    const constructor = new ConstructorPage(page);
    await constructor.orderButton.click();
    await expect(page.getByTestId('order-id')).toBeVisible({ timeout: 5_000 });

    await constructor.modalClose.click();
    await expect(constructor.modal).toBeHidden();
  });
});
