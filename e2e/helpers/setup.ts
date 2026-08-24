import type { Page } from '@playwright/test';

const ACCESS_TOKEN = 'Bearer test-access-token';

export async function setupMocks(page: Page): Promise<void> {
  await page.addInitScript((token: string) => {
    localStorage.setItem('accessToken', token);
  }, ACCESS_TOKEN);

  await page.routeFromHAR('./e2e/hars/stellar.har', {
    update: false,
    url: /new-stellarburgers\.education-services\.ru\/api\//,
  });
}
