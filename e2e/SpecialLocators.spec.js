const { test, expect } = require('@playwright/test');

test.skip('Playwright Special Locators', async ({ page }) => {

    await page.goto("https://www.rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    //await page.locator("form input[name='name']").fill("Toby Cruz");
    await page.locator('form input[name="name"]').fill ("Toby Cruz");
    await page.locator("form input[name='email']").fill("lavitae2@gmail.com");

    //await page.getByLabel ("Employed").click();
    await page.locator('div').filter({ hasText: 'Entrepreneur (disabled)' }).nth(2).click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Tansolo2!");
   
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator ("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add "}).click();

    await page.pause();
    
});