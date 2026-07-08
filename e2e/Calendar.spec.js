const { test, expect } = require("@playwright/test");

test.skip("Calendar Selection Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const month = "07";
    const date = "04";
    const year = "2026";
    const expectedList = [Number(month).toString(), Number(date).toString(), Number(year).toString()];

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + Number(date) + "']").click();

    const inputs = page.locator(".react-date-picker__inputGroup input:not([type='date'])");

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

    //await page.pause();
});