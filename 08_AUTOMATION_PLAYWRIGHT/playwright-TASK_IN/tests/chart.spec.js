const { test } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const { baseUrl } = require('../config/env');

test('Print chart values for Kerala', async ({ page }) => {
  const home = new HomePage(page);

  await page.goto(baseUrl);
  await home.selectState('Kerala');
  await home.resultHeading.waitFor();

  const chartLabels = ['Total Cases', 'Recovered', 'Deaths', 'Active Cases'];

  for (let i = 0; i < chartLabels.length; i++) {
    const cardText = await page.locator('p').filter({ hasText: `${chartLabels[i]} :` }).textContent();
    const chartValue = cardText.match(/\d+/)?.[0] ?? '';
    console.log(`Chart Value ${i + 1}: ${chartValue}`);
  }
});