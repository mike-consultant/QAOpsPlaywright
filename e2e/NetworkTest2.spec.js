const { test, expect } = require("@playwright/test");

test.skip("Security Test Request Intercept: Network Test 2", async ({ page }) => {

    const email = "lavitae2@gmail.com";
    const password = "Tansolo2!";

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();

    await page.waitForLoadState("networkidle");

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6b32fcbb17ee3e78bbe88a4a"
        })
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    await page.pause
});