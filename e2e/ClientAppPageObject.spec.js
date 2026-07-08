const { test, expect } = require('@playwright/test');
const { PageObjectsManager } = require('./PageObjects/PageObjectsManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
const {customtest} = require ('../utils/test.base');

test.describe.configure ({mode: "serial"});
for (const data of dataSet) {
    test(`@Web Client App login for ${data.productName}`, async ({ page }) => {

        const poManager = new PageObjectsManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        await page.waitForLoadState('networkidle');

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        await expect(page.locator(`h3:has-text("${data.productName}")`)).toBeVisible();
        await page.locator("text=Checkout").click();
        await page.locator("input.input.txt").nth(1).fill("777");
        await page.locator("input.input.txt").nth(2).fill("Toby Cruz");
        await page.locator("input.input.txt").nth(3).fill("PROMO");

        await page.locator("[placeholder='Select Country']").pressSequentially("United Sta");
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();

        for (let i = 0; i < optionsCount; i++) {
            const text = await dropdown.locator("button").nth(i).textContent();

            if (text.trim() === "United States") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".details__user input[type='text']").first())
            .toHaveValue(data.username);

        await page.locator(".btnn.action__submit").click();

        await expect(page.locator(".hero-primary"))
            .toContainText("Thankyou for the order.");

        const confirmation = (
            await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
        ).trim();

        console.log("Confirmation Order:", confirmation);

        await page.locator("button[routerlink='/dashboard/myorders']").click();

        await page.locator("tbody tr").first().waitFor();

        const rows = page.locator("tbody tr");
        const rowsCount = await rows.count();

        for (let i = 0; i < rowsCount; i++) {
            const rowOrderId = (
                await rows.nth(i).locator("th").textContent()
            ).trim();

            console.log("Row Order ID:", rowOrderId);

            if (confirmation.includes(rowOrderId)) {
                console.log("Order Found!");

                await rows.nth(i).locator("button.btn-primary").click();

                const orderDetails = (
                    await page.locator(".col-text").first().textContent()
                ).trim();

                expect(orderDetails).toBe(rowOrderId);
                break;
            }
        }
    });
}

 customtest('Client App login 2', async ({ page, testDataForOrder }) => {

        const poManager = new PageObjectsManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
        await page.waitForLoadState('networkidle');
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
 })
