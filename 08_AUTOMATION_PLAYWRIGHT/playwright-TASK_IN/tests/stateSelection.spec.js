const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const { baseUrl } = require('../config/env');
const { state } = require('../test-data/states.json');

test('Select Kerala State', async ({ page }) => {
  const home = new HomePage(page);

  await page.goto(baseUrl);
  await home.selectState(state);

  await expect(home.resultHeading).toHaveText(`Results for ${state}`);
});