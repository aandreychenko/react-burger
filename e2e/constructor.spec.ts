import { expect, test } from '@playwright/test';

import { ConstructorPage } from './helpers/main-page.ts';
import { setupMocks } from './helpers/setup';

test.describe('Конструктор: перетаскивание', () => {
  test('добавление булки и начинок перетаскиванием', async ({ page }) => {
    await setupMocks(page);
    const constructor = new ConstructorPage(page);
    await constructor.openPage();

    await expect(constructor.ingredientCards.first()).toBeVisible({ timeout: 15_000 });

    const bun = constructor.ingredientCards
      .filter({ hasText: 'Флюоресцентная булка' })
      .first();
    await bun.dragTo(constructor.dropZone);
    await expect(constructor.bunTop).toContainText('Флюоресцентная булка');
    await expect(constructor.bunBottom).toContainText('Флюоресцентная булка');

    const filling = constructor.ingredientCards
      .filter({ hasText: 'Говяжий метеорит' })
      .first();
    await filling.dragTo(constructor.dropZone);
    await expect(constructor.fillings).toHaveCount(1);

    const sauce = constructor.ingredientCards
      .filter({ hasText: 'Соус Spicy-X' })
      .first();
    await sauce.dragTo(constructor.dropZone);
    await expect(constructor.fillings).toHaveCount(2);
  });
});
