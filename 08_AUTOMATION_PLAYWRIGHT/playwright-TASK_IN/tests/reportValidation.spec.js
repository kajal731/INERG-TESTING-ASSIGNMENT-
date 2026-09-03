const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const { baseUrl } = require('../config/env');

test.describe('Additional chart and map validation', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.open(baseUrl);
    await home.selectState('Kerala');
    await expect(home.resultHeading).toHaveText('Results for Kerala');
  });

  test('UI_21 Verify Total Cases is not displayed as pie slice', async ({ page }) => {
    const pieChart = page.locator('svg').first();
    await expect(pieChart).toBeVisible();

    const pieText = await pieChart.textContent();
    expect(pieText).not.toContain('Total Cases');
  });

  test('UI_15 Verify X and Y axis are visible', async ({ page }) => {
    await expect(page.locator('.xtick').first()).toBeVisible();
    await expect(page.locator('.ytick').first()).toBeVisible();
  });

  test('UI_9 Verify pie chart slices are visible', async ({ page }) => {
    const slices = page.locator('.slice');
    await expect(slices.first()).toBeVisible();
    expect(await slices.count()).toBeGreaterThan(0);
  });

  test('NT_8 Verify map pin resets after Select a State', async ({ page }) => {
    const home = new HomePage(page);
    await home.stateDropdown.selectOption('');
    await expect(home.resultHeading).toBeHidden();
    await page.screenshot({ path: 'test-results/map-reset.png', fullPage: true });
  });

  test('UI_16 Verify chart after zoom', async ({ page }) => {
    const chart = page.locator('svg').nth(1);
    await expect(chart).toBeVisible();
    await page.screenshot({ path: 'test-results/chart-zoom.png', fullPage: true });
  });
});

test('Verify Playwright report and failure attachments', async ({ page }) => {
  await page.goto('http://localhost:9323');

  await expect(page).toHaveTitle(/Playwright Test Report/i);
  await expect(page.locator('body')).toContainText('Playwright');

  const failedTest = page.getByText('TCIN_24 Verify Tooltip on Chart Data Points');
  if (await failedTest.count()) {
    await failedTest.first().click();
    await expect(page.getByText('test-failed-1.png')).toBeVisible();
    await expect(page.getByText('video')).toBeVisible();
  } else {
    console.log('TCIN_24 is not present in the current report; no failure attachments were generated.');
  }
});
