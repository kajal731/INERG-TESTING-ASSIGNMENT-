const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const { baseUrl } = require('../config/env');

test('Validate COVID cards', async ({ page }) => {

    const home = new HomePage(page);

    await page.goto(baseUrl);

    await home.selectState('Kerala');

    await expect(home.totalCases).toBeVisible();

    await expect(home.activeCases).toBeVisible();

    await expect(home.recovered).toBeVisible();

    await expect(home.deaths).toBeVisible();

});
