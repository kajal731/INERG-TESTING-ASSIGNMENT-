class HomePage {
  constructor(page) {
    this.page = page;
    this.stateDropdown = page.locator('select');
    this.resultHeading = page.getByRole('heading', { name: /Results for/ });
    this.totalCases = page.locator('p').filter({ hasText: 'Total Cases :' });
    this.activeCases = page.locator('p').filter({ hasText: 'Active Cases :' });
    this.recovered = page.locator('p').filter({ hasText: 'Recovered :' });
    this.deaths = page.locator('p').filter({ hasText: 'Deaths :' });
    this.pieChart = page.getByText('COVID-19 Distribution(Pie Chart)');
    this.lineChart = page.getByText('COVID-19 Cases : Line Chart Representation');
    this.mapMarker = page.getByRole('button', { name: 'Marker' });
  }

  async open(url) {
    await this.page.goto(url);
  }

  async selectState(state) {
    await this.stateDropdown.selectOption({ label: state });
  }

  async getStateNames() {
    return this.stateDropdown.locator('option').allTextContents();
  }
}

module.exports = HomePage;