const { test, expect } = require("@playwright/test");

test.skip("Automation - More Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto ("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator ('#displayed-text')).toBeVisible();
    await page.locator ('#hide-textbox').click();
    await expect(page.locator ('#displayed-text')).toBeHidden();

     //await page.on('dialog', dialog => dialog.dismiss);
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator("#mousehover").hover();

    // Switch to frame
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const number = await framesPage.locator ('.text h2').textContent();
    //const onlyNumber = number.split(" ")[1];
    console.log(number.split(" ")[1]);
    await page.pause ();

 
});