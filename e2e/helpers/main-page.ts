import type { Locator, Page } from '@playwright/test';

export class ConstructorPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get ingredientCards(): Locator {
    return this.page.getByTestId('ingredient-item');
  }

  get dropZone(): Locator {
    return this.page.getByTestId('constructor-drop-target');
  }

  get bunTop(): Locator {
    return this.page.getByTestId('constructor-bun-top');
  }
  get bunBottom(): Locator {
    return this.page.getByTestId('constructor-bun-bottom');
  }

  get fillings(): Locator {
    return this.page.getByTestId('constructor-item');
  }

  get orderButton(): Locator {
    return this.page.getByRole('button', { name: 'Оформить заказ' });
  }

  get modal(): Locator {
    return this.page.getByTestId('modal');
  }

  get modalClose(): Locator {
    return this.page.getByTestId('modal-close');
  }

  get modalOverlay(): Locator {
    return this.page.getByTestId('modal-overlay');
  }

  async openPage(): Promise<void> {
    await this.page.goto('/');
  }
}
