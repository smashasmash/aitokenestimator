import { test, expect } from '@playwright/test';

test('homepage loads and shows title', async ({ page, baseURL }) => {
  await page.goto(baseURL || '/');
  await expect(page.locator('text=Microsoft Agent Usage Estimator').first()).toBeVisible();
});
