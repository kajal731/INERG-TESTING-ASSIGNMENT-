async function waitForPage(page) {
  await page.waitForLoadState('networkidle');
}

function extractNumber(text) {
  return Number(text.match(/[\d,]+/)?.[0].replace(/,/g, '') ?? 0);
}

module.exports = { extractNumber, waitForPage };