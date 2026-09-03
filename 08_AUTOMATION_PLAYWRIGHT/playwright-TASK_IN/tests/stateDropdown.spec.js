const { test, expect } = require('@playwright/test');

test('TCIN_01 Verify State Dropdown is Displayed', async ({ page }) => {
  await page.goto('https://inerg-test.web.app/');

  await expect(page.locator('select')).toBeVisible();
});
