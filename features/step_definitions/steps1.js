const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { PageObjectsManager } = require('../../e2e/PageObjects/PageObjectsManager');

setDefaultTimeout(60 * 1000);

Given('A login to Ecommerce application with {string} and {string}', async function (username, password) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.poManager = new PageObjectsManager(this.page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    await this.page.waitForLoadState('networkidle');
});

When('Adding {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    await expect(this.page.locator('h3:has-text("' + productName + '")')).toBeVisible();
    await this.page.locator('text=Checkout').click();
    await this.page.locator('[placeholder*="Country"]').pressSequentially('ind');
    await this.page.locator('.ta-results button').first().waitFor();
    await this.page.locator('.ta-results button').first().click();
    await this.page.locator('.action__submit').click();

    this.orderId = await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    this.orderId = this.orderId.trim();
});

Then('Verify order is present in the OrderHistory', async function () {
    await this.page.locator('button[routerlink*="myorders"]').click();
    await this.page.locator('tbody').waitFor();

    const rows = this.page.locator('tbody tr');
    const count = await rows.count();

    let orderFound = false;

    for (let i = 0; i < count; i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();

        if (this.orderId.includes(rowOrderId.trim())) {
            await rows.nth(i).locator('button').first().click();
            orderFound = true;
            break;
        }
    }

    expect(orderFound).toBeTruthy();

    await this.browser.close();
});