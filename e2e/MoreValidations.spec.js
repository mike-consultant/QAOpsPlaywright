const { test, expect } = require('@playwright/test');

test('@Web Screenshot and Visual Comparison', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Verify the text box is visible
    await expect(page.locator("#displayed-text")).toBeVisible();

    // Take a screenshot of the text box
    await page.locator("#displayed-text").screenshot({
        path: 'screenshot1.png'
    });

    // Hide the text box
    await page.locator("#hide-textbox").click();

    // Take a screenshot of the whole page
    await page.screenshot({
        path: 'screenshot2.png'
    });

    // Verify the text box is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test('Visual Comparison', async ({ page }) => {

    await page.goto("https://www.google.com");
    // Wait until the page is fully loaded
    await page.waitForLoadState('networkidle');
    // Compare against the baseline screenshot
    await expect(page).toHaveScreenshot('Landing1.png');

});