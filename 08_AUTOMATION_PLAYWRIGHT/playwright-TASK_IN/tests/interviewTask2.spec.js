const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const { baseUrl } = require('../config/env');

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.open(baseUrl);
  await home.selectState('Kerala');
  await expect(home.resultHeading).toHaveText('Results for Kerala');
});

test('TCIN_06 Verify Total Cases value is displayed', async ({ page }) => {
  const home = new HomePage(page);
  await expect(home.totalCases).toBeVisible();
});

test('TCIN_07 Verify Active Cases value is displayed', async ({ page }) => {
  const home = new HomePage(page);
  await expect(home.activeCases).toBeVisible();
});

test('TCIN_08 Verify Recovered value is displayed', async ({ page }) => {
  const home = new HomePage(page);
  await expect(home.recovered).toBeVisible();
});

test('TCIN_09 Verify Deaths value is displayed', async ({ page }) => {
  const home = new HomePage(page);
  await expect(home.deaths).toBeVisible();
});

test('TCIN_10 Verify Pie Chart is displayed', async ({ page }) => {
  const home = new HomePage(page);
  await expect(home.pieChart).toBeVisible();
});
